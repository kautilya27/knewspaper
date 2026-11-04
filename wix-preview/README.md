# Wix-hosted preview (Go Headless migration)

The Knewspaper frontend for Wix's headless hosting, built for the "Go Headless"
migration of the Knewspaper site. It is a separate, small static site:

- Every page is a root `.html` file (Wix static hosting serves files, not folders):
  `index.html`, `blog.html`, `category.html?slug=…`, `post.html?slug=…`,
  `search.html?q=…`, plus About, Contact, Write for us and Privacy.
- Articles, topics, related posts, likes and comments are read **live** in the
  browser through Wix's blog layer in `/js/wix/` (installed on the Wix site by
  `wix.headless.modules.install`, not stored in this folder).
- Search uses Wix Site Search, so matching and ranking happen on Wix.
- No apps are installed and nothing is seeded: the content is the Knewspaper blog.

Rebuild the pages with `node wix-preview/build.mjs` (writes `wix-preview/site/`),
then upload `site/` to the Wix preview site.

Preview: https://headless-yxihaztlstv-upkautilya-140a.wix-site-host.com/
Wix deploy site: `d3cb9a28-2000-46df-b219-81754f3c3b41`
Client ID used by the blog layer: `7b943d44-d514-46a8-a183-8391ccde2fed` (the migration's client on the Knewspaper site)

Completing the migration in the Wix dashboard makes this frontend the live
www.knewspaper.in. Article URLs then become `/post.html?slug=…`; add redirects from
the old `/post/<slug>` paths first, or use the Astro build route (keeps the old
URLs) from a machine where the Wix CLI and npm work.

## Old URLs

The live site (www.knewspaper.in) keeps the old Wix addresses working with
418 permanent (301) redirects in Wix SEO settings: every `/post/<slug>`,
`/blog/categories/<slug>`, `/blog`, `/blog/page/N`, `/about-us`, `/contact`,
`/write-for-us` and `/privacy-policy` goes to its `.html` page, and the page
then shows the old address again (`showOldUrl` in `assets/site.js`) and uses it
as the canonical URL. A post published after 4 Nov 2026 needs its own redirect
(`/post/<slug>` → `/post.html?slug=<slug>`) to get an old-style address.
