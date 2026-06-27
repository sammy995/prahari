/**
 * RBI MRM model-inventory domain types (RBI MRM 2026, Para 7, 21-24).
 */

import type { FactorScore, ModelTier } from '@prahari/rbi-tiering';

/**
 * Model categories. Per Para 7(3), a "model" is broad — even a spreadsheet
 * pricing tool whose output drives decisions is a model.
 */
export enum ModelType {
  Spreadsheet = 'spreadsheet',
  RuleBased = 'rule_based',
  Statistical = 'statistical',
  Ml = 'ml',
  GenAi = 'genai',
}

/** Lifecycle states an inventory must track (Para 21). */
export enum LifecycleState {
  UnderDevelopment = 'under_development',
  Active = 'active',
  Inactive = 'inactive',
  Decommissioned = 'decommissioned',
}

/** The four roles RBI names (Para 7(4)-(8)). */
export interface ModelRoles {
  owner: string;
  developer: string;
  /** Para 7(8): independent of development, ownership, or use. */
  validator: string;
  approver: string;
}

/** Tiering inputs captured for a model (consumed by @prahari/rbi-tiering). */
export interface ModelTieringInputs {
  materiality: FactorScore;
  complexity: FactorScore;
  autonomy?: FactorScore;
  regulatoryConcern?: boolean;
}

/** A single model in the inventory (Para 22 minimum fields + lifecycle). */
export interface ModelRecord {
  id: string;
  name: string;
  type: ModelType;
  intendedUse: string;
  isThirdParty: boolean;
  isAi: boolean;
  consumerFacing: boolean;
  lifecycle: LifecycleState;
  roles: ModelRoles;
  /** Upstream/downstream model ids (Para 22 dependencies). */
  dependencies: string[];
  tieringInputs?: ModelTieringInputs;
  tier?: ModelTier;
  tierRationale?: string;
  /** ISO timestamps. */
  lastReviewedAt?: string;
  validationCompletedAt?: string;
  validationReportedAt?: string;
  decommissionedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** The whole inventory document (Para 21). */
export interface Inventory {
  version: 1;
  models: ModelRecord[];
}

export function emptyInventory(): Inventory {
  return { version: 1, models: [] };
}

/** Raised when an inventory operation violates an RBI MRM rule. */
export class MrmValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MrmValidationError';
  }
}
