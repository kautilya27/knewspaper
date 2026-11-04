// Homepage: lead story, featured stack, latest list, topic shelves and topics,
// all read live from the Wix Blog.
import { fetchPosts } from "/js/wix/posts.js";
import { categoriesReady, card, catHref, esc } from "/assets/site.js";

const $ = (s) => document.querySelector(s);

// The topic shelves load at the same time as the latest articles.
const shelvesReady = categoriesReady.then((cats) =>
  Promise.all(
    [...cats].sort((a, b) => b.postCount - a.postCount).slice(0, 4)
      .map((c) => fetchPosts({ categoryId: c.id, limit: 4 }).then((r) => ({ c, posts: r.posts })).catch(() => ({ c, posts: [] }))),
  ),
);

async function main() {
  const [page, cats] = await Promise.all([fetchPosts({ limit: 18 }), categoriesReady]);
  const posts = page.posts;

  if (!posts.length) {
    $("[data-top]").innerHTML = '<p class="empty">No articles are published yet.</p>';
    $("[data-latest]").innerHTML = "";
    return;
  }
  const [lead, ...rest] = posts;
  $("[data-top]").innerHTML = `<div class="top__grid">${card.lead(lead)}<div class="top__stack">${rest.slice(0, 3).map(card.stack).join("")}</div></div>`;
  $("[data-latest]").innerHTML = rest.slice(3, 13).map((p) => card.row(p)).join("");

  const more = rest.slice(13, 18);
  if (more.length) $("[data-more]").innerHTML = more.map(card.rank).join("");
  else $("[data-more-section]").hidden = true;

  const shelves = await shelvesReady;
  $("[data-shelves]").innerHTML = shelves
    .filter((s) => s.posts.length)
    .map(({ c, posts }) => `
      <section class="wrap shelf" aria-labelledby="shelf-${esc(c.slug)}">
        <div class="section-head">
          <h2 id="shelf-${esc(c.slug)}" class="section-head__title"><a href="${catHref(c.slug)}">${esc(c.label)}</a></h2>
          <a class="section-head__more" href="${catHref(c.slug)}">More in ${esc(c.label)}</a>
        </div>
        <div class="tiles">${posts.map(card.tile).join("")}</div>
      </section>`)
    .join("");

  $("[data-topics]").innerHTML = cats
    .map((c) => `<li><a href="${catHref(c.slug)}"><span>${esc(c.label)}</span><span class="topics__count">${c.postCount} ${c.postCount === 1 ? "article" : "articles"}</span></a></li>`)
    .join("");
  if (!cats.length) $("[data-topics-section]").hidden = true;
}

main().catch((err) => {
  console.error("[knews] home", err);
  $("[data-top]").innerHTML = '<p class="empty" role="alert">The latest articles could not load. Check your connection and refresh the page.</p>';
  $("[data-latest]").innerHTML = "";
});
