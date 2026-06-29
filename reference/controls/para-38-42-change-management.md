# Para 38–42 — Change management and the material-change trigger

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-E

## Verbatim

> **38–40.** Operate a **structured, controlled change-management process** for models — managed at the enterprise level, with the ability to **recover from a failed change**.
> **41.** Perform an **impact assessment before any change**, and maintain a **change / version log with approvals**.
> **42.** Where a change is **material**, it shall **trigger re-validation and re-approval** of the model.

## Intent

A model is not static, and an uncontrolled change is just an unvalidated new model wearing the old one's name. Paras 38–41 impose ordinary change discipline — controlled process, pre-change impact assessment, a versioned and approved change log, and the ability to roll back a bad change. Para 42 is the load-bearing rule: a **material** change is not a tweak, it reopens the lifecycle — back to independent validation ([Para 29–32](para-29-32-validation.md)) and approval ([Para 34–35](para-34-35-approval.md)). This is the forward reference the validation page makes: "re-validate on material change" is defined *here*. The judgement call is what counts as "material"; the MRMF should define the threshold.

## Expected controls

- A **versioned change log** per model, each entry with an **impact assessment** and an **approval** (Paras 41).
- A **material-change threshold** (defined in the MRMF) that, when crossed, **reopens validation + approval** (Para 42).
- **Rollback / recovery** capability for a failed change, coordinated at the enterprise level (Paras 38–40).
- Linkage so a material change updates the model's `updatedAt`, resets validation currency, and re-routes to the right approver authority.

## Evidence required

- The change/version history per model, with impact assessments and approvals attached.
- For each material change: evidence that re-validation and re-approval actually occurred.
- A rollback plan / evidence of recovery capability for high-tier models.

## Example (Prahari) and honest scope

The inventory carries `updatedAt` and the model's version/lifecycle, and a material change is exactly the kind of **trigger** that should reset validation currency — which feeds the [Para 33](para-33-validation-report-sla.md) overdue check and the tier-driven re-validation cadence ([Para 29–32](para-29-32-validation.md)). Today Prahari records the change and the resulting re-validation as evidence; the **material-change classification** and the **rollback mechanism** are processes the RE runs (the threshold is an MRMF decision, recovery lives in deployment tooling). A natural extension is a `check` that flags a model whose `updatedAt` moved after its last `validationCompletedAt` — i.e. changed but not re-validated.

## Common mistakes

- **Silent changes.** A model edited without a logged, approved change entry breaks Paras 41.
- **No material-change threshold.** Without a defined line (Para 42), every change is argued case-by-case and re-validation gets skipped.
- **Material change without re-validation.** The classic finding — a significant change shipped on the old validation and old approval.
- **No rollback.** Paras 38–40 require the ability to recover from a failed change, not just to make changes.
- **Impact assessment after the fact.** Para 41 wants it *before* the change.

---

*Cite as:* **Prahari Control Reference — Para 38-42** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
