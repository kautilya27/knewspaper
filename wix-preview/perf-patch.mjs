// Speed patch for the Knewspaper Wix-hosted pages. transform(files) takes
// { path: text } and returns the changed files. The same function body is run
// on Wix against the live files, and here against wix-preview/site.
export function transform(files) {
  const out = {};
  const once = (text, before, after, file) => {
    if (text.split(before).length !== 2) throw new Error(`Expected one match in ${file}: ${before.slice(0, 70)}`);
    return text.replace(before, after);
  };

  // ---------------------------------------------------------------- site.js
  let site = files["assets/site.js"];
  if (!site.includes("knews.categories.v1")) {
    site = once(site, 'import { fetchBlogCategories } from "/js/wix/taxonomy.js";\n',
      'import { fetchBlogCategories } from "/js/wix/taxonomy.js";\nimport { imgSrc, imgSrcSet } from "/js/wix/media.js";\n', "site.js");
    site = once(site,
      'export const categoriesReady = fetchBlogCategories()\n  .then((list) => list.filter((c) => c.postCount > 0))\n  .catch(() => []);\n',
      '// Kept in the browser for 30 minutes so each page doesn\'t fetch them again.\n' +
      'const CAT_KEY = "knews.categories.v1";\n' +
      'const CAT_TTL = 30 * 60 * 1000;\n' +
      'export const cachedCategories = (() => {\n' +
      '  try {\n' +
      '    const c = JSON.parse(localStorage.getItem(CAT_KEY) || "null");\n' +
      '    return c && Date.now() - c.at < CAT_TTL && Array.isArray(c.list) ? c.list : null;\n' +
      '  } catch { return null; }\n' +
      '})();\n' +
      'export const categoriesReady = cachedCategories\n' +
      '  ? Promise.resolve(cachedCategories.filter((c) => c.postCount > 0))\n' +
      '  : fetchBlogCategories()\n' +
      '      .then((list) => {\n' +
      '        if (list.length) try { localStorage.setItem(CAT_KEY, JSON.stringify({ at: Date.now(), list })); } catch {}\n' +
      '        return list.filter((c) => c.postCount > 0);\n' +
      '      })\n' +
      '      .catch(() => []);\n', "site.js");
    site = once(site,
      'const cover = (p, { eager = false } = {}) =>\n  p.coverUrl\n    ? `<div class="story__media"><img class="cover" src="${esc(p.coverUrl)}" alt="${esc(p.coverAlt)}" ${eager ? \'fetchpriority="high"\' : \'loading="lazy"\'} decoding="async"></div>`\n    : "";\n',
      '// Card images at the size they are shown, not the full-size cover.\n' +
      'const SIZES = {\n' +
      '  lead: { w: 960, ratio: 0.625, widths: [480, 720, 960, 1280], sizes: "(min-width: 1100px) 760px, (min-width: 760px) 62vw, 100vw" },\n' +
      '  stack: { w: 264, ratio: 0.75, widths: [160, 264, 400], sizes: "(min-width: 760px) 132px, 112px" },\n' +
      '  row: { w: 440, ratio: 0.667, widths: [240, 360, 480], sizes: "(min-width: 640px) 220px, 34vw" },\n' +
      '  tile: { w: 480, ratio: 0.667, widths: [320, 480, 640], sizes: "(min-width: 900px) 25vw, 50vw" },\n' +
      '};\n' +
      'const cover = (p, { eager = false, size = "row" } = {}) => {\n' +
      '  if (!p.coverUrl) return "";\n' +
      '  const s = SIZES[size];\n' +
      '  const h = Math.round(s.w * s.ratio);\n' +
      '  return `<div class="story__media"><img class="cover" src="${esc(imgSrc(p.coverUrl, s.w, h))}" srcset="${esc(imgSrcSet(p.coverUrl, s.widths, s.ratio))}" sizes="${s.sizes}" width="${s.w}" height="${h}" alt="${esc(p.coverAlt)}" ${eager ? \'fetchpriority="high"\' : \'loading="lazy"\'} decoding="async"></div>`;\n' +
      '};\n', "site.js");
    site = once(site, 'story story--lead${noMedia(p)}">${cover(p, { eager: true })}', 'story story--lead${noMedia(p)}">${cover(p, { eager: true, size: "lead" })}', "site.js");
    site = once(site, 'story story--stack${noMedia(p)}">${cover(p)}', 'story story--stack${noMedia(p)}">${cover(p, { size: "stack" })}', "site.js");
    site = once(site, 'story story--tile${noMedia(p)}">${cover(p)}', 'story story--tile${noMedia(p)}">${cover(p, { size: "tile" })}', "site.js");
    out["assets/site.js"] = site;
  }

  // ---------------------------------------------------------------- home.js
  let home = files["assets/home.js"];
  if (!home.includes("shelvesReady")) {
    home = once(home, 'async function main() {\n  const [page, cats]',
      '// The topic shelves load at the same time as the latest articles.\n' +
      'const shelvesReady = categoriesReady.then((cats) =>\n' +
      '  Promise.all(\n' +
      '    [...cats].sort((a, b) => b.postCount - a.postCount).slice(0, 4)\n' +
      '      .map((c) => fetchPosts({ categoryId: c.id, limit: 4 }).then((r) => ({ c, posts: r.posts })).catch(() => ({ c, posts: [] }))),\n' +
      '  ),\n' +
      ');\n\n' +
      'async function main() {\n  const [page, cats]', "home.js");
    home = once(home,
      '  // Shelves: the four topics with the most articles.\n  const top = [...cats].sort((a, b) => b.postCount - a.postCount).slice(0, 4);\n  const shelves = await Promise.all(\n    top.map((c) => fetchPosts({ categoryId: c.id, limit: 4 }).then((r) => ({ c, posts: r.posts })).catch(() => ({ c, posts: [] }))),\n  );\n',
      '  const shelves = await shelvesReady;\n', "home.js");
    out["assets/home.js"] = home;
  }

  // ---------------------------------------------------------------- feed.js
  let feed = files["assets/feed.js"];
  if (!feed.includes("cachedCategories")) {
    feed = once(feed, 'import { categoriesReady, card, markActive, showOldUrl } from "/assets/site.js";',
      'import { cachedCategories, categoriesReady, card, markActive, showOldUrl } from "/assets/site.js";', "feed.js");
    feed = once(feed, '    category = slug ? await fetchCategoryBySlug(slug) : null;\n',
      '    category = slug ? (cachedCategories || []).find((c) => c.slug === slug) || (await fetchCategoryBySlug(slug)) : null;\n', "feed.js");
    feed = once(feed,
      '  await categoriesReady;\n  const feed = createBlogFeedStore({ initialCategoryId: category ? category.id : null, pageSize: 20 });\n',
      '  // Seeded with the cached topics so the store doesn\'t fetch them again.\n' +
      '  const feed = createBlogFeedStore({ initialCategoryId: category ? category.id : null, pageSize: 20, ...(cachedCategories ? { initialCategories: cachedCategories } : {}) });\n', "feed.js");
    feed = once(feed, '  feed.start();\n}\n', '  feed.start();\n  // Topic labels on the rows appear as soon as the topics are known.\n  categoriesReady.then(() => render(feed.getState()));\n}\n', "feed.js");
    out["assets/feed.js"] = feed;
  }

  // ---------------------------------------------------------------- post.js
  let post = files["assets/post.js"];
  if (!post.includes("cachedCategories")) {
    post = once(post, 'import { categoriesReady, card, catHref, esc, markActive, meta, showOldUrl } from "/assets/site.js";',
      'import { imgSrc, imgSrcSet } from "/js/wix/media.js";\nimport { cachedCategories, card, catHref, esc, markActive, meta, showOldUrl } from "/assets/site.js";', "post.js");
    post = once(post, 'const store = createPostStore({ slug });',
      'const store = createPostStore({ slug, ...(cachedCategories ? { initialCategories: cachedCategories } : {}) });', "post.js");
    post = once(post,
      '<figure class="wrap article__hero"><img src="${esc(p.coverUrl)}" alt="${esc(p.coverAlt)}" fetchpriority="high" decoding="async"></figure>',
      '<figure class="wrap article__hero"><img src="${esc(imgSrc(p.coverUrl, 1280, 720))}" srcset="${esc(imgSrcSet(p.coverUrl, [640, 960, 1280, 1600], 0.5625))}" sizes="(min-width: 1240px) 1160px, 100vw" width="1280" height="720" alt="${esc(p.coverAlt)}" fetchpriority="high" decoding="async"></figure>', "post.js");
    post = once(post, 'await categoriesReady;\nstore.subscribe(render);', 'store.subscribe(render);', "post.js");
    out["assets/post.js"] = post;
  }

  // ------------------------------------------------------------- HTML heads
  const FONT = "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&display=swap";
  const base = ["/assets/site.js", "/js/wix/taxonomy.js", "/js/wix/client.js", "/js/wix/config.js", "/js/wix/media.js", "/js/wix/taxonomy-core.js"];
  const postsGraph = ["/js/wix/posts.js", "/js/wix/authors.js", "/js/wix/authors-core.js", "/js/wix/posts-core.js", "/js/wix/rich-content.js"];
  const graph = {
    "home.js": [...postsGraph],
    "feed.js": ["/js/wix/blog-feed-store.js", ...postsGraph],
    "post.js": ["/js/wix/post-store.js", "/js/wix/post-likes.js", "/js/wix/comments-store.js", "/js/wix/comments.js", "/js/wix/comments-core.js", ...postsGraph],
    "search.js": [],
    "site.js": [],
  };
  for (const [path, text] of Object.entries(files)) {
    if (!path.endsWith(".html") || text.includes('rel="modulepreload"')) continue;
    const m = text.match(/<script type="module" src="\/assets\/([a-z]+\.js)"><\/script>/);
    if (!m) continue;
    const mods = [...new Set([`/assets/${m[1]}`, ...base, ...(graph[m[1]] || [])])];
    let html = once(text, `<link rel="stylesheet" href="${FONT}">`,
      `<link rel="preload" as="style" href="${FONT}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${FONT}"></noscript>`, path);
    html = once(html, '<link rel="stylesheet" href="/assets/styles.css">',
      '<link rel="stylesheet" href="/assets/styles.css">' + mods.map((s) => `<link rel="modulepreload" href="${s}">`).join(""), path);
    out[path] = html;
  }
  return out;
}
