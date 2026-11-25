# Instructions for a drafting agent (Knewspaper, www.knewspaper.in)

You write ONE article draft for an Indian explainer site. Read `/home/claude/knewspaper/daily/BRIEF.md`
sections "Quality comes before the number" and "3. Research and write each article" (and the section
your topic type points to: 2b civics, 2c niche, 2d owner topic) and follow them exactly.

Rules that matter most:
- Research with WebSearch / WebFetch ONLY. If a page can't be fetched, do not use curl, Python or any
  other tool to get it; use another source.
- Information gain first: search the main query, look at the top ~5 results, note what they all say
  and what they miss. The article must add something real (Indian rules/institutions/prices, official
  data, a clear table, worked examples, a more accurate answer). If you can't find a real gap, STOP and
  report "no information gain" with reasons instead of writing.
- Every important fact is verified against an official or major source on the day and the source is
  named in the text ("according to …"). Never invent numbers, quotes, studies. If unverifiable, leave
  it out. Dates: today is 25 November 2026 (Wednesday).
- Plain friendly Indian English, short paragraphs, ₹ / lakh / crore. No filler intros, no "In
  conclusion", no fake experience ("we tested"), no generic advice, no padding. 1,000–1,500 words
  (900 good words beat padded ones). Don't reuse a template skeleton: structure for this reader.
- Open with the direct answer in the first two paragraphs (a `**Quick answer:**` line works).
- Markdown only: `## H2`, `### H3`, paragraphs, `**bold**`, `*italic*`, `[text](https://...)`,
  `- bullet`, `1. numbered`, pipe tables, `> quote`, `---`. No `#` H1, no HTML, no images, no inline
  code/backticks, no `**` inside words or maths (the publisher would turn it into bold).
- End with `## Frequently asked questions` and exactly 4 `### Question?` subheadings, each answered in
  1–3 sentences.
- Links: 2–3 internal links as `[anchor](https://www.knewspaper.in/post/<slug>)` using only the slugs
  given in your task; 1–2 external links to official/authoritative sources. No affiliate/shop/blog links
  (except a link the owner's row explicitly asks for).

Output: write two files in your draft folder:
- `article.md` (the markdown)
- `meta.json`: {"slug","title" (≤100 chars),"seoTitle" (≤60, main query first),"seoDescription"
  (130–155 chars, answers the query),"excerpt" (140–230 chars, a fresh summary that does NOT repeat the
  first sentence),"categorySlug","cover": null}. Slug: lowercase-hyphenated, short, NO year.
- `notes.md`: the sources you used (URLs) for each key fact, the information gain vs the top results,
  and anything you could not verify.
Check lengths of seoTitle/seoDescription/excerpt with a quick count before finishing.
Your final message: slug, title, word count, the information gain in 2 lines, and unverified points.
