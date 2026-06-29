# Para 1–6 — Objective, applicability, and scope

[← Control reference](README.md) · RBI MRM 2026, Chapter I

## Verbatim

> **1–3.** Objective: set **regulatory principles for managing model risk** as Regulated Entities (REs) increasingly rely on models — including AI/ML — in decisions that affect customers and financial stability.
> **4.** **Applicability:** Commercial Banks (incl. SFBs, Payments, Local-Area, Regional-Rural), **Urban & Rural Co-operative Banks**, **NBFCs (all layers)**, **AIFIs** (EXIM, NABARD, NaBFID, NHB, SIDBI), **ARCs**, and **CICs**.
> **5.** Principles are to be applied **proportionately** to the nature, scale and complexity of the RE's model use.
> **6.** **Scope:** the guidance applies to **all models** — developed **internally, procured from third parties, or a combination** — across the entire lifecycle.

## Intent

This is the frame the rest of the guidance hangs on: *who* must comply, *to what*, and *how hard*. Para 4 casts a wide net — not just big banks, but co-operatives, every NBFC layer, the all-India financial institutions, asset-reconstruction and credit-information companies. Para 5 is the release valve: a small NBFC is not held to the same operational depth as a large bank — apply the principles **proportionately** (which is exactly what risk-based tiering, [Para 17–20](para-17-20-risk-tiering.md), operationalises). Para 6 closes the obvious loopholes before they open: **all** models, **any** sourcing, **whole** lifecycle. A bought model, a spreadsheet, a decommissioned model — all in scope.

## Expected controls

- A statement in the MRMF ([Para 9–13](para-09-13-governance.md)) of **which entity type** the RE is and therefore how the principles apply (Para 4).
- **Proportionate** control depth driven by tier, so small/low-risk estates are not over-governed and material ones are not under-governed (Para 5, [Para 18](para-17-20-risk-tiering.md)).
- An inventory whose scope rule is **"all models, any sourcing, whole lifecycle"** — internal, third-party, hybrid; active to decommissioned ([Para 21–22](para-21-22-inventory.md), [Para 7(3)](para-07-model-definition.md)) (Para 6).

## Evidence required

- The RE's applicability statement (entity type + how the guidance applies).
- A documented proportionality rationale for the control depth chosen per tier.
- An inventory demonstrably covering internal, third-party, and hybrid models across all lifecycle states.

## Example (Prahari)

Prahari is built for the proportionality of Para 5 and the breadth of Para 6. The same toolkit serves a four-model NBFC and a large bank — depth follows the **tier**, not the tool ([Para 17–20](para-17-20-risk-tiering.md)). The examples span entity types deliberately: a [retail bank](../../examples/retail-bank), a [middle-layer NBFC](../../examples/nbfc), and a [GenAI estate](../../examples/genai-chatbot). The inventory accepts every sourcing and type — internal ML, **third-party** vendor models ([Para 45–48](para-45-48-third-party.md)), and even a **spreadsheet** ([Para 7(3)](para-07-model-definition.md)) — so the Para 6 scope rule is enforced by what the registry will hold.

## Common mistakes

- **"We're only an NBFC / co-op, this isn't for us."** Para 4 includes all NBFC layers, co-operatives, AIFIs, ARCs and CICs.
- **Proportionality as an excuse to skip controls.** Para 5 scales *depth*, not *coverage* — every model is still governed, just to a tier-appropriate degree.
- **Scoping out bought or legacy models.** Para 6 is explicit: internal, third-party, hybrid, whole lifecycle.

---

*Cite as:* **Prahari Control Reference — Para 1-6** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
