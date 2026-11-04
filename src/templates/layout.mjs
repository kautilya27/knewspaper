// Page shell: <head> (SEO, social, performance hints), masthead, footer.

import { esc, attr, jsonLd } from '../render/html.mjs';

export function makeLayout(site, { categories, assetVersion }) {
  const u = site.url;
  const abs = site.abs;

  const navCats = categories.filter((c) => c.postCount > 0);

  function layout({ title, description, path, body, ogImage, ogType = 'website', jsonld = [], activeCat = '', noindex = false, head = '', bodyClass = '' }) {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
    const canonical = site.canonical(path);
    const robots = !site.allowIndexing || noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
    const img = ogImage || site.images.ogDefault;
    const desc = description || site.description;

    return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${attr(canonical)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#1F3864">
<meta property="og:site_name" content="${attr(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${attr(title || fullTitle)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:image" content="${attr(img)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title || fullTitle)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${attr(img)}">
${site.adsenseAccount ? `<meta name="google-adsense-account" content="${attr(site.adsenseAccount)}">` : ''}
<link rel="icon" href="${u('assets/favicon.svg')}" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="${attr(site.name)}" href="${u('feed.xml')}">
<link rel="preconnect" href="https://static.wixstatic.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&display=swap">
<link rel="stylesheet" href="${u('assets/styles.css')}?v=${assetVersion}">
${head}
<script>window.KNEWS=${JSON.stringify(site.clientConfig).replace(/</g, '\\u003c')};</script>
<script type="module" src="${u('assets/app.js')}?v=${assetVersion}"></script>
${jsonld.map(jsonLd).join('\n')}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
${masthead(activeCat)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>`;
  }

  function masthead(activeCat) {
    const cur = (slug) => (slug === activeCat ? ' aria-current="page"' : '');
    return `<header class="masthead">
  <div class="wrap masthead__bar">
    <a class="brand" href="${u('')}" aria-label="${attr(site.name)} home">
      <img src="${attr(site.images.logo)}" width="${site.images.logoWidth}" height="${site.images.logoHeight}" alt="${attr(site.name)}" fetchpriority="high">
    </a>
    <form class="search" role="search" action="${u('search/')}" method="get">
      <label class="sr-only" for="site-search">Search articles</label>
      <input id="site-search" name="q" type="search" placeholder="Search articles" autocomplete="off" enterkeyhint="search">
      <button type="submit" class="search__btn" aria-label="Search">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      </button>
    </form>
    <nav class="utility" aria-label="Site">
      <a href="${u('about-us/')}">About</a>
      <a href="${u('write-for-us/')}">Write for us</a>
      <a href="${u('contact/')}">Contact</a>
      <a class="account" href="${u('login/')}" data-account>Sign in</a>
    </nav>
  </div>
  <nav class="catnav" aria-label="Categories">
    <div class="wrap catnav__inner">
      <ul class="catnav__list">
        <li><a href="${u('blog/')}"${cur('__latest')}>Latest</a></li>
        ${navCats.map((c) => `<li><a href="${u(`blog/categories/${c.slug}/`)}"${cur(c.slug)}>${esc(c.label)}</a></li>`).join('')}
      </ul>
    </div>
  </nav>
</header>`;
  }

  function footer() {
    return `<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <img src="${attr(site.images.logo)}" width="${site.images.logoWidth}" height="${site.images.logoHeight}" alt="${attr(site.name)}" loading="lazy">
      <p>${esc(site.about.intro)}</p>
      <p><a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
    </div>
    <nav aria-label="Topics" class="footer__topics">
      <h2 class="footer__heading">Topics</h2>
      <ul>${navCats.map((c) => `<li><a href="${u(`blog/categories/${c.slug}/`)}">${esc(c.label)}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-label="About ${attr(site.name)}">
      <h2 class="footer__heading">${esc(site.name)}</h2>
      <ul>
        <li><a href="${u('about-us/')}">About us</a></li>
        <li><a href="${u('write-for-us/')}">Write for us</a></li>
        <li><a href="${u('contact/')}">Contact us</a></li>
        <li><a href="${u('privacy-policy/')}">Privacy policy</a></li>
        <li><a href="${u('feed.xml')}">RSS feed</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap footer__legal"><p>© ${site.copyrightYear} by ${esc(site.legalName)}.</p></div>
</footer>`;
  }

  // JSON-LD shared by all pages.
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: site.name,
    url: site.canonical(''),
    logo: site.images.logo,
    email: site.email,
  };
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.canonical(''),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.canonical('search/')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  const breadcrumbLd = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.canonical(path) })),
  });

  return { layout, orgLd, websiteLd, breadcrumbLd, abs };
}
