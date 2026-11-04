// All articles (blog.html) and one topic (category.html?slug=…), on the
// Wix blog feed store: paging and the topic filter run on Wix.
import { createBlogFeedStore } from "/js/wix/blog-feed-store.js";
import { fetchCategoryBySlug } from "/js/wix/taxonomy.js";
import { categoriesReady, card, markActive, showOldUrl } from "/assets/site.js";

const list = document.querySelector("[data-rows]");
const status = document.querySelector("[data-status]");
const moreBtn = document.querySelector("[data-load-more]");
const titleEl = document.querySelector("[data-title]");
const introEl = document.querySelector("[data-intro]");
const isCategory = document.body.dataset.page === "category";

async function main() {
  let category = null;
  if (isCategory) {
    const slug = new URLSearchParams(location.search).get("slug") || "";
    category = slug ? await fetchCategoryBySlug(slug) : null;
    if (!category) {
      titleEl.textContent = "Topic not found";
      introEl.innerHTML = 'This topic doesn’t exist or has no articles. <a href="/blog.html">See all articles</a>.';
      status.textContent = "";
      moreBtn.hidden = true;
      return;
    }
    markActive(category.slug);
    showOldUrl("/blog/categories/" + category.slug);
    titleEl.textContent = category.label;
    document.querySelector("[data-crumb]").textContent = category.label;
    introEl.textContent = category.description || `${category.label} articles and explainers from Knewspaper.`;
    document.title = `${category.title || category.label} | Knewspaper`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = introEl.textContent;
  }

  await categoriesReady;
  const feed = createBlogFeedStore({ initialCategoryId: category ? category.id : null, pageSize: 20 });
  const render = (s) => {
    if (s.posts === null) { status.textContent = "Loading articles…"; return; }
    list.innerHTML = s.posts.map((p) => card.row(p, "h2")).join("");
    status.textContent = s.error ? `Articles could not load: ${s.error}` : s.posts.length ? "" : "No articles in this topic yet.";
    status.dataset.kind = s.error ? "error" : "";
    moreBtn.hidden = !s.hasMore;
    moreBtn.disabled = s.loadingMore;
    moreBtn.textContent = s.loadingMore ? "Loading…" : "Show more articles";
  };
  moreBtn.addEventListener("click", () => feed.loadMore().catch(() => {}));
  feed.subscribe(render);
  render(feed.getState());
  feed.start();
}

main().catch((err) => {
  console.error("[knews] feed", err);
  status.textContent = "Articles could not load. Check your connection and refresh the page.";
  status.dataset.kind = "error";
});

