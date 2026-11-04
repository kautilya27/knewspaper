// Minimal, dependency-free renderer for Wix Ricos rich content (the JSON
// document format the Wix Blog API returns in `richContent`). Renders to
// clean semantic HTML at build time, so article pages need no JavaScript.

import { esc, attr } from './html.mjs';
import { parseImage, imageUrl, imageSrcset } from '../data/media.mjs';

export function renderRicos(doc, { title = '', coverId = '' } = {}) {
  if (!doc || !Array.isArray(doc.nodes)) return { html: '', toc: [] };
  const toc = [];
  // coverId: the post's cover image, which Wix posts often repeat as the
  // first body image. It is already shown as the hero, so skip it once.
  const ctx = { toc, slugs: new Set(), title, coverId, inHeading: false };
  const html = doc.nodes.map((n) => node(n, ctx)).join('\n');
  return { html, toc };
}

const kids = (n, ctx) => (n.nodes || []).map((c) => node(c, ctx)).join('');

function node(n, ctx) {
  switch (n.type) {
    case 'PARAGRAPH': {
      const inner = kids(n, ctx);
      return inner.trim() ? `<p${align(n.paragraphData)}>${inner}</p>` : '';
    }
    case 'TEXT':
      return text(n.textData, ctx);
    case 'HEADING': {
      // The post title is the page's only <h1>; shift body headings down.
      const level = Math.min(6, Math.max(2, (n.headingData?.level || 2) + (n.headingData?.level === 1 ? 1 : 0)));
      const plain = plainText(n).trim();
      if (!plain) return '';
      const id = uniqueSlug(plain, ctx.slugs);
      if (level <= 3) ctx.toc.push({ id, text: plain, level });
      ctx.inHeading = true;
      const inner = kids(n, ctx);
      ctx.inHeading = false;
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
    case 'BLOCKQUOTE':
      return `<blockquote>${kids(n, ctx)}</blockquote>`;
    case 'CODE_BLOCK':
      return `<pre><code>${esc(plainText(n))}</code></pre>`;
    case 'BULLETED_LIST':
      return `<ul>${kids(n, ctx)}</ul>`;
    case 'ORDERED_LIST':
      return `<ol>${kids(n, ctx)}</ol>`;
    case 'LIST_ITEM':
      return `<li>${kids(n, ctx).replace(/^<p>([\s\S]*)<\/p>$/, '$1')}</li>`;
    case 'DIVIDER':
      return '<hr>';
    case 'IMAGE':
      return image(n.imageData, ctx);
    case 'GALLERY':
      return gallery(n.galleryData, ctx);
    case 'VIDEO':
      return video(n.videoData);
    case 'TABLE':
      return `<div class="table-wrap"><table>${kids(n, ctx)}</table></div>`;
    case 'TABLE_ROW':
      return `<tr>${kids(n, ctx)}</tr>`;
    case 'TABLE_CELL':
      return `<td>${kids(n, ctx).replace(/^<p>([\s\S]*)<\/p>$/, '$1')}</td>`;
    case 'COLLAPSIBLE_LIST':
      return kids(n, ctx);
    case 'COLLAPSIBLE_ITEM': {
      const [titleNode, bodyNode] = n.nodes || [];
      return `<details class="faq"><summary>${titleNode ? kids(titleNode, ctx) : ''}</summary>${bodyNode ? kids(bodyNode, ctx) : ''}</details>`;
    }
    case 'COLLAPSIBLE_ITEM_TITLE':
    case 'COLLAPSIBLE_ITEM_BODY':
      return kids(n, ctx);
    case 'BUTTON': {
      const b = n.buttonData || {};
      const href = b.link?.url;
      return href ? `<p><a class="btn btn--quiet" href="${attr(href)}"${ext(href)}>${esc(b.text || 'Open link')}</a></p>` : '';
    }
    case 'LINK_PREVIEW': {
      const l = n.linkPreviewData || {};
      const href = l.link?.url;
      return href ? `<p><a href="${attr(href)}"${ext(href)}>${esc(l.title || href)}</a></p>` : '';
    }
    case 'HTML': // embeds are not rendered for safety and speed
    case 'EMBED':
      return '';
    default:
      return kids(n, ctx);
  }
}

function text(td = {}, ctx = {}) {
  let out = esc(td.text || '').replace(/\n/g, '<br>');
  const decos = td.decorations || [];
  for (const d of decos) {
    // Headings are already bold; Wix marks heading text BOLD explicitly.
    if (d.type === 'BOLD' && !ctx.inHeading && (d.fontWeightValue ?? 700) >= 600) out = `<strong>${out}</strong>`;
    else if (d.type === 'ITALIC' && d.italicData !== false) out = `<em>${out}</em>`;
    else if (d.type === 'UNDERLINE' && d.underlineData !== false) out = `<u>${out}</u>`;
    else if (d.type === 'STRIKETHROUGH') out = `<s>${out}</s>`;
    else if (d.type === 'SUPERSCRIPT') out = `<sup>${out}</sup>`;
    else if (d.type === 'SUBSCRIPT') out = `<sub>${out}</sub>`;
  }
  const link = decos.find((d) => d.type === 'LINK')?.linkData?.link;
  if (link?.url) out = `<a href="${attr(rewriteLink(link.url))}"${ext(link.url)}>${out}</a>`;
  const anchor = decos.find((d) => d.type === 'ANCHOR')?.anchorData?.anchor;
  if (anchor) out = `<a href="#${attr(anchor)}">${out}</a>`;
  return out;
}

// Internal links to the old Wix domain keep working on the new site.
let LINK_BASE = '/';
export function setLinkBase(base) { LINK_BASE = base; }
function rewriteLink(url) {
  const m = String(url).match(/^https?:\/\/(?:www\.)?knewspaper\.in(\/(?:post|blog)\/[^?#]*)/i);
  if (!m) return url;
  return LINK_BASE + m[1].replace(/^\//, '').replace(/\/?$/, '/');
}

function image(d = {}, ctx) {
  const img = parseImage(d.image?.src?.id ? { id: d.image.src.id, width: d.image.width, height: d.image.height } : d.image?.src?.url || d.image?.src);
  if (!img) return '';
  if (ctx.coverId && img.id === ctx.coverId) {
    ctx.coverId = '';
    return '';
  }
  const w = img.width || 1200;
  const hgt = img.height || 675;
  const ratio = w / hgt;
  const alt = d.altText || d.caption || ctx.title || '';
  const capped = Math.min(1360, w);
  const src = imageUrl(img, capped, Math.round(capped / ratio));
  const srcset = imageSrcset(img, ratio, [480, 768, 1080, 1360].filter((x) => x <= Math.max(480, w)));
  const fig = `<img src="${attr(src)}"${srcset ? ` srcset="${attr(srcset)}" sizes="(min-width: 760px) 680px, 100vw"` : ''} width="${capped}" height="${Math.round(capped / ratio)}" alt="${attr(alt)}" loading="lazy" decoding="async">`;
  const linked = d.link?.url ? `<a href="${attr(d.link.url)}"${ext(d.link.url)}>${fig}</a>` : fig;
  return `<figure>${linked}${d.caption ? `<figcaption>${esc(d.caption)}</figcaption>` : ''}</figure>`;
}

function gallery(d = {}, ctx) {
  const items = (d.items || []).map((it) => it.image?.media?.src ? image({ image: { src: it.image.media.src, width: it.image.media.width, height: it.image.media.height }, altText: it.altText, caption: it.title }, ctx) : '').join('');
  return items ? `<div class="gallery">${items}</div>` : '';
}

function video(d = {}) {
  const url = d.video?.src?.url;
  if (!url) return '';
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
  if (yt) {
    return `<figure class="video"><iframe src="https://www.youtube-nocookie.com/embed/${attr(yt[1])}" title="${attr(d.title || 'Video')}" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe></figure>`;
  }
  return `<p><a href="${attr(url)}"${ext(url)}>Watch the video</a></p>`;
}

const align = (pd) => (pd?.textStyle?.textAlignment === 'CENTER' ? ' class="center"' : '');
const ext = (url) => (/^https?:\/\//.test(url) && !/knewspaper\.in/.test(url) ? ' rel="noopener" target="_blank"' : '');

export function plainText(n) {
  if (n.type === 'TEXT') return n.textData?.text || '';
  return (n.nodes || []).map(plainText).join('');
}

function uniqueSlug(s, used) {
  let base = s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60) || 'section';
  let slug = base;
  let i = 2;
  while (used.has(slug)) slug = `${base}-${i++}`;
  used.add(slug);
  return slug;
}
