# Para 14–16 — Enterprise-wide model risk and three lines of defence

[← Control reference](README.md) · RBI MRM 2026, Chapter III

## Verbatim

> **14.** Assess model risk both at the **individual model and the enterprise-wide level**, on an ongoing basis. Where aggregate model risk **exceeds the risk appetite**, take timely action — enhanced controls, usage restriction, remediation, or decommissioning — and **report to the RMCB**.
> **15.** Operate **three lines of defence**: (1) model owners/developers, (2) independent model-risk management and validation, (3) independent internal audit.
> **16.** Conduct **ongoing performance testing** — backward- *and* forward-looking, including AI-specific evaluations and **benchmarking**.

## Intent

Model risk is not only per-model; it **aggregates**. Ten individually-acceptable models can breach the enterprise risk appetite together, or share a hidden dependency. Para 14 makes someone watch the *portfolio* and wires a breach to a defined response and an RMCB report — closing the loop with the risk appetite set in [Para 11](para-09-13-governance.md). Para 15 is the organisational guarantee of independence: the people who build models are not the people who validate them, who are not the people who audit the whole system. Para 16 keeps it honest over time — performance is tested continuously, looking back *and* forward, against benchmarks, not just at launch.

## Expected controls

- An **enterprise roll-up** of model risk (by tier, by dependency, by business line) and an **appetite-breach trigger** → action workflow + RMCB report (Para 14).
- Enforced **role separation** (owner ≠ validator) and an independent, **read-only audit** view — the three lines (Para 15, see also [Para 32](para-29-32-validation.md)).
- **Scheduled performance tests + benchmarks** captured as evidence per model, backward- and forward-looking (Para 16).
- A **dependency graph** so cascading / correlated risk is visible at the portfolio level ([Para 21–22](para-21-22-inventory.md)).

## Evidence required

- An enterprise-level risk summary and evidence that an appetite breach triggered action + an RMCB report.
- An org/role map showing the three lines are distinct and independent.
- Dated performance-test and benchmark results per model, on a recurring cadence.

## Example (Prahari) and honest scope

Prahari's [board report](../../examples) already does the **portfolio roll-up in miniature** — counts by tier, by lifecycle, by type, plus open findings — which is the raw material for an enterprise view (Para 14). The inventory's four distinct roles ([Para 21–22](para-21-22-inventory.md)) make the **first two lines** structurally separable, and an auditor reads the same inventory + findings read-only (the third line). What Prahari does **not** do today is compute an aggregate risk score against a numeric appetite or run live performance tests — the appetite decision is governance (Para 11) and performance/benchmark testing lives in the ML stack; Prahari holds their results as evidence (Para 16) and surfaces the portfolio shape.

## Common mistakes

- **Watching models one at a time.** Para 14 requires the *enterprise* view; correlated or aggregate risk is invisible model-by-model.
- **A breach with no consequence.** Exceeding appetite must trigger action *and* an RMCB report, not just a log line.
- **Blurred lines of defence.** If validators report to the model owner, the second line isn't independent (Para 15).
- **Launch-only testing.** Para 16 is *ongoing*, and explicitly forward-looking and benchmarked — not a one-time accuracy number.

---

*Cite as:* **Prahari Control Reference — Para 14-16** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
