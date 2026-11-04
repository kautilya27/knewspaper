# Knewspaper frontend

A fast, static, SEO-friendly news frontend for **Knewspaper**, built on your
Wix Headless site. Articles, categories and images come from your **Wix Blog**
through the **Wix JavaScript SDK** (`@wix/sdk` + `@wix/blog`).

- **Live site:** https://kautilya27.github.io/knewspaper/
- **Wix site:** Knewspaper (`fc7a03c1-28fe-4510-90ba-025a62b06835`)
- **Wix OAuth client:** "Knewspaper Headless Frontend", Client ID `bec8c3a5-50c2-499e-b67a-47b6302bf52b`

## How it works

```
Wix Blog ──(@wix/sdk, visitor token, build time)──▶ scripts/build.mjs ──▶ dist/ (plain HTML) ──▶ GitHub Pages
                                                                              │
Browser ──(lazy-loaded @wix/sdk)──▶ member sign-in, Wix Forms (newsletter / contact)
```

- Every article, category and listing page is **pre-rendered HTML**: no
  JavaScript needed to read, so pages load fast and are easy for Google to index.
- URLs match the old Wix site (`/post/<slug>/`, `/blog/categories/<slug>/`,
  `/blog/page/2/`), so links keep working when you move your domain.
- GitHub Actions rebuilds the site **every hour** (and on every push), so new
  Wix posts appear automatically. You can also run it by hand from the
  Actions tab ("Run workflow").
- Generated extras: `sitemap.xml`, `robots.txt`, `feed.xml` (RSS),
  `search-index.json` (instant client-side search), JSON-LD structured data,
  Open Graph and Twitter cards.

### No secrets in the frontend

Wix Headless sites authenticate with **OAuthStrategy using only the Client ID**,
which is a public identifier (Wix's docs say it is safe to embed in frontend
code). The SDK mints an anonymous visitor token from it. There is **no API key
and no client secret** anywhere in this project, and none is needed. Never add
one: everything in this repo is published.

Member sign-in tokens are stored in the visitor's browser (`localStorage`),
as in Wix's own client-side login guide. Wix recommends refreshing tokens on a
server for the highest security; this static site has no server, which is the
normal trade-off for a static frontend.

## Project layout

| Path | What it is |
|---|---|
| `site.config.mjs` | **Edit this first.** Brand name, tagline, logo and image URLs, email, homepage sections, categories, About / Contact copy, Wix form IDs. |
| `src/data/wix.mjs` | Reads posts and categories from Wix with the SDK at build time. |
| `src/data/media.mjs` | Turns Wix image IDs into resized `static.wixstatic.com` URLs (AVIF/WebP). |
| `src/render/ricos.mjs` | Renders Wix rich content (Ricos) to clean HTML. |
| `src/templates/*.mjs` | Page templates (home, article, listings, search, about, contact, login). |
| `src/assets/styles.css` | All styles. Colours and fonts are tokens at the top. |
| `src/client/app.js` | Small browser script: search, newsletter, contact, sign-in button. |
| `src/client/wix.js` | Browser Wix SDK module (sign-in, forms), loaded only when needed. |
| `scripts/build.mjs` | The site generator. Output goes to `dist/`. |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages, hourly and on push. |

### Changing images

All site-wide images are URLs in `site.config.mjs` under `images`:
`logo`, `ogDefault` (social share image) and `placeholder` (shown only when a
post has no cover image). Article images come from each Wix post's cover image,
so change them in the Wix Blog editor.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm install
cp .env.example .env        # optional; defaults already point at your Wix site
npm run dev                 # builds from Wix and serves http://localhost:5173/
```

- `npm run dev -- --fixtures` uses built-in sample content (no network), for
  quick design work.
- `npm run build` builds once into `dist/`; `npm run preview` serves it.
- To preview with the GitHub Pages path, run
  `BASE_PATH=/knewspaper/ npm run build && BASE_PATH=/knewspaper/ npm run preview`.

## Wix OAuth configuration

Open your Wix dashboard for **Knewspaper** → **Settings** → **Development &
integrations** → **Headless Settings** → **Headless clients** → the
**Knewspaper Headless Frontend** client → **More Actions** → **Settings** →
**URLs**.

| Setting | Value |
|---|---|
| Allowed redirect domains | `kautilya27.github.io` |
| Allowed authorization redirect URIs | `https://kautilya27.github.io/knewspaper/callback/` |
| Login URL | **Leave empty.** This site uses the Wix-hosted login page, and Wix's docs say the Login URL must be empty in that case; it is only for custom login pages. |

For local development, also add `localhost:5173` as a redirect domain and
`http://localhost:5173/callback/` as an authorization redirect URI.

The redirect URI must match **exactly**, including `https://` and the trailing
slash. Click **Save**.

Two more things sign-in needs on the Wix side:

1. The Wix site must be **published** (it is), because Wix shows the login page
   from it.
2. Your Knewspaper site does not currently have the **Wix Members Area** app.
   If the Wix sign-in page shows an error or visitors cannot create accounts,
   add Members Area from the Wix App Market.

The site's own pages for this flow:

- `https://kautilya27.github.io/knewspaper/login/` starts sign-in (the header's
  "Sign in" button does the same without a page change).
- `https://kautilya27.github.io/knewspaper/callback/` finishes it and returns the
  reader to the page they came from.

## Newsletter and contact forms

Until you connect forms, the newsletter box tells readers to email
`knewspaper.in@gmail.com`, and the contact form opens the reader's email app
with the message filled in. To store submissions in Wix instead:

1. Your site currently has the legacy *Wix Forms & Payments* app. The SDK's
   form submissions need the current **Wix Forms** app: add it from the App
   Market if your dashboard doesn't already show **Forms & Submissions**.
2. Create a "Newsletter" form with an email field, and a "Contact" form with
   first name, last name, email and message fields.
3. Put the form IDs in GitHub: **Settings → Secrets and variables → Actions →
   Variables**, named `WIX_NEWSLETTER_FORM_ID` and `WIX_CONTACT_FORM_ID`. They are
   not secrets. If your fields' keys differ from `email`, `first_name`,
   `last_name` and `message`, update `wix.newsletterFields` / `wix.contactFields`
   in `site.config.mjs`.
4. Re-run the workflow.

## Deployment (GitHub Pages)

One-time setup in the GitHub repo:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main` (or run the workflow from the **Actions** tab). The site is
   published at `https://kautilya27.github.io/knewspaper/`.

Optional repository variables (**Settings → Secrets and variables → Actions →
Variables**): `WIX_CLIENT_ID` (overrides `site.config.mjs`), `CANONICAL_BASE`,
`ALLOW_INDEXING`, and the two form IDs above.

If the Wix fetch fails during a build, the workflow stops and the live site
keeps its previous version.

## SEO while www.knewspaper.in is still on Wix

The github.io copy tells search engines **not to index it** (`noindex` and a
blocking `robots.txt`), so it can't compete with your live Wix site as
duplicate content. When you're ready to switch:

1. Connect your domain to GitHub Pages (**Settings → Pages → Custom domain**,
   e.g. `www.knewspaper.in`) and update DNS as GitHub describes.
2. Set repository variables `CANONICAL_BASE=https://www.knewspaper.in/` and
   `ALLOW_INDEXING=true`.
3. In Wix Headless Settings, add `www.knewspaper.in` as a redirect domain and
   `https://www.knewspaper.in/callback/` as an authorization redirect URI.
4. Re-run the workflow, then submit `https://www.knewspaper.in/sitemap.xml` in
   Google Search Console.

Because the paths match the old site, existing Google results keep pointing to
the right articles.

## Privacy policy

`src/templates/privacy.mjs` carries over the policy from your current site
(last updated 25 March 2024). Your site uses Google AdSense, which the current
policy text doesn't mention; consider adding a section on advertising cookies.
