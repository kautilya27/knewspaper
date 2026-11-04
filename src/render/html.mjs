// Small HTML helpers used by every template.

const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => MAP[c]);
export const attr = esc;

const DATE_FMT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
export const formatDate = (iso) => (iso ? DATE_FMT.format(new Date(iso)) : '');

/** Join non-empty HTML fragments. */
export const join = (...parts) => parts.flat().filter(Boolean).join('');

/** Safe JSON for <script type="application/ld+json">. */
export const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
