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

Image prompts for 2026-11-07 (owner asked for these daily from now on):
- Depression: Symptoms, Causes and Where to Get Help in India: create image for this article topic without any text
- Volume of a Sphere: Formula, Derivation, Worked Examples and Common Mistakes: create image for this article topic without any text
- How to Use Claude for Free: What the Free Plan Includes and Its Limits (2026): create image for this article topic without any text

### 2026-11-07 (later): covers added
The owner sent images for all three new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- depression-symptoms-causes → c0f544_87b455e9ea2d4c19921f76d1086a386d~mv2.webp
- volume-of-a-sphere → c0f544_1b5a986db7554b50852fe275948c54c0~mv2.webp
- how-to-use-claude-for-free → c0f544_9a011800bb1d463596c31dd0759f28cb~mv2.webp
Removed all three from `pendingImages`; pre-render rebuilt (356 pages, published true).

## 2026-11-08 (Sunday: owner-topic day)

Published (no cover images: Claude in Chrome was not available in this cloud run; both slugs added to `pendingImages`):
- [How to Make a Resume in India: Format, Personal Details and Worked Examples](https://www.knewspaper.in/post/how-to-make-a-resume) (plan #24, career). Gate: pass 1 (applied 3 optional wording fixes: "Many" not "Most" resumes screened by software, SSC instructions linked, Naukri sentence tightened).
- [Types of COVID-19 Vaccines: How Each Works and Which Ones India Approved (2026)](https://www.knewspaper.in/post/types-of-covid-vaccines) (plan #25, health-fitness). Gate: pass 1 (applied recommended fixes: added the Dec 2025 AIIMS autopsy study in IJMR; removed an unverified "WHO: 4–30 days" TTS window, now "first few weeks").

Not published:
- Owner #3 "How Wix Headless Works": failed the gate twice. Run 1: Astro login options overstated, missing migration condition (custom components from an app project). Run 2: my fix understated Astro login (Wix's newer Astro guide allows custom login forms and Google/Facebook links; only bring-your-own-provider is unsupported; Wix's own docs contradict each other). All fixes are applied in `daily/drafts/wix-headless/`; it is NOT in usedOwner/skippedOwner, so the next owner-topic day (Wed) should re-check and run a fresh gate.
- Owner #1 (best sample papers): notBefore 2026-11-09, not yet eligible.

Skipped plan rows: 23 Atomic Habits Chapter 1 (no information gain).

Internal links (5b): biodata-format "a resume" → how-to-make-a-resume. Tried resume-action-verbs ("your resume") and science-backed-ways-boost-immunity ("COVID-19 vaccines"): phrases not found, skipped.

Pre-render deploy: published true, pages 356 → 358, 2 redirects added.

Yesterday's articles reread on the live site:
- volume-of-a-sphere: calculation steps in Examples 2–4 ran together on one line (e.g. "= 38,808 r³ = …"); split into separate lines and republished.
- how-to-use-claude-for-free: "Artifacts … available on every plan including Free since September 2026" was wrong (Artifacts opened to Free in Aug 2024); date removed and republished. Weekly limit for Free confirmed on claude.com/pricing ("Limited usage every 5 hours and every week"), kept.
- depression-symptoms-causes: no errors found (the 85.2% NMHS treatment-gap figure couldn't be re-confirmed from the summary report; the BMJ Open 79.1% figure is confirmed).

Unsure / to check:
- COVID: the April 2026 CDSCO approved-vaccine list was read via Medical Dialogues' copy (cdsco.gov.in blocks fetches). Current availability of any COVID vaccine in India in Nov 2026 couldn't be confirmed; the article says so. The 2021 WHO myocarditis statement rests on news reports.
- Resume: SSC registration instructions cited are the 2023 CGL version (the article doesn't state a year).

Image prompts for 2026-11-08:
- How to Make a Resume in India: Format, Personal Details and Worked Examples: create image for this article topic without any text
- Types of COVID-19 Vaccines: How Each Works and Which Ones India Approved (2026): create image for this article topic without any text

### 2026-11-08 (later): covers added
The owner sent images for both new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- how-to-make-a-resume → c0f544_4998a8482d16416d99f18e40728979f7~mv2.webp
- types-of-covid-vaccines → c0f544_2bdf4077380d4bad8bce6fa4a302d252~mv2.webp
Removed both from `pendingImages`; pre-render rebuilt (358 pages, published true).

## 2026-11-09 (Monday: niche-topic day)

Published (no cover images: Claude in Chrome was not available in this cloud run; all three slugs added to `pendingImages`):
- [PTSD: Symptoms, Causes, Complex PTSD and Where to Get Help in India](https://www.knewspaper.in/post/ptsd-symptoms-causes) (plan #26, health-fitness). Gate: pass 1 with one required fix applied (NHS physical-symptom list was misquoted: now "repeated headaches, stomach problems or pain anywhere in the body that has no physical cause"); Tele-MANAS "around 20 languages" added.
- [12-Hour and 24-Hour Clock: Conversion Table, Rules and the Midnight Trap on Train Tickets](https://www.knewspaper.in/post/12-hour-and-24-hour-clock) (plan #27, education). Gate: fail 1 (NIST FAQ misquoted as recommending "12 noon/12 midnight"; weekday logic unclear; two FAQs repeated the body) → fixed (exact NIST quote, weekday example generalised, new FAQs, phones bullet cut, boarding-station date note added) → pass 2 (applied: "Wednesday the 15th" → "a Wednesday", since 15 Dec 2026 is a Tuesday; "railway" dropped from the no-colon note; 24:00 FAQ replaced).
- [Guru Nanak Jayanti 2026: Date, Gurpurab Rituals and Why the Date Moves Each Year](https://www.knewspaper.in/post/guru-nanak-jayanti-2026) (niche #1, devotional). Gate: fail 1 (said the calendar dispute doesn't affect this Gurpurab; the Mool Nanakshahi calendar, per a 2017 Chicago conference, fixes it on 14 April) → fixed → pass 2 (applied: "many" not "most" states/banks; "a date many historians favour" for Vaisakh; "in India it doesn't change the date").

Skipped plan/niche rows: none.

Internal links (5b): anxiety-symptoms-and-causes "Trauma or significant adversity" → ptsd-symptoms-causes; depression-symptoms-causes "abuse or trauma" → ptsd-symptoms-causes. Nothing natural found for the clock or Guru Nanak articles.

Pre-render deploy: published true, pages 358 → 361, 3 redirects added.

Yesterday's articles (how-to-make-a-resume, types-of-covid-vaccines) reread on the live site by a review agent: no errors found, no changes.

Unsure / to check:
- Guru Nanak Jayanti: 2027 date (14 Nov, Sunday) is marked "expected" (publicholidays.in, dekhopanchang); confirm when DoPT's 2027 list is checked. State/bank holiday lists vary; the article says "many" and names examples from Angel One's November 2026 bank-holiday list.
- Clock: IRCTC "start date can refer to the origin station" is hedged; no official IRCTC page confirmed it.
- PTSD: official telemanas.mohfw.gov.in page could not be fetched; numbers confirmed via IIT Kanpur's page and earlier PIB releases.
- COVID (yesterday): WHO fact sheet "updated November 2025" date not re-confirmed (page fetch blocked). Resume (yesterday): Naukri's "PDF, RTF, DOC or DOCX under 2 MB" not re-confirmed.
- Note for future runs: when passing add-links-template.js, keep its NBSP character in the `NB` regex (today's call had a plain space there; harmless, both phrases were found).

Image prompts for 2026-11-09:
- PTSD: Symptoms, Causes, Complex PTSD and Where to Get Help in India: create image for this article topic without any text
- 12-Hour and 24-Hour Clock: Conversion Table, Rules and the Midnight Trap on Train Tickets: create image for this article topic without any text
- Guru Nanak Jayanti 2026: Date, Gurpurab Rituals and Why the Date Moves Each Year: create image for this article topic without any text

### 2026-11-09 (later): years removed from URLs (owner's request)
Owner rule: no year in any post URL, so the same page is reused every year. BRIEF.md and create-post-template.js now enforce it. New `daily/rename-slugs-template.js` changes a slug, adds a 301 from /post/<old> to /post/<new> and rewrites internal links to the old address (at most 10 per run, then run deploy.js).
Renamed (batch 1, deploy done, old pages removed): guru-nanak-jayanti-2026 → guru-nanak-jayanti, rangoli-designs-for-diwali-2026 → rangoli-designs-for-diwali, halloween-2026 → halloween, pongal-2027-first-day-bhogi → pongal-first-day-bhogi, maha-shivaratri-2027-1 → maha-shivaratri, akshaya-tritiya-2027 → akshaya-tritiya, chaitra-navratri-2027 → chaitra-navratri. Internal links updated in 6 articles.
Batches 2 and 3 done after the owner approved (deploy after each; old pages removed, 301s added, internal links updated in 19 more articles): ram-navami-date-rituals-and-how-india-celebrates, navratri-colours, durga-puja, happy-new-year-wishes, csk-playing-11, rcb-playing-xi, how-to-cover-rbi-grade-a-syllabus-in-less-time, renting-vs-buying-flats-for-young-professionals-in-gurgaon, average-rent-for-2-bhk-apartments-in-mumbai, average-cost-of-apartments-in-delhi, average-rent-in-pune, cost-of-living-in-hyderabad, jeans-vs-cargos-which-streetwear-staple-should-men-rock, 6-must-have-oversized-streetwear-clothes. All 21 renames are live (361 pages).
Kept on purpose (one-off events): union-budget-2024, ipl-2025-full-schedule, probable-ipl-2025-retentions, harry-brook-pulls-out-of-ipl-2024-due-to-personal-reasons, deadpool-wolverine-2024-movie-review.

### 2026-11-09 (later): covers added
The owner sent images for all three new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- guru-nanak-jayanti → c0f544_71e9ad53b85f4149aae28d85c26ef684~mv2.webp
- 12-hour-and-24-hour-clock → c0f544_9f59d2d9442347da942f832991825b4d~mv2.webp
- ptsd-symptoms-causes → c0f544_ee89ed41b8bf4fe5bc6b2ef3a60071e7~mv2.webp
Removed all three from `pendingImages`; pre-render rebuilt (361 pages, published true).

## 2026-11-10 (Tuesday: civics day)

Published (no cover images: Claude in Chrome was not available in this cloud run; both slugs added to `pendingImages`):
- [What Would Happen If 1 US Dollar Were Equal to 1 Rupee? Explained](https://www.knewspaper.in/post/what-if-1-dollar-equals-1-rupee) (civics #1, finance; the draft held since 6 Nov). Figures re-checked before the gate: rupee ~₹94 (PTI, early Nov), reserves $717.06 bn on 30 Oct (RBI via PTI); multiples changed from 95 to 94. Gate: fail 1 (remittance figure stale: now net private transfers record $144.8 bn in 2025-26, per RBI BoP data cited in Parliament) → fixed, plus redenomination wording, imports $776 bn/$204 bn, "about 20%" for 2006–08 dropped, Japan ~155 yen, RBI link added → pass 2 (applied: crude import dependence now "record 88.7% in 2025–26 (provisional), government data in Parliament, July 2026" instead of PPAC 88%). Check 7 (no party named, fair): pass both times.
- [What Are Vertices, Faces and Edges? Full Table, Euler's Formula and Curved Solids](https://www.knewspaper.in/post/vertices-faces-edges) (plan #32, education). Gate: pass 1 (verified Ganita Prakash Class 8 Part 2 Ch 4 §4.2 "Visualising Solids" definitions and that it does not name Euler's formula; all counts and the photo-frame example 16/16/32 recounted). Applied optional fixes (existence example wording; mistake 4 replaced).

Not published:
- Plan #30 UTI symptoms and causes (health): failed the gate twice, both times only on attribution: run 1 the NHS cranberry wording and an unsourced NHS "borrow antibiotics" quote; run 2 "children under 2, fever may be the only sign" attributed to the NHS UTI page (it's not there) and "sanitary pads" not in the NHS list. All fixes are applied in `daily/drafts/uti/`; it is NOT in usedPlan/skippedPlan, so the next run should take it as its health topic, run a fresh gate and publish if it passes. (Cleveland Clinic "not contagious" FAQ line wasn't re-verified by gate 2: fetch blocked.)

Skipped plan rows: #28 Atomic Habits Summary (no information gain, same reason as #18); #29 What is a CV (near-duplicate of how-to-make-a-resume, which already has the resume/CV/biodata section and FAQ).

Internal links (5b): why-is-the-rupee-falling-against-the-dollar "not to defend a fixed number" → what-if-1-dollar-equals-1-rupee. Nothing natural found for vertices-faces-edges.

Pre-render deploy: published true, pages 361 → 363, 2 redirects added.

Yesterday's articles (ptsd-symptoms-causes, 12-hour-and-24-hour-clock, guru-nanak-jayanti) reread on the live site by a review agent: no errors found, no changes. Guru Nanak 2026 date (Tue 24 Nov) matches the central gazetted holiday list; 2027 (14 Nov) stays "expected".

Unsure / to check:
- Civics #1: the IMF April 2026 WEO figures ($2,813 nominal, $12,801 PPP) were read via statisticstimes/Scroll, not the IMF datamapper; the October 2026 WEO is out and could update them. The Business Standard 1947 history piece and the Wharton 2008 piece are cited by name, not linked.
- Vertices: the Ganita Prakash chapter text was read from third-party PDF copies (evidyarthi, cbsetamil), not ncert.nic.in.

Image prompts for 2026-11-10:
- What Would Happen If 1 US Dollar Were Equal to 1 Rupee? Explained: create image for this article topic without any text (symbolic scene only, e.g. a rupee coin and a dollar note on a balance scale; no real people)
- What Are Vertices, Faces and Edges? Full Table, Euler's Formula and Curved Solids: create image for this article topic without any text
