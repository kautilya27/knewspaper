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
