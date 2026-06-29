# Para 55–57 — Red-teaming, auto-updating models, and AI documentation

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.1

## Verbatim

> **55.** Subject AI models to **structured challenge, including red-teaming**, especially for **customer-facing and generative** models.
> **56.** For **dynamic / auto-updating** models, define the **scope of permitted auto-updates**, require **strict justification**, apply **enhanced data checks**, and **monitor more frequently**.
> **57.** Maintain **enhanced AI documentation** sufficient for **traceability, reproducibility and auditability**.

## Intent

The tail of the AI chapter hardens three things. Para 55 demands *adversarial* challenge — not just "does it work" but "can we make it fail" — and singles out customer-facing and generative models, where a clever prompt or input is a live attack ([Para 59](para-59-ai-deployment-security.md)). Para 56 confronts models that **change themselves**: an auto-updating model is a moving target, so the guidance bounds what it may change on its own, demands justification, tightens data checks, and raises monitoring frequency — and a self-update that crosses the materiality line is still a material change ([Para 38–42](para-38-42-change-management.md)). Para 57 raises the documentation bar specifically for AI: enough to **reproduce** a past decision and **audit** it, which ordinary model docs ([Para 24–25](para-24-25-documentation-consumer.md)) often aren't for opaque models.

## Expected controls

- A **red-team / structured-challenge** result store with a scheduled cadence, mandatory for customer-facing + generative models (Para 55) — complements adversarial testing under [Para 54](para-54-ai-behavioural-explainability.md).
- An **auto-update policy** per dynamic model: permitted update scope, justification requirement, enhanced data checks, and a **tighter monitoring cadence** ([Para 36–37](para-36-37-deployment-monitoring.md)); auto-updates crossing the material-change threshold reopen validation/approval ([Para 38–42](para-38-42-change-management.md)) (Para 56).
- An **extended AI documentation schema** capturing lineage, versions, prompts/parameters, and decision traces for reproducibility and audit (Para 57).

## Evidence required

- Dated red-team / challenge results per customer-facing or generative model (Para 55).
- For auto-updating models: the update-scope policy, justification records, and the higher-frequency monitoring logs (Para 56).
- AI documentation sufficient to reproduce and audit a specific past decision (Para 57).

## Example (Prahari) and honest scope

Prahari is the **evidence and policy ledger** for these controls, not the red-team or the reproducibility engine. Red-team results, the auto-update policy, and the enhanced AI documentation attach as evidence against the model; tiering and the `isAi`/`consumerFacing` flags identify *which* models must carry them (the [genai-chatbot](../../examples/genai-chatbot) estate is the obvious population). The actual adversarial testing, the auto-update guardrails, and the decision-trace capture live in the ML/serving stack — Prahari requires them, links them, and makes their absence visible to an examiner.

## Common mistakes

- **Functional testing only.** Para 55 wants *adversarial* challenge (red-teaming), especially for generative/customer-facing models.
- **Unbounded auto-updates.** Para 56 requires a defined update scope and justification — a model that silently retrains itself is ungoverned.
- **Same monitoring cadence as a static model.** Auto-updating models need *more frequent* monitoring (Para 56).
- **Missing the material-change link.** A self-update that is material still triggers re-validation/approval ([Para 38–42](para-38-42-change-management.md)).
- **Docs that can't reproduce a decision.** Para 57's bar is traceability/reproducibility/auditability, not a one-page model card.

---

*Cite as:* **Prahari Control Reference — Para 55-57** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
