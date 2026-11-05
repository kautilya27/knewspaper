// Publishes paid guest posts from the Write for us page. Runs on GitHub
// Actions every 10 minutes (.github/workflows/guest-posts.yml), with a Wix API
// key from the repository's secrets. Never runs in a browser.
//
// For each new submission in the GuestSubmissions collection:
//   1. Check it against the rules (guest-rules.js, the same file the page uses).
//      A problem → status "needs_changes" with the reasons; no credit is used.
//   2. Find a free article credit on one of the writer's ACTIVE plan orders.
//      None → status "awaiting_payment"; it is retried on every run, so it
//      goes live as soon as the payment comes through.
//   3. Upload the featured image, create and publish the blog post as the
//      writer (their member profile is the byline), add the old-style
//      /post/<slug> redirect, record the used credit in GuestLedger, and mark
//      the submission "live" with its URL.
// Every run also checks the posts already published: one that the site owner
// unpublished or deleted is marked "removed", and its credit is returned, so
// the writer can publish one more article in its place.
//
// Environment: WIX_API_KEY (required), WIX_SITE_ID, DRY_RUN=1 (check and log only).
import { htmlToRicos } from "./html-to-ricos.mjs";
import { PLAN_CREDITS, SPONSORED_NOTE, checkSubmission, isValidSlug } from "../wix-preview/src/assets/guest-rules.js";

const SITE_ID = process.env.WIX_SITE_ID || "fc7a03c1-28fe-4510-90ba-025a62b06835";
const API_KEY = process.env.WIX_API_KEY;
const DRY_RUN = process.env.DRY_RUN === "1";
const SITE = "https://www.knewspaper.in";
const SUBMISSIONS = "GuestSubmissions";
const LEDGER = "GuestLedger";
const MAX_ATTEMPTS = 3;

if (!API_KEY) {
  // Not set up yet: say so in the run log without failing (a failing run emails the owner every 10 minutes).
  console.log("::warning::WIX_API_KEY is not set, so no guest posts were published. Add it under Settings → Secrets and variables → Actions.");
  process.exit(0);
}

async function api(method, path, body) {
  const url = path.startsWith("http") ? path : "https://www.wixapis.com" + path;
  const res = await fetch(url, {
    method,
    headers: { Authorization: API_KEY, "wix-site-id": SITE_ID, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) {
    const err = new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

// ---- data helpers -------------------------------------------------------------------------------

async function queryAll(collection, filter) {
  const items = [];
  for (let offset = 0; offset < 5000; offset += 100) {
    const r = await api("POST", "/wix-data/v2/items/query", {
      dataCollectionId: collection,
      query: { filter, sort: [{ fieldName: "_createdDate", order: "ASC" }], paging: { limit: 100, offset } },
    });
    const page = r.dataItems || [];
    items.push(...page);
    if (page.length < 100) break;
  }
  return items;
}

async function patchItem(collection, itemId, fields) {
  if (DRY_RUN) { console.log("  [dry run] would set", Object.keys(fields).join(", "), "on", itemId); return; }
  await api("PATCH", `/wix-data/v2/items/${itemId}`, {
    dataCollectionId: collection,
    patch: {
      dataItemId: itemId,
      fieldModifications: Object.entries(fields).map(([fieldPath, value]) => ({ fieldPath, action: "SET_FIELD", setFieldOptions: { value } })),
    },
  });
}

async function insertItem(collection, data) {
  if (DRY_RUN) { console.log("  [dry run] would insert into", collection, JSON.stringify(data)); return { id: "dry-run" }; }
  const r = await api("POST", "/wix-data/v2/items", { dataCollectionId: collection, dataItem: { data } });
  return r.dataItem;
}

const ordersCache = new Map();
async function activeOrders(memberId) {
  if (ordersCache.has(memberId)) return ordersCache.get(memberId);
  const qs = new URLSearchParams();
  qs.append("buyerIds", memberId);
  qs.append("orderStatuses", "ACTIVE");
  qs.append("limit", "50");
  const r = await api("GET", "/pricing-plans/v2/orders?" + qs.toString());
  const orders = (r.orders || [])
    .filter((o) => PLAN_CREDITS[o.planId])
    .sort((a, b) => String(a.createdDate).localeCompare(String(b.createdDate))); // oldest first: it expires first
  ordersCache.set(memberId, orders);
  return orders;
}

const owner = (item) => item.data._owner;
const asText = (v) => (typeof v === "string" ? v : "");

// ---- removed posts give their credit back -------------------------------------------------------

async function returnCreditsForRemovedPosts(ledger) {
  const live = ledger.filter((e) => e.data.state === "live" && e.data.postId);
  const found = new Set();
  for (let i = 0; i < live.length; i += 100) {
    const ids = live.slice(i, i + 100).map((e) => e.data.postId);
    const r = await api("POST", "/blog/v3/posts/query", { query: { filter: { id: { $in: ids } }, paging: { limit: 100 } } });
    for (const p of r.posts || []) found.add(p.id);
  }
  for (const e of live) {
    if (found.has(e.data.postId)) continue;
    console.log(`Removed by the site owner: ${e.data.slug} → credit returned`);
    await patchItem(LEDGER, e.id, { state: "removed" });
    e.data.state = "removed";
    if (e.data.submissionId) {
      await patchItem(SUBMISSIONS, e.data.submissionId, {
        status: "removed",
        message: "We removed this article because it went against the Write for us guidelines. Its credit has been returned, so you can publish one more article in its place.",
      });
    }
  }
}

// ---- publishing ---------------------------------------------------------------------------------

async function uploadImage(dataUrl, slug, alt) {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || "");
  if (!m) throw Object.assign(new Error("The featured image could not be read. Upload it again as a JPG, PNG or WebP."), { forWriter: true });
  const mimeType = m[1];
  const bytes = Buffer.from(m[2], "base64");
  const ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
  const fileName = `${slug}.${ext}`;
  const { uploadUrl } = await api("POST", "/site-media/v1/files/generate-upload-url", { mimeType, fileName });
  const put = await fetch(uploadUrl + (uploadUrl.includes("?") ? "&" : "?") + "filename=" + encodeURIComponent(fileName), {
    method: "PUT",
    headers: { "Content-Type": mimeType },
    body: bytes,
  });
  if (!put.ok) throw new Error(`Image upload failed: ${put.status} ${(await put.text()).slice(0, 200)}`);
  const file = (await put.json()).file;
  const meta = (file.media && file.media.image && file.media.image.image) || {};
  return { id: meta.id || file.id, url: meta.url || file.url, width: meta.width, height: meta.height, altText: alt };
}

async function slugTaken(slug) {
  try {
    await api("GET", "/blog/v3/posts/slugs/" + encodeURIComponent(slug));
    return true;
  } catch (e) {
    if (e.status === 404) return false;
    throw e;
  }
}

function sponsoredNote() {
  return {
    type: "PARAGRAPH", id: "sponsored-note", nodes: [{ type: "TEXT", id: "", nodes: [], textData: { text: SPONSORED_NOTE, decorations: [{ type: "ITALIC", italicData: true }] } }],
    paragraphData: { textStyle: { textAlignment: "AUTO" } },
  };
}

async function publish(sub, ricos, order) {
  const d = sub.data;
  const slug = d.slug;
  const image = await uploadImage(d.image, slug, d.imageAlt);
  const draftPost = {
    title: d.title.trim(),
    memberId: owner(sub),
    excerpt: d.metaDescription.trim(),
    // Disclosure first: the post is paid, and its outside links are rel="sponsored".
    richContent: { nodes: [sponsoredNote(), ...ricos.nodes] },
    seoSlug: slug,
    commentingEnabled: true,
    language: "en",
    categoryIds: d.categoryId ? [d.categoryId] : [],
    media: { wixMedia: { image }, displayed: true, custom: true },
    seoData: {
      tags: [
        { type: "title", children: d.metaTitle.trim(), custom: true, disabled: false },
        { type: "meta", props: { name: "description", content: d.metaDescription.trim() }, custom: true, disabled: false },
      ],
    },
  };
  const created = await api("POST", "/blog/v3/draft-posts", { draftPost, publish: true });
  const postId = created.draftPost && created.draftPost.id;
  if (!postId) throw new Error("Wix did not return the new post's id.");

  // Record the used credit first: if a later step fails, the post is not published twice.
  const publishedAt = new Date().toISOString();
  await insertItem(LEDGER, {
    submissionId: sub.id, memberId: owner(sub), orderId: order.id, planId: order.planId,
    postId, slug, state: "live", publishedAt: { $date: publishedAt },
  });

  const post = await api("GET", "/blog/v3/posts/" + postId).then((r) => r.post).catch(() => null);
  const liveSlug = (post && post.slug) || slug;
  await api("POST", "https://www.wixapis.com/seo-redirects-service/v1/create-redirect", {
    redirect: { from: "/post/" + liveSlug, to: "/post.html?slug=" + liveSlug, options: { forceReplace: true } },
  }).catch((e) => console.warn("  redirect not created:", e.message));

  const postUrl = `${SITE}/post/${liveSlug}`;
  await patchItem(SUBMISSIONS, sub.id, {
    status: "live",
    message: "Your article is live.",
    postUrl,
    orderId: order.id,
    image: "", // the image now lives in Wix Media; drop the copy
  });
  return postUrl;
}

async function handle(sub, ledger) {
  const d = sub.data;
  const label = `${sub.id} "${asText(d.title).slice(0, 60)}"`;
  const ricos = htmlToRicos(asText(d.content));
  const fields = {
    title: asText(d.title), slug: asText(d.slug), metaTitle: asText(d.metaTitle),
    metaDescription: asText(d.metaDescription), imageAlt: asText(d.imageAlt), hasImage: /^data:image\//.test(asText(d.image)),
  };
  const problems = checkSubmission(fields, ricos.doc);
  if (!problems.length && isValidSlug(fields.slug) && (await slugTaken(fields.slug)))
    problems.push(`The URL slug "${fields.slug}" is already used by another article. Choose a different one.`);
  if (problems.length) {
    console.log(`Needs changes: ${label}\n  - ${problems.join("\n  - ")}`);
    await patchItem(SUBMISSIONS, sub.id, { status: "needs_changes", message: problems.join(" ") });
    return;
  }

  const orders = await activeOrders(owner(sub));
  const used = (orderId) => ledger.filter((e) => e.data.orderId === orderId && e.data.state === "live").length;
  const order = orders.find((o) => used(o.id) < PLAN_CREDITS[o.planId]);
  if (!order) {
    console.log(`Waiting for payment: ${label}`);
    if (d.status !== "awaiting_payment")
      await patchItem(SUBMISSIONS, sub.id, { status: "awaiting_payment", message: "Waiting for your plan. Email us at knewspaper.in@gmail.com to buy it; your article goes live once we've added the plan to your account." });
    return;
  }

  if (DRY_RUN) { console.log(`[dry run] would publish ${label} on order ${order.id}`); return; }
  await patchItem(SUBMISSIONS, sub.id, { status: "publishing", message: "Publishing…" });
  try {
    const url = await publish(sub, ricos, order);
    ledger.push({ data: { orderId: order.id, state: "live" } });
    console.log(`Published: ${label} → ${url}`);
  } catch (e) {
    const attempts = (Number(d.attempts) || 0) + 1;
    console.error(`Failed (${attempts}/${MAX_ATTEMPTS}): ${label}: ${e.message}`);
    if (e.forWriter) await patchItem(SUBMISSIONS, sub.id, { status: "needs_changes", message: e.message, attempts });
    else if (attempts >= MAX_ATTEMPTS)
      await patchItem(SUBMISSIONS, sub.id, { status: "error", message: "We couldn't publish this automatically. We've been notified and will sort it out; you can also email knewspaper.in@gmail.com.", attempts });
    else await patchItem(SUBMISSIONS, sub.id, { status: "queued", message: "Publishing is taking longer than usual. It will be retried in a few minutes.", attempts });
    process.exitCode = 1;
  }
}

// A run that stopped half-way leaves a submission in "publishing". If its post
// was created, finish the bookkeeping; if not and it has waited 20 minutes, try again.
async function recoverInterrupted(sub, ledger) {
  const entry = ledger.find((e) => e.data.submissionId === sub.id);
  if (entry) {
    await patchItem(SUBMISSIONS, sub.id, { status: "live", message: "Your article is live.", postUrl: `${SITE}/post/${entry.data.slug}`, orderId: entry.data.orderId, image: "" });
    return false;
  }
  const updated = Date.parse((sub.data._updatedDate && sub.data._updatedDate.$date) || sub.data._updatedDate || 0);
  return Date.now() - updated > 20 * 60 * 1000;
}

async function main() {
  const ledger = await queryAll(LEDGER, {});
  await returnCreditsForRemovedPosts(ledger);
  const subs = await queryAll(SUBMISSIONS, { status: { $in: ["queued", "awaiting_payment", "publishing"] } });
  console.log(`${subs.length} submission(s) to check, ${ledger.length} credit record(s).`);
  for (const sub of subs) {
    if (!owner(sub)) continue;
    if (sub.data.status === "publishing" && !(await recoverInterrupted(sub, ledger))) continue;
    await handle(sub, ledger);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
