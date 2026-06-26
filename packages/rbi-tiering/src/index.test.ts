import { describe, it, expect } from 'vitest';
import {
  computeTier,
  ModelTier,
  tierToControls,
  ApproverAuthority,
  isReviewDue,
  retentionUntil,
  isRetentionExpired,
  validationReportDueBy,
  isValidationReportOverdue,
} from './index.js';

describe('computeTier', () => {
  it('low materiality + low complexity => Low tier', () => {
    const r = computeTier({ materiality: 1, complexity: 1 });
    expect(r.tier).toBe(ModelTier.Low);
    expect(r.score).toBe(1);
  });

  it('high materiality stays High even when complexity is low (non-offsetting, Para 20)', () => {
    const r = computeTier({ materiality: 3, complexity: 1 });
    expect(r.tier).toBe(ModelTier.High);
  });

  it('takes the maximum of drivers, never an average', () => {
    const r = computeTier({ materiality: 1, complexity: 3 });
    expect(r.tier).toBe(ModelTier.High);
  });

  it('AI autonomy is considered only when isAi is true (Para 52)', () => {
    const withAi = computeTier({ materiality: 1, complexity: 1, isAi: true, autonomy: 3 });
    const withoutAi = computeTier({ materiality: 1, complexity: 1, autonomy: 3 });
    expect(withAi.tier).toBe(ModelTier.High);
    expect(withoutAi.tier).toBe(ModelTier.Low);
  });

  it('regulatory concern raises the tier but never above High', () => {
    const raised = computeTier({ materiality: 1, complexity: 1, regulatoryConcern: true });
    expect(raised.tier).toBe(ModelTier.Medium);
    const capped = computeTier({ materiality: 3, complexity: 3, regulatoryConcern: true });
    expect(capped.tier).toBe(ModelTier.High);
  });

  it('consumer-facing raises the tier (Para 19/25)', () => {
    const r = computeTier({ materiality: 1, complexity: 1, consumerFacing: true });
    expect(r.tier).toBe(ModelTier.Medium);
  });

  it('produces an audit-ready rationale string', () => {
    const r = computeTier({ materiality: 3, complexity: 1 });
    expect(r.rationale).toMatch(/Para 20/);
    expect(r.rationale).toMatch(/materiality=3/);
  });
});

describe('tierToControls (Para 18)', () => {
  it('High tier requires RMCB approval (Para 18(ii))', () => {
    const c = tierToControls(ModelTier.High);
    expect(c.approver).toBe(ApproverAuthority.RMCB);
    expect(c.monitoring).toBe('enhanced');
    expect(c.documentation).toBe('comprehensive');
  });

  it('Low tier uses delegated approval and lighter controls', () => {
    const c = tierToControls(ModelTier.Low);
    expect(c.approver).toBe(ApproverAuthority.Delegated);
    expect(c.monitoring).toBe('standard');
    expect(c.documentation).toBe('basic');
  });

  it('validation frequency tightens as tier rises', () => {
    expect(tierToControls(ModelTier.High).validationFrequencyMonths)
      .toBeLessThan(tierToControls(ModelTier.Low).validationFrequencyMonths);
  });
});

describe('retentionUntil / isRetentionExpired (Para 23)', () => {
  it('retains for 10 years from decommissioning by default', () => {
    const until = retentionUntil({ decommissionedAt: new Date('2026-01-01') });
    expect(until.getUTCFullYear()).toBe(2036);
  });

  it('uses the later of decommissioning vs ceasing-as-reference (Para 23 "whichever is later")', () => {
    const until = retentionUntil({
      decommissionedAt: new Date('2026-01-01'),
      ceasedAsReferenceAt: new Date('2028-01-01'),
    });
    expect(until.getUTCFullYear()).toBe(2038);
  });

  it('honours a longer legal retention floor', () => {
    const until = retentionUntil({ decommissionedAt: new Date('2026-01-01'), minYears: 15 });
    expect(until.getUTCFullYear()).toBe(2041);
  });

  it('not expired before the floor, expired after', () => {
    const base = { decommissionedAt: new Date('2026-01-01') };
    expect(isRetentionExpired({ ...base, now: new Date('2030-01-01') })).toBe(false);
    expect(isRetentionExpired({ ...base, now: new Date('2037-01-01') })).toBe(true);
  });
});

describe('validationReportDueBy / isValidationReportOverdue (Para 33)', () => {
  it('report is due within three months of validation completion by default', () => {
    const due = validationReportDueBy({ validationCompletedAt: new Date('2026-01-01') });
    expect(due.toISOString().slice(0, 10)).toBe('2026-04-01');
  });

  it('not overdue before the deadline when unreported', () => {
    expect(isValidationReportOverdue({
      validationCompletedAt: new Date('2026-01-01'),
      now: new Date('2026-02-01'),
    })).toBe(false);
  });

  it('overdue after the deadline when still unreported', () => {
    expect(isValidationReportOverdue({
      validationCompletedAt: new Date('2026-01-01'),
      now: new Date('2026-05-01'),
    })).toBe(true);
  });

  it('not overdue once a report has been placed', () => {
    expect(isValidationReportOverdue({
      validationCompletedAt: new Date('2026-01-01'),
      reportedAt: new Date('2026-03-15'),
      now: new Date('2026-05-01'),
    })).toBe(false);
  });
});

describe('isReviewDue (Para 17)', () => {
  it('not due within the annual cadence', () => {
    expect(isReviewDue({
      lastReviewedAt: new Date('2026-01-01'),
      now: new Date('2026-06-01'),
    })).toBe(false);
  });

  it('due after the annual cadence elapses', () => {
    expect(isReviewDue({
      lastReviewedAt: new Date('2025-01-01'),
      now: new Date('2026-02-01'),
    })).toBe(true);
  });

  it('a trigger forces review regardless of time (Para 17 "or earlier")', () => {
    expect(isReviewDue({
      lastReviewedAt: new Date('2026-06-01'),
      now: new Date('2026-06-02'),
      triggerOccurred: true,
    })).toBe(true);
  });

  it('respects a custom cadence', () => {
    expect(isReviewDue({
      lastReviewedAt: new Date('2026-01-01'),
      now: new Date('2026-04-01'),
      cadenceMonths: 3,
    })).toBe(true);
  });
});
