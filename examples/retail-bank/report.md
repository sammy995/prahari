# Model Risk Management Report — Demo Retail Bank

_Generated 2026-06-27T13:44:00.592Z · RBI MRM 2026 (draft) · Prahari_

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable for its models (RBI Para 8).

## 1. Inventory overview (Para 21–22)

- Total models: **4**
- Live (active / under development): **4**
- By lifecycle: active=4
- By risk tier: high=3
- By type: ml=1, spreadsheet=1, genai=1, statistical=1

## 2. Compliance findings (Para 12, 17, 23, 33)

- Critical: **1** · Warning: **1** · Info: **0**

| Severity | Code | RBI ref | Model | Finding |
| --- | --- | --- | --- | --- |
| CRITICAL | VALIDATION_REPORT_OVERDUE | Para 33 | Retail Credit Scorecard | Validation report not placed before the RMCB within three months. |
| WARNING | UNTIERED | Para 17, 21 | Branch Footfall Forecaster | Live model has no risk tier assigned. |


## 3. Model register (Para 22)

| Model | Type | Tier | Lifecycle | Third-party | Owner | Validator |
| --- | --- | --- | --- | --- | --- | --- |
| Retail Credit Scorecard | ml | high | active | no | priya | meena |
| Loan Pricing Sheet | spreadsheet | high | active | no | eve | grace |
| AML Alert Triage Assistant | genai | high | active | no | sara | val1 |
| Branch Footfall Forecaster | statistical | — | active | no | ops | val2 |

## 4. Attestation

This report is generated from the RE's own model inventory. High-risk models require RMCB approval (Para 18); validation reports are due to the RMCB within three months of completion (Para 33); decommissioned models are retained for at least ten years (Para 23).
