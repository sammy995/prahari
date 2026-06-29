# Para 8 — The Regulated Entity stays accountable

[← Control reference](README.md) · RBI MRM 2026, Chapter II

## Verbatim

> **8.** The Regulated Entity shall be **accountable for the outcomes of all models** it uses — whether developed **internally, procured from third parties, or a combination** thereof — across the entire model lifecycle.

## Intent

This is the load-bearing sentence of the whole guidance, and the reason a tool can never "do compliance for you". Accountability does not transfer: not to a vendor (reinforced for third-party models at [Para 45](para-45-48-third-party.md)), not to an auditor, and not to software like Prahari. Every other control — tiering, validation, oversight — exists to let the accountable RE *discharge* that accountability with evidence. It also sets the scope: **all** models, every lifecycle stage, no carve-out for "we just bought it".

## Expected controls

- A named, accountable **owner inside the RE** for every model — including third-party and hybrid models.
- A standing attestation that the RE (not the vendor, not the tool) owns the outcome, recorded against each model.
- Governance artefacts (MRMF, RMCB minutes, sign-offs) that show a human in the RE approved and reviewed the model.
- A clear statement, everywhere outputs are produced, that the tool **assists** governance and does not assume accountability.

## Evidence required

- For each model: the RE owner of record and a dated accountability attestation.
- Board/RMCB approval trail showing the RE exercised judgement (not deferred it to a vendor certificate).
- Reports that explicitly attribute accountability to the RE.

## Example (Prahari) and honest scope

Prahari is built around this paragraph rather than against it. Every inventory entry requires an `owner` role inside the RE; every generated report carries the line *"The Regulated Entity remains accountable for its models (RBI Para 8)"*; and the project's [DISCLAIMER](../../DISCLAIMER.md) refuses to claim compliance on your behalf. Prahari produces the **evidence** an accountable RE needs — it never becomes the accountable party. That is a deliberate design constraint, not a limitation to apologise for.

> If a vendor offers a "compliance guarantee", Para 8 means it does not move accountability off the RE. Treat such assurances as inputs to your own validation ([Para 46](para-45-48-third-party.md)), not substitutes for it.

## Common mistakes

- **"The vendor is certified, so we're covered."** Para 8 (and Para 45) say the RE still owns the outcome.
- **Treating a tool's output as compliance.** Prahari (or any tool) gives evidence; the RE signs off.
- **No named internal owner for a bought model.** A third-party model with only a vendor contact has no accountable RE owner.
- **Accountability that ends at deployment.** It runs the *entire lifecycle*, including monitoring and decommissioning.

---

*Cite as:* **Prahari Control Reference — Para 8** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
