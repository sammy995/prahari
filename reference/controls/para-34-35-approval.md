# Para 34–35 — Approval authority and time-boxed exceptions

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-C

## Verbatim

> **34.** Establish a **model approval structure** with defined **authorities and thresholds** by risk tier (high-risk → the RMCB), and **document the approval rationale**.
> **35.** Where a model is approved as an **exception** (e.g. before full validation, or with open findings), the approval shall be **time-boxed**, carry **additional requirements / compensating controls**, and specify a **remediation timeline** — with the rationale recorded.

## Intent

Approval is the deliberate decision to put a model into use, made by someone with the *authority* to make it. Para 34 ties that authority to the tier — high-risk models need the RMCB ([Para 12](para-09-13-governance.md)) — and demands the **rationale** be written down, so an examiner can see *why* a model was approved, not just *that* it was. Para 35 handles reality: sometimes a model must go live before everything is perfect. The guidance permits that, but only as a **bounded** exception — a clock, extra controls, and a remediation deadline — never an open-ended waiver. An exception with no expiry is the failure this prevents.

## Expected controls

- An **approval engine** mapping tier → approver authority (high → RMCB, lower → delegated as specified in the MRMF) ([Para 17–20](para-17-20-risk-tiering.md) → `approver`).
- Recorded **approval rationale** per model (Para 34).
- A first-class **exception** object: time-boxed expiry, attached compensating controls / additional requirements, and a remediation timeline (Para 35).
- Escalation when an exception **expires un-remediated** — it should not silently lapse into a permanent approval.

## Evidence required

- For each live model: who approved it, under what authority, with the recorded rationale.
- For each exception: its expiry date, the additional requirements, the remediation plan, and its current status.
- RMCB minutes for high-risk approvals (Para 34 + Para 12).

## Example (Prahari) and honest scope

Tiering already names the **approver authority**: `tierToControls('high').approver === 'rmcb'`, so the inventory records which models *must* be RMCB-approved versus delegated — the Para 34 threshold structure in data. The approval rationale and any exception (with expiry + remediation) attach as evidence against the model. Prahari does **not** run the approval meeting or enforce the expiry as a live gate today; the time-box and remediation are governance commitments the RE tracks, and a future `check` for *expired exceptions* is a natural extension (it mirrors the existing overdue-validation check).

## Common mistakes

- **Approval without recorded rationale.** Para 34 wants the *why*, auditable later.
- **Wrong authority.** A high-risk model approved by a delegated authority instead of the RMCB breaches Para 34/12.
- **Open-ended exceptions.** Para 35 requires a time-box and remediation timeline; a permanent "temporary" exception is the classic finding.
- **Exceptions without compensating controls.** Going live early must be *paid for* with additional requirements, not waved through.

---

*Cite as:* **Prahari Control Reference — Para 34-35** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
