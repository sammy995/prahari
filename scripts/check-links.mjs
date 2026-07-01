import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

// Roots to scan for broken relative markdown links (the citeable moat must not rot).
const ROOTS = ['README.md', 'reference', 'examples/README.md'];

const files = [];
function walk(p) {
  if (!existsSync(p)) return;
  const s = statSync(p);
  if (s.isDirectory()) {
    for (const e of readdirSync(p)) walk(join(p, e));
  } else if (p.endsWith('.md')) {
    files.push(p);
  }
}
for (const r of ROOTS) walk(r);

const linkRe = /\]\(([^)]+)\)/g;
let broken = 0;
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  let m;
  while ((m = linkRe.exec(txt))) {
    let target = m[1].trim();
    if (/^(https?:|mailto:|#)/.test(target)) continue; // external / anchors
    target = target.split('#')[0]; // strip in-page anchor
    if (!target) continue;
    if (!existsSync(resolve(dirname(f), target))) {
      console.error(`BROKEN  ${f}  ->  ${m[1]}`);
      broken++;
    }
  }
}

if (broken) {
  console.error(`\n${broken} broken link(s) across ${files.length} files.`);
  process.exit(1);
}
console.log(`Link check passed (${files.length} markdown files).`);
