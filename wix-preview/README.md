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

## Speed: one script per page

Wix static hosting answers each script file with its own round trip, so the
pages load a single bundle each (`assets/home.bundle.js`, `feed`, `post`,
`search`, `site`) instead of 15 separate modules. `bundle.mjs` builds them from
`assets/*.js` and Wix's `/js/wix/*` modules. After changing any script in
`assets/`, rebuild the bundles (run `bundle()` over the site's files, as done
through the Wix connector) and upload them, or the pages keep running the old
code. `perf-patch.mjs` holds the earlier speed changes (topic cache, image
sizes, non-blocking font).

## Speed: no waiting on author names, and a copy on the reader's device

`assets/fast.js` reads articles with the same Wix requests as the layer's
`fetchPosts`/`fetchPostBySlug`, but returns them as soon as Wix answers; author
names are looked up afterwards and kept on the device for a week. The pages
also keep what they showed in `localStorage` (`knews.*` keys):

- home page and article lists: shown at once on the next visit, then refreshed
  from Wix in the background;
- articles: the last 25 read stay for 6 hours, and an article starts loading as
  soon as a reader points at, touches or tabs to its link.

A reader's first visit still waits for Wix's answer (about 1 s); only a
server-rendered site avoids that.

## Write for us: paid guest posts

`write-for-us.html` sells guest posts (₹499 single, or one-year memberships of 5, 10, 50
or 100 articles) and takes the article itself. It is built by
`python3 write-for-us/build.py` from `write-for-us/main.html` and `wfu.css` inside the
published page's shell, and loads `assets/write.bundle.js` (entry `assets/write.js`,
rules in `assets/guest-rules.js`). It uses Wix's members (`/js/wix/member-store.js`)
and pricing-plans (`/js/wix/purchase.js`) modules. Articles are published by the
GitHub workflow in `guest-posts/` (see its README).

## Legal pages and header log-in

`terms.html` and `refund-policy.html` (sources in `legal/`, built inside the privacy
page's shell) are reached at `/terms-and-conditions` and `/refund-policy` through 301
redirects, and linked in every footer. Every page's header has a "Log in" link
to `/write-for-us.html#account`; a small inline script turns it into "My account" when a
member session is stored. Its style is inline in each page because the CDN keeps the old
`assets/styles.css` for a while.
