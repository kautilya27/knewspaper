async () => {
  function mdToRicos(md, images) {
    let n = 0;
    const id = () => "k" + Date.now().toString(36).slice(-4) + (n++).toString(36);
    const inline = (text, baseDecos = []) => {
      const out = [];
      const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)\s]+)\))/g;
      let last = 0, m;
      const push = (t, decos) => { if (t) out.push({ type: "TEXT", id: "", nodes: [], textData: { text: t, decorations: decos } }); };
      while ((m = re.exec(text))) {
        push(text.slice(last, m.index), [...baseDecos]);
        if (m[1]) push(m[2], [...baseDecos, { type: "BOLD", fontWeightValue: 700 }]);
        else if (m[3]) push(m[4], [...baseDecos, { type: "ITALIC", italicData: true }]);
        else {
          const url = m[7];
          const internal = /^https?:\/\/(www\.)?knewspaper\.in/i.test(url) || url.startsWith("/");
          const link = internal
            ? { url: url.startsWith("/") ? "https://www.knewspaper.in" + url : url, target: "SELF" }
            : { url, target: "BLANK", rel: { noreferrer: true } };
          push(m[6], [...baseDecos, { type: "LINK", linkData: { link } }]);
        }
        last = re.lastIndex;
      }
      push(text.slice(last), [...baseDecos]);
      return out;
    };
    const para = (text, decos) => ({ type: "PARAGRAPH", id: id(), nodes: inline(text, decos), paragraphData: { textStyle: { textAlignment: "AUTO" } } });
    const listItem = (text) => ({ type: "LIST_ITEM", id: id(), nodes: [para(text)] });
    const cells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
  
    const lines = md.replace(/\r/g, "").split("\n");
    const nodes = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const t = line.trim();
      if (!t) { i++; continue; }
      let m;
      if ((m = t.match(/^(#{2,4})\s+(.*)$/))) {
        nodes.push({ type: "HEADING", id: id(), nodes: inline(m[2]), headingData: { level: m[1].length, textStyle: { textAlignment: "AUTO" } } });
        i++;
      } else if ((m = t.match(/^\[\[IMAGE (\d+)\]\]$/))) {
        const img = images[Number(m[1])];
        if (img) nodes.push(img);
        i++;
      } else if (/^(-{3,}|\*{3,})$/.test(t)) {
        nodes.push({ type: "DIVIDER", id: id(), nodes: [], dividerData: { lineStyle: "SINGLE", width: "LARGE", alignment: "CENTER" } });
        i++;
      } else if (/^[-*]\s+/.test(t)) {
        const items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) items.push(listItem(lines[i++].trim().replace(/^[-*]\s+/, "")));
        nodes.push({ type: "BULLETED_LIST", id: id(), nodes: items, bulletedListData: { indentation: 0 } });
      } else if (/^\d+[.)]\s+/.test(t)) {
        const items = [];
        while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) items.push(listItem(lines[i++].trim().replace(/^\d+[.)]\s+/, "")));
        nodes.push({ type: "ORDERED_LIST", id: id(), nodes: items, orderedListData: { indentation: 0 } });
      } else if (t.startsWith("|")) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          const r = lines[i++].trim();
          if (/^\|[\s:|-]+\|$/.test(r)) continue;
          rows.push(cells(r));
        }
        const cols = Math.max(...rows.map((r) => r.length));
        nodes.push({
          type: "TABLE", id: id(),
          nodes: rows.map((r, ri) => ({
            type: "TABLE_ROW", id: id(),
            nodes: Array.from({ length: cols }, (_, ci) => ({
              type: "TABLE_CELL", id: id(),
              nodes: [{ type: "PARAGRAPH", id: id(), nodes: inline(r[ci] || "", ri === 0 ? [{ type: "BOLD", fontWeightValue: 700 }] : []), paragraphData: {} }],
              tableCellData: {},
            })),
          })),
          tableData: { dimensions: { colsWidthRatio: Array(cols).fill(Math.floor(754 / cols)), rowsHeight: Array(rows.length).fill(47), colsMinWidth: Array(cols).fill(120) }, rowHeader: true },
        });
      } else if (t.startsWith(">")) {
        nodes.push({ type: "BLOCKQUOTE", id: id(), nodes: [para(t.replace(/^>\s?/, ""))], blockquoteData: { indentation: 1 } });
        i++;
      } else {
        // A paragraph runs until a blank line or the start of another block.
        const buf = [t];
        i++;
        while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|[-*]\s|\d+[.)]\s|\||>|\[\[IMAGE|-{3,}$)/.test(lines[i].trim())) buf.push(lines[i++].trim());
        nodes.push(para(buf.join(" ")));
      }
    }
    return nodes;
  }
  // ---- publish one refreshed article (files: meta.json + article.md) ----
  const meta = JSON.parse(files.find((f) => f.path === "meta.json").content.replace(/§END\s*$/, ""));
  const md = files.find((f) => f.path === "article.md").content.replace(/§END\s*$/, "");
  for (const k of ["slug", "title", "seoTitle", "seoDescription", "excerpt"]) if (!meta[k]) return { error: "meta." + k + " missing" };
  if (meta.title.length > 200 || meta.excerpt.length > 500) return { error: "title or excerpt too long" };
  const post = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(meta.slug)}?fieldsets=RICH_CONTENT&fieldsets=SEO` })).post;
  const draft = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}` })).draftPost;
  if (draft.hasUnpublishedChanges) return { error: "This article has unpublished edits in Wix; not touching it." };
  const images = post.richContent.nodes.filter((n) => n.type === "IMAGE");
  const used = [...md.matchAll(/\[\[IMAGE (\d+)\]\]/g)].map((m) => Number(m[1]));
  if (used.some((i) => i >= images.length)) return { error: `md uses an image index that doesn't exist (article has ${images.length} images)` };
  const nodes = mdToRicos(md, images);
  // Guest post: every backlink in the original must still be there, with its original settings.
  const norm = (u) => String(u).trim().replace(/\/+$/, "").toLowerCase();
  const linksOf = (n, acc = []) => { if (Array.isArray(n)) n.forEach((x) => linksOf(x, acc)); else if (n && typeof n === "object") { if (n.link?.url) acc.push(n.link); Object.values(n).forEach((v) => typeof v === "object" && linksOf(v, acc)); } return acc; };
  const originalExt = linksOf(post.richContent.nodes).filter((l) => !/knewspaper\.in/i.test(l.url));
  const byUrl = new Map(originalExt.map((l) => [norm(l.url), l]));
  const restore = (n) => { if (Array.isArray(n)) n.forEach(restore); else if (n && typeof n === "object") { if (n.type === "LINK" && n.linkData?.link?.url && byUrl.has(norm(n.linkData.link.url))) n.linkData.link = JSON.parse(JSON.stringify(byUrl.get(norm(n.linkData.link.url)))); Object.values(n).forEach((v) => typeof v === "object" && restore(v)); } };
  restore(nodes);
  const newUrls = new Set(linksOf(nodes).map((l) => norm(l.url)));
  const missing = originalExt.filter((l) => !newUrls.has(norm(l.url))).map((l) => l.url);
  if (missing.length) return { error: "Backlink(s) missing from the new text; include them exactly: " + missing.join(" , ") };
  if (nodes.length < 10) return { error: "too few blocks: " + nodes.length };
  const keep = (post.seoData?.tags || []).filter((t) => t.type !== "title" && t.props?.name !== "description");
  const seoData = {
    ...(post.seoData || {}),
    tags: [
      ...keep,
      { type: "title", children: meta.seoTitle, custom: false, disabled: false },
      { type: "meta", props: { name: "description", content: meta.seoDescription }, children: "", custom: false, disabled: false },
    ],
  };
  const richContent = { nodes, documentStyle: post.richContent.documentStyle || {} };
  if (post.richContent.metadata) richContent.metadata = post.richContent.metadata;
  const body = { draftPost: { id: post.id, title: meta.title, excerpt: meta.excerpt, richContent, seoData }, action: "UPDATE_PUBLISH" };
  await wix.request({ method: "PATCH", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}`, body });
  const after = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(meta.slug)}?fieldsets=CONTENT_TEXT&fieldsets=SEO` })).post;
  const tags = after.seoData?.tags || [];
  return {
    ok: after.slug === meta.slug,
    slug: after.slug,
    title: after.title,
    seoTitle: tags.find((t) => t.type === "title")?.children,
    seoDescription: tags.find((t) => t.props?.name === "description")?.props?.content,
    words: (after.contentText || "").split(/\s+/).length,
    imagesKept: used.length + "/" + images.length,
    lastPublished: after.lastPublishedDate,
  };
}
