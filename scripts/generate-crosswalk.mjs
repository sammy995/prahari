import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { controlCore, deriveCoverage, validateControlCore } from '@prahari/crosswalk';

const checkMode = process.argv.includes('--check');
const OUT_DIR = 'reference/crosswalk';
const JSON_OUT = `${OUT_DIR}/control-core.json`;

// Per-framework presentation metadata. Frameworks not listed fall back to the id.
const FRAMEWORK_META = {
  'nist-ai-rmf': { label: 'NIST AI RMF 1.0', source: 'NIST AI RMF 1.0' },
  'iso-42001': { label: 'ISO/IEC 42001:2023', source: 'ISO/IEC 42001:2023 (Annex A)' },
};

const errors = validateControlCore(controlCore);
if (errors.length) {
  console.error('Invalid control core:\n' + errors.join('\n'));
  process.exit(1);
}

const byCore = (id) => controlCore.coreControls.find((c) => c.id === id);
const frameworks = [...new Set(controlCore.frameworkClauses.map((c) => c.framework))].sort();

function renderPage(fw) {
  const meta = FRAMEWORK_META[fw] ?? { label: fw, source: fw };
  const cov = deriveCoverage(controlCore, fw);
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

  return `# Crosswalk — ${meta.label}

[← Crosswalk](README.md) · Generated from \`@prahari/crosswalk\` — do not edit by hand.

> Not legal advice; not a ${meta.source} or RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts.

Implementing the Prahari Control Core covers the **shared backbone** of ${meta.label}. It does **not** make you "${meta.label} compliant"; the deltas below are obligations the core does not cover.

**Coverage:** ${cov.mappedClauses.length} ${meta.label} clauses mapped · ${cov.deltaClauses.length} deltas · ${controlCore.coreControls.length} core controls.

## Core control → ${meta.label}

| Prahari Control Core | RBI | ${meta.label} | Relationship | Notes |
| --- | --- | --- | --- | --- |
${mapRows}

## Deltas — ${meta.label} obligations not covered by the core

| ${meta.label} | Title | Status |
| --- | --- | --- |
${deltaRows || '| — | — | _No deltas in the considered set._ |'}

---

*Cite as:* **Prahari Crosswalk — ${meta.label}** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026) and ${meta.source}; re-verify against source texts.
`;
}

// Build the full set of artifacts (path -> content).
const artifacts = new Map();
for (const fw of frameworks) artifacts.set(`${OUT_DIR}/${fw}.md`, renderPage(fw));
artifacts.set(JSON_OUT, JSON.stringify(controlCore, null, 2) + '\n');

// Compare on normalized line endings so the drift gate is not tripped by
// git's autocrlf checking out CRLF while the generator emits LF.
const normalize = (s) => s.replace(/\r\n/g, '\n');

if (checkMode) {
  const stale = [];
  for (const [path, content] of artifacts) {
    const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
    if (normalize(current) !== normalize(content)) stale.push(path);
  }
  if (stale.length) {
    console.error('Crosswalk artifacts are stale. Run: npm run crosswalk:gen\n  ' + stale.join('\n  '));
    process.exit(1);
  }
  console.log(`Crosswalk artifacts up to date (${artifacts.size} files, ${frameworks.length} frameworks).`);
} else {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  for (const [path, content] of artifacts) writeFileSync(path, content);
  console.log(`Wrote ${artifacts.size} files for ${frameworks.length} frameworks: ${frameworks.join(', ')}`);
}
