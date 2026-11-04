// ---------------------------------------------------------------------------
// Knewspaper site configuration
// Everything brand-, content- and image-related lives here so it is easy to
// change without touching templates. Values can be overridden with env vars.
// ---------------------------------------------------------------------------

const env = process.env;

// Normalise a base path to "/", "/knewspaper/", etc.
const normaliseBase = (p = '/') => {
  let b = p.trim() || '/';
  if (!b.startsWith('/')) b = '/' + b;
  if (!b.endsWith('/')) b += '/';
  return b;
};

const basePath = normaliseBase(env.BASE_PATH || '/');
// Public origin the site is served from, without trailing slash.
const siteOrigin = (env.SITE_ORIGIN || 'http://localhost:5173').replace(/\/+$/, '');

export default {
  // --- Brand ------------------------------------------------------------
  name: 'Knewspaper',
  legalName: 'KNEWSPAPER',
  tagline: 'Stay informed with latest updates',
  description:
    'Discover the latest trends, articles and updates on Knewspaper. Timely, trusted information across health, education, technology, careers, festivals and more.',
  lang: 'en-IN',
  locale: 'en_IN',
  email: 'knewspaper.in@gmail.com',
  copyrightYear: new Date().getFullYear(),

  // --- Deployment -------------------------------------------------------
  siteOrigin, // e.g. https://yourname.github.io
  basePath, // e.g. /knewspaper/
  siteUrl: siteOrigin + basePath, // full public URL of the homepage
  // The canonical URL for each page. Keep it pointing at the domain Google
  // should index. Defaults to the deployed site URL.
  canonicalBase: (env.CANONICAL_BASE || siteOrigin + basePath).replace(/\/?$/, '/'),
  // Search engines are told not to index preview hosts (e.g. *.github.io)
  // unless ALLOW_INDEXING=true, so the copy never competes with
  // www.knewspaper.in while the old Wix site is still live.
  allowIndexing:
    env.ALLOW_INDEXING === 'true' ||
    (env.ALLOW_INDEXING !== 'false' && !/github\.io|localhost|127\.0\.0\.1/.test(siteOrigin)),

  // --- Wix Headless -----------------------------------------------------
  // The OAuth Client ID is a PUBLIC identifier (no secret). Never put API
  // keys or client secrets in this file or anywhere in the frontend.
  wix: {
    clientId: env.WIX_CLIENT_ID || 'bec8c3a5-50c2-499e-b67a-47b6302bf52b',
    // Optional Wix Forms used by the newsletter and contact sections.
    // Create the forms in your Wix dashboard and paste their IDs here (or
    // set the env vars). Field keys must match the form's field keys.
    newsletterFormId: env.WIX_NEWSLETTER_FORM_ID || '',
    newsletterFields: { email: 'email' },
    contactFormId: env.WIX_CONTACT_FORM_ID || '',
    contactFields: {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      message: 'message',
    },
  },

  // --- Images (swap any URL here) -----------------------------------------
  images: {
    // Current logo from the Wix site.
    logo: 'https://static.wixstatic.com/media/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png/v1/fit/w_520,h_80,q_90,enc_avif,quality_auto/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png',
    logoWidth: 251,
    logoHeight: 38,
    // Default social share image (from the current site's Open Graph tag).
    ogDefault:
      'https://static.wixstatic.com/media/c0f544_c52d997f6e0b45f18a01b37d48a63a2f~mv2.png/v1/fill/w_1200,h_630,al_c/c0f544_c52d997f6e0b45f18a01b37d48a63a2f~mv2.png',
    // Shown only when a post has no cover image. Relative to the site root.
    placeholder: 'assets/placeholder.svg',
  },

  // --- Homepage -----------------------------------------------------------
  home: {
    featuredCount: 4, // lead + 3
    latestCount: 10,
    popularCount: 5,
    // Category shelves shown on the homepage (Wix category slugs).
    shelves: ['health-fitness', 'education', 'career', 'festival'],
  },
  postsPerPage: 24,

  // Used before Wix returns categories, and as nav order. Slugs match the
  // existing Wix site so old URLs keep working.
  categories: [
    { label: 'Sports', slug: 'sports' },
    { label: 'Education', slug: 'education' },
    { label: 'Fashion', slug: 'fashion' },
    { label: 'Food', slug: 'food' },
    { label: 'Health & Fitness', slug: 'health-fitness' },
    { label: 'Entertainment', slug: 'entertainment' },
    { label: 'Technology', slug: 'technology' },
    { label: 'Travel', slug: 'travel' },
    { label: 'Marketing', slug: 'marketing' },
    { label: 'Sociology & Society', slug: 'sociology-and-society' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'History', slug: 'history' },
    { label: 'Finance', slug: 'finance' },
    { label: 'Science', slug: 'science' },
    { label: 'Anime', slug: 'anime' },
    { label: 'Relationships', slug: 'relationships' },
    { label: 'Business', slug: 'business' },
    { label: 'Festival', slug: 'fesrival' },
    { label: 'Career', slug: 'career' },
    { label: 'Devotional', slug: 'devotional' },
    { label: 'Real Estate', slug: 'real-estate' },
  ],

  // --- Static copy (from the current About / Contact / Write for us pages) --
  about: {
    intro:
      'Knewspaper is where news meets curiosity. We publish clear explainers, thoughtful articles and engaging stories on technology, health, education, culture, lifestyle and more.',
    body: [
      'Our writers, editors and contributors aim to bring fresh perspectives, timely updates and useful analysis to curious readers, trendsetters and lifelong learners.',
      'Health and medical articles are for general information. Always consult a doctor for medical advice.',
    ],
  },
  contact: {
    intro:
      'Have a question, feedback, a suggestion or a collaboration idea? Send us a message, or just say hello.',
    thanks: 'Thanks for writing to us. We will get back to you soon.',
  },
  writeForUs: {
    intro:
      'We welcome guest writers. Send a pitch or a finished article of 500 to 1,500 words, well researched, formatted for easy reading and with sources credited.',
    topics:
      'Sports, education, fashion, food, health and fitness, entertainment, technology, travel, marketing, gaming, anime, and ideas beyond these.',
  },
};
