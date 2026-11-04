// Tiny bundler for the Knewspaper Wix-hosted pages. Wix static hosting serves
// each script file with its own round trip, so a page that imports 15 small
// modules waits for 15 requests in a row. bundle() joins a page's whole import
// graph into ONE script. It handles the forms these files use:
//   import { a, b as c } from "./x.js";
//   export function / async function / const / class NAME
//   export { a, b as c };
// The same function body runs on Wix against the live files.

export function bundle(entry, read) {
  const order = [];
  const seen = new Set();
  const sources = {};

  const resolve = (spec, from) => {
    if (spec.startsWith("/")) return spec;
    const dir = from.slice(0, from.lastIndexOf("/") + 1);
    const parts = (dir + spec).split("/");
    const out = [];
    for (const p of parts) {
      if (p === "..") out.pop();
      else if (p !== ".") out.push(p);
    }
    return out.join("/");
  };

  const IMPORT = /^\s*import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']\s*;?[ \t]*$/gm;
  const visit = (key) => {
    if (seen.has(key)) return;
    seen.add(key);
    const code = read(key);
    if (code == null) throw new Error("Missing module " + key);
    sources[key] = code;
    for (const m of code.matchAll(IMPORT)) visit(resolve(m[2], key));
    order.push(key);
  };
  visit(entry);

  const body = (key) => {
    const exports = [];
    let code = sources[key];
    code = code.replace(IMPORT, (_, names, spec) => {
      const list = names.split(",").map((s) => s.trim()).filter(Boolean)
        .map((s) => { const [a, b] = s.split(/\s+as\s+/); return b ? `${a.trim()}: ${b.trim()}` : a.trim(); });
      return `const { ${list.join(", ")} } = __r(${JSON.stringify(resolve(spec, key))});`;
    });
    code = code.replace(/^export\s+(async\s+function\*?|function\*?|class|const|let|var)\s+([A-Za-z_$][\w$]*)/gm, (_, kind, name) => {
      exports.push([name, name]);
      return `${kind} ${name}`;
    });
    code = code.replace(/^export\s*\{([^}]*)\}\s*;?[ \t]*$/gm, (_, names) => {
      for (const s of names.split(",").map((x) => x.trim()).filter(Boolean)) {
        const [local, as] = s.split(/\s+as\s+/);
        exports.push([local.trim(), (as || local).trim()]);
      }
      return "";
    });
    if (/^\s*(import|export)\b/m.test(code.split("\n").filter((l) => !l.trim().startsWith("//")).join("\n")))
      throw new Error("Unhandled import/export in " + key);
    const assign = exports.map(([local, as]) => `__e[${JSON.stringify(as)}] = ${local};`).join("\n");
    return `__d[${JSON.stringify(key)}] = (__e) => {\n${code}\n${assign}\n};`;
  };

  return [
    `// Bundled ${new Date().toISOString().slice(0, 10)} from ${entry} and ${order.length - 1} imported modules.`,
    "(() => {",
    "const __d = {}, __m = {};",
    "const __r = (k) => { if (__m[k]) return __m[k]; const e = (__m[k] = {}); __d[k](e); return e; };",
    ...order.map(body),
    `__r(${JSON.stringify(entry)});`,
    "})();",
    "",
  ].join("\n");
}
