// Structured data (JSON-LD) and social meta tags for pages whose content is
// read from Wix in the browser (articles, topics). Google runs this script,
// so the tags it adds are seen when the page is indexed.

export const SITE = "https://www.knewspaper.in";
export const LOGO = "https://static.wixstatic.com/media/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png";
export const PUBLISHER = { "@type": "Organization", "@id": SITE + "/#organization", name: "Knewspaper", url: SITE + "/", logo: { "@type": "ImageObject", url: LOGO } };

/** Put one JSON-LD block in <head>, replacing the one with the same id. */
export function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.append(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Set <meta property|name=key content=…>, creating it when missing. */
export function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.append(el);
  }
  el.setAttribute("content", content);
}

export function breadcrumbs(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
  };
}

// "Frequently asked questions" sections written as an H2 followed by H3
// questions, each with its answer below it.
export function faqFromBody(body) {
  // An "FAQs" heading (H2, H3 or H4), then questions as smaller headings or as
  // paragraphs ending in "?" (often "Q. ...?" followed by "A. ...").
  const head = [...body.querySelectorAll("h2, h3, h4")].find((h) => /\b(faqs?|frequently asked)\b/i.test(h.textContent));
  if (!head) return null;
  const top = Number(head.tagName[1]);
  const qa = [];
  let q = null, a = [];
  const flush = () => { if (q && a.join(" ").trim()) qa.push({ q, a: a.join(" ").replace(/\s+/g, " ").trim() }); };
  for (let el = head.nextElementSibling; el; el = el.nextElementSibling) {
    const l = /^H[2-6]$/.test(el.tagName) ? Number(el.tagName[1]) : 0;
    const t = el.textContent.trim();
    if (!t || el.matches("aside, .article__topics, .ad-slot, .also-read")) continue;
    if (l && l <= top) break;
    // Questions as list items: the item's first line is the question, the rest the answer.
    if ((el.tagName === "UL" || el.tagName === "OL") && !q) {
      for (const li of el.children) {
        const parts = [...li.children].map((c) => c.textContent.trim()).filter(Boolean);
        const lines = parts.length > 1 ? parts : li.textContent.trim().split(/\n+/);
        let qi = lines[0] || "", ai = lines.slice(1).join(" ").trim();
        if (!ai && /\?\s*\S/.test(qi)) { const k = qi.indexOf("?") + 1; ai = qi.slice(k).trim(); qi = qi.slice(0, k); }
        if (/\?\s*$/.test(qi) && ai) qa.push({ q: qi.replace(/^Q(?:uestion)?\s*\d*\s*[.:)\-–]\s*/i, "").trim(), a: ai.replace(/^A(?:ns(?:wer)?)?\s*[.:)\-–]\s*/i, "") });
      }
      continue;
    }
    if (l || (el.tagName === "P" && /\?\s*$/.test(t) && t.length <= 200)) { flush(); q = t.replace(/^Q(?:uestion)?\s*\d*\s*[.:)\-–]\s*/i, "").trim(); a = []; continue; }
    if (q) a.push(t.replace(/^A(?:ns(?:wer)?)?\s*[.:)\-–]\s*/i, ""));
  }
  flush();
  if (qa.length < 2) return null;
  return {
    "@type": "FAQPage",
    mainEntity: qa.slice(0, 12).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.slice(0, 1200) } })),
  };
}

/** <link rel="canonical">, created when missing. */
export function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.append(link); }
  link.href = url;
}

/** Keep a page that has nothing to show (a missing article or topic) out of search results. */
export function noindex() {
  if (!document.querySelector('meta[name="robots"]')) document.head.insertAdjacentHTML("beforeend", '<meta name="robots" content="noindex">');
}
