// Knewspaper client script. Small and dependency-free: the Wix SDK module
// (./wix.js) is only downloaded when a visitor signs in or submits a form.

const CFG = window.KNEWS || {};
const BASE = CFG.basePath || '/';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const loadWix = () => import('./wix.js');
const hasTokens = () => {
  try { return Boolean(localStorage.getItem('knews.wix.tokens')); } catch { return false; }
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ------------------------------------------------------------ category rail
const rail = $('.catnav__list');
if (rail) {
  const current = $('[aria-current="page"]', rail);
  if (current) current.scrollIntoView({ block: 'nearest', inline: 'center' });
  const edge = () => {
    rail.parentElement.classList.toggle('is-start', rail.scrollLeft < 8);
    rail.parentElement.classList.toggle('is-end', rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8);
  };
  rail.addEventListener('scroll', edge, { passive: true });
  edge();
}

// --------------------------------------------------------------- copy link
$$('[data-copy]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = 'Link copied';
    } catch {
      btn.textContent = 'Copy failed';
    }
    setTimeout(() => (btn.textContent = 'Copy link'), 2500);
  }),
);

// ------------------------------------------------------------------ search
const results = $('[data-search-results]');
if (results) {
  const status = $('[data-search-status]');
  const input = $('#search-page-q');
  const q = new URLSearchParams(location.search).get('q') || '';
  input.value = q;
  const headerInput = $('#site-search');
  if (headerInput) headerInput.value = q;
  if (!q.trim()) {
    status.textContent = 'Type a word or topic to search every article.';
    input.focus();
  } else {
    status.textContent = 'Searching…';
    fetch(`${BASE}search-index.json`)
      .then((r) => r.json())
      .then((index) => renderResults(index, q))
      .catch(() => (status.textContent = 'Search is unavailable right now. Browse a topic from the menu instead.'));
  }

  function renderResults(index, query) {
    const terms = normalise(query).split(' ').filter(Boolean);
    const scored = index
      .map((p) => {
        const t = normalise(p.t), e = normalise(p.e), c = normalise(p.c);
        let score = 0;
        for (const term of terms) {
          if (t.includes(term)) score += t.startsWith(term) || t.includes(' ' + term) ? 6 : 4;
          else if (c.includes(term)) score += 3;
          else if (e.includes(term)) score += 2;
          else return null; // every term must match somewhere
        }
        return { p, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || (b.p.d || '').localeCompare(a.p.d || ''))
      .slice(0, 50);

    status.textContent = scored.length
      ? `${scored.length} ${scored.length === 1 ? 'article' : 'articles'} for “${query}”`
      : `No articles match “${query}”. Try a shorter or different word.`;
    results.innerHTML = scored.map(({ p }) => row(p)).join('');
  }

  function row(p) {
    const date = p.d ? new Date(p.d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
    return `<article class="story story--row">
      <div class="story__body">
        ${p.c ? `<span class="kicker">${esc(p.c.split(',')[0])}</span>` : ''}
        <h2 class="story__title"><a href="${BASE}post/${encodeURIComponent(p.s)}/">${esc(p.t)}</a></h2>
        <p class="story__dek">${esc(p.e)}</p>
        <p class="meta">${date ? `<time datetime="${esc(p.d)}">${date}</time>` : ''}${p.m ? `<span>${p.m} min read</span>` : ''}</p>
      </div>
      <div class="story__media">${p.i ? `<img class="cover" src="${esc(p.i)}" width="280" height="187" alt="" loading="lazy" decoding="async">` : `<img class="cover cover--placeholder" src="${BASE}assets/placeholder.svg" width="280" height="187" alt="" loading="lazy">`}</div>
    </article>`;
  }
}

function normalise(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// -------------------------------------------------------------- newsletter
$$('[data-newsletter]').forEach((form) =>
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = $('.form-status', form);
    const input = form.elements.email;
    const email = input.value.trim();
    if (!EMAIL_RE.test(email)) {
      setStatus(status, 'Enter a valid email address, like name@example.com.', 'error');
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    if (!CFG.newsletterFormId) {
      setStatus(status, `Newsletter sign-up opens soon. Until then, email ${CFG.email} with “Subscribe” and we’ll add you.`, 'info');
      return;
    }
    const button = $('button', form);
    button.disabled = true;
    setStatus(status, 'Subscribing…');
    try {
      const { submitForm } = await loadWix();
      await submitForm(CFG.newsletterFormId, { [CFG.newsletterFields?.email || 'email']: email });
      form.reset();
      setStatus(status, 'Subscribed. Watch your inbox for the next edition.', 'ok');
    } catch (err) {
      console.error('[knews] newsletter', err);
      setStatus(status, `We couldn’t subscribe you just now. Try again, or email ${CFG.email}.`, 'error');
    } finally {
      button.disabled = false;
    }
  }),
);

// ----------------------------------------------------------------- contact
const contact = $('[data-contact]');
if (contact) {
  contact.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = $('.form-status', contact);
    const f = contact.elements;
    const values = {
      firstName: f.firstName.value.trim(),
      lastName: f.lastName.value.trim(),
      email: f.email.value.trim(),
      message: f.message.value.trim(),
    };
    const missing = [];
    if (!values.firstName) missing.push(f.firstName);
    if (!EMAIL_RE.test(values.email)) missing.push(f.email);
    if (!values.message) missing.push(f.message);
    [f.firstName, f.email, f.message].forEach((el) => el.toggleAttribute('aria-invalid', missing.includes(el)));
    if (missing.length) {
      setStatus(status, 'Fill in your first name, a valid email and your message.', 'error');
      missing[0].focus();
      return;
    }
    if (!CFG.contactFormId) {
      const body = `${values.message}\n\n${values.firstName} ${values.lastName}\n${values.email}`;
      location.href = `mailto:${CFG.email}?subject=${encodeURIComponent('Message from knewspaper reader')}&body=${encodeURIComponent(body)}`;
      setStatus(status, 'Your email app should open with the message ready to send.', 'info');
      return;
    }
    const button = $('button[type="submit"]', contact);
    button.disabled = true;
    setStatus(status, 'Sending…');
    try {
      const { submitForm } = await loadWix();
      const keys = CFG.contactFields || {};
      await submitForm(CFG.contactFormId, Object.fromEntries(Object.entries(values).map(([k, v]) => [keys[k] || k, v])));
      contact.reset();
      setStatus(status, 'Message sent. Thanks for writing to us; we’ll reply soon.', 'ok');
    } catch (err) {
      console.error('[knews] contact', err);
      setStatus(status, `Your message didn’t send. Try again, or email ${CFG.email}.`, 'error');
    } finally {
      button.disabled = false;
    }
  });
}

function setStatus(el, text, kind = '') {
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

// --------------------------------------------------------- member sign-in
const account = $('[data-account]');
if (account) {
  account.addEventListener('click', async (ev) => {
    ev.preventDefault();
    try {
      const wix = await loadWix();
      if (wix.isLoggedIn()) await wix.logout();
      else await wix.login(location.href);
    } catch (err) {
      console.error('[knews] auth', err);
      location.href = account.href;
    }
  });
  if (hasTokens()) {
    loadWix()
      .then(async (wix) => {
        if (!wix.isLoggedIn()) return;
        account.textContent = 'Sign out';
        const m = await wix.currentMember().catch(() => null);
        if (m?.name) account.setAttribute('aria-label', `Signed in as ${m.name}. Sign out`), (account.title = `Signed in as ${m.name}`);
      })
      .catch(() => {});
  }
}

const authPage = $('[data-auth]');
if (authPage) {
  const status = $('[data-auth-status]');
  if (authPage.dataset.auth === 'login') {
    const params = new URLSearchParams(location.search);
    const ref = document.referrer && new URL(document.referrer).origin === location.origin ? document.referrer : '';
    const returnTo = params.get('returnTo') || ref || location.origin + BASE;
    const start = async () => {
      setStatus(status, 'Opening secure sign-in…');
      try {
        const { login } = await loadWix();
        await login(returnTo);
      } catch (err) {
        console.error('[knews] login', err);
        setStatus(status, 'Sign-in could not start. Check your connection and try again.', 'error');
      }
    };
    $('[data-login]').addEventListener('click', start);
    if (!params.has('manual')) start();
  } else {
    loadWix()
      .then((wix) => wix.completeLogin())
      .then((dest) => {
        setStatus(status, 'Signed in. Taking you back…', 'ok');
        location.replace(dest);
      })
      .catch((err) => {
        console.error('[knews] callback', err);
        setStatus(status, `Sign-in didn’t finish: ${err.message}`, 'error');
      });
  }
}
