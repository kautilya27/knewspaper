// Quick checks for the converter and the rules: node test.mjs
import assert from "node:assert/strict";
import { htmlToRicos } from "./html-to-ricos.mjs";
import { checkSubmission, slugify } from "../wix-preview/src/assets/guest-rules.js";

const filler = (n) => Array.from({ length: n }, (_, i) => "word" + i).join(" ");
const html = `<h2>Why it matters</h2><p>Intro with <strong>bold</strong> &amp; <em>italic</em> and a
<a href="https://example.com/a" rel="nofollow">no-follow link</a>, a <a href="https://example.org/b">do-follow link</a>,
an <a href="https://www.knewspaper.in/post/x">internal one</a> and <a href="javascript:alert(1)">bad</a>.</p>
<script>alert(1)</script><style>p{}</style><!-- note -->
<h3>Steps</h3><ul><li>One<li>Two <b>bold</b><ul><li>Nested</li></ul></li></ul>
<ol><li>First</li></ol><blockquote>Quote</blockquote><div><p>${filler(520)}</p></div><img src=x onerror=alert(1)>
<h1>Big</h1><p>Tail<br>line</p>`;
const r = htmlToRicos(html);
const types = r.nodes.map((n) => n.type);
assert.deepEqual(types, ["HEADING", "PARAGRAPH", "HEADING", "BULLETED_LIST", "ORDERED_LIST", "BLOCKQUOTE", "PARAGRAPH", "HEADING", "PARAGRAPH"]);
assert.equal(r.nodes[3].nodes.length, 3, "nested list item flattened into the list");
assert.equal(r.doc.h2, 2); assert.equal(r.doc.h3, 1);
assert.equal(r.doc.badLinks, 1);
assert.deepEqual(r.doc.links.map((l) => l.internal), [false, false, true]);
const links = r.nodes[1].nodes.filter((t) => t.textData.decorations.some((d) => d.type === "LINK")).map((t) => t.textData.decorations.find((d) => d.type === "LINK").linkData.link);
assert.equal(links[0].rel.sponsored, true); assert.equal(links[1].rel.sponsored, true); assert.ok(!links[1].rel.nofollow); assert.equal(links[2].target, "SELF");
assert.ok(!JSON.stringify(r.nodes).includes("alert"), "script content dropped");
assert.ok(r.nodes[1].nodes.some((t) => t.textData.text.includes("& ")), "entities decoded");
assert.ok(r.doc.words > 520 && r.doc.words < 600, "words " + r.doc.words);

const fields = { title: "A good title here", slug: "a-good-title", metaTitle: "A good SEO title", metaDescription: "x".repeat(120), imageAlt: "A photo of a thing", hasImage: true };
assert.deepEqual(checkSubmission(fields, { ...r.doc, badLinks: 0 }), []);
const many = { ...r.doc, badLinks: 0, links: [1, 2, 3, 4, 5, 6].map(() => ({ internal: false })).concat([{ internal: true }]) };
assert.equal(checkSubmission(fields, many).length, 1, "6 outside links flagged");
assert.equal(checkSubmission(fields, { ...many, links: many.links.slice(1) }).length, 0, "5 outside links pass");
assert.equal(checkSubmission(fields, { ...r.doc, badLinks: 0, h2: 0, h3: 3 }).length, 1, "needs an H2");
assert.equal(checkSubmission({ ...fields, slug: "Bad Slug" }, { ...r.doc, badLinks: 0 }).length, 1);
assert.equal(slugify("  Héllo, World!  10 Tips — 2026 "), "hello-world-10-tips-2026");
console.log("ok:", types.join(" "), "| words", r.doc.words);
