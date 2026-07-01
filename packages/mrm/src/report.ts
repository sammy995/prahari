/**
 * Examiner / board-ready RBI MRM report (Markdown) generated from the
 * inventory + checks. Maps to Para 12 (RMCB oversight) and Para 33 reporting.
 */

import { controlCore, deriveCoverage, type Framework } from '@prahari/crosswalk';
import { runChecks, summarizeFindings, type Finding } from './checks.js';
import { LifecycleState, type Inventory, type ModelRecord } from './model.js';

function countBy<T extends string>(items: T[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, k) => {
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
}

function tierLabel(m: ModelRecord): string {
  return m.tier ?? '—';
}

function findingsTable(findings: Finding[]): string {
  if (findings.length === 0) return '_No open findings._\n';
  const rows = findings
    .map((f) => `| ${f.severity.toUpperCase()} | ${f.code} | Para ${f.para} | ${f.modelName} | ${f.message} |`)
    .join('\n');
  return [
    '| Severity | Code | RBI ref | Model | Finding |',
    '| --- | --- | --- | --- | --- |',
    rows,
    '',
  ].join('\n');
}

export interface ReportOptions {
  organisation?: string;
  now?: Date;
}

/** Render a full Markdown MRM report for the inventory. */
export function renderReport(inv: Inventory, opts: ReportOptions = {}): string {
  const now = opts.now ?? new Date();
  const org = opts.organisation ?? 'Regulated Entity';
  const findings = runChecks(inv, now);
  const summary = summarizeFindings(findings);

  const byLifecycle = countBy(inv.models.map((m) => m.lifecycle));
  const byTier = countBy(inv.models.filter((m) => m.tier).map((m) => m.tier as string));
  const byType = countBy(inv.models.map((m) => m.type));
  const live = inv.models.filter(
    (m) => m.lifecycle === LifecycleState.Active || m.lifecycle === LifecycleState.UnderDevelopment,
  );

  const inventoryRows = inv.models
    .map(
      (m) =>
        `| ${m.name} | ${m.type} | ${tierLabel(m)} | ${m.lifecycle} | ${m.isThirdParty ? 'yes' : 'no'} | ${m.roles.owner} | ${m.roles.validator} |`,
    )
    .join('\n');

  return `# Model Risk Management Report — ${org}

_Generated ${now.toISOString()} · RBI MRM 2026 (draft) · Prahari_

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable for its models (RBI Para 8).

## 1. Inventory overview (Para 21–22)

- Total models: **${inv.models.length}**
- Live (active / under development): **${live.length}**
- By lifecycle: ${formatCounts(byLifecycle)}
- By risk tier: ${formatCounts(byTier)}
- By type: ${formatCounts(byType)}

## 2. Compliance findings (Para 12, 17, 23, 33)

- Critical: **${summary.critical}** · Warning: **${summary.warning}** · Info: **${summary.info}**

${findingsTable(findings)}

## 3. Model register (Para 22)

| Model | Type | Tier | Lifecycle | Third-party | Owner | Validator |
| --- | --- | --- | --- | --- | --- | --- |
${inventoryRows || '_Inventory is empty._'}

## 4. Attestation

This report is generated from the RE's own model inventory. High-risk models require RMCB approval (Para 18); validation reports are due to the RMCB within three months of completion (Para 33); decommissioned models are retained for at least ten years (Para 23).
`;
}

function formatCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) return '—';
  return entries.map(([k, v]) => `${k}=${v}`).join(', ');
}

const KNOWN_FRAMEWORKS: Record<string, { id: Framework; label: string }> = {
  'nist-ai-rmf': { id: 'nist-ai-rmf', label: 'NIST AI RMF' },
  'iso-42001': { id: 'iso-42001', label: 'ISO/IEC 42001' },
  'sr-11-7': { id: 'sr-11-7', label: 'SR 11-7' },
};

/**
 * Render the standard report plus a read-only framework-view section that maps
 * the RE's RBI control set to another framework (alignment, NOT compliance).
 */
export function renderFrameworkReport(
  inv: Inventory,
  framework: string,
  opts: ReportOptions = {},
): string {
  const known = KNOWN_FRAMEWORKS[framework];
  if (!known) {
    throw new Error(
      `Unknown framework "${framework}". Known: ${Object.keys(KNOWN_FRAMEWORKS).join(', ')}`,
    );
  }
  const cov = deriveCoverage(controlCore, known.id);
  const mapRows = controlCore.mappings
    .filter((m) => m.framework === known.id)
    .map((m) => {
      const c = controlCore.coreControls.find((x) => x.id === m.coreControlId);
      const name = c ? `${c.id} ${c.title}` : m.coreControlId;
      const paras = c ? `Para ${c.rbiParas.join(', ')}` : '—';
      return `| ${name} | ${paras} | ${m.clauseRef} | ${m.relationship} |`;
    })
    .join('\n');
  const deltaRows = cov.deltaClauses.map((c) => `| ${c.ref} | ${c.title} |`).join('\n');

  const section = `

## 5. Framework view — ${known.label} (alignment, not compliance)

> This maps your RBI control set to ${known.label}. It is **not** a ${known.label} compliance attestation; the deltas below are not covered by the Prahari core.

| Prahari Control Core | RBI | ${known.label} | Relationship |
| --- | --- | --- | --- |
${mapRows}

### Deltas — ${known.label} obligations not covered by the core

| ${known.label} | Title |
| --- | --- |
${deltaRows || '| — | _none in the considered set_ |'}
`;
  return renderReport(inv, opts) + section;
}
