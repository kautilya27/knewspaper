// Build-time data loader. Runs in Node (locally or in GitHub Actions) and
// reads your Wix Blog through the Wix JavaScript SDK.
//
// Auth: OAuthStrategy with only the public Client ID. The SDK creates an
// anonymous visitor token, which can read published blog posts and
// categories. No API key or client secret is used anywhere.

import { normalizePost, normalizeCategory } from './normalize.mjs';

export async function loadFromWix({ clientId, log = console.log }) {
  if (!clientId) throw new Error('WIX_CLIENT_ID is not set.');

  const { createClient, OAuthStrategy } = await import('@wix/sdk');
  const { posts, categories } = await import('@wix/blog');

  const wix = createClient({
    modules: { posts, categories },
    auth: OAuthStrategy({ clientId }),
  });

  // --- Categories --------------------------------------------------------
  const cats = [];
  for (let offset = 0; ; offset += 100) {
    const res = await wix.categories.listCategories({ paging: { limit: 100, offset } });
    const batch = res.categories || [];
    cats.push(...batch);
    if (batch.length < 100) break;
  }
  log(`  Wix: ${cats.length} categories`);

  // --- Posts (newest first, including rich content for article pages) ----
  const raw = [];
  const PAGE = 50;
  for (let offset = 0; ; offset += PAGE) {
    const res = await wix.posts.listPosts({
      paging: { limit: PAGE, offset },
      sort: 'PUBLISHED_DATE_DESC',
      fieldsets: ['URL', 'CONTENT_TEXT', 'RICH_CONTENT', 'METRICS', 'SEO'],
    });
    const batch = res.posts || [];
    raw.push(...batch);
    log(`  Wix: fetched ${raw.length} posts`);
    if (batch.length < PAGE) break;
    if (offset > 20000) break; // safety stop
  }

  // Some API versions omit rich content in list calls: fill the gaps.
  for (const p of raw) {
    if (p.richContent || !p.slug) continue;
    try {
      const { post } = await wix.posts.getPostBySlug(p.slug, {
        fieldsets: ['RICH_CONTENT', 'CONTENT_TEXT', 'SEO', 'URL'],
      });
      if (post) Object.assign(p, { richContent: post.richContent, contentText: post.contentText, seoData: post.seoData });
    } catch (err) {
      log(`  Wix: could not load body for "${p.slug}": ${err.message}`);
    }
  }

  // --- Authors (best effort; public member profiles) ---------------------
  const authors = await loadAuthors(wix, raw, log, clientId);

  const categoryList = cats.map(normalizeCategory);
  const byId = new Map(categoryList.map((c) => [c.id, c]));
  const postList = raw.map((p) => normalizePost(p, { categoriesById: byId, authors }));
  return { posts: postList, categories: categoryList, source: 'wix' };
}

async function loadAuthors(_wix, raw, log, clientId) {
  const ids = [...new Set(raw.map((p) => p.memberId).filter(Boolean))];
  const authors = new Map();
  if (!ids.length) return authors;
  try {
    const { createClient, OAuthStrategy } = await import('@wix/sdk');
    const { members } = await import('@wix/members');
    const client = createClient({ modules: { members }, auth: OAuthStrategy({ clientId }) });
    for (let i = 0; i < ids.length; i += 100) {
      const chunk = ids.slice(i, i + 100);
      const res = await client.members.queryMembers().in('_id', chunk).limit(100).find();
      for (const m of res.items || []) {
        const name = m.profile?.nickname || [m.contact?.firstName, m.contact?.lastName].filter(Boolean).join(' ');
        if (name) authors.set(m._id, name);
      }
    }
    log(`  Wix: ${authors.size} author names`);
  } catch (err) {
    log(`  Wix: author names unavailable (${err.message}); bylines will be hidden.`);
  }
  return authors;
}
