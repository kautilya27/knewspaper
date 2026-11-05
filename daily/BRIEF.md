# Knewspaper daily articles: run brief

Every day this job publishes **up to 3 new articles** (only ones that pass the quality gate) on www.knewspaper.in (Wix site ID
`fc7a03c1-28fe-4510-90ba-025a62b06835`) under the **Knewspaper Editorial Team**:

- **2 from the owner's content plan** (`daily/plan.csv`, in `order`), and
- **1 on a topic people in India are searching for right now** (trending).

Each gets a featured image made with the owner's ChatGPT (in their Chrome), when Chrome is reachable.
Never publish a duplicate of an article already on the site.

## Quality comes before the number (read this first)

Google demotes whole sites for "scaled content abuse": many AI-written pages that add nothing new.
That happened to other sites doing exactly this kind of daily publishing. So:

- **3 is a maximum, not a target.** Publish an article only if it passes the quality gate (step 3b).
  Publishing 1 or 2 good articles, or none, is a successful run. Never lower the bar to fill the quota.
- **Information gain:** before writing, look at the top 5 Google results for the topic's main query
  (WebSearch). Write down what they all say and what they miss. The article must give the reader
  something those pages don't: an Indian angle (Indian rules, institutions, prices, examples),
  official data or documents, a clear comparison table, worked examples, a step-by-step from an
  official process, or a clearer, more accurate answer. If you can't find a real gap, skip the topic
  (record "no information gain" in `skippedPlan`) and take the next one.
- **No template look.** Don't reuse the same skeleton every day. Structure each article around what
  the reader needs. No filler intros ("In today's fast-paced world…"), no generic advice that fits
  any topic, no padding to reach a word count (900 good words beat 1,500 padded ones), no
  "In conclusion", no fake experience ("we tested", "I tried"), no invented quotes or studies.
- **Sources visible:** name the source of every important fact in the text ("according to the
  Income Tax Department…"), and link 1–2 official sources.
- **Health topics** (most of the plan): only general, well-established information from WHO, ICMR,
  NHS, MoHFW or major hospitals; no diagnosis, treatment plans, dosages or supplement claims; say
  when to see a doctor. Skip topics that need a medical professional's judgement to write safely.
- **Every run, also check yesterday's articles** (from `state.published`): reread them on the live
  site; fix any error you find (read it with `daily/read-post-template.js`, replacing `PUT-SLUG-HERE`, then republish the corrected markdown with `daily/update-post-template.js`, which takes `meta.json` + `article.md` like the create script and keeps every existing link) and note it in the log.

All files mentioned are in this repo (`kautilya27/knewspaper`, branch `main`), under `daily/`.
`daily/state.json` records progress; read it first and commit it at the end.

## Tools

- Wix: `mcp__Wix__ExecuteWixAPI` (load with ToolSearch `select:mcp__Wix__ExecuteWixAPI`), always with
  `siteId: "fc7a03c1-28fe-4510-90ba-025a62b06835"` and
  `sourceDocUrls: ["https://dev.wix.com/docs/api-reference/business-solutions/blog/draft-posts/create-draft-post","https://dev.wix.com/docs/api-reference/assets/media/media-manager/files/generate-file-upload-url"]`.
  When a step says "run X", pass the file's contents **verbatim** as `code` (only replacing a
  `PUT-...-HERE` placeholder if the step says so). The shell cannot reach Wix.
- Research: WebSearch / WebFetch.
- Images: Claude in Chrome (`mcp__claude-in-chrome__*`, load them in one ToolSearch call). Load the
  `chrome-browser` skill first if it is listed.

## Steps

### 1. What's already published
Run `daily/existing-posts-template.js` (`hasMutations: false`). It returns every published article
(`slug | title`) and every topic (`slug | label`). Keep the list; you check every new topic against it.

### 2. Choose today's 3 topics

**Plan topics (2), balanced:** the plan is mostly health, so each day take **at most 1 topic from
Health & Fitness or Psychology & Mental Health**, and **1 from Education, Career & Jobs or
Self-Improvement** (if those run out, take both from health). Within each group, go through
`plan.csv` in `order`, taking the first row whose `order` is not in `state.usedPlan` or
`state.skippedPlan`. For each candidate row:
- Skip it if the site (step 1) or `state.published` already has an article on the same subject,
  even with different wording (e.g. "Add vs ADHD" vs an existing `add-vs-adhd`; "How to stop
  procrastinating" vs "procrastination tips"). Add `{"order", "reason": "duplicate of <slug>"}` to
  `state.skippedPlan`.
- Skip topics that would be harmful or that a general Indian news/explainer site shouldn't publish
  (explicit sexual content, instructions for anything dangerous) and record the reason. Sexual-health
  topics are fine when written as respectful, medically accurate health information.
- Skip topics aimed only at another country's system (e.g. UK GCSE or US-only rules) unless you can
  write them usefully for Indian readers; record the reason.
- Add the `order` of each row you use to `state.usedPlan`.

**Trending topic (1):** use WebSearch to find what people in India are searching for this week
(e.g. Google Trends India daily/realtime trends, "trending in India today", upcoming exams/results,
festivals in the next 2 weeks, big sports events, government schemes and deadlines, phone/tech
launches). Choose one where an **explainer** helps the reader ("What is…", "How to…", "When is…",
"Explained"), and which is not already covered (step 1). Avoid: deaths and tragedies, crime,
celebrity gossip, elections and party politics, communal or divisive issues, rumours, anything you
can't verify from official or major news sources.

### 2b. Tuesdays and Fridays: one civics & economy article (instead of the trending one)
On **Tuesday and Friday** (India time), replace the trending topic with the first row of
`daily/civics.csv` (in `order`) whose `order` is not in `state.usedCivics` or `state.skippedCivics`
(add the field if missing). Use the row's `angle` as the outline, its `categorySlug`, and add the
`order` to `state.usedCivics`. When the list runs out, add 6 new rows in the same spirit (how the
economy, government, democracy and rights work, explained for Indian readers, e.g. what the RTI Act
gives you, how inflation is measured, what the Election Commission does, federalism and states'
money), commit them, and take the first one.

These pieces must be the most careful on the site:
- **Facts only, with sources named in the text** (official data: MoSPI, RBI, World Bank, IMF,
  Election Commission, court judgments; fact-checkers: Alt News, BOOM, AFP Fact Check, PIB Fact
  Check; major outlets). Every claim about a real person must be documented by a reliable source;
  if it isn't, leave it out. No insults, no nicknames used as fact, no guessing at motives.
- **Name no political party** anywhere in these articles, neither positively nor negatively, and
  don't criticise or praise any current officeholder by name. Where a source attributes something
  to a party, write "a political party" or "organised online campaigns" and keep only what the
  source documents.
- **Fair:** give the main counter-view or the government's/critics' response in a sentence or two
  wherever a point is contested. An `opinion` row is written as an opinion piece: say so in the
  first lines ("This is an opinion piece…"), make the argument with facts, then answer the main
  counter-arguments honestly.
- No comparisons of present-day Indian leaders or parties to Hitler or other dictators.
- The image prompt must not show any real person: use a symbolic scene (an empty podium with
  microphones, a rupee coin and a dollar note, a parliament building silhouette).
- The quality gate (3b) adds a 7th check for these: "Is every statement about a real person
  sourced and fair, is no party named, and would a reader of any political view find it accurate?"

### 2c. Mondays and Thursdays: one topic the big niche sites rank for (instead of the trending one)
On **Monday and Thursday** (India time), replace the trending topic with the first row of
`daily/niche-topics.csv` (in `order`) whose `order` is not in `state.usedNiche` or
`state.skippedNiche` (add the fields if missing). These are evergreen queries that the biggest
Indian sites in each niche (NoBroker and Housing.com for real estate, BYJU'S and Oswaal for
education, ClearTax and Groww for finance, and so on) get traffic from. The row gives the main
query (`primaryQuery`), the comparable page (`inspiredBy`) and the gap we can fill (`gap`).
- Read the `inspiredBy` page and the other top results for `primaryQuery` first. Our article must
  beat them on the `gap` (more current rules and figures from official sources, a clearer table, a
  worked example, a state-by-state view). Never copy their text or structure. If you can't beat
  them, skip the row (`{"order", "reason"}` in `skippedNiche`) and take the next one.
- Use the row's `categorySlug`; add its `order` to `state.usedNiche`.
- If `daily/niche-topics.csv` is missing or every row is used, do the research in the next point first;
  if that isn't possible today, fall back to the trending topic.
- When fewer than 5 rows are left, research again: look at what those niche sites (and the
  leading sites in other niches) publish and rank for, check the topics against the site's
  articles and `plan.csv`, and append 20 new rows in the same format.

### 3. Research and write each article
For each topic:
- Research with WebSearch/WebFetch. Check every fact that could be wrong or out of date (dates,
  rules, fees, figures, medical claims) against current, reliable sources: official/government sites,
  WHO/ICMR/NHS/major hospitals for health, regulators (RBI, SEBI, NTA, UGC…), major news outlets.
  Never invent numbers, quotes, studies or statistics. If you can't verify something, leave it out.
- Don't copy the competitor link in `plan.csv`: it shows the search intent only. Write original text.
- Write for readers in India: Indian context, ₹, lakh/crore, Indian institutions and examples where
  relevant. Plain, friendly Indian English. Short paragraphs.
- Structure (markdown):
  - Open with the direct answer in the first 2 paragraphs (a bold `**Quick answer:**` line works).
  - `##` sections and `###` sub-sections with natural search wording; lists and a table where they
    help.
  - End with `## Frequently asked questions` and 4 `### Question?` subheadings, each answered in 1–3
    sentences (this makes the FAQ schema).
  - 1,000–1,500 words. No `#` H1 (the title is the H1), no HTML, no images in the body.
- Health topics: mainstream medical guidance only, no miracle claims, suggest seeing a doctor where
  appropriate; add nothing that could be read as a diagnosis or dosage advice. Relationship topics:
  respectful and consent-first. Finance: explain, don't advise.
- Links: 2–3 internal links to genuinely related Knewspaper articles from step 1 as
  `[anchor](https://www.knewspaper.in/post/<slug>)`, and at most 1–2 external links to official or
  authoritative sources where useful. No affiliate, shop or other-blog links.
- Markdown the publisher understands (nothing else): `## H2`, `### H3`, paragraphs, `**bold**`,
  `*italic*`, `[text](https://...)`, `- bullet`, `1. numbered`, pipe tables, `> quote`, `---`.
- Meta: slug (lowercase-hyphenated, short, main keyword, never one that exists), title (≤ 100 chars),
  seoTitle (≤ 60 chars, main query first), seoDescription (130–155 chars, answers the query),
  excerpt (≤ 250 chars), categorySlug (one of the site's topics from step 1; plan categories map as:
  Health & Fitness → health-fitness, Psychology & Mental Health → health-fitness, Education →
  education, Career & Jobs → career, Self-Improvement → career; trending topics: the closest topic).
- Re-read the article once for accuracy, tone and duplicate content before publishing.

### 3b. Quality gate (an independent check before publishing)
For each finished draft, start a separate review agent (the Agent tool, `general-purpose`) that has
NOT seen you write it. Give it only: the topic, the markdown, the meta, and this checklist. It must
answer PASS or FAIL with reasons:
1. Every fact, figure, date and rule is correct as of today: it checks the important ones itself
   with WebSearch/WebFetch against official or major sources.
2. It answers the main query in the first two paragraphs.
3. It offers something the top 5 results for the query don't (it searches and compares).
4. No filler, generic or padded passages; no repeated points; reads as written for a person.
5. Safe and responsible (health/finance/relationship rules above); no unverified claims.
6. Not a near-duplicate of an existing Knewspaper article.
On FAIL, fix the listed problems and run the gate once more with a fresh agent. If it fails twice,
don't publish: record the topic and reasons in `daily/log.md` and move on.

### 4. Featured image (when Chrome is reachable)
Do this for each article before publishing it. If the Chrome tools are missing, don't respond, or
ChatGPT isn't signed in or refuses (e.g. its daily image limit is reached), skip the image: publish
without a cover and add the slug to `state.pendingImages`. Don't spend more than ~10 minutes on
images per run.
If `state.preparedImages` has an entry for the topic (lower-case title), use that file instead.

1. `tabs_context_mcp`, then open a new tab at `https://chatgpt.com/` (start a new chat each time).
2. Type exactly this prompt and send it:
   `<Article title>: create image for this article topic without any text`
   Wait (check every ~15 s, up to ~3 min) until the image has finished generating.
3. In that tab, run with `javascript_tool`:
   ```js
   const imgs=[...document.querySelectorAll('main img')].filter(i=>i.naturalWidth>=512);
   const img=imgs[imgs.length-1];
   const blob=await (await fetch(img.src)).blob();
   const bmp=await createImageBitmap(blob);
   const c=document.createElement('canvas');const W=Math.min(1600,bmp.width);c.width=W;c.height=Math.round(bmp.height*W/bmp.width);
   c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
   window.__kjpg=await new Promise(r=>c.toBlob(r,'image/jpeg',0.85));
   ({w:c.width,h:c.height,size:window.__kjpg.size})
   ```
   Note the width and height. Look at a screenshot: if the image contains text, letters or logos, or
   doesn't fit the article, ask ChatGPT once for a new version without them and repeat this step.
4. Run `daily/upload-url-template.js` with `PUT-SLUG-HERE` replaced by the article slug. It returns
   `uploadUrl` (about 3,300 characters) and its `length`.
5. ChatGPT's page can't send data to other sites, so it hands the image to the helper page
   `https://www.knewspaper.in/relay.html`. In the ChatGPT tab run:
   ```js
   window.__relayMsgs=[];
   if(!window.__relayListen){addEventListener('message',e=>{if(e.origin==='https://www.knewspaper.in')window.__relayMsgs.push(e.data)});window.__relayListen=true;}
   document.getElementById('kn-relay-btn')?.remove();
   const b=document.createElement('button');b.id='kn-relay-btn';b.textContent='Send image to Knewspaper';
   b.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:99999;padding:10px 18px;background:#1f3864;color:#fff;border:0;border-radius:999px';
   b.onclick=()=>{window.__relay=window.open('https://www.knewspaper.in/relay.html','knrelay','width=420,height=260')};
   document.body.append(b);'ok'
   ```
   Then find that button (`find` "Send image to Knewspaper button") and click it with the `computer`
   tool (a real click is needed to open the window). Then run, pasting the `uploadUrl` from step 4
   exactly:
   ```js
   const u="PASTE-UPLOAD-URL";
   await new Promise(r=>setTimeout(r,2500));
   window.__relay.postMessage({id:1,url:u,blob:window.__kjpg},'https://www.knewspaper.in');
   for(let i=0;i<40&&!window.__relayMsgs.some(m=>m.id===1);i++)await new Promise(r=>setTimeout(r,500));
   const res=window.__relayMsgs.find(m=>m.id===1)||'no reply';
   try{window.__relay.close()}catch{} document.getElementById('kn-relay-btn')?.remove();
   ({len:u.length,res})
   ```
   `len` must equal the `length` from step 4 (otherwise the URL was mis-copied: get a new one and
   retry once). Success is `res.ok: true` with `res.fileId` like `c0f544_…~mv2.jpg`: that is the
   cover id. Close the ChatGPT tab when done.
6. If the image was made but the upload doesn't work after one retry, leave that ChatGPT chat as it
   is (don't delete it; its title is the article's title), publish without a cover, add the slug to
   `pendingImages` with the note "image ready in ChatGPT", and say so in the report: the owner will
   download it and send it in chat.

### 5. Publish
Run `daily/create-post-template.js` (`hasMutations: true`) with `files`:
```
=== FILE: meta.json ===
{"slug":"...","title":"...","seoTitle":"...","seoDescription":"...","excerpt":"...","categorySlug":"...","cover":{"id":"<fileId>","width":1600,"height":900}}
§END
=== FILE: article.md ===
...markdown...
§END
```
(`"cover": null` when there is no image.) It refuses duplicates, unknown topics, missing FAQs and
short articles; fix the cause and retry. Record each published article in `state.published` as
`{"date","slug","title","source":"plan #<order>"|"trending"|"civics #<order>"|"niche #<order>","cover":true|false}`.

### 6. Missing images from earlier days
If Chrome/ChatGPT worked today, also make images for up to 3 slugs in `state.pendingImages`
(same step 4, using the article's title) and set them with `daily/set-cover-template.js`
(files: `=== FILE: cover.json ===` `{"slug","id","width","height"}` `§END`). Remove each done slug
from `pendingImages`.

### 7. Rebuild the site's pages
Run `wix-preview/prerender/deploy.js` verbatim as `code` (`hasMutations: true`) with
`files` = `=== FILE: edits.json ===` / `[]` / `§END`. It pre-renders every article (including
today's), updates the sitemap and adds the `/post/<slug>` addresses. Check that the result says
`published: true` and that `pages` went up by the number of articles published today.

### 8. Save progress
Write `daily/state.json` and append today's summary to `daily/log.md` (date, the 3 articles with
URLs, image yes/no, skipped plan rows, anything unsure). Commit and push to `main`.

### 9. Report
Short summary: the 3 article titles with links, which have images, anything skipped and why,
and any fact you weren't sure about.
