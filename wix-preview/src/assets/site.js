// Shared page code: category navigation, story cards, newsletter, copy link.
// All content comes from the Wix blog layer in /js/wix/ (installed by Wix).
import { fetchBlogCategories } from "/js/wix/taxonomy.js";
import { imgSrc, imgSrcSet } from "/js/wix/media.js";

export const EMAIL = "knewspaper.in@gmail.com";

export function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
export const postHref = (slug) => "/post/" + encodeURIComponent(slug);
export const catHref = (slug) => "/blog/categories/" + encodeURIComponent(slug);

// Categories with posts, in the blog's menu order. [] when the read fails.
// Kept in the browser for 30 minutes so each page doesn't fetch them again.
const CAT_KEY = "knews.categories.v1";
const CAT_TTL = 30 * 60 * 1000;
export const cachedCategories = (() => {
  try {
    const c = JSON.parse(localStorage.getItem(CAT_KEY) || "null");
    return c && Date.now() - c.at < CAT_TTL && Array.isArray(c.list) ? c.list : null;
  } catch { return null; }
})();
export const categoriesReady = cachedCategories
  ? Promise.resolve(cachedCategories.filter((c) => c.postCount > 0))
  : fetchBlogCategories()
      .then((list) => {
        if (list.length) try { localStorage.setItem(CAT_KEY, JSON.stringify({ at: Date.now(), list })); } catch {}
        return list.filter((c) => c.postCount > 0);
      })
      .catch(() => []);

let catById = new Map();
categoriesReady.then((list) => { catById = new Map(list.map((c) => [c.id, c])); });
export const firstCategory = (p) => (p.categoryIds || []).map((id) => catById.get(id)).find(Boolean) || null;

// ---------------------------------------------------------------- cards
const kicker = (p) => {
  const c = firstCategory(p);
  return c ? `<a class="kicker" href="${catHref(c.slug)}">${esc(c.label)}</a>` : "";
};
export function meta(p, { author = false } = {}) {
  const bits = [];
  if (author && p.authorName) bits.push(`<span class="meta__author">By ${esc(p.authorName)}</span>`);
  if (p.dateLabel) bits.push(`<time datetime="${esc(p.dateISO)}">${esc(p.dateLabel)}</time>`);
  if (p.minutesToRead) bits.push(`<span>${p.minutesToRead} min read</span>`);
  return bits.length ? `<p class="meta">${bits.join("")}</p>` : "";
}
// Card images at the size they are shown, not the full-size cover.
const SIZES = {
  lead: { w: 960, ratio: 0.625, widths: [480, 720, 960, 1280], sizes: "(min-width: 1100px) 760px, (min-width: 760px) 62vw, 100vw" },
  stack: { w: 264, ratio: 0.75, widths: [160, 264, 400], sizes: "(min-width: 760px) 132px, 112px" },
  row: { w: 440, ratio: 0.667, widths: [240, 360, 480], sizes: "(min-width: 640px) 220px, 34vw" },
  tile: { w: 480, ratio: 0.667, widths: [320, 480, 640], sizes: "(min-width: 900px) 25vw, 50vw" },
};
const cover = (p, { eager = false, size = "row" } = {}) => {
  if (!p.coverUrl) return "";
  const s = SIZES[size];
  const h = Math.round(s.w * s.ratio);
  return `<div class="story__media"><img class="cover" src="${esc(imgSrc(p.coverUrl, s.w, h))}" srcset="${esc(imgSrcSet(p.coverUrl, s.widths, s.ratio))}" sizes="${s.sizes}" width="${s.w}" height="${h}" alt="${esc(p.coverAlt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
};
const title = (p, tag = "h3", cls = "") => `<${tag} class="story__title ${cls}"><a href="${postHref(p.slug)}">${esc(p.title)}</a></${tag}>`;
const noMedia = (p) => (p.coverUrl ? "" : " story--text");

export const card = {
  lead: (p) => `<article class="story story--lead${noMedia(p)}">${cover(p, { eager: true, size: "lead" })}<div class="story__body">${kicker(p)}${title(p, "h2", "story__title--lead")}${p.excerpt ? `<p class="story__dek">${esc(p.excerpt)}</p>` : ""}${meta(p, { author: true })}</div></article>`,
  stack: (p) => `<article class="story story--stack${noMedia(p)}">${cover(p, { size: "stack" })}<div class="story__body">${kicker(p)}${title(p)}${meta(p)}</div></article>`,
  row: (p, level = "h3") => `<article class="story story--row${noMedia(p)}"><div class="story__body">${kicker(p)}${title(p, level)}${p.excerpt ? `<p class="story__dek">${esc(p.excerpt)}</p>` : ""}${meta(p)}</div>${cover(p)}</article>`,
  tile: (p) => `<article class="story story--tile${noMedia(p)}">${cover(p, { size: "tile" })}<div class="story__body">${title(p)}${meta(p)}</div></article>`,
  rank: (p) => `<li class="rank">${title(p, "h3", "story__title--small")}${kicker(p)}</li>`,
};

// ------------------------------------------------- navigation from Wix
categoriesReady.then((cats) => {
  // Read late: a topic page sets its slug once it has resolved it.
  const active = document.body.dataset.activeCat || "";
  const nav = document.querySelector("[data-catnav]");
  if (nav) {
    nav.insertAdjacentHTML("beforeend", cats.map((c) =>
      `<li><a href="${catHref(c.slug)}"${c.slug === active ? ' aria-current="page"' : ""}>${esc(c.label)}</a></li>`).join(""));
    const cur = nav.querySelector('[aria-current="page"]');
    if (cur) cur.scrollIntoView({ block: "nearest", inline: "center" });
    const wrap = nav.parentElement;
    const edge = () => {
      wrap.classList.toggle("is-start", nav.scrollLeft < 8);
      wrap.classList.toggle("is-end", nav.scrollLeft + nav.clientWidth > nav.scrollWidth - 8);
    };
    nav.addEventListener("scroll", edge, { passive: true });
    edge();
  }
  const foot = document.querySelector("[data-footer-topics]");
  if (foot) foot.innerHTML = cats.map((c) => `<li><a href="${catHref(c.slug)}">${esc(c.label)}</a></li>`).join("");
});

// A topic page knows its slug only after resolving it; mark the nav then.
export function markActive(slug) {
  document.body.dataset.activeCat = slug;
  categoriesReady.then(() => {
    const a = document.querySelector(`[data-catnav] a[href="${catHref(slug)}"]`);
    if (a) { a.setAttribute("aria-current", "page"); a.scrollIntoView({ block: "nearest", inline: "center" }); }
  });
}

// The header search keeps the query on the search page.
const q = new URLSearchParams(location.search).get("q");
const headerSearch = document.getElementById("site-search");
if (q && headerSearch) headerSearch.value = q;

// ------------------------------------------------------- newsletter
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
document.addEventListener("submit", (ev) => {
  const form = ev.target.closest("[data-newsletter]");
  if (!form) return;
  ev.preventDefault();
  const input = form.elements.email;
  const status = form.querySelector(".form-status");
  if (!EMAIL_RE.test(input.value.trim())) {
    input.setAttribute("aria-invalid", "true");
    status.dataset.kind = "error";
    status.textContent = "Enter a valid email address, like name@example.com.";
    input.focus();
    return;
  }
  input.removeAttribute("aria-invalid");
  status.dataset.kind = "info";
  status.textContent = `Newsletter sign-up opens soon. Until then, email ${EMAIL} with “Subscribe” and we’ll add you.`;
});

// ------------------------------------------------------- copy link
document.addEventListener("click", async (ev) => {
  const b = ev.target.closest("[data-copy]");
  if (!b) return;
  try { await navigator.clipboard.writeText(location.href); b.textContent = "Link copied"; } catch { b.textContent = "Copy failed"; }
  setTimeout(() => (b.textContent = "Copy link"), 2500);
});

// ---------------------------------------------------------- contact
// No form app is connected yet, so the message opens in the reader's email app.
const contact = document.querySelector("[data-contact]");
if (contact) {
  contact.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const f = contact.elements;
    const status = contact.querySelector(".form-status");
    const v = { first: f.firstName.value.trim(), last: f.lastName.value.trim(), email: f.email.value.trim(), msg: f.message.value.trim() };
    const bad = [];
    if (!v.first) bad.push(f.firstName);
    if (!EMAIL_RE.test(v.email)) bad.push(f.email);
    if (!v.msg) bad.push(f.message);
    [f.firstName, f.email, f.message].forEach((el) => el.toggleAttribute("aria-invalid", bad.includes(el)));
    if (bad.length) { status.dataset.kind = "error"; status.textContent = "Fill in your first name, a valid email and your message."; bad[0].focus(); return; }
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from a Knewspaper reader")}&body=${encodeURIComponent(`${v.msg}\n\n${v.first} ${v.last}\n${v.email}`)}`;
    status.dataset.kind = "info";
    status.textContent = "Your email app should open with the message ready to send.";
  });
}

// ------------------------------------------------- old Wix addresses
// Pages are .html files on Wix hosting; the old paths (/post/<slug>,
// /blog/categories/<slug>, /about-us …) 301-redirect to them. Put the old
// path back in the address bar and use it as the canonical URL.
export function showOldUrl(path) {
  // Keep query parameters a page needs (e.g. ?paid=1), but not the slug the clean path already carries.
  const q = new URLSearchParams(location.search);
  q.delete("slug");
  const qs = q.toString();
  try { history.replaceState(history.state, "", path + (qs ? "?" + qs : "") + location.hash); } catch {}
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.append(link); }
  link.href = location.origin + path;
}
const OLD_PATHS = { "/blog.html": "/blog", "/about.html": "/about-us", "/contact.html": "/contact", "/write-for-us.html": "/write-for-us", "/privacy-policy.html": "/privacy-policy" };
if (OLD_PATHS[location.pathname]) showOldUrl(OLD_PATHS[location.pathname]);

// Links show the old addresses. A normal click opens the matching .html page
// directly (no redirect hop); a copied link or a new tab goes through the
// site's 301 redirect to the same page.
const STATIC_PAGES = { "/blog": "/blog.html", "/about-us": "/about.html", "/contact": "/contact.html", "/write-for-us": "/write-for-us.html", "/privacy-policy": "/privacy-policy.html" };
export function pageFor(pathname) {
  const p = pathname.replace(/\/+$/, "");
  let m;
  if ((m = p.match(/^\/post\/([^/]+)$/))) return "/post.html?slug=" + m[1];
  if ((m = p.match(/^\/blog\/categories\/([^/]+)$/))) return "/category.html?slug=" + m[1];
  return STATIC_PAGES[p] || null;
}
document.addEventListener("click", (ev) => {
  if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
  const a = ev.target.closest("a[href]");
  if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
  // Links to a section of the same page (the contents list) just scroll.
  if ((a.getAttribute("href") || "").startsWith("#")) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  const page = pageFor(url.pathname);
  if (!page) return;
  ev.preventDefault();
  location.assign(page + url.hash);
});

// ------------------------------------------------------ device cache
// What this device saved last time, so pages can show it at once and
// refresh it from Wix in the background. null when missing or too old.
export function cacheGet(key, maxAgeMs) {
  try {
    const c = JSON.parse(localStorage.getItem("knews." + key) || "null");
    return c && Date.now() - c.at < maxAgeMs ? c.v : null;
  } catch { return null; }
}
export function cacheSet(key, value) {
  const item = JSON.stringify({ at: Date.now(), v: value });
  try { localStorage.setItem("knews." + key, item); }
  catch {
    // Storage full: drop the saved articles and try once more.
    try {
      for (const k of Object.keys(localStorage)) if (k.startsWith("knews.post.")) localStorage.removeItem(k);
      localStorage.setItem("knews." + key, item);
    } catch {}
  }
}
