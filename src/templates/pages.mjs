// Page templates. Each returns a full HTML document string.

import { esc, attr, formatDate } from '../render/html.mjs';
import { imageUrl } from '../data/media.mjs';
import { renderRicos } from '../render/ricos.mjs';

export function makePages(site, L, C, data) {
  const u = site.url;
  const { posts, categories } = data;

  // ---------------------------------------------------------------- home
  function home() {
    const featured = pickFeatured(posts, site.home.featuredCount);
    const used = new Set(featured.map((p) => p.id));
    const latest = posts.filter((p) => !used.has(p.id)).slice(0, site.home.latestCount);
    // Use real view counts when Wix has them; otherwise show older
    // evergreen explainers that the latest list doesn't already cover.
    const hasViews = posts.some((p) => p.views > 0);
    const shown = new Set([...used, ...latest.map((p) => p.id)]);
    const popular = hasViews
      ? [...posts].sort((a, b) => b.views - a.views).slice(0, site.home.popularCount)
      : posts.filter((p) => !shown.has(p.id)).slice(0, site.home.popularCount);
    const popularTitle = hasViews ? 'Most read' : 'Worth a read';
    const [lead, ...stack] = featured;

    const shelves = site.home.shelves
      .map((slug) => categories.find((c) => c.slug === slug))
      .filter(Boolean)
      .map((cat) => ({ cat, items: posts.filter((p) => p.categories.some((c) => c.slug === cat.slug)).slice(0, 4) }))
      .filter((s) => s.items.length);

    const body = `
<h1 class="sr-only">${esc(site.name)}: ${esc(site.tagline)}</h1>
${lead ? `<section class="wrap top" aria-labelledby="featured-title">
  <h2 id="featured-title" class="sr-only">Featured articles</h2>
  <div class="top__grid">
    ${C.storyLead(lead)}
    <div class="top__stack">${stack.map(C.storyStack).join('')}</div>
  </div>
</section>` : `<section class="wrap empty"><h2>No articles yet</h2><p>Publish a post in your Wix Blog and rebuild the site to see it here.</p></section>`}

<div class="wrap split">
  <section class="split__main" aria-labelledby="latest-title">
    <div class="section-head">
      <h2 id="latest-title" class="section-head__title">Latest</h2>
      <a class="section-head__more" href="${u('blog/')}">All articles</a>
    </div>
    <div class="rows">${latest.map((p) => C.storyRow(p)).join('')}</div>
  </section>
  <aside class="split__side" aria-label="More">
    <section class="ranked" aria-labelledby="popular-title">
      <h2 id="popular-title" class="side-title">${popularTitle}</h2>
      <ol class="ranked__list">${popular.map(C.storyRank).join('')}</ol>
    </section>
    ${C.newsletter({ id: 'nl-side' })}
  </aside>
</div>

${shelves.map(({ cat, items }) => `
<section class="wrap shelf" aria-labelledby="shelf-${attr(cat.slug)}">
  <div class="section-head">
    <h2 id="shelf-${attr(cat.slug)}" class="section-head__title"><a href="${attr(C.catUrl(cat))}">${esc(cat.label)}</a></h2>
    <a class="section-head__more" href="${attr(C.catUrl(cat))}">More in ${esc(cat.label)}</a>
  </div>
  <div class="tiles">${items.map(C.storyTile).join('')}</div>
</section>`).join('')}

<section class="wrap topics" aria-labelledby="topics-title">
  <h2 id="topics-title" class="section-head__title">Browse by topic</h2>
  <ul class="topics__list">
    ${categories.filter((c) => c.postCount > 0).map((c) => `<li><a href="${attr(C.catUrl(c))}"><span>${esc(c.label)}</span><span class="topics__count">${c.postCount} ${c.postCount === 1 ? 'article' : 'articles'}</span></a></li>`).join('')}
  </ul>
</section>

<section class="band" aria-label="About and contact">
  <div class="wrap band__grid">
    <div id="about">
      <h2 class="band__title">About ${esc(site.name)}</h2>
      <p class="band__lede">${esc(site.about.intro)}</p>
      <p>${esc(site.about.body[0])}</p>
      <p><a href="${u('about-us/')}">More about us</a> or <a href="${u('write-for-us/')}">write for us</a>.</p>
    </div>
    <div id="contact">
      <h2 class="band__title">Contact</h2>
      <p>${esc(site.contact.intro)}</p>
      <p class="band__email"><a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
      <p><a class="btn btn--quiet" href="${u('contact/')}">Send a message</a></p>
    </div>
  </div>
</section>`;

    return L.layout({
      title: '',
      description: site.description,
      path: '',
      body,
      bodyClass: 'page-home',
      jsonld: [L.orgLd, L.websiteLd],
    });
  }

  // ------------------------------------------------------------- article
  function article(p) {
    const { html, toc } = renderRicos(p.richContent, { title: p.title, coverId: p.image?.id || '' });
    const bodyHtml = html || (p.contentText ? p.contentText.split(/\n{2,}/).map((t) => `<p>${esc(t)}</p>`).join('') : `<p>${esc(p.excerpt)}</p>`);
    const cat = p.categories[0];
    const related = posts
      .filter((x) => x.id !== p.id && cat && x.categories.some((c) => c.slug === cat.slug))
      .slice(0, 4);
    const fill = related.length < 4 ? posts.filter((x) => x.id !== p.id && !related.includes(x)).slice(0, 4 - related.length) : [];
    const more = [...related, ...fill];
    const isHealth = p.categories.some((c) => /health|medical|fitness/i.test(c.slug));
    const canonical = site.canonical(`post/${p.slug}/`);
    const shareText = encodeURIComponent(p.title);
    const shareUrl = encodeURIComponent(canonical);
    const ogImage = p.image ? imageUrl(p.image, 1200, 630) : site.images.ogDefault;

    const body = `
<article class="article" itemscope itemtype="https://schema.org/BlogPosting">
  <header class="wrap article__head">
    <nav class="crumbs" aria-label="Breadcrumb"><ol>
      <li><a href="${u('')}">Home</a></li>
      ${cat ? `<li><a href="${attr(C.catUrl(cat))}">${esc(cat.label)}</a></li>` : ''}
      <li><span aria-current="page">${esc(truncate(p.title, 48))}</span></li>
    </ol></nav>
    <h1 class="article__title" itemprop="headline">${esc(p.title)}</h1>
    ${p.excerpt ? `<p class="article__dek" itemprop="description">${esc(p.excerpt)}</p>` : ''}
    <div class="article__meta">
      ${C.meta(p, { author: true })}
      <div class="share" aria-label="Share this article">
        <a href="https://wa.me/?text=${shareText}%20${shareUrl}" rel="noopener" target="_blank">WhatsApp</a>
        <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" rel="noopener" target="_blank">X</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" rel="noopener" target="_blank">Facebook</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" rel="noopener" target="_blank">LinkedIn</a>
        <button type="button" class="share__copy" data-copy="${attr(canonical)}">Copy link</button>
      </div>
    </div>
  </header>
  ${p.image ? `<figure class="wrap article__hero">${C.cover(p, { w: 1200, ratio: 16 / 9, sizes: '(min-width: 1240px) 1160px, 100vw', eager: true, widths: [480, 768, 1024, 1200, 1600, 2000] })}</figure>` : ''}
  <div class="wrap article__layout${toc.length >= 3 ? ' has-toc' : ''}">
    ${toc.length >= 3 ? `<nav class="toc" aria-labelledby="toc-title"><h2 id="toc-title" class="toc__title">In this article</h2><ol>${toc.filter((t) => t.level === 2).map((t) => `<li><a href="#${attr(t.id)}">${esc(t.text)}</a></li>`).join('')}</ol></nav>` : ''}
    <div class="prose" itemprop="articleBody">
      ${bodyHtml}
      ${isHealth ? '<aside class="note" role="note"><p>This article is for general information only and is not medical advice. Please consult a qualified doctor about your health.</p></aside>' : ''}
      ${p.categories.length ? `<p class="article__topics">Filed under ${p.categories.map((c) => `<a href="${attr(C.catUrl(c))}">${esc(c.label)}</a>`).join(', ')}</p>` : ''}
    </div>
  </div>
</article>

${more.length ? `<section class="wrap shelf shelf--related" aria-labelledby="related-title">
  <div class="section-head"><h2 id="related-title" class="section-head__title">Read next</h2></div>
  <div class="tiles">${more.map(C.storyTile).join('')}</div>
</section>` : ''}

<div class="wrap narrow">${C.newsletter({ id: 'nl-article' })}</div>`;

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: p.title.slice(0, 110),
      description: p.description,
      image: p.image ? [imageUrl(p.image, 1200, 675), imageUrl(p.image, 1200, 1200)] : [site.images.ogDefault],
      datePublished: p.published,
      dateModified: p.updated,
      mainEntityOfPage: canonical,
      articleSection: cat?.label,
      author: p.author ? { '@type': 'Person', name: p.author } : { '@type': 'Organization', name: site.name },
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: site.images.logo } },
    };
    return L.layout({
      title: p.title,
      description: p.description || p.excerpt,
      path: `post/${p.slug}/`,
      body,
      ogImage,
      ogType: 'article',
      activeCat: cat?.slug,
      head: [
        p.published ? `<meta property="article:published_time" content="${attr(p.published)}">` : '',
        p.updated ? `<meta property="article:modified_time" content="${attr(p.updated)}">` : '',
        cat ? `<meta property="article:section" content="${attr(cat.label)}">` : '',
      ].join('\n'),
      jsonld: [ld, L.breadcrumbLd([['Home', ''], ...(cat ? [[cat.label, `blog/categories/${cat.slug}/`]] : []), [p.title, `post/${p.slug}/`]])],
    });
  }

  // ------------------------------------------------------------- listing
  function listing({ items, page, pages, title, intro, basePathFor, cat }) {
    const path = basePathFor(page);
    const body = `
<section class="wrap listing">
  <header class="listing__head">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="${u('')}">Home</a></li><li><span aria-current="page">${esc(title)}</span></li></ol></nav>
    <h1 class="listing__title">${esc(title)}</h1>
    ${intro ? `<p class="listing__intro">${esc(intro)}</p>` : ''}
    ${page > 1 ? `<p class="listing__page">Page ${page} of ${pages}</p>` : ''}
  </header>
  <div class="split split--flush">
    <div class="split__main">
      ${items.length ? `<div class="rows">${items.map((p) => C.storyRow(p, { level: 'h2' })).join('')}</div>` : '<p class="empty">No articles in this topic yet.</p>'}
      ${C.pagination(page, pages, (n) => u(basePathFor(n)))}
    </div>
    <aside class="split__side" aria-label="More">
      ${C.newsletter({ id: 'nl-list' })}
    </aside>
  </div>
</section>`;
    return L.layout({
      title: page > 1 ? `${title}, page ${page}` : title,
      description: intro || `${title} on ${site.name}.`,
      path,
      body,
      activeCat: cat ? cat.slug : '__latest',
      head: [
        page > 1 ? `<link rel="prev" href="${attr(site.canonical(basePathFor(page - 1)))}">` : '',
        page < pages ? `<link rel="next" href="${attr(site.canonical(basePathFor(page + 1)))}">` : '',
      ].join(''),
      jsonld: [L.breadcrumbLd([['Home', ''], [title, basePathFor(1)]])],
    });
  }

  // -------------------------------------------------------------- search
  function search() {
    const body = `
<section class="wrap listing search-page">
  <header class="listing__head">
    <h1 class="listing__title">Search</h1>
    <form class="search search--page" role="search" action="${u('search/')}" method="get" data-search-page>
      <label class="sr-only" for="search-page-q">Search articles</label>
      <input id="search-page-q" name="q" type="search" placeholder="Try “diabetes”, “prime number” or “Diwali”" autocomplete="off" enterkeyhint="search">
      <button type="submit" class="btn">Search</button>
    </form>
  </header>
  <p class="search-page__status" role="status" aria-live="polite" data-search-status></p>
  <div class="rows" data-search-results></div>
  <noscript><p>Search needs JavaScript. You can <a href="${u('blog/')}">browse all articles</a> or a topic instead.</p></noscript>
</section>`;
    return L.layout({ title: 'Search', description: `Search ${site.name} articles.`, path: 'search/', body, noindex: true });
  }

  // -------------------------------------------------------- static pages
  function page({ path, title, description, content }) {
    const body = `<section class="wrap narrow page"><h1 class="listing__title">${esc(title)}</h1><div class="prose">${content}</div></section>`;
    return L.layout({ title, description, path, body, jsonld: [L.breadcrumbLd([['Home', ''], [title, path]])] });
  }

  const about = () =>
    page({
      path: 'about-us/',
      title: 'About us',
      description: `About ${site.name}: ${site.about.intro}`,
      content: `<p class="lede">${esc(site.about.intro)}</p>${site.about.body.map((t) => `<p>${esc(t)}</p>`).join('')}
        <h2>What we cover</h2><p>${categories.filter((c) => c.postCount > 0).map((c) => `<a href="${attr(C.catUrl(c))}">${esc(c.label)}</a>`).join(', ')}.</p>
        <h2>Get in touch</h2><p>Write to <a href="mailto:${attr(site.email)}">${esc(site.email)}</a>, or use the <a href="${u('contact/')}">contact form</a>. Want to contribute? See <a href="${u('write-for-us/')}">Write for us</a>.</p>
        <p>Thank you for reading ${esc(site.name)}.</p>`,
    });

  const writeForUs = () =>
    page({
      path: 'write-for-us/',
      title: 'Write for us',
      description: `Guest posting guidelines for ${site.name}.`,
      content: `<p class="lede">${esc(site.writeForUs.intro)}</p>
        <h2>Topics we accept</h2><p>${esc(site.writeForUs.topics)}</p>
        <h2>Guidelines</h2><ul><li>500 to 1,500 words, original and well researched.</li><li>Clear headings and short paragraphs so it reads easily on a phone.</li><li>Credit your sources and link to them.</li><li>Health articles must be accurate and remind readers to consult a doctor.</li></ul>
        <h2>How to submit</h2><p>Email your pitch or finished draft to <a href="mailto:${attr(site.email)}?subject=${encodeURIComponent('Guest post pitch')}">${esc(site.email)}</a>.</p>`,
    });

  const contact = () =>
    page({
      path: 'contact/',
      title: 'Contact us',
      description: `Contact ${site.name}.`,
      content: `<p class="lede">${esc(site.contact.intro)}</p>
        <p>Email: <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
        <form class="contact-form" data-contact novalidate>
          <div class="field-row">
            <div class="field"><label for="cf-first">First name</label><input id="cf-first" name="firstName" autocomplete="given-name" required></div>
            <div class="field"><label for="cf-last">Last name</label><input id="cf-last" name="lastName" autocomplete="family-name"></div>
          </div>
          <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" rows="6" required></textarea></div>
          <button type="submit" class="btn">Send message</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>`,
    });

  const privacy = () =>
    page({
      path: 'privacy-policy/',
      title: 'Privacy policy',
      description: `How ${site.name} collects, uses and protects your information.`,
      content: site.privacyHtml,
    });

  // ---------------------------------------------------------- auth pages
  const login = () =>
    L.layout({
      title: 'Sign in',
      description: `Sign in to ${site.name}.`,
      path: 'login/',
      noindex: true,
      body: `<section class="wrap narrow page auth" data-auth="login">
        <h1 class="listing__title">Sign in</h1>
        <p>You will be taken to the secure Wix sign-in page and brought back here afterwards.</p>
        <p><button type="button" class="btn" data-login>Continue to sign in</button></p>
        <p class="form-status" role="status" aria-live="polite" data-auth-status></p>
      </section>`,
    });

  const callback = () =>
    L.layout({
      title: 'Signing you in',
      description: '',
      path: 'callback/',
      noindex: true,
      body: `<section class="wrap narrow page auth" data-auth="callback">
        <h1 class="listing__title">Signing you in</h1>
        <p class="form-status" role="status" aria-live="polite" data-auth-status>Finishing sign-in…</p>
        <p><a href="${u('')}">Go to the homepage</a></p>
      </section>`,
    });

  const notFound = () =>
    L.layout({
      title: 'Page not found',
      description: '',
      path: '404.html',
      noindex: true,
      body: `<section class="wrap narrow page"><h1 class="listing__title">This page isn’t here</h1>
        <p>The link may be old or mistyped. Search for the article, or start from the latest stories.</p>
        <form class="search search--page" role="search" action="${u('search/')}" method="get"><label class="sr-only" for="nf-q">Search articles</label><input id="nf-q" name="q" type="search" placeholder="Search articles"><button class="btn" type="submit">Search</button></form>
        <p><a href="${u('')}">Back to the homepage</a></p></section>`,
    });

  return { home, article, listing, search, about, writeForUs, contact, privacy, login, callback, notFound };
}

function pickFeatured(posts, n) {
  const flagged = posts.filter((p) => p.featured);
  const out = flagged.slice(0, n);
  for (const p of posts) {
    if (out.length >= n) break;
    if (!out.includes(p)) out.push(p);
  }
  // Prefer a lead story that has an image.
  const leadIdx = out.findIndex((p) => p.image);
  if (leadIdx > 0) out.unshift(...out.splice(leadIdx, 1));
  return out;
}

const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
