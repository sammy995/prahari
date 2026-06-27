# Para 60 — Human oversight and the kill switch

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.3

## Verbatim

> **60.** Establish robust human oversight for AI models … including:
> (i) **human-in-command** arrangements (human-in-the-loop / on-the-loop);
> (ii) **override, suspension, or deactivation mechanisms, including kill-switch arrangements**; and
> (iii) periodic human review of model outputs and model-driven decisions to identify anomalies.

## Intent

No AI model should be able to act without a human able to stop it. The kill switch (ii) is the headline, but (i) command arrangements and (iii) anomaly review matter just as much — a switch nobody watches is not oversight. Paras 61–63 add the human factors: guard against automation bias/over-reliance/decision fatigue, ensure reviewers have the expertise to challenge, and review overrides/incidents/near-misses periodically.

## Expected controls

- An **instant disable** path for any AI model (the kill switch). For third-party *hosted* models you cannot stop the provider's model — disable the **integration/consumption path** so it can no longer influence a decision.
- Human-in-command configuration per model (in-the-loop vs on-the-loop) sized to its tier/autonomy.
- Logged overrides/interventions, plus periodic review of outputs and of the override log itself.
- Reviewer competency + escalation path; rotation to fight fatigue.

## Evidence required

- Demonstrable kill switch (a test that disabling stops the model influencing decisions).
- An override/intervention/near-miss log, reviewed periodically (Para 63).
- Records of who oversees each model and their authority to override.

## Example (Prahari) and honest scope

`@prahari/mrm` today governs the **inventory, tiering, evidence and reporting** around oversight: it records each AI model's oversight posture and supports an override/incident log feeding `prahari check` and the report. It does **not** itself sit in the live request path, so it is not the runtime kill switch — that control lives in the system serving the model (disable the endpoint/integration). Prahari's role is to require, configure, and evidence that the kill switch exists and is exercised.

> For hosted third-party models, satisfying (ii) by disabling the integration/consumption path (not the provider's model) is a reasonable reading — a point worth confirming with the regulator.

## Common mistakes

- **A switch nobody watches.** (ii) without (iii) is not oversight.
- **Assuming you can kill a hosted model.** You control your integration, not the provider's runtime — design the cut-off at your boundary.
- **Oversight by under-qualified staff.** Para 62 requires reviewers who can actually challenge the model.
- **Never reviewing overrides.** Para 63 wants the override/near-miss log itself reviewed and the arrangements strengthened over time.
