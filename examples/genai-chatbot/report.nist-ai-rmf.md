# Model Risk Management Report — Demo Bank — GenAI

_Generated 2026-07-01T03:33:21.320Z · RBI MRM 2026 (draft) · Prahari_

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable for its models (RBI Para 8).

## 1. Inventory overview (Para 21–22)

- Total models: **3**
- Live (active / under development): **3**
- By lifecycle: active=3
- By risk tier: high=1, medium=1
- By type: genai=3

## 2. Compliance findings (Para 12, 17, 23, 33)

- Critical: **0** · Warning: **1** · Info: **0**

| Severity | Code | RBI ref | Model | Finding |
| --- | --- | --- | --- | --- |
| WARNING | UNTIERED | Para 17, 21 | Internal Policy Q&A Bot | Live model has no risk tier assigned. |


## 3. Model register (Para 22)

| Model | Type | Tier | Lifecycle | Third-party | Owner | Validator |
| --- | --- | --- | --- | --- | --- | --- |
| Customer Support Copilot | genai | high | active | no | cx | airisk |
| Marketing Copy Generator | genai | medium | active | no | mktg | airisk |
| Internal Policy Q&A Bot | genai | — | active | no | ops | airisk |

## 4. Attestation

This report is generated from the RE's own model inventory. High-risk models require RMCB approval (Para 18); validation reports are due to the RMCB within three months of completion (Para 33); decommissioned models are retained for at least ten years (Para 23).


## 5. Framework view — NIST AI RMF (alignment, not compliance)

> This maps your RBI control set to NIST AI RMF. It is **not** a NIST AI RMF compliance attestation; the deltas below are not covered by the Prahari core.

| Prahari Control Core | RBI | NIST AI RMF | Relationship |
| --- | --- | --- | --- |
| GOV-00 RE accountability | Para 8 | GOVERN 2.1 | partial |
| GOV-01 Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | GOVERN 1.2 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | GOVERN 2.1 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | MANAGE 2.1 | partial |
| TIER-01 Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | MANAGE 1.2 | partial |
| TIER-01 Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | MEASURE 1.1 | partial |
| INV-01 Complete model inventory | Para 21, 22 | GOVERN 1.6 | partial |
| INV-04 Model documentation | Para 24 | MEASURE 2.8 | partial |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | MAP 1.1 | partial |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | MEASURE 2.11 | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | MEASURE 2.3 | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | MEASURE 2.5 | partial |
| LIFE-03 Approval authority + exceptions | Para 34, 35 | GOVERN 2.1 | partial |
| LIFE-04 Deployment + ongoing monitoring | Para 36, 37 | MANAGE 4.1 | partial |
| LIFE-05 Change management | Para 38, 39, 40, 41, 42 | MANAGE 4.1 | partial |
| LIFE-06 Business continuity + decommissioning | Para 43, 44 | MANAGE 2.3 | partial |
| LIFE-06 Business continuity + decommissioning | Para 43, 44 | MANAGE 2.4 | partial |
| TPM-01 Third-party accountability + validation | Para 45, 46, 47, 48 | GOVERN 6.1 | partial |
| TPM-01 Third-party accountability + validation | Para 45, 46, 47, 48 | MAP 4.1 | partial |
| AIR-01 AI scope, autonomy, supply chain | Para 49, 50, 51, 52, 53 | MAP 3.4 | partial |
| AIR-05 Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.9 | partial |
| AIR-05 Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.11 | partial |
| AIR-05 Explainability thresholds + behavioural risk | Para 54 | MEASURE 2.6 | partial |
| AIR-13 Red-teaming, auto-update, AI documentation | Para 55, 56, 57 | MEASURE 2.7 | partial |
| AISEC-01 AI deployment security baseline | Para 58 | MEASURE 2.7 | partial |
| AISEC-02 Customer-facing AI controls | Para 59 | MEASURE 2.7 | partial |
| AISEC-02 Customer-facing AI controls | Para 59 | MANAGE 4.1 | partial |
| HO-01 Human oversight + kill switch | Para 60 | MANAGE 2.4 | partial |
| HO-01 Human oversight + kill switch | Para 60 | GOVERN 3.2 | partial |
| HO-02 Human factors | Para 61, 62, 63 | GOVERN 3.2 | partial |
| HO-02 Human factors | Para 61, 62, 63 | MANAGE 4.3 | partial |
| CONS-01 Consumer protection | Para 25 | GOVERN 5.1 | partial |

### Deltas — NIST AI RMF obligations not covered by the core

| NIST AI RMF | Title |
| --- | --- |
| GOVERN 1.1 | Legal and regulatory requirements involving AI are understood, managed, documented |
| GOVERN 6.2 | Contingency processes for failures of third-party resources |
| MAP 2.3 | Scientific integrity and TEVV considerations are identified |
| MEASURE 3.1 | Approaches for tracking emergent risks are in place |
