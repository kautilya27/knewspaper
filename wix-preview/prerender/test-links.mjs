// Local check of the internal-linking changes in deploy.js (topic pages, static topic menu, related picks).
import fs from "node:fs";
const W = "/home/claude/knewspaper/wix-preview/";
const OUT = process.argv[2];
const live = {};
for (const f of fs.readdirSync(W + "src/assets")) if (f.endsWith(".js") || f.endsWith(".css")) live["assets/" + f] = fs.readFileSync(W + "src/assets/" + f, "utf8");
for (const f of fs.readdirSync(W + "site")) if (f.endsWith(".html")) live[f] = fs.readFileSync(W + "site/" + f, "utf8");
for (const v of Object.values({ ...live })) for (const m of String(v).matchAll(/from\s+["'](\/js\/wix\/[^"']+)["']/g)) live[m[1].slice(1)] = "export const stub = 1;\n";
live["sitemap-articles.xml"] = '<?xml version="1.0"?><urlset><url><loc>https://www.knewspaper.in/</loc></url></urlset>';
const T = (t, d = []) => ({ type: "TEXT", textData: { text: t, decorations: d } });
const P = (...n) => ({ type: "PARAGRAPH", nodes: n });
const L = (slug) => [{ type: "LINK", linkData: { link: { url: "https://www.knewspaper.in/post/" + slug } } }];
const cats = [{ id: "fin", slug: "finance", label: "Finance" }, { id: "re", slug: "real-estate", label: "Real Estate" }, { id: "an", slug: "anime", label: "Anime" }, { id: "empty", slug: "empty", label: "Empty" }];
const mk = (i, slug, title, cat, body = [P(T("Body text."))], rel = []) => ({ id: "id" + i, slug, title, excerpt: "Summary of " + title, firstPublishedDate: `2025-0${(i % 9) + 1}-01T00:00:00Z`, lastPublishedDate: "2026-11-01T00:00:00Z", minutesToRead: 3, categoryIds: [cat], memberId: "m", richContent: { nodes: body }, relatedPostIds: rel });
const posts = [
  mk(1, "what-is-an-etf", "What Is an ETF? A Simple Guide", "fin", [P(T("See "), T("mutual funds", L("what-are-mutual-funds")))]),
  mk(2, "what-are-mutual-funds", "What Are Mutual Funds?", "fin"),
  mk(3, "mutual-funds-vs-etfs", "Mutual Funds vs ETFs in India", "fin"),
  mk(4, "stocks-vs-mutual-funds", "Stocks vs Mutual Funds", "fin"),
  mk(5, "best-credit-cards-in-india", "Best Credit Cards in India", "fin"),
  mk(6, "average-rent-in-pune", "Average Rent in Pune", "re"),
  mk(7, "is-pune-cheaper-than-bangalore", "Is Pune Cheaper Than Bangalore?", "re"),
  mk(8, "kakashi-vs-gojo", "Kakashi vs Gojo", "an"),
  mk(9, "is-gojo-alive", "Is Gojo Alive?", "an", undefined, ["id8"]),
];
let patched = null; const redir = [];
globalThis.files = [{ path: "edits.json", content: "[]\n§END" }];
globalThis.wix = { headless: { files: {
  list: async ({ offset = 0 }) => ({ files: offset ? [] : Object.keys(live).map((path) => ({ path })), hasMore: false }),
  read: async ({ path }) => ({ text: live[path] ?? "export const x = 1;\n", offset: 0, length: 1, hasMore: false }),
  patch: async (o) => { patched = o; return { published: true, summary: { added: o.files.map((f) => f.path), replaced: [], deleted: o.deletePaths, unchanged: [] } }; } } },
  request: async ({ url, body }) => {
    if (url.includes("/posts/query")) return { posts, pagingMetadata: { hasNext: false } };
    if (url.includes("/categories")) return { categories: cats };
    if (url.includes("/members/query")) return { members: [{ id: "m", profile: { nickname: "Knewspaper Editorial Team" } }] };
    if (url.endsWith("/redirects")) return { redirects: [{ from: "/blog/categories/finance", to: "/category.html?slug=finance" }, { from: "/blog/categories/fashion-1", to: "/category.html?slug=anime" }, { from: "/post/what-is-an-etf", to: "/post/what-is-an-etf.html" }] };
    if (url.includes("bulk/redirects/create")) { redir.push(...body.redirects); return { bulkActionMetadata: { totalSuccesses: body.redirects.length }, results: [] }; }
    throw Error("unmocked " + url);
  } };
const fn = (0, eval)("(" + fs.readFileSync(W + "prerender/deploy.js", "utf8") + ")");
const rep = await fn();
const out = Object.fromEntries(patched.files.map((f) => [f.path, f.content]));
console.log("report", JSON.stringify(rep.summary), "files:", Object.keys(out).filter((k) => !k.startsWith("assets/")).join(" "));
console.log("redirects", JSON.stringify(redir.filter((r) => r.from.includes("categories"))));
const links = (h) => [...h.matchAll(/href="(\/post\/[^"]+)"/g)].map((m) => m[1]);
console.log("finance page article links:", links(out["category/finance.html"]).join(" "));
console.log("blog page article links:", links(out["blog.html"]).length);
console.log("empty topic page?", !!out["category/empty.html"]);
for (const p of ["index.html", "post/what-is-an-etf.html", "category/anime.html"]) console.log(p, "catnav static:", /data-catnav data-static><li><a href="\/blog">Latest<\/a><\/li><li><a href="\/blog\/categories\/finance">/.test(out[p] || ""), "footer:", /<ul data-footer-topics><li>/.test(out[p] || ""));
for (const s of ["what-is-an-etf", "is-gojo-alive", "average-rent-in-pune"]) { const h = out[`post/${s}.html`]; const rel = h.match(/data-related>([\s\S]*?)<\/div>\s*<\/section>/); console.log("related for", s, ":", links(rel ? rel[1] : "").join(" ")); }
fs.mkdirSync(OUT + "/category", { recursive: true });
for (const [k, v] of Object.entries(out)) { const f = OUT + "/" + k; fs.mkdirSync(f.slice(0, f.lastIndexOf("/")), { recursive: true }); fs.writeFileSync(f, v); }
process.exit(0);
