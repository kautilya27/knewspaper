// The writer's account: log in, sign up, Google sign-in, article credits and the
// writer's articles. Shared by My account (my-account.html, assets/account.js) and
// Submit your article (submit-article.html, assets/write.js). Each page has the same
// account box ([data-account]); My account also has the article list ([data-my-articles]).
import { subscribeMember, getMemberState, login, register, verifyEmail, logout, refreshMember } from "/js/wix/member-store.js";
import { wixRequest, mintTokens, setTokens } from "/js/wix/client.js";
import { WIX_CLIENT_ID } from "/js/wix/config.js";
import { esc } from "/assets/site.js";
import { PLANS, planKeyById, inr, showBuy } from "/assets/plans.js";
import { PLAN_CREDITS } from "/assets/guest-rules.js";

const SITE = "https://www.knewspaper.in";
export const COLLECTION = "GuestSubmissions";
const GOOGLE_IDP = "0e6a50f5-b523-4e29-990d-f37fa2ffdd69";
const OAUTH_KEY = "knews.oauth";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const say = (el, text, kind = "ok") => { if (!el) return; el.dataset.kind = kind; el.textContent = text; };

export const accountEmail = () => { try { const m = getMemberState().member || {}; return m.loginEmail || (m.contact && m.contact.emails && m.contact.emails[0]) || ""; } catch { return ""; } };

// Credits and submissions of the logged-in writer. Pages listen with onAccount().
export const account = { loaded: false, credits: 0, total: 0, validUntil: "", submissions: [], error: false };
const listeners = new Set();
export const onAccount = (fn) => { listeners.add(fn); };
const emit = () => listeners.forEach((fn) => fn(account));
const reset = () => Object.assign(account, { loaded: false, credits: 0, total: 0, validUntil: "", submissions: [], error: false });

let opts = { page: "/my-account.html", plansHref: "/submit-article.html#plans", defaultPlan: () => "single" };

async function loadAccount() {
  const creditsEl = $("[data-credits]");
  if (creditsEl) creditsEl.textContent = "Checking your article credits…";
  try {
    const [orders, subs] = await Promise.all([
      wixRequest("/pricing-plans/v2/member/orders", { method: "GET", query: { orderStatuses: ["ACTIVE"] } }).then((r) => r.orders || []),
      wixRequest("/wix-data/v2/items/query", {
        body: {
          dataCollectionId: COLLECTION,
          query: { sort: [{ fieldName: "_createdDate", order: "DESC" }], paging: { limit: 100 }, fields: ["title", "slug", "status", "message", "postUrl", "planId", "orderId"] },
        },
      }).then((r) => (r.dataItems || []).map((d) => ({ id: d.id, ...d.data }))),
    ]);
    const mine = orders.filter((o) => PLAN_CREDITS[o.planId]);
    const activeIds = new Set(mine.map((o) => o.id));
    const total = mine.reduce((n, o) => n + PLAN_CREDITS[o.planId], 0);
    const used = subs.filter((x) => (x.status === "live" && activeIds.has(x.orderId)) || x.status === "publishing" || x.status === "queued").length;
    const ends = mine.map((o) => o.endDate || (o.currentCycle && o.currentCycle.endedDate)).filter(Boolean).sort();
    Object.assign(account, { loaded: true, credits: Math.max(0, total - used), total, validUntil: ends.length ? ends[ends.length - 1] : "", submissions: subs, error: false });
  } catch (e) {
    Object.assign(account, { loaded: true, credits: 0, total: 0, validUntil: "", submissions: [], error: true });
  }
  renderCredits();
  renderList();
  emit();
}
export function reloadAccount() { account.loaded = false; return loadAccount(); }

function renderCredits() {
  const el = $("[data-credits]");
  if (!el) return;
  if (account.error) { el.textContent = "We couldn't load your credits just now. Reload the page to try again."; return; }
  if (!account.total) { el.innerHTML = `You have no article credits yet. <a href="${esc(opts.plansHref)}">Choose a plan</a>; we add it to your account once you've paid.`; return; }
  const until = account.validUntil ? ` (valid until ${new Date(account.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })})` : "";
  el.innerHTML = `<strong>${account.credits} of ${account.total}</strong> article credit${account.total === 1 ? "" : "s"} left${esc(until)}.`;
}

const STATUS = {
  queued: ["In the queue", "Goes live within about 15 minutes."],
  publishing: ["Publishing", "Goes live in a moment."],
  awaiting_payment: ["Waiting for your plan", "Buy the plan by email. It goes live once we've added the plan to your account."],
  live: ["Live", ""],
  needs_changes: ["Needs changes", ""],
  removed: ["Removed", ""],
  error: ["Problem", ""],
};
function renderList() {
  const listEl = $("[data-my-articles]");
  if (!listEl) return;
  if (!getMemberState().loggedIn) { listEl.innerHTML = `<p class="wfu-muted">Log in to see the articles you've submitted.</p>`; return; }
  const subs = account.submissions;
  if (!subs.length) { listEl.innerHTML = `<p class="wfu-muted">You haven't submitted an article yet. <a href="/submit-article.html#submit">Submit your first article</a>.</p>`; return; }
  listEl.innerHTML = `<ul class="wfu-list">${subs.map((x) => {
    const [label, hint] = STATUS[x.status] || [x.status || "Submitted", ""];
    const plan = PLANS[planKeyById[x.planId]];
    const actions = [
      x.status === "live" && x.postUrl ? `<a class="btn btn--quiet" href="${esc(x.postUrl)}">View article</a>` : "",
      x.status === "awaiting_payment" && plan ? `<button type="button" class="btn" data-buy="${esc(planKeyById[x.planId])}" data-title="${esc(x.title || "")}">Buy this plan (${inr(plan.price)})</button>` : "",
      x.status === "needs_changes" ? `<a class="btn btn--quiet" href="/submit-article.html?fix=${encodeURIComponent(x.id)}#submit">Fix and submit again</a>` : "",
    ].join("");
    return `<li class="wfu-item" data-status="${esc(x.status)}">
      <div class="wfu-item__head"><strong>${esc(x.title || "Untitled")}</strong><span class="wfu-badge2">${esc(label)}</span></div>
      <p class="wfu-item__msg">${esc(x.status === "live" || !x.message ? hint || x.message || "" : x.message)}</p>
      ${actions ? `<div class="wfu-item__actions">${actions}</div>` : ""}
    </li>`;
  }).join("")}</ul>`;
}

function renderMember(s) {
  if (!s.loading) document.querySelectorAll("[data-login-link]").forEach((a) => { a.textContent = s.loggedIn ? "My account" : "Log in"; });
  const panes = { loading: $("[data-pane=loading]"), out: $("[data-pane=out]"), in: $("[data-pane=in]") };
  const show = (name) => Object.entries(panes).forEach(([k, el]) => { if (el) el.hidden = k !== name; });
  if (s.loading) { show("loading"); return; }
  if (!s.loggedIn) {
    show("out");
    reset();
    renderList();
    emit();
    return;
  }
  show("in");
  const m = s.member || {};
  $$("[data-member-name]").forEach((el) => { el.textContent = m.displayName || [m.firstName, m.lastName].filter(Boolean).join(" ") || m.loginEmail || "your account"; });
  $$("[data-member-email]").forEach((el) => { el.textContent = accountEmail(); });
  if (!account.loaded) loadAccount();
}

// ------------------------------------------------- Google / Wix sign-in
// "Continue with Google" goes straight to Google through Wix (idp); Wix's own
// sign-in page is the fallback when Wix asks for a captcha, which a custom form
// can't show. Both come back to this page with a code in the URL fragment,
// exchanged here for member tokens (PKCE).
const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const randomString = () => b64url(crypto.getRandomValues(new Uint8Array(32)));
const callback = () => SITE + opts.page;
async function wixSignIn(idp, statusEl) {
  try {
    const verifier = randomString(), state = randomString();
    const challenge = b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
    try { localStorage.setItem(OAUTH_KEY, JSON.stringify({ verifier, state, at: Date.now() })); } catch {}
    const authRequest = {
      redirectUri: callback(), clientId: WIX_CLIENT_ID, codeChallenge: challenge, codeChallengeMethod: "S256",
      responseMode: "fragment", responseType: "code", scope: "offline_access", state, ...(idp ? { idp } : {}),
    };
    const res = await wixRequest("/headless/v1/redirect-session", { body: { auth: { authRequest } } });
    const url = res && res.redirectSession && res.redirectSession.fullUrl;
    if (!url) throw new Error("no sign-in address");
    location.assign(url);
  } catch (err) {
    say(statusEl, "Sign-in couldn't start. Reload the page and try again.", "error");
  }
}
async function finishWixSignIn(note) {
  const hash = new URLSearchParams(location.hash.slice(1));
  if (!hash.has("code") && !hash.has("error")) return;
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(OAUTH_KEY) || "null"); localStorage.removeItem(OAUTH_KEY); } catch {}
  history.replaceState(history.state, "", location.pathname + location.search + "#account");
  if (hash.has("error")) { say(note, "Sign-in was cancelled or failed. Try again.", "error"); return; }
  if (!saved || saved.state !== hash.get("state")) { say(note, "Sign-in expired. Please try again.", "error"); return; }
  try {
    const tokens = await mintTokens({ grantType: "authorization_code", code: hash.get("code"), codeVerifier: saved.verifier, redirectUri: callback() }, "member");
    setTokens(tokens);
    account.loaded = false;
    await refreshMember();
    const box = $("#account");
    if (box) box.scrollIntoView({ block: "center" });
  } catch {
    say(note, "Sign-in couldn't finish. Please try again.", "error");
  }
}

// Sets up the account box on this page. page: this page's own address (the
// sign-in return address); plansHref: where "Choose a plan" points; defaultPlan:
// the plan the "Buy a plan" button starts with.
export function initAccount(options = {}) {
  opts = { ...opts, ...options };
  const loginForm = $("[data-login]"), signupForm = $("[data-signup]"), verifyForm = $("[data-verify]"), approvalEl = $("[data-approval]");
  const showAuth = (which) => {
    [loginForm, signupForm, verifyForm, approvalEl].forEach((el) => { if (el) el.hidden = el !== which; });
    $$("[data-auth-tab]").forEach((t) => t.setAttribute("aria-selected", String((t.dataset.authTab === "login" && which === loginForm) || (t.dataset.authTab === "signup" && which === signupForm))));
  };
  $$("[data-auth-tab]").forEach((t) => t.addEventListener("click", () => showAuth(t.dataset.authTab === "signup" ? signupForm : loginForm)));
  const authResult = (result, f) => {
    if (result.state === "SUCCESS") { account.loaded = false; return; }
    // Wix sometimes asks for a captcha, which only its own sign-in page can show.
    if (/^-1997[01]$/.test(String(result.errorCode || "")) || /captcha/i.test(result.error || "")) {
      say($(".form-status", f), "Opening Wix's secure sign-in page…", "ok");
      wixSignIn(null, $(".form-status", f));
      return;
    }
    if (result.state === "EMAIL_VERIFICATION_REQUIRED") { showAuth(verifyForm); return; }
    if (result.state === "OWNER_APPROVAL_REQUIRED") { showAuth(approvalEl); return; }
    say($(".form-status", f), result.error || "That didn't work. Check the details and try again.", "error");
  };
  const bindAuth = (f, action) => {
    if (!f) return;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      const btn = $("button[type=submit]", f);
      btn.disabled = true;
      say($(".form-status", f), "");
      action(f.elements)
        .then((r) => authResult(r, f))
        .catch((err) => authResult({ state: "FAILURE", error: err && err.message ? err.message : String(err) }, f))
        .then(() => { btn.disabled = false; });
    });
  };
  bindAuth(loginForm, (f) => login(f.email.value.trim(), f.password.value));
  bindAuth(signupForm, (f) => register(f.email.value.trim(), f.password.value, { firstName: f.firstName.value.trim(), lastName: f.lastName.value.trim() }));
  bindAuth(verifyForm, (f) => verifyEmail(f.code.value.trim()));

  const note = loginForm ? $(".form-status", loginForm) : null;
  $$("[data-google]").forEach((b) => b.addEventListener("click", () => { b.disabled = true; wixSignIn(GOOGLE_IDP, note).finally(() => { b.disabled = false; }); }));
  $$("[data-logout]").forEach((b) => b.addEventListener("click", () => logout(opts.page).catch(() => location.reload())));

  // Buy buttons: an article's "Buy this plan" and the general "Buy a plan".
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-buy], [data-buy-mail]");
    if (!b) return;
    e.preventDefault();
    showBuy(b.dataset.buy || b.dataset.plan || opts.defaultPlan(), b.dataset.title || "", accountEmail());
  });

  subscribeMember(() => renderMember(getMemberState()));
  renderMember(getMemberState());
  finishWixSignIn(note);
}
