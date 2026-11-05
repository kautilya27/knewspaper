async () => {
  // Every published article (slug | title) and every topic (slug | label), for avoiding duplicates.
  const posts = [];
  let cursor = null;
  for (let k = 0; k < 30; k++) {
    const body = { query: { cursorPaging: cursor ? { limit: 100, cursor } : { limit: 100 } } };
    const r = await wix.request({ method: "POST", url: "https://www.wixapis.com/blog/v3/posts/query", body });
    posts.push(...(r.posts || []));
    cursor = r.pagingMetadata?.cursors?.next;
    if (!r.pagingMetadata?.hasNext || !cursor) break;
  }
  const cats = (await wix.request({ method: "GET", url: "https://www.wixapis.com/blog/v3/categories?paging.limit=100" })).categories || [];
  return { count: posts.length, categories: cats.map((c) => c.slug + " | " + c.label), posts: posts.map((p) => p.slug + " | " + p.title) };
}
