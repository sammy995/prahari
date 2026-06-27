# Para 33 — Validation report to the RMCB within three months

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-B

## Verbatim

> **33.** Validation reports, including key findings and recommendations, should be placed before the RMCB, or delegated authority as specified in the MRMF, **within three months of completion of the validation.**

## Intent

Close the loop between validation and governance: a validation that never reaches the committee is worthless. The three-month clock makes "we validated it" auditable and time-bound.

## Expected controls

- Track, per model: `validationCompletedAt` and `validationReportedAt`.
- A deadline = completion + 3 months (configurable per MRMF).
- An overdue flag when the deadline passes with no report placed; escalate severity for high-tier models.
- Routing of high-risk validation reports to the RMCB (ties to [Para 18](para-17-20-risk-tiering.md)).

## Evidence required

- Dates of validation completion and of placement before the RMCB.
- For each live model with a completed validation: proof it was reported within three months (or an open, tracked overdue item).

## Example (Prahari)

```ts
import { validationReportDueBy, isValidationReportOverdue } from '@prahari/rbi-tiering';

validationReportDueBy({ validationCompletedAt: new Date('2026-01-01') }); // 2026-04-01

isValidationReportOverdue({ validationCompletedAt: new Date('2026-01-01'), now: new Date('2026-05-01') }); // true
isValidationReportOverdue({ validationCompletedAt: new Date('2026-01-01'),
                            reportedAt: new Date('2026-03-15'), now: new Date('2026-05-01') }); // false
```

`prahari check` raises `VALIDATION_REPORT_OVERDUE` — **critical** for high-tier models, warning otherwise — and `prahari check` exits non-zero on any critical (handy in CI).

## Common mistakes

- **No report timestamp.** Without `validationReportedAt` you cannot prove the SLA was met.
- **Treating "late but reported" as a permanent breach.** Once placed before the RMCB, it is no longer overdue (though lateness itself may warrant a note).
- **Per-change reporting for fast-updating models.** For controlled auto-updates, periodic RMCB reporting plus a material-change trigger (Para 42) is usually more practical than a report per change.

---

*Cite as:* **Prahari Control Reference — Para 33** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
