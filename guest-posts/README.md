# Paid guest posts

Writers create an account on www.knewspaper.in/write-for-us (email or Google), buy a plan by
email and pay the site owner directly, then add their article (title, content
with subheadings, slug, SEO title, meta description, topic, featured image) and it goes
live automatically, without editorial review.

| Plan | Price | Articles | Valid |
|---|---|---|---|
| Single guest post | ₹499 | 1 | 12 months |
| Membership: 5 articles | ₹999 | 5 | 12 months |
| Membership: 10 articles | ₹1,499 | 10 | 12 months |
| Membership: 50 articles | ₹2,999 | 50 | 12 months |
| Membership: 100 articles | ₹4,999 | 100 | 12 months |

## How it fits together

- **Plans**: Wix Pricing Plans (one-time, ends after a year). There is no online checkout
  (Razorpay was disconnected on 5 Nov 2026): the writer emails knewspaper.in@gmail.com, pays
  the owner directly, and the owner adds the plan to the writer's account as a paid offline
  order (Wix dashboard → Pricing Plans, or `POST /pricing-plans/v2/checkout/orders/offline`
  with `memberId`, `planId`, `paid: true`). The order gives the writer their credits.
- **Accounts**: Wix Members. Writers log in on the page; their name is the post's author.
- **Submissions**: the `GuestSubmissions` CMS collection. A logged-in member can add items
  and read only their own; nobody but the site owner can change them.
- **Credits used**: the `GuestLedger` collection (owner only), one row per published article.
- **Publisher**: `publish.mjs`, run every 10 minutes by `.github/workflows/guest-posts.yml`.
  It checks each new submission (`wix-preview/src/assets/guest-rules.js`, the same rules the
  page shows), finds a free credit on the writer's active plan, uploads the image, publishes
  the post, adds the `/post/<slug>` redirect and marks the submission live.

Rules: 500–1,500 words; at least 2 subheadings, one of them an H2; at most 3 links to other
websites (no more than 2 to the same site), all published with rel="sponsored" under a "Sponsored guest post" note; slug, SEO title, meta description, image and alt text required.
A submission that breaks a rule is marked "Needs changes" with the reasons and uses no credit.

## Removing an article

Unpublish or delete the post in the Wix dashboard (Blog → Posts). On its next run the
publisher marks the article "Removed" on the writer's page and returns its credit, so the
writer can publish one more article in its place.

## Setup (once)

1. (No payment provider needed: plans are sold by email.)
2. Wix → API Keys Manager (https://manage.wix.com/account/api-keys) → create a key with
   these permissions: Wix Blog, Wix Data (CMS), Wix Pricing Plans, Media Manager,
   SEO (redirects) and Members. Copy the key.
3. GitHub → this repository → Settings → Secrets and variables → Actions → New repository
   secret: name `WIX_API_KEY`, value the key.
4. Actions → "Publish guest posts" → Run workflow, to check it works.

GitHub turns off scheduled workflows in a repository with no commits for 60 days; if that
happens, open Actions → "Publish guest posts" and enable it again.

## Files

- `publish.mjs`: the publisher. `DRY_RUN=1` checks and logs without changing anything.
- `html-to-ricos.mjs`, `mini-html.mjs`: the article's HTML → Wix rich content (no dependencies).
- `test.mjs`: checks for the converter and the rules (`node guest-posts/test.mjs`).
- `plans.json`: the Wix plan ids.
