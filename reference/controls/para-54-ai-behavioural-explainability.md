# Para 54 — AI behavioural risk and explainability thresholds

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.1

## Verbatim

> **54.** REs shall address behavioural risks of AI/ML models, including testing under **atypical, stressed, edge-case and adversarial** conditions, and in particular:
> **54(1)(i).** define **explainability and transparency thresholds for all AI models**, set higher for material or customer-impacting models;
> **54(1)(ii).** where full explainability cannot be achieved, apply **enhanced validation, output corroboration, more frequent validation and continuous monitoring, usage restrictions, and compensating controls**;
> **54(2).** establish control boundaries against **hallucination** in generative / customer-facing outputs;
> **54(3).** assess and mitigate **bias and discrimination** (recalibrate / redesign, constrain complexity, limit features);
> **54(4)–(7).** guard against **overfitting**, **spurious correlations**, **output variability/uncertainty**, and **data + concept drift** (monitored on an ongoing basis).

## Intent

This is where the guidance gets specifically about AI. The headline is **54(1): you must set an explainability threshold for every AI model — in advance — and raise it for anything material or customer-facing.** The threshold is a governance commitment, not a metric you discover afterwards. The clever part is 54(1)(ii): the regulator accepts that some models can't be fully explained, but only if you *pay for it* with compensating controls (more validation, corroboration, continuous monitoring, usage limits). Explainability is not pass/fail; it is a dial wired to a control budget. The remaining sub-clauses (54(2)–(7)) name the concrete AI failure modes — hallucination, bias, overfitting, spurious correlation, output variance, drift — that behavioural testing must probe.

## Expected controls

- A **per-model explainability threshold**, with **tier-linked minimums** (material / customer-facing → higher) (54(1)(i)).
- A rule that **falling below the threshold auto-requires a compensating-control set** — enhanced + more frequent validation, output corroboration, continuous monitoring, usage restrictions (54(1)(ii)).
- **Behavioural test evidence** under atypical / stressed / edge / adversarial conditions, captured per model (54).
- **Hallucination guardrails** on generative, customer-facing outputs (54(2) — see also [Para 59](para-59-ai-deployment-security.md)).
- **Fairness assessment** + tracked mitigations (54(3)); generalisation / out-of-sample evidence (54(4)); spurious-correlation review (54(5)); confidence/variance capture (54(6)); ongoing **data + concept drift** monitoring (54(7)).

## Evidence required

- For each AI model: its declared explainability threshold and the rationale for the level chosen.
- Where the threshold is not met: the documented compensating-control package and proof it is in force.
- Adversarial / stress / edge-case test results, dated, per model.
- Fairness-assessment records, drift-monitoring output, and confidence/variance metrics.

## Example (Prahari) and honest scope

The [genai-chatbot example](../../examples/genai-chatbot) is exactly the population Para 54 targets — three generative models, customer-facing and internal. Prahari governs the **threshold and evidence layer**: it records each AI model's explainability threshold, captures behavioural-test / fairness / drift evidence as evidence records, and (via tiering, [Para 17–20](para-17-20-risk-tiering.md)) escalates material and high-autonomy models so the higher threshold and compensating controls apply. Prahari does **not** itself measure explainability, detect hallucinations, or compute fairness at runtime — those live in the model-serving and ML-eval stack. Prahari's role is to *require* the threshold, *demand* the compensating controls when it is missed, and *hold* the evidence an examiner reads.

## Common mistakes

- **Treating explainability as discovered, not declared.** 54(1)(i) wants a threshold *set in advance*.
- **One threshold for all models.** Material / customer-facing models must be held higher.
- **Claiming a black-box model is fine** without the 54(1)(ii) compensating controls — that is the only acceptable path when full explainability is unachievable.
- **Testing only the happy path.** 54 specifically wants atypical / stressed / edge / **adversarial** conditions.
- **Bias check once at launch.** Drift (54(7)) makes fairness and performance a *continuous* obligation.

---

*Cite as:* **Prahari Control Reference — Para 54** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
