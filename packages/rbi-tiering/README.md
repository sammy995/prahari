# @prahari/rbi-tiering

Pure, dependency-free risk-based model tiering for **RBI Model Risk Management (2026)**.

Implements the composite, **non-offsetting** tier (Para 17-20), the AI autonomy factor (Para 52), the tier-to-controls bundle (Para 18), annual/trigger review timing (Para 17), the **10-year decommissioned-model retention clock** (Para 23), and the **3-month validation-report SLA** to the RMCB (Para 33).

```ts
import { computeTier, tierToControls, isReviewDue } from '@prahari/rbi-tiering';

const { tier, rationale } = computeTier({ materiality: 3, complexity: 1, isAi: true, autonomy: 2 });
// tier === 'high' — a highly material model stays high even if simple (Para 20)

const controls = tierToControls(tier);
// { approver: 'rmcb', validationFrequencyMonths: 6, monitoring: 'enhanced', documentation: 'comprehensive' }

isReviewDue({ lastReviewedAt: new Date('2025-01-01'), now: new Date() }); // true after ~12 months
```

> Not legal advice; thresholds are configurable defaults. See the repository `DISCLAIMER.md`.
