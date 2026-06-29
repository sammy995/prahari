# Model Risk Management Report — Demo Bank — Credit Scoring

_Generated 2026-06-29T18:43:19.745Z · RBI MRM 2026 (draft) · Prahari_

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable for its models (RBI Para 8).

## 1. Inventory overview (Para 21–22)

- Total models: **4**
- Live (active / under development): **4**
- By lifecycle: active=4
- By risk tier: high=3, medium=1
- By type: ml=3, statistical=1

## 2. Compliance findings (Para 12, 17, 23, 33)

- Critical: **0** · Warning: **1** · Info: **0**

| Severity | Code | RBI ref | Model | Finding |
| --- | --- | --- | --- | --- |
| WARNING | REVIEW_DUE | Para 17 | Behavioural Scorecard | Risk-tier review is overdue (annual cadence exceeded). |


## 3. Model register (Para 22)

| Model | Type | Tier | Lifecycle | Third-party | Owner | Validator |
| --- | --- | --- | --- | --- | --- | --- |
| Application Credit Scorecard | ml | high | active | no | priya | vteam |
| Behavioural Scorecard | ml | high | active | no | priya | vteam |
| Bureau Score (vendor) | ml | high | active | yes | priya | vteam |
| Collections Propensity | statistical | medium | active | no | ops | vteam2 |

## 4. Attestation

This report is generated from the RE's own model inventory. High-risk models require RMCB approval (Para 18); validation reports are due to the RMCB within three months of completion (Para 33); decommissioned models are retained for at least ten years (Para 23).
