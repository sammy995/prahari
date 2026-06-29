# Para 49–53 — AI/ML scope, autonomy, and third-party AI supply chain

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.1

## Verbatim

> **49–51.** Define the **scope of AI/ML models** (including foundational / frontier models); apply **additional controls proportionate to impact**; deploy AI **only where the risk is manageable**. Where a provider **will not disclose** enough to manage the risk, **mitigate** — e.g. restrict the model's usage.
> **52.** Tiering shall additionally consider the **degree of reliance on, and autonomy of,** the model's outputs.
> **53.** For **material third-party AI**, address **supply-chain risk**: provider concentration (few viable providers), limits on independent validation, and **provider-driven update drift**.

## Intent

This is the on-ramp to the AI chapter: it defines *what counts as AI/ML* and sets the principle that **controls scale with impact** — a frontier model in a lending decision earns more scrutiny than a toy classifier. Para 51's escape clause is important: if a vendor won't tell you enough to manage the risk, you don't get to shrug — you restrict usage until you can. Para 52 adds the AI-specific tiering driver: **autonomy and reliance**. A model whose outputs are acted on automatically is riskier than one a human always reviews, even at equal materiality — so autonomy *raises* the tier ([Para 17–20](para-17-20-risk-tiering.md)). Para 53 names the third-party-AI-specific danger: you may depend on one of very few providers, be unable to validate their model fully, and have it change under you without notice.

## Expected controls

- An **AI flag + impact rating** per model that maps to a required **additional-control bundle** (Paras 49–51), and a **usage-restriction** policy for under-disclosed models (Para 51).
- **Autonomy / reliance** as a tiering input that can only **raise** the tier (Para 52, [Para 17–20](para-17-20-risk-tiering.md)).
- A **third-party-AI supply-chain record**: provider concentration, validation limitations, and update-drift exposure (Para 53, extends [Para 45–48](para-45-48-third-party.md)).
- These feed the downstream AI controls: behavioural testing + explainability ([Para 54](para-54-ai-behavioural-explainability.md)) and deployment security ([Para 59](para-59-ai-deployment-security.md)).

## Evidence required

- The AI inventory subset with impact ratings and the additional controls applied to each.
- For under-disclosed vendor models: the documented usage restriction and its rationale.
- Tier records showing autonomy was a scoring input where relevant (Para 52).
- A supply-chain risk note for each material third-party AI model (Para 53).

## Example (Prahari)

The inventory carries an **`isAi`** flag and tiering accepts an **`autonomy`** input that feeds the non-offsetting tier — exactly Para 52:

```ts
import { computeTier } from '@prahari/rbi-tiering';

computeTier({ materiality: 1, complexity: 1, isAi: true, autonomy: 3 }).tier; // 'high' — autonomy raises it
```

The [genai-chatbot](../../examples/genai-chatbot) Customer Support Copilot lands *high* tier on autonomy alone, and the [nbfc](../../examples/nbfc) vendor model is the third-party-AI case Para 53 targets. Impact-bundle selection, usage restrictions, and the supply-chain note attach as evidence; the *decision* to restrict an under-disclosed model is the RE's, recorded against the model.

## Common mistakes

- **No definition of "AI in scope".** Without Paras 49–51 scoping, foundational/frontier models slip through ungoverned.
- **Accepting vendor opacity.** Para 51 requires mitigation (e.g. usage limits), not acceptance, when disclosure is insufficient.
- **Tiering AI on materiality/complexity only.** Para 52 makes autonomy/reliance a driver — an autonomous model is high even if "simple".
- **Ignoring provider concentration.** Para 53's supply-chain risk (few providers, silent updates) is separate from ordinary third-party risk.

---

*Cite as:* **Prahari Control Reference — Para 49-53** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
