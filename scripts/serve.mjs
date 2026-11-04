#!/usr/bin/env node
// Tiny static server for ./dist that mimics GitHub Pages (index.html for
// folders, 404.html for misses, served under BASE_PATH).

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 5173);
const BASE = ('/' + (process.env.BASE_PATH || '/').replace(/^\/|\/$/g, '') + '/').replace('//', '/');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
};

export function serve({ port = PORT, base = BASE } = {}) {
  const server = http.createServer(async (req, res) => {
    let url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (!url.startsWith(base)) {
      res.writeHead(302, { Location: base });
      return res.end();
    }
    let file = path.join(ROOT, url.slice(base.length));
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
      const s = await stat(file);
      if (s.isDirectory()) {
        if (!url.endsWith('/')) {
          res.writeHead(301, { Location: url + '/' });
          return res.end();
        }
        file = path.join(file, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(body);
    } catch {
      const body = await readFile(path.join(ROOT, '404.html')).catch(() => 'Not found');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
    }
  });
  server.listen(port, () => console.log(`Serving dist at http://localhost:${port}${base}`));
  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) serve();
