/**
 * Inventory operations (RBI MRM 2026, Para 21-24).
 *
 * The inventory IS the gate: "no model is used, relied upon, or deployed unless
 * it is part of inventory" (Para 21). Required fields enforce Para 22, and the
 * validator-independence rule enforces Para 7(8) / the three lines of defence
 * (Para 15).
 */

import { randomUUID } from 'node:crypto';
import { computeTier, type TieringInput } from '@prahari/rbi-tiering';
import {
  LifecycleState,
  MrmValidationError,
  type Inventory,
  type ModelRecord,
  type ModelRoles,
  type ModelTieringInputs,
  type ModelType,
} from './model.js';

export interface AddModelInput {
  name: string;
  type: ModelType;
  intendedUse: string;
  roles: ModelRoles;
  isThirdParty?: boolean;
  isAi?: boolean;
  consumerFacing?: boolean;
  lifecycle?: LifecycleState;
  dependencies?: string[];
  tieringInputs?: ModelTieringInputs;
  lastReviewedAt?: string;
}

function assertRequired(input: AddModelInput): void {
  const missing: string[] = [];
  if (!input.name?.trim()) missing.push('name');
  if (!input.type) missing.push('type');
  if (!input.intendedUse?.trim()) missing.push('intendedUse');
  if (!input.roles?.owner?.trim()) missing.push('roles.owner');
  if (!input.roles?.developer?.trim()) missing.push('roles.developer');
  if (!input.roles?.validator?.trim()) missing.push('roles.validator');
  if (!input.roles?.approver?.trim()) missing.push('roles.approver');
  if (missing.length > 0) {
    throw new MrmValidationError(
      `Missing required inventory fields (RBI Para 22): ${missing.join(', ')}`,
    );
  }
}

/** Para 7(8)/15: the validator must be independent of development and ownership. */
function assertValidatorIndependence(roles: ModelRoles): void {
  const v = roles.validator.trim().toLowerCase();
  if (v === roles.developer.trim().toLowerCase()) {
    throw new MrmValidationError(
      'Validator must be independent of the developer (RBI Para 7(8), three lines of defence Para 15).',
    );
  }
  if (v === roles.owner.trim().toLowerCase()) {
    throw new MrmValidationError(
      'Validator must be independent of the model owner (RBI Para 7(8)).',
    );
  }
}

function tieringToInput(t: ModelTieringInputs, isAi: boolean): TieringInput {
  return {
    materiality: t.materiality,
    complexity: t.complexity,
    autonomy: t.autonomy,
    isAi,
    regulatoryConcern: t.regulatoryConcern,
  };
}

/** Add a model to the inventory, enforcing Para 22 + validator independence. */
export function addModel(
  inv: Inventory,
  input: AddModelInput,
  now: Date = new Date(),
): ModelRecord {
  assertRequired(input);
  assertValidatorIndependence(input.roles);

  const isAi = input.isAi ?? (input.type === 'ml' || input.type === 'genai');
  const ts = now.toISOString();
  const record: ModelRecord = {
    id: randomUUID(),
    name: input.name.trim(),
    type: input.type,
    intendedUse: input.intendedUse.trim(),
    isThirdParty: input.isThirdParty ?? false,
    isAi,
    consumerFacing: input.consumerFacing ?? false,
    lifecycle: input.lifecycle ?? LifecycleState.UnderDevelopment,
    roles: input.roles,
    dependencies: input.dependencies ?? [],
    tieringInputs: input.tieringInputs,
    lastReviewedAt: input.lastReviewedAt,
    createdAt: ts,
    updatedAt: ts,
  };

  if (input.tieringInputs) {
    const result = computeTier(tieringToInput(input.tieringInputs, isAi));
    record.tier = result.tier;
    record.tierRationale = result.rationale;
  }

  inv.models.push(record);
  return record;
}

export function getModel(inv: Inventory, id: string): ModelRecord | undefined {
  return inv.models.find((m) => m.id === id);
}

/** Para 21: confirm a model is inventoried before it may be used/deployed. */
export function isRegistered(inv: Inventory, id: string): boolean {
  return inv.models.some((m) => m.id === id);
}

export function listModels(inv: Inventory): ModelRecord[] {
  return [...inv.models];
}

/** (Re-)tier a model from its stored inputs, recording rationale. */
export function tierModel(
  inv: Inventory,
  id: string,
  now: Date = new Date(),
): ModelRecord {
  const m = requireModel(inv, id);
  if (!m.tieringInputs) {
    throw new MrmValidationError(
      `Model ${id} has no tiering inputs; provide materiality and complexity first (RBI Para 19).`,
    );
  }
  const result = computeTier(tieringToInput(m.tieringInputs, m.isAi));
  m.tier = result.tier;
  m.tierRationale = result.rationale;
  m.lastReviewedAt = now.toISOString();
  m.updatedAt = now.toISOString();
  return m;
}

/** Decommission a model. It stays in inventory for retention (Para 23). */
export function decommissionModel(
  inv: Inventory,
  id: string,
  now: Date = new Date(),
): ModelRecord {
  const m = requireModel(inv, id);
  m.lifecycle = LifecycleState.Decommissioned;
  m.decommissionedAt = now.toISOString();
  m.updatedAt = now.toISOString();
  return m;
}

export function requireModel(inv: Inventory, id: string): ModelRecord {
  const m = getModel(inv, id);
  if (!m) {
    throw new MrmValidationError(`Model not in inventory: ${id} (RBI Para 21).`);
  }
  return m;
}
