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
  const h2 = [...body.querySelectorAll("h2")].find((h) => /\b(faqs?|frequently asked)\b/i.test(h.textContent));
  if (!h2) return null;
  const qa = [];
  let q = null, a = [];
  const flush = () => { if (q && a.join(" ").trim()) qa.push({ q, a: a.join(" ").replace(/\s+/g, " ").trim() }); };
  for (let el = h2.nextElementSibling; el && el.tagName !== "H2"; el = el.nextElementSibling) {
    if (el.tagName === "H3") { flush(); q = el.textContent.trim(); a = []; }
    else if (q) a.push(el.textContent);
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
