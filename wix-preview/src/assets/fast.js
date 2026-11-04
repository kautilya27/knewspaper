// Faster article reads for the pages, built from the Wix blog layer's own
// pieces (client, posts-core, authors). The layer's fetchPosts/fetchPostBySlug
// wait for author names before returning anything; these return the articles
// as soon as Wix answers and add author names afterwards. Author names are
// also kept on this device, so after the first visit they are there at once.
import { wixRequest } from "/js/wix/client.js";
import { imgSrc } from "/js/wix/media.js";
import { fetchAuthorsByIds } from "/js/wix/authors.js";
import { CARD_FIELDSETS, DETAIL_FIELDSETS, feedQuery, isNotFound, toDetail, toSummary, withAuthors } from "/js/wix/posts-core.js";
import { cacheGet, cacheSet } from "/assets/site.js";

// ----------------------------------------------------------- author names
const AUTHORS_TTL = 7 * 24 * 60 * 60 * 1000;
let authors = cacheGet("authors", AUTHORS_TTL) || {};

// Posts with the author names this device already knows.
export const withKnownAuthors = (posts) => withAuthors(posts, authors);

// Looks up the authors this device doesn't know yet. Resolves true when it
// learned any, so the caller can add the bylines it couldn't show before.
export function learnAuthors(posts) {
  const missing = [...new Set(posts.map((p) => p.authorId).filter((id) => id && !authors[id]))];
  if (!missing.length) return Promise.resolve(false);
  return fetchAuthorsByIds(missing).then((found) => {
    if (!Object.keys(found).length) return false;
    authors = { ...authors, ...found };
    cacheSet("authors", authors);
    return true;
  }).catch(() => false);
}

// ----------------------------------------------------------------- reads
// The same request as the layer's fetchPosts, without waiting for authors.
export async function quickPosts(o = {}) {
  const res = await wixRequest("/blog/v3/posts/query", { body: { fieldsets: CARD_FIELDSETS, query: feedQuery(o) } });
  const paging = res?.pagingMetadata ?? {};
  return {
    posts: withKnownAuthors((res?.posts ?? []).map((p) => toSummary(p, imgSrc))),
    nextCursor: paging.hasNext ? (paging.cursors?.next ?? null) : null,
  };
}

// The same request as the layer's fetchPostBySlug, without waiting for the
// author. Null when there is no such article.
export async function quickPost(slug) {
  let raw;
  try {
    raw = (await wixRequest(`/blog/v3/posts/slugs/${encodeURIComponent(slug)}`, { method: "GET", query: { fieldsets: DETAIL_FIELDSETS } }))?.post;
  } catch (e) {
    if (isNotFound(e)) return null;
    throw e;
  }
  return raw ? withKnownAuthors([toDetail(raw, imgSrc)])[0] : null;
}

// ------------------------------------------------------- saved articles
// The last 25 articles read (or pointed at) on this device, for 6 hours.
const POST_TTL = 6 * 60 * 60 * 1000;
const POST_KEEP = 25;
export const savedPost = (slug) => cacheGet("post." + slug, POST_TTL);
export function savePost(post) {
  if (!post || !post.slug) return;
  let index = cacheGet("postIndex", Infinity) || [];
  index = [post.slug, ...index.filter((s) => s !== post.slug)];
  for (const old of index.slice(POST_KEEP)) try { localStorage.removeItem("knews.post." + old); } catch {}
  cacheSet("postIndex", index.slice(0, POST_KEEP));
  // The page shows bodyHtml; the raw rich content isn't needed again.
  cacheSet("post." + post.slug, { ...post, richContent: null });
}

// Start loading an article as soon as a reader points at, touches or tabs to
// its link, so it is usually ready by the time the next page opens.
const started = new Set();
function prefetch(ev) {
  const a = ev.target && ev.target.closest ? ev.target.closest('a[href^="/post/"]') : null;
  if (!a) return;
  let slug = "";
  try { slug = decodeURIComponent(a.getAttribute("href").slice(6).replace(/[?#].*$/, "").replace(/\/+$/, "")); } catch { return; }
  if (!slug || started.has(slug) || savedPost(slug)) return;
  started.add(slug);
  quickPost(slug).then(savePost).catch(() => started.delete(slug));
}
document.addEventListener("pointerover", prefetch, { passive: true });
document.addEventListener("touchstart", prefetch, { passive: true });
document.addEventListener("focusin", prefetch);
