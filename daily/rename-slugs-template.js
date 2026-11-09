async () => {
  // Renames published articles' URLs (slugs) and keeps every old address working.
  // Input (ExecuteWixAPI `files`): renames.json = [{ "from": "<old slug>", "to": "<new slug>" }], at most 10
  // per run (the pre-render step refuses to delete more than 10 old pages at once).
  // For each rename: changes the post's slug in Wix, points /post/<old> at /post/<new> (301), and
  // rewrites links to the old address inside every other article. Afterwards run
  // wix-preview/prerender/deploy.js, which writes /post/<new>.html and removes /post/<old>.html.
  const API = "https://www.wixapis.com";
  const plan = JSON.parse(files.find((f) => f.path === "renames.json").content.replace(/\n?§END\s*$/, ""));
  if (plan.length > 10) return { error: "at most 10 renames per run" };
  const report = { renamed: [], skipped: [], redirects: null, linksUpdated: [], linkSkipped: [] };
  const done = [];
  for (const { from, to } of plan) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(to)) { report.skipped.push(`${from}: bad new slug ${to}`); continue; }
    let post;
    try { post = (await wix.request({ method: "GET", url: `${API}/blog/v3/posts/slugs/${encodeURIComponent(from)}` })).post; } catch { report.skipped.push(`${from}: not found`); continue; }
    try { await wix.request({ method: "GET", url: `${API}/blog/v3/posts/slugs/${encodeURIComponent(to)}` }); report.skipped.push(`${from}: ${to} already used`); continue; } catch {}
    const draft = (await wix.request({ method: "GET", url: `${API}/blog/v3/draft-posts/${post.id}` })).draftPost;
    if (draft.hasUnpublishedChanges) { report.skipped.push(`${from}: has unpublished edits in Wix`); continue; }
    await wix.request({ method: "PATCH", url: `${API}/blog/v3/draft-posts/${post.id}`, body: { draftPost: { id: post.id, seoSlug: to }, action: "UPDATE_PUBLISH" } });
    let after = null;
    for (let i = 0; i < 5 && !after; i++) {
      try { after = (await wix.request({ method: "GET", url: `${API}/blog/v3/posts/slugs/${encodeURIComponent(to)}` })).post; } catch { await new Promise((ok) => setTimeout(ok, 1500)); }
    }
    if (!after) { report.skipped.push(`${from}: slug update sent but ${to} not live yet; check in Wix`); continue; }
    done.push({ from, to, id: post.id });
    report.renamed.push(`${from} -> ${to}`);
  }
  if (!done.length) return report;

  // 301 redirects from the old addresses to the new ones.
  const redirects = done.map(({ from, to }) => ({ from: `/post/${from}`, to: `/post/${to}`, options: { groupRedirect: false } }));
  const rr = await wix.request({ method: "POST", url: `${API}/seo-redirects-service/v1/bulk/redirects/create`, body: { redirects, options: { forceReplace: true } } });
  report.redirects = { ok: rr.bulkActionMetadata?.totalSuccesses || 0, failed: (rr.results || []).filter((x) => x.itemMetadata?.error).map((x) => redirects[x.itemMetadata.originalIndex]?.from + ": " + (x.itemMetadata.error.code || x.itemMetadata.error.description || "")) };

  // Links inside other articles: old address -> new address.
  const posts = [];
  let cursor = null;
  for (let k = 0; k < 20; k++) {
    const body = { fieldsets: ["RICH_CONTENT"], query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } } };
    const r = await wix.request({ method: "POST", url: `${API}/blog/v3/posts/query`, body });
    posts.push(...(r.posts || []));
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const p of posts) {
    let raw = JSON.stringify(p.richContent || {});
    const before = raw;
    for (const { from, to } of done) raw = raw.replace(new RegExp(`(knewspaper\\.in/post/)${reEsc(from)}(\\.html)?(?=["#?/])`, "g"), `$1${to}`);
    if (raw === before) continue;
    const draft = (await wix.request({ method: "GET", url: `${API}/blog/v3/draft-posts/${p.id}` })).draftPost;
    if (draft.hasUnpublishedChanges) { report.linkSkipped.push(p.slug + ": has unpublished edits in Wix"); continue; }
    await wix.request({ method: "PATCH", url: `${API}/blog/v3/draft-posts/${p.id}`, body: { draftPost: { id: p.id, richContent: JSON.parse(raw) }, action: "UPDATE_PUBLISH" } });
    report.linksUpdated.push(p.slug);
  }
  return report;
}
