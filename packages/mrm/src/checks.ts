/**
 * Compliance checks over the inventory (RBI MRM 2026).
 * Each finding cites the paragraph it derives from.
 */

import {
  isResolvedReviewDue,
  isRetentionExpired,
  isValidationReportOverdue,
} from './tiering-adapters.js';
import { LifecycleState, type Inventory, type ModelRecord } from './model.js';

export type Severity = 'info' | 'warning' | 'critical';

export interface Finding {
  modelId: string;
  modelName: string;
  severity: Severity;
  code: string;
  para: string;
  message: string;
}

function isLive(m: ModelRecord): boolean {
  return m.lifecycle === LifecycleState.Active || m.lifecycle === LifecycleState.UnderDevelopment;
}

/**
 * Run all checks against the inventory as of `now`. Returns findings sorted
 * critical-first. Pure and deterministic given `now`.
 */
export function runChecks(inv: Inventory, now: Date = new Date()): Finding[] {
  const findings: Finding[] = [];

  for (const m of inv.models) {
    // Para 17/21: live models must be tiered.
    if (isLive(m) && !m.tier) {
      findings.push({
        modelId: m.id,
        modelName: m.name,
        severity: 'warning',
        code: 'UNTIERED',
        para: '17, 21',
        message: 'Live model has no risk tier assigned.',
      });
    }

    // Para 17: tier review due at least annually.
    if (isLive(m) && m.tier && m.lastReviewedAt && isResolvedReviewDue(m.lastReviewedAt, now)) {
      findings.push({
        modelId: m.id,
        modelName: m.name,
        severity: 'warning',
        code: 'REVIEW_DUE',
        para: '17',
        message: 'Risk-tier review is overdue (annual cadence exceeded).',
      });
    }

    // Para 33: validation report to RMCB within three months of completion.
    if (
      isLive(m) &&
      m.validationCompletedAt &&
      isValidationReportOverdue(m.validationCompletedAt, m.validationReportedAt, now)
    ) {
      findings.push({
        modelId: m.id,
        modelName: m.name,
        severity: m.tier === 'high' ? 'critical' : 'warning',
        code: 'VALIDATION_REPORT_OVERDUE',
        para: '33',
        message: 'Validation report not placed before the RMCB within three months.',
      });
    }

    // Para 23: decommissioned model whose 10-year retention has elapsed.
    if (m.lifecycle === LifecycleState.Decommissioned && m.decommissionedAt) {
      if (isRetentionExpired(m.decommissionedAt, now)) {
        findings.push({
          modelId: m.id,
          modelName: m.name,
          severity: 'info',
          code: 'RETENTION_ELAPSED',
          para: '23',
          message: 'Retention period (10 years) elapsed; record may be archived/purged.',
        });
      }
    }
  }

  const rank: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };
  return findings.sort((a, b) => rank[a.severity] - rank[b.severity]);
}

/** Convenience summary counts for reporting. */
export function summarizeFindings(findings: Finding[]): Record<Severity, number> {
  return findings.reduce<Record<Severity, number>>(
    (acc, f) => {
      acc[f.severity] += 1;
      return acc;
    },
    { critical: 0, warning: 0, info: 0 },
  );
}
