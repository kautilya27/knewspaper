// Homepage: lead story, featured stack, latest list, topic shelves and topics,
// all read live from the Wix Blog. The copy this device saved last time shows
// at once while the live one loads.
import { learnAuthors, quickPosts, withKnownAuthors } from "/assets/fast.js";
import { cacheGet, cacheSet, categoriesReady, card, catHref, esc } from "/assets/site.js";

const $ = (s) => document.querySelector(s);
// Only touches the page when the markup actually changed, so the live refresh
// doesn't make an unchanged page flicker.
const last = new Map();
const put = (sel, html) => {
  const el = $(sel);
  if (el && last.get(sel) !== html) { el.innerHTML = html; last.set(sel, html); }
};

const saved = cacheGet("home", 24 * 60 * 60 * 1000);

const livePage = quickPosts({ limit: 18 });
// The topic shelves load at the same time as the latest articles.
const liveShelves = categoriesReady.then((cats) =>
  Promise.all(
    [...cats].sort((a, b) => b.postCount - a.postCount).slice(0, 4)
      .map((c) => quickPosts({ categoryId: c.id, limit: 4 }).then((r) => ({ c, posts: r.posts })).catch(() => ({ c, posts: [] }))),
  ),
);

function top(posts) {
  if (!posts.length) {
    put("[data-top]", '<p class="empty">No articles are published yet.</p>');
    put("[data-latest]", "");
    return;
  }
  const [lead, ...rest] = withKnownAuthors(posts);
  put("[data-top]", `<div class="top__grid">${card.lead(lead)}<div class="top__stack">${rest.slice(0, 3).map(card.stack).join("")}</div></div>`);
  put("[data-latest]", rest.slice(3, 13).map((p) => card.row(p)).join(""));
  const more = rest.slice(13, 18);
  $("[data-more-section]").hidden = !more.length;
  put("[data-more]", more.map(card.rank).join(""));
}

function shelvesAndTopics(shelves, cats) {
  put("[data-shelves]", shelves
    .filter((s) => s.posts.length)
    .map(({ c, posts }) => `
      <section class="wrap shelf" aria-labelledby="shelf-${esc(c.slug)}">
        <div class="section-head">
          <h2 id="shelf-${esc(c.slug)}" class="section-head__title"><a href="${catHref(c.slug)}">${esc(c.label)}</a></h2>
          <a class="section-head__more" href="${catHref(c.slug)}">More in ${esc(c.label)}</a>
        </div>
        <div class="tiles">${posts.map(card.tile).join("")}</div>
      </section>`)
    .join(""));
  put("[data-topics]", cats
    .map((c) => `<li><a href="${catHref(c.slug)}"><span>${esc(c.label)}</span><span class="topics__count">${c.postCount} ${c.postCount === 1 ? "article" : "articles"}</span></a></li>`)
    .join(""));
  $("[data-topics-section]").hidden = !cats.length;
}

let shown = null;
const show = (posts) => { shown = posts; top(posts); };
// Topic labels on the cards appear as soon as the topics are known.
categoriesReady.then(() => { if (shown) top(shown); });

if (saved) {
  show(saved.posts);
  shelvesAndTopics(saved.shelves, saved.cats);
}

livePage.then((page) => {
  show(page.posts);
  // The lead story's byline appears once its author's name is known.
  learnAuthors(page.posts.slice(0, 1)).then((learned) => { if (learned) top(page.posts); });
  return Promise.all([liveShelves, categoriesReady]).then(([shelves, cats]) => {
    shelvesAndTopics(shelves, cats);
    if (page.posts.length) cacheSet("home", { posts: page.posts, shelves, cats });
  });
}).catch((err) => {
  console.error("[knews] home", err);
  if (saved) return;
  put("[data-top]", '<p class="empty" role="alert">The latest articles could not load. Check your connection and refresh the page.</p>');
  put("[data-latest]", "");
});
