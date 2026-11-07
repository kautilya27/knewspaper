async () => {
  // Turns existing phrases in published articles into links to other Knewspaper articles.
  // Input (ExecuteWixAPI `files`): links.json = [{ "source": "<slug>", "find": "<exact text>", "target": "<slug>" }].
  // `find` must appear in a normal paragraph or list item of the source (not a heading, not
  // already a link); its first such occurrence becomes the link. At most 3 new links per
  // source, never a second link to the same target, and articles with unpublished edits in
  // Wix are left alone. Each source is republished once. Run with hasMutations: true.
  const API = "https://www.wixapis.com";
  const SITE = "https://www.knewspaper.in";
  const MAX_PER_SOURCE = 3;
  const plan = JSON.parse(files.find((f) => f.path === "links.json").content.replace(/\n?§END\s*$/, ""));
  const NB = (s) => s.replace(/ /g, " ");
  const bySource = new Map();
  for (const l of plan) {
    if (!l.source || !l.find || !l.target || l.source === l.target) continue;
    if (!bySource.has(l.source)) bySource.set(l.source, []);
    bySource.get(l.source).push(l);
  }
  const report = { added: 0, sources: 0, skipped: [] };
  const exists = new Map();
  const targetOk = async (slug) => {
    if (!exists.has(slug)) {
      try {
        const r = await wix.request({ method: "GET", url: `${API}/blog/v3/posts/slugs/${encodeURIComponent(slug)}` });
        exists.set(slug, !!r.post);
      } catch { exists.set(slug, false); }
    }
    return exists.get(slug);
  };
  for (const [source, links] of bySource) {
    let post;
    try {
      post = (await wix.request({ method: "GET", url: `${API}/blog/v3/posts/slugs/${encodeURIComponent(source)}?fieldsets=RICH_CONTENT` })).post;
    } catch { report.skipped.push(source + ": source not found"); continue; }
    const draft = (await wix.request({ method: "GET", url: `${API}/blog/v3/draft-posts/${post.id}` })).draftPost;
    if (draft.hasUnpublishedChanges) { report.skipped.push(source + ": has unpublished edits in Wix"); continue; }
    const rc = post.richContent;
    const raw = JSON.stringify(rc);
    const already = new Set([...raw.matchAll(/knewspaper\.in\/post\/([^"#?\/]+)/g)].map((m) => m[1].replace(/\.html$/, "")));
    let done = 0;
    for (const l of links) {
      if (done >= MAX_PER_SOURCE) { report.skipped.push(`${source} -> ${l.target}: limit of ${MAX_PER_SOURCE} reached`); continue; }
      if (already.has(l.target)) { report.skipped.push(`${source} -> ${l.target}: already linked`); continue; }
      if (!(await targetOk(l.target))) { report.skipped.push(`${source} -> ${l.target}: target not published`); continue; }
      // First plain text leaf (paragraph or list item, not a heading or table, not a link) containing the phrase.
      let hit = null;
      const walk = (n) => {
        if (hit || n.type === "HEADING" || n.type === "TABLE") return;
        if (n.type === "PARAGRAPH") {
          const kids = n.nodes || [];
          for (let i = 0; i < kids.length && !hit; i++) {
            const c = kids[i];
            if (c.type !== "TEXT" || (c.textData.decorations || []).some((d) => d.type === "LINK")) continue;
            const at = NB(c.textData.text).indexOf(NB(l.find));
            if (at >= 0) hit = { para: n, i, at };
          }
          return;
        }
        for (const c of n.nodes || []) walk(c);
      };
      for (const n of rc.nodes || []) walk(n);
      if (!hit) { report.skipped.push(`${source} -> ${l.target}: text not found "${l.find}"`); continue; }
      const leaf = hit.para.nodes[hit.i];
      const t = leaf.textData.text, deco = leaf.textData.decorations || [];
      const mk = (text, extra) => ({ type: "TEXT", id: "", nodes: [], textData: { text, decorations: extra ? [...deco, extra] : [...deco] } });
      const linkDeco = { type: "LINK", linkData: { link: { url: `${SITE}/post/${l.target}`, target: "SELF" } } };
      const parts = [];
      if (hit.at > 0) parts.push(mk(t.slice(0, hit.at)));
      parts.push(mk(t.slice(hit.at, hit.at + l.find.length), linkDeco));
      if (hit.at + l.find.length < t.length) parts.push(mk(t.slice(hit.at + l.find.length)));
      hit.para.nodes.splice(hit.i, 1, ...parts);
      already.add(l.target);
      done++;
    }
    if (!done) continue;
    await wix.request({ method: "PATCH", url: `${API}/blog/v3/draft-posts/${post.id}`, body: { draftPost: { id: post.id, richContent: rc }, action: "UPDATE_PUBLISH" } });
    report.added += done;
    report.sources++;
  }
  return report;
}
