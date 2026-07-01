import { describe, it, expect } from 'vitest';
import { ModelTier } from '@prahari/rbi-tiering';
import { emptyInventory, LifecycleState, ModelType, MrmValidationError } from './model.js';
import {
  addModel,
  decommissionModel,
  getModel,
  isRegistered,
  listModels,
  tierModel,
  updateModel,
  type AddModelInput,
} from './inventory.js';

function validInput(overrides: Partial<AddModelInput> = {}): AddModelInput {
  return {
    name: 'Retail Credit Scorecard',
    type: ModelType.Ml,
    intendedUse: 'Score retail loan applicants',
    roles: { owner: 'alice', developer: 'bob', validator: 'carol', approver: 'dave' },
    ...overrides,
  };
}

describe('addModel (Para 22 fields, Para 7(8) independence)', () => {
  it('adds a valid model and returns it with an id and timestamps', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput(), new Date('2026-06-01'));
    expect(m.id).toBeTruthy();
    expect(m.lifecycle).toBe(LifecycleState.UnderDevelopment);
    expect(m.isAi).toBe(true); // ml => AI by default
    expect(listModels(inv)).toHaveLength(1);
  });

  it('rejects missing required fields (Para 22)', () => {
    const inv = emptyInventory();
    expect(() => addModel(inv, validInput({ intendedUse: '  ' }))).toThrow(MrmValidationError);
  });

  it('rejects a validator who is also the developer (Para 7(8)/15)', () => {
    const inv = emptyInventory();
    expect(() =>
      addModel(inv, validInput({ roles: { owner: 'a', developer: 'bob', validator: 'BOB', approver: 'd' } })),
    ).toThrow(/independent of the developer/);
  });

  it('rejects a validator who is also the owner (Para 7(8))', () => {
    const inv = emptyInventory();
    expect(() =>
      addModel(inv, validInput({ roles: { owner: 'alice', developer: 'b', validator: 'alice', approver: 'd' } })),
    ).toThrow(/independent of the model owner/);
  });

  it('treats a spreadsheet pricing tool as a model (Para 7(3))', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput({ type: ModelType.Spreadsheet, isAi: false }));
    expect(m.type).toBe(ModelType.Spreadsheet);
    expect(m.isAi).toBe(false);
  });

  it('auto-tiers when tiering inputs are supplied (non-offsetting, Para 20)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput({ tieringInputs: { materiality: 3, complexity: 1 } }));
    expect(m.tier).toBe(ModelTier.High);
    expect(m.tierRationale).toMatch(/Para 20/);
  });
});

describe('inventory gate + lifecycle (Para 21, 23)', () => {
  it('isRegistered reflects inventory membership (Para 21)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput());
    expect(isRegistered(inv, m.id)).toBe(true);
    expect(isRegistered(inv, 'nope')).toBe(false);
  });

  it('decommission keeps the model in inventory and stamps the date (Para 23)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput());
    decommissionModel(inv, m.id, new Date('2026-06-10'));
    const after = getModel(inv, m.id)!;
    expect(after.lifecycle).toBe(LifecycleState.Decommissioned);
    expect(after.decommissionedAt).toBe('2026-06-10T00:00:00.000Z');
    expect(listModels(inv)).toHaveLength(1);
  });

  it('tierModel recomputes tier and updates lastReviewedAt (Para 17)', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput({ tieringInputs: { materiality: 1, complexity: 1 } }));
    expect(m.tier).toBe(ModelTier.Low);
    tierModel(inv, m.id, new Date('2026-06-15'));
    const after = getModel(inv, m.id)!;
    expect(after.lastReviewedAt).toBe('2026-06-15T00:00:00.000Z');
  });

  it('throws when using a model not in inventory (Para 21)', () => {
    const inv = emptyInventory();
    expect(() => tierModel(inv, 'ghost')).toThrow(/not in inventory/);
  });
});

describe('updateModel', () => {
  it('re-tiers when tiering inputs change', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput({ tieringInputs: { materiality: 1, complexity: 1 } }));
    expect(m.tier).toBe(ModelTier.Low);
    updateModel(inv, m.id, { tieringInputs: { materiality: 3 } });
    expect(getModel(inv, m.id)!.tier).toBe(ModelTier.High); // 3 wins (non-offsetting)
  });

  it('re-checks validator independence on a role change', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput());
    expect(() => updateModel(inv, m.id, { roles: { validator: 'bob' } })).toThrow(
      /independent of the developer/,
    );
  });

  it('updates lifecycle and bumps updatedAt', () => {
    const inv = emptyInventory();
    const m = addModel(inv, validInput(), new Date('2026-06-01'));
    updateModel(inv, m.id, { lifecycle: LifecycleState.Active }, new Date('2026-07-01'));
    const got = getModel(inv, m.id)!;
    expect(got.lifecycle).toBe(LifecycleState.Active);
    expect(got.updatedAt).toBe('2026-07-01T00:00:00.000Z');
  });

  it('throws for an unknown id (Para 21)', () => {
    expect(() => updateModel(emptyInventory(), 'nope', { isAi: true })).toThrow(MrmValidationError);
  });
});
