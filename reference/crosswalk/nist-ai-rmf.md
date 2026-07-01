# Crosswalk — NIST AI RMF 1.0

[← Crosswalk](README.md) · Generated from `@prahari/crosswalk` — do not edit by hand.

> Not legal advice; not a NIST or RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts.

Implementing the Prahari Control Core covers the **shared backbone** of NIST AI RMF. It does **not** make you "NIST compliant"; the deltas below are obligations the core does not cover.

**Coverage:** 23 NIST subcategories mapped · 4 deltas · 22 core controls.

## Core control → NIST AI RMF

| Prahari Control Core | RBI | NIST AI RMF 1.0 | Relationship | Notes |
| --- | --- | --- | --- | --- |
| `GOV-00` RE accountability | Para 8 | GOVERN 2.1 — Roles, responsibilities, and lines of authority are documented | partial | Both fix accountability/authority; RBI makes the RE accountable for outcomes of all models by mandate. |
| `GOV-01` Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | GOVERN 1.2 — Characteristics of trustworthy AI integrated into policies and processes | partial | NIST embeds trustworthy-AI in policy; RBI mandates a board-approved MRMF + RMCB approvals. |
| `GOV-02` Enterprise risk + three lines of defence | Para 14, 15, 16 | GOVERN 2.1 — Roles, responsibilities, and lines of authority are documented | partial | Three lines of defence ≈ documented roles/authority. |
| `GOV-02` Enterprise risk + three lines of defence | Para 14, 15, 16 | MANAGE 2.1 — Resources are allocated to manage AI risks | partial | Senior management allocates resources to manage model risk. |
| `TIER-01` Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | MANAGE 1.2 — Treatment of documented AI risks is prioritized | partial | Tiering prioritizes risk treatment; RBI adds a strict non-offsetting rule. |
| `TIER-01` Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | MEASURE 1.1 — Approaches and metrics for measurement are identified | partial | Tiering inputs ≈ measurement approaches for risk. |
| `INV-01` Complete model inventory | Para 21, 22 | GOVERN 1.6 — Mechanisms are in place to inventory AI systems | partial | Both require an AI/model inventory; RBI adds a hard "no model unless inventoried" gate + fields. |
| `INV-04` Model documentation | Para 24 | MEASURE 2.8 — Transparency and accountability are examined and documented | partial | Documentation/transparency; RBI ties retention to the inventory. |
| `LIFE-01` Pre-development discipline | Para 26, 27, 28 | MAP 1.1 — Intended purpose and context of use are established and documented | partial | Both document intended purpose/context before build. |
| `LIFE-01` Pre-development discipline | Para 26, 27, 28 | MEASURE 2.11 — Fairness and bias are evaluated and results documented | partial | RBI cost-benefit explicitly weighs bias/fairness at design time. |
| `LIFE-02` Independent validation | Para 29, 30, 31, 32, 33 | MEASURE 2.3 — AI system performance and assurance are evaluated | partial | Performance evaluation; RBI adds independence + 3-month RMCB report SLA. |
| `LIFE-02` Independent validation | Para 29, 30, 31, 32, 33 | MEASURE 2.5 — AI system is validated and verified; results documented | partial | Validation/verification documented. |
| `LIFE-03` Approval authority + exceptions | Para 34, 35 | GOVERN 2.1 — Roles, responsibilities, and lines of authority are documented | partial | Approval authority/thresholds ≈ documented lines of authority; RBI adds RMCB + time-boxed exceptions. |
| `LIFE-04` Deployment + ongoing monitoring | Para 36, 37 | MANAGE 4.1 — Post-deployment monitoring plans are implemented | partial | Continuous post-deployment monitoring of all deployed models. |
| `LIFE-05` Change management | Para 38, 39, 40, 41, 42 | MANAGE 4.1 — Post-deployment monitoring plans are implemented | partial | Change management/maintenance; RBI adds a material-change re-validation trigger. |
| `LIFE-06` Business continuity + decommissioning | Para 43, 44 | MANAGE 2.3 — Mechanisms are in place to sustain the value of deployed AI | partial | Sustaining deployed AI value ≈ business-continuity/fallback. |
| `LIFE-06` Business continuity + decommissioning | Para 43, 44 | MANAGE 2.4 — Mechanisms to supersede, disengage, or deactivate AI systems | partial | Deactivate/decommission mechanisms. |
| `TPM-01` Third-party accountability + validation | Para 45, 46, 47, 48 | GOVERN 6.1 — Policies and procedures for third-party (data/model) risk | partial | Third-party risk policy; RBI mandates independent RE validation + audit rights regardless of tier. |
| `TPM-01` Third-party accountability + validation | Para 45, 46, 47, 48 | MAP 4.1 — Third-party technology risks are mapped | partial | Third-party technology risks mapped. |
| `AIR-01` AI scope, autonomy, supply chain | Para 49, 50, 51, 52, 53 | MAP 3.4 — Human oversight of the AI system is defined and mapped | partial | Human oversight/autonomy mapped; RBI makes autonomy a tiering driver. |
| `AIR-05` Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.9 — AI model is explained, validated, and documented for interpretability | partial | Explainability/interpretability; RBI sets explicit thresholds + compensating controls. |
| `AIR-05` Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.11 — Fairness and bias are evaluated and results documented | partial | Fairness/bias evaluation. |
| `AIR-05` Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.6 — AI system safety risks are evaluated | partial | Behavioural/safety risk under stressed/edge/adversarial conditions. |
| `AIR-13` Red-teaming, auto-update, AI documentation | Para 55, 56, 57 | MEASURE 2.7 — AI system security and resilience are evaluated | partial | Red-teaming ≈ security/resilience evaluation. |
| `AISEC-01` AI deployment security baseline | Para 58 | MEASURE 2.7 — AI system security and resilience are evaluated | partial | Deployment security/resilience baseline. |
| `AISEC-02` Customer-facing AI controls | Para 59 | MEASURE 2.7 — AI system security and resilience are evaluated | partial | Prompt-injection/adversarial-input controls on customer-facing interfaces. |
| `AISEC-02` Customer-facing AI controls | Para 59 | MANAGE 4.1 — Post-deployment monitoring plans are implemented | partial | Anomalous-usage monitoring on customer-facing AI. |
| `HO-01` Human oversight + kill switch | Para 60 | MANAGE 2.4 — Mechanisms to supersede, disengage, or deactivate AI systems | partial | Kill switch ≈ mechanisms to disengage/deactivate; RBI mandates it explicitly. |
| `HO-01` Human oversight + kill switch | Para 60 | GOVERN 3.2 — Policies and procedures for human oversight of AI | partial | Human-oversight policy. |
| `HO-02` Human factors | Para 61, 62, 63 | GOVERN 3.2 — Policies and procedures for human oversight of AI | partial | Human-factors oversight policy (bias/fatigue/competency). |
| `HO-02` Human factors | Para 61, 62, 63 | MANAGE 4.3 — Incidents and errors are communicated to relevant stakeholders | partial | Incident/near-miss communication and periodic review. |
| `CONS-01` Consumer protection | Para 25 | GOVERN 5.1 — Mechanisms to collect and consider external feedback | partial | External feedback ≈ grievance redressal; RBI bars consumer-harming models outright. |

## Deltas — NIST obligations not covered by the core

| NIST AI RMF | Title | Status |
| --- | --- | --- |
| GOVERN 1.1 | Legal and regulatory requirements involving AI are understood, managed, documented | _No Prahari core control — assess separately._ |
| GOVERN 6.2 | Contingency processes for failures of third-party resources | _No Prahari core control — assess separately._ |
| MAP 2.3 | Scientific integrity and TEVV considerations are identified | _No Prahari core control — assess separately._ |
| MEASURE 3.1 | Approaches for tracking emergent risks are in place | _No Prahari core control — assess separately._ |

---

*Cite as:* **Prahari Crosswalk — NIST AI RMF** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026) and NIST AI RMF 1.0; re-verify against source texts.
