# Para 43–44 — Business continuity and decommissioning

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-F/G

## Verbatim

> **43.** Maintain **business-continuity arrangements** for models: identify **disruption scenarios** and define **fallbacks** — manual processing, model substitution, or a backup model.
> **44.** On **decommissioning**, **inform all affected stakeholders** and manage the **enterprise transition** in an orderly way (the decommissioned model is then retained per [Para 23](para-23-retention.md)).

## Intent

Models fail, vendors go dark, and pipelines break — Para 43 demands you have already decided what happens *when the model is unavailable*. A high-tier model that drives lending with no fallback is an operational single point of failure. The required answers are concrete: revert to manual, switch to a substitute, or run a backup. Para 44 governs the *end* of a model's life: decommissioning is not just flipping a flag — dependents must be told and the transition managed, after which the model moves into long-term retention rather than deletion ([Para 23](para-23-retention.md)). Both are about the model's edges: what happens when it stops, planned or not.

## Expected controls

- A **per-model BCP/fallback record**, tied to tier ([Para 17–20](para-17-20-risk-tiering.md)) — higher tier demands a more robust, tested fallback (Para 43).
- Identified **disruption scenarios** and the chosen fallback mode (manual / substitute / backup) for each.
- A **decommissioning workflow**: stakeholder notification (using the dependency graph, [Para 21–22](para-21-22-inventory.md)), lifecycle transition to `decommissioned`, and an audit event (Para 44).
- Automatic enrolment of the decommissioned model into the [Para 23](para-23-retention.md) ten-year retention clock.

## Evidence required

- For each model (especially high-tier): its disruption scenarios and a tested fallback plan.
- For decommissioned models: the stakeholder-notification record and the transition plan.
- Evidence the decommissioned entry remains in inventory under retention, not deleted.

## Example (Prahari) and honest scope

Prahari models the **lifecycle states** Para 44 needs — `active → inactive → decommissioned` — and the retention clock starts from `decommissionedAt`, which `prahari check` already watches (`RETENTION_ELAPSED`, [Para 23](para-23-retention.md)). The **dependency** field ([Para 21–22](para-21-22-inventory.md)) is the basis for "inform affected stakeholders" — downstream models are discoverable. What Prahari does **not** do is execute the failover or send the notifications: the BCP plan and the actual transition are RE operational processes; Prahari holds the fallback plan as evidence, tracks the lifecycle transition, and preserves the decommissioned record for retention.

## Common mistakes

- **No fallback for a critical model.** A high-tier model with no manual/substitute/backup is an unmanaged single point of failure (Para 43).
- **An untested BCP.** A fallback nobody has exercised is a hope, not a control.
- **Silent decommissioning.** Para 44 requires informing affected stakeholders — pull them from the dependency graph.
- **Deleting on decommission.** The record must be *retained* ([Para 23](para-23-retention.md)), not purged.

---

*Cite as:* **Prahari Control Reference — Para 43-44** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
