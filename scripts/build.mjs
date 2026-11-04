#!/usr/bin/env node
// Static site generator for Knewspaper.
//   node scripts/build.mjs             -> live content from Wix (needs WIX_CLIENT_ID)
//   node scripts/build.mjs --fixtures  -> offline preview content
// Output goes to ./dist, ready for any static host (GitHub Pages, Netlify, ...).

import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadDotEnv(path.join(ROOT, '.env'));

const { default: config } = await import('../site.config.mjs');
const { loadFromWix } = await import('../src/data/wix.mjs');
const { loadFixtures } = await import('../src/data/fixtures.mjs');
const { makeLayout } = await import('../src/templates/layout.mjs');
const { makeComponents } = await import('../src/templates/components.mjs');
const { makePages } = await import('../src/templates/pages.mjs');
const { setLinkBase } = await import('../src/render/ricos.mjs');
const { esc } = await import('../src/render/html.mjs');
const { imageUrl } = await import('../src/data/media.mjs');
const { privacyHtml } = await import('../src/templates/privacy.mjs');

const OUT = path.join(ROOT, 'dist');
const args = new Set(process.argv.slice(2));
const CI = process.env.CI === 'true';
const t0 = Date.now();

// ------------------------------------------------------------------ data
let data;
if (args.has('--fixtures')) {
  data = loadFixtures();
} else {
  try {
    console.log('Loading content from Wix…');
    data = await loadFromWix({ clientId: config.wix.clientId });
  } catch (err) {
    if (CI) {
      console.error(`\nWix content could not be loaded: ${err.message}\nThe build stops so the live site keeps its last good version.`);
      process.exit(1);
    }
    console.warn(`\n⚠ Wix content could not be loaded (${err.message}).\n  Building with offline preview content instead.\n`);
    data = loadFixtures();
  }
}
if (data.source === 'wix' && data.posts.length === 0 && CI) {
  console.error('Wix returned no posts. Check the Client ID and that the Blog app has published posts.');
  process.exit(1);
}

// Categories: keep the configured nav order, add any new Wix categories,
// and count posts from the data we actually have.
const counts = {};
for (const p of data.posts) for (const c of p.categories) counts[c.slug] = (counts[c.slug] || 0) + 1;
const order = new Map(config.categories.map((c, i) => [c.slug, i]));
const seen = new Map();
for (const c of [...data.categories, ...config.categories]) if (c.slug && !seen.has(c.slug)) seen.set(c.slug, c);
const categories = [...seen.values()]
  .map((c) => ({ ...c, label: c.label || c.slug, postCount: counts[c.slug] || 0 }))
  .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999) || a.label.localeCompare(b.label));
data.categories = categories;

// ------------------------------------------------------------------ site
const site = {
  ...config,
  source: data.source,
  url: (p = '') => config.basePath + p.replace(/^\//, ''),
  canonical: (p = '') => config.canonicalBase + p.replace(/^\//, ''),
  abs: (p = '') => config.siteUrl + p.replace(/^\//, ''),
  adsenseAccount: 'ca-pub-6382255537358474',
  privacyHtml: privacyHtml(config),
  clientConfig: {
    clientId: config.wix.clientId,
    basePath: config.basePath,
    siteOrigin: config.siteOrigin,
    newsletterFormId: config.wix.newsletterFormId,
    newsletterFields: config.wix.newsletterFields,
    contactFormId: config.wix.contactFormId,
    contactFields: config.wix.contactFields,
    email: config.email,
  },
};
setLinkBase(config.basePath);

// ---------------------------------------------------------------- assets
await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, 'assets'), { recursive: true });
await cp(path.join(ROOT, 'src/assets'), path.join(OUT, 'assets'), { recursive: true });
const bundled = await bundleClient();
const assetVersion = hash(
  (await readFile(path.join(OUT, 'assets/styles.css'), 'utf8')) + (await readFile(path.join(OUT, 'assets/app.js'), 'utf8')),
).slice(0, 10);

// ----------------------------------------------------------------- pages
const L = makeLayout(site, { categories, assetVersion });
const C = makeComponents(site);
const P = makePages(site, L, C, data);

const files = new Map();
const put = (rel, html) => files.set(rel, html);
const sitemap = [];
const addUrl = (rel, lastmod) => sitemap.push({ loc: site.canonical(rel), lastmod });

put('index.html', P.home());
addUrl('', data.posts[0]?.updated);

for (const p of data.posts) {
  if (!p.slug) continue;
  put(`post/${p.slug}/index.html`, P.article(p));
  addUrl(`post/${p.slug}/`, p.updated);
}

const per = config.postsPerPage;
const paged = (items, baseRel, opts) => {
  const pages = Math.max(1, Math.ceil(items.length / per));
  const basePathFor = (n) => (n === 1 ? baseRel : `${baseRel}page/${n}/`);
  for (let n = 1; n <= pages; n++) {
    put(`${basePathFor(n)}index.html`, P.listing({ ...opts, items: items.slice((n - 1) * per, n * per), page: n, pages, basePathFor }));
    if (n === 1) addUrl(baseRel, items[0]?.updated);
  }
};
paged(data.posts, 'blog/', { title: 'Latest articles', intro: `Everything new on ${config.name}, newest first.` });
for (const c of categories) {
  const items = data.posts.filter((p) => p.categories.some((x) => x.slug === c.slug));
  if (!items.length) continue;
  paged(items, `blog/categories/${c.slug}/`, { title: c.label, intro: c.description || `${c.label} articles and explainers from ${config.name}.`, cat: c });
}

put('search/index.html', P.search());
put('about-us/index.html', P.about());
addUrl('about-us/');
put('write-for-us/index.html', P.writeForUs());
addUrl('write-for-us/');
put('contact/index.html', P.contact());
addUrl('contact/');
put('privacy-policy/index.html', P.privacy());
addUrl('privacy-policy/');
put('login/index.html', P.login());
put('callback/index.html', P.callback());
put('404.html', P.notFound());

for (const [rel, html] of files) {
  const file = path.join(OUT, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, minifyHtml(html));
}

// ------------------------------------------------- search index, feeds, SEO
const index = data.posts.map((p) => ({
  t: p.title,
  s: p.slug,
  e: p.excerpt.slice(0, 160),
  c: p.categories.map((c) => c.label).join(', '),
  d: p.published,
  m: p.minutes || 0,
  i: p.image ? imageUrl(p.image, 280, 187) : '',
}));
await writeFile(path.join(OUT, 'search-index.json'), JSON.stringify(index));

await writeFile(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
    .map((s) => `  <url><loc>${esc(s.loc)}</loc>${s.lastmod ? `<lastmod>${new Date(s.lastmod).toISOString()}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`,
);
await writeFile(
  path.join(OUT, 'robots.txt'),
  site.allowIndexing
    ? `User-agent: *\nAllow: /\nDisallow: ${site.url('search/')}\nDisallow: ${site.url('login/')}\nDisallow: ${site.url('callback/')}\n\nSitemap: ${site.canonical('sitemap.xml')}\n`
    : `# Preview deployment: not for indexing. Set ALLOW_INDEXING=true when this becomes the main site.\nUser-agent: *\nDisallow: /\n`,
);
await writeFile(path.join(OUT, 'feed.xml'), rss(data.posts.slice(0, 30)));
await writeFile(path.join(OUT, '.nojekyll'), '');

console.log(
  `\n✓ Built ${files.size} pages from ${data.source === 'wix' ? 'Wix' : 'offline preview data'} (${data.posts.length} posts, ${categories.filter((c) => c.postCount).length} topics)` +
    `\n  client bundle: ${bundled ? 'esbuild' : 'unbundled (install deps for sign-in and forms)'}` +
    `\n  base path: ${config.basePath}  site: ${config.siteUrl}  indexing: ${site.allowIndexing ? 'on' : 'off'}` +
    `\n  in ${((Date.now() - t0) / 1000).toFixed(1)}s → dist/\n`,
);

// ---------------------------------------------------------------- helpers
async function bundleClient() {
  let esbuild;
  try {
    esbuild = await import('esbuild');
  } catch {
    // No dependencies installed: ship the dependency-free app script as-is
    // and a stub for the Wix module so the rest of the site still works.
    await cp(path.join(ROOT, 'src/client/app.js'), path.join(OUT, 'assets/app.js'));
    await writeFile(
      path.join(OUT, 'assets/wix.js'),
      "export const available = false;\nconst missing = () => { throw new Error('Wix SDK bundle not built. Run npm install, then npm run build.'); };\nexport const login = missing, completeLogin = missing, logout = missing, currentMember = missing, submitForm = missing;\nexport const isLoggedIn = () => false;\n",
    );
    return false;
  }
  await esbuild.build({
    entryPoints: { app: path.join(ROOT, 'src/client/app.js'), wix: path.join(ROOT, 'src/client/wix.js') },
    outdir: path.join(OUT, 'assets'),
    bundle: true,
    format: 'esm',
    splitting: true,
    minify: true,
    target: ['es2020'],
    platform: 'browser',
    external: ['./wix.js'],
    chunkNames: 'chunks/[name]-[hash]',
    legalComments: 'none',
    logLevel: 'warning',
  });
  await esbuild.build({
    entryPoints: [path.join(OUT, 'assets/styles.css')],
    outfile: path.join(OUT, 'assets/styles.css'),
    allowOverwrite: true,
    minify: true,
    logLevel: 'warning',
  });
  return true;
}

function rss(items) {
  const x = (s) => esc(s);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${x(config.name)}</title>
<link>${x(site.canonical(''))}</link>
<description>${x(config.description)}</description>
<language>${config.lang}</language>
<atom:link href="${x(site.canonical('feed.xml'))}" rel="self" type="application/rss+xml"/>
${items
  .map(
    (p) => `<item><title>${x(p.title)}</title><link>${x(site.canonical(`post/${p.slug}/`))}</link><guid>${x(site.canonical(`post/${p.slug}/`))}</guid>${p.published ? `<pubDate>${new Date(p.published).toUTCString()}</pubDate>` : ''}<description>${x(p.excerpt)}</description>${p.categories.map((c) => `<category>${x(c.label)}</category>`).join('')}</item>`,
  )
  .join('\n')}
</channel>
</rss>
`;
}

function minifyHtml(html) {
  // Conservative: collapse whitespace between tags, keep <pre> intact.
  const pres = [];
  return html
    .replace(/<pre[\s\S]*?<\/pre>/g, (m) => `\u0000${pres.push(m) - 1}\u0000`)
    .replace(/>\s+</g, '> <')
    .replace(/\n\s*/g, '\n')
    .replace(/\u0000(\d+)\u0000/g, (_, i) => pres[+i]);
}

function hash(s) {
  return createHash('sha1').update(s).digest('hex');
}

function loadDotEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
