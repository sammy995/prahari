# Para 24–25 — Documentation and consumer protection

[← Control reference](README.md) · RBI MRM 2026, Chapter III-B/C

## Verbatim

> **24.** Maintain **comprehensive documentation for all models**, including **third-party** models, with **retention aligned to the inventory** (see [Para 23](para-23-retention.md)).
> **25.** Do **not deploy models that harm consumers**; for **consumer-facing** models, provide an effective **grievance-redressal** mechanism.

## Intent

Two distinct obligations sit together because both are about *accountability to the outside*. Para 24 says a model you cannot document is a model you cannot govern — and the documentation must cover bought models too ([Para 45–48](para-45-48-third-party.md)), retained as long as the inventory entry ([Para 23](para-23-retention.md)). Para 25 is the consumer-protection backstop: a model that harms consumers must not ship, and any model that touches consumers needs a real route for them to complain and be heard. The depth of documentation should be **proportionate to tier** ([Para 18](para-17-20-risk-tiering.md)) — comprehensive for high-risk, lighter for low — but never absent.

## Expected controls

- A **document store linked per model** (development record, validation report, monitoring, approvals), depth scaled to tier, retained per [Para 23](para-23-retention.md) (Para 24).
- Documentation required for **third-party** models too — sourced via the contract's documentation-access clause ([Para 48](para-45-48-third-party.md)).
- A **consumer-facing flag** per model, and for those models a linked **grievance-redressal** record / channel (Para 25).
- A pre-deployment **consumer-harm check** that can block a model assessed as harmful (Para 25).

## Evidence required

- For every model: a documentation set appropriate to its tier, with retention dates.
- For third-party models: the documentation obtained from the provider.
- For consumer-facing models: the grievance mechanism and a log of grievances + resolutions.

## Example (Prahari) and honest scope

The inventory already carries a **`consumerFacing`** flag (used by the [nbfc](../../examples/nbfc) KYC OCR and the [genai-chatbot](../../examples/genai-chatbot) support copilot), which is the hook Para 25 needs — it marks exactly which models require disclosures ([Para 59](para-59-ai-deployment-security.md)) and grievance redressal. Model documentation and grievance records attach as evidence and inherit the [Para 23](para-23-retention.md) retention clock. Prahari does **not** run the grievance channel or adjudicate consumer harm — those are RE processes; Prahari requires the flag, links the evidence, and keeps it for the retention period.

## Common mistakes

- **Documenting only internal models.** Para 24 explicitly includes third-party models.
- **Documentation that doesn't survive decommissioning.** Retention must align to the inventory ([Para 23](para-23-retention.md)).
- **A consumer-facing model with no grievance route.** Para 25 requires an effective redressal mechanism, not a generic helpline.
- **Treating "no complaints" as "no harm".** Para 25 bars *deploying* harmful models, independent of whether anyone complained.

---

*Cite as:* **Prahari Control Reference — Para 24-25** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
