# Brief: add an FAQ section to Knewspaper articles (November 2026)

Knewspaper (www.knewspaper.in) is an Indian explainer blog on Wix (site ID
`fc7a03c1-28fe-4510-90ba-025a62b06835`). The owner wants an FAQ section on every article.
You are adding one to each article in your list. You only ADD a section at the end; you do not
change anything else in the article.

## Tools

Wix calls go through `mcp__Wix__ExecuteWixAPI` (load it first with ToolSearch
`select:mcp__Wix__ExecuteWixAPI`), always with `siteId: "fc7a03c1-28fe-4510-90ba-025a62b06835"` and
`sourceDocUrls: ["https://dev.wix.com/docs/api-reference/business-solutions/blog/draft-posts/update-draft-post","https://dev.wix.com/docs/api-reference/business-solutions/blog/posts-stats/get-post-by-slug"]`.
The workspace shell cannot reach Wix. You may use WebSearch / WebFetch to check facts.

## For each article, one at a time, in order

1. **Read it.** ExecuteWixAPI with `code` = the contents of `/home/claude/seo/read-template.js` with
   `PUT-SLUG-HERE` replaced by the slug, `hasMutations: false`. You get the title and the body as
   markdown.
2. **Write 4 FAQs** (3 or 5 is fine if the article is very short or very broad):
   - Questions an Indian reader would actually type into Google about this topic, in natural
     wording ("Is it safe to…?", "How much does…?", "What is the difference between…?"). Each ends
     with "?". Don't just repeat the article's headings as questions; cover what a reader would ask
     next. No duplicate or near-duplicate questions.
   - Each answer is 1–3 sentences (about 30–80 words), complete on its own (makes sense without the
     article), and answers the question in its first sentence.
   - **Accuracy:** answers must agree with the article. Do not add new facts, figures, prices, dates,
     rents, fees, tax rules, records or statistics unless you have checked them with a current source
     (2025–2026). If the article's own figure may be out of date, answer without the figure. Never
     invent numbers. Health answers: general information, consistent with mainstream medical
     guidance; suggest seeing a doctor/dentist where appropriate. Finance answers: explain, don't
     advise.
   - Plain text only: no links, no markdown, no HTML, no emoji. Neutral and helpful; no promotion of
     any brand, clinic, app or company (even if the article mentions one), no "contact us".
   - British/Indian English spelling, as the site uses.
3. **Publish.** ExecuteWixAPI with `code` = the contents of `/home/claude/seo/append-faq-template.js`
   **verbatim**, `hasMutations: true`, and `files` exactly like this:
   ```
   === FILE: faq.json ===
   {"slug":"<slug>","faqs":[{"q":"...?","a":"..."},{"q":"...?","a":"..."}]}
   §END
   ```
   Make sure the JSON is valid (escape any double quotes inside text as \"). The script refuses an
   article that has unpublished edits or already has an FAQ section, and checks the format; if it
   returns `error`, fix the FAQ (or skip the article and say why). Publish each article once; retry
   once only on a network/proxy error.
4. Save what you published to `/home/claude/seo/faqs/<slug>.json` (same JSON).

## Outdated articles

Many of these articles are a few years old. If the article states something that is no longer
true (old tax rates, old prices or rents, past events described as upcoming, old season results),
do NOT repeat it in the FAQs: answer without it, or with the current fact if you have verified it.
List such articles and what's out of date in your report, so the owner can have them rewritten.
An example already done: /home/claude/seo/faqs/what-is-swp.json (its article still gives the
pre-July-2024 capital gains rates, so the FAQ explains tax without quoting rates).

## Report

Keep it short: one line per article — slug, published yes/no (or the error), the 4 questions in
a few words, and any fact you weren't sure about.
