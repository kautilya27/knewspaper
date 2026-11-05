# Wave 4: fix articles with out-of-date or wrong facts (November 2026)

Read `/home/claude/seo/BRIEF.md` (main rules, tools, writing standards), `/home/claude/seo/BRIEF-GUEST.md`
(how outbound links are kept) and `/home/claude/seo/BRIEF-WAVE3.md` first. Everything there applies, with these changes:

1. **Why these articles:** while adding FAQs we found facts in them that are wrong, out of date, or
   written for another country, or broken formatting (empty list items, missing names, garbled
   text). Your list gives the known problems per article; fix those **and** check the rest of the
   article the same way. Rewrite so it is accurate and useful as of **November 2026** for readers in
   India.
2. **Always publish with `/home/claude/seo/publish-template-guest.js`** (verbatim). It keeps every
   existing outbound link and refuses to publish if one is missing, so copy each original external
   link URL into the new text in a natural sentence. Don't add commercial links. If an original link
   is a promotion (e.g. a rental app), keep it once in a neutral sentence; don't expand the promotion.
3. **Never change the slug.** Keep every `[[IMAGE n]]` once.
4. **FAQs:** most of these articles now end with a "Frequently asked questions" section (added this
   week). Keep a `## Frequently asked questions` section with 4 `###` questions at the end: reuse
   those questions where they're still right, and correct or replace any that the rewrite makes
   wrong. If the article had an older FAQ in another format, merge it into this one section (no
   duplicate FAQ sections).
5. **Facts:** verify every date, rule, rate, fee, price, rent, record, release and statistic with a
   current source (2025–2026: official/government sites, regulators, the game's or league's official
   site, major outlets). Give ranges with the period and source for prices and rents ("listing sites
   in late 2026"). If you can't verify a figure, leave it out. Never invent numbers, studies or quotes.
   Remove unsourced statistics rather than keep them.
6. **Country:** articles written for the US (US laws, $ prices, US-only apps and services) must be
   rewritten for Indian readers: Indian rules, ₹, services available in India. Keep the topic and slug.
7. Year in the title/SEO title: use "2026" only if the content really covers 2026; otherwise no year.
8. Internal links: 2–3 to related Knewspaper articles from the `related` list.

Publish each article once (retry once only on a network error). Do them one at a time, in order.

## Report
One line per article: slug, published yes/no (or why not), new SEO title, words before→after, the
main fixes, and any fact you were unsure about.
