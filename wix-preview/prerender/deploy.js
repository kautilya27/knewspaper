async () => {
  // Pre-renders every published article to /post/<slug>.html, rebuilds the page
  // bundles, applies text edits, writes the sitemap, uploads, then points the old
  // /post/<slug> redirects at the new pages. Run through ExecuteWixAPI with the
  // changed sources in `files` (each ending with a "§END" line).
  const MODE = "all"; // "test": only TEST slugs are written, no redirects
  const TEST = ["kakashi-vs-gojo"];
  const SITE = "https://www.knewspaper.in";
  const EDITORIAL_ID = "c0f544a7-207e-490b-b7d9-830ef39f49c7";
  const EDITORIAL = "Knewspaper Editorial Team";
  const API = "https://www.wixapis.com";
  const F = wix.headless.files;

  // ---------------------------------------------------------------- inputs
  const given = {};
  for (const f of files) given[f.path] = f.content.replace(/\n?§END\s*$/, "") + "\n";
  const edits = given["edits.json"] ? JSON.parse(given["edits.json"]) : [];
  const read = async (path) => {
    let out = "", off = 0;
    for (;;) {
      const r = await F.read({ path, offset: off });
      out += r.text;
      off = r.offset + r.length;
      if (!r.hasMore) break;
    }
    return out;
  };
  const listing = [];
  for (let off = 0; ; off += 200) {
    const r = await F.list({ offset: off, limit: 200 });
    listing.push(...r.files.map((x) => x.path));
    if (!r.hasMore) break;
  }
  const text = {};
  const want = listing.filter((p) => /^(assets\/[^/]+\.(js|css)|js\/wix\/[^/]+\.js|[^/]+\.html|sitemap-articles\.xml)$/.test(p) && !/\.bundle\.js$/.test(p));
  await Promise.all(want.map(async (p) => { text[p] = await read(p); }));
  for (const [p, c] of Object.entries(given)) if (p !== "edits.json" && !p.startsWith("prerender/")) text[p] = c;
  const changed = new Set(Object.keys(given).filter((p) => p !== "edits.json" && !p.startsWith("prerender/")));
  const skipped = [];
  for (const e of edits) {
    if (text[e.path] == null) { if (e.optional) continue; throw Error("edit: no file " + e.path); }
    if (e.unless && text[e.path].includes(e.unless)) continue;
    if (e.check) { if (text[e.path].length !== e.length) throw Error(`edit: ${e.path} is ${text[e.path].length} chars after edits, expected ${e.length}`); continue; }
    if (!text[e.path].includes(e.find)) { if (e.optional) { skipped.push(e.path); continue; } throw Error("edit: text not found in " + e.path + ": " + e.find.slice(0, 60)); }
    text[e.path] = e.all ? text[e.path].split(e.find).join(e.replace) : text[e.path].replace(e.find, () => e.replace);
    changed.add(e.path);
  }

  // Write for us (guidelines and plans) and Submit your article (account, form,
  // the writer's articles) are two pages built in the live Write for us shell.
  if (given["prerender/wfu-main.html"] && given["prerender/submit-main.html"]) {
    const base = text["write-for-us.html"];
    const withMain = (h, main) => h.replace(/(<main id="main" tabindex="-1">)[\s\S]*?(<\/main>)/, (_, a, b) => a + main + b);
    let sub = withMain(base, given["prerender/submit-main.html"])
      .replace(/<title>[^<]*<\/title>/, "<title>Submit your article | Knewspaper</title>")
      .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Log in and submit your guest post to Knewspaper: title, URL slug, meta tags and featured image.">')
      .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="Submit your article | Knewspaper">')
      .replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://www.knewspaper.in/submit-article">')
      .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Log in and submit your guest post to Knewspaper.">')
      .replace(/<meta name="robots"[^>]*>/g, "").replace(/<link rel="canonical"[^>]*>/g, "")
      .replace(/<script type="application\/ld\+json" id="ld-wfu">[\s\S]*?<\/script>/g, "")
      .replace("</head>", '<meta name="robots" content="noindex, follow"><link rel="canonical" href="https://www.knewspaper.in/submit-article"></head>');
    text["submit-article.html"] = sub.replace(/src="\/assets\/wfu\.bundle\.js/, 'src="/assets/write.bundle.js');
    text["write-for-us.html"] = withMain(base, given["prerender/wfu-main.html"]).replace(/src="\/assets\/write\.bundle\.js/, 'src="/assets/wfu.bundle.js');
    changed.add("submit-article.html");
    changed.add("write-for-us.html");
    // Write for us: title, description, canonical and structured data (FAQ from the page's own FAQ section).
    const faqHtml = (given["prerender/wfu-main.html"].match(/<h2>Frequently asked questions<\/h2>([\s\S]*?)<\/div>/) || [, ""])[1];
    const strip = (x) => x.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    const faq = [...faqHtml.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map((m) => ({ "@type": "Question", name: strip(m[1]), acceptedAnswer: { "@type": "Answer", text: strip(m[2]) } }));
    const WFU_TITLE = "Write for Us: Submit a Guest Post | Knewspaper";
    const WFU_DESC = "Write for Knewspaper: we accept guest posts on education, careers, sports, technology, health, finance and more. Read our guidelines and submit your article.";
    const wfuLd = { "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": SITE + "/write-for-us", url: SITE + "/write-for-us", name: WFU_TITLE, description: WFU_DESC, inLanguage: "en-IN", isPartOf: { "@id": SITE + "/#website" }, publisher: { "@id": SITE + "/#organization" } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name: "Write for us", item: SITE + "/write-for-us" }] },
      ...(faq.length >= 2 ? [{ "@type": "FAQPage", mainEntity: faq }] : []),
    ] };
    text["write-for-us.html"] = text["write-for-us.html"]
      .replace(/<title>[^<]*<\/title>/, `<title>${WFU_TITLE}</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${WFU_DESC}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${WFU_TITLE}">`)
      .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${WFU_DESC}">`)
      .replace(/<link rel="canonical"[^>]*>/g, "").replace(/<meta property="og:url"[^>]*>/g, "")
      .replace(/<script type="application\/ld\+json" id="ld-wfu">[\s\S]*?<\/script>/g, "")
      .replace("</head>", `<link rel="canonical" href="${SITE}/write-for-us"><meta property="og:url" content="${SITE}/write-for-us"><script type="application/ld+json" id="ld-wfu">${JSON.stringify(wfuLd).replace(/</g, "\\u003c")}</script></head>`);
    // My account: login, credits, plan and the writer's articles (not indexed).
    if (given["prerender/account-main.html"]) {
      text["my-account.html"] = withMain(base, given["prerender/account-main.html"])
        .replace(/<title>[^<]*<\/title>/, "<title>My account | Knewspaper</title>")
        .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="Your Knewspaper writer account: article credits, plan and the status of your articles.">')
        .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="My account | Knewspaper">')
        .replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://www.knewspaper.in/my-account">')
        .replace(/<meta name="robots"[^>]*>/g, "").replace(/<link rel="canonical"[^>]*>/g, "")
        .replace(/<script type="application\/ld\+json" id="ld-wfu">[\s\S]*?<\/script>/g, "")
        .replace("</head>", '<meta name="robots" content="noindex, follow"><link rel="canonical" href="https://www.knewspaper.in/my-account"></head>')
        .replace(/src="\/assets\/(?:wfu|write)\.bundle\.js/, 'src="/assets/account.bundle.js');
      changed.add("my-account.html");
    }
  }
  // Prices are only on the Submit your article page; the account page is My account.
  for (const p of ["terms.html", "refund-policy.html"]) if (text[p]) {
    const h = text[p]
      .replace(/<p>We sell the right to publish guest articles on Knewspaper through these plans, priced in Indian rupees \(INR\):<\/p>\s*<ul>[\s\S]*?<\/ul>/, '<p>We sell the right to publish guest articles on Knewspaper through plans: a single guest post, or a one-year membership for several articles. Current prices, in Indian rupees (INR), are shown on the <a href="/submit-article">Submit your article</a> page before you buy.</p>')
      .replace("The price shown on the Write for us page is the amount charged.", "The price shown on the Submit your article page is the amount charged.")
      .replace('no plan shows in your account on the <a href="/write-for-us">Write for us</a> page', 'no plan shows on your <a href="/my-account">My account</a> page');
    if (h !== text[p]) { text[p] = h; changed.add(p); }
  }
  // The header "Log in" / "My account" link goes to the Submit your article page.
  for (const p of Object.keys(text)) if (/^[^/]+\.html$/.test(p)) {
    const h = text[p].replace(/\/write-for-us(?:\.html)?#(account|my-articles)/g, "/my-account").replace(/\/submit-article(?:\.html)?#my-articles/g, "/my-account")
      // Header: "Submit article" in place of "Write for us" (the footer keeps Write for us).
      .replace(/(<nav class="utility"[^>]*>[\s\S]*?)<a href="\/write-for-us(?:\.html)?">Write for us<\/a>/, '$1<a href="/submit-article">Submit article</a>')
      // Footer: no "Popular reads" column; three columns instead of four.
      .replace(/<nav aria-label="Popular articles">[\s\S]*?<\/nav>/, "")
      // The header links (prerender/header-nav.html): About us, Contact us, Log in, and a Submit article button at the right.
      .replace(/<nav class="utility" aria-label="Site">[\s\S]*?<\/nav>/, (m) => (given["prerender/header-nav.html"] ? given["prerender/header-nav.html"].trim() : m))
      .replace("grid-template-columns:1.2fr 1.3fr .9fr .8fr", "grid-template-columns:1.3fr 1.6fr 1fr");
    if (h !== text[p]) { text[p] = h; changed.add(p); }
  }

  // ---------------------------------------------------------------- data
  const posts = [];
  let cursor = null;
  for (let k = 0; k < 20; k++) {
    const body = { fieldsets: ["RICH_CONTENT", "CONTENT_TEXT", "SEO"], query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } } };
    const r = await wix.request({ method: "POST", url: API + "/blog/v3/posts/query", body });
    posts.push(...(r.posts || []));
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }
  const cats = ((await wix.request({ method: "GET", url: API + "/blog/v3/categories?paging.limit=100" })).categories || []);
  const catById = new Map(cats.map((c) => [c.id, c]));
  const memberIds = [...new Set(posts.map((p) => p.memberId).filter(Boolean))];
  const mq = { query: { filter: { id: { $in: memberIds } }, paging: { limit: 100 } } };
  const members = memberIds.length ? (await wix.request({ method: "POST", url: API + "/members/v1/members/query", body: mq })).members || [] : [];
  const authorName = new Map(members.map((m) => [m.id, (m.profile?.nickname || "").replace(/\s+/g, " ").trim()]));

  // ---------------------------------------------------------------- helpers
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const STATIC = "https://static.wixstatic.com/media";
  const fileOf = (v) => {
    if (!v) return "";
    if (v.startsWith("wix:image://")) return v.slice(15).split("/")[0].split("#")[0];
    if (/^[\w-]+~mv2\.[a-z0-9]+$/i.test(v)) return v;
    const m = v.match(/^https:\/\/static\.wixstatic\.com\/media\/([^/?#]+)/);
    return m ? m[1] : "";
  };
  const fill = (file, w, h) => `${STATIC}/${file}/v1/fill/w_${w},h_${h},al_c,q_90/${file}`;
  const srcset = (file, widths, ratio) => widths.map((w) => `${fill(file, w, Math.round(w * ratio))} ${w}w`).join(", ");
  const coverFileOf = (raw) => {
    const m = raw.media;
    if (!m || m.displayed === false) return "";
    const img = m.wixMedia?.image;
    if (!img) return "";
    if (typeof img === "string") return fileOf(img);
    const id = img.id || img._id;
    return id && !String(id).startsWith("http") ? id : fileOf(img.url || "");
  };
  const dateLabel = (iso) => (iso ? new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "");
  const isoOf = (v) => (v ? new Date(v).toISOString() : "");
  const liveTags = (seo) => (seo?.tags || []).filter((t) => !t.disabled);
  const seoTitleOf = (p) => liveTags(p.seoData).find((t) => t.type === "title")?.children || p.title || "";
  const seoDescOf = (p) => {
    const c = liveTags(p.seoData).find((t) => t.type === "meta" && t.props?.name === "description")?.props?.content;
    return (typeof c === "string" && c ? c : p.excerpt || String(p.contentText || "")).slice(0, 500);
  };
  const slugs = new Set(posts.map((p) => p.slug));
  const pre = MODE === "test" ? new Set(TEST) : slugs;
  // Every article keeps its old address, /post/<slug>: canonical, sitemap, links and
  // the address bar all use it. The page itself is the file /post/<slug>.html, which
  // the /post/<slug> redirect (and a click on any link, via site.js) opens.
  const pagePath = (slug) => `/post/${encodeURIComponent(slug)}`;
  const filePath = (slug) => (pre.has(slug) ? `/post/${encodeURIComponent(slug)}.html` : `/post.html?slug=${encodeURIComponent(slug)}`);
  const catHref = (slug) => "/blog/categories/" + encodeURIComponent(slug);
  const INTERNAL = /^https?:\/\/(?:www\.)?knewspaper\.in\/post\/([^/?#]+)\/?(#.*)?$/i;

  // Ricos → HTML, the same output as the site's rich-content.js, plus image sizes
  // and article links pointing straight at the pre-rendered pages.
  const linkAttrs = (link) => {
    if (!link) return null;
    if (typeof link.url === "string" && /^https?:\/\//i.test(link.url)) {
      let url = link.url;
      const m = url.match(INTERNAL);
      if (m) url = url.replace(/\.html(?=$|[#?])/, "");
      const rel = ["noopener", "noreferrer"];
      if (link.rel?.nofollow) rel.push("nofollow");
      if (link.rel?.sponsored) rel.push("sponsored");
      if (link.rel?.ugc) rel.push("ugc");
      return `href="${esc(url)}" rel="${rel.join(" ")}"${link.target === "BLANK" ? ' target="_blank"' : ""}`;
    }
    if (typeof link.anchor === "string" && link.anchor) return `href="#${esc(link.anchor)}"`;
    return null;
  };
  const textHtml = (node) => {
    let html = esc(String(node.textData?.text ?? ""));
    for (const d of node.textData?.decorations || []) {
      if (d?.type === "BOLD") { if (typeof d.fontWeightValue !== "number" || d.fontWeightValue >= 600) html = `<strong>${html}</strong>`; }
      else if (d?.type === "ITALIC") { if (d.italicData !== false) html = `<em>${html}</em>`; }
      else if (d?.type === "UNDERLINE") html = `<u>${html}</u>`;
      else if (d?.type === "STRIKETHROUGH") html = `<s>${html}</s>`;
      else if (d?.type === "SUPERSCRIPT") html = `<sup>${html}</sup>`;
      else if (d?.type === "SUBSCRIPT") html = `<sub>${html}</sub>`;
      else if (d?.type === "LINK") { const a = linkAttrs(d.linkData?.link); if (a) html = `<a ${a}>${html}</a>`; }
      else if (d?.type === "ANCHOR" && typeof d.anchorData?.anchor === "string" && d.anchorData.anchor) html = `<a href="#${esc(d.anchorData.anchor)}">${html}</a>`;
    }
    return html;
  };
  const nodeText = (node) => {
    if (node?.type === "TEXT") return String(node.textData?.text ?? "");
    if (node?.type === "BUTTON") return String(node.buttonData?.text ?? "");
    const ch = node?.nodes || [];
    const parts = ch.map(nodeText);
    return ch.every((c) => c?.type === "TEXT") ? parts.join("") : parts.filter(Boolean).join("\n");
  };
  const imgTag = (image, alt) => {
    const id = image?.src?.id;
    const url = id ? fill(id, 1200, 800) : (/^https?:\/\//i.test(image?.src?.url || "") ? image.src.url : "");
    const set = id ? ` srcset="${esc(srcset(id, [480, 800, 1200], 2 / 3))}" sizes="(min-width: 760px) 680px, 100vw"` : "";
    return url ? `<img src="${esc(url)}"${set} alt="${esc(String(alt ?? ""))}" width="1200" height="800" loading="lazy" decoding="async">` : "";
  };
  const kids = (n) => (n.nodes || []).map(nodeHtml).join("");
  const nodeHtml = (n) => {
    switch (n?.type) {
      case "TEXT": return textHtml(n);
      case "PARAGRAPH": return `<p>${kids(n)}</p>`;
      case "HEADING": { const l = Math.min(6, Math.max(2, Math.round(Number(n.headingData?.level) || 2))); return `<h${l}>${kids(n)}</h${l}>`; }
      case "BULLETED_LIST": return `<ul>${kids(n)}</ul>`;
      case "ORDERED_LIST": return `<ol>${kids(n)}</ol>`;
      case "LIST_ITEM": return `<li>${kids(n)}</li>`;
      case "BLOCKQUOTE": return `<blockquote>${kids(n)}</blockquote>`;
      case "CODE_BLOCK": return `<pre><code>${kids(n)}</code></pre>`;
      case "DIVIDER": return "<hr>";
      case "TABLE": return `<div class="table-wrap"><table><tbody>${kids(n)}</tbody></table></div>`;
      case "TABLE_ROW": return `<tr>${kids(n)}</tr>`;
      case "TABLE_CELL": return `<td>${kids(n)}</td>`;
      case "IMAGE": { const img = imgTag(n.imageData?.image, n.imageData?.altText); if (!img) return ""; const a = linkAttrs(n.imageData?.link); return a ? `<a ${a}>${img}</a>` : img; }
      case "GALLERY": { const imgs = (n.galleryData?.items || []).map((it) => imgTag(it?.image?.media, it?.altText ?? it?.title)).filter(Boolean); return imgs.length ? `<figure>${imgs.join("")}</figure>` : ""; }
      case "VIDEO": { const u = n.videoData?.video?.src?.url; if (/^https?:\/\//i.test(u || "")) return `<p><a href="${esc(u)}" rel="noopener noreferrer" target="_blank">${esc(String(n.videoData?.title || u))}</a></p>`; break; }
      default: break;
    }
    const t = nodeText(n).trim();
    return t ? `<p>${esc(t)}</p>` : "";
  };

  const summary = (p) => ({
    slug: p.slug, title: p.title || "", cover: coverFileOf(p), coverAlt: p.media?.altText ?? p.title ?? "",
    dateISO: isoOf(p.firstPublishedDate), minutes: p.minutesToRead || 0, categoryIds: p.categoryIds || [],
  });
  const byDate = [...posts].sort((a, b) => String(b.firstPublishedDate).localeCompare(String(a.firstPublishedDate)));
  const metaLine = (s, author) => {
    const bits = [];
    if (author) bits.push(`<span class="meta__author">By ${author === EDITORIAL ? `<a href="/editorial-team.html">${esc(author)}</a>` : esc(author)}</span>`);
    if (s.dateISO) bits.push(`<time datetime="${esc(s.dateISO)}">${esc(dateLabel(s.dateISO))}</time>`);
    if (s.updatedISO && s.dateISO && Date.parse(s.updatedISO) - Date.parse(s.dateISO) > 2 * 864e5) bits.push(`<span>Updated <time datetime="${esc(s.updatedISO)}">${esc(dateLabel(s.updatedISO))}</time></span>`);
    if (s.minutes) bits.push(`<span>${s.minutes} min read</span>`);
    return bits.length ? `<p class="meta">${bits.join("")}</p>` : "";
  };
  const tile = (s) => {
    const cover = s.cover ? `<div class="story__media"><img class="cover" src="${esc(fill(s.cover, 480, 320))}" srcset="${esc(srcset(s.cover, [320, 480, 640], 0.667))}" sizes="(min-width: 900px) 25vw, 50vw" width="480" height="320" alt="${esc(s.coverAlt)}" loading="lazy" decoding="async"></div>` : "";
    return `<article class="story story--tile${s.cover ? "" : " story--text"}">${cover}<div class="story__body"><h3 class="story__title "><a href="${pagePath(s.slug)}">${esc(s.title)}</a></h3>${metaLine(s)}</div></article>`;
  };
  const AD = '<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6382255537358474" data-ad-slot="1425864328" data-ad-format="auto" data-full-width-responsive="true"></ins></div>';
  const headingId = (t, used) => {
    let id = t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "section";
    while (used.has(id)) id += "-x";
    used.add(id);
    return id;
  };

  const shell = text["post.html"];
  if (!/<article class="article" data-article>[\s\S]*?<\/article>/.test(shell)) throw Error("post.html shell changed");

  function render(p) {
    const s = { ...summary(p), updatedISO: isoOf(p.lastPublishedDate) };
    const url = SITE + pagePath(p.slug);
    const cat = (p.categoryIds || []).map((id) => catById.get(id)).find(Boolean) || null;
    const allCats = (p.categoryIds || []).map((id) => catById.get(id)).filter(Boolean);
    const author = authorName.get(p.memberId) || "";
    const seoTitle = seoTitleOf(p), seoDesc = seoDescOf(p);
    // Body blocks, without a first image that repeats the cover.
    let nodes = p.richContent?.nodes || [];
    const firstImg = nodes.findIndex((n) => n.type === "IMAGE");
    if (s.cover && firstImg >= 0 && nodes[firstImg].imageData?.image?.src?.id === s.cover) nodes = nodes.filter((_, i) => i !== firstImg);
    const used = new Set();
    const blocks = nodes.map((n) => {
      let html = nodeHtml(n);
      if (!html) return null;
      let tag = (html.match(/^<(\w+)/) || [])[1] || "";
      if (tag === "h2") { const t = nodeText(n).trim(); const id = headingId(t, used); html = html.replace("<h2>", `<h2 id="${esc(id)}">`); return { tag, html, text: t, id }; }
      return { tag, html, text: tag === "h3" ? nodeText(n).trim() : "", level: n.type === "HEADING" ? Math.max(2, n.headingData?.level || 2) : 0, node: n };
    }).filter(Boolean);
    const isHealth = allCats.some((c) => /health|medical|fitness/i.test(c.slug));
    if (isHealth) blocks.push({ tag: "aside", html: '<aside class="note" role="note"><p>This article is for general information only and is not medical advice. Please consult a qualified doctor about your health.</p></aside>' });
    if (allCats.length) blocks.push({ tag: "p", html: `<p class="article__topics">Filed under ${allCats.map((c) => `<a href="${catHref(c.slug)}">${esc(c.label)}</a>`).join(", ")}</p>` });
    // Related: the author's picks, then the newest in the same topic, then the newest.
    const picks = [];
    const add = (q) => { if (q && q.slug !== p.slug && !picks.some((x) => x.slug === q.slug) && picks.length < 4) picks.push(q); };
    for (const id of p.relatedPostIds || []) add(posts.find((x) => x.id === id));
    if (cat) for (const q of byDate) if ((q.categoryIds || []).includes(cat.id)) add(q);
    for (const q of byDate) add(q);
    const related = picks.map(summary);
    // Ads and "Also read" boxes where the live page would put them.
    const before = new Map(), after = new Map();
    const put = (m, i, html) => m.set(i, (m.get(i) || "") + html);
    const pIdx = blocks.map((b, i) => (b.tag === "p" ? i : -1)).filter((i) => i >= 0);
    const hIdx = blocks.map((b, i) => (b.tag === "h2" ? i : -1)).filter((i) => i >= 0);
    if (pIdx.length >= 4) put(after, pIdx[1], AD);
    const mid = hIdx.length >= 5 ? hIdx[Math.floor(hIdx.length / 2)] : -1;
    if (mid >= 0 && mid !== hIdx[1]) put(before, mid, AD);
    const box = (r) => `<p class="also-read"><strong>Also read:</strong> <a href="${pagePath(r.slug)}">${esc(r.title)}</a></p>`;
    const spots = hIdx.length >= 3 ? [["b", hIdx[1]], ["b", hIdx[Math.max(2, Math.floor(hIdx.length * 0.7))]]] : [["a", pIdx[2]], ["a", pIdx[Math.floor(pIdx.length * 0.7)]]];
    related.slice(0, 2).forEach((r, i) => {
      const [w, at] = spots[i];
      if (at == null || (i && at === spots[0][1])) return;
      put(w === "b" ? before : after, at, box(r));
    });
    const bodyHtml = blocks.map((b, i) => (before.get(i) || "") + b.html + (after.get(i) || "")).join("");
    const heads = blocks.filter((b) => b.tag === "h2");
    const toc = heads.length >= 3 ? `<nav class="toc" aria-labelledby="toc-title"><h2 id="toc-title" class="toc__title">In this article</h2><ol data-toc>${heads.map((h) => `<li><a href="#${esc(h.id)}">${esc(h.text)}</a></li>`).join("")}</ol></nav>` : `<nav class="toc" aria-labelledby="toc-title" hidden><h2 id="toc-title" class="toc__title">In this article</h2><ol data-toc></ol></nav>`;
    // FAQ structured data from the article's FAQ section: an "FAQs" heading (H2, H3 or
    // H4) followed by questions as smaller headings, or as paragraphs ending in "?"
    // (often "Q. ...?" with the answer in the next paragraph, "A. ...").
    const qa = [];
    const lvlOf = (b) => (/^h[2-6]$/.test(b.tag) ? Number(b.tag[1]) : 0);
    const bText = (b) => (b.text || (b.node ? nodeText(b.node) : "")).trim();
    const fi = blocks.findIndex((b) => lvlOf(b) && /\b(faqs?|frequently asked)\b/i.test(bText(b)));
    if (fi >= 0) {
      const top = lvlOf(blocks[fi]);
      let q = null, a = [];
      const flush = () => { const t = a.join(" ").replace(/\s+/g, " ").trim(); if (q && t) qa.push({ q, a: t }); };
      for (let i = fi + 1; i < blocks.length; i++) {
        const b = blocks[i], l = lvlOf(b), t = bText(b);
        if (!t || b.tag === "aside" || /article__topics/.test(b.html)) continue;
        if (l && l <= top) break;
        // Questions as list items: the item's first line is the question, the rest the answer.
        if ((b.tag === "ul" || b.tag === "ol") && b.node && !q) {
          for (const li of b.node.nodes || []) {
            const parts = (li.nodes || []).map((c) => nodeText(c).trim()).filter(Boolean);
            const lines = parts.length > 1 ? parts : String(parts[0] || "").split(/\n+/);
            let qi = lines[0] || "", ai = lines.slice(1).join(" ").trim();
            if (!ai && /\?\s*\S/.test(qi)) { const k = qi.indexOf("?") + 1; ai = qi.slice(k).trim(); qi = qi.slice(0, k); }
            if (/\?\s*$/.test(qi) && ai) qa.push({ q: qi.replace(/^Q(?:uestion)?\s*\d*\s*[.:)\-–]\s*/i, "").trim(), a: ai.replace(/^A(?:ns(?:wer)?)?\s*[.:)\-–]\s*/i, "") });
          }
          continue;
        }
        if (l || (b.tag === "p" && /\?\s*$/.test(t) && t.length <= 200)) { flush(); q = t.replace(/^Q(?:uestion)?\s*\d*\s*[.:)\-–]\s*/i, "").trim(); a = []; continue; }
        if (q) a.push(t.replace(/^A(?:ns(?:wer)?)?\s*[.:)\-–]\s*/i, ""));
      }
      flush();
    }
    const share = encodeURIComponent(url), shareText = encodeURIComponent(p.title || "");
    const shortTitle = (p.title || "").length > 48 ? p.title.slice(0, 47) + "…" : p.title || "";
    const hero = s.cover ? `<figure class="wrap article__hero"><img src="${esc(fill(s.cover, 1280, 720))}" srcset="${esc(srcset(s.cover, [480, 640, 960, 1280, 1600], 0.5625))}" sizes="(min-width: 1240px) 1160px, 100vw" width="1280" height="720" alt="${esc(s.coverAlt)}" fetchpriority="high" decoding="async"></figure>` : "";
    const article = `<article class="article" data-article data-prerendered="${esc(p.slug)}" data-updated="${esc(s.updatedISO)}">
    <header class="wrap article__head">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li>${cat ? `<li><a href="${catHref(cat.slug)}">${esc(cat.label)}</a></li>` : ""}<li><span aria-current="page">${esc(shortTitle)}</span></li></ol></nav>
      <h1 class="article__title">${esc(p.title)}</h1>
      ${p.excerpt ? `<p class="article__dek">${esc(p.excerpt)}</p>` : ""}
      <div class="article__meta">
        ${metaLine(s, author)}
        <div class="share" aria-label="Share this article">
          <button type="button" class="share__like" data-like aria-pressed="false">Like</button>
          <a href="https://wa.me/?text=${shareText}%20${share}" rel="noopener" target="_blank">WhatsApp</a>
          <a href="https://twitter.com/intent/tweet?text=${shareText}&amp;url=${share}" rel="noopener" target="_blank">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" rel="noopener" target="_blank">Facebook</a>
          <button type="button" data-copy>Copy link</button>
        </div>
      </div>
    </header>
    ${hero}
    <div class="wrap article__layout${heads.length >= 3 ? " has-toc" : ""}">
      ${toc}
      <div class="prose" data-body>${bodyHtml}</div>
    </div>
    ${AD}
    <section class="wrap shelf shelf--related" aria-labelledby="related-title"${related.length ? "" : " hidden"}>
      <div class="section-head"><h2 id="related-title" class="section-head__title">Read next</h2></div>
      <div class="tiles" data-related>${related.map(tile).join("")}</div>
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
    </section></article>`;
    // Structured data.
    const PUBLISHER = { "@type": "Organization", "@id": SITE + "/#organization", name: "Knewspaper", url: SITE + "/", logo: { "@type": "ImageObject", url: "https://static.wixstatic.com/media/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png" } };
    const graph = [
      {
        "@type": "BlogPosting", "@id": url + "#article", mainEntityOfPage: url, url,
        headline: (p.title || "").slice(0, 110), description: seoDesc || undefined,
        image: s.cover ? [fill(s.cover, 1200, 675)] : undefined, inLanguage: "en-IN",
        datePublished: s.dateISO || undefined, dateModified: s.updatedISO || s.dateISO || undefined,
        author: p.memberId === EDITORIAL_ID ? { "@type": "Organization", name: EDITORIAL, url: SITE + "/editorial-team.html" } : author ? { "@type": "Person", name: author } : PUBLISHER,
        publisher: PUBLISHER, articleSection: cat ? cat.label : undefined,
      },
      { "@type": "BreadcrumbList", itemListElement: [["Home", SITE + "/"], ...(cat ? [[cat.label, SITE + catHref(cat.slug)]] : []), [p.title, url]].map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) },
    ];
    if (qa.length >= 2) graph.push({ "@type": "FAQPage", mainEntity: qa.slice(0, 12).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.slice(0, 1200) } })) });
    const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
    const ogImage = s.cover ? fill(s.cover, 1200, 630) : null;
    let html = shell.replace(/<article class="article" data-article>[\s\S]*?<\/article>/, () => article);
    const head = [
      `<link rel="canonical" href="${esc(url)}">`,
      `<meta property="og:url" content="${esc(url)}">`,
      `<meta property="og:type" content="article">`,
      s.dateISO ? `<meta property="article:published_time" content="${esc(s.dateISO)}">` : "",
      s.updatedISO ? `<meta property="article:modified_time" content="${esc(s.updatedISO)}">` : "",
      `<meta name="twitter:title" content="${esc(seoTitle)}">`,
      `<meta name="twitter:description" content="${esc(seoDesc)}">`,
      s.cover ? `<link rel="preload" as="image" href="${esc(fill(s.cover, 1280, 720))}" imagesrcset="${esc(srcset(s.cover, [480, 640, 960, 1280, 1600], 0.5625))}" imagesizes="(min-width: 1240px) 1160px, 100vw" fetchpriority="high">` : "",
      `<script type="application/ld+json" id="ld-article">${ld}</script>`,
      // Show the article's old address straight away.
      `<script>try{history.replaceState(history.state,"",location.pathname.replace(/\\.html$/,"")+location.search+location.hash)}catch(e){}</script>`,
    ].join("");
    html = html
      .replace(/<title>[^<]*<\/title>/, () => `<title>${esc(seoTitle)} | Knewspaper</title>`)
      .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${esc(seoDesc)}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, () => `<meta property="og:title" content="${esc(seoTitle)}">`)
      .replace(/<meta property="og:description" content="[^"]*">/, () => `<meta property="og:description" content="${esc(seoDesc)}">`)
      .replace(/<meta property="og:image" content="[^"]*">/, (m) => (ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : m))
      .replace("</head>", () => head + "</head>");
    return html;
  }

  // ---------------------------------------------------------------- outputs
  const out = {};
  for (const p of posts) if (pre.has(p.slug)) out[`post/${p.slug}.html`] = render(p);

  // Every root page: article links go straight to the pre-rendered pages.
  // Links to articles use the old address (an earlier version linked the .html files).
  const fixLinks = (h) => h.replace(/href="(?:https:\/\/www\.knewspaper\.in)?\/post\/([^"#?\/]+)\.html([#?][^"]*)?"/g, (m, s, rest) => `href="/post/${s}${rest || ""}"`);
  for (const p of Object.keys(text)) if (/^[^/]+\.html$/.test(p)) { const h = fixLinks(text[p]); if (h !== text[p]) { text[p] = h; changed.add(p); } }
  for (const p of Object.keys(out)) out[p] = fixLinks(out[p]);

  // The editorial team page, in the About page's shell.
  if (given["prerender/editorial-team-main.html"]) {
    const about = text["about.html"];
    let h = about.replace(/(<main id="main" tabindex="-1">)[\s\S]*?(<\/main>)/, (_, a, b) => a + given["prerender/editorial-team-main.html"] + b);
    h = h.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");
    const desc = "Who writes Knewspaper's articles, how the editorial team researches and checks facts, keeps articles up to date and handles corrections.";
    const ld = { "@context": "https://schema.org", "@type": "ProfilePage", url: SITE + "/editorial-team.html", name: EDITORIAL, mainEntity: { "@type": "Organization", name: EDITORIAL, url: SITE + "/editorial-team.html", parentOrganization: { "@id": SITE + "/#organization" } } };
    h = h.replace(/<title>[^<]*<\/title>/, `<title>${EDITORIAL} | Knewspaper</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${EDITORIAL} | Knewspaper">`)
      .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`)
      .replace(/<link rel="canonical"[^>]*>/, "")
      .replace("</head>", `<link rel="canonical" href="${SITE}/editorial-team.html"><script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);
    out["editorial-team.html"] = h;
  }

  // Which articles have their own page, for the scripts' links.
  const preList = [...pre].filter((s) => slugs.has(s));
  text["assets/prerendered.js"] = `// Articles that have a pre-rendered page at /post/<slug>.html. Written by the pre-render step.\nexport const PRERENDERED = new Set(${JSON.stringify(preList.join(" "))}.split(" ").filter(Boolean));\n`;
  changed.add("assets/prerendered.js");

  // Sitemap: main pages and topics as they were, articles at their new addresses.
  if (MODE === "all") {
    const keep = (text["sitemap-articles.xml"].match(/<url>[\s\S]*?<\/url>/g) || []).filter((u) => !/<loc>[^<]*\/post\//.test(u));
    if (!keep.some((u) => u.includes("/editorial-team.html"))) keep.push(`<url><loc>${SITE}/editorial-team.html</loc></url>`);
    const urls = byDate.map((p) => `<url><loc>${SITE}${pagePath(p.slug)}</loc><lastmod>${isoOf(p.lastPublishedDate || p.firstPublishedDate).slice(0, 10)}</lastmod></url>`);
    out["sitemap-articles.xml"] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...keep, ...urls].join("\n")}\n</urlset>\n`;
  }

  // Bundles: one script per page, from the (changed) sources.
  const mod = (k) => text[k.replace(/^\//, "")];
  function bundle(entry) {
    const order = [], seen = new Set(), sources = {};
    const IMPORT = /^\s*import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']\s*;?[ \t]*$/gm;
    const resolve = (spec, from) => {
      if (spec.startsWith("/")) return spec;
      const parts = (from.slice(0, from.lastIndexOf("/") + 1) + spec).split("/"), o = [];
      for (const x of parts) { if (x === "..") o.pop(); else if (x !== ".") o.push(x); }
      return o.join("/");
    };
    const visit = (key) => {
      if (seen.has(key)) return;
      seen.add(key);
      const code = mod(key);
      if (code == null) throw Error("Missing module " + key);
      sources[key] = code;
      for (const m of code.matchAll(IMPORT)) visit(resolve(m[2], key));
      order.push(key);
    };
    visit(entry);
    const body = (key) => {
      const exps = [];
      let code = sources[key].replace(IMPORT, (_, names, spec) => {
        const list = names.split(",").map((x) => x.trim()).filter(Boolean).map((x) => { const [a, b] = x.split(/\s+as\s+/); return b ? `${a.trim()}: ${b.trim()}` : a.trim(); });
        return `const { ${list.join(", ")} } = __r(${JSON.stringify(resolve(spec, key))});`;
      });
      code = code.replace(/^export\s+(async\s+function\*?|function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)/gm, (_, kind, name) => { exps.push([name, name]); return `${kind} ${name}`; });
      code = code.replace(/^export\s*\{([^}]*)\}\s*;?[ \t]*$/gm, (_, names) => {
        for (const x of names.split(",").map((y) => y.trim()).filter(Boolean)) { const [l, a] = x.split(/\s+as\s+/); exps.push([l.trim(), (a || l).trim()]); }
        return "";
      });
      if (/^\s*(import|export)\b/m.test(code.split("\n").filter((l) => !l.trim().startsWith("//")).join("\n"))) throw Error("Unhandled import/export in " + key);
      return `__d[${JSON.stringify(key)}] = (__e) => {\n${code}\n${exps.map(([l, a]) => `__e[${JSON.stringify(a)}] = ${l};`).join("\n")}\n};`;
    };
    return [`// Bundled ${new Date().toISOString().slice(0, 10)} from ${entry} and ${order.length - 1} imported modules.`, "(() => {", "const __d = {}, __m = {};",
      "const __r = (k) => { if (__m[k]) return __m[k]; const e = (__m[k] = {}); __d[k](e); return e; };", ...order.map(body), `__r(${JSON.stringify(entry)});`, "})();", ""].join("\n");
  }
  for (const name of ["home", "feed", "post", "search", "site", "write", "wfu", "account"]) out[`assets/${name}.bundle.js`] = bundle(`/assets/${name}.js`);
  // New bundle names in every page, so the CDN's cached copies of the old ones aren't used.
  const ver = Date.now().toString(36);
  const bust = (h) => h.replace(/(src="\/assets\/[a-z]+\.bundle\.js)(\?v=[^"]*)?"/g, `$1?v=${ver}"`);
  for (const p of Object.keys(text)) if (/^[^/]+\.html$/.test(p)) { const h = bust(text[p]); if (h !== text[p]) { text[p] = h; changed.add(p); } }
  for (const p of Object.keys(out)) if (/\.html$/.test(p)) out[p] = bust(out[p]);
  for (const p of changed) if (!out[p]) out[p] = text[p];

  // ---------------------------------------------------------------- upload
  // Pages of articles that are no longer published are removed.
  const del = listing.filter((p) => p === "post/zz-test3" || (MODE === "all" && /^post\/.+\.html$/.test(p) && !out[p]));
  if (del.length > 10) throw Error(`refusing to delete ${del.length} article pages; check the posts query`);
  const patchFiles = Object.entries(out).map(([path, content]) => ({ path, content }));
  const bytes = patchFiles.reduce((n, f) => n + f.content.length, 0);
  const res = await F.patch({ files: patchFiles, deletePaths: del });
  const report = { skippedOptionalEdits: skipped.length, mode: MODE, pages: Object.keys(out).filter((p) => p.startsWith("post/")).length, files: patchFiles.length, mb: +(bytes / 1e6).toFixed(2), published: res.published, summary: { added: res.summary.added.length, replaced: res.summary.replaced.length, deleted: res.summary.deleted, unchanged: res.summary.unchanged.length } };

  // ---------------------------------------------------------------- redirects
  if (MODE === "all") {
    const all = (await wix.request({ method: "GET", url: API + "/seo-redirects-service/v1/redirects" })).redirects || [];
    const wanted = [];
    for (const r of all) {
      const from = r.from || "";
      let m = from.match(/^\/post\/([^/]+)$/), target = null;
      if (m) { let s = m[1]; try { s = decodeURIComponent(s); } catch {} if (pre.has(s) && !/\.html$/.test(s)) target = filePath(s); }
      const t = (r.to || "").match(/^\/post\.html\?slug=([^&#]+)$/);
      if (!target && t) { let s = t[1]; try { s = decodeURIComponent(s); } catch {} if (pre.has(s)) target = filePath(s); }
      if (target && r.to !== target) wanted.push({ from, to: target, options: { ...(r.options || {}), forceReplace: true } });
    }
    // Articles that never had a redirect get one too.
    const have = new Set(all.map((r) => r.from));
    if (!have.has("/my-account")) {
      const r = await wix.request({ method: "POST", url: API + "/seo-redirects-service/v1/bulk/redirects/create", body: { redirects: [{ from: "/my-account", to: "/my-account.html" }] } });
      report.accountRedirect = r.bulkActionMetadata;
    }
    if (!have.has("/submit-article")) {
      const r = await wix.request({ method: "POST", url: API + "/seo-redirects-service/v1/bulk/redirects/create", body: { redirects: [{ from: "/submit-article", to: "/submit-article.html" }] } });
      report.submitRedirect = r.bulkActionMetadata;
    }
    for (const s of pre) { const from = "/post/" + encodeURIComponent(s); if (!have.has(from) && slugs.has(s)) wanted.push({ from, to: filePath(s), options: { forceReplace: true } }); }
    let ok = 0; const failed = [];
    for (let i = 0; i < wanted.length; i += 100) {
      const chunk = wanted.slice(i, i + 100);
      const r = await wix.request({ method: "POST", url: API + "/seo-redirects-service/v1/bulk/redirects/create", body: { redirects: chunk } });
      ok += r.bulkActionMetadata?.totalSuccesses || 0;
      for (const x of r.results || []) if (x.itemMetadata?.error) failed.push(chunk[x.itemMetadata.originalIndex]?.from + ": " + (x.itemMetadata.error.code || x.itemMetadata.error.description || "").toString().slice(0, 60));
    }
    report.redirects = { total: all.length, changed: wanted.length, ok, failed: failed.slice(0, 15), failedCount: failed.length };
  }
  return report;
}
