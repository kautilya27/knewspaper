async () => {
  // Sets the cover image of one published article and republishes it.
  // files: cover.json = {"slug": "...", "id": "<wix media file id>", "width": 1600, "height": 900}
  const c = JSON.parse(files.find((f) => f.path === "cover.json").content.replace(/§END\s*$/, ""));
  if (!c.slug || !/~mv2\.(jpg|jpeg|png|webp)$/.test(c.id || "")) return { error: "need slug and a Wix media file id ending in ~mv2.jpg" };
  const post = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(c.slug)}` })).post;
  const draft = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}` })).draftPost;
  if (draft.hasUnpublishedChanges) return { error: "This article has unpublished edits in Wix; not touching it." };
  const media = { wixMedia: { image: { id: c.id, url: "https://static.wixstatic.com/media/" + c.id, width: c.width || 1600, height: c.height || 900, filename: c.slug + ".jpg" } }, displayed: true, custom: false };
  await wix.request({ method: "PATCH", url: `https://www.wixapis.com/blog/v3/draft-posts/${post.id}`, body: { draftPost: { id: post.id, media }, action: "UPDATE_PUBLISH" } });
  const after = (await wix.request({ method: "GET", url: `https://www.wixapis.com/blog/v3/posts/slugs/${encodeURIComponent(c.slug)}` })).post;
  return { ok: after.media?.wixMedia?.image?.id === c.id, slug: after.slug };
}
