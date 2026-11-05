async () => {
  const SLUG = "PUT-SLUG-HERE";
  function ricosToMd(nodes) {
    const images = [];
    const text = (ns) => (ns || []).map((t) => {
      if (t.type !== "TEXT") return text(t.nodes);
      let s = t.textData.text;
      const d = t.textData.decorations || [];
      const link = d.find((x) => x.type === "LINK");
      if (d.some((x) => x.type === "BOLD")) s = `**${s}**`;
      else if (d.some((x) => x.type === "ITALIC")) s = `*${s}*`;
      if (link) s = `[${s}](${link.linkData.link.url})`;
      return s;
    }).join("").replace(/\*\*\*\*/g, "");
    const out = [];
    const block = (n) => {
      switch (n.type) {
        case "HEADING": out.push("#".repeat(Math.max(2, n.headingData.level)) + " " + text(n.nodes).replace(/\*\*/g, "")); break;
        case "PARAGRAPH": { const t = text(n.nodes); if (t.trim()) out.push(t); break; }
        case "BULLETED_LIST": n.nodes.forEach((li) => out.push("- " + li.nodes.map((c) => c.type === "PARAGRAPH" ? text(c.nodes) : "").join(" "))); break;
        case "ORDERED_LIST": n.nodes.forEach((li, i) => out.push(`${i + 1}. ` + li.nodes.map((c) => c.type === "PARAGRAPH" ? text(c.nodes) : "").join(" "))); break;
        case "TABLE": n.nodes.forEach((row, ri) => { out.push("| " + row.nodes.map((c) => c.nodes.map((p) => text(p.nodes)).join(" ").replace(/\*\*/g, "")).join(" | ") + " |"); if (ri === 0) out.push("|" + row.nodes.map(() => "---").join("|") + "|"); }); break;
        case "BLOCKQUOTE": out.push("> " + n.nodes.map((p) => text(p.nodes)).join(" ")); break;
        case "DIVIDER": out.push("---"); break;
        case "IMAGE": out.push(`[[IMAGE ${images.length}]]  <!-- alt: ${n.imageData?.altText || ""} -->`); images.push(n); break;
        default: out.push(`<!-- ${n.type} block (will be dropped) -->`);
      }
      out.push("");
    };
    nodes.forEach(block);
    return { md: out.join("\n").replace(/\n{3,}/g, "\n\n").trim(), imageCount: images.length };
  }
  const p = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(SLUG)}?fieldsets=RICH_CONTENT&fieldsets=SEO` })).post;
  const tags = p.seoData?.tags || [];
  const { md, imageCount } = ricosToMd(p.richContent.nodes);
  // Other articles in the same topic, for internal links.
  let related = [];
  if ((p.categoryIds || []).length) {
    const r = await wix.request({ method: "POST", url: "https://www.wixapis.com/blog/v3/posts/query", body: { query: { filter: { categoryIds: { $hasSome: p.categoryIds } }, cursorPaging: { limit: 40 } } } });
    related = (r.posts || []).filter((x) => x.slug !== SLUG).map((x) => `${x.slug} | ${x.title}`);
  }
  return { title: p.title, excerpt: p.excerpt, seoTitle: tags.find((t) => t.type === "title")?.children || "", seoDescription: tags.find((t) => t.props?.name === "description")?.props?.content || "", imageCount, related, md };
}
