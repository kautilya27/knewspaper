// Submit your article (submit-article.html): the plans, the account box and the
// article form. Plans are bought by email and paid manually; the owner then adds
// the plan to the writer's account in Wix Pricing Plans (an offline order), which
// gives the article credits. The article is saved to the GuestSubmissions
// collection as the logged-in member, and the GitHub publisher
// (guest-posts/publish.mjs) puts it live. The writer's articles are listed on
// My account (my-account.html); login and credits come from account-core.js.
import { subscribeMember, getMemberState } from "/js/wix/member-store.js";
import { wixRequest } from "/js/wix/client.js";
import { categoriesReady, esc } from "/assets/site.js";
import { PLANS, planKeyById, inr, showBuy } from "/assets/plans.js";
import { RULES, slugify, isValidSlug, countWords, parseLink, checkSubmission, linkCounts } from "/assets/guest-rules.js";
import { initAccount, account, onAccount, accountEmail, reloadAccount, COLLECTION } from "/assets/account-core.js";

const SITE = "https://www.knewspaper.in";
const PAGE = "/submit-article.html";
const DRAFT_KEY = "knews.wfu.draft";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const form = $("[data-wfu-form]");
const status = $("[data-form-status]");
const editor = $("[data-editor]");
const say = (el, text, kind = "ok") => { el.dataset.kind = kind; el.textContent = text; };

// ------------------------------------------------------------------ plans
let planKey = "single";
function setPlan(key, scroll) {
  if (!PLANS[key]) return;
  planKey = key;
  form.elements.plan.value = key;
  $$(".wfu-card").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pick === key)));
  const single = $(".wfu-single");
  if (single) single.dataset.selected = String(key === "single");
  updatePay();
  saveDraft();
  if (scroll) $("#submit").scrollIntoView({ behavior: "smooth", block: "start" });
}
// Plan cards: a single post goes to the form with that plan chosen; a membership
// opens the buy box (a writer may buy now and publish later).
$$("[data-pick]").forEach((b) => b.addEventListener("click", () => {
  const key = b.dataset.pick;
  if (key === "single") { setPlan(key, true); return; }
  setPlan(key, false);
  showBuy(key, "", accountEmail());
}));
form.elements.plan.addEventListener("change", () => setPlan(form.elements.plan.value, false));

// ---------------------------------------------------------------- account
const accountEl = $("[data-account]");
onAccount(() => updatePay());

// ----------------------------------------------------------------- editor
const ALLOWED = { P: "p", DIV: "p", H1: "h2", H2: "h2", H3: "h3", H4: "h3", H5: "h3", H6: "h3", UL: "ul", OL: "ol", LI: "li", BLOCKQUOTE: "blockquote", STRONG: "strong", B: "strong", EM: "em", I: "em", A: "a", BR: "br" };
const DROP = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "NOSCRIPT", "TEMPLATE", "SVG", "IMG", "VIDEO", "AUDIO", "META", "LINK", "TITLE", "HEAD", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "FORM"]);
// Rebuild HTML keeping only the allowed tags. Links keep only href (every outside
// link is published as rel="sponsored").
function cleanHtml(html) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const walk = (node) => {
    let out = "";
    for (const c of node.childNodes) {
      if (c.nodeType === 3) { out += esc(c.textContent); continue; }
      if (c.nodeType !== 1 || DROP.has(c.tagName)) continue;
      const tag = ALLOWED[c.tagName];
      if (c.tagName === "B" && /font-weight:\s*normal/i.test(c.getAttribute("style") || "")) { out += walk(c); continue; } // Google Docs wrapper
      if (!tag) { out += walk(c); continue; }
      if (tag === "br") { out += "<br>"; continue; }
      if (tag === "a") {
        const link = parseLink(c.getAttribute("href"));
        if (!link) { out += walk(c); continue; }
        out += `<a href="${esc(link.href)}" rel="${link.internal ? "noopener" : "sponsored noopener"}">${walk(c)}</a>`;
        continue;
      }
      out += `<${tag}>${walk(c)}</${tag}>`;
    }
    return out;
  };
  return walk(doc.body).replace(/<p>(\s|<br>)*<\/p>/g, "");
}

function docModel() {
  const links = $$("a[href]", editor).map((a) => {
    const l = parseLink(a.getAttribute("href"));
    return l ? { href: l.href, internal: l.internal } : null;
  });
  return {
    words: countWords(editor.innerText),
    h2: $$("h2, h1", editor).length,
    h3: $$("h3, h4, h5, h6", editor).length,
    links: links.filter(Boolean),
    badLinks: links.filter((l) => !l).length,
  };
}

function updateMeter() {
  const d = docModel();
  const { external } = linkCounts(d);
  const set = (key, text, bad) => { const el = $(`[data-meter=${key}]`); el.textContent = text; el.toggleAttribute("data-over", bad); };
  const started = d.words > 0;
  set("words", `${d.words} words`, started && (d.words < RULES.minWords || d.words > RULES.maxWords));
  set("headings", `${d.h2 + d.h3} subheading${d.h2 + d.h3 === 1 ? "" : "s"}`, started && (d.h2 < 1 || d.h2 + d.h3 < RULES.minHeadings));
  set("links", `Links to other sites ${external}/${RULES.maxLinks}`, external > RULES.maxLinks);
}

let savedRange = null;
const keepSelection = () => {
  const sel = getSelection();
  if (sel.rangeCount && editor.contains(sel.anchorNode)) savedRange = sel.getRangeAt(0).cloneRange();
};
const restoreSelection = () => {
  editor.focus();
  if (savedRange) { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(savedRange); }
};
document.addEventListener("selectionchange", keepSelection);
editor.addEventListener("focus", () => { try { document.execCommand("defaultParagraphSeparator", false, "p"); } catch {} });

const toolbar = $("[data-toolbar]");
toolbar.addEventListener("mousedown", (e) => { if (e.target.closest("button")) e.preventDefault(); });
toolbar.addEventListener("click", (e) => {
  const b = e.target.closest("[data-cmd]");
  if (!b) return;
  restoreSelection();
  const cmd = b.dataset.cmd;
  if (/^(p|h2|h3|blockquote)$/.test(cmd)) document.execCommand("formatBlock", false, "<" + cmd + ">");
  else if (cmd === "link") return openLinkBar();
  else document.execCommand(cmd, false, null);
  changed();
});

// Link bar: add, edit or remove a link.
// (A div, not a form: it sits inside the article form.)
const linkBar = $("[data-linkbar]");
const linkUrl = $("[data-link-url]", linkBar), linkStatus = $(".form-status", linkBar);
let editingLink = null;
function openLinkBar(a = null) {
  keepSelection();
  editingLink = a;
  linkBar.hidden = false;
  linkUrl.value = a ? a.getAttribute("href") : "https://";
  $("[data-unlink]", linkBar).hidden = !a;
  say(linkStatus, "");
  linkUrl.focus();
  linkUrl.select();
}
editor.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a && editor.contains(a)) { e.preventDefault(); openLinkBar(a); }
});
function applyLink() {
  const link = parseLink(linkUrl.value);
  if (!link) { say(linkStatus, "Enter a full address starting with https://", "error"); return; }
  const rel = link.internal ? "noopener" : "sponsored noopener";
  if (editingLink) {
    editingLink.setAttribute("href", link.href);
    editingLink.setAttribute("rel", rel);
  } else {
    restoreSelection();
    const sel = getSelection();
    if (!sel.rangeCount || sel.isCollapsed) {
      document.execCommand("insertHTML", false, `<a href="${esc(link.href)}" rel="${rel}">${esc(link.href)}</a>`);
    } else {
      document.execCommand("createLink", false, link.href);
      $$("a:not([rel])", editor).forEach((a) => a.setAttribute("rel", rel));
    }
  }
  linkBar.hidden = true;
  editingLink = null;
  changed();
}
$("[data-add-link]", linkBar).addEventListener("click", applyLink);
linkUrl.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } });
$("[data-unlink]", linkBar).addEventListener("click", () => {
  if (editingLink) editingLink.replaceWith(...editingLink.childNodes);
  linkBar.hidden = true;
  editingLink = null;
  changed();
});
$("[data-cancel-link]", linkBar).addEventListener("click", () => { linkBar.hidden = true; editingLink = null; });

editor.addEventListener("paste", (e) => {
  const html = e.clipboardData.getData("text/html");
  const text = e.clipboardData.getData("text/plain");
  e.preventDefault();
  const clean = html
    ? cleanHtml(html)
    : text.split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
  document.execCommand("insertHTML", false, clean);
  changed();
});
editor.addEventListener("input", changed);

// --------------------------------------------------------------- fields
const F = form.elements;
let slugEdited = false;
function serp() {
  $("[data-serp-url]").textContent = `${SITE}/post/` + (F.slug.value || "your-slug");
  $("[data-serp-title]").textContent = (F.metaTitle.value || F.title.value || "Your SEO title appears here") + " | Knewspaper";
  $("[data-serp-desc]").textContent = F.metaDescription.value || "Your meta description appears here.";
}
F.title.addEventListener("input", () => { if (!slugEdited) F.slug.value = slugify(F.title.value); serp(); saveDraft(); });
F.slug.addEventListener("input", () => { slugEdited = true; serp(); saveDraft(); });
F.slug.addEventListener("change", () => { F.slug.value = slugify(F.slug.value); serp(); checkSlug(); });
$$("[data-count]").forEach((c) => {
  const el = F[c.dataset.count], max = +c.dataset.max;
  const upd = () => { c.textContent = el.value.length + "/" + max; c.toggleAttribute("data-over", el.value.length > max); serp(); };
  el.addEventListener("input", () => { upd(); saveDraft(); });
  upd();
});
["imageAlt", "categoryId"].forEach((n) => F[n].addEventListener("input", saveDraft));

let slugState = { slug: "", taken: false };
async function checkSlug() {
  const slug = F.slug.value;
  const hint = $("[data-slug-hint]");
  if (!isValidSlug(slug)) { hint.textContent = "Lowercase letters, numbers and hyphens."; hint.removeAttribute("data-over"); return; }
  try {
    await wixRequest(`/blog/v3/posts/slugs/${encodeURIComponent(slug)}`, { method: "GET" });
    slugState = { slug, taken: true };
  } catch (e) {
    slugState = { slug, taken: false };
    if (!(e && e.status === 404)) { hint.textContent = "Lowercase letters, numbers and hyphens."; hint.removeAttribute("data-over"); return; }
  }
  hint.textContent = slugState.taken ? "This slug is already used by another article. Choose a different one." : "This slug is free.";
  hint.toggleAttribute("data-over", slugState.taken);
}

categoriesReady.then((list) => {
  const sel = F.categoryId;
  const keep = sel.dataset.want || sel.value;
  sel.innerHTML = `<option value="">Choose a topic</option>` + list.map((c) => `<option value="${esc(c.id)}">${esc(c.label)}</option>`).join("");
  if (keep) sel.value = keep;
});

// Featured image: resized in the browser to at most 1600 px wide and about 350 KB.
let imageData = "";
F.image.addEventListener("change", async () => {
  const file = F.image.files[0];
  if (!file) return;
  const hint = $("[data-image-hint]");
  try {
    imageData = await prepareImage(file);
    showImage(imageData);
    hint.textContent = "";
    saveDraft();
  } catch (e) {
    imageData = "";
    hint.textContent = e.message;
  }
});
const drop = $("[data-drop]");
["dragover", "dragenter"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.dataset.over = "true"; }));
["dragleave", "drop"].forEach((t) => drop.addEventListener(t, () => { delete drop.dataset.over; }));
drop.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer.files[0]) { F.image.files = e.dataTransfer.files; F.image.dispatchEvent(new Event("change")); }
});
function showImage(src) {
  drop.replaceChildren();
  const img = new Image();
  img.alt = "";
  img.src = src;
  const note = document.createElement("span");
  note.textContent = "Click to change the image";
  drop.append(img, note);
}
function prepareImage(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\/(jpeg|png|webp|gif|avif|heic|heif)$/.test(file.type)) return reject(new Error("Use a JPG, PNG or WebP image."));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.naturalWidth < 800) return reject(new Error(`This image is ${img.naturalWidth} px wide. Use one at least 1200 px wide (800 px at the very least).`));
      const scale = Math.min(1, 1600 / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let q = 0.85, data = canvas.toDataURL("image/jpeg", q);
      while (data.length > 360000 && q > 0.45) { q -= 0.1; data = canvas.toDataURL("image/jpeg", q); }
      if (data.length > 420000) return reject(new Error("This image is too detailed to upload. Try a smaller or simpler image."));
      resolve(data);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("That file couldn't be opened as an image.")); };
    img.src = url;
  });
}

// ------------------------------------------------------------ draft
function draft() {
  return {
    plan: planKey, title: F.title.value, slug: F.slug.value, slugEdited, metaTitle: F.metaTitle.value,
    metaDescription: F.metaDescription.value, categoryId: F.categoryId.value, imageAlt: F.imageAlt.value,
    content: editor.innerHTML, image: imageData,
  };
}
let saveTimer = 0;
function saveDraft() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft())); }
    catch { try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft(), image: "" })); } catch {} }
  }, 400);
}
function fillForm(d) {
  if (!d) return;
  F.title.value = d.title || "";
  F.slug.value = d.slug || "";
  slugEdited = !!d.slugEdited || !!d.slug;
  F.metaTitle.value = d.metaTitle || "";
  F.metaDescription.value = d.metaDescription || "";
  F.categoryId.dataset.want = d.categoryId || "";
  F.categoryId.value = d.categoryId || "";
  F.imageAlt.value = d.imageAlt || "";
  editor.innerHTML = cleanHtml(d.content || "");
  if (d.image && /^data:image\//.test(d.image)) { imageData = d.image; showImage(imageData); }
  if (d.plan) setPlan(d.plan, false);
  else if (d.planId && planKeyById[d.planId]) setPlan(planKeyById[d.planId], false);
  $$("[data-count]").forEach((c) => F[c.dataset.count].dispatchEvent(new Event("input")));
  serp();
  updateMeter();
}
function changed() { updateMeter(); saveDraft(); }

// ------------------------------------------------------------ submit
function updatePay() {
  const s = getMemberState();
  const btn = $("[data-paybtn]");
  const total = $("[data-total]"), note = $("[data-total-note]"), planField = $("[data-plan-field]");
  const plan = PLANS[planKey];
  if (s.loggedIn && account.loaded && account.credits > 0) {
    planField.hidden = true;
    total.textContent = "1 credit";
    note.textContent = `You have ${account.credits} left. No payment needed.`;
    btn.textContent = "Publish article";
  } else {
    planField.hidden = false;
    total.textContent = inr(plan.price);
    note.textContent = `${plan.label} · paid by email after you submit`;
    btn.textContent = s.loggedIn ? "Submit article" : "Log in to continue";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const s = getMemberState();
  const problemsEl = $("[data-problems]");
  problemsEl.hidden = true;
  if (!s.loggedIn) {
    saveDraft();
    say(status, "Log in or create an account first. Your article stays in the form.", "error");
    accountEl.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const content = cleanHtml(editor.innerHTML);
  editor.innerHTML = content;
  updateMeter();
  const fields = {
    title: F.title.value.trim(), slug: slugify(F.slug.value), metaTitle: F.metaTitle.value.trim(),
    metaDescription: F.metaDescription.value.trim(), imageAlt: F.imageAlt.value.trim(), hasImage: !!imageData,
  };
  F.slug.value = fields.slug;
  const problems = checkSubmission(fields, docModel());
  if (slugState.slug === fields.slug && slugState.taken) problems.push("The URL slug is already used by another article. Choose a different one.");
  if (!F.original.checked || !F.agree.checked) problems.push("Tick both boxes at the end of the form.");
  if (problems.length) {
    problemsEl.innerHTML = `<p><strong>Please fix ${problems.length === 1 ? "this" : "these"} first:</strong></p><ul>${problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
    problemsEl.hidden = false;
    problemsEl.scrollIntoView({ behavior: "smooth", block: "center" });
    say(status, "");
    return;
  }

  const btn = $("[data-paybtn]");
  btn.disabled = true;
  const useCredit = account.loaded && account.credits > 0;
  say(status, useCredit ? "Submitting your article…" : "Saving your article…");
  try {
    await wixRequest("/wix-data/v2/items", {
      body: {
        dataCollectionId: COLLECTION,
        dataItem: {
          data: {
            title: fields.title, slug: fields.slug, metaTitle: fields.metaTitle, metaDescription: fields.metaDescription,
            categoryId: F.categoryId.value, content, image: imageData, imageAlt: fields.imageAlt,
            planId: PLANS[planKey].id, status: useCredit ? "queued" : "awaiting_payment",
            ...(useCredit ? {} : { message: "Waiting for your plan. Email us to buy it; your article goes live once we've added the plan to your account." }),
          },
        },
      },
    });
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    const title = fields.title;
    say(status, useCredit
      ? `Submitted. It goes live within about 15 minutes at ${SITE}/post/${fields.slug}. You can follow it on your My account page.`
      : "Saved. Now buy your plan by email; your article goes live once we've added the plan to your account. You can follow it on your My account page.", "ok");
    {
      const key = planKey;
      form.reset();
      setPlan(key, false);
      slugEdited = false;
      editor.innerHTML = "";
      imageData = "";
      drop.innerHTML = drop.dataset.empty;
      reloadAccount();
      status.scrollIntoView({ behavior: "smooth", block: "center" });
      if (!useCredit) setTimeout(() => showBuy(key, title, accountEmail()), 600);
    }
  } catch (err) {
    const tooBig = /size|too large|413/i.test(err && err.message);
    say(status, tooBig ? "The article and image are too large to save together. Try a smaller image." : "We couldn't save your article. Check your connection and try again; your text is still here.", "error");
  } finally {
    btn.disabled = false;
  }
});

// ------------------------------------------------------------ start
initAccount({ page: PAGE, plansHref: "#plans", defaultPlan: () => planKey });
drop.dataset.empty = drop.innerHTML;
try { fillForm(JSON.parse(localStorage.getItem(DRAFT_KEY) || "null")); } catch {}
// A plan chosen on the Write for us page (?plan=…) comes first.
const askedPlan = new URLSearchParams(location.search).get("plan");
if (askedPlan && PLANS[askedPlan]) setPlan(askedPlan, false);
else if (!form.elements.plan.value) setPlan("single", false);
serp();
updateMeter();
updatePay();

// "Fix and submit again" on My account opens this page with ?fix=<article id>.
const fixId = new URLSearchParams(location.search).get("fix");
let fixDone = false;
async function loadFix() {
  const s = getMemberState();
  if (!fixId || fixDone || !s.loggedIn) return;
  fixDone = true;
  try {
    const r = await wixRequest(`/wix-data/v2/items/${encodeURIComponent(fixId)}`, { method: "GET", query: { dataCollectionId: COLLECTION } });
    fillForm(r.dataItem.data);
    say(status, "Your article is back in the form. Fix the points listed on My account, then submit it again.", "ok");
    $("#submit").scrollIntoView({ behavior: "smooth" });
  } catch (err) { say(status, "We couldn't load that article. Reload the page and try again.", "error"); }
}
if (fixId) { subscribeMember(loadFix); loadFix(); }
