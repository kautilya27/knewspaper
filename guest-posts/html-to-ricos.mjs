// A guest post's HTML (from the Write for us editor) → Wix Ricos nodes, plus
// what the rules check: words, headings, links. Only a small set of tags
// survives: p, h2, h3 (h1 → h2, h4–h6 → h3), strong/b, em/i, a, ul/ol/li,
// blockquote, br. Everything else keeps its text and loses its markup, so
// scripts, styles, images and iframes never reach the post.
import { parse } from "./mini-html.mjs";
import { countWords, parseLink } from "../wix-preview/src/assets/guest-rules.js";

const DROP = new Set(["script", "style", "iframe", "object", "embed", "noscript", "template", "svg", "img", "video", "audio", "form", "input", "button", "select", "textarea", "head", "title", "meta", "link"]);
const BLOCKS = new Set(["p", "div", "section", "article", "header", "footer", "main", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "table", "tr", "td", "th", "tbody", "thead", "pre", "figure", "figcaption"]);

export function htmlToRicos(html) {
  const root = parse(String(html || ""));
  let n = 0;
  const id = () => "g" + (n++).toString(36);
  const doc = { words: 0, h2: 0, h3: 0, links: [], badLinks: 0 };
  const nodes = [];
  let plainText = "";

  const textNode = (text, decorations) => ({ type: "TEXT", id: "", nodes: [], textData: { text, decorations } });

  // Inline content of an element → TEXT nodes.
  const inline = (el, decos, out) => {
    for (const c of el.childNodes) {
      if (c.nodeType === 3) {
        const t = c.text.replace(/\s+/g, " ");
        if (t) out.push(textNode(t, decos));
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = c.rawTagName ? c.rawTagName.toLowerCase() : "";
      if (DROP.has(tag)) continue;
      if (tag === "br") { out.push(textNode("\n", decos)); continue; }
      if (tag === "strong" || tag === "b") { inline(c, [...decos, { type: "BOLD", fontWeightValue: 700 }], out); continue; }
      if (tag === "em" || tag === "i") { inline(c, [...decos, { type: "ITALIC", italicData: true }], out); continue; }
      if (tag === "a") {
        const link = parseLink(c.getAttribute("href"));
        if (!link) { if ((c.getAttribute("href") || "").trim()) doc.badLinks++; inline(c, decos, out); continue; }
        doc.links.push({ href: link.href, internal: link.internal });
        // Paid post: every outside link is rel="sponsored", whatever the writer chose.
        const linkData = link.internal
          ? { link: { url: link.href, target: "SELF" } }
          : { link: { url: link.href, target: "BLANK", rel: { noreferrer: true, sponsored: true } } };
        inline(c, [...decos.filter((d) => d.type !== "LINK"), { type: "LINK", linkData }], out);
        continue;
      }
      inline(c, decos, out); // span, u, code, mark, nested blocks inside inline context…
    }
    return out;
  };

  // Trim the edges of a run of TEXT nodes and drop the empty ones.
  const tidy = (texts) => {
    if (texts.length) {
      texts[0].textData.text = texts[0].textData.text.replace(/^[ \n]+/, "");
      const last = texts[texts.length - 1];
      last.textData.text = last.textData.text.replace(/[ \n]+$/, "");
    }
    return texts.filter((t) => t.textData.text);
  };
  const words = (texts) => texts.map((t) => t.textData.text).join("");

  const paragraph = (texts) => ({ type: "PARAGRAPH", id: id(), nodes: texts, paragraphData: { textStyle: { textAlignment: "AUTO" } } });
  const pushParagraph = (texts) => {
    texts = tidy(texts);
    if (!texts.length) return;
    plainText += words(texts) + "\n";
    nodes.push(paragraph(texts));
  };

  const listItems = (listEl, items) => {
    for (const li of listEl.childNodes) {
      if (li.nodeType !== 1) continue;
      const tag = li.rawTagName.toLowerCase();
      if (tag === "ul" || tag === "ol") { listItems(li, items); continue; }
      // Text of the item without its nested lists; nested items follow it in the same list.
      const nested = li.childNodes.filter((c) => c.nodeType === 1 && /^(ul|ol)$/i.test(c.rawTagName));
      nested.forEach((c) => li.removeChild(c));
      const texts = tidy(inline(li, [], []));
      if (texts.length) {
        plainText += words(texts) + "\n";
        items.push({ type: "LIST_ITEM", id: id(), nodes: [paragraph(texts)] });
      }
      nested.forEach((c) => listItems(c, items));
    }
    return items;
  };

  // Walk block-level content; loose inline runs become paragraphs.
  const blocks = (el) => {
    let run = [];
    const flush = () => { pushParagraph(run); run = []; };
    for (const c of el.childNodes) {
      if (c.nodeType === 3) { const t = c.text.replace(/\s+/g, " "); if (t.trim()) run.push(textNode(t, [])); continue; }
      if (c.nodeType !== 1) continue;
      const tag = c.rawTagName ? c.rawTagName.toLowerCase() : "";
      if (DROP.has(tag)) continue;
      if (!BLOCKS.has(tag)) {
        if (tag === "br") { flush(); continue; }
        inline({ childNodes: [c] }, [], run);
        continue;
      }
      flush();
      if (/^h[1-6]$/.test(tag)) {
        const level = tag === "h1" || tag === "h2" ? 2 : 3;
        const texts = tidy(inline(c, [], []).map((t) => ({ ...t, textData: { ...t.textData, decorations: t.textData.decorations.filter((d) => d.type !== "BOLD") } })));
        if (!texts.length) continue;
        if (level === 2) doc.h2++; else doc.h3++;
        plainText += words(texts) + "\n";
        nodes.push({ type: "HEADING", id: id(), nodes: texts, headingData: { level, textStyle: { textAlignment: "AUTO" } } });
      } else if (tag === "ul" || tag === "ol") {
        const items = listItems(c, []);
        if (items.length) nodes.push(tag === "ul"
          ? { type: "BULLETED_LIST", id: id(), nodes: items, bulletedListData: { indentation: 0 } }
          : { type: "ORDERED_LIST", id: id(), nodes: items, orderedListData: { indentation: 0 } });
      } else if (tag === "blockquote") {
        const texts = tidy(inline(c, [], []));
        if (texts.length) {
          plainText += words(texts) + "\n";
          nodes.push({ type: "BLOCKQUOTE", id: id(), nodes: [paragraph(texts)], blockquoteData: { indentation: 1 } });
        }
      } else if (c.childNodes.some((k) => k.nodeType === 1 && BLOCKS.has(k.rawTagName.toLowerCase()))) {
        blocks(c); // a wrapper (div, section, table…) holding blocks
      } else {
        pushParagraph(inline(c, [], []));
      }
    }
    flush();
  };
  blocks(root);

  doc.words = countWords(plainText);
  return { nodes, doc, text: plainText };
}
