/**
 * Examiner / board-ready RBI MRM report (Markdown) generated from the
 * inventory + checks. Maps to Para 12 (RMCB oversight) and Para 33 reporting.
 */

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
