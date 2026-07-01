import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { controlCore, deriveCoverage, validateControlCore } from '@prahari/crosswalk';

const checkMode = process.argv.includes('--check');
const OUT_DIR = 'reference/crosswalk';
const MD = `${OUT_DIR}/nist-ai-rmf.md`;
const JSON_OUT = `${OUT_DIR}/control-core.json`;
const fw = 'nist-ai-rmf';

const errors = validateControlCore(controlCore);
if (errors.length) {
  console.error('Invalid control core:\n' + errors.join('\n'));
  process.exit(1);
}

const cov = deriveCoverage(controlCore, fw);
const byCore = (id) => controlCore.coreControls.find((c) => c.id === id);

function renderMd() {
  const mapRows = controlCore.mappings
    .filter((m) => m.framework === fw)
    .map((m) => {
      const c = byCore(m.coreControlId);
      const clause = controlCore.frameworkClauses.find((k) => k.framework === fw && k.ref === m.clauseRef);
      return `| \`${c.id}\` ${c.title} | Para ${c.rbiParas.join(', ')} | ${m.clauseRef} — ${clause?.title ?? ''} | ${m.relationship} | ${m.note ?? ''} |`;
    })
    .join('\n');

  const deltaRows = cov.deltaClauses
    .map((c) => `| ${c.ref} | ${c.title} | _No Prahari core control — assess separately._ |`)
    .join('\n');

  return `# Crosswalk — NIST AI RMF 1.0

[← Crosswalk](README.md) · Generated from \`@prahari/crosswalk\` — do not edit by hand.

> Not legal advice; not a NIST or RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts.

Implementing the Prahari Control Core covers the **shared backbone** of NIST AI RMF. It does **not** make you "NIST compliant"; the deltas below are obligations the core does not cover.

**Coverage:** ${cov.mappedClauses.length} NIST subcategories mapped · ${cov.deltaClauses.length} deltas · ${controlCore.coreControls.length} core controls.

## Core control → NIST AI RMF

| Prahari Control Core | RBI | NIST AI RMF 1.0 | Relationship | Notes |
| --- | --- | --- | --- | --- |
${mapRows}

## Deltas — NIST obligations not covered by the core

| NIST AI RMF | Title | Status |
| --- | --- | --- |
${deltaRows || '| — | — | _No deltas in the considered set._ |'}

---

*Cite as:* **Prahari Crosswalk — NIST AI RMF** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026) and NIST AI RMF 1.0; re-verify against source texts.
`;
}

const md = renderMd();
const json = JSON.stringify(controlCore, null, 2) + '\n';

if (checkMode) {
  const curMd = existsSync(MD) ? readFileSync(MD, 'utf8') : '';
  const curJson = existsSync(JSON_OUT) ? readFileSync(JSON_OUT, 'utf8') : '';
  if (curMd !== md || curJson !== json) {
    console.error('Crosswalk artifacts are stale. Run: npm run crosswalk:gen');
    process.exit(1);
  }
  console.log('Crosswalk artifacts up to date.');
} else {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(MD, md);
  writeFileSync(JSON_OUT, json);
  console.log(`Wrote ${MD} and ${JSON_OUT}`);
}
