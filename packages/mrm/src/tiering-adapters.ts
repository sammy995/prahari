/**
 * Thin adapters: the inventory stores ISO date strings; @prahari/rbi-tiering
 * works in Date. These bridge the two and keep checks.ts readable.
 */

import {
  isRetentionExpired as _isRetentionExpired,
  isReviewDue,
  isValidationReportOverdue as _isValidationReportOverdue,
} from '@prahari/rbi-tiering';

export function isResolvedReviewDue(lastReviewedAtIso: string, now: Date): boolean {
  return isReviewDue({ lastReviewedAt: new Date(lastReviewedAtIso), now });
}

export function isRetentionExpired(decommissionedAtIso: string, now: Date): boolean {
  return _isRetentionExpired({ decommissionedAt: new Date(decommissionedAtIso), now });
}

export function isValidationReportOverdue(
  validationCompletedAtIso: string,
  reportedAtIso: string | undefined,
  now: Date,
): boolean {
  return _isValidationReportOverdue({
    validationCompletedAt: new Date(validationCompletedAtIso),
    reportedAt: reportedAtIso ? new Date(reportedAtIso) : null,
    now,
  });
}
