import { describe, it, expect } from 'vitest';
import { emptyInventory, LifecycleState, ModelType } from './model.js';
import { addModel } from './inventory.js';
import { renderReport, renderFrameworkReport } from './report.js';

describe('renderReport', () => {
  it('renders headline sections and the accountability disclaimer', () => {
    const inv = emptyInventory();
    addModel(inv, {
      name: 'AML Alert Triage',
      type: ModelType.GenAi,
      intendedUse: 'Triage AML alerts',
      roles: { owner: 'a', developer: 'b', validator: 'c', approver: 'd' },
      lifecycle: LifecycleState.Active,
      tieringInputs: { materiality: 3, complexity: 2 },
    });
    const md = renderReport(inv, { organisation: 'Acme Bank', now: new Date('2026-06-27') });
    expect(md).toMatch(/Acme Bank/);
    expect(md).toMatch(/RBI Para 8/);
    expect(md).toMatch(/AML Alert Triage/);
    expect(md).toMatch(/Total models: \*\*1\*\*/);
    expect(md).toMatch(/Inventory overview/);
  });

  it('handles an empty inventory gracefully', () => {
    const md = renderReport(emptyInventory(), { now: new Date('2026-06-27') });
    expect(md).toMatch(/Total models: \*\*0\*\*/);
    expect(md).toMatch(/Inventory is empty/);
  });
});

describe('renderFrameworkReport (NIST AI RMF)', () => {
  it('renders a framework view with a deltas section and no compliance claim', () => {
    const inv = emptyInventory();
    addModel(inv, {
      name: 'Scorecard',
      type: ModelType.Ml,
      intendedUse: 'Score applicants',
      roles: { owner: 'a', developer: 'b', validator: 'c', approver: 'd' },
      lifecycle: LifecycleState.Active,
      tieringInputs: { materiality: 3, complexity: 3 },
    });
    const md = renderFrameworkReport(inv, 'nist-ai-rmf', { organisation: 'Demo' });
    expect(md).toContain('NIST AI RMF');
    expect(md).toContain('Deltas');
    expect(md.toLowerCase()).not.toContain('compliant with nist');
  });

  it('renders an ISO/IEC 42001 view (alignment, not compliance)', () => {
    const md = renderFrameworkReport(emptyInventory(), 'iso-42001', { organisation: 'Demo' });
    expect(md).toContain('ISO/IEC 42001');
    expect(md).toContain('Deltas');
    expect(md.toLowerCase()).not.toContain('compliant with iso');
  });

  it('throws on an unknown framework', () => {
    expect(() => renderFrameworkReport(emptyInventory(), 'made-up')).toThrow();
  });
});
