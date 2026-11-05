# Pre-rendered article pages

Every published article has a full HTML page at `/post/<slug>.html`, so search
engines and social previews read the article without running JavaScript. The
old `/post/<slug>` addresses 301-redirect there (Wix SEO redirects), the
article sitemap (`/sitemap-articles.xml`) lists them, and their canonical URL
is the `.html` address.

- `deploy.js` — the whole job, run through the Wix connector's ExecuteWixAPI:
  reads every published post, renders each page from the live `post.html`
  shell (same markup as `assets/post.js` draws), writes
  `assets/prerendered.js` (the list the scripts use for links), rebuilds the
  page bundles, rewrites the sitemap, uploads, and points the `/post/<slug>`
  redirects at the new pages. Set `MODE = "test"` to write one page only.
- `edits.json` / `make-edits.py` — text edits applied to the live files in the
  same run (script changes are sent as small find/replace hunks against the
  committed version, with a length check).
- `editorial-team-main.html` — body of `/editorial-team.html`.
- `test-run.mjs` — runs `deploy.js` locally against mocked Wix data.

`assets/post.js` keeps a pre-rendered page as it is when the article hasn't
changed since it was rendered (it only adds likes, comments and ads), and
redraws it from Wix when it has. So an edit in the Wix dashboard shows at
once; re-run `deploy.js` now and then so the static HTML catches up, and after
publishing new articles so they get their own page (until then they open at
`/post.html?slug=…`).

Redirect note: Wix's bulk create does not honour `forceReplace`; to change
where existing redirects point, delete them and create them again.

Size limit: Wix static hosting refuses a site over 20 MiB or 2,000 files. The
351 article pages are about 12 MB, so the stylesheet is not inlined into each
page (that alone added about 7 MB).
