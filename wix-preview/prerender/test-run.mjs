import fs from "node:fs"; import { execSync } from "node:child_process";
const W="/home/claude/knewspaper/wix-preview/";
const live={};
for (const f of ["site.js","post.js","fast.js","seo.js","guest-rules.js","write.js","home.js","search.js"]) live["assets/"+f]=execSync(`git -C ${W} show HEAD:wix-preview/src/assets/${f}`).toString();
live["assets/feed.js"]=fs.readFileSync(W+"src/assets/feed.js","utf8");
for (const f of fs.readdirSync(W+"site")) if (f.endsWith(".html")) live[f]=fs.readFileSync(W+"site/"+f,"utf8");
for (const f of ["terms.html","refund-policy.html","404.html"]) live[f]=live["privacy-policy.html"];
live["terms.html"]+="<li>and at most 2 do-follow and 3 no-follow external links.</li>";
live["sitemap-articles.xml"]='<?xml version="1.0"?><urlset><url><loc>https://www.knewspaper.in/</loc></url><url><loc>https://www.knewspaper.in/post/old</loc></url></urlset>';
const T=(t,d=[])=>({type:"TEXT",textData:{text:t,decorations:d}});
const P=(...n)=>({type:"PARAGRAPH",nodes:n});
const H=(l,t)=>({type:"HEADING",headingData:{level:l},nodes:[T(t)]});
const nodes=[{type:"IMAGE",imageData:{image:{src:{id:"abc_123~mv2.jpg"}},altText:"cover"}},P(T("Intro para one with "),T("a link",[{type:"LINK",linkData:{link:{url:"https://www.knewspaper.in/post/other-post",target:"SELF"}}}])),P(T("Para two")),H(2,"First section"),P(T("p3")),{type:"IMAGE",imageData:{image:{src:{id:"img_2~mv2.jpg"}},altText:"second"}},H(2,"Second section"),P(T("p4")),H(2,"FAQs"),H(3,"Is it good?"),P(T("Yes it is.")),H(3,"Is it bad?"),P(T("No.")),H(2,"Verdict"),P(T("Done <script>"))];
const posts=[{id:"1",slug:"test-post",title:"Test Post Title That Is Quite Long Indeed For Testing",excerpt:"Short excerpt",firstPublishedDate:"2024-05-01T10:00:00Z",lastPublishedDate:"2026-11-05T05:00:00Z",minutesToRead:4,categoryIds:["c1"],memberId:"c0f544a7-207e-490b-b7d9-830ef39f49c7",media:{wixMedia:{image:{id:"abc_123~mv2.jpg",url:"x",width:800,height:600}},displayed:true},richContent:{nodes},seoData:{tags:[{type:"title",children:"SEO Title"},{type:"meta",props:{name:"description",content:"SEO desc \"quoted\""}}]},relatedPostIds:[]},
{id:"2",slug:"other-post",title:"Other",firstPublishedDate:"2025-01-01T00:00:00Z",lastPublishedDate:"2025-01-01T00:00:00Z",categoryIds:["c1"],memberId:"m2",richContent:{nodes:[P(T("x"))]}}];
let patched=null, redir=[];
globalThis.files=[{path:"edits.json",content:fs.readFileSync(W+"prerender/edits.json","utf8")+"\n§END"},{path:"prerender/editorial-team-main.html",content:fs.readFileSync(W+"prerender/editorial-team-main.html","utf8")+"§END\n"}];
globalThis.wix={headless:{files:{
 list:async({offset=0})=>({files:offset?[]:[...Object.keys(live),"js/wix/post-store.js","js/wix/comments-store.js","js/wix/media.js","js/wix/posts-core.js","js/wix/client.js","js/wix/authors.js","js/wix/taxonomy.js","js/wix/blog-feed-store.js","js/wix/member-store.js","js/wix/purchase.js","js/wix/search.js","post/zz-test.html"].map(path=>({path})),hasMore:false}),
 read:async({path})=>({text:live[path]??"export const x = 1;\n",offset:0,length:1,hasMore:false}),
 patch:async(o)=>{patched=o;return {published:true,summary:{added:o.files.map(f=>f.path),replaced:[],deleted:o.deletePaths,unchanged:[]}}}}},
 request:async({url,body})=>{
  if(url.includes("/posts/query")) return {posts,pagingMetadata:{hasNext:false}};
  if(url.includes("/categories")) return {categories:[{id:"c1",slug:"anime",label:"Anime"}]};
  if(url.includes("/members/query")) return {members:[{id:"c0f544a7-207e-490b-b7d9-830ef39f49c7",profile:{nickname:"Knewspaper Editorial Team"}},{id:"m2",profile:{nickname:"roynudh"}}]};
  if(url.endsWith("/redirects")) return {redirects:[{id:"r1",from:"/post/test-post",to:"/post.html?slug=test-post"},{id:"r2",from:"/post/dup",to:"/post.html?slug=other-post"}]};
  if(url.includes("bulk/redirects/create")){redir.push(...body.redirects);return {bulkActionMetadata:{totalSuccesses:body.redirects.length},results:[]};}
  throw Error("unmocked "+url);}};
const fn=(0,eval)("("+fs.readFileSync(W+"prerender/deploy.js","utf8")+")");
const rep=await fn();
console.log(JSON.stringify(rep));
console.log(redir);
const out=Object.fromEntries(patched.files.map(f=>[f.path,f.content]));
console.log(Object.keys(out).join(" "));
fs.writeFileSync(process.argv[2]+"/test-post.html",out["post/test-post.html"]);
fs.writeFileSync(process.argv[2]+"/ed.html",out["editorial-team.html"]);
for (const k of ["assets/post.bundle.js","assets/site.js","assets/prerendered.js","sitemap-articles.xml"]) fs.writeFileSync(process.argv[2]+"/"+k.replace("/","_"),out[k]||"MISSING");
const want={"assets/site.js":"site.js","assets/post.js":"post.js","assets/fast.js":"fast.js","assets/seo.js":"seo.js","assets/guest-rules.js":"guest-rules.js","assets/write.js":"write.js"};
for (const [k,v] of Object.entries(want)) console.log(k, out[k]===fs.readFileSync(W+"src/assets/"+v,"utf8")?"identical":"DIFF");
