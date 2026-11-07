// All articles (blog.html) and one topic (category.html?slug=…), on the
// Wix blog feed store: paging and the topic filter run on Wix. The rows this
// device saved last time show at once while the live first page loads.
import { createBlogFeedStore } from "/js/wix/blog-feed-store.js";
import { fetchCategoryBySlug } from "/js/wix/taxonomy.js";
import { quickPosts } from "/assets/fast.js";
import { cacheGet, cacheSet, cachedCategories, categoriesReady, card, catHref, markActive, showOldUrl } from "/assets/site.js";
import { PUBLISHER, SITE, breadcrumbs, setJsonLd } from "/assets/seo.js";

const list = document.querySelector("[data-rows]");
const status = document.querySelector("[data-status]");
const moreBtn = document.querySelector("[data-load-more]");
const titleEl = document.querySelector("[data-title]");
const introEl = document.querySelector("[data-intro]");
const isCategory = document.body.dataset.page === "category";

async function main() {
  // Pre-rendered pages already list every article: just mark the topic in the menu.
  if (list && list.hasAttribute("data-static")) {
    if (document.body.dataset.cat) markActive(document.body.dataset.cat);
    status.textContent = "";
    moreBtn.hidden = true;
    if (isCategory) return;
  }
  let category = null;
  if (isCategory) {
    const slug = new URLSearchParams(location.search).get("slug") || "";
    // The topic list is already loading for the menu; ask Wix separately only
    // for a topic that isn't in it.
    const bySlug = (list) => (list || []).find((c) => c.slug === slug);
    category = slug ? bySlug(cachedCategories) || bySlug(await categoriesReady) || (await fetchCategoryBySlug(slug)) : null;
    if (!category) {
      titleEl.textContent = "Topic not found";
      introEl.innerHTML = 'This topic doesn’t exist or has no articles. <a href="/blog">See all articles</a>.';
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
  // Structured data: this listing as a collection, with its breadcrumb.
  const pageUrl = category ? SITE + catHref(category.slug) : SITE + "/blog";
  const pageName = category ? category.label : "All articles";
  setJsonLd("ld-listing", { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": pageUrl, url: pageUrl, name: pageName, description: introEl.textContent || undefined, isPartOf: { "@type": "WebSite", "@id": SITE + "/#website" }, publisher: PUBLISHER },
    breadcrumbs([["Home", SITE + "/"], ...(category ? [["Articles", SITE + "/blog"]] : []), [pageName, pageUrl]]),
  ] });

  if (list && list.hasAttribute("data-static")) return;
  const categoryId = category ? category.id : null;
  const feedKey = "feed." + (category ? category.slug : "all");
  const savedRows = cacheGet(feedKey, 6 * 60 * 60 * 1000);
  let html = "";
  const rows = (posts) => {
    const next = posts.map((p) => card.row(p, "h2")).join("");
    if (next !== html) list.innerHTML = html = next;
  };
  let live = false;
  if (savedRows) {
    rows(savedRows);
    status.textContent = "";
    categoriesReady.then(() => { if (!live) rows(savedRows); });
  } else status.textContent = "Loading articles…";

  // The first page is read without waiting for author names (rows don't show
  // them) and handed to the store, which does the paging from there. The
  // store is seeded with the cached topics so it doesn't fetch them again.
  let firstPage;
  try {
    firstPage = await quickPosts({ limit: 20, categoryId });
    if (firstPage.posts.length) cacheSet(feedKey, firstPage.posts);
  } catch {
    firstPage = undefined; // the store makes its own request and reports any error
  }
  live = true;
  const feed = createBlogFeedStore({ initialPage: firstPage, initialCategoryId: categoryId, pageSize: 20, ...(cachedCategories ? { initialCategories: cachedCategories } : {}) });
  const render = (s) => {
    if (s.posts === null) { if (!savedRows) status.textContent = "Loading articles…"; return; }
    rows(s.posts);
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
  // Topic labels on the rows appear as soon as the topics are known.
  categoriesReady.then(() => render(feed.getState()));
}

main().catch((err) => {
  console.error("[knews] feed", err);
  status.textContent = "Articles could not load. Check your connection and refresh the page.";
  status.dataset.kind = "error";
});

