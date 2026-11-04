// Reusable fragments: images, bylines, story cards.

import { esc, attr, formatDate } from '../render/html.mjs';
import { imageUrl, imageSrcset } from '../data/media.mjs';

export function makeComponents(site) {
  const u = site.url; // path -> URL relative to base

  const postUrl = (p) => u(`post/${p.slug}/`);
  const catUrl = (c) => u(`blog/categories/${c.slug}/`);

  /** <img> for a post cover. ratio = width/height. */
  function cover(p, { w, ratio = 16 / 9, sizes, eager = false, widths } = {}) {
    const h = Math.round(w / ratio);
    if (!p.image) {
      return `<img class="cover cover--placeholder" src="${attr(u(site.images.placeholder))}" width="${w}" height="${h}" alt="" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
    }
    const set = imageSrcset(p.image, ratio, widths || [Math.round(w / 2), w, Math.round(w * 1.5), w * 2].filter((x) => x >= 120));
    return `<img class="cover" src="${attr(imageUrl(p.image, w, h))}"${set ? ` srcset="${attr(set)}" sizes="${attr(sizes || `${w}px`)}"` : ''} width="${w}" height="${h}" alt="${attr(p.imageAlt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }

  const kicker = (p) => {
    const c = p.categories[0];
    return c ? `<a class="kicker" href="${attr(catUrl(c))}">${esc(c.label)}</a>` : '';
  };

  const meta = (p, { author = false } = {}) => {
    const bits = [];
    if (author && p.author) bits.push(`<span class="meta__author">By ${esc(p.author)}</span>`);
    if (p.published) bits.push(`<time datetime="${attr(p.published)}">${esc(formatDate(p.published))}</time>`);
    if (p.minutes) bits.push(`<span>${p.minutes} min read</span>`);
    return bits.length ? `<p class="meta">${bits.join('')}</p>` : '';
  };

  // Headline link covers the whole card via ::after; kicker stays clickable.
  const headline = (p, tag = 'h3', cls = '') =>
    `<${tag} class="story__title ${cls}"><a href="${attr(postUrl(p))}">${esc(p.title)}</a></${tag}>`;

  const storyLead = (p) => `
    <article class="story story--lead">
      <div class="story__media">${cover(p, { w: 880, ratio: 16 / 10, sizes: '(min-width: 1100px) 640px, (min-width: 760px) 58vw, 100vw', eager: true, widths: [480, 720, 880, 1200, 1600] })}</div>
      <div class="story__body">
        ${kicker(p)}
        ${headline(p, 'h2', 'story__title--lead')}
        <p class="story__dek">${esc(p.excerpt)}</p>
        ${meta(p, { author: true })}
      </div>
    </article>`;

  const storyStack = (p) => `
    <article class="story story--stack">
      <div class="story__media">${cover(p, { w: 200, ratio: 4 / 3, sizes: '(min-width: 760px) 160px, 112px', widths: [112, 160, 224, 320] })}</div>
      <div class="story__body">
        ${kicker(p)}
        ${headline(p, 'h3')}
        ${meta(p)}
      </div>
    </article>`;

  const storyRow = (p, { level = 'h3' } = {}) => `
    <article class="story story--row">
      <div class="story__body">
        ${kicker(p)}
        ${headline(p, level)}
        <p class="story__dek">${esc(p.excerpt)}</p>
        ${meta(p)}
      </div>
      <div class="story__media">${cover(p, { w: 280, ratio: 3 / 2, sizes: '(min-width: 760px) 240px, 34vw', widths: [160, 240, 360, 480] })}</div>
    </article>`;

  const storyTile = (p) => `
    <article class="story story--tile">
      <div class="story__media">${cover(p, { w: 360, ratio: 3 / 2, sizes: '(min-width: 1100px) 260px, (min-width: 640px) 45vw, 100vw', widths: [240, 360, 540, 720] })}</div>
      <div class="story__body">
        ${headline(p, 'h3')}
        ${meta(p)}
      </div>
    </article>`;

  const storyRank = (p) => `
    <li class="rank">
      ${headline(p, 'h3', 'story__title--small')}
      ${kicker(p)}
    </li>`;

  const pagination = (page, pages, hrefFor) => {
    if (pages <= 1) return '';
    const items = [];
    const add = (n, label = n) =>
      items.push(n === page ? `<li><span aria-current="page">${label}</span></li>` : `<li><a href="${attr(hrefFor(n))}">${label}</a></li>`);
    if (page > 1) items.push(`<li><a rel="prev" href="${attr(hrefFor(page - 1))}">Newer</a></li>`);
    const near = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
    let last = 0;
    [...near].sort((a, b) => a - b).forEach((n) => {
      if (n - last > 1) items.push('<li aria-hidden="true"><span class="gap">…</span></li>');
      add(n);
      last = n;
    });
    if (page < pages) items.push(`<li><a rel="next" href="${attr(hrefFor(page + 1))}">Older</a></li>`);
    return `<nav class="pager" aria-label="Pages"><ul>${items.join('')}</ul></nav>`;
  };

  const newsletter = ({ id = 'newsletter', compact = false } = {}) => `
    <section class="newsletter${compact ? ' newsletter--compact' : ''}" aria-labelledby="${id}-title">
      <h2 id="${id}-title" class="newsletter__title">Get the day’s best reads</h2>
      <p class="newsletter__text">One short email with new explainers from ${esc(site.name)}. No spam, unsubscribe any time.</p>
      <form class="newsletter__form" data-newsletter novalidate>
        <label for="${id}-email" class="sr-only">Email address</label>
        <input id="${id}-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com">
        <button type="submit" class="btn">Subscribe</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>`;

  return { postUrl, catUrl, cover, kicker, meta, storyLead, storyStack, storyRow, storyTile, storyRank, pagination, newsletter };
}
