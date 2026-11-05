// Guest post rules, shared by the Write for us page (in the browser) and the
// GitHub publisher (in Node). One file, so the page and the publisher can't
// disagree about what passes. Plain ES module, no imports.

export const RULES = {
  minWords: 500,
  maxWords: 1500,
  minHeadings: 2, // H2 or H3, at least one of them an H2
  // Paid posts: every outside link is marked rel="sponsored" (Google's rule
  // for paid links), so there is one limit instead of do-follow/no-follow.
  maxLinks: 5,
  titleMin: 10,
  titleMax: 120,
  metaTitleMin: 10,
  metaTitleMax: 70,
  metaDescMin: 50,
  metaDescMax: 170,
  altMin: 5,
  altMax: 150,
  slugMin: 3,
  slugMax: 80,
};

// Article credits each plan gives, valid for a year from purchase.
export const PLAN_CREDITS = {
  "57bd1c30-084b-437b-94da-270f365b0c0e": 1, // Single guest post, ₹499
  "04f4d952-fc28-4c5d-99ce-559ff5e51b12": 5, // Membership: 5 articles, ₹999
  "b86d4fef-a32d-4ef8-84a7-c78100993911": 10, // Membership: 10 articles, ₹1,499
  "ced45f94-49c2-4e41-a75c-e2465eb21c7c": 50, // Membership: 50 articles, ₹2,999
  "204dbc14-ce23-4cd4-aed4-bf60e7fd0974": 100, // Membership: 100 articles, ₹4,999
};

export const SITE_HOST = /^(?:[a-z0-9-]+\.)*knewspaper\.in$/i;

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, RULES.slugMax)
    .replace(/-$/, "");
}

export const isValidSlug = (s) =>
  typeof s === "string" && s.length >= RULES.slugMin && s.length <= RULES.slugMax && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);

export const countWords = (text) => (String(text || "").match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;

// A link the article may carry: http(s) only. Returns { href, internal } or null.
export function parseLink(href) {
  try {
    const u = new URL(String(href || "").trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return { href: u.href, internal: SITE_HOST.test(u.hostname) };
  } catch {
    return null;
  }
}

/**
 * Check a submission. `doc` is what the article's HTML holds:
 *   { words, h2, h3, links: [{ href, internal }], badLinks }
 * `fields` are the form fields.
 * Returns a list of problems in plain words; empty means it passes.
 */
export function checkSubmission(fields, doc) {
  const R = RULES;
  const out = [];
  const len = (s) => String(s || "").trim().length;

  if (len(fields.title) < R.titleMin || len(fields.title) > R.titleMax)
    out.push(`The title must be ${R.titleMin} to ${R.titleMax} characters.`);
  if (!isValidSlug(fields.slug))
    out.push(`The URL slug must be ${R.slugMin} to ${R.slugMax} lowercase letters, numbers and hyphens.`);
  if (len(fields.metaTitle) < R.metaTitleMin || len(fields.metaTitle) > R.metaTitleMax)
    out.push(`The SEO title must be ${R.metaTitleMin} to ${R.metaTitleMax} characters.`);
  if (len(fields.metaDescription) < R.metaDescMin || len(fields.metaDescription) > R.metaDescMax)
    out.push(`The meta description must be ${R.metaDescMin} to ${R.metaDescMax} characters.`);
  if (!fields.hasImage) out.push("Add a featured image.");
  if (len(fields.imageAlt) < R.altMin || len(fields.imageAlt) > R.altMax)
    out.push(`Describe the featured image in ${R.altMin} to ${R.altMax} characters (alt text).`);

  if (doc.words < R.minWords) out.push(`The article has ${doc.words} words. It needs at least ${R.minWords}.`);
  if (doc.words > R.maxWords) out.push(`The article has ${doc.words} words. Keep it to ${R.maxWords} or fewer.`);
  if (doc.h2 < 1 || doc.h2 + doc.h3 < R.minHeadings)
    out.push(`Add subheadings: at least ${R.minHeadings}, and at least one of them a main heading (H2).`);

  const external = doc.links.filter((l) => !l.internal).length;
  if (external > R.maxLinks) out.push(`The article has ${external} links to other websites. The limit is ${R.maxLinks}.`);
  if (doc.badLinks) out.push("Every link must be a full web address starting with https:// or http://.");
  return out;
}

export function linkCounts(doc) {
  return { external: doc.links.filter((l) => !l.internal).length };
}

// The note at the top of every published guest post.
export const SPONSORED_NOTE = "Sponsored guest post. Links to other websites in this article are paid placements.";
