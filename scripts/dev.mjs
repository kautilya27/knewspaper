#!/usr/bin/env node
// npm run dev: build once, serve dist, rebuild when source files change.
// Each rebuild fetches live Wix content again (about 10-20 s for ~400
// posts). For fast design work use: npm run dev -- --fixtures

import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extra = process.argv.slice(2);

const build = () =>
  new Promise((resolve) => {
    const p = spawn(process.execPath, [path.join(ROOT, 'scripts/build.mjs'), ...extra], { stdio: 'inherit', cwd: ROOT });
    p.on('exit', resolve);
  });

await build();
serve();

let timer;
for (const dir of ['src', 'site.config.mjs']) {
  watch(path.join(ROOT, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log('\nChange detected, rebuilding…');
      await build();
    }, 150);
  });
}
