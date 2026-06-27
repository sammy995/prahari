# Para 17–20 — Risk-based, non-offsetting model tiering

[← Control reference](README.md) · RBI MRM 2026, Chapter III-A

## Verbatim

> **17.** Establish … a risk-based model tiering structure … Review the risk tier of all models at least annually, or earlier … in response to specific triggers.
> **18.** The risk tier … should guide validation prioritisation/intensity/frequency; approval structure (high risk → RMCB); risk mitigation; monitoring scope; inventory/documentation detail; business continuity.
> **19.** Tiering should be based on **materiality**, **complexity**, and **other relevant factors** (e.g. regulatory/supervisory).
> **20.** The integration of factors **shall not result in one factor offsetting or diluting the other** … a low complexity should not disproportionately reduce the tier of a highly material model.

## Intent

Drive *proportionate* governance from a single, defensible risk score — and prevent gaming. Para 20 is the subtle, important rule: you cannot average a high-materiality model down to "medium" because it happens to be simple. Risk drivers escalate; they don't cancel.

## Expected controls

- A tiering function over **materiality** and **complexity** (plus, for AI, **autonomy/reliance** — [Para 52]) that takes the **maximum**, never the average (Para 20).
- "Other factors" (regulatory concern, consumer impact) that can **only raise** the tier.
- A tier → controls map: high → RMCB approval, tighter validation cadence, enhanced monitoring, comprehensive docs (Para 18).
- An annual (or trigger-based) re-tier (Para 17).

## Evidence required

- For each model: its tier, the factor inputs, and a **rationale** string.
- Evidence that high-tier models went to the RMCB (Para 18(ii)).
- A re-tier history showing the annual cadence was met.

## Example (Prahari)

`@prahari/rbi-tiering` implements the non-offsetting rule directly:

```ts
import { computeTier, tierToControls } from '@prahari/rbi-tiering';

computeTier({ materiality: 3, complexity: 1 }).tier;        // 'high'  (NOT averaged down — Para 20)
computeTier({ materiality: 1, complexity: 1, isAi: true, autonomy: 3 }).tier; // 'high' (Para 52)

tierToControls('high');
// { approver: 'rmcb', validationFrequencyMonths: 6, monitoring: 'enhanced', documentation: 'comprehensive' }
```

The core is a `Math.max` over drivers, with "other factors" applied as one-way bumps — see [`packages/rbi-tiering`](../../packages/rbi-tiering).

## Common mistakes

- **Averaging factors.** A weighted average lets low complexity dilute high materiality — the exact thing Para 20 forbids.
- **Letting "other factors" lower a tier.** They escalate only.
- **Tiering once and forgetting.** Para 17 requires at least annual review and re-tier on triggers (e.g. material change, incident).
- **Ignoring autonomy for AI.** Para 52 adds reliance/autonomy as a driver for AI models.
