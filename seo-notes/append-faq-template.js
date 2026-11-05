async () => {
  // Adds a "Frequently asked questions" section to the end of one published article
  // and republishes it. files: faq.json = {"slug": "...", "faqs": [{"q": "...?", "a": "..."}]}
  // Everything else in the article is left exactly as it is. The new blocks have ids
  // starting with "faqk" so they can be found (or removed) later.
  const data = JSON.parse(files.find((f) => f.path === "faq.json").content.replace(/§END\s*$/, ""));
  const slug = String(data.slug || "");
  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  if (!slug) return { error: "slug missing" };
  if (faqs.length < 3 || faqs.length > 6) return { error: "need 3 to 6 FAQs" };
  for (const f of faqs) {
    if (!f.q || !f.a) return { error: "every FAQ needs q and a" };
    if (!/\?$/.test(f.q.trim())) return { error: "question must end with ?: " + f.q };
    if (f.q.length > 140) return { error: "question too long: " + f.q };
    if (f.a.length < 60 || f.a.length > 600) return { error: "answer must be 60-600 characters: " + f.q };
    if (/https?:\/\/|<|\]\(|\*\*/.test(f.a + f.q)) return { error: "plain text only (no links, HTML or markdown): " + f.q };
  }
  const post = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(slug)}?fieldsets=RICH_CONTENT` })).post;
  const draft = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}` })).draftPost;
  if (draft.hasUnpublishedChanges) return { error: "This article has unpublished edits in Wix; not touching it." };
  const nodes = post.richContent.nodes || [];
  const text = (n) => (n?.type === "TEXT" ? String(n.textData?.text || "") : (n?.nodes || []).map(text).join(""));
  if (nodes.some((n) => String(n.id || "").startsWith("faqk"))) return { error: "FAQ section already added to this article." };
  if (nodes.some((n) => n.type === "HEADING" && /\b(faqs?|frequently asked)\b/i.test(text(n)))) return { error: "Article already has an FAQ heading; not adding another." };
  let k = 0;
  const id = () => "faqk" + (k++).toString(36) + Date.now().toString(36).slice(-4);
  const t = (s) => ({ type: "TEXT", id: "", nodes: [], textData: { text: s, decorations: [] } });
  const add = [{ type: "HEADING", id: id(), nodes: [t("Frequently asked questions")], headingData: { level: 2, textStyle: { textAlignment: "AUTO" } } }];
  for (const f of faqs) {
    add.push({ type: "HEADING", id: id(), nodes: [t(f.q.trim())], headingData: { level: 3, textStyle: { textAlignment: "AUTO" } } });
    add.push({ type: "PARAGRAPH", id: id(), nodes: [t(f.a.trim())], paragraphData: { textStyle: { textAlignment: "AUTO" } } });
  }
  const richContent = { ...post.richContent, nodes: [...nodes, ...add] };
  await wix.request({ method: "PATCH", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}`, body: { draftPost: { id: post.id, richContent }, action: "UPDATE_PUBLISH" } });
  const after = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(slug)}?fieldsets=RICH_CONTENT` })).post;
  const added = (after.richContent.nodes || []).filter((n) => String(n.id || "").startsWith("faqk")).length;
  return { ok: added === add.length && after.richContent.nodes.length === nodes.length + add.length, slug: after.slug, title: after.title, faqs: faqs.length, blocksBefore: nodes.length, blocksAfter: after.richContent.nodes.length, lastPublished: after.lastPublishedDate };
}
