// A small, dependency-free HTML parser: enough for the guest post editor's
// output and for whatever someone pastes or sends by hand. It builds a tree of
// { nodeType: 1, rawTagName, attrs, childNodes } and { nodeType: 3, text }
// nodes. Comments, doctype, and the contents of script/style/etc. are dropped.
// Unclosed tags are closed at the end, a stray closing tag is ignored, and a
// closing tag closes everything opened after its match.

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style", "textarea", "title", "noscript", "template", "iframe", "xmp"]);
// Opening one of these closes an open <p> (as browsers do).
const CLOSES_P = new Set(["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "blockquote", "table", "pre", "section", "article", "header", "footer", "figure"]);

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", rupee: "₹", copy: "©", reg: "®", trade: "™", bull: "•", middot: "·", times: "×", deg: "°" };

export function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return code > 0 && code < 0x110000 ? String.fromCodePoint(code) : "";
    }
    const v = NAMED[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}

class Element {
  constructor(tag, attrs, parent) {
    this.nodeType = 1;
    this.rawTagName = tag;
    this.attrs = attrs;
    this.parentNode = parent;
    this.childNodes = [];
  }
  getAttribute(name) {
    const v = this.attrs[name.toLowerCase()];
    return v === undefined ? null : v;
  }
  removeChild(node) {
    const i = this.childNodes.indexOf(node);
    if (i >= 0) this.childNodes.splice(i, 1);
  }
  get text() {
    return this.childNodes.map((c) => c.text).join("");
  }
}

const textNode = (text) => ({ nodeType: 3, text });

function parseAttrs(src) {
  const attrs = {};
  const re = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = re.exec(src))) {
    const name = m[1].toLowerCase();
    if (!(name in attrs)) attrs[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

export function parse(html) {
  const src = String(html || "");
  const root = new Element("#root", {}, null);
  let cur = root;
  let i = 0;
  const text = (t) => { if (t) cur.childNodes.push(textNode(decodeEntities(t))); };
  const open = (tag) => { for (let n = cur; n && n !== root; n = n.parentNode) if (n.rawTagName === tag) return n; return null; };

  while (i < src.length) {
    const lt = src.indexOf("<", i);
    if (lt < 0) { text(src.slice(i)); break; }
    text(src.slice(i, lt));
    i = lt;
    if (src.startsWith("<!--", i)) { const end = src.indexOf("-->", i + 4); i = end < 0 ? src.length : end + 3; continue; }
    if (src.startsWith("<!", i) || src.startsWith("<?", i)) { const end = src.indexOf(">", i); i = end < 0 ? src.length : end + 1; continue; }
    const close = /^<\/([a-zA-Z][\w:-]*)\s*>/.exec(src.slice(i, i + 200));
    if (close) {
      const tag = close[1].toLowerCase();
      const match = open(tag);
      if (match) cur = match.parentNode;
      i += close[0].length;
      continue;
    }
    const tagM = /^<([a-zA-Z][\w:-]*)((?:\s+[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/.exec(src.slice(i));
    if (!tagM) { text("<"); i += 1; continue; }
    const tag = tagM[1].toLowerCase();
    i += tagM[0].length;
    if (RAW.has(tag)) {
      // Skip the raw contents entirely; the converter drops these tags anyway.
      const end = src.toLowerCase().indexOf("</" + tag, i);
      if (end < 0) { i = src.length; continue; }
      const gt = src.indexOf(">", end);
      i = gt < 0 ? src.length : gt + 1;
      continue;
    }
    if (CLOSES_P.has(tag)) { const p = open("p"); if (p) cur = p.parentNode; }
    if (tag === "li") {
      // A new item closes the previous one in the same list (not one in an outer list).
      for (let n = cur; n && n !== root; n = n.parentNode) {
        if (n.rawTagName === "ul" || n.rawTagName === "ol") break;
        if (n.rawTagName === "li") { cur = n.parentNode; break; }
      }
    }
    const el = new Element(tag, parseAttrs(tagM[2] || ""), cur);
    cur.childNodes.push(el);
    if (!VOID.has(tag) && !tagM[3]) cur = el;
  }
  return root;
}
