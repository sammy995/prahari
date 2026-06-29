# Para 29–32 — Independent validation of all models

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-B

## Verbatim

> **29.** The RE shall **independently validate all models** — internal **and third-party** — before deployment.
> **30.** Validation shall be repeated **post-deployment, on material change or trigger, and periodically** thereafter (cadence by risk tier).
> **31.** Validation shall assess **inputs and data, conceptual soundness, performance/outcomes, and fitness for the intended use** — backward- and forward-looking.
> **32.** The validator shall be **independent** of the model's development, ownership and use, with the standing to challenge and, where warranted, reject the model.

(The three-month SLA for placing the validation report before the RMCB is [Para 33](para-33-validation-report-sla.md).)

## Intent

Validation is the independent check that the model does what it claims, on data that supports it, fit for the use it is put to — and it is **not a one-time gate**. Para 29 makes it universal (a bought model is validated by the RE *anyway* — see [Para 45–48](para-45-48-third-party.md)); Para 30 makes it recurring (re-validate on change, trigger, and on a tier-driven cadence); Para 31 defines its *content* (inputs, soundness, performance, fitness — both back- and forward-looking); Para 32 protects its *independence* (the validator cannot be the builder, owner, or user). Strip any one of these and validation becomes a rubber stamp.

## Expected controls

- A **validation workflow** that fires **pre-deployment for every model**, including third-party (Para 29).
- **Re-validation triggers**: material change (Para 38–42, change management), incident, and a **periodic cadence set by tier** ([Para 17–20](para-17-20-risk-tiering.md) → `validationFrequencyMonths`) (Para 30).
- A validation scope that covers **data/inputs, conceptual soundness, performance, and fitness-for-use** (Para 31).
- An **independence check**: validator ≠ owner / developer; the three-lines-of-defence separation (Para 32, Para 15), with authority to reject.
- Hand-off to governance: completed validations route to the RMCB within three months ([Para 33](para-33-validation-report-sla.md)).

## Evidence required

- A validation report per model covering the Para 31 dimensions, with the validator named.
- Proof of validator **independence** (distinct from owner/developer roles).
- A re-validation history showing the tier-driven cadence was met and that material changes triggered re-validation.
- The link from each validation to its RMCB placement (Para 33).

## Example (Prahari)

The inventory enforces the four distinct roles, so validator independence (Para 32) is structurally visible — and `prahari check` flags the downstream SLA. The tier sets the re-validation cadence:

```ts
import { tierToControls } from '@prahari/rbi-tiering';

tierToControls('high').validationFrequencyMonths;   // 6  → re-validate every 6 months (Para 30)
tierToControls('medium').validationFrequencyMonths;  // 12
tierToControls('low').validationFrequencyMonths;     // 24
```

Each model records `validationCompletedAt` / `validationReportedAt`; `prahari check` raises `VALIDATION_REPORT_OVERDUE` when the [Para 33](para-33-validation-report-sla.md) clock is breached. The validation *report itself* (the Para 31 assessment) attaches as evidence — Prahari holds and times it; the RE's independent validator writes it.

## Common mistakes

- **Validating internal models but trusting vendor certificates.** Para 29 requires the RE's *own* validation of third-party models too.
- **Validate-once.** Para 30 makes it recurring — on change, on trigger, and on a tier cadence.
- **A validator who isn't independent.** If the builder or owner signs off, Para 32 is not met.
- **Narrow validation.** Checking accuracy only, ignoring data suitability, conceptual soundness, or fitness-for-use (Para 31).
- **No re-validation on material change.** A material change (Para 38–42) reopens validation *and* approval.

---

*Cite as:* **Prahari Control Reference — Para 29-32** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
