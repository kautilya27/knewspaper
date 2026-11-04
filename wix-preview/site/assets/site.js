// Shared page code: category navigation, story cards, newsletter, copy link.
// All content comes from the Wix blog layer in /js/wix/ (installed by Wix).
import { fetchBlogCategories } from "/js/wix/taxonomy.js";

export const EMAIL = "knewspaper.in@gmail.com";

export function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
export const postHref = (slug) => "/post.html?slug=" + encodeURIComponent(slug);
export const catHref = (slug) => "/category.html?slug=" + encodeURIComponent(slug);

// Categories with posts, in the blog's menu order. [] when the read fails.
export const categoriesReady = fetchBlogCategories()
  .then((list) => list.filter((c) => c.postCount > 0))
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
const cover = (p, { eager = false } = {}) =>
  p.coverUrl
    ? `<div class="story__media"><img class="cover" src="${esc(p.coverUrl)}" alt="${esc(p.coverAlt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`
    : "";
const title = (p, tag = "h3", cls = "") => `<${tag} class="story__title ${cls}"><a href="${postHref(p.slug)}">${esc(p.title)}</a></${tag}>`;
const noMedia = (p) => (p.coverUrl ? "" : " story--text");

export const card = {
  lead: (p) => `<article class="story story--lead${noMedia(p)}">${cover(p, { eager: true })}<div class="story__body">${kicker(p)}${title(p, "h2", "story__title--lead")}${p.excerpt ? `<p class="story__dek">${esc(p.excerpt)}</p>` : ""}${meta(p, { author: true })}</div></article>`,
  stack: (p) => `<article class="story story--stack${noMedia(p)}">${cover(p)}<div class="story__body">${kicker(p)}${title(p)}${meta(p)}</div></article>`,
  row: (p, level = "h3") => `<article class="story story--row${noMedia(p)}"><div class="story__body">${kicker(p)}${title(p, level)}${p.excerpt ? `<p class="story__dek">${esc(p.excerpt)}</p>` : ""}${meta(p)}</div>${cover(p)}</article>`,
  tile: (p) => `<article class="story story--tile${noMedia(p)}">${cover(p)}<div class="story__body">${title(p)}${meta(p)}</div></article>`,
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
