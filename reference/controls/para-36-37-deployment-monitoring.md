# Para 36–37 — Deployment and ongoing monitoring

[← Control reference](README.md) · RBI MRM 2026, Chapter IV-D

## Verbatim

> **36.** Deploy models with proper **IT and data coordination**, ensuring outputs are **replicable and stable** in the production environment.
> **37.** **Continuously monitor all deployed models**; models running under an **exception** shall be subject to **enhanced RMCB monitoring**.

## Intent

The gap between "validated in the lab" and "behaving in production" is where model risk quietly reappears. Para 36 insists the deployed model is the *same* model — replicable, stable outputs, with IT and data aligned so production data matches what was validated. Para 37 makes monitoring **universal and ongoing** (every deployed model, not just the risky ones) and turns the dial up for exception models ([Para 35](para-34-35-approval.md)): if you went live early, you watch harder and the RMCB watches with you. The recurring failure: a model validated on clean historical data drifts in production and nobody is watching the right signal.

## Expected controls

- A **deployment record** linking the approved/validated model version to what actually runs, with an **output-stability / replicability** check at release (Para 36).
- IT + data coordination evidence: the production data pipeline matches the validated inputs.
- **Continuous monitoring** hooks for **every** deployed model — performance, drift, output distribution (Para 37, ties to [Para 54(7)](para-54-ai-behavioural-explainability.md) data/concept drift).
- An **enhanced-monitoring flag** for exception models, routing heightened reporting to the RMCB (Para 37 + Para 35).

## Evidence required

- The deployment record: version deployed, date, replicability/stability check result.
- Monitoring configuration and recent monitoring output per deployed model.
- For exception models: evidence of enhanced monitoring and RMCB-level reporting.

## Example (Prahari) and honest scope

Prahari governs the **state and evidence** around deployment, not the live serving. The inventory tracks lifecycle (`active`) and the model's tier/approval, and `prahari check` treats any live model as in-scope for governance; monitoring results and the deployment/replicability check attach as evidence. The **runtime monitoring itself** — drift detection, output-stability measurement, the production data pipeline — lives in the serving/ML-ops stack (this is where a request-path gateway sits). Prahari's job is to *require* continuous monitoring for every deployed model, *flag* exception models for enhanced oversight, and *hold* the monitoring evidence an examiner reads — not to be the monitor.

## Common mistakes

- **"Validated, therefore fine forever."** Para 37 makes monitoring continuous; validation is a point in time.
- **Monitoring only high-tier models.** Para 37 says *all* deployed models.
- **Production data ≠ validated data.** Without the Para 36 IT/data coordination, the deployed model is effectively unvalidated.
- **Exception models monitored like any other.** Para 37 requires *enhanced* RMCB monitoring for them.
- **No stability check.** Non-replicable outputs in production (especially for stochastic AI, [Para 54(6)](para-54-ai-behavioural-explainability.md)) mean you can't trust or reproduce a decision.

---

*Cite as:* **Prahari Control Reference — Para 36-37** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
