# Daily article log


## 2026-11-06 (Friday: civics day)

Published (no cover images: Chrome/ChatGPT tools were not available in this cloud run; both slugs added to `pendingImages`):
- [Belly Fat: Causes, Safe Waist Size for Indians and How to Reduce It](https://www.knewspaper.in/post/belly-fat) (plan #20, health-fitness). Gate: fail 1 (minor: sleep-study wording, US cut-off 88 cm, NFHS attribution, detox line) → fixed → pass 2.
- [Tell Me About Yourself: How to Answer, With Examples for Freshers and Experienced](https://www.knewspaper.in/post/tell-me-about-yourself) (plan #19, career). Gate: fail 1 (UPSC quote wording, HBR/Lees paraphrase) → fixed → pass 2 (excerpt said "five" samples, corrected to four).

Not published:
- Civics #1 "What would happen if 1 US dollar were equal to 1 rupee?": failed the gate twice. Run 1: RBI intervention direction was backwards, 2006–08 percentage wrong, exports figure outdated (revised to $863.1 bn). Run 2: the scenario didn't say it assumes prices/wages stay the same (a zero-removal redenomination would change nothing). All fixes are applied in `daily/drafts/civics-1/`; it is NOT in usedCivics/skippedCivics, so next Tuesday's run should re-check the figures, run a fresh gate and publish it if it passes.

Skipped plan rows: 1–17 already on the site (duplicates); 18 Atomic Habits (no information gain over existing habits articles).

Pre-render deploy: published true, pages 351 → 353, 2 redirects added.

Yesterday's articles: none recorded in `state.published` (first daily run), so nothing to recheck.

Unsure / to check: IBPS PO interview rules were confirmed via coaching-site copies of the notification (ibps.in PDFs couldn't be fetched); the create script reported `cover: true` although no cover was sent (probably a Wix default, worth a glance). Suggestion: link Q1 of interview-questions-and-answers to the new tell-me-about-yourself article.


2026-11-06 image run: no images made. Claude in Chrome was not reachable (scheduled cloud run had no link to the owner's computer). belly-fat and tell-me-about-yourself stay in pendingImages.

### 2026-11-06 (later): covers added
The owner sent images for both new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- belly-fat → c0f544_871dcdc6081d43e9b673d4a20225ca33~mv2.webp
- tell-me-about-yourself → c0f544_3ad340e482a54e239895b6380e790d51~mv2.webp
Removed both from `pendingImages`; pre-render rebuilt (353 pages, published true).

## 2026-11-07 (Saturday: owner-topic day)

Published (no cover images: Claude in Chrome was not available in this cloud run; all three slugs added to `pendingImages`):
- [Depression: Symptoms, Causes and Where to Get Help in India](https://www.knewspaper.in/post/depression-symptoms-causes) (plan #21, health-fitness). Gate: fail 1 (85.2% treatment gap disputed: BMJ Open 2019 NMHS analysis gives 79.1%; symptom grouping is NHS's, not WHO's) → now cites both figures (summary report 85.2%, BMJ Open 79.1%) → pass 2.
- [Volume of a Sphere: Formula, Derivation, Worked Examples and Common Mistakes](https://www.knewspaper.in/post/volume-of-a-sphere) (plan #22, education). Gate: pass 1 (all maths rechecked; added note that a new Class 10 NCERT book is due for 2027-28).
- [How to Use Claude for Free: What the Free Plan Includes and Its Limits (2026)](https://www.knewspaper.in/post/how-to-use-claude-for-free) (owner #2, technology). Gate: fail 1 (pricing page lists "Up to 5" Projects on Free; Research is Pro-only; Enterprise price) → fixed → pass 2 (softened "unlimited Projects", added Max/Ultra API credits, exact Team prices).

Owner topic #1 (best sample papers) not used: notBefore 2026-11-09.

Pre-render deploy: published true, pages 353 → 356, 3 redirects added.

Yesterday's articles (belly-fat, tell-me-about-yourself) reread on the live site: no errors found, no changes.

Unsure / to check:
- Depression: Tele-MANAS "53 cells, ~20 languages" is from PIB (Dec 2025 / Feb 2026 releases); NMHS-2 results not yet published.
- Sphere: Class 9 Ganita Manjari Part 2 chapter 14 title confirmed via Teachoo/Extramarks, not the NCERT PDF itself (ncert.nic.in blocks fetches).
- Claude: no INR price on an official Anthropic page (press reports from July 2026 mention rupee pricing, e.g. Pro about ₹2,000/month incl. GST, but figures differ), so the article only says to check checkout. Plans change often; recheck in a month.
- The create script again reported `cover: true` with no cover sent (Wix default media); state records cover false.
