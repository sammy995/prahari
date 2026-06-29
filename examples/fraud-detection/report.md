# Model Risk Management Report — Demo Bank — Fraud Detection

_Generated 2026-06-29T18:43:42.950Z · RBI MRM 2026 (draft) · Prahari_

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable for its models (RBI Para 8).

## 1. Inventory overview (Para 21–22)

- Total models: **4**
- Live (active / under development): **4**
- By lifecycle: active=4
- By risk tier: high=2, medium=2
- By type: ml=3, statistical=1

## 2. Compliance findings (Para 12, 17, 23, 33)

- Critical: **1** · Warning: **0** · Info: **0**

| Severity | Code | RBI ref | Model | Finding |
| --- | --- | --- | --- | --- |
| CRITICAL | VALIDATION_REPORT_OVERDUE | Para 33 | Real-time Transaction Fraud Model | Validation report not placed before the RMCB within three months. |


## 3. Model register (Para 22)

| Model | Type | Tier | Lifecycle | Third-party | Owner | Validator |
| --- | --- | --- | --- | --- | --- | --- |
| Real-time Transaction Fraud Model | ml | high | active | no | fraudhead | airisk |
| AML Transaction Monitoring | ml | high | active | no | aml | vteam |
| Device Risk Score (vendor) | ml | medium | active | yes | fraudhead | airisk |
| Chargeback Predictor | statistical | medium | active | no | ops | vteam2 |

## 4. Attestation

This report is generated from the RE's own model inventory. High-risk models require RMCB approval (Para 18); validation reports are due to the RMCB within three months of completion (Para 33); decommissioned models are retained for at least ten years (Para 23).
