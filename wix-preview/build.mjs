// Writes the Wix-hosted preview pages into ./out. Every page is a root .html
// file (Wix static hosting serves files, not folders). Articles, topics and
// search results are read live in the browser from the Wix blog layer
// (/js/wix/*, installed on the site by Wix); only the site's own copy
// (About, Contact, Write for us, Privacy) is written into the pages.
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const OUT = fileURLToPath(new URL('./site', import.meta.url));

const LOGO = 'https://static.wixstatic.com/media/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png/v1/fit/w_520,h_80,q_90,enc_avif,quality_auto/a6d18f_52e30208d4a84944b1729aac5f215b57~mv2.png';
const EMAIL = 'knewspaper.in@gmail.com';
const ABOUT = 'Knewspaper is where news meets curiosity. We publish clear explainers, thoughtful articles and engaging stories on technology, health, education, culture, lifestyle and more.';
const ABOUT2 = 'Our writers, editors and contributors aim to bring fresh perspectives, timely updates and useful analysis to curious readers, trendsetters and lifelong learners.';
const CONTACT = 'Have a question, feedback, a suggestion or a collaboration idea? Send us a message, or just say hello.';

const head = ({ title, description, script, noindex = false }) => `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
${noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}<meta name="theme-color" content="#1F3864">
<meta property="og:site_name" content="Knewspaper">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="https://static.wixstatic.com/media/c0f544_c52d997f6e0b45f18a01b37d48a63a2f~mv2.png/v1/fill/w_1200,h_630,al_c/c0f544_c52d997f6e0b45f18a01b37d48a63a2f~mv2.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://www.wixapis.com" crossorigin>
<link rel="preconnect" href="https://static.wixstatic.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&display=swap">
<link rel="stylesheet" href="/assets/styles.css">
<script type="module" src="/assets/${script || 'site'}.js"></script>
</head>`;

const masthead = `<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="wrap masthead__bar">
    <a class="brand" href="/" aria-label="Knewspaper home"><img src="${LOGO}" width="251" height="38" alt="Knewspaper" fetchpriority="high"></a>
    <form class="search" role="search" action="/search.html" method="get">
      <label class="sr-only" for="site-search">Search articles</label>
      <input id="site-search" name="q" type="search" placeholder="Search articles" autocomplete="off" enterkeyhint="search">
      <button type="submit" class="search__btn" aria-label="Search"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
    </form>
    <nav class="utility" aria-label="Site">
      <a href="/about.html">About</a>
      <a href="/write-for-us.html">Write for us</a>
      <a href="/contact.html" class="account">Contact</a>
    </nav>
  </div>
  <nav class="catnav" aria-label="Topics">
    <div class="wrap catnav__inner">
      <ul class="catnav__list" data-catnav><li><a href="/blog.html">Latest</a></li></ul>
    </div>
  </nav>
</header>`;

const footer = `<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__brand">
      <img src="${LOGO}" width="251" height="38" alt="Knewspaper" loading="lazy">
      <p>${ABOUT}</p>
      <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </div>
    <nav aria-label="Topics" class="footer__topics"><h2 class="footer__heading">Topics</h2><ul data-footer-topics></ul></nav>
    <nav aria-label="About Knewspaper">
      <h2 class="footer__heading">Knewspaper</h2>
      <ul>
        <li><a href="/about.html">About us</a></li>
        <li><a href="/write-for-us.html">Write for us</a></li>
        <li><a href="/contact.html">Contact us</a></li>
        <li><a href="/privacy-policy.html">Privacy policy</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap footer__legal"><p>© 2026 by KNEWSPAPER.</p></div>
</footer>`;

const newsletter = (id) => `<section class="newsletter" aria-labelledby="${id}-title">
  <h2 id="${id}-title" class="newsletter__title">Get the day’s best reads</h2>
  <p class="newsletter__text">One short email with new explainers from Knewspaper. No spam, unsubscribe any time.</p>
  <form class="newsletter__form" data-newsletter novalidate>
    <label for="${id}-email" class="sr-only">Email address</label>
    <input id="${id}-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com">
    <button type="submit" class="btn">Subscribe</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>
</section>`;

const page = (o, body, bodyAttrs = '') => `${head(o)}
<body${bodyAttrs}>
${masthead}
<main id="main" tabindex="-1">
${body}
</main>
${footer}
</body>
</html>
`;

const staticPage = (title, description, content) =>
  page({ title: `${title} | Knewspaper`, description }, `<section class="wrap narrow page"><h1 class="listing__title">${title}</h1><div class="prose">${content}</div></section>`);

const files = {};

files['index.html'] = page(
  { title: 'Knewspaper | Stay informed with latest updates', description: 'Discover the latest trends, articles and updates on Knewspaper. Clear news and explainers on health, education, technology, careers, festivals and more.', script: 'home' },
  `<section class="wrap intro">
  <h1 class="intro__title">Knewspaper: news and explainers, made clear</h1>
  <p class="intro__sub">Read what’s new in health, education, careers, technology, festivals and more</p>
</section>
<section class="wrap top" aria-label="Featured articles" data-top><p class="feed-status skeleton">Loading the latest articles…</p></section>
<div class="wrap split">
  <section class="split__main" aria-labelledby="latest-title">
    <div class="section-head"><h2 id="latest-title" class="section-head__title">Latest</h2><a class="section-head__more" href="/blog.html">All articles</a></div>
    <div class="rows" data-latest></div>
  </section>
  <aside class="split__side" aria-label="More">
    <section class="ranked" aria-labelledby="more-title" data-more-section>
      <h2 id="more-title" class="side-title">More stories</h2>
      <ol class="ranked__list" data-more></ol>
    </section>
    ${newsletter('nl-side')}
  </aside>
</div>
<div data-shelves></div>
<section class="wrap topics" aria-labelledby="topics-title" data-topics-section>
  <h2 id="topics-title" class="section-head__title">Browse by topic</h2>
  <ul class="topics__list" data-topics></ul>
</section>
<section class="band" aria-label="About and contact">
  <div class="wrap band__grid">
    <div id="about">
      <h2 class="band__title">About Knewspaper</h2>
      <p class="band__lede">${ABOUT}</p>
      <p>${ABOUT2}</p>
      <p><a href="/about.html">More about us</a> or <a href="/write-for-us.html">write for us</a>.</p>
    </div>
    <div id="contact">
      <h2 class="band__title">Contact</h2>
      <p>${CONTACT}</p>
      <p class="band__email"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
      <p><a class="btn btn--quiet" href="/contact.html">Send a message</a></p>
    </div>
  </div>
</section>`,
  ' class="page-home"',
);

const feedBody = (crumb) => `<section class="wrap listing">
  <header class="listing__head">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><span aria-current="page" data-crumb>${crumb}</span></li></ol></nav>
    <h1 class="listing__title" data-title>${crumb}</h1>
    <p class="listing__intro" data-intro>${crumb === 'Latest articles' ? 'Everything new on Knewspaper, newest first.' : ''}</p>
  </header>
  <div class="split split--flush">
    <div class="split__main">
      <p class="feed-status" role="status" aria-live="polite" data-status>Loading articles…</p>
      <div class="rows" data-rows></div>
      <button type="button" class="btn btn--quiet load-more" data-load-more hidden>Show more articles</button>
    </div>
    <aside class="split__side" aria-label="More">${newsletter('nl-list')}</aside>
  </div>
</section>`;

files['blog.html'] = (page({ title: 'Latest articles | Knewspaper', description: 'Every article on Knewspaper, newest first.', script: 'feed' }, feedBody('Latest articles'), ' data-page="blog" data-active-cat="__latest"')).replace('<li><a href="/blog.html">Latest</a>', '<li><a href="/blog.html" aria-current="page">Latest</a>');
files['category.html'] = page({ title: 'Topic | Knewspaper', description: 'Articles and explainers from Knewspaper.', script: 'feed' }, feedBody('Topic'), ' data-page="category"');

files['post.html'] = page(
  { title: 'Article | Knewspaper', description: 'Read this article on Knewspaper.', script: 'post' },
  `<article class="article" data-article><div class="wrap article__head"><p class="feed-status skeleton" role="status" aria-live="polite" data-status>Loading article…</p></div></article>
<div class="wrap narrow">${newsletter('nl-article')}</div>`,
);

files['search.html'] = page(
  { title: 'Search | Knewspaper', description: 'Search Knewspaper articles.', script: 'search', noindex: true },
  `<section class="wrap listing search-page">
  <header class="listing__head">
    <h1 class="listing__title">Search</h1>
    <form class="search search--page" role="search" action="/search.html" method="get">
      <label class="sr-only" for="search-page-q">Search articles</label>
      <input id="search-page-q" name="q" type="search" placeholder="Try “diabetes”, “prime number” or “Diwali”" autocomplete="off" enterkeyhint="search">
      <button type="submit" class="btn">Search</button>
    </form>
  </header>
  <p class="feed-status" role="status" aria-live="polite" data-status></p>
  <div class="rows" data-rows></div>
</section>`,
);

files['about.html'] = staticPage('About us', `About Knewspaper. ${ABOUT}`,
  `<p class="lede">${ABOUT}</p><p>${ABOUT2}</p><p>Health and medical articles are for general information. Always consult a doctor for medical advice.</p>
  <h2>Get in touch</h2><p>Write to <a href="mailto:${EMAIL}">${EMAIL}</a>, or use the <a href="/contact.html">contact page</a>. Want to contribute? See <a href="/write-for-us.html">Write for us</a>.</p>
  <p>Thank you for reading Knewspaper.</p>`);

files['write-for-us.html'] = staticPage('Write for us', 'Guest posting guidelines for Knewspaper.',
  `<p class="lede">We welcome guest writers. Send a pitch or a finished article of 500 to 1,500 words, well researched, formatted for easy reading and with sources credited.</p>
  <h2>Topics we accept</h2><p>Sports, education, fashion, food, health and fitness, entertainment, technology, travel, marketing, gaming, anime, and ideas beyond these.</p>
  <h2>Guidelines</h2><ul><li>500 to 1,500 words, original and well researched.</li><li>Clear headings and short paragraphs so it reads easily on a phone.</li><li>Credit your sources and link to them.</li><li>Health articles must be accurate and remind readers to consult a doctor.</li></ul>
  <h2>How to submit</h2><p>Email your pitch or finished draft to <a href="mailto:${EMAIL}?subject=Guest%20post%20pitch">${EMAIL}</a>.</p>`);

files['contact.html'] = staticPage('Contact us', 'Contact Knewspaper.',
  `<p class="lede">${CONTACT}</p><p>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  <form class="contact-form" data-contact novalidate>
    <div class="field-row">
      <div class="field"><label for="cf-first">First name</label><input id="cf-first" name="firstName" autocomplete="given-name" required></div>
      <div class="field"><label for="cf-last">Last name</label><input id="cf-last" name="lastName" autocomplete="family-name"></div>
    </div>
    <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" rows="6" required></textarea></div>
    <button type="submit" class="btn">Send message</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`);

const { privacyHtml } = await import('../src/templates/privacy.mjs');
files['privacy-policy.html'] = staticPage('Privacy policy', 'How Knewspaper collects, uses and protects your information.',
  privacyHtml({ name: 'Knewspaper', email: EMAIL, basePath: '/' }).replace('href="/contact/"', 'href="/contact.html"'));

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT + '/assets', { recursive: true });
for (const [name, html] of Object.entries(files)) await writeFile(`${OUT}/${name}`, html);
await cp(new URL('./src/assets', import.meta.url), OUT + '/assets', { recursive: true });
// Upload output is minified after this step (see README).
console.log('wrote', Object.keys(files).length, 'pages');
