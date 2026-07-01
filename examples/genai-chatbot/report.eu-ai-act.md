# Model Risk Management Report — Demo Bank — GenAI

_Generated 2026-07-01T18:12:10.623Z · RBI MRM 2026 (draft) · Prahari_

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


## 5. Framework view — EU AI Act (alignment, not compliance)

> This maps your RBI control set to EU AI Act. It is **not** a EU AI Act compliance attestation; the deltas below are not covered by the Prahari core.

| Prahari Control Core | RBI | EU AI Act | Relationship |
| --- | --- | --- | --- |
| TIER-01 Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | Art. 9 | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | Art. 9 | partial |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | Art. 10 | partial |
| INV-04 Model documentation | Para 24 | Art. 11 | partial |
| AISEC-01 AI deployment security baseline | Para 58 | Art. 12 | partial |
| CONS-01 Consumer protection | Para 25 | Art. 86 | partial |
| HO-01 Human oversight + kill switch | Para 60 | Art. 14 | partial |
| AIR-05 Explainability thresholds + behavioural risk | Para 54 | Art. 15 | partial |
| GOV-01 Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | Art. 17 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | Art. 17 | partial |
| TPM-01 Third-party accountability + validation | Para 45, 46, 47, 48 | Art. 26 | partial |
| AISEC-02 Customer-facing AI controls | Para 59 | Art. 50 | partial |
| LIFE-04 Deployment + ongoing monitoring | Para 36, 37 | Art. 72 | partial |
| HO-02 Human factors | Para 61, 62, 63 | Art. 73 | partial |

### Deltas — EU AI Act obligations not covered by the core

| EU AI Act | Title |
| --- | --- |
| Art. 13 | Transparency and provision of information to deployers |
| Art. 43 | Conformity assessment |
| Art. 48 | CE marking of conformity |
| Art. 49 | Registration in the EU database |
