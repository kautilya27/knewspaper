# Wave 5: fix articles with wrong, broken or out-of-date facts (5 November 2026)

Read `/home/claude/seo/BRIEF.md` (main rules, tools, writing standards), `/home/claude/seo/BRIEF-GUEST.md`
(how outbound links are kept) and `/home/claude/seo/BRIEF-WAVE4.md` first. Everything in Wave 4 applies
(always publish with `/home/claude/seo/publish-template-guest.js` verbatim, never change the slug, keep
every `[[IMAGE n]]` once, keep every original outbound link, one `## Frequently asked questions`
section with 4 `###` questions at the end, verify every fact with a current source, Indian readers,
year in the title only if the content really covers it, 2–3 internal links), with these additions:

1. **Why these articles:** while writing new summaries we found the problems listed for each
   article below. Fix those **and** check the rest of the article the same way. Today is
   5 November 2026; facts must be right as of today.
2. **Keep the article's angle.** Opinion pieces, reviews and fan analyses stay opinion pieces,
   reviews and analyses: keep the argument, fix the facts. Don't pad; if a section has nothing true
   and useful to say, cut it.
3. **Summary (excerpt):** each article was just given a new summary (the read script returns it as
   `excerpt`). Keep it in `meta.excerpt` unless your rewrite makes it wrong; then write a new one of
   140–230 characters that says what the reader gets and does not repeat or paraphrase the
   article's first sentence.
4. **If you can't verify something, leave it out** or say plainly that it isn't confirmed (with the
   date you checked). Never invent numbers, quotes, dates or plot details.
5. Articles that say "This article has unpublished edits in Wix" when publishing: stop, don't
   retry, report it.

## Your articles (do them one at a time, in this order)

(Your list is given in your task message; problems per article are below.)

- **the-new-lifetime-toll-plaza-pass-what-every-driver-needs-to-know**: presents a ₹30,000 15-year
  "lifetime" FASTag pass as fact. Check what NHAI/MoRTH actually launched (the ₹3,000 FASTag annual
  pass from 15 Aug 2025: rules, eligible vehicles, trips, where it works) and whether any lifetime
  pass exists or was only proposed. Retitle if needed so the title matches what is true (keep the slug).
- **4-percent-retirement-rule-dead-new-strategies**: money figures broken (missing currency
  symbols, "40,000+240,000+240,800"). Make it useful for Indian readers (₹ examples, Indian inflation,
  EPF/PPF/NPS/SWP context) with correct worked arithmetic.
- **mutual-funds-vs-etfs**: garbled minimum-investment line ("500–500–5,000"); check it is written
  for India (SEBI, SIP minimums, demat needed for ETFs, expense ratios, current tax rules after
  July 2024).
- **what-is-an-etf**: "INR 675.04 trillion" looks like a wrong conversion; check every figure and that
  it covers Indian ETFs (NSE/BSE, demat, tax).
- **best-stock-exchange-app-upstox-or-grow-or-zerodha**: contradicts itself on Zerodha margin
  funding (MTF). Check current features and charges of Zerodha, Groww and Upstox on their official
  sites (brokerage, AMC, MTF, mutual funds) and date the figures. The title says "stock exchange
  app"; these are brokers; explain that gently without changing the slug.
- **reason-why-dhoni-is-hated-so-much**: says he retired from international cricket in 2019 (he
  announced it on 15 August 2020; last international match 10 July 2019); implies the captain picks
  the team (selectors do). Check his IPL status as of November 2026.
- **can-virat-kohli-score-100-centuries**: tally "as of July 2024" (80) and treats events as upcoming
  that may have happened. Use his current international century count and format status (he retired
  from T20Is in June 2024 and from Tests in May 2025; check ODI status) from ESPNcricinfo/ICC/BCCI as
  of today, and update the argument accordingly.
- **deadpool-wolverine-2024-movie-review**: plot description doesn't match the film (it says
  Deadpool time-travels to meet a younger Wolverine). Rewrite the plot summary to match the real film
  (spoiler-light) and keep it a review.
- **why-askeladd-does-not-want-to-become-king**: may be wrong about Askeladd's background (raised
  as a slave? father a former king?). Check against the Vinland Saga manga/anime (reliable sources,
  e.g. the official site, Kodansha, the wiki for canon details) and fix the analysis.
- **when-will-boruto-shippuden-come**: "no official announcement" may be out of date. Check the
  current status of Boruto: Two Blue Vortex (manga) and any anime announcement as of today.
- **which-vegetables-can-beat-egg-in-protein**: uses 3.5 g protein per egg (that's about an egg
  white; a large whole egg is about 6 g); tofu, tempeh and quinoa are not vegetables. Use IFCT 2017
  (NIN) or USDA values, per 100 g and per serving, and be honest that few vegetables beat an egg
  gram for gram; separate vegetables from legumes and other plant foods.
- **thailand-trip-guide-in-budget**: exchange rate dated June 2024; check the current visa rule for
  Indians (visa exemption / e-Visa / TDAC arrival card as applicable today), rate and budgets.
- **is-it-good-to-buy-a-flat-in-bangalore**: garbled text "close toree IT parks"; check the price,
  rent and EMI figures (rates as of today) and source them.
- **kidney-stones-symptoms-causes**: says "four main types" but the table lists five; health rules
  apply (general information from NHS/NIDDK/major hospitals, see a doctor, no dosages).

## Report
One line per article: slug, published yes/no (or why not), new title if changed, the main fixes,
and any fact you were unsure about.
