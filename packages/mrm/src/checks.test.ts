import { describe, it, expect } from 'vitest';
import { emptyInventory, LifecycleState, ModelType } from './model.js';
import { addModel, decommissionModel } from './inventory.js';
import { runChecks, summarizeFindings } from './checks.js';

function base(over = {}) {
  return {
    name: 'M',
    type: ModelType.Ml,
    intendedUse: 'use',
    roles: { owner: 'a', developer: 'b', validator: 'c', approver: 'd' },
    ...over,
  };
}

describe('runChecks', () => {
  it('flags a live model with no tier (Para 17/21)', () => {
    const inv = emptyInventory();
    addModel(inv, base({ lifecycle: LifecycleState.Active }));
    const codes = runChecks(inv, new Date('2026-06-01')).map((f) => f.code);
    expect(codes).toContain('UNTIERED');
  });

  it('flags an overdue tier review (Para 17)', () => {
    const inv = emptyInventory();
    addModel(inv, base({
      lifecycle: LifecycleState.Active,
      tieringInputs: { materiality: 2, complexity: 2 },
      lastReviewedAt: '2024-01-01T00:00:00.000Z',
    }), new Date('2024-01-01'));
    const codes = runChecks(inv, new Date('2026-06-01')).map((f) => f.code);
    expect(codes).toContain('REVIEW_DUE');
  });

  it('raises a critical when a HIGH-tier validation report is overdue (Para 33)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, base({
      lifecycle: LifecycleState.Active,
      tieringInputs: { materiality: 3, complexity: 3 },
    }));
    m.validationCompletedAt = '2026-01-01T00:00:00.000Z';
    const findings = runChecks(inv, new Date('2026-06-01'));
    const vr = findings.find((f) => f.code === 'VALIDATION_REPORT_OVERDUE');
    expect(vr?.severity).toBe('critical');
  });

  it('does not flag validation overdue once a report is placed (Para 33)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, base({ lifecycle: LifecycleState.Active, tieringInputs: { materiality: 1, complexity: 1 } }));
    m.validationCompletedAt = '2026-01-01T00:00:00.000Z';
    m.validationReportedAt = '2026-02-15T00:00:00.000Z';
    const codes = runChecks(inv, new Date('2026-06-01')).map((f) => f.code);
    expect(codes).not.toContain('VALIDATION_REPORT_OVERDUE');
  });

  it('notes retention elapsed for an old decommissioned model (Para 23)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, base({ tieringInputs: { materiality: 1, complexity: 1 } }));
    decommissionModel(inv, m.id, new Date('2010-01-01'));
    const codes = runChecks(inv, new Date('2026-06-01')).map((f) => f.code);
    expect(codes).toContain('RETENTION_ELAPSED');
  });

  it('sorts critical findings first and summarizes', () => {
    const inv = emptyInventory();
    addModel(inv, base({ lifecycle: LifecycleState.Active })); // untiered warning
    const m = addModel(inv, base({ lifecycle: LifecycleState.Active, tieringInputs: { materiality: 3, complexity: 3 } }));
    m.validationCompletedAt = '2026-01-01T00:00:00.000Z'; // critical
    const findings = runChecks(inv, new Date('2026-06-01'));
    expect(findings[0]!.severity).toBe('critical');
    const summary = summarizeFindings(findings);
    expect(summary.critical).toBeGreaterThanOrEqual(1);
    expect(summary.warning).toBeGreaterThanOrEqual(1);
  });
});
