import { describe, it, expect } from 'vitest';
import { emptyInventory, LifecycleState, ModelType } from './model.js';
import { addModel } from './inventory.js';
import { renderReport } from './report.js';

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
