# Para 9–13 — Governance: the MRMF, the Board, the RMCB

[← Control reference](README.md) · RBI MRM 2026, Chapter II

## Verbatim

> **9–10.** The Board shall approve a **Model Risk Management Framework (MRMF)** covering model taxonomy, governance structure, the **tiering methodology**, inventory and documentation standards, and policies across the entire model lifecycle.
> **11.** The Board **approves and periodically reviews** the MRMF and the **risk appetite / tolerance** for model risk (informed by scenario and stress analysis), including the tiering policy.
> **12.** A **Risk Management Committee of the Board (RMCB)** shall review **high-risk validation reports and approve their deployment**, review the tiering outcome **at least annually**, oversee exception / third-party / AI models, and review breach reports.
> **13.** **Senior management** operationalises the MRMF: allocates resources, runs tiering, keeps the inventory current, reviews policies, and reports to the RMCB.

## Intent

This is the chain of command that makes every other control answerable to a human body. The framework (the **MRMF**, Paras 9–11) is the written, board-approved constitution; the **RMCB** (Para 12) is the standing committee that actually approves high-risk models and reviews tiering; **senior management** (Para 13) does the day-to-day. The design point: governance is *layered and explicit* — the Board owns the policy and the risk appetite, the RMCB owns high-risk approvals and oversight, management owns execution. Nothing high-risk should reach production without a named body having approved it under a documented framework.

## Expected controls

- A **versioned, board-approved MRMF** that every control binds to (taxonomy, tiering method, inventory/doc standards, lifecycle policies) — with a recorded approval date and a periodic-review cadence (Paras 9–11).
- Recorded **risk-appetite / tolerance thresholds** for model risk, reviewable by the Board (Para 11).
- An **RMCB approval queue** scoped to high-tier models (high → RMCB, [Para 18](para-17-20-risk-tiering.md)), plus an **annual tiering-review** workflow and oversight dashboards for exception / third-party / AI models (Para 12).
- **Role assignment** for senior management, inventory-upkeep tasks, and **RMCB report generation** (Para 13).

## Evidence required

- The MRMF document with its version, board approval date, and last review date.
- Risk-appetite thresholds and the minutes showing the Board set/reviewed them.
- RMCB minutes evidencing high-risk approvals and the at-least-annual tiering review.
- A management reporting trail to the RMCB.

## Example (Prahari) and honest scope

Prahari produces the **artefacts and routing** this governance needs rather than being the committee itself. Tiering ([Para 17–20](para-17-20-risk-tiering.md)) drives high-tier models to an `approver: 'rmcb'` authority, so the inventory records which models *require* board-committee approval; the generated [examiner / board report](../../examples) is exactly the kind of summary management places before the RMCB (Para 13). What Prahari does **not** do is hold board minutes or run the meeting — the MRMF, the approvals, and the risk-appetite decisions are governance acts by named humans at the RE. Prahari makes them inventory-bound, evidenced, and reportable.

## Common mistakes

- **An MRMF that exists but isn't bound to anything.** If controls don't cite the framework, the framework is decoration (Para 9).
- **High-risk models deployed without RMCB approval.** Para 12 makes the RMCB the approver for high-risk; a delegated sign-off must be specified in the MRMF.
- **Tiering reviewed once.** Para 12 requires the RMCB to review tiering *at least annually*.
- **No risk appetite.** Without recorded thresholds (Para 11) you cannot say when model risk has exceeded tolerance (the trigger for enterprise-level action, Para 14).
- **Conflating the bodies.** Board sets policy/appetite; RMCB approves high-risk + oversees; management executes. Collapsing them removes the independent check.

---

*Cite as:* **Prahari Control Reference — Para 9-13** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
