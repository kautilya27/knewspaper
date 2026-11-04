// Turn Wix Blog API objects into the small, stable shape the templates use.

import { parseImage } from './media.mjs';

export function normalizeCategory(c) {
  return {
    id: c._id || c.id,
    label: c.label || c.title || c.slug,
    slug: c.slug,
    description: c.description || '',
    postCount: c.postCount ?? 0,
  };
}

export function normalizePost(p, { categoriesById = new Map(), authors = new Map() } = {}) {
  const image =
    parseImage(p.media?.wixMedia?.image) ||
    parseImage(p.media?.embedMedia?.thumbnail?.url) ||
    parseImage(p.coverImage) ||
    parseImage(p.heroImage) ||
    null;
  const categories = (p.categoryIds || []).map((id) => categoriesById.get(id)).filter(Boolean);
  const text = p.contentText || '';
  const minutes = p.minutesToRead || (text ? Math.max(1, Math.round(text.split(/\s+/).length / 220)) : undefined);
  const seoDescription = (p.seoData?.tags || []).find((t) => t.type === 'meta' && t.props?.name === 'description')?.props?.content;

  return {
    id: p._id || p.id,
    slug: p.slug,
    title: p.title || 'Untitled',
    excerpt: clean(p.excerpt) || clean(text).slice(0, 180),
    description: clean(seoDescription || p.excerpt || text).slice(0, 160),
    published: p.firstPublishedDate || p.lastPublishedDate || null,
    updated: p.lastPublishedDate || p.firstPublishedDate || null,
    featured: Boolean(p.featured || p.pinned),
    views: p.metrics?.views ?? 0,
    minutes,
    image,
    imageAlt: p.media?.altText || p.title || '',
    categories,
    author: authors.get(p.memberId) || p.author || '',
    richContent: p.richContent || null,
    contentText: text,
    wixUrl: p.url ? (p.url.base || '') + (p.url.path || '') : '',
  };
}

const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
