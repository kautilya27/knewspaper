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

### 2026-11-10 (later): covers added
The owner sent images for both new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- vertices-faces-edges → c0f544_f60a95fe5a2640728696b9500d9f52f4~mv2.webp
- what-if-1-dollar-equals-1-rupee → c0f544_d6860ed39827469687819e66f99d3730~mv2.webp (the dollar coin shows a George Washington-style portrait and the rupee coin shows "1 ₹", against the civics no-real-people rule and the no-text prompt; the owner approved using it anyway)
Removed both from `pendingImages`; pre-render rebuilt (363 pages, published true).

### 2026-11-10 (later): 5 real-estate articles moved from allinsightz.com (owner's request)
The 5 latest allinsightz.com posts were republished on knewspaper.in in the Real Estate topic, under the Knewspaper Editorial Team, with the same slug, text, featured image and SEO title/description:
- [Modern Homebuying Trends: The Growing Demand for Spacious Homes and Lifestyle Amenities in Mumbai](https://www.knewspaper.in/post/modern-homebuying-trends-the-growing-demand-for-spacious-homes-and-lifestyle-amenities-in-mumbai)
- [Why Emerging Residential Locations Like Mohan Parkland Kalyan Are Attracting First-Time Homebuyers](https://www.knewspaper.in/post/why-emerging-residential-locations-like-mohan-parkland-kalyan-are-attracting-first-time-homebuyers)
- [Top Benefits of Investing in Luxury Villas Near Mumbai](https://www.knewspaper.in/post/top-benefits-of-investing-in-luxury-villas-near-mumbai)
- [How Infrastructure Development Can Influence Plot Values](https://www.knewspaper.in/post/how-infrastructure-development-can-influence-plot-values)
- [Top Factors to Consider Before Buying a Residential Plot](https://www.knewspaper.in/post/top-factors-to-consider-before-buying-a-residential-plot)

How: read from the All InsightZ Wix site (40575a7c-e3f7-4ace-81ef-21a7df2d507b) with the read-post-template.js converter and published with the create-post-template.js code, adapted for a move (owner: keep the text as it is): bold links kept bold; the daily-article checks that would change the text were not applied (FAQ section, written excerpt so Wix makes one as on the source, custom SEO title, 80-character slug limit: two slugs are 98/99 characters); the body copy of the cover image after the first paragraph was dropped (the pre-render drops it anyway). A text check after publishing found every article's text identical to the source. Link colour/underline styling was not carried over.
- Covers imported into knewspaper's Media Manager from the allinsightz files; the body image's alt text became the cover alt text.
- SEO: the 3 posts without a custom SEO title use the post title (as on allinsightz); the other 2 keep theirs minus "| All InsightZ". SEO descriptions unchanged. The AI-generated HowTo schema on the infrastructure post was not carried over.
- Builder project details, builder-site links and phone numbers kept as they are (owner's choice; not marked sponsored).
- Duplicate check: none of the 5 duplicates a knewspaper article. Closest is best-places-for-land-investment (location guide with a short "Legal checks before you buy land" section) vs the residential-plot checklist.
- Not added to state.published, so the daily "reread yesterday's articles" step won't rewrite them.

Pre-render deploy: published true, pages 363 → 368, 5 redirects added.

allinsightz.com: 301 redirects /post/<slug> → https://www.knewspaper.in/post/<slug> for all 5 (no conflicts with its 3 existing redirects), then the 5 posts deleted from the allinsightz blog (moved to the blog trash, restorable from the Wix dashboard; not permanently deleted).

## 2026-11-11 (Wednesday: owner-topic day)

Published (no cover images: Claude in Chrome was not available in this cloud run; both slugs added to `pendingImages`):
- [Urinary Tract Infection (UTI): Symptoms, Causes and When It's an Emergency](https://www.knewspaper.in/post/uti-symptoms-causes) (plan #30, health-fitness; the draft held since 10 Nov). Gate: fail 1 (attribution only: "spermicide with condoms, a diaphragm or a cap" → NHS "spermicide with contraception"; WHO "main drivers" → "driving the development and spread") → fixed, plus NHS children wording, Cleveland Clinic/WHO links, NIDDK "managing blood sugar", catheter in when-to-see-a-doctor → pass 2 (all NHS/NIDDK/ICMR/WHO/Cleveland claims checked on the pages). Applied its suggestion to use the ICMR urine-sample figures: cefotaxime 25.8%, ciprofloxacin 22.4% susceptible (AMRSN 2024, Table 2.14).
- [How Wix Headless Works: A Plain-English Guide for Website Owners](https://www.knewspaper.in/post/how-wix-headless-works) (owner #3, technology; the draft held since 8 Nov). Gate: fail 1 (Help Center wording narrower than "you don't need it"; Astro login needed a hedge because Wix's own pages contradict each other) → fixed → pass 2. Added "(outside Astro)" to the Google/Facebook buttons option.

Not published:
- Plan #34 Job Titles → "Job Titles in India: Designation Hierarchy in Companies, IT, Banks and Government" (career). Failed the gate twice: run 1 Tata Motors 2017 sequence wrong (levels cut 14→5 and designations dropped, then five level-wise titles brought back a month later, per HRKatha); run 2 Pay Level 13 entry pay wrong (₹1,23,100, not ₹1,18,500) and the Lenin Kumar Ray outcome misdescribed (held not a workman because duties were mainly administrative/supervisory and pay above the then wage limit). All fixes are applied in `daily/drafts/job-titles/`; it is NOT in usedPlan/skippedPlan, so the next run should take it as its education/career topic, run a fresh gate and publish if it passes.
- Owner #1 Best Sample Papers (Future Topper as #1): futuretopper.in could not be reached from this cloud run (proxy denied, and no indexed pages for the site in search), so nothing about its sample papers could be verified. Per the row's instructions it was not written. Left out of usedOwner/skippedOwner so a run that can reach the site retries it; the owner may want to check the site is live and indexed. Research notes for the rest of the article (CBSE SQP 2026-27 released 21 Sep 2026; CBSE 2027 date sheet: Class 10 phase 1 16 Feb–9 Mar, Class 12 16 Feb–9 Apr; CISCE 2027 specimen papers 16 Oct 2026; Oswaal/Arihant 2027 editions and prices) were gathered via third-party pages.
- Owner #3 was taken instead as today's owner topic.

Skipped plan rows: #33 Self Improvement (no information gain: hub topic already covered by books-for-self-development, small-habits-big-changes-..., goals-vs-systems, how-to-stop-procrastinating).

Internal links (5b): kidney-stones-symptoms-causes "Repeated urinary tract infections" → uti-symptoms-causes. Nothing natural found for how-wix-headless-works.

Pre-render deploy: published true, pages 368 → 370, 2 redirects added.

Yesterday's articles (what-if-1-dollar-equals-1-rupee, vertices-faces-edges) rechecked by a review agent from the repo copies (the live pages couldn't be fetched): no errors, no changes. Every count and NCERT claim in vertices-faces-edges confirmed.

Unsure / to check:
- Civics #1: the October 2026 IMF WEO may have revised India's GDP per head (a third-party site shows ~$2,750 nominal / ~$12,998 PPP, edition not named; IMF DataMapper not reachable). Remittance figure "$144.8 bn" not re-confirmed (one source gives net transfers $144.07 bn); worth checking against the RBI BoP table.
- UTI: the ICMR AMRSN 2024 PDF was read by the gate agent via WebFetch; figures not re-read by me.

Image prompts for 2026-11-11:
- Urinary Tract Infection (UTI): Symptoms, Causes and When It's an Emergency: create image for this article topic without any text
- How Wix Headless Works: A Plain-English Guide for Website Owners: create image for this article topic without any text

### 2026-11-11 (later): covers added, GEO topic queued
The owner sent images for both new articles. Converted to WebP (1536×1024, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers (with alt text):
- uti-symptoms-causes → c0f544_f6bc6117a1fb456eb388a3fc4463bfa4~mv2.webp
- how-wix-headless-works → c0f544_20e1f05957924140a45abb90862e9315~mv2.webp (shows a "W" app-tile icon resembling the Wix logo; the owner sent it, used as is)
Removed both from `pendingImages`; pre-render rebuilt (370 pages, published true).

Owner's request: queued owner topic #5 "What Is GEO (Generative Engine Optimization) and How to Improve It" with knowthecompany.com recommended (followed link) under the review-sites activity. Owner then asked for it next week: notBefore set to 2026-11-16 (first owner-topic day after that is Wed 18 Nov; rows #1 and #4 come first in order, so it may land Sat 21 or Sun 22).

## 2026-11-12 (Thursday: niche-topic day)

Published (no cover image: Claude in Chrome was not available in this cloud run; slug added to `pendingImages`. Note: the create script reported `cover: true` although no cover was sent; worth a look in the Wix dashboard):
- [Job Titles in India: Designation Hierarchy in Companies, IT, Banks and Government](https://www.knewspaper.in/post/job-titles) (plan #34, career; the draft held since 11 Nov). Gate 3 (fresh agent): PASS, every fact checked (Tata Motors 2017 via HRKatha, PSB scales, IDBI grades, IBPS CSA, S.O. 3964(E), 7th CPC entry pay, 8th CPC, Labour Codes 21 Nov 2025 and ₹18,000 IR Code ceiling, Lenin Kumar Ray 2024 INSC 802). Applied its suggestions: Lenin Kumar Ray reworded (Assistant Engineer, supervisory capacity, ₹1,600 pre-2010 limit), "the Centre can revise it" on the ₹18,000 ceiling, last FAQ trimmed to cut a repeated BGV point.

Not published (both failed the gate twice; all fixes applied in `daily/drafts/`; NOT added to used/skipped lists, so the next suitable run should re-gate and publish them):
- Niche #2 Hornbill Festival → "Hornbill Festival 2026: Dates, Entry Permit, How to Reach Kisama and Where to Stay" (travel, `drafts/hornbill/`). Gate 1: PAP relaxation history wrong (since 2011, not 2022), missing the 2025 festival-only PAP lift, no PAP route (e-FRRO), Myanmar missing from the Feb 2026 advisory, visitor numbers. Gate 2: PAP lift announced 29 Nov 2025 (not 30), fares from one operator blog vs the notified ₹3/km cap and 2024 ANTA Kisama fares (₹120 shared, ₹317–700 reserved), unsourced weather normal, Myanmar wording, FAQ "every year" (2020 online). Time-sensitive: should go out on the next niche day (Mon 16 Nov) before the 1 Dec start; check then whether the Centre has announced a 2026 PAP relaxation and the 2026 ticket price.
- Plan #31 Panic Attacks → "Panic Attacks: Symptoms, Causes, Panic vs Heart Attack and What to Do" (health-fitness, `drafts/panic/`). Gate 1: seoDescription 158 chars; panic/heart-attack duration cells inconsistent and "does not settle on its own" too absolute; two Cleveland Clinic attributions too broad. Gate 2: attributions again (three heart sources credited with risk-factor advice only Mayo partly gives; atypical-symptoms claim; NHS breathing "at least 5 minutes"; symptom list intro; unsourced "tired afterwards"; "fear of dying" occurs in both). Not a near-duplicate of anxiety-symptoms-and-causes (gate confirmed). Next run's health topic.

Skipped plan rows: none.

Internal links (5b): none added today (not checked in this run).

Pre-render deploy: published true, pages 370 → 371, 1 redirect added.

Yesterday's articles (uti-symptoms-causes, how-wix-headless-works) rechecked by a review agent from the repo copies: no errors found (10 facts checked in each against ICMR AMRSN 2024, NHS, Cleveland Clinic, WHO, Wix dev docs and Help Center). No changes.

Run notes: WebFetch was blocked in the main session for part of the run (a permission prompt timed out); review agents could still fetch pages.

Unsure / to check:
- Job titles: TCS/Infosys ladders are as reported by employees and career sites, not official (the article says so).

Image prompts for 2026-11-12:
- Job Titles in India: Designation Hierarchy in Companies, IT, Banks and Government: create image for this article topic without any text

### 2026-11-12 (later): cover added
The owner sent the image for job-titles. Converted to WebP (1536×1024, q80; saved as `daily/images/job-titles.webp`), imported into Wix Media from the repo's raw URL, and set as the cover:
- job-titles → c0f544_b67c5838e2de464498cc5477da3d8515~mv2.webp (faceless org-chart figures, laptop, bank and Parliament-style building; no text)
Removed from `pendingImages`; pre-render rebuilt (371 pages, published true).

### 2026-11-12 (later): 2 more articles at the owner's request
- [Panic Attacks: Symptoms, Causes, Panic vs Heart Attack and What to Do](https://www.knewspaper.in/post/panic-attacks-symptoms-causes) (plan #31, health-fitness). Fresh gate (3rd round): PASS, every attribution checked (NHS, NHS inform, Merck, Mayo x3, AHA 2022, Cleveland Clinic x2, NIMH, MedlinePlus, IJP 2023 NMHS analysis, PIB Tele MANAS; heart disease 5–10 years earlier per a Vascular Health and Risk Management review). Applied its minor suggestions (wording of the Indian heart-disease line, ECG attribution, table trimmed, Mayo "improve within months").
- [Hornbill Festival 2026: Dates, Entry Permit, How to Reach Kisama and Where to Stay](https://www.knewspaper.in/post/hornbill-festival) (niche #2, travel). Fresh gate round 3: FAIL (2024 Kisama fares credited to ANTA instead of the Kohima DC's office; "up from ₹50" overstated) → fixed → round 4: FAIL on one point only (the statewide ₹3/km taxi-fare notification is dated February 24, year not given, not "November 2025") → date removed, PR Hill reserved fare (₹500) separated. Published with the owner's explicit approval despite the brief's two-fails rule, since the only remaining issue was the removed date. All PAP/ILP/FRO facts confirmed in both rounds; PAP still in force with no 2026 relaxation as of 12 Nov.
Both without covers (added to `pendingImages`). Pre-render deploy: published true, pages 371 → 373, 2 redirects added.
To check on the next niche/travel run: whether the Centre announces a 2026 festival PAP relaxation (likely late November) and the 2026 ticket price; update hornbill-festival if so.

Image prompts:
- Panic Attacks: Symptoms, Causes, Panic vs Heart Attack and What to Do: create image for this article topic without any text
- Hornbill Festival 2026: Dates, Entry Permit, How to Reach Kisama and Where to Stay: create image for this article topic without any text

### 2026-11-12 (later): cover for panic-attacks-symptoms-causes
Owner's image converted to WebP (1536×1024, q80; `daily/images/panic-attacks-symptoms-causes.webp`), imported into Wix Media and set as the cover: c0f544_c1cc4da205584cc2b102a735d546aa30~mv2.webp (a distressed woman, symptom icons, a man clutching his chest, a woman meditating; no text). Removed from `pendingImages`. Pre-render not yet rebuilt: waiting for the Hornbill image so both go out in one rebuild.

### 2026-11-12 (later): cover for hornbill-festival
Owner's image converted to WebP (1672×941, q80; `daily/images/hornbill-festival.webp`), imported into Wix Media and set as the cover: c0f544_aa24e29b88aa417bbe2db31739306960~mv2.webp (Naga dancers in front of a morung, with inset circles of a hornbill, a permit card and passport, a hill road and a guesthouse; the passport carries small unreadable lettering, used as sent). Removed from `pendingImages`. Pre-render rebuilt for both new covers (373 pages, published true).

## 2026-11-13 (Friday: civics day)

Published (all three without a cover: Claude in Chrome was not available in this cloud run; slugs added to `pendingImages`; the create script again reported `cover: true` although no cover was sent):
- [Migraine: Symptoms, Causes, Triggers and When a Headache Is an Emergency](https://www.knewspaper.in/post/migraine-symptoms-causes) (plan #35, health-fitness). Gate 1: FAIL (WHO DALY rank is among neurological conditions, not all diseases; Karnataka study sex ratio; AMF "nearly 2 in 3" not "up to 60%"; cluster headache durations) → fixed → gate 2 (fresh agent): PASS; applied its points (aura vs one-sided weakness urgency split, dropped "stopping caffeine" and "vomiting" red flag, Karnataka sex difference given as odds about twice as high).
- [Area of a Triangle Using Trigonometry (½ab sin C): Proof, Worked Examples and Syllabus](https://www.knewspaper.in/post/area-of-triangle-trigonometry) (plan #37, education). Gate 1: FAIL on one line only (JEE Main "properties of triangles dropped in 2024" overstated) → reworded → gate 2: PASS; all worked examples recomputed by both agents.
- [What Is Per Capita Income? India's Latest Figures, State Gaps and the K-Shaped Economy Explained](https://www.knewspaper.in/post/per-capita-income-india) (civics #3, finance). Gate 1: FAIL (IMF per capita rank 140–150 → ~150–155 of ~195 on the Oct 2026 WEO; SIAM figures are dispatches not sales; unsourced carmaker claim; NAS 2026 revision not mentioned) → fixed → gate 2: PASS including civics check 7 (no party or officeholder named; both sides on inequality and K-shape).

Skipped: civics #2 ("Who is Rahul Gandhi? … 'Pappu' label explained") added to `skippedCivics`: a biography of a sitting Leader of Opposition built around a mocking nickname can't be written under the brief's civics rules (no party named, no officeholder praised or criticised by name, no nicknames as fact) without reading as partisan one way or the other. The owner may want to reword or drop that row.

Fix to an earlier article: hornbill-festival (published 12 Nov). The Home Ministry, in a letter dated 4 Nov 2026 (reported by The Morung Express and PTI on 12 Nov), relaxed the Protected Area Regime in Nagaland for 1–10 December every year. Updated the quick answer, at-a-glance table, PAP section, FAQ and excerpt (republished with update-post-template; cover kept). The CM's requests for 15 Nov–15 Dec and a year-round exemption were noted as not granted as of 13 Nov. The reports don't say whether the 2025 nationality exclusions still apply; the article tells those nationals to check.
Other articles from yesterday rechecked by a review agent: job-titles and panic-attacks-symptoms-causes, no errors (the Tele MANAS "20 languages, 24×7" PIB release could not be re-opened).

Internal links (5b): none added; no older article text mentions migraine, per capita income or triangle area in a way where a link fits (headache mentions in depression/ptsd are about those conditions).

Pre-render deploy: published true, pages 373 → 376, 3 redirects added.

Unsure / to check:
- Per capita income: MoSPI's NAS 2026 (31 Aug) trimmed 2025-26 nominal GDP but its press release restates no per capita figure; the article uses the 5 June PE figure (₹2,08,090) and says it may be revised. Update when MoSPI publishes revised per capita NNI (likely with the First Revised Estimates).
- Per capita income: IMF Oct 2026 nominal per capita and the "Bangladesh slightly ahead" point come from news/compilation sites (Scroll, statisticstimes), not the IMF DataMapper directly; World Bank Atlas GNI per capita for India (~$2,760) not stated in the article.
- Migraine: "the odds were about twice as high" (OR 2.1) from the Kulkarni 2015 abstract; the full text could not be opened by the second reviewer.
- Triangle: JEE Main syllabus wording checked via coaching sites, not the NTA bulletin itself.

Image prompts for 2026-11-13:
- Migraine: Symptoms, Causes, Triggers and When a Headache Is an Emergency: create image for this article topic without any text
- Area of a Triangle Using Trigonometry (½ab sin C): Proof, Worked Examples and Syllabus: create image for this article topic without any text
- What Is Per Capita Income? India's Latest Figures, State Gaps and the K-Shaped Economy Explained: create image for this article topic without any text (symbolic scene, no real people: e.g. a rupee coin stack beside a crowd silhouette and a rising/falling arrow)

### 2026-11-13 (later): covers added
The owner sent images for all three new articles. Converted to WebP (1672×941, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- migraine-symptoms-causes → c0f544_a95c24c494614833aa3d9ded5fb0fb27~mv2.webp (a woman holding her temples, brain illustration, trigger icons for sun, coffee, stress and sleep, an emergency inset; no text)
- area-of-triangle-trigonometry → c0f544_7a1dc75767f4452d808144c078bfb4ac~mv2.webp (a student at a desk, a triangle with the included angle marked and one with its height; no text)
- per-capita-income-india → c0f544_41770e00030942feb83079a1e0f6d899~mv2.webp (India map, figures on rising coin stacks, a K-shaped arrow, monument models; no real people; the monument models carry tiny unreadable lettering, used as sent)
Removed all three from `pendingImages`; pre-render rebuilt (376 pages, published true).

## 2026-11-14 (Saturday: owner-topic day)

Published (both without a cover: Claude in Chrome was not available in this cloud run; slugs added to `pendingImages`; the create script again reported `cover: true` although no cover was sent):
- [Bipolar Disorder Symptoms and Causes: Mania vs Hypomania, Types and Indian Data](https://www.knewspaper.in/post/bipolar-disorder-symptoms-causes) (plan #36, health-fitness). Gate 1: PASS (WHO 36 million / 1 in 226 confirmed on the 11 Sep 2026 fact sheet; NMHS 2015-16 analysis, IJP 2023: 0.3% current, 0.5% lifetime, 70.4% treatment gap; DSM-5 durations; IPS 2017 guideline; NIMH 2007 quote; Tele-MANAS; MHCA 2017 s.18). Applied its six precision fixes (NIMH study dated 2007; male/metro odds are for lifetime illness; DSM-5 attribution limited to the hypomania/mania durations; FAQ mood-swing duration matches the table; IPS guideline line reworded without drug-class instruction; "no clear reason" cells softened).
- [How to Build Self-Confidence: What Research Supports (and Which Popular Tips Don't Hold Up)](https://www.knewspaper.in/post/how-to-build-self-confidence) (plan #38, career). Gate 1: FAIL (APA page doesn't rank the four sources → Bandura's own quote, cyc-net link; FAQ overstated power-pose behaviour finding; four unsourced lines softened; "fake it" row moved out of the evidence table) → fixed → gate 2 (fresh agent): PASS; applied its three optional wording fixes and softened the title ("Don't Work" → "Don't Hold Up").

Not published:
- Owner #1 Best Sample Papers (Future Topper as #1): futuretopper.in was reachable today, so it was written (draft in `daily/drafts/sample-papers/`, slug `best-sample-papers`). All Future Topper claims checked out in both gates. Gate 1 FAIL on competitor accuracy (Oswaal classes covered, Educart/Oswaal Class 9 and 11 claims, Arihant ISC 12, Future Topper paper counts, practicals window) → fixed → gate 2 FAIL on smaller competitor points (an AI/Computer Applications sentence implying only Oswaal has them; Educart "includes official SQP" not stated on its page; Oswaal row read as unsolved papers; Future Topper Class 12 paper counts). Per the two-fails rule it was not published. All gate-2 fixes are already applied in the draft. It is NOT in usedOwner/skippedOwner, so the next owner-topic run (Sun 15 Nov) should run a fresh gate on the draft and publish if it passes (owner #5 GEO becomes eligible on 16 Nov).

Rechecked yesterday's articles (migraine-symptoms-causes, area-of-triangle-trigonometry, per-capita-income-india) with a review agent: no errors; all worked examples recomputed; MoSPI has published no newer per capita NNI than the 5 June PE; all internal links 200.

Internal links (5b): depression-symptoms-causes "bipolar disorder" → bipolar-disorder-symptoms-causes. Nothing natural found for how-to-build-self-confidence.

Pre-render deploy: published true, pages 376 → 378, 2 redirects added.

Unsure / to check:
- Bipolar: the WHO "36 million (1 in 226)" figure is the 2023 estimate on the current fact sheet (older versions said 40 million).
- Self-confidence: Brooks paper dated 2014 (print year; online Dec 2013). Kross 2014 checked via the PubMed abstract only.
- Per capita income: MoSPI NAS 2026 "Statement 2" page could not be opened; if it restates 2025-26 per capita NNI, update the article.

Image prompts for 2026-11-14:
- Bipolar Disorder Symptoms and Causes: Mania vs Hypomania, Types and Indian Data: create image for this article topic without any text
- How to Build Self-Confidence: What Research Supports (and Which Popular Tips Don't Hold Up): create image for this article topic without any text

### 2026-11-14 (later): covers added
The owner sent images for both new articles. Converted to WebP (1672×941, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- how-to-build-self-confidence → c0f544_b5f3e0e538ce45618fb56827a6e2d2a0~mv2.webp (a young woman going from self-doubt to confidence, a brain, a checklist, steps to a trophy, a mirror; no text)
- bipolar-disorder-symptoms-causes → c0f544_9d6512f32e714b0b9fe0f03a87ced6e3~mv2.webp (a split portrait of a low and a high mood under a blue/orange brain, symptom insets, an India map and a row of figures; no text)
Removed both from `pendingImages`; pre-render rebuilt (378 pages, published true).

## 2026-11-15 (Sunday: owner-topic day)

Published (without a cover: Claude in Chrome was not available in this cloud run; slug added to `pendingImages`; the create script again reported `cover: true` although no cover was sent):
- [Parkinson's Disease: Early Symptoms, Causes, Young-Onset Cases in India and Look-Alike Conditions](https://www.knewspaper.in/post/parkinsons-disease-symptoms-causes) (plan #40, health-fitness). Gate 1: FAIL (seoDescription 157 chars; "WHO describes levodopa/carbidopa as the most effective" not on the WHO fact sheet → reworded to "most commonly used … on WHO's Model List of Essential Medicines") → fixed → gate 2 (fresh agent): PASS; applied its optional wording (WHO rehab wording, NHS "evidence not conclusive" on environment, DBS Tier 1 cities, GAP-India = 18 hospitals). Information gain: Indian burden (7.71 lakh, ICMR-PHFI-IHME 2019), younger onset in Indian cohorts (GAP-India mean 53.5 y), flunarizine/cinnarizine as a common Indian cause of drug-induced parkinsonism, DBS cost in ₹ (ICMR HTAIn), 108/112 stroke warning.

Not published:
- Owner #1 Best Sample Papers (draft `daily/drafts/sample-papers/`): two fresh gates today. Gate 1 FAIL (Future Topper "papers get harder" true only for Class 10; Educart bundle now ₹1,526) → fixed → gate 2 FAIL on competitor coverage (Oswaal also has Class 11 and 10-paper Class 9 books; Arihant Class 9/11 2026 editions; which publisher has Maths Basic/Hindi/Sanskrit/Computer Applications; CISCE answer keys only for selected subjects; Future Topper free page wording). All gate-2 fixes are applied in the draft. This is the fourth gate failure over two days, always on fine-grained competitor details rather than Future Topper. Still not in usedOwner/skippedOwner. Suggest the owner decides: either let the next owner-day run do one more fresh gate, or trim the competitor table to fewer, easier-to-verify columns.
- Plan #39 Fun Facts About Me (draft `daily/drafts/fun-facts/`): gate 1 FAIL (vague examples, Rubik's cube repeated) → fixed → gate 2 FAIL (core advice too close in structure to resume.io's article; information gain too thin). Added to `skippedPlan`.

Rechecked yesterday's articles (bipolar-disorder-symptoms-causes, how-to-build-self-confidence) with a review agent: no errors; internal links fine.

Internal links (5b): is-it-bad-to-drink-coffee-everyday "Parkinson's disease" → parkinsons-disease-symptoms-causes.

Pre-render deploy: published true, pages 378 → 379, 1 redirect added.

Process note: two review agents fetched pages with curl when WebFetch permission prompts timed out; later agents were told to use only WebSearch/WebFetch.

Unsure / to check:
- Parkinson's: GAP-India figures are from a 2022 congress abstract (interim, crude odds ratios), not a full paper. Indian prevalence range (7 to 328 per lakh) from a 2025 review. PDMDS mentioned without a link or phone number (its site showed injected spam links).

Image prompts for 2026-11-15:
- Parkinson's Disease: Early Symptoms, Causes, Young-Onset Cases in India and Look-Alike Conditions: create image for this article topic without any text

### 2026-11-15 (later): cover added
The owner sent the image for parkinsons-disease-symptoms-causes. Converted to WebP (1671×941, q80; `daily/images/parkinsons-disease-symptoms-causes.webp`), imported into Wix Media from the repo's raw URL, and set as the cover: c0f544_d1bbf40622234e0187a3a5c8d0d1406b~mv2.webp (a blue brain profile with the deep brain highlighted, a trembling hand, insets of a resting tremor, shuffling steps, a masked face and stooped posture, a neuron under a magnifier, brain scans on a clipboard; no readable text, the scan labels are tiny and unreadable, used as sent). Removed from `pendingImages`; pre-render rebuilt (379 pages, published true).

### 2026-11-15 (midday): first run under the new volume rule (owner asked for up to 10 a day; this run was started early at the owner's request and counts as the afternoon run)

Five drafts written in parallel by separate writer agents, each checked by a separate gate agent.

Published (no cover; slug added to `pendingImages`):
- [Area of a Trapezium: Formula, Derivation and Worked Examples (NCERT Class 8 and 9)](https://www.knewspaper.in/post/area-of-a-trapezium) (plan #42, education). Gate 1: FAIL (one line: Merriam-Webster still uses "trapezium" for no parallel sides, not "older American usage") → fixed → gate 2: PASS; all examples recomputed by both agents. NCERT chapter facts (Ganita Prakash II ch. 7, Ganita Manjari I ch. 6) checked via secondary sources only (ncert.nic.in not fetchable).

Held for the next run (failed gate 1 and gate 2 on small points; all gate-2 fixes applied; listed in `state.heldDrafts` for a fresh gate):
- how-to-check-huid-number (niche #3): gate 1 — hallmarking fee now ₹75 (BIS Amendment Regulations, Sep 2026), app hides jeweller while "Available at Jeweller", app now shows gross weight; gate 2 — consumer testing fee is a 2022 figure for un-hallmarked items, Rule 49 attribution.
- best-places-to-visit-in-december-in-india (niche #4): gate 1 — Nagaland ILP online-only since Jan 2025, Jaisalmer/Port Blair normals are WMO not IMD, unverified foreigner 24-hour registration; gate 2 — Pakyong airport has had no scheduled flights since June 2024.
- autism-spectrum-disorder-symptoms-causes (plan #41): gate 1 — DEIC age range, IAP regression wording, girls sentence; gate 2 — DEICs mainly serve children up to 6 (RBSK 2.0 claim couldn't be verified).
- how-to-submit-life-certificate-for-pension (trending: DoPPW Digital Life Certificate Campaign 5.0, deadline 30 Nov): gate 1 — "free" stated as fact, unsupported ill-pensioner line; gate 2 — campaign "priority groups" not in the release, family-pensioner October window unsourced.

Brief: added a hard cap of 10 per India day and a "held drafts first" rule.

Pre-render deploy: published true, pages 379 → 380, 1 redirect added.

Image prompts:
- Area of a Trapezium: Formula, Derivation and Worked Examples (NCERT Class 8 and 9): create image for this article topic without any text

### 2026-11-15 (afternoon): trapezium cover added
Owner's image converted to WebP (1671×941, q80; `daily/images/area-of-a-trapezium.webp`), imported into Wix Media and set as the cover: c0f544_89bdcf9ac12d4a42a58b71756ed703cd~mv2.webp (a shaded trapezium with its height marked on a whiteboard, small diagrams splitting it into triangles and a rectangle, a desk with books, a calculator, a compass and a set square; no text). Removed from `pendingImages`; pre-render rebuilt (380 pages, published true).

### 2026-11-15 (15:36 scheduled afternoon run)
The midday run had been logged as counting for the afternoon, but this scheduled run still fired. The day's total stays under the cap of 10 (6 published today), so this run worked through the held drafts first, as the brief says.

Published (no covers; Claude in Chrome isn't available in this cloud run, so all four slugs went to `pendingImages`. The create script again reported `cover: true` although no cover was sent):
- [Life Certificate for Pensioners 2026: Last Date, How to Submit Online and What If You Miss It](https://www.knewspaper.in/post/how-to-submit-life-certificate-for-pension) (trending, finance). Fresh gate: PASS. Applied its fixes:
  - bank doorstep fee is "₹75 plus GST, check with your bank";
  - re-employed or remarried pensioners can't use any DLC mode (face, fingerprint or iris);
  - phone requirements now quoted from the Jeevan Pramaan FAQ (Android 7+, 4 GB RAM, 5 MP);
  - softened the shorter-gap restoration line.
- [Best Places to Visit in December in India (2026): Weather, Crowds and Permits at a Glance](https://www.knewspaper.in/post/best-places-to-visit-in-december-in-india) (niche #4, travel). Fresh gate: PASS. Applied its fixes:
  - the meta no longer says every temperature normal is IMD's;
  - the Tsomgo snow example is now the Feb 2026 rescue (2,700+ tourists);
  - removed a stray blank line.
  - Checked that MHA hadn't yet answered the CM's request for 15 Nov–15 Dec.
- [How to Check Gold Purity With HUID: BIS Hallmark Marks and the BIS Care App](https://www.knewspaper.in/post/how-to-check-huid-number) (niche #3, fashion). Gate 1 FAIL: the district count was out of date. The Fourth Amendment Order (in force 3 Nov 2026) makes it 398 districts, not 392. Fixed that, dropped the phase count, and made these changes:
  - the HUID-only sales rule now says it applies in mandatory districts;
  - softened the registration step;
  - complaint channels as PIB lists them (BIS Care app, manakonline.in, complaints@bis.gov.in);
  - "old hallmark remains valid" is now attributed to PIB (2023);
  - trimmed the rupee detour.
  - Gate 2 (fresh agent): PASS. Applied one wording fix: the app labels the recorded weight as gross weight.
- [Autism Spectrum Disorder: Symptoms, Causes and Getting Assessed in India](https://www.knewspaper.in/post/autism-spectrum-disorder-symptoms-causes) (plan #41, health-fitness). Gate 1 FAIL: the DEIC description was pre-RBSK 2.0. Under the May 2026 RBSK 2.0 guidelines, DEICs serve 0–18 years, the team includes an audiologist and a special educator, and DEICs refer on to tertiary hospitals. Fixed that and made these changes:
  - the 4 Ds are named in full, with autism under developmental delays;
  - added RBSK 2.0's mental-health screening;
  - "low birth weight" per WHO (NIMH says "very low");
  - new seoTitle.
  - Gate 2: PASS. Applied: anxiety, depression and eating disorders are more common in autistic people generally (NHS), not in girls specifically.

Not published (held):
- Rann Utsav 2026-27 (niche #6, new draft `daily/drafts/rann-utsav/`).
  - Gate 1 FAIL: the draft sent readers to rannpermit.com, which now redirects to an unrelated domain. Fixed:
    - added a warning against look-alike sites;
    - dropped the 2018 vehicle fees;
    - listed only upcoming new moons;
    - distance now 80–85 km;
    - softened the tent-facilities line.
  - Gate 2 FAIL: the official portal still isn't named. Two Oct 2026 sources give rannpermit.gujarat.gov.in, but no agent could open it to confirm.
  - Kept in `heldDrafts`. **Owner: please open rannpermit.gujarat.gov.in once. If it is the Kutch/Gujarat permit portal, the next run can add it and gate again.** Niche #6 added to `usedNiche`.

No new topics beyond these: this run hit the gate-and-fix budget with the four held drafts and one new draft.

Internal links (5b): hornbill-festival, "Inner Line Permit" → best-places-to-visit-in-december-in-india. Not found, so no link added:
- add-vs-adhd → autism (neither "autism" nor "autism spectrum disorder" appears in it);
- how-to-file-itr-online → life certificate ("pension income" doesn't appear in it).

Pre-render deploy: published true, pages 380 → 384, 4 redirects added.

Unsure / to check:
- Life certificate: the UIDAI DLC FAQ PDF couldn't be fetched. "UIDAI says a certificate is not generated if wrong details are entered" rests on it.
- December guide: the Kohima, Shillong, Varanasi and Kochi December normals weren't re-verified against IMD's tables (pages blocked).
- HUID: the AHC consumer testing fee (₹200 for up to 4 articles) is a 2022 figure. The article says to ask for the current rate.
- HUID is filed under "fashion", following the niche row; finance might fit better.

Image prompts:
- Life Certificate for Pensioners 2026: Last Date, How to Submit Online and What If You Miss It: create image for this article topic without any text
- Best Places to Visit in December in India (2026): Weather, Crowds and Permits at a Glance: create image for this article topic without any text
- How to Check Gold Purity With HUID: BIS Hallmark Marks and the BIS Care App: create image for this article topic without any text
- Autism Spectrum Disorder: Symptoms, Causes and Getting Assessed in India: create image for this article topic without any text

### 2026-11-15 (evening): covers for the four afternoon articles
The owner sent all four images. Converted them to WebP (q80, saved in `daily/images/`), imported them into Wix Media from the repo's raw URL, and set them as covers:
- how-to-submit-life-certificate-for-pension → c0f544_206b89846cec4014a62fbca16555ea2e~mv2.webp (an older couple at a laptop, a face-scan screen, a calendar with a circled date, a ticked form, coins; the calendar has small numbers, used as sent)
- best-places-to-visit-in-december-in-india → c0f544_c0a3113c0b22475f97a9738a80d1e300~mv2.webp (a collage of snowy hills, a beach, tea gardens and a lakeside fort around a backpack, woolly cap and binoculars; no text)
- how-to-check-huid-number → c0f544_82e838a4c5de42048a85e652c028c3e3~mv2.webp (a gold bangle under a magnifier showing a BIS-style mark, "22K" and a QR-like code, a phone with a BIS-style logo, scales; the hallmark is stylised: a real HUID is a 6-character code, not a QR code; used as sent)
- autism-spectrum-disorder-symptoms-causes → c0f544_d1d50c83d2bd4aa3a3ab5ee495e1f97f~mv2.webp (a smiling boy at a table with blocks and puzzles, a rainbow infinity sign, a puzzle-piece head on a clipboard; no text)

Removed all four from `pendingImages`.

**The pre-render rebuild FAILED with HTTP 413.** The static site is 19.88 MiB, and Wix static hosting refuses anything over 20 MiB (see `wix-preview/prerender/README.md`). The covers are set in Wix, but the pre-rendered article, topic and blog pages still show the versions without them. Any future publish will hit the same wall.
- Largest removable item: `seo-backups/` (3.43 MB of JSON backups from 4–5 Nov) is served as part of the site but isn't in the repo.
- Owner approved backing up the folder and then removing it from hosting. Downloaded all 115 files from the live site (sizes checked against the Wix listing, every file parses as JSON) into `seo-backups/` in the repo. Then deleted them from hosting: the site went from 19.88 to 16.45 MiB.
- Pre-render rebuilt: published true, 384 pages, covers now on the static pages.
- Headroom is about 3.5 MiB. Each article adds roughly 35–40 KB, so there's room for about 90 more articles before this limit comes back.

### 2026-11-16 (09:36 scheduled morning run)
Monday. No owner-topic day. Daily total so far: 5 of the 10 cap. Claude in Chrome isn't available in this cloud run, so none of the articles has a cover; all five slugs went to `pendingImages`. (The create script again reported `cover: true` although no cover was sent.)

Published:
- [Rann Utsav 2026-27: Dates, Tent City, White Rann Permit and How to Reach Dhordo](https://www.knewspaper.in/post/rann-utsav) (held draft, niche #6, travel).
  - Fresh gate 1: FAIL. Fixes: a vague vehicle-fee line; the unverified "rannpermit.com redirects" claim; the drive time; the Rajwadi Suite basis; the Shaam-e-Sarhad attribution; Diwali week added as a peak period.
  - Gate 2: PASS with fixes. Transfer times now follow the official rannutsav.net packages page (8:15, 10:00, 13:30, 15:30 and 17:30, returns at 4:30 and 9:30). The reviewer found **rannpermit.gujarat.gov.in** in a government-domain search, titled "Online permit for Rann of Kutch". The article now names it (only the government can register a gujarat.gov.in subdomain). Also added: the season surcharges (₹2,000 or ₹4,000), the Darbari Suite (₹70,000 for 4) and new-moon "darkest nights" wording.
- [What Is a Dictatorship and How Did Hitler Come to Power? A Dated Timeline](https://www.knewspaper.in/post/how-did-hitler-come-to-power) (civics #4, history).
  - Gate 1: PASS. Minor fixes applied: the Competitive authoritarianism label; the Arthashastra wording; unemployment figure "about six million by the winter of 1932"; dropped two Britannica credits it couldn't confirm.
  - No Indian party named; the 1975–77 Emergency appears only as the reason for the 44th Amendment.
- [Old vs New Tax Regime FY 2026-27: Which Is Better at Your Salary? (Break-Even Table)](https://www.knewspaper.in/post/old-vs-new-tax-regime) (niche #5, finance).
  - Gate 1: PASS. The reviewer recomputed every figure independently.
  - Fixed the marginal-relief comparison (₹63,750 / ₹66,300 with cess) and rewrote the seoDescription to drop an imprecise range.
- [Central Government Holiday List 2027: Gazetted, Restricted Holidays and Long Weekends](https://www.knewspaper.in/post/central-government-holiday-list) (niche #7, fesrival).
  - Source: DoPT OM 12/2/2023-JCA of 16 July 2026, via the Department of Posts' official copy.
  - Gate 1: PASS. All 49 rows and weekdays were checked against the OM.
  - Excerpt now says "49 holidays" (there are 47 distinct dates). Added the National and Festival Holidays Act note to the private-companies FAQ.
- [Hobbies and Interests for Your Resume: What to Write, What to Skip and How to Prove It](https://www.knewspaper.in/post/hobbies-and-interests-for-resume) (plan #44, career).
  - Gate 1: PASS. Information gain: NCC incentive marks (SSC GD 2022 corrigendum), NSS 120 hours plus camp, DoPT sports-quota Forms 1–5, and a by-situation table.
  - Dated the DoPT OM (4 Mar 2024). Removed the "grade" from the NCC line.

Held, not published:
- Anaemia (plan #45, `daily/drafts/anaemia/`).
  - Gate 1 FAIL. Fixed: Anaemia Mukt Bharat is now "Anemia Mukt Bharat Abhiyaan" with a 7x7x7 strategy (guidelines of 29 June 2026, confirmed via ThePrint and Drishti). Also added: NFHS-6 (May 2026) has no anaemia data, and an ICMR venous-blood survey is pending. The WHO 2024 altitude adjustment now starts at 500 m, plus smokers. The sickle cell mission wording, the NHS symptom wording and the FAQ heading were fixed too.
  - Gate 2 FAIL only because two recent PIB links couldn't be confirmed to open the right releases. Both links were removed and the claims kept as plain text.
  - Not published today (it would have been the 6th article this run). Added to `heldDrafts` for the afternoon run's fresh gate.

Skipped: plan #43 ("Nothing Will Work If You Don't Believe in It"). It is a James Clear essay title, with no information gain over how-to-build-self-confidence and goals-vs-systems.

Yesterday's articles rechecked (2 review agents):
- parkinsons-disease-symptoms-causes: the ICMR DBS brief says "available only in Tier 1 cities". Republished with that wording.
- how-to-check-huid-number: 9K is now a mandatory hallmarking grade (added July 2025; a November 2026 government update counts seven grades). Republished the grade sentence and table row. The reviewer also saw the www.pib.gov.in link for PRID=1904262 open a different release, while the version without www. was correct. The link was kept as is, because the update script requires existing external links to stay unchanged.
- area-of-a-trapezium, how-to-submit-life-certificate-for-pension, best-places-to-visit-in-december-in-india, autism-spectrum-disorder-symptoms-causes: OK.

Internal links (5b), all 5 added:
- best-places-to-visit-in-december-in-india, "The Rann Utsav tent city" → rann-utsav
- guru-nanak-jayanti, "list of gazetted holidays" → central-government-holiday-list
- how-to-file-itr-online, "new tax regime" → old-vs-new-tax-regime
- union-budget-2024, "new tax regime" → old-vs-new-tax-regime
- how-to-make-a-resume, "NCC" → hobbies-and-interests-for-resume (a short anchor; change it if it reads oddly)

Pre-render deploy: published true, pages 384 → 389, 5 redirects added. The patch payload was 17.16 MB (content bytes, not the hosted-size figure).

Unsure / to check:
- Rann Utsav: no agent could open rannpermit.gujarat.gov.in itself. It is named from a government-domain search result and 2026 guides. The child permit rate is still the 2018 figure.
- Tax regime: the section 124 (NPS) and 126 (health insurance) numbers rest on Business Today and taxheal. The HRA exemption's new section number isn't given.
- Holidays: the bank-holiday line (Negotiable Instruments Act, RBI state lists) is general knowledge and wasn't checked against an RBI page.
- Hobbies: NCC incentive marks were checked against the 2022 SSC GD corrigendum, not the 2026 notice. The article tells readers to check the current notice.

Image prompts:
- Rann Utsav 2026-27: Dates, Tent City, White Rann Permit and How to Reach Dhordo: create image for this article topic without any text
- What Is a Dictatorship and How Did Hitler Come to Power? A Dated Timeline: create image for this article topic without any text (symbolic scene only, no real person: an empty, dim parliament chamber with an empty podium and a half-closed old constitution)
- Old vs New Tax Regime FY 2026-27: Which Is Better at Your Salary? (Break-Even Table): create image for this article topic without any text
- Central Government Holiday List 2027: Gazetted, Restricted Holidays and Long Weekends: create image for this article topic without any text
- Hobbies and Interests for Your Resume: What to Write, What to Skip and How to Prove It: create image for this article topic without any text

### 2026-11-16 (late morning, owner request): Rahul Gandhi profile
Owner asked in chat to publish civics #2 "in a positive way for Rahul Gandhi". This is an owner exception to the 2b rules: the piece names his own party (Indian National Congress) and gives him an appreciative emphasis. No other party or politician is named, and a short, sourced criticism section is kept for fairness.
- Published [Who Is Rahul Gandhi? Education, Career, Yatras and Role as Leader of Opposition](https://www.knewspaper.in/post/who-is-rahul-gandhi) (civics #2, sociology-and-society). No cover; slug added to `pendingImages`.
- What it covers:
  - his education, checked against sources (Rollins 1994; Cambridge M.Phil 1995, confirmed by the Vice-Chancellor in 2009);
  - a dated career table;
  - the two yatras;
  - what supporters credit him with;
  - a table of four clips that fact-checkers found to be cut or misattributed (Alt News ×3, BOOM);
  - a brief criticism section.
- Gate 1: PASS, with 4 small fixes applied:
  - the AIR budget-speech wording;
  - The Diplomat's framing;
  - the exact quote "I met lakhs of people, talked to them";
  - the source for the "Vinci" surname.
- Also added "apart from a disqualification of about four months in 2023" to the Quick answer.
- Removed #2 from `skippedCivics` and added it to `usedCivics`. Today's total is 6 of 10.
- The pre-render rebuild was not run for this one article; the afternoon run's rebuild will add it.

Image prompt:
- Who Is Rahul Gandhi? Education, Career, Yatras and Role as Leader of Opposition: create image for this article topic without any text (symbolic scene, no real person: a dusty rural road at dawn with footprints, a small tricolour on a bamboo pole, a faint Parliament outline; no party symbols)

### 2026-11-16 (midday): covers from the owner
The owner sent six images. Five were converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- who-is-rahul-gandhi → c0f544_80655794a9c84fb19ce9b4773dd70cf6~mv2.webp
  - Shows: a university building, a road lined with tricolours, a crowd with flags, Parliament, a podium, a graduation cap with books, and a chair bearing the Lion Capital emblem.
  - No identifiable person, and the crowd is generic.
- hobbies-and-interests-for-resume → c0f544_2cd7a7611a1b4f8bbe567e83f92d76ba~mv2.webp
  - Shows: a laptop with a CV and hobby icons, tick and cross flip-charts, a camera, a trophy, a medal and a certificate.
  - No readable text.
- central-government-holiday-list → c0f544_86f6559fd8f44dc3bf9f9ef664d8561c~mv2.webp
  - Shows: a desk calendar with circled dates, a Lion Capital statue, Rashtrapati Bhavan-style buildings, holiday photos and a suitcase.
  - The calendar header has small garbled pseudo-letters. Used as sent.
- rann-utsav → c0f544_c23c6226348a421ba1d61694f894a9e3~mv2.webp
  - Shows: a tent city on the white salt at sunset, lanterns, a decorated camel and an illuminated arch.
  - No text.
- old-vs-new-tax-regime → c0f544_8cc558a783ca4cc4bca3d9a5718f1af8~mv2.webp
  - Shows: a balance scale with a calculator and checklist on one side and a % sign with a document on the other, coins, a piggy bank and a rising chart.
  - No text.

Removed all five from `pendingImages`. The pre-render rebuild is left to the 15:36 run.

Not set: how-did-hitler-come-to-power. The image shows a large realistic portrait of Hitler, a Nazi salute and several swastika banners.
- This breaks the civics image rule (2b): symbolic scene only, no real person.
- Large Nazi symbols also risk ad-network policy problems on an AdSense site.
- Converted to `daily/images/how-did-hitler-come-to-power.webp` but not committed or uploaded. Asked the owner whether to use it anyway or make a new image.

Owner's answer: make a new Hitler-article image. Their image was discarded, and the slug stays in `pendingImages`. Prompt to use: "What Is a Dictatorship and How Did Hitler Come to Power? A Dated Timeline: create image for this article topic without any text, without any real people and without Nazi symbols — a symbolic scene such as an empty 1930s parliament chamber with a torn constitution on the podium"

New image from the owner for how-did-hitler-come-to-power, converted to WebP (1670×942, q80) and set as the cover: c0f544_bb10f6aa9562450da6363f347d74f78e~mv2.webp. It shows an empty, sunlit parliament chamber, a podium with two microphones and a torn charter, a gavel, old books and a chain. It has no real people and no Nazi symbols. The charter has small unreadable pseudo-text, used as sent. Removed from `pendingImages`, which is now empty. The pre-render rebuild is left to the 15:36 run.

### 2026-11-16 (afternoon run, 15:36 IST)
Day total before this run: 6 of 10, so at most 4 this run. Chrome/ChatGPT tools were not available in this cloud run, so no images were made.
- Held draft first: [Anaemia (Anemia): Symptoms, Causes, Haemoglobin Levels and India's NFHS-5 Data](https://www.knewspaper.in/post/anemia-symptoms-causes) (plan #45, health-fitness). Fresh gate: PASS (WHO 2024 cut-offs, NFHS-5/NFHS-6 gap, AMB 7x7x7, NHS signs all re-checked). One wording fix: "most" → "many Indian government documents". Published, no cover.
- [Carpet Area vs Built-Up Area vs Super Built-Up Area: RERA Rules and a Worked Example](https://www.knewspaper.in/post/carpet-area-vs-built-up-area) (niche #8, real-estate). Gate 1: PASS (RERA 2(k), 4(2)(h), 11(2), 13(1) checked against India Code; MahaRERA Order 38/2022; Gurugram 2021 regulations; Anarock loading figures; arithmetic). Applied two optional wording fixes (Bihar "agreement format"; "Haryana Real Estate Regulatory Authority, Gurugram"). Published, no cover.
- Held for the next run (failed the gate twice, fixed both times; now in `heldDrafts`):
  - Area of a Circle (plan #47): gate 1 FAIL (Archimedes polygons around, not inside; Class 7 Ganita Prakash has no area chapter), gate 2 FAIL (unverified "pizza sizes in India are quoted in inches"). Both fixed.
  - JEE Main vs JEE Advanced (niche #9): gate 1 FAIL (JEE Advanced 2027 already announced: IIT Delhi, 23 May 2027; IIT seats 18,826 + IISc 125), gate 2 FAIL (2027 eligibility published on jeeadv.ac.in on 13 Nov 2026). Article updated to 2027 rules.
- No trending topic this run (stopped at the gate results rather than add a fifth draft).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 392 article pages (390 + 2), redirects 3 changed/3 ok (includes this morning's who-is-rahul-gandhi).
- Both new slugs added to `pendingImages`. Note: the create script returned `cover: true` for both although no cover was sent; recorded as cover false.
- Unsure: Anarock's loading % is read as a share of super area (Business Standard doesn't say so explicitly); the Haryana 5%/90-day clause is from a document on the Haryana RERA portal; NFHS-4 non-pregnant women 53.2% was matched from memory of the fact sheet by the reviewer.

Image prompts:
- Anaemia (Anemia): Symptoms, Causes, Haemoglobin Levels and India's NFHS-5 Data: create image for this article topic without any text
- Carpet Area vs Built-Up Area vs Super Built-Up Area: RERA Rules and a Worked Example: create image for this article topic without any text

### 2026-11-16 (evening): covers from the owner
The owner sent both images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- carpet-area-vs-built-up-area → c0f544_adafa638c87b4bca9643b0f4a3528158~mv2.webp (three 3D floor-plan models with blue, yellow and purple outlines for carpet, built-up and super built-up area, scales of justice, a gavel, a model house, a calculator, apartment towers behind; no readable text).
- anemia-symptoms-causes → c0f544_b767a6a3b83c4700b03e11b8e7a64a96~mv2.webp (a blood drop with red cells magnified, spinach, pomegranate, lentils, chana, jaggery and beetroot, a clipboard gauge, blood tubes, a stethoscope, a stylised map of India and charts; no text).
Both removed from `pendingImages` (now empty). The pre-render rebuild is left to the next run (17 Nov morning), so the pre-rendered pages show the covers from then.

### 2026-11-17 (morning run, 09:36 IST)
Day total before this run: 0 of 10. Chrome/ChatGPT tools were not available in this cloud run, so no images were made (step 6 skipped; `pendingImages` was empty before this run).
- Held drafts first (fresh gate each):
  - [Area of a Circle: Formula, Why It Is πr², 22/7 vs 3.14 and Worked Examples](https://www.knewspaper.in/post/area-of-a-circle) (plan #47, education). Gate: PASS (all arithmetic, Ganita Manjari Class 9 Ch 6 mapping, Nīlakaṇṭha credit, Class 7/8 books re-checked). Two optional wording fixes applied (Archimedes' polygon argument; "Approximating π this closely is old"). Published, no cover.
  - [JEE Main vs JEE Advanced: Differences in Eligibility, Pattern, Colleges and Ranks (2027)](https://www.knewspaper.in/post/jee-main-vs-jee-advanced) (niche #9, education). Gate: PASS (2027 eligibility on jeeadv.ac.in, JEE Main 2027 dates, category split, 2026 percentiles, rank-list minimums, JoSAA 2026 seats, 75% rule). Fixes: "announced in November 2026" instead of the unconfirmed 13 Nov date; NIT home-state quota wording. Published, no cover.
- Civics #5: [Is Controlling the News Media a Sign of Dictatorship? Press Freedom and India's Constitution](https://www.knewspaper.in/post/media-control-and-dictatorship) (sociology-and-society). Gate 1 FAIL: Fact Check Unit case shown as settled (Supreme Court issued notice 10 Mar 2026, no stay, pending); RSF quote cut ("…that are mostly allied with the government"); Freedom House paraphrase overstated; "anti-national" label in the checklist; 44th Amendment attribution. All fixed. Gate 2: PASS (7th civics check passed: no party, no officeholder named, counter-views given). Optional fixes applied (Sakal Papers wording; Mérték Média). Published, no cover.
- Niche #10 (CEIR lost-phone block): gate 1 FAIL (masked Aadhaar required; per-state launch date; unverified status-page claim; markdown table bug; "wipe first" against Apple advice; who can unblock). Fixed. Gate 2 FAIL on one sentence ("can't locate it after erasing" is wrong for iPhones on iOS 15+). Fixed and moved to `heldDrafts` for a fresh gate next run (it failed twice, so not published today).
- Not taken this run (stopped at 3 published + 1 held rather than start more drafts): further niche rows, plan rows (#46 NPD is a duplicate of narcissistic-personality-disorder-what-it-actually-is-and-how-to-recognise-it and should be skipped next time it comes up), trending topics. Owner topics: not an owner day (Tuesday).
- Recheck of yesterday's 8 articles (2 review agents; live pages couldn't be fetched by the agents, so the published markdown was checked):
  - rann-utsav: fixed. The permit step now tells readers to check the address ends in gujarat.gov.in, and to ask the tent operator or buy at Bhirandiyara if the portal doesn't open (rannpermit.gujarat.gov.in is still only confirmed through a government-domain search result).
  - who-is-rahul-gandhi: fairness fix. The intro now says "what supporters credit him with and what critics say", and the criticism section adds the pending National Herald money-laundering case (trial court declined cognisance of the ED chargesheet in Dec 2025; ED appeal pending in Delhi HC; All India Radio News, July 2026).
  - how-did-hitler-come-to-power, old-vs-new-tax-regime, central-government-holiday-list, hobbies-and-interests-for-resume, anemia-symptoms-causes, carpet-area-vs-built-up-area: OK (arithmetic, holiday dates, RERA sections, WHO cut-offs, dates re-checked).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 395 article pages (392 + 3), redirects 3 changed/3 ok. This also brings in yesterday's owner covers.
- All three new slugs added to `pendingImages`. The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: rannpermit.gujarat.gov.in (see above); JEE Main "13 languages" not re-verified by the gate; the anaemia WHO altitude/smoker adjustments and sickle-cell mission figures were confirmed from the reviewer's knowledge, not a fetched page.

Image prompts:
- Area of a Circle: Formula, Why It Is πr², 22/7 vs 3.14 and Worked Examples: create image for this article topic without any text
- JEE Main vs JEE Advanced: Differences in Eligibility, Pattern, Colleges and Ranks (2027): create image for this article topic without any text
- Is Controlling the News Media a Sign of Dictatorship? Press Freedom and India's Constitution: create image for this article topic without any text (symbolic scene, no real person: e.g. a newspaper press with a padlock and an open constitution, an empty podium with microphones; no flags of parties or countries' leaders)

### 2026-11-17 (late morning): covers from the owner
The owner sent all three images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- area-of-a-circle → c0f544_c166614ce1dc471dae0d159183d08f24~mv2.webp (a shaded circle with its radius in red on paper, a compass, protractor, books, a calculator and two π sticky notes; the calculator keys have small garbled labels, used as sent).
- jee-main-vs-jee-advanced → c0f544_5954758132d44f569529f891357aa587~mv2.webp (two campuses split down the middle, an OMR sheet and a physics/chemistry worksheet, a signpost and a balance, four icons below; the papers and one building sign carry small pseudo-text, used as sent).
- media-control-and-dictatorship → c0f544_5145a168aaa644e6b0b8b2735bf07dee~mv2.webp (a camera, microphone and newspapers wrapped in chains with a padlock; a constitution-style book with the Lion Capital emblem and Parliament outline, scales of justice and a tricolour; a faceless silhouette behind bars in the background). No real or identifiable person, no party symbols. Note: it uses the State Emblem, as the Rahul Gandhi cover did.
All three removed from `pendingImages` (now empty). The pre-render rebuild is left to the 15:36 run, so the pre-rendered pages show these covers from then.

### 2026-11-17 (afternoon run, 15:36 IST)
Day total before this run: 3 of 10, so at most 5 this run; 5 published (day total 8). Chrome/ChatGPT tools were not available in this cloud run, so no images were made. Drafts were written by separate drafting agents and each was checked by a fresh, independent gate agent (WebSearch/WebFetch only).
- Held draft first: [Lost or Stolen Phone? How to Block It on Sanchar Saathi (CEIR) and Help Police Trace It](https://www.knewspaper.in/post/block-lost-phone-ceir) (niche #10, technology). Fresh gate: PASS on facts (DoT CEIR manual, sancharsaathi.gov.in, Apple/Google support re-checked) with required format fixes: inline code removed (KYM SMS format now "KYM" + IMEI with no space), and three form-only claims (masked Aadhaar, never-used phone → District Nodal officer, State/UT launch date) now attributed as "the form currently…". Also: TRAI 24-hour SMS wait on a re-issued SIM added; handset figures attributed to a communications ministry release reported by DD News (not PIB); title changed to "…and Help Police Trace It". Published, no cover.
- [What is BODMAS? Full Form, Rule, Left-to-Right Trap, 'Of' and Worked Examples](https://www.knewspaper.in/post/what-is-bodmas) (plan #52, education). Gate: PASS (all sums recomputed; NCERT Ganita Prakash Class 7 Ch 2 verified; Excel/Python precedence). Optional fixes applied ("of" as Indian exam convention; "comments split"). Python examples reworded in words because the publisher would turn "**" into bold. Published, no cover.
- [Early Symptoms of Pregnancy: Signs, Timeline, When to Test and What to Do Next in India](https://www.knewspaper.in/post/early-symptoms-of-pregnancy) (plan #50, health-fitness). Gate: PASS (NHS, NICHD, WHO 2016 ANC, MCP card, PMSMA, JSSK all checked; no doses). Optional fixes applied (NHS PMOS name; ectopic "discomfort when peeing or pooing"). Published, no cover.
- [CTC vs In-Hand Salary: How to Calculate Take-Home Pay Under the New Labour Codes](https://www.knewspaper.in/post/ctc-to-in-hand-salary) (niche #11, career). Gate 1 FAIL: capped-PF column overstated what the Labour Codes do to take-home (rise only versus an old full-basic PF structure; like-for-like capped it falls ~₹400/₹500 a month). Fixed. Gate 2 PASS with one required clarification (also note the ₹15,000 → ₹25,000 EPF ceiling rise from 17 Sep 2026 lifts a capped employee's PF by up to ₹1,200 a month); applied, plus gratuity "earlier on death or disablement". Published, no cover.
- [Indian Spices Names in English, Hindi and Regional Languages (With Commonly Confused Pairs)](https://www.knewspaper.in/post/spices-names-in-english-and-hindi) (niche #12, food). Gate 1 FAIL: radhuni's accepted name is now *Psammogeton involucratum* (syn. *Trachyspermum roxburghianum*). Fixed, plus biryani-link sentence, Indian dill attribution, Gujarati Surva, nigella Gujarati/Marathi names. Gate 2 PASS; optional fixes applied (Malayalam Kaduku; ajwain Malayalam "Ayamodakam" only; "kabab chini" for allspice in Bengali and Hindi usage; source named as Gernot Katzer's Spice Pages, not linked; generic closing line cut). Published, no cover.
- Plan #46 (NPD symptoms/causes) skipped: duplicate of narcissistic-personality-disorder-what-it-actually-is-and-how-to-recognise-it.
- No trending topic this run (the run's limit of 5 was reached). `heldDrafts` is now empty.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 400 article pages (395 + 5), redirects 5 changed/5 ok. This also brings in this morning's owner covers (area-of-a-circle, jee-main-vs-jee-advanced, media-control-and-dictatorship).
- All five new slugs added to `pendingImages`. The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: CEIR form-only details (masked Aadhaar, District Nodal officer, launch-date limit) could not be re-checked on the live form, so they are attributed to the form; spices: radhuni has no confirmed Gujarati/Marathi/Malayalam names (left "–"), and the Elwendia persica native range was not fetched from POWO directly; CTC: a 50% basic is treated as the minimum, and professional tax uses Maharashtra/Karnataka's ₹2,500 a year; pregnancy: WHO's 12-week first contact is quoted from WHO (the Indian MCP card says "first trimester").

Image prompts:
- Lost or Stolen Phone? How to Block It on Sanchar Saathi (CEIR) and Help Police Trace It: create image for this article topic without any text
- What is BODMAS? Full Form, Rule, Left-to-Right Trap, 'Of' and Worked Examples: create image for this article topic without any text
- Early Symptoms of Pregnancy: Signs, Timeline, When to Test and What to Do Next in India: create image for this article topic without any text
- CTC vs In-Hand Salary: How to Calculate Take-Home Pay Under the New Labour Codes: create image for this article topic without any text
- Indian Spices Names in English, Hindi and Regional Languages (With Commonly Confused Pairs): create image for this article topic without any text

### 2026-11-17 (evening): covers from the owner
The owner sent all five images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- block-lost-phone-ceir → c0f544_bf7a89045de8458aab1d5bd826e7fc3a~mv2.webp (a locked phone, a laptop showing block → trace → police icons under an orange-and-green logo-like mark, a phone map with a pin, a police beacon and a station building; no readable text, used as sent).
- what-is-bodmas → c0f544_4ff7bf41a94147898b92b270b9965ae5~mv2.webp (a notebook with ( ), a², ×÷ and +− tiles pointing at (8 + 4) × 3² ÷ 6 − 5; the only text is the maths, which is correct notation; calculator keys have small garbled labels, used as sent).
- early-symptoms-of-pregnancy → c0f544_6251c514056d4a06b00a82eaa79025fd~mv2.webp (a calendar with a circled day, a positive test, an ultrasound print, knitted booties; tiny unreadable calendar labels).
- ctc-to-in-hand-salary → c0f544_0fcc967627cb4bc2a81824974e2aac18~mv2.webp (two clipboards with ticks and minus signs either side of a calculator, a money bag and rupee notes, scales and a gavel; garbled calculator keys and note print, used as sent).
- spices-names-in-english-and-hindi → c0f544_5b432f4af9b9465788d58c7a6ecb153d~mv2.webp (a wooden masala dabba with whole and ground spices, cinnamon, cardamom, cloves, star anise, nutmeg, bay leaves, ginger and garlic; no text).
All five removed from `pendingImages` (now empty). The pre-render rebuild is left to the 18 Nov morning run, so the pre-rendered pages show these covers from then.

### 2026-11-18 (morning run, 09:36 IST; Wednesday: owner-topic day)
Day total before this run: 0 of 10. 3 published. Chrome/ChatGPT tools were not available in this cloud run, so no images were made (step 6 skipped). Drafts were written by separate drafting agents; each was checked by a fresh, independent gate agent (WebSearch/WebFetch only). Many WebFetch calls in this run failed with "permission request not answered in time" (unattended run), which blocked both owner topics.
- Civics #6: [Does a Leader Who Gives No Press Conferences Avoid Accountability? An Opinion](https://www.knewspaper.in/post/press-conferences-and-accountability) (sociology-and-society). Gate 1: PASS (all 7 checks; American Presidency Project counts, PMQs, BPK, Japan Times, AP/PBS, Hans India column, The Wire, Business Standard, PTI, Al Jazeera, Newslaundry, AIR Mann Ki Baat count). Labelled opinion; no party or current officeholder named; government's stated reasons quoted. Optional fixes applied: UK Parliament link moved off webtest.parliament.uk; 17 May 2019 wording ("appeared and spoke … passed questions to the party president"); Mann Ki Baat "almost every month"; White House citation NPR instead of VOA; vague Japan source dropped. Published, no cover.
- Niche #14: [How to Identify a Pure Silk Saree: Silk Mark Label, Zari Checks and Tests That Actually Work](https://www.knewspaper.in/post/how-to-identify-pure-silk-saree) (fashion). Gate 1 FAIL: eri share "64%" was 2010-11 data → "about 80% (2023-24, Ministry of Textiles)"; also softened three unverified details (SMOI premises inspection, test certificate, "Pulwama"). The silkmarkindia.com link was removed (its pages carry injected casino/pharma spam); the site is named but not linked. Gate 2: PASS. Published, no cover.
- Plan #48: [SWOT Analysis Explained: Indian Examples, the TOWS Action Step and Interview Answers](https://www.knewspaper.in/post/swot-analysis) (career). Gate 1 FAIL: FSSAI threshold outdated (₹12 lakh → ₹1.5 crore registration limit from 1 Apr 2026, FSSAI press release 13 Mar 2026); JMH paper misdescribed (it dates SOFT→SWOT to SRI's 1966 seminars); Humphrey "key early clue" unverified. Fixed. Gate 2: PASS with two required clarifications (home bakery needs FSSAI registration from day one; all three examples labelled illustrative), applied. Published, no cover.
- Niche #13 Makar Sankranti 2027 (draft `daily/drafts/makar-sankranti/`): gate 1 FAIL (Kashmir "Shishur" row conflated a separate ceremony) → row removed; gate 2 FAIL (Mercier/Times of India attributions not on Wikipedia) → reattributed to Wikipedia. Not published (two fails); added to `heldDrafts` for a fresh gate next run (time-sensitive: 14–15 Jan 2027). All dates, punya kaal times and DoPT holiday claims passed both gates.
- Owner #5 GEO (knowthecompany.com): not written. knowthecompany.com could not be fetched (WebFetch permission timed out), and the row says skip if it can't be reached. Left out of usedOwner/skippedOwner so the next owner-day run (Sat 21 Nov) retries; the owner wanted it this week.
- Owner #1 Best Sample Papers: fifth gate FAIL. Oswaal Class 9 (5-paper 2027 books, not 10), Oswaal Class 11 (only 2026 editions), "Educart widest range" false (Oswaal sells the same extra subjects plus AI and IT), 4 internal links (max 3). All fixed in the draft. futuretopper.in could not be fetched today, so the Future Topper section was not re-verified. Still not in usedOwner/skippedOwner.
- No trending topics this run (stopped after 3 published + 1 held).
- Recheck of yesterday's 8 articles (2 review agents, local final drafts):
  - block-lost-phone-ceir: fixed. The 24-hour SMS bar on a re-issued SIM is a DoT rule (formal instructions of 27 Sep 2022), not TRAI.
  - ctc-to-in-hand-salary: fixed. With a fixed CTC, the EPF ceiling rise can cut take-home by up to ₹2,400 a month (employee + employer ₹1,200 each), not only ₹1,200.
  - area-of-a-circle, jee-main-vs-jee-advanced, media-control-and-dictatorship, what-is-bodmas, early-symptoms-of-pregnancy, spices-names-in-english-and-hindi: OK (all arithmetic recomputed; dates and rules re-checked).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 403 article pages (400 + 3), redirects 3 changed/3 ok. This also brings in yesterday evening's owner covers.
- All three new slugs added to `pendingImages`. The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: press conferences: Nehru/Rajiv/Rao/Vajpayee details rest on one 2024 Hans India column (attributed in the text); RTI wording from Business Standard/IANS and Logically Facts. Silk: "free confirmatory test" for Silk Mark sarees is from Wikipedia/secondary sources (SMOI's FAQ only says testing is available); Kanchipuram zari figures from a partly garbled GI application scan (match a 2012 FashionUnited report). SWOT: Weihrich 1982 and Hill & Westbrook citation details from Wikipedia's references; live knewspaper.in pages could not be fetched by gate agents, so duplicate checks used slugs.

Image prompts:
- Does a Leader Who Gives No Press Conferences Avoid Accountability? An Opinion: create image for this article topic without any text (symbolic scene, no real person: e.g. an empty podium with many microphones facing rows of empty press chairs; no flags, party symbols or leaders)
- How to Identify a Pure Silk Saree: Silk Mark Label, Zari Checks and Tests That Actually Work: create image for this article topic without any text
- SWOT Analysis Explained: Indian Examples, the TOWS Action Step and Interview Answers: create image for this article topic without any text

### 2026-11-18 (late morning): covers from the owner
The owner sent all three images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- swot-analysis → c0f544_0c817153a3984fadb3c042a9e3911722~mv2.webp (a clipboard with green/yellow/blue/red quadrant icons, an arrow to a target-and-checklist clipboard, a Mumbai skyline with the Gateway of India). Note: the laptop screen shows real brand logos (Flipkart, Airtel, Tata) and the BSE building; used as sent.
- how-to-identify-pure-silk-saree → c0f544_3182dda478154abf811dcd6aad65db3a~mv2.webp (a magenta silk saree with gold zari, a magnifier, and four insets: a butterfly-logo tag, zari threads, a burn test, a water-drop test; no text). The tag's logo is generic, not the real Silk Mark.
- press-conferences-and-accountability → c0f544_5042b0a13acf40a99b16ff8e9bd811d2~mv2.webp (an empty podium with microphones and cameras, an empty chair, a domed government building, and a faceless male silhouette shadow on a wall). No identifiable person or party symbol; mic flags carry small garbled pseudo-text.
All three removed from `pendingImages` (now empty). The pre-render rebuild is left to the 15:36 run, so the pre-rendered pages show these covers from then.

### 2026-11-18 (afternoon run, 15:36 IST; Wednesday)
Day total before this run: 3 of 10. 4 published (day total 7). Chrome/ChatGPT tools were not available in this cloud run, so no covers; all four slugs added to `pendingImages`. Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only; several WebFetch calls again timed out on permission, agents used other sources). Owner and civics topics are morning-only, so not taken.
- Held draft, niche #13: [Makar Sankranti 2027: Date, Punya Kaal and What It Is Called in Every State](https://www.knewspaper.in/post/makar-sankranti) (fesrival). Fresh gate: PASS (Drik Panchang 9:14 pm / 15 Jan, Delhi punya kaal, DoPT RH list via staffnews.in, Wikipedia regional names). Optional fixes applied: drift sentence reworded, "Sakraat", Wikipedia paraphrase, table source "Drik Panchang (New Delhi)". Removed from `heldDrafts`. Published, no cover.
- Niche #15: [Income-tax Act 2025 Explained: Old Section Numbers vs New (80C, 80D, 24(b), HRA and More)](https://www.knewspaper.in/post/new-income-tax-act-section-mapping) (finance). Gate 1: PASS (CBDT transition FAQs, section 19/22/Schedule III pages on incometaxindia.gov.in, TaxGuru/eztax mappings). Optional fixes: 536-vs-819 cited to CBDT FAQs; TDS consolidation softened; asterisk note reworded; "section 202(2)" → "section 202". Published, no cover.
- Niche #16: [Stamp Duty and Registration Charges in India 2026: State-Wise Table With Women's Concession](https://www.knewspaper.in/post/stamp-duty-and-registration-charges) (real-estate). Gate 1 FAIL: TN first-sale rates (G.O. 131, 1 Dec 2023: 6% below ₹50 lakh, 7% ₹50 lakh–₹3 crore incl. 2% registration) missing; Gurugram example used an average 6% not 7%; Kerala June 2026 budget only proposed a fair-value review; metro cess area incomplete (MMR incl. Thane, Pune, PCMC, Nagpur). All fixed; Haryana rates marked urban. Gate 2: PASS. Published, no cover.
- Plan #51: [Stress Management: WHO's 5 Skills, Daily Habits and When to See a Doctor](https://www.knewspaper.in/post/stress-management) (health-fitness). Gate 1 FAIL: WHO guide does exist in Hindi (44 languages; no Hindi audio); Turkey pilot overstated (124 adults, not powered for between-group difference). Fixed; also "enhanced usual care", "ischaemic heart disease", Western Pacific added, ACT attributed to Self-Help Plus, WHO publication page linked. Gate 2: PASS. Published, no cover.
- Plan #49 Student Resume (draft `daily/drafts/student-resume/`): gate 1 FAIL (stray comma in SIH sentence; "Article assistant intern" is an ICAI articleship term) → fixed; gate 2 FAIL (IMA NCC 'C' seats: Jamia page's "32 per course" is outdated; UPSC CDS (II) 2026 reserves 13 of 100) → fixed. Not published (two fails); added to `heldDrafts` for a fresh gate next run. Live how-to-make-a-resume page couldn't be fetched by gate agents; overlap checked against the local draft.
- No trending topics this run (5 slots used: 4 published + 1 held).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 407 article pages (403 + 4), redirects 4 changed/4 ok. This also brings in the late-morning owner covers.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: stamp duty: Haryana registration slabs from ClearTax/Kotak (secondary); UP 7%/1% base rates via Housing.com; Kerala 8%/2% from Kerala Kaumudi; Karnataka's planned April 2026 guidance-value rise not confirmed either way. Income tax: rows marked * (80CCD, 80DD, 80DDB, 80TTA/TTB, 80U, 89, 54, 54F) from ClearTax/Upstox mappings, not the official section text; 111A/112A/54EC confirmed by one mapping site plus drafter's checks. Stress: Manodarpan number confirmed only from a 2020 PIB release; Tele-MANAS call count is the Feb 2025 figure (newer counts exist in Lok Sabha replies). Makar Sankranti: the DoPT PDF link on cept.gov.in couldn't be opened by the gate (content confirmed via staffnews.in).

Image prompts:
- Makar Sankranti 2027: Date, Punya Kaal and What It Is Called in Every State: create image for this article topic without any text
- Income-tax Act 2025 Explained: Old Section Numbers vs New (80C, 80D, 24(b), HRA and More): create image for this article topic without any text
- Stamp Duty and Registration Charges in India 2026: State-Wise Table With Women's Concession: create image for this article topic without any text
- Stress Management: WHO's 5 Skills, Daily Habits and When to See a Doctor: create image for this article topic without any text

### 2026-11-18 (evening): covers from the owner
The owner sent all four images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- makar-sankranti → c0f544_59dc4747f43347b08aaed565f38cd9d9~mv2.webp (kites at sunrise, a clay pongal pot, til laddoo and chikki on a brass thali, sugarcane, marigolds, a brass lamp and a temple shikhara; no text).
- new-income-tax-act-section-mapping → c0f544_35d315414d114126b9720221f3d931b0~mv2.webp (a blue and a maroon law book on a balance with an arrow from old to new, piggy bank, coins, a toy house, stethoscope, checklist, calculator; a domed government building and the Indian flag behind). Note: both books carry the Lion Capital (State Emblem of India); calculator keys have small garbled labels. Used as sent.
- stamp-duty-and-registration-charges → c0f544_4891e07ce02e41758a361380e0401395~mv2.webp (a model house, stamp paper with a rubber stamp, coins, scales, a pink house cut-out with a woman's silhouette, a wooden India map, calculator; a domed building and flag behind). Note: the stamp paper carries a State Emblem-style mark; calculator keys garbled. Used as sent.
- stress-management → c0f544_4cce1289687b41a2ae831e953930ddb5~mv2.webp (a woman meditating on a mat on a terrace, a stormy-head icon with an arrow to her, icons for mindfulness, exercise, food, sleep and people, a medical clipboard; only "zZZ" as text).
All four removed from `pendingImages` (now empty). The pre-render rebuild is left to the 19 Nov morning run, so the pre-rendered pages show these covers from then.

### 2026-11-19 (morning run, 09:36 IST; Thursday)
Day total before this run: 0 of 10. 4 published (day total 4). Chrome/ChatGPT tools were not available in this cloud run, so no covers; all four slugs added to `pendingImages` (step 6 skipped). Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only). Several WebFetch calls again timed out on permission, and the second-round gates hit the shared WebSearch limit (200 calls per turn), so some of their checks leaned on the first-round gate's verification (noted below).
- civics.csv had run out: added rows 7–12 (RTI Act, how inflation is measured, Election Commission, Finance Commission, GDP, Fundamental Rights vs DPSP).
- Held draft, plan #49: [Student Resume in India: What to Write When You Have No Work Experience](https://www.knewspaper.in/post/student-resume) (career). Fresh gate: PASS (NPTEL 25/75 split and certificate bands, CDS (II) 2026 13 of 100 IMA NCC seats, SIH 2025 finale 8 Dec 2025, IIT Madras/IIT (BHU) placement rules, Jamia NCC page). Optional fix applied: "among the few online certifications Indian recruiters recognise easily" → "widely recognised". Removed from `heldDrafts`. Published, no cover.
- Civics #7: [RTI Act Explained: What You Can Ask, How to File RTI Online and What to Do If There's No Reply](https://www.knewspaper.in/post/how-to-file-rti-online) (sociology-and-society). Gate 1 FAIL: second-appeal portal is dss.cic.gov.in (not dsscic.nic.in, which is for quarterly returns); "fetches your case by registration number" unverified → removed. Gate 2: PASS (incl. civics check 7: no party or officeholder named; 2019 and DPDP changes each give the government's reason and critics' view). Optional fixes: "February and March 2026" for the Rajya Sabha replies; "(copy charges apart)"; closing internal-link sentence rewritten. Published, no cover.
- Niche #19: [Notice Period Rules in India: Can Your Employer Force You to Serve It, and How Buyout Works](https://www.knewspaper.in/post/notice-period-rules) (career). Gate 1 FAIL: Sanjay Jain order is 1 Nov 2018 (not 2019); salary TDS certificate is Form 130 from tax year 2026-27 (Form 16 for earlier years; the 2017 ITAT ruling was under the old Act). Fixed; also "The Bombay High Court has backed an employer" (one interim ruling, not "courts"), excerpt mentions Form 130. Gate 2: PASS. Optional: GST line reworded to explain, not advise. Published, no cover. Small wording redundancy in the GST paragraph ("applied the circular … It applied the circular to past periods") to tidy at tomorrow's recheck.
- Plan #55: [High Fibre Foods in India: Fibre per 100 g in Dals, Millets, Fruits and Vegetables (ICMR-NIN Data)](https://www.knewspaper.in/post/high-fibre-foods) (health-fitness). Gate 1 FAIL: soluble-fibre ranking wrong (soybean 5.0, linseed 4.3, then rajma/chana; methi only 1.7); ICMR-NIN 2020 does give ~40 g per 2,000 kcal as a safe intake. Fixed; also What India Eats line now "94 g vegetables plus 89 g roots and tubers (2016 survey data)", "most urban Indian adults", My Plate estimate "roughly 40 g or more" (our estimate), "Apple, big". Gate 2: PASS (all 26 IFCT rows re-checked). Published, no cover.
- Niche #17 NEET eligibility (draft `daily/drafts/neet-eligibility/`): gate 1 FAIL (parliamentary panel quote and addressee: Committee on Education, Women, Children, Youth and Sports, 382nd report, recommended the Education Ministry explore limits with the Health Ministry; NMC 2025 confirmation covered NIOS only; 2017 three-attempt cap missing) → fixed; gate 2 FAIL (the NIOS confirmation is an NMC UGMEB public notice of 22 Feb 2025 reported by Medical Dialogues, not a Careers360 RTI report) → fixed. Not published (two fails); added to `heldDrafts` for a fresh gate next run.
- Plan #53 Goal Setting and #54 Plain Text Resume Example skipped without drafting (near-duplicates; see `skippedPlan`).
- No trending topics this run (5 slots used: 4 published + 1 held). Owner topics: not an owner day.
- Recheck of yesterday's 7 articles (2 review agents, local final drafts):
  - stress-management: fixed. Tele-MANAS call count updated (18 lakh by Feb 2025 → "more than 29.8 lakh calls since launch", government reply to Parliament, Dec 2025, via The Week); unverifiable NHS line about blood pressure replaced with the NHS's listed physical symptoms and its advice to see a GP. Republished with update-post-template.js.
  - press-conferences-and-accountability, how-to-identify-pure-silk-saree, swot-analysis, makar-sankranti, new-income-tax-act-section-mapping, stamp-duty-and-registration-charges: OK (arithmetic recomputed; dates, rates and quotes re-checked). Optional notes not applied: Vajpayee "met reporters informally" isn't in the cited column (it says he held press conferences in Lucknow); Gurugram collector rates reportedly revised again for 2026-27.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 411 article pages (407 + 4), redirects 4 changed/4 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: RTI: portal's 3,000-character/1 MB limits come from a user manual on another government site; IB and R&AW as Section 24 examples from the Second Schedule as commonly cited; CIC national application total for 2024-25 not stated (cic.gov.in couldn't be fetched). Notice period: Manappuram judgment date given only as "late 2022"; ITAT case not named; buyout tax treatment of a new employer's reimbursement is general principle ("generally"). High fibre: ICMR-NIN 2020 40 g/2,000 kcal figure confirmed via Down To Earth's report, not the NIN document itself; My Plate fibre total is our own estimate (labelled).

Image prompts:
- Student Resume in India: What to Write When You Have No Work Experience: create image for this article topic without any text
- RTI Act Explained: What You Can Ask, How to File RTI Online and What to Do If There's No Reply: create image for this article topic without any text (symbolic scene, no real person: e.g. a stack of government files with a magnifying glass and an envelope; no flags, party symbols or leaders)
- Notice Period Rules in India: Can Your Employer Force You to Serve It, and How Buyout Works: create image for this article topic without any text
- High Fibre Foods in India: Fibre per 100 g in Dals, Millets, Fruits and Vegetables (ICMR-NIN Data): create image for this article topic without any text

### 2026-11-19 (morning, after the run): covers from the owner
The owner sent all four images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- high-fibre-foods → c0f544_29504cefb3344a09b9f87fde670493ee~mv2.webp (wooden bowls of dals, millets, chana and moong, with guava, papaya, apple, bananas, broccoli, oats, chia, flaxseed, carrots, beans, cabbage, cauliflower and spinach; no text).
- notice-period-rules → c0f544_9f2ff46a3b62405bb2bdc2b64f13d84e~mv2.webp (a briefcase, a clipboard contract with a handshake icon and signature, a desk calendar with a pinned date range, circular arrows to a money bag and coins, and scales of justice). Note: the calendar has small garbled numbers; used as sent.
- how-to-file-rti-online → c0f544_5239ac48557a42678f41d8b44191148c~mv2.webp (a laptop with an upload form, a document with an "i" magnifier, files, a magnifying glass, calendar, hourglass, gavel, checklist and scales, a question → laptop → calendar → scales flow, and a domed government building with the Indian flag). No people or party symbols.
- student-resume → c0f544_34c8b5cf202443baaa2282331f4ea245~mv2.webp (a resume with icon sections on a laptop, a graduation cap on books, notebooks, pens and a plant, a campus building behind; only placeholder lines, no text).
All four set to cover true in `state.published` and removed from `pendingImages` (now empty). The pre-render rebuild is left to the 15:36 run, so the pre-rendered pages show these covers from then.

### 2026-11-19 (afternoon run, 15:36 IST; Thursday)
Day total before this run: 4 of 10. 4 published (day total 8). Chrome/ChatGPT tools were not available in this cloud run, so no covers; all four slugs added to `pendingImages`. Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only). Owner and civics topics are morning-only, so not taken; yesterday's recheck is morning-only.
- Held draft, niche #17: [NEET UG 2027 Eligibility: Age Limit, Number of Attempts, Subjects and Open-School Rules](https://www.knewspaper.in/post/neet-eligibility) (education). Fresh gate 1 FAIL: the sentence saying the three-attempt cap "was dropped in 2017 after the oversight committee opposed" it wasn't supported (Medical Dialogues, 17 Mar 2017 says only the MCI was "likely to withdraw" it; a July 2017 government release still mentions three attempts) → reworded: committee opposed limits in March 2017; cap dropped later and absent from recent NTA bulletins. Gate 2: PASS (age rule, NMC 21 Oct 2021 / 9 Mar 2022, 382nd report of 9 Oct 2026, UGMEB NIOS notice 22 Feb 2025, SC order 27 Feb 2024, GMER 2023, percentiles, CBT from 2027). Unverified "Chapter 8" reference removed. Removed from `heldDrafts`. Published, no cover.
- Niche #20: [Famous Food of Every Indian State and Union Territory: A Complete Table](https://www.knewspaper.in/post/famous-food-of-indian-states) (food). Gate 1 FAIL: "Tea, coffee and spice GIs sit with their commodity boards rather than APEDA" was wrong (APEDA lists many spice GIs; all GIs are registered by the GI Registry) → fixed; "Vivika" → "Vivikam". Gate 2: PASS (every GI cell checked against APEDA state pages; PIB 4 Aug 2026 counts; Kesaria Kalakand via AIR 14 Jun 2026; Andaman GIs via PTI Dec 2024; Darjeeling Tea GI no. 1; all 28 states + 8 UTs present). Published, no cover.
- Plan #56: [Positive Thinking: What the Research Really Shows and How to Practise It](https://www.knewspaper.in/post/positive-thinking) (health-fitness). Gate 1: PASS (Rozanski JAMA Netw Open 2019, Lee PNAS 2019, Malouff & Schutte, Oettingen 2016, Wang 2021 WOOP meta-analysis, Ford JPSP, Mayo Clinic, NHS page, Tele-MANAS). Optional wording fix applied ("judging your own feelings"). Published, no cover.
- Plan #57: [Area of Equilateral Triangle: Formula (√3/4)a², Proofs, Table and Solved Examples](https://www.knewspaper.in/post/area-of-equilateral-triangle) (education). Gate 1: PASS (all arithmetic recomputed; Ganita Manjari Class 9 Part I Ch 6 and old Ch 10 Heron's Formula signal-board question confirmed). Published, no cover.
- Niche #18 SIMs on my Aadhaar (draft `daily/drafts/sim-on-aadhaar/`): gate 1 FAIL (9/6 limit origin is 2012 instructions restated in the 7 Dec 2021 letter; photo screening from 23/24 Aug 2026 is d+1 post-facto, not "refused") → fixed; gate 2 FAIL ("most recently taken numbers are cut" unverified) → replaced. Not published (two fails); added to `heldDrafts` for a fresh gate next run.
- No trending topics this run (5 slots used: 4 published + 1 held).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 415 article pages (411 + 4), redirects 4 changed/4 ok. This also brings in this morning's owner covers.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: NEET: the 50/40/45 percentiles were confirmed via Careers360, not the bulletin text; "private candidates not barred" is from the absence of a bar, not an explicit NTA statement. State foods: dish/staple/sweet choices are mainstream food knowledge, spot-checked rather than each sourced; "India has no official national dish" is general knowledge; some APEDA entries show expired validity dates (likely renewed). Positive thinking: Malouff & Schutte and Ford checked via BPS Research Digest and Greater Good summaries (originals blocked); 1-800-891-4416 confirmed via secondary pages. Equilateral triangle: Ganita Manjari Chapter 6 content confirmed via Teachoo/Extramarks (ncert.nic.in not fetchable).

Image prompts:
- NEET UG 2027 Eligibility: Age Limit, Number of Attempts, Subjects and Open-School Rules: create image for this article topic without any text
- Famous Food of Every Indian State and Union Territory: A Complete Table: create image for this article topic without any text
- Positive Thinking: What the Research Really Shows and How to Practise It: create image for this article topic without any text
- Area of Equilateral Triangle: Formula (√3/4)a², Proofs, Table and Solved Examples: create image for this article topic without any text

### 2026-11-19 (afternoon, after the run): covers from the owner
The owner sent all four images. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- area-of-equilateral-triangle → c0f544_a3ed252a057f4f338c2e283fcfc12ed6~mv2.webp (a spiral notepad with a yellow equilateral triangle showing its dashed altitude, right-angle mark and equal-side ticks; compass, set square, calculator, books, plant and pen holder). Note: calculator keys carry small garbled labels; used as sent.
- positive-thinking → c0f544_48de3458098d496881d7b6ce4af2a6c5~mv2.webp (a smiling cartoon brain on a wooden block with icons for goals, exercise, meditation, sleep and people; checklist notebook, smiley ball, hourglass, mug). Only "zZZ" as text.
- famous-food-of-indian-states → c0f544_c0753a950b6440bea005a15a405ab0f6~mv2.webp (a gold cut-out map of India with state lines, surrounded by a thali, dosa, vada pav, litti, fish curry, momos, dhokla, idli, chole bhature, biryani, jalebi and more). Note: the map is stylised; its northern boundary should be checked against India's official map before the image is used anywhere else.
- neet-eligibility → c0f544_1b4999efd24940608d2f3cfe7b6cf7f1~mv2.webp (stethoscope on books, anatomy torso and heart models, a checklist clipboard, calendar with a red pin, hourglass, alarm clock, notebook, a white coat with a caduceus). Note: the calendar has small garbled text; used as sent.
All four set to cover true in `state.published` and removed from `pendingImages` (now empty). The pre-render rebuild is left to the 20 Nov morning run, so the pre-rendered pages show these covers from then.

### 2026-11-19 (evening): owner requests in chat
- Guest post: Riddhi Pithadiya's "IPO GMP Guide" (submitted 17 Nov; owner added her ₹499 single plan today) published by triggering the guest-posts workflow → https://www.knewspaper.in/post/ipo-gmp-guide-what-every-investor-must-know-about-gmp. At the owner's request the "Sponsored guest post" note was removed and its links made do-follow; five section headings promoted to H2 so the "In this article" box shows.
- Guest-post rules changed (owner): no sponsored label; at most 3 outside links, the first 2 do-follow and a 3rd no-follow (publisher, Submit article page, terms, editorial-team page updated). No other article carried the sponsored note; ~48 older articles still have rel="sponsored" links (left as they are; owner not asked yet).
- Side ad: sticky 300×600 AdSense unit beside articles on screens ≥1400px (deploy.js + styles.css); checked live, AdSense fills it.
- Owner topic #6 queued: From final season.
- Owner request: [How to Play GTA 6 on PC: What Actually Works Right Now (and What's a Scam)](https://www.knewspaper.in/post/how-to-play-gta-6-on-pc) (gaming). Gate 1 FAIL (unverifiable Forbes quote) → removed; gate 2 FAIL (prices credited to FPJ instead of Digit; Rockstar quote credited to Windows Central) → fixed; gate 3 (fresh agent, at the owner's direct request) PASS. Published, no cover. gta-6-pc-requirements corrected (Xbox One via Xbox Cloud Gaming; cloud not on PC) and linked to the new article. Day total 9.

Image prompt:
- How to Play GTA 6 on PC: What Actually Works Right Now (and What's a Scam): create image for this article topic without any text
- Cover from the owner: how-to-play-gta-6-on-pc → c0f544_88b17813c0064f59a4993ad5351c19a8~mv2.webp (gaming desk with PC, monitor showing a Miami-style sunset with palms and a sports car, controller, keyboard, headset, and a laptop showing a green tick and red cross; no text). Pre-render picks it up at the next rebuild.

### 2026-11-20 (afternoon run, 15:36 IST; Friday)
No morning-run entry or commit exists for 20 Nov, so the morning run appears not to have run (or not pushed): today's civics article, owner topics and the recheck of 19 Nov articles were not done (morning-only tasks; left for the 21 Nov morning run). Day total before this run: 0. 4 published (day total 4). Chrome/ChatGPT tools were not available in this cloud run, so no covers; all four slugs added to `pendingImages`. Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only).
- Held draft, niche #18: [How Many SIMs Are on My Aadhaar? Check on Sanchar Saathi and Report Ones You Don't Use](https://www.knewspaper.in/post/sims-on-my-aadhaar) (technology). Fresh gate: PASS (DoT circular 17 Aug 2026 checked in the PDF; 2012/2021 instructions; Lok Sabha 7 Aug 2024 figures; Telecom Act s.42 and Third Schedule; NewsOnAir 4 crore). Removed from `heldDrafts`. Published, no cover.
- Niche #22: [Hindu Calendar Months: Names, English Equivalents and Amanta vs Purnimanta Explained](https://www.knewspaper.in/post/hindu-calendar-months) (devotional). Gate 1 FAIL (2031 Adhik month is Bhadrapada, not Shravana) → fixed; tithi wording and "Amavasya of 8 December" tightened. Gate 2: PASS (Drik state lists, Diwali 2025–28, Kartika dates, Saka facts via Know India, IMD Rashtriya Panchang, Adhik Jyeshtha 2026, Adhik Chaitra 2029). Published, no cover.
- Plan #58: [8 Great Speeches in History, Indian and World, and What Made Each One Work](https://www.knewspaper.in/post/great-speeches) (career). Gate 1 FAIL (Churchill timings credited to "UK National Archives"; source is Richard Toye on the UK government history blog) → fixed; "turns 77" line made evergreen. Gate 2: PASS (every quote checked word-for-word against Belur Math, PIB Quit India archive, Constituent Assembly Debates 14 Aug 1947 and 25 Nov 1949, LOC, Britannica, Nelson Mandela Foundation/UN). Optional fixes applied ("mantra" lower-case; "I have a dream" count removed). Published, no cover.
- Plan #59: [How to Write an Interview Thank-You Email: Templates for Indian Job Seekers](https://www.knewspaper.in/post/thank-you-email-after-interview) (career). Gate 1 FAIL (Oxford label is "Indian English, rather formal", not "especially Indian English") → fixed; IIT Madras rule described precisely; note added to the HR-round template to repeat only CTC figures already shared. Gate 2: PASS (NIT Sikkim rules clauses, IIT Madras recruiters' guide, SHRM, Robert Half, Naukri, Oxford). Blank ">" lines removed from templates (they would publish as empty quote blocks). Published, no cover.
- Niche #21 Inner Line Permit (draft `daily/drafts/inner-line-permit/`): gate 1 FAIL (Arunachal group size is at least 4; Dimapur "online-only" unsupported; Sikkim QR permits only proposed) → fixed, Ladakh fees hedged; gate 2 FAIL (missing the Nagaland PAP waiver for foreigners 26 Nov–15 Dec every year per a 16 Nov 2026 notification reported by UNI; MHA-approval nationalities are Afghanistan, China, Pakistan (+ Pakistani origin); Sikkim Jan 2026 change was the end of paper PAP/RAPs; comma splice) → all fixed. Not published (two fails); added to `heldDrafts` for a fresh gate next run (time-sensitive: Hornbill season from 26 Nov).
- No trending topics this run (5 slots used: 4 published + 1 held).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 421 article pages (417 + 4), redirects 5 changed/5 ok. This also brings in the owner's covers from 19 Nov evening.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: SIM: Sanchar Saathi menu labels ("Citizen Centric Services") confirmed only via secondary sources (portal not fetchable). Hindu months: Telangana grouped with amanta via the Telugu panchang (Drik lists only Andhra Pradesh); Bengali month names and festival pairings are standard knowledge, gate-checked rather than each sourced; Dekho Panchang says Adhik Shravana for 2031 while Drik and Patrika say Bhadrapada (article uses Bhadrapada). Great speeches: Ambedkar quotes checked against the eparlib PDF by the gate, not by the drafter. Thank-you email: phrase replacements and the consultancy advice are advice, not sourced rules.

Image prompts:
- How Many SIMs Are on My Aadhaar? Check on Sanchar Saathi and Report Ones You Don't Use: create image for this article topic without any text
- Hindu Calendar Months: Names, English Equivalents and Amanta vs Purnimanta Explained: create image for this article topic without any text
- 8 Great Speeches in History, Indian and World, and What Made Each One Work: create image for this article topic without any text
- How to Write an Interview Thank-You Email: Templates for Indian Job Seekers: create image for this article topic without any text

### 2026-11-21 (morning run, 09:36 IST; Saturday: owner-topic day)
Day total before this run: 0 of 10. 3 published (day total 3). Chrome/ChatGPT tools were not available in this cloud run, so no covers for today's three (added to `pendingImages`). The rebuild below also put the owner's ten covers (set earlier today) into the pre-rendered pages. Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only). Stopped at 3 published rather than start niche/plan/trending drafts (left to the 15:36 run).
- Owner #1: [Best Sample Papers for Every Class: Class 9 to 12 Board Exams (2027)](https://www.knewspaper.in/post/best-sample-papers) (education). Gate 1 (sixth overall) FAIL on one point: "Class 12 books label each paper Easy, Medium or Hard" (Physical Education and Computer Science use Easy/Moderate/Difficult) → "Class 12 books are also grouped from easy to hard". Also applied: Careers360 wording ("SQPs follow the same paper pattern"), free papers are on one Class 10 page, Class 10 picks merged (Future Topper's free papers include Hindi A and Maths Basic). Gate 2: PASS (all Future Topper claims read on futuretopper.in; CBSE date sheet, SQPs 21 Sep 2026, CISCE 16 Oct 2026, Oswaal and Arihant prices). Published, no cover.
- Owner #6: [From Season 5 (Final Season): Release Date Status, Where to Watch in India and What We Know](https://www.knewspaper.in/post/from-last-season) (entertainment). Gate 1: PASS (renewal 15 Apr 2026 as "fifth and final season", EP statement via TVLine, filming from 6 Jul in Halifax, wrap expected 27/28 Nov, no date/cast/episode count announced, Prime Video India Monday drops, Netflix India listing 24 Nov via What's on Netflix, finale recap). Netflix table row relabelled. Published, no cover.
- Civics #8: [How Is Inflation Measured in India? CPI and WPI Explained With the New Base Year](https://www.knewspaper.in/post/how-is-inflation-measured-in-india) (finance). Gate 1: PASS on all 7 checks (MoSPI technical note 12 Feb 2026: base 2024, 358 items, 12 division weights; WPI 2022-23 base via PIB 15 Jun 2026; October 2026 CPI release 12 Nov: 6.09%, rural 6.63%, urban 5.41%, CFPI 8.94%, indices 110.05/103.74/109.49; WPI 12.29%, fuel 32.84%; target renewed 25 Mar 2026 for Apr 2026–Mar 2031; every calculation recomputed). Optional fixes applied: "legally mandated to target", "aims to revise the base about every five years", "large states and UTs"; title in title case. No party or officeholder named. Published, no cover.
- Held draft niche #21 Inner Line Permit: fresh gate 1 FAIL (one duplicated sentence on applying in person; all facts PASS) → fixed; gate 2 FAIL (Nagaland PAP waiver, the Afghanistan/China/Pakistan MHA rule and the Dec 2024 PAP reimposition each repeated; all facts PASS again) → fixed in the draft. Failed twice in this run, so per the held-drafts rule it is dropped from `heldDrafts` and not published. Both fails were on repetition only; the fixed draft is in `daily/drafts/inner-line-permit/` if the owner wants it published (time-sensitive: Nagaland PAP waiver for foreigners 26 Nov–15 Dec).
- Owner #5 GEO (knowthecompany.com): not written. The drafting agent's WebFetch of knowthecompany.com timed out on permission (unattended run), and the row says skip if it can't be reached. Left out of usedOwner/skippedOwner; next owner day is Sun 22 Nov. Owner #4 (create a website with AI) not taken this run (owner #5/#6 prioritised for their timing).
- Recheck of yesterday's (20 Nov) 4 articles and of the 19 Nov articles whose recheck was missed (8 of them; how-to-play-gta-6-on-pc not rechecked as it had three gates on 19 Nov), 3 review agents: all OK, no fixes needed. One note: sims-on-my-aadhaar links India Code at .../20101/1/a2023-44.pdf; the reviewer could not open it but could open .../20101/1/A202344.pdf. Not changed: the update script refuses to drop an existing external link, and the old link was not shown to be broken. Owner may want to click it.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 424 article pages (421 + 3), redirects 3 changed/3 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: Sample papers: Educart prices (₹404, ₹1,526, ₹189–299, ₹224), Arihant's ₹255 single-book price and Oswaal Class 9/11 editions could not be re-verified today (pages blocked); they passed earlier gates. From: the Season 5 wrap rests on cast social posts (ShowSnob), the Netflix India date on What's on Netflix listings only. Inflation: the 25 Mar 2026 target notification date is from news reports, not the gazette; the 6.08% vs 6.09% rounding explanation is ours.

Image prompts:
- Best Sample Papers for Every Class: Class 9 to 12 Board Exams (2027): create image for this article topic without any text
- From Season 5 (Final Season): Release Date Status, Where to Watch in India and What We Know: create image for this article topic without any text
- How Is Inflation Measured in India? CPI and WPI Explained With the New Base Year: create image for this article topic without any text (symbolic scene, no real person: e.g. a shopping basket of vegetables, a rupee coin and a rising line chart)

### 2026-11-21 (afternoon run, 15:36 IST; Saturday)
Day total before this run: 3 of 10. 3 published (day total 6). Chrome/ChatGPT tools were not available in this cloud run, so no covers; all three slugs added to `pendingImages`. Five drafts by separate drafting agents (2 niche, 2 plan, 1 trending); each gated by a fresh, independent agent (WebSearch/WebFetch only). Owner topics are morning-only, so none this run.
- Niche #23: [Types of Sarees in India by State: Weaves, GI Tags and How to Recognise Each](https://www.knewspaper.in/post/types-of-sarees) (fashion). Gate 1: PASS (all 28 table rows checked against the IP India GI registry PDF for name, state and year; PIB National Handloom Day 2026 note: 106 handloom GIs, 29,402 Handloom Mark registrations to 30 Jun 2026, 35.22 lakh workers, >72% women). Optional fixes applied: state-count FAQ completed (Odisha, then AP, Karnataka, Jharkhand ~4 each); Kovai Kora described as a cotton–silk blend. Published, no cover.
- Plan #60: [HIV and AIDS: Symptoms by Stage, How It Spreads, and Free Testing and Treatment in India](https://www.knewspaper.in/post/hiv-aids-symptoms-causes) (health-fitness). Gate 1: PASS (PIB World AIDS Day 2025 backgrounder for prevalence/new infections/deaths and 18 lakh on ART; Lok Sabha AU2555 for 725 ART centres and free viral load; NACO 1097; WHO window period and U=U; NHS PEP 72 h; Act 2017 sections 3, 5, 8, 37). Optional fixes applied ("some people have no symptoms", "with narrow exceptions" on consent, WHO/NHS everyday-contact line reworded). Published, no cover.
- Niche #24: [How to Calculate HRA Exemption: Formula, 3 Worked Examples and Rent Receipt Rules](https://www.knewspaper.in/post/hra-exemption-calculation) (finance). Gate 1 FAIL ("Two things changed" named only one; new regime denies only certain Schedule III items, not all) → fixed; also cited Rule 205 directly and added section 134 (ex-80GG). Gate 2: PASS (Rule 279 eight 50% cities, Schedule III No. 11, Rule 205/Form 124 PAN above ₹1 lakh and relationship, s.202(2), s.134, s.393 TDS on rent; all three examples recomputed). Gurugram/Noida line softened to "generally read as". Published, no cover.
- Plan #61 Borderline personality disorder (draft `daily/drafts/bpd/`): gate 1 FAIL (NICE DBT recommendation overstated) → fixed; gate 2 FAIL (only because the gate was asked to require NICE CG78's exact wording; two paraphrases) → both replaced with verbatim NICE quotes. All other facts passed twice. Not published (two fails); added to `heldDrafts` for a fresh gate next run.
- Trending: CAT 2026 exam day guidelines (draft `daily/drafts/cat-exam-day/`; exam on Sun 29 Nov). Gate 1 FAIL (gate-closing times stated as fact and credited to outlets that don't give them; one unsourced admit-card claim) → hedged/removed; gate 2 FAIL (reporting times, ID list, 22 IIMs and the mock structure credited to Careers360 when only coaching sites support them; PwD timing unattributed) → all re-attributed and hedged ("check your admit card"). iimcat.ac.in could not be fetched by any agent. Not published (two fails); added to `heldDrafts`, time-sensitive (drop if not published by 28 Nov).
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 427 article pages (424 + 3), redirects 3 changed/3 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: Sarees: "around 50" saree GIs and the per-state counts are our own counts from the registry list; years are the registry's financial-year headings. HIV: the 25.61 lakh (2024) figure is from news reports of the India HIV Estimation 2025 report (Medical Dialogues, Deccan Herald), not the report itself; the ART centre count (700+) is from June 2023. HRA: the 2% TDS-on-rent detail and "s.202 replaced 115BAC" rest on Taxmann; the drafter could not open ClearTax's calculator page (inspiredBy).

Image prompts:
- Types of Sarees in India by State: Weaves, GI Tags and How to Recognise Each: create image for this article topic without any text
- HIV and AIDS: Symptoms by Stage, How It Spreads, and Free Testing and Treatment in India: create image for this article topic without any text
- How to Calculate HRA Exemption: Formula, 3 Worked Examples and Rent Receipt Rules: create image for this article topic without any text

### 2026-11-22 (early, after the 21 Nov afternoon run): covers from the owner
The owner sent ten images in chat. Converted to WebP (1670×942, q80; saved in `daily/images/`), imported into Wix Media from the repo's raw URL, and set as covers:
- sims-on-my-aadhaar → c0f544_20f7f5df3a71441bb2a83ec066c5ae04~mv2.webp (laptop listing three SIM cards, two ticked and one crossed, an Aadhaar-style card and a magnifying glass). Note: the card carries small garbled text and an emblem-like mark; used as sent.
- hindu-calendar-months → c0f544_be0174fb3f1641cdb6aeac198c771166~mv2.webp (a scroll with a 12-segment seasonal wheel around a kalash, an open book showing new and full moon, a diya and a temple at dusk).
- great-speeches → c0f544_33db03592b5f423ca32c09d443f59db7~mv2.webp (an empty podium with two microphones before a collage of India Gate, Red Fort, a memorial, Parliament House and the UN building; globe and books). Note: the memorial frieze has garbled lettering.
- thank-you-email-after-interview → c0f544_5e6aae8420d6417ebc684d9e0ae8690a~mv2.webp (laptop with an email compose window, an interview-room inset and a sent-envelope tick).
- best-sample-papers → c0f544_e6b41fa33a924a559aec972105f3d654~mv2.webp (a clipped stack of question papers, textbooks and a laptop with a checklist). Note: small garbled text on the top sheet.
- from-last-season → c0f544_4e4b6f538cad48d5afbc103c5da3a7a6~mv2.webp (TV showing a fog-bound old house and water tower, popcorn, remote and a tablet with a play button).
- how-is-inflation-measured-in-india → c0f544_6fe7771cae4143bea80794ad8efb07a2~mv2.webp (a grocery basket, rising red arrow, coin stacks, chart and factory clipboards before a domed government building with the flag; no person).
- types-of-sarees → c0f544_77cc1c76631846538b76228b5ce18f12~mv2.webp (a stack of silk sarees, a handloom, cotton bolls and a patchwork map of India). Note: the map is stylised; its northern boundary should be checked against India's official map before the image is used anywhere else.
- hiv-aids-symptoms-causes → c0f544_bec1c80664654372b287ef7318b1f46b~mv2.webp (red ribbon, a rapid test kit, blood tubes, condoms, a shield over a virus, stethoscope and a hospital).
- hra-exemption-calculation → c0f544_5cf8cd38b0b04368aa4094dddb8fe66d~mv2.webp (a model house, calculator, coins, a clipboard form and a laptop showing calculator + rent receipt → tick). Note: calculator keys have small garbled labels.
All ten set to cover true in `state.published` and removed from `pendingImages` (now empty). The pre-render rebuild is left to the 22 Nov morning run, so the pre-rendered pages show these covers from then.

### 2026-11-22 (morning run, 09:36 IST; Sunday: owner-topic day)
Day total before this run: 0 of 10. 3 published (day total 3). Chrome/ChatGPT tools were not available in this cloud run, so no covers for today's three (added to `pendingImages`). The rebuild below also put the owner's ten covers (set earlier today) into the pre-rendered pages. Drafts by separate drafting agents; each gated by a fresh, independent agent (WebSearch/WebFetch only). WebFetch of knewspaper.in and knowthecompany.com was blocked for every agent this run (permission prompt timed out in the unattended session).
- Held trending: [CAT 2026 Exam Day Guidelines: Slot Timings, Reporting Time, What to Carry and Rules](https://www.knewspaper.in/post/cat-exam-day-guidelines) (education). Fresh gate 1 FAIL (face recognition is an experiment at centres, not "some centres", and no one is refused entry; result date: the CAT 2026 bulletin says results by first week of January 2027; repeated sourcing caveats) → fixed (and jammers credited to Careers360). Gate 2: PASS (bulletin via careerpower.in mirror: 29 Nov, 170 cities, 22 IIMs, results by first week of Jan; slots; admit card 4→6 Nov; mock 68 Qs 24/22/22; marking; ID list; correction window 5–6 Oct). Published, no cover.
- Held plan #61: [Borderline Personality Disorder: Symptoms, Causes, BPD vs Bipolar and Getting Help in India](https://www.knewspaper.in/post/borderline-personality-disorder) (health-fitness). Fresh gate: PASS (NIMH, NHS symptoms/overview/treatment, NICE CG78 quotes verbatim, ICD-11 6D11.5, MHCA s.18, Tele-MANAS via PIB). Optional fix applied: "genetic, environmental and social factors" (dropped "physical"). Published, no cover.
- Owner #4: [How to Create a Website With AI: Tools and Steps for Beginners in India](https://www.knewspaper.in/post/how-to-create-a-website-with-ai) (technology). Gate 1 FAIL (DPDP duties described as already applying: they apply from about 13 May 2027 after the 18-month phase-in; Hostinger has a 14-day free trial) → fixed. Gate 2: PASS (all tool pages, registry.in FAQs, Google gen-AI guidance, PIB DPDP note). Optional: Hostinger ₹139 marked as the 22 Nov sale price; "the only one we saw listing rupee prices"; Framer added to free plans. Published, no cover.
- Owner #5 GEO: not written again. knowthecompany.com could not be fetched (permission timeout), and the row says skip if it can't be reached. Left out of usedOwner/skippedOwner. The owner wanted it in the week of 16 Nov, which ends today; the owner may need to approve WebFetch for knowthecompany.com or say how to proceed.
- Civics #9 Election Commission of India (draft `daily/drafts/eci/`): gate 1 FAIL (Delhi SIR: the Form 8 point was a bench suggestion on 28 Oct, and on 19 Nov the court only listed a review for 2 Dec) → fixed; gate 2 FAIL (2023 Act in force from 2 January 2024, not 29 December 2023) → fixed. Everything else passed twice, and check 7 (no party named, fair) passed both times. Not published (two fails); added to `heldDrafts` for the afternoon run. Not yet added to usedCivics.
- Recheck of yesterday's (21 Nov) 6 articles, 2 review agents: the live pages could not be fetched, so they checked the published source files in `daily/drafts/`. Sample papers, From, sarees, HIV and HRA: OK (From: still no Season 5 date; Netflix India listing is 24 Nov, so "listed to arrive" goes stale after 24 Nov). Inflation: the reviewer says MoSPI's 1,407 urban markets already include the 12 online markets (PIB PRID 2227012), so "1,407 urban markets ... and 12 online markets" double-counts; suggested "1,395 urban markets". I could not confirm this independently in two searches, so it is NOT fixed yet: afternoon run, verify on PIB 2227012 and fix with the update script. The reviewer also got an unrelated page from the article's PIB WPI link (PRID 2272872) twice; may be a fetch glitch, owner may want to click it.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 430 article pages (427 + 3), redirects 3 changed/3 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: CAT reporting/gate-closing times, ID list and mock structure come from coaching sites (hedged "check your admit card"); iimcat.ac.in could not be fetched. Website-AI: tool prices change often (Hostinger's is a Black Friday sale price). BPD: the NHS treatment URL linked in the article could not be fetched by the gate (its mirror under /mental-health/ was used).

Image prompts:
- CAT 2026 Exam Day Guidelines: Slot Timings, Reporting Time, What to Carry and Rules: create image for this article topic without any text
- Borderline Personality Disorder: Symptoms, Causes, BPD vs Bipolar and Getting Help in India: create image for this article topic without any text
- How to Create a Website With AI: Tools and Steps for Beginners in India: create image for this article topic without any text

### 2026-11-22 (after the morning run): covers from the owner
The owner sent three images in chat. They were converted to WebP (1670×942, q80), saved in `daily/images/`, imported into Wix Media from the repo's raw URL, and set as covers:
- cat-exam-day-guidelines → c0f544_e469b295e7d946a58ece487b668ccb27~mv2.webp. The image shows a desk with an admit card, ID card, wall clock, transparent bottle and checklist, a "no phone/watch" sign, and a metal detector at an exam hall. It has no text.
- borderline-personality-disorder → c0f544_59c58b88d45e4e92a1e68ee71c4b266a~mv2.webp. The image is a collage of one woman in shifting moods (storm to sunshine), with a glowing head-and-brain held by hands.
- how-to-create-a-website-with-ai → c0f544_92784ad8ed0f4ff5b366dafbdd1a4010~mv2.webp. The image shows a laptop with an AI chip linked by an arrow to a website layout, and India Gate through the window.
All three were set to cover true in `state.published` and removed from `pendingImages`. The pre-render rebuild is left to the 22 Nov afternoon run, so the pre-rendered pages show these covers from then.

### 2026-11-22 (late morning): owner's article published (Godrej Elanor)
The owner sent a .docx and asked for it to be published. It is now live as [Why Infrastructure Development Plays an Important Role in Residential Property Demand](https://www.knewspaper.in/post/infrastructure-development-residential-property-demand) (Real Estate, Knewspaper Editorial Team).
- **Text:** kept as sent, the same as the allinsightz real-estate moves. The bold section titles became H2s, so the "In this article" box shows. The project-information block was split into three lines.
- **Not applied:** the daily-article gate, the FAQ section and the "no In conclusion" rule (this is owner-supplied content).
- **Links:** 4 to godrejelanor.com, all bold and opening in a new tab. Under the owner's 19 Nov guest-post rule, the first 2 are do-follow and the other 2 are nofollow. The phone number is kept.
- **SEO:** seoTitle "Infrastructure and Residential Property Demand in Pune"; the excerpt and SEO description were written for it.
- **Cover:** none. The image prompt is "Why Infrastructure Development Plays an Important Role in Residential Property Demand: create image for this article topic without any text".
- **Tracking:** not added to `state.published`, so the daily recheck leaves it alone. The source markdown is in `daily/drafts/godrej-elanor/`.
- **Closest existing article:** how-infrastructure-development-can-influence-plot-values, which covers plots rather than flats and has no Pune focus.
- **Pre-render rebuild:** left to the 22 Nov afternoon run.
- **Cover added later:** the owner sent the image. infrastructure-development-residential-property-demand → c0f544_cd3e8c61782f42b993e8c052bbd287b0~mv2.webp. The image shows golden-hour apartment towers with a pool garden, an elevated metro line and station, a highway and a crane on a building under construction. It has no text. It is saved as WebP in `daily/images/`.

### 2026-11-22 (afternoon run, 15:36 IST; Sunday)
Day total before this run: 3 of 10. 3 published (day total 6). Chrome/ChatGPT tools were not available in this cloud run, so no covers (all three added to `pendingImages`). Drafts by separate drafting agents; each gated by fresh, independent agents (WebSearch/WebFetch only).
- Held civics #9 Election Commission of India (`daily/drafts/eci/`): gate 1 FAIL (Bihar "47 lakh removed" is the net fall; Constitution Bench status out of date: a five-judge bench has been formed) -> fixed; gate 2 FAIL (65 lakh deleted + 21 lakh added doesn't give 7.42 crore: PIB says ~69 lakh removed in all, 21.5 lakh added; President/VP election disputes go to the Supreme Court, not the High Court) -> fixed in the draft. Check 7 (no party named, fair) passed both times. Dropped from `heldDrafts` under the two-fails rule and recorded in `skippedCivics`; the corrected draft is kept, so the owner can ask for one more gate.
- Plan #62: [Area of a Rectangle: Formula, sq ft to sq m, Tiles and Path Problems](https://www.knewspaper.in/post/area-of-a-rectangle) (education). Gate: PASS (all six examples recomputed; NOAA foot definition; NCERT Ganita Prakash chapters via Teachoo). Minor fixes applied: tile count for 11 × 9 ft now says 30 is a safe maximum and ~25 with offcuts; fencing/flooring pricing line reworded. Published, no cover.
- Plan #63: [Eisenhower Matrix Explained: Urgent vs Important, Its Real Origin and Indian Examples](https://www.knewspaper.in/post/eisenhower-matrix) (career). Gate: PASS (Quote Investigator: 19 Aug 1954, World Council of Churches at Northwestern, unnamed "former college president"; Zhu, Yang & Hsee, JCR 45(3) 2018). Minor wording softened ("no record that he drew a four-box matrix"; Covey's Time Management Matrix named). Published, no cover.
- Niche #26: [APAAR ID: What It Is, Is It Mandatory and How to Create One via DigiLocker](https://www.knewspaper.in/post/apaar-id) (education). Gate 1 FAIL (said CBSE requires APAAR for 2026-27; the Sept 2026 LOC circular for the 2027 boards says it is optional; SC order of 20 July 2026 described as letting the scheme continue, but it disposed of the petition with directions without ruling on validity; second-hand MoE FAQ source; dated NTA note) -> fixed. Gate 2: PASS (SC order PDF, PIB factsheet, apaar.education.gov.in, CBSE 2025 relaxation). Minor fixes: "minutes reported in February 2026"; Lok Sabha reply dated July 2025 and framed as UDISE+ Aadhaar validation. Published, no cover.
- Niche #25 Occupancy Certificate vs Completion Certificate (`daily/drafts/oc-vs-cc/`): gate 1 FAIL (an unsourced MahaRERA partial-OC claim; 3,699 projects were lapsed ones) -> fixed; gate 2 FAIL (Karnataka: missing the June 2026 one-time power-connection relaxation for homes up to 2,400 sq ft, closed 6 July 2026) -> fixed after the gate. Not published (two fails); added to `heldDrafts` for the next run.
- No trending topic this run: the run stopped at 3 published plus the held draft, to keep within time.
- Inflation (21 Nov) 1,407 vs 1,395 urban markets: still not confirmed (search results didn't show the PIB text; WebFetch not available to the main run). Not changed. The next morning run should check PIB PRID 2227012 directly.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 434 article pages (431 + 3), redirects 4 changed/4 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: APAAR: the CBSE LOC circular PDF itself could not be fetched by either gate; "optional" rests on PW, Krama and Free Press Journal reports. Rectangle: NCERT chapter names rest on Teachoo/Careers360, not the NCERT PDFs. Eisenhower: the quote wording rests on Quote Investigator (the American Presidency Project transcript was not opened).

Image prompts:
- Area of a Rectangle: Formula, sq ft to sq m, Tiles and Path Problems: create image for this article topic without any text
- Eisenhower Matrix Explained: Urgent vs Important, Its Real Origin and Indian Examples: create image for this article topic without any text
- APAAR ID: What It Is, Is It Mandatory and How to Create One via DigiLocker: create image for this article topic without any text

### 2026-11-22 (evening): covers from the owner for the afternoon articles
The owner sent three images in chat. They were converted to WebP (1670×942, q80), saved in `daily/images/`, imported into Wix Media from the repo's raw URL, and set as covers:
- apaar-id → c0f544_b099b51133a4434aadb3cdb73daa61d6~mv2.webp. A laptop shows a student ID card (graduation cap, avatar, QR code) with an arrow to a locked cloud folder; a globe, books and the Indian flag are in the background. It has no text.
- eisenhower-matrix → c0f544_56e5353ec5e84b2898f9c7ece8483dd8~mv2.webp. A whiteboard shows a four-box grid with an alarm light, a target, a checklist and a bin, on a desk with coffee. It has no text.
- area-of-a-rectangle → c0f544_f79eb7f0ea0541df92a51f0e7ab1842a~mv2.webp. A notebook shows a gridded rectangle with dimension arrows, a tiled floor and a paved path around a lawn, next to a calculator, a tape measure and a set square. Note: the calculator keys and ruler markings are slightly garbled.
All three were set to cover true in `state.published` and removed from `pendingImages` (now empty). Owner topics 7 and 8 (US visa application, US visa interview questions) were added to `owner-topics.csv`. The pre-render rebuild is left to the 23 Nov morning run, so the pre-rendered pages show these covers from then.

### 2026-11-23 (morning run, 09:36 IST; Monday)
Day total before this run: 0 of 10. 4 published (day total 4). Chrome/ChatGPT tools were not available in this cloud run, so no covers (all four added to `pendingImages`; step 6 not possible). Drafts by separate drafting agents; each gated by fresh, independent agents (WebSearch/WebFetch only). Monday is not an owner-topic day.
- Held niche #25: [Occupancy Certificate vs Completion Certificate: Why They Matter and How to Check Them](https://www.knewspaper.in/post/occupancy-certificate-vs-completion-certificate) (real-estate). Fresh gate 1 FAIL (Karnataka's small-home OC exemption is no longer limited to Greater Bengaluru: extended to other ULBs, Deccan Herald 26 Oct 2025, and gram panchayat areas) -> fixed in the text and FAQ. Gate 2: PASS (RERA sections, three SC rulings, Delhi UBBL, Karnataka 22 June 2026 power relief, MahaRERA 3,699 lapsed projects). Optional: Samruddhi wording "could not get regular water and power connections". Published, no cover.
- Niche #28: [Full and Final Settlement: The 2-Day Rule, What's Included and What to Do If It's Delayed](https://www.knewspaper.in/post/full-and-final-settlement) (career). Gate 1: PASS (Code on Wages s.17(2), 18, 45, 51, 54 via India Code; labour codes from 21 Nov 2025 via PIB; OSH s.32(1)(vi); SS Code s.56; EPF Scheme 2026; all arithmetic recomputed). Optional fixes applied: EPF Scheme "from July 2026" (sources differ on 29 June vs 1 July); "assuming she counts as a worker"; notice shortfall "if her contract allows it"; "6 years 5 months". Published, no cover.
- Niche #27: [How to Stop Spam Calls and SMS in India: TRAI DND, 1909 and Chakshu Explained](https://www.knewspaper.in/post/stop-spam-calls) (technology). Gate 1 FAIL (the 2026 appeal mechanism is in the 90-day phase, so it starts in December 2026, not now) -> fixed. Gate 2: PASS with one required fix applied (MyJio DND path: profile icon > Settings > Service settings > Do Not Disturb, per jio.com). Optional applied: "may be rejected"; table now "15-day outgoing bar, then one-year disconnection and blacklisting". Published, no cover.
- Plan #64: [Declaration in Resume: Meaning, Format and Samples for Indian Job Seekers](https://www.knewspaper.in/post/declaration-in-resume) (career). Not a duplicate: how-to-make-a-resume and student-resume mention it in one line each. Gate 1 FAIL (Avtar Singh summary overstated: suppression can be held only for what the form asked, but other relevant facts may still be weighed) -> fixed. Gate 2: PASS. Optional applied: sample block split, ATS wording softened, Khedkar's Delhi High Court challenge noted. Published, no cover.
- Civics #10 Finance Commission (`daily/drafts/finance-commission/`): gate 1 FAIL (India Forum equity-weight claim misread: the 60% was already the 15th FC's; GST compensation cess end-date contradiction) -> fixed; gate 2 FAIL (the "grand bargain" described one-sidedly; debate section unbalanced; "decide" should be "recommend") -> fixed after gate 2 (debate rewritten as two balanced lists). All FC figures, weights, dates and state shares passed twice; no party named. Not published (two fails); added to `heldDrafts` for the afternoon run. Not yet in usedCivics. The newly added point (Karnataka asked to cap cesses and surcharges at 5% of gross tax revenue) comes from gate 2's sources and needs checking in the next gate.
- No trending topic this run (stopped at 4 plus the held civics draft, to keep within time).
- Recheck of yesterday's (22 Nov) 6 articles, 2 review agents: live pages could not be fetched (permission timeouts), so they checked the published source files. CAT exam day, BPD, website with AI, area of a rectangle, Eisenhower matrix and APAAR ID: all OK, no required fixes. Optional notes not applied: CAT result date rests on reports of the bulletin; BPD under-18 "at least a year" line attributed to NIMH could be attributed to DSM-5; Lovable free-plan publishing may be invite-only; Hostinger ₹139 is a sale price.
- Fix to an earlier article: how-is-inflation-measured-in-india: "1,407 urban markets ... and 12 online markets" double-counted (MoSPI's first CPI 2024 release, FAQ 7: 1,395 urban markets plus 12 online markets in towns over 25 lakh; 1,407 includes the online ones). Now "1,395 urban markets ... 12 online markets in cities with more than 25 lakh people". Republished with the update script.
- Still open: the inflation article's PIB WPI link (PRID 2272872) returned an unrelated page to fetchers twice; PIB PRID pages seem to resolve wrongly for the fetcher in general (PRID 2227012 also returned an unrelated page). The owner may want to click it once.
- Step 5b (links from older articles) not done this run.
- Site rebuild: published true, 438 article pages (434 + 4), redirects 4 changed/4 ok.
- The create script again returned `cover: true` with no cover sent; recorded as cover false.
- Unsure: spam calls: Airtel and BSNL app routes not confirmed on official pages (Airtel web page and 1909 used); -P/-S/-T/-G suffixes rest on news explainers. F&F: tax-exemption caps under the Income-tax Act 2025 and EPF paras 43/54(7) not checked against the gazette text. Declaration: UPSC wording from Advt 21/2023 (the 2026 notification not opened).

Image prompts:
- Occupancy Certificate vs Completion Certificate: Why They Matter and How to Check Them: create image for this article topic without any text
- Full and Final Settlement: The 2-Day Rule, What's Included and What to Do If It's Delayed: create image for this article topic without any text
- How to Stop Spam Calls and SMS in India: TRAI DND, 1909 and Chakshu Explained: create image for this article topic without any text
- Declaration in Resume: Meaning, Format and Samples for Indian Job Seekers: create image for this article topic without any text
