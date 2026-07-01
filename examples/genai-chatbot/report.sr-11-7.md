# Model Risk Management Report — Demo Bank — GenAI

_Generated 2026-07-01T03:59:33.348Z · RBI MRM 2026 (draft) · Prahari_

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


## 5. Framework view — SR 11-7 (alignment, not compliance)

> This maps your RBI control set to SR 11-7. It is **not** a SR 11-7 compliance attestation; the deltas below are not covered by the Prahari core.

| Prahari Control Core | RBI | SR 11-7 | Relationship |
| --- | --- | --- | --- |
| LIFE-01 Pre-development discipline | Para 26, 27, 28 | III | partial |
| LIFE-05 Change management | Para 38, 39, 40, 41, 42 | III | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | IV.1 | partial |
| LIFE-02 Independent validation | Para 29, 30, 31, 32, 33 | IV.3 | partial |
| LIFE-04 Deployment + ongoing monitoring | Para 36, 37 | IV.2 | partial |
| GOV-01 Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | V.1 | partial |
| GOV-00 RE accountability | Para 8 | V.1 | partial |
| LIFE-03 Approval authority + exceptions | Para 34, 35 | V.1 | partial |
| TIER-01 Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | V.2 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | V.3 | partial |
| GOV-02 Enterprise risk + three lines of defence | Para 14, 15, 16 | V.4 | partial |
| TPM-01 Third-party accountability + validation | Para 45, 46, 47, 48 | V.5 | partial |
| INV-04 Model documentation | Para 24 | V.6 | partial |
| INV-01 Complete model inventory | Para 21, 22 | V.7 | partial |

### Deltas — SR 11-7 obligations not covered by the core

| SR 11-7 | Title |
| --- | --- |
| II | Sources of model risk and the culture of effective challenge |
| VI | Supervisory review of model risk management |
