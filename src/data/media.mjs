// Wix media helpers: turn whatever image shape the Wix APIs return into a
// static.wixstatic.com URL that is resized and served as AVIF/WebP on the fly.

const WIX_STATIC = 'https://static.wixstatic.com/media/';

/**
 * Accepts any of:
 *  - "wix:image://v1/<id>/<file>#originWidth=1200&originHeight=800"
 *  - { id, url, width, height }   (newer SDK shape)
 *  - "https://static.wixstatic.com/media/<id>/v1/..."
 *  - any other absolute URL (returned as-is, not resizable)
 * Returns { id, src, width, height } or null.
 */
export function parseImage(input) {
  if (!input) return null;
  if (typeof input === 'object') {
    const width = Number(input.width) || undefined;
    const height = Number(input.height) || undefined;
    if (input.id) return { id: stripId(input.id), width, height };
    if (input.url) return { ...parseImage(input.url), width, height };
    if (input.src) return parseImage(input.src);
    return null;
  }
  const s = String(input);
  if (s.startsWith('wix:image://')) {
    const m = s.match(/^wix:image:\/\/v1\/([^/#]+)/);
    const w = s.match(/originWidth=(\d+)/);
    const h = s.match(/originHeight=(\d+)/);
    return m ? { id: m[1], width: w ? +w[1] : undefined, height: h ? +h[1] : undefined } : null;
  }
  if (s.startsWith(WIX_STATIC)) {
    return { id: s.slice(WIX_STATIC.length).split('/')[0] };
  }
  if (/^[a-z0-9]+_[a-z0-9]+~mv2\.[a-z]+$/i.test(s)) return { id: s };
  if (/^https?:\/\//.test(s)) return { src: s };
  return null;
}

const stripId = (id) => String(id).replace(/^wix:image:\/\/v1\//, '').split('/')[0];

/** Resized Wix image URL (crop-to-fill). Falls back to the raw src. */
export function imageUrl(img, w, h) {
  if (!img) return '';
  if (img.src && !img.id) return img.src;
  const id = img.id;
  return `${WIX_STATIC}${id}/v1/fill/w_${w},h_${h},al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/${id}`;
}

/** srcset for a fixed aspect ratio across several widths. */
export function imageSrcset(img, ratio, widths) {
  if (!img || !img.id) return '';
  return widths.map((w) => `${imageUrl(img, w, Math.round(w / ratio))} ${w}w`).join(', ');
}
