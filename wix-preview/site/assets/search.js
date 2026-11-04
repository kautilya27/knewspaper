// Search (search.html?q=…) through Wix Site Search: results are matched and
// ranked by Wix across every published article, not filtered in the browser.
// docs: https://dev.wix.com/docs/api-reference/business-management/site-search/wix-site-search/search
import { wixRequest } from "/js/wix/client.js";
import { imgSrc } from "/js/wix/media.js";
import { esc, postHref } from "/assets/site.js";
// Loads an article when its result is pointed at or touched (see fast.js).
import { savedPost } from "/assets/fast.js";

const input = document.getElementById("search-page-q");
const status = document.querySelector("[data-status]");
const results = document.querySelector("[data-rows]");
const q = (new URLSearchParams(location.search).get("q") || "").trim();
input.value = q;

const slugOf = (url) => decodeURIComponent((String(url || "").match(/\/post\/([^?#]+)/) || [])[1] || "");
const plain = (html) => String(html || "").replace(/<[^>]+>/g, "");

async function run() {
  if (!q) { status.textContent = "Type a word or topic to search every article."; input.focus(); return; }
  document.title = `Search: ${q} | Knewspaper`;
  status.textContent = "Searching…";
  const body = { documentType: "BLOG_POSTS", search: { search: { expression: q }, paging: { limit: 30 } } };
  const res = await wixRequest("/_api/site-search/v1/search", { body });
  const items = (res?.siteDocumentItems ?? [])
    .map((it) => it.data || {})
    .map((d) => ({ slug: slugOf(d.url), title: d.title || plain(d._highlights?.title?.[0]), text: d.description || "", image: d.documentImage?.name || d.image || "" }))
    .filter((d) => d.slug && d.title);
  status.textContent = items.length
    ? `${items.length} ${items.length === 1 ? "article" : "articles"} for “${q}”`
    : `No articles match “${q}”. Try a shorter or different word.`;
  results.innerHTML = items.map((d) => {
    const img = d.image ? imgSrc(d.image, 440, 293) : "";
    return `<article class="story story--row${img ? "" : " story--text"}">
      <div class="story__body">
        <h2 class="story__title"><a href="${postHref(d.slug)}">${esc(d.title)}</a></h2>
        ${d.text ? `<p class="story__dek">${esc(d.text.length > 190 ? d.text.slice(0, 189).trimEnd() + "…" : d.text)}</p>` : ""}
      </div>
      ${img ? `<div class="story__media"><img class="cover" src="${esc(img)}" alt="" loading="lazy" decoding="async"></div>` : ""}
    </article>`;
  }).join("");
}

run().catch((err) => {
  console.error("[knews] search", err);
  status.textContent = "Search could not run just now. Try again, or browse a topic from the menu.";
  status.dataset.kind = "error";
});
