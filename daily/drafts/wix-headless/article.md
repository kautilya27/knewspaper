**Quick answer:** Wix Headless keeps the business side of a Wix site (products, bookings, blog posts, CMS content, members, orders) in the normal Wix dashboard, but lets the website or app your visitors see be built in code, by you, a developer or an AI coding tool. That custom front end talks to Wix through Wix's APIs and JavaScript SDK. Either Wix hosts it for you, or you host it anywhere you like.

"Headless" simply means the head (the design visitors see) is separated from the body (the business engine). Wix says it is free to start, but payments, a custom domain and in-depth analytics need a premium plan. If you like building visually in the Wix Editor or Wix Studio and have no developer or AI coding workflow, Wix's own Help Center says you don't need it.

## What "headless" actually means

On a regular Wix site, the pages and the business tools behind them come as one package. Wix Headless splits that package in two. According to the Wix Help Center, you manage the business side from the dashboard as usual, and a separate custom site "connects to your Wix business behind the scenes". Change a price or a class timing in the dashboard, and the custom site shows it, because it reads that data from Wix.

Think of a Jaipur pottery brand. The owner adds products and checks orders in the Wix dashboard, while the shop window is a custom website a developer coded, and later perhaps a mobile app. Both read the same products and orders.

## The flow, step by step

Based on Wix's developer documentation, this is the flow:

| Step | Who does it | What happens |
|---|---|---|
| 1. Owner updates content | You, in the Wix dashboard | Add a product, blog post, CMS item, service or event, as on any Wix site |
| 2. Visitor opens the site | Your custom front end | Pages load from Wix hosting or your own hosting |
| 3. Front end asks for data | Your code, via the Wix SDK or REST API | It identifies itself with a public **client ID** and gets a visitor token |
| 4. Wix sends the data back | Wix business APIs | Products, posts, slots or prices come back and your code displays them |
| 5. Visitor checks out or books | Wix-hosted page or your own page | You can hand off to a ready-made Wix checkout or booking page, then the visitor returns |
| 6. Member logs in (optional) | Wix login, or your own login page | Wix swaps the visitor token for a member token |
| 7. Order lands in Wix | Wix dashboard | You see the order or booking where you always do |

Step 5 matters: Wix's docs say you can send visitors to pre-built Wix pages for store checkout, bookings, event tickets and pricing-plan checkout, instead of building those sensitive flows yourself.

The backend can include eCommerce, bookings, events, memberships, the CMS and the blog, all under one login model, per Wix's developer docs. One backend can also serve several front ends, such as a website and a mobile app.

## How visitors and members log in

Most guides skip this. Here are the four credentials Wix's authentication docs describe:

| Credential | What it is | Safe in the browser? | Used for |
|---|---|---|---|
| **Client ID** | Public ID of your headless "client" (your site or app) | Yes | Visitor sessions and member login |
| **Visitor / member tokens** | Short-term passes Wix issues through OAuth 2.0 | Yes, handled by the SDK | Keeping a cart, letting a member see their orders |
| **Client secret** | Private password belonging to the client | No, backend only | Admin tasks such as updating stock or issuing refunds |
| **API key** | Admin access to your Wix account, with permissions you choose | No, backend only | Account-level jobs and some external integrations |

A few rules from the docs worth knowing:

- **Everyone starts as a visitor.** The visitor token remembers a shopper's cart between pages. The JavaScript SDK creates it automatically; with plain REST calls, your code requests it.
- **Members are visitors who signed in.** After login, Wix replaces the visitor token with a member token, so the person sees their own profile or orders.
- **Login needs only the client ID.** The client secret is for admin work only, and it and any API key must stay on the server, never in the website's visible code.

For the login screen, you can use a **Wix-hosted login page** (email and password, plus Google or Facebook if enabled), build **your own branded page** while Wix still checks the password, add **Google or Facebook buttons** to your design, or **bring your own provider** such as GitHub, which needs an API key on your server. If your site uses Wix's recommended Astro setup, login is handled for you: you can use Wix's login page, or your own branded login and signup forms (plus Google or Facebook links) that plug into the setup's built-in login routes. Bringing your own provider, such as GitHub, isn't currently supported there.

## Hosting: Wix-managed or self-managed

Wix's docs describe two paths, and the difference is who hosts the front end and who handles login:

| | Wix-managed (Astro) | Wix-managed (other frameworks) | Self-managed |
|---|---|---|---|
| Who hosts the front end | Wix | Wix | You (any host) |
| Framework | Astro | Static builds (React, Vue, plain HTML) or code for Cloudflare Workers | Anything |
| Login setup | Automatic | You set it up | You set it up |
| Built-in SEO support | Yes | No | No |
| Wix CLI | Full command set | Preview and release only | No |

Wix recommends the Wix-managed path. According to its docs, the site then runs on a global content delivery network with automatic SSL and deploy previews, managed through the **Wix CLI**, a command-line tool. With the **Astro integration**, Wix also handles login, SEO, analytics and secrets. Self-managed suits teams with their own hosting, a framework Wix can't run, or a mobile app beside an existing Wix site.

Wix's Help Center also says you can give its "Wix Headless skill" to an AI coding agent such as Claude Code, Cursor or Codex to build and deploy the site from a prompt.

## Moving an existing Wix site to headless

For a live Wix site, the Help Center describes a migration inside **Headless Settings**: build the new front end, preview it while the old site stays live, then switch (and switch back if needed). The conditions, as of November 2026:

- The site must have a **custom domain**, and only the **site owner** can start the migration.
- A Wix Stores site must be on the **new product catalog**.
- The feature is currently available for **English-language accounts only**.
- Sites using **custom components built in an app project** can't migrate yet; Wix suggests creating a new headless site instead.
- Your plan stays the same.

Wix's post-migration checklist says editor widgets, Velo page code, form embeds, member pages, the cookie banner, chat widgets, third-party scripts and translations **don't carry over** and must be rebuilt. Old pages you don't recreate return a 404 unless you add 301 redirects, and actions in the new design aren't reported to analytics unless the developer sends those events. If your [GA4 and Search Console numbers](https://www.knewspaper.in/post/why-ga4-and-search-console-data-never-match) already confuse you, budget time to re-check them after the switch.

## When headless beats the normal Wix editor, and when it doesn't

**Headless makes sense when:**

- You want a design or interaction the editor can't produce, and you have a developer or a solid AI coding workflow.
- You need one backend feeding a website *and* a mobile app or another front end.
- You already have a custom site and want to add a store, bookings or a blog behind it.

**Stay with the Wix Editor or Wix Studio when:**

- You prefer building visually, or nobody will maintain the code after launch (every layout change becomes a code change).
- Your site depends on apps that aren't supported on headless. Wix keeps a list, and chat widgets are one example.
- You rely heavily on Velo code that would have to be rewritten.

For a Pune yoga studio owner who edits a page every week, the editor is usually easier. For an agency or product team with developers (see [why full-stack development matters more in the age of AI](https://www.knewspaper.in/post/why-full-stack-development-has-become-more-important-in-the-age-of-ai)), headless gives far more freedom without building a backend from scratch.

Official details: Wix's [About Wix Headless](https://dev.wix.com/docs/go-headless/get-started/about-wix-headless) developer page.

## Frequently asked questions

### Is Wix Headless free?

Yes, Wix says it is free to start. Accepting payments, connecting a custom domain and getting in-depth analytics require a Wix premium plan.

### Do I need to know coding to use Wix Headless?

The front end is code, but you needn't write it. Wix says you can use an AI coding agent with its Headless skill or hire a developer, including via the Wix Marketplace.

### Is it safe to put my Wix client ID in website code?

Yes. Wix's docs describe the client ID as a public identifier that is safe in front-end code. The client secret and API keys are different: keep them only in backend code.

### Can I go back to my old Wix site after moving to headless?

Yes. According to the Wix Help Center, you can click **Switch back** in Headless Settings, and your old site, including its Velo code, is still there (where your plan allows it).
