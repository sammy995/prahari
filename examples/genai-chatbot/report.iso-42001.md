# Model Risk Management Report — Demo Bank — GenAI

_Generated 2026-07-01T03:47:21.299Z · RBI MRM 2026 (draft) · Prahari_

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


## 5. Framework view — ISO/IEC 42001 (alignment, not compliance)

> This maps your RBI control set to ISO/IEC 42001. It is **not** a ISO/IEC 42001 compliance attestation; the deltas below are not covered by the Prahari core.

| Prahari Control Core | RBI | ISO/IEC 42001 | Relationship |
| --- | --- | --- | --- |
| GOV-01 Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | A.2.2 | partial |
| GOV-00 RE accountability | Para 8 | A.3.2 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | A.3.2 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | A.4.2 | partial |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | A.6.1.2 | partial |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | A.7.4 | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | A.6.2.4 | partial |
| LIFE-03 Approval authority + exceptions | Para 34, 35 | A.3.2 | partial |
| LIFE-04 Deployment + ongoing monitoring | Para 36, 37 | A.6.2.5 | partial |
| LIFE-04 Deployment + ongoing monitoring | Para 36, 37 | A.6.2.6 | partial |
| LIFE-05 Change management | Para 38, 39, 40, 41, 42 | A.6.2.6 | partial |
| LIFE-06 Business continuity + decommissioning | Para 43, 44 | A.6.2.6 | partial |
| INV-04 Model documentation | Para 24 | A.6.2.7 | partial |
| INV-04 Model documentation | Para 24 | A.8.2 | partial |
| AIR-01 AI scope, autonomy, supply chain | Para 49, 50, 51, 52, 53 | A.5.2 | partial |
| AIR-05 Explainability thresholds + behavioural risk | Para 54 | A.6.2.4 | partial |
| AISEC-01 AI deployment security baseline | Para 58 | A.6.2.8 | partial |
| HO-01 Human oversight + kill switch | Para 60 | A.9.2 | partial |
| HO-02 Human factors | Para 61, 62, 63 | A.9.2 | partial |
| TPM-01 Third-party accountability + validation | Para 45, 46, 47, 48 | A.10.3 | partial |
| CONS-01 Consumer protection | Para 25 | A.10.4 | partial |

### Deltas — ISO/IEC 42001 obligations not covered by the core

| ISO/IEC 42001 | Title |
| --- | --- |
| A.2.3 | Alignment of AI policy with other organizational policies |
| A.5.4 | Assessing AI system impact on individuals and groups |
| A.5.5 | Assessing societal impacts of AI systems |
| A.7.5 | Data provenance |
| A.8.4 | Communication of incidents |
