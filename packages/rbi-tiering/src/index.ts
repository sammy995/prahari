/**
 * RBI MRM 2026 — Risk-based model tiering (Para 17-20, 52). Pure, no I/O.
 */

export enum ModelTier {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

/** Ordinal factor score: 1 = low, 2 = medium, 3 = high. */
export type FactorScore = 1 | 2 | 3;

export interface TieringInput {
  /** Para 19: business significance / financial-operational impact / consumer implications. */
  materiality: FactorScore;
  /** Para 19: difficulty of oversight, unstructured data, explainability difficulty. */
  complexity: FactorScore;
  /** Para 52 (AI only): extent of reliance + level of autonomy on outputs. */
  autonomy?: FactorScore;
  /** Para 49/52: AI/ML model? Enables the autonomy factor. */
  isAi?: boolean;
  /** Para 19 "other factors": explicit regulatory/supervisory concern. */
  regulatoryConcern?: boolean;
  /** Para 19/25: consumer-facing model. */
  consumerFacing?: boolean;
}

export interface TierResult {
  tier: ModelTier;
  /** Numeric composite (1..3) before label mapping. */
  score: FactorScore;
  /** Audit-ready explanation of WHY this tier was assigned. */
  rationale: string;
}

const TIER_BY_SCORE: Record<FactorScore, ModelTier> = {
  1: ModelTier.Low,
  2: ModelTier.Medium,
  3: ModelTier.High,
};

function bump(score: FactorScore): FactorScore {
  // Raise one level, capped at 3. Used by "other factors" that can only escalate.
  return Math.min(score + 1, 3) as FactorScore;
}

/**
 * Compute a model's composite risk tier per RBI Para 17-20 (and Para 52 for AI).
 *
 * Non-offsetting rule (Para 20): a low factor must NOT dilute a high one — a
 * highly material model stays high-tier even if simple. We therefore take the
 * MAXIMUM of the risk drivers, never an average. "Other factors" (Para 19) can
 * only escalate the tier, never lower it.
 */
export function computeTier(input: TieringInput): TierResult {
  const drivers: FactorScore[] = [input.materiality, input.complexity];
  if (input.isAi && input.autonomy !== undefined) {
    drivers.push(input.autonomy);
  }
  let score = Math.max(...drivers) as FactorScore;

  const reasons: string[] = [
    `materiality=${input.materiality}`,
    `complexity=${input.complexity}`,
  ];
  if (input.isAi && input.autonomy !== undefined) {
    reasons.push(`autonomy=${input.autonomy}`);
  }
  if (input.regulatoryConcern && score < 3) {
    score = bump(score);
    reasons.push('regulatory concern (+1)');
  }
  if (input.consumerFacing && score < 3) {
    score = bump(score);
    reasons.push('consumer-facing (+1)');
  }

  const tier = TIER_BY_SCORE[score];
  return {
    tier,
    score,
    rationale: `Tier ${tier} (composite ${score}) from ${reasons.join(', ')}; non-offsetting max per RBI Para 20.`,
  };
}

export enum ApproverAuthority {
  /** Para 18(ii): high-risk models require Risk Management Committee of the Board. */
  RMCB = 'rmcb',
  /** Para 18(ii): other models may use delegated approval. */
  Delegated = 'delegated',
}

export interface TierControls {
  approver: ApproverAuthority;
  /** Para 18(i): minimum validation cadence in months. SOTA default, configurable. */
  validationFrequencyMonths: number;
  /** Para 18(iv): monitoring intensity. */
  monitoring: 'standard' | 'enhanced';
  /** Para 18(v): documentation depth. */
  documentation: 'basic' | 'comprehensive';
}

/**
 * Map a risk tier to the controls it requires (RBI Para 18). Frequencies are
 * SOTA defaults — each RE tunes them in its MRMF; do not treat as fixed law.
 */
export function tierToControls(tier: ModelTier): TierControls {
  switch (tier) {
    case ModelTier.High:
      return {
        approver: ApproverAuthority.RMCB,
        validationFrequencyMonths: 6,
        monitoring: 'enhanced',
        documentation: 'comprehensive',
      };
    case ModelTier.Medium:
      return {
        approver: ApproverAuthority.Delegated,
        validationFrequencyMonths: 12,
        monitoring: 'enhanced',
        documentation: 'comprehensive',
      };
    case ModelTier.Low:
      return {
        approver: ApproverAuthority.Delegated,
        validationFrequencyMonths: 24,
        monitoring: 'standard',
        documentation: 'basic',
      };
  }
}

export interface ReviewDueInput {
  lastReviewedAt: Date;
  now: Date;
  /** Para 17: an explicit trigger forces a re-tier regardless of elapsed time. */
  triggerOccurred?: boolean;
  /** Cadence in months. Default 12 ("at least annually", Para 17). Configurable. */
  cadenceMonths?: number;
}

/**
 * Whether a model's risk tier is due for review per RBI Para 17
 * ("at least annually, or earlier ... in response to specific triggers").
 */
export function isReviewDue(input: ReviewDueInput): boolean {
  if (input.triggerOccurred) return true;
  const cadence = input.cadenceMonths ?? 12;
  const due = new Date(input.lastReviewedAt);
  due.setMonth(due.getMonth() + cadence);
  return input.now.getTime() >= due.getTime();
}

// ──────────────────────────────────────────────
// Decommissioned-model retention (Para 23)
// ──────────────────────────────────────────────

export interface RetentionInput {
  decommissionedAt: Date;
  /** Para 23: the date it ceased to serve as backup/benchmark, if later. */
  ceasedAsReferenceAt?: Date;
  /** Floor in years. Default 10 (Para 23); raise for longer legal requirements. */
  minYears?: number;
}

function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

/**
 * The earliest date a decommissioned model may leave the inventory (RBI Para 23):
 * at least ten years from decommissioning OR from when it ceased to serve as a
 * backup/benchmark reference — whichever is later — or longer if law requires.
 */
export function retentionUntil(input: RetentionInput): Date {
  const minYears = input.minYears ?? 10;
  const anchor =
    input.ceasedAsReferenceAt &&
    input.ceasedAsReferenceAt.getTime() > input.decommissionedAt.getTime()
      ? input.ceasedAsReferenceAt
      : input.decommissionedAt;
  return addYears(anchor, minYears);
}

/** True once the Para 23 retention floor has elapsed (safe to purge). */
export function isRetentionExpired(input: RetentionInput & { now: Date }): boolean {
  return input.now.getTime() >= retentionUntil(input).getTime();
}

// ──────────────────────────────────────────────
// Validation-report SLA to the RMCB (Para 33)
// ──────────────────────────────────────────────

export interface ValidationReportSlaInput {
  validationCompletedAt: Date;
  /** Months allowed to place the report before the RMCB. Default 3 (Para 33). */
  slaMonths?: number;
}

/** Deadline to place a validation report before the RMCB (RBI Para 33: within three months). */
export function validationReportDueBy(input: ValidationReportSlaInput): Date {
  const due = new Date(input.validationCompletedAt);
  due.setMonth(due.getMonth() + (input.slaMonths ?? 3));
  return due;
}

/**
 * Whether the Para 33 validation-report SLA is breached: no report placed and
 * the deadline has passed. Once a report is placed, it is no longer "overdue".
 */
export function isValidationReportOverdue(
  input: ValidationReportSlaInput & { reportedAt?: Date | null; now: Date },
): boolean {
  if (input.reportedAt) return false;
  return input.now.getTime() > validationReportDueBy(input).getTime();
}
