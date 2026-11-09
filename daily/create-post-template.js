async () => {
  // Creates and publishes ONE new Knewspaper article from files meta.json + article.md.
  // meta.json: {"slug","title","seoTitle","seoDescription","excerpt","categorySlug",
  //             "cover": {"id","width","height"} or null}
  // The author is the Knewspaper Editorial Team. Refuses if the slug is already used.
  const EDITORIAL_ID = "c0f544a7-207e-490b-b7d9-830ef39f49c7";
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
  const meta = JSON.parse(files.find((f) => f.path === "meta.json").content.replace(/§END\s*$/, ""));
  const md = files.find((f) => f.path === "article.md").content.replace(/§END\s*$/, "");
  for (const k of ["slug", "title", "seoTitle", "seoDescription", "excerpt", "categorySlug"]) if (!meta[k]) return { error: "meta." + k + " missing" };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug) || meta.slug.length > 80) return { error: "slug must be lowercase words joined by hyphens, max 80 chars" };
  if (/(^|-)(19|20)\d\d(-|$)/.test(meta.slug)) return { error: "no year in the slug (owner's rule): the same URL is reused every year; put the year in the title instead" };
  if (meta.seoTitle.length > 65 || meta.seoDescription.length > 165 || meta.title.length > 110 || meta.excerpt.length > 300) return { error: "a field is too long (seoTitle<=65, seoDescription<=165, title<=110, excerpt<=300)" };
  if (/\[\[IMAGE/.test(md)) return { error: "new articles have no body images; remove [[IMAGE n]]" };
  if (!/^## Frequently asked questions\s*$/m.test(md)) return { error: "add a '## Frequently asked questions' section with ### questions" };
  try { await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(meta.slug)}` }); return { error: "slug already used by a published article: " + meta.slug }; } catch (e) {}
  const cats = (await wix.request({ method: "GET", url: "https://www.wixapis.com/blog/v3/categories?paging.limit=100" })).categories || [];
  const cat = cats.find((c) => c.slug === meta.categorySlug);
  if (!cat) return { error: "unknown categorySlug; use one of: " + cats.map((c) => c.slug).join(", ") };
  const nodes = mdToRicos(md, []);
  const words = md.replace(/[#*|>\[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  if (nodes.length < 15 || words < 700) return { error: `too short: ${nodes.length} blocks, ${words} words` };
  const draftPost = {
    title: meta.title,
    excerpt: meta.excerpt,
    memberId: EDITORIAL_ID,
    categoryIds: [cat.id],
    seoSlug: meta.slug,
    commentingEnabled: true,
    language: "en",
    richContent: { nodes },
    seoData: { tags: [
      { type: "title", children: meta.seoTitle, custom: false, disabled: false },
      { type: "meta", props: { name: "description", content: meta.seoDescription }, children: "", custom: false, disabled: false },
    ] },
  };
  if (meta.cover && meta.cover.id) {
    draftPost.media = { wixMedia: { image: { id: meta.cover.id, url: "https://static.wixstatic.com/media/" + meta.cover.id, width: meta.cover.width || 1600, height: meta.cover.height || 900, filename: meta.slug + ".jpg" } }, displayed: true, custom: false };
  }
  const r = await wix.request({ method: "POST", url: "https://www.wixapis.com/blog/v3/draft-posts", body: { draftPost, publish: true } });
  let after = null;
  for (let i = 0; i < 5 && !after; i++) {
    try { after = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(meta.slug)}?fieldsets=SEO` })).post; } catch (e) { await new Promise((ok) => setTimeout(ok, 1500)); }
  }
  if (!after) return { error: "created draft " + (r.draftPost && r.draftPost.id) + " but it is not published under the slug yet; check it in Wix before retrying" };
  const tags = after.seoData?.tags || [];
  return { ok: true, id: after.id, slug: after.slug, url: "https://www.knewspaper.in/post/" + after.slug, title: after.title, category: cat.slug, words, cover: !!(after.media && after.media.displayed), seoTitle: tags.find((t) => t.type === "title")?.children };
}
