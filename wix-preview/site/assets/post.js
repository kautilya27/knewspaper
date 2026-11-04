// One article (post.html?slug=…) on the Wix post store, with its comments.
import { createPostStore } from "/js/wix/post-store.js";
import { createCommentsStore } from "/js/wix/comments-store.js";
import { categoriesReady, card, catHref, esc, markActive, meta, showOldUrl } from "/assets/site.js";

const root = document.querySelector("[data-article]");
const slug = (new URLSearchParams(location.search).get("slug") || "").replace(/^\/+|\/+$/g, "");
const mediaId = (url) => (String(url).match(/\/media\/([^/?#]+)/) || [])[1] || "";
let mounted = false;

const store = createPostStore({ slug });

function render(s) {
  if (s.notFound || !slug) {
    document.title = "Article not found | Knewspaper";
    root.innerHTML = `<div class="wrap narrow page"><h1 class="listing__title">This article isn’t here</h1><p class="listing__intro">It may have been moved or unpublished. <a href="/search.html">Search the site</a> or <a href="/blog.html">see all articles</a>.</p></div>`;
    return;
  }
  if (!s.post) {
    root.querySelector("[data-status]").textContent = s.error ? `The article could not load: ${s.error}` : "Loading article…";
    return;
  }
  const p = s.post;
  if (!mounted) mount(p, s);
  // Engagement and related posts arrive after the post; update those parts only.
  const like = root.querySelector("[data-like]");
  like.setAttribute("aria-pressed", String(s.isLiked));
  like.disabled = s.liking;
  like.textContent = (s.isLiked ? "Liked" : "Like") + (s.likeCountLoaded && s.likeCount !== undefined ? ` · ${s.likeCount}` : "");
  const rel = root.querySelector("[data-related]");
  if (s.related === null) rel.innerHTML = "";
  else if (!s.related.length) rel.closest("section").hidden = true;
  else rel.innerHTML = s.related.slice(0, 4).map(card.tile).join("");
}

function mount(p, s) {
  mounted = true;
  showOldUrl("/post/" + p.slug);
  document.title = `${p.seoTitle || p.title} | Knewspaper`;
  const md = document.querySelector('meta[name="description"]');
  if (md && p.seoDescription) md.content = p.seoDescription;
  const cat = s.categories[0];
  if (cat) markActive(cat.slug);
  const isHealth = s.categories.some((c) => /health|medical|fitness/i.test(c.slug));
  const share = encodeURIComponent(location.href);
  const shareText = encodeURIComponent(p.title);

  root.innerHTML = `
    <header class="wrap article__head">
      <nav class="crumbs" aria-label="Breadcrumb"><ol>
        <li><a href="/">Home</a></li>
        ${cat ? `<li><a href="${catHref(cat.slug)}">${esc(cat.label)}</a></li>` : ""}
        <li><span aria-current="page">${esc(p.title.length > 48 ? p.title.slice(0, 47) + "…" : p.title)}</span></li>
      </ol></nav>
      <h1 class="article__title">${esc(p.title)}</h1>
      ${p.excerpt ? `<p class="article__dek">${esc(p.excerpt)}</p>` : ""}
      <div class="article__meta">
        ${meta(p, { author: true })}
        <div class="share" aria-label="Share this article">
          <button type="button" class="share__like" data-like aria-pressed="false">Like</button>
          <a href="https://wa.me/?text=${shareText}%20${share}" rel="noopener" target="_blank">WhatsApp</a>
          <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${share}" rel="noopener" target="_blank">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" rel="noopener" target="_blank">Facebook</a>
          <button type="button" data-copy>Copy link</button>
        </div>
      </div>
    </header>
    ${p.coverUrl ? `<figure class="wrap article__hero"><img src="${esc(p.coverUrl)}" alt="${esc(p.coverAlt)}" fetchpriority="high" decoding="async"></figure>` : ""}
    <div class="wrap article__layout">
      <nav class="toc" aria-labelledby="toc-title" hidden><h2 id="toc-title" class="toc__title">In this article</h2><ol data-toc></ol></nav>
      <div class="prose" data-body></div>
    </div>
    <section class="wrap shelf shelf--related" aria-labelledby="related-title">
      <div class="section-head"><h2 id="related-title" class="section-head__title">Read next</h2></div>
      <div class="tiles" data-related></div>
    </section>
    <section class="wrap narrow comments" aria-labelledby="comments-title" data-comments hidden>
      <h2 id="comments-title" class="section-head__title">Comments</h2>
      <div data-thread></div>
      <form class="comment-form" data-comment-form>
        <label for="comment-text">Add a comment</label>
        <textarea id="comment-text" name="text" rows="4" required></textarea>
        <button type="submit" class="btn">Post comment</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>`;

  const body = root.querySelector("[data-body]");
  if (p.bodyHtml) body.innerHTML = p.bodyHtml;
  else body.replaceChildren(...p.paragraphs.map((t) => Object.assign(document.createElement("p"), { textContent: t })));

  // The cover often repeats as the first body image; it is already shown above.
  const coverId = mediaId(p.coverUrl);
  const firstImg = body.querySelector("img");
  if (coverId && firstImg && mediaId(firstImg.src) === coverId) (firstImg.closest("figure") || firstImg).remove();
  body.querySelectorAll("img").forEach((img) => { img.loading = "lazy"; img.decoding = "async"; });
  body.querySelectorAll("table").forEach((t) => { if (!t.parentElement.classList.contains("table-wrap")) { const w = document.createElement("div"); w.className = "table-wrap"; t.replaceWith(w); w.append(t); } });

  // Contents list from the article's own headings.
  const heads = [...body.querySelectorAll("h2")];
  if (heads.length >= 3) {
    const used = new Set();
    root.querySelector("[data-toc]").innerHTML = heads.map((h) => {
      let id = h.id || h.textContent.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "section";
      while (used.has(id)) id += "-x";
      used.add(id);
      h.id = id;
      return `<li><a href="#${esc(id)}">${esc(h.textContent)}</a></li>`;
    }).join("");
    root.querySelector(".toc").hidden = false;
    root.querySelector(".article__layout").classList.add("has-toc");
  }
  if (isHealth) body.insertAdjacentHTML("beforeend", '<aside class="note" role="note"><p>This article is for general information only and is not medical advice. Please consult a qualified doctor about your health.</p></aside>');
  if (s.categories.length) body.insertAdjacentHTML("beforeend", `<p class="article__topics">Filed under ${s.categories.map((c) => `<a href="${catHref(c.slug)}">${esc(c.label)}</a>`).join(", ")}</p>`);

  root.querySelector("[data-like]").addEventListener("click", () => store.toggleLike().catch(() => {}));
  if (p.commentingEnabled && p.referenceId) mountComments(p.referenceId);
}

function mountComments(referenceId) {
  const section = root.querySelector("[data-comments]");
  const thread = section.querySelector("[data-thread]");
  const form = section.querySelector("[data-comment-form]");
  const formStatus = form.querySelector(".form-status");
  section.hidden = false;
  const comments = createCommentsStore({ referenceId });

  const one = (c) => {
    if (c.status === "DELETED") return `<li class="comment comment--deleted"><p>This comment was deleted.</p></li>`;
    return `<li class="comment">
      <p class="comment__meta">${c.authorName ? `<strong>${esc(c.authorName)}</strong>` : "<strong>Reader</strong>"}${c.dateLabel ? ` <time datetime="${esc(c.dateISO)}">${esc(c.dateLabel)}</time>` : ""}${c.status === "PENDING" ? " <em>Awaiting approval</em>" : ""}</p>
      <p>${esc(c.text)}</p>
      ${c.isOwn ? `<button type="button" class="link-btn" data-action="delete" data-id="${esc(c.id)}">Delete</button>` : ""}
    </li>`;
  };
  comments.subscribe((s) => {
    if (s.comments === null) { thread.innerHTML = '<p class="muted">Loading comments…</p>'; return; }
    if (s.error) { thread.innerHTML = `<p class="muted" role="alert">Comments could not load: ${esc(s.error)}</p>`; return; }
    thread.innerHTML = s.comments.length
      ? `<ul class="comment-list">${s.comments.map((c) => {
          const r = s.replies[c.id];
          const shown = r ? r.comments.length : 0;
          const left = (c.replyCount || 0) - shown;
          return one(c).replace(/<\/li>$/, `${r && r.comments.length ? `<ul class="comment-list comment-list--replies">${r.comments.map(one).join("")}</ul>` : ""}${left > 0 ? `<button type="button" class="link-btn" data-action="replies" data-id="${esc(c.id)}">Show ${left} ${left === 1 ? "reply" : "replies"}</button>` : ""}</li>`);
        }).join("")}</ul>${s.hasMore ? `<button type="button" class="btn btn--quiet" data-action="more"${s.loadingMore ? " disabled" : ""}>Show more comments</button>` : ""}`
      : '<p class="muted">No comments yet.</p>';
    form.querySelector("button").disabled = s.saving;
    if (s.needsSignIn) form.innerHTML = '<p class="muted">Only signed-in members can comment on this article.</p>';
  });
  section.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-action]");
    if (!b) return;
    if (b.dataset.action === "replies") comments.loadReplies(b.dataset.id).catch(() => {});
    else if (b.dataset.action === "delete") comments.remove(b.dataset.id).catch(() => {});
    else if (b.dataset.action === "more") comments.loadMore().catch(() => {});
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = form.elements.text.value.trim();
    if (!text) { formStatus.textContent = "Write a comment first."; formStatus.dataset.kind = "error"; return; }
    comments.create(text, { parentId: null, topLevelId: null }).then((c) => {
      if (!c) return;
      form.reset();
      formStatus.dataset.kind = "ok";
      formStatus.textContent = c.status === "PENDING" ? "Comment sent. It appears once approved." : "Comment posted.";
    }).catch(() => { formStatus.dataset.kind = "error"; formStatus.textContent = "Your comment didn’t post. Try again."; });
  });
  comments.start();
}

await categoriesReady;
store.subscribe(render);
render(store.getState());
store.start();
