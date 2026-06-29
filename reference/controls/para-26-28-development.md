# Para 26–28 — Before you build: rationale, cost–benefit, data governance

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-A

## Verbatim

> **26.** Before development, the RE shall **document the rationale, objective and intended scope** of the model.
> **27.** The RE shall perform a **cost–benefit assessment** that explicitly considers **bias, fairness and ethical** implications, not only commercial benefit.
> **28.** Development shall follow a **structured process**, and the data used shall comply with the RE's **data-governance** standards (quality, lineage, suitability).

## Intent

Governance starts *before the first line of model code*. The guidance front-loads three decisions: **why** the model exists (26), **whether it should** exist once bias / fairness / ethics are weighed against benefit (27), and **how** it will be built and **on what data** (28). The point is to prevent the common failure where a model is built first and justified later — by which time the bias is baked in and the data lineage is unknowable. Para 27 is notable: a cost–benefit that ignores fairness is non-compliant; harm is a cost.

## Expected controls

- A **pre-development record** per model: rationale, objective, intended scope (Para 26) — captured before build, not retrofitted.
- A **cost–benefit assessment** template that forces explicit treatment of **bias, fairness and ethics** alongside commercial benefit (Para 27).
- A **structured development process** (stage gates, peer review) and a **data-governance attestation**: data quality, lineage/provenance, and suitability for the intended use (Para 28).
- Linkage so these artefacts attach to the model's inventory entry and survive into validation and audit.

## Evidence required

- The dated rationale/objective/scope document, timestamped before development began.
- The cost–benefit assessment showing the fairness/ethics analysis (not just ROI).
- Data-governance sign-off: data sources, lineage, quality checks, and a suitability statement.

## Example (Prahari) and honest scope

These are **pre-build governance forms**, so Prahari's role is to *require and hold* them as evidence against the inventory entry, and to make their absence visible — not to author the analysis. The inventory captures `intendedUse` (the Para 26 scope in miniature) at add time; the rationale, cost–benefit, and data-governance attestations attach as evidence records the validator and auditor later read. Prahari does **not** compute fairness or assess data quality — those are analyses the RE performs; Prahari ensures they exist, are dated before deployment, and are linked to the model. (The fairness theme recurs at runtime in [Para 54(3)](para-54-ai-behavioural-explainability.md).)

## Common mistakes

- **Retrofitting the rationale.** A scope document written after launch defeats Para 26; the date matters.
- **A cost–benefit that is pure ROI.** Para 27 explicitly requires bias / fairness / ethics in the calculus.
- **Untraceable training data.** Without lineage and a suitability statement you cannot satisfy Para 28 or later validate the model.
- **No stage gates.** "Structured process" (Para 28) means review points, not a single push to production.

---

*Cite as:* **Prahari Control Reference — Para 26-28** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
