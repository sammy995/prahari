<div align="center">

# Prahari

**The open reference implementation of RBI Model Risk Management (MRM).**

*Inventory, risk-tier, gate, and prove every AI/ML model your bank runs — self-hosted, auditable, India-resident.*

[Control mapping](docs/rbi-mrm-2026-control-mapping.md) · [Disclaimer](DISCLAIMER.md) · [Contributing](CONTRIBUTING.md) · Apache-2.0

</div>

> ⚠️ **Not legal advice. Not an RBI publication. No compliance guarantee.** Prahari is tooling to help you operationalize *your* MRMF; your organization remains accountable. Read [DISCLAIMER.md](DISCLAIMER.md).

> *Prahari* (प्रहरी) — Hindi for *sentinel / guard*. Working name; subject to change.

---

## Why this exists

On **June 24, 2026**, the RBI issued its draft *Guidance on Regulatory Principles for Model Risk Management* ([official text](https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=5089), comments open until **2026-07-24**). It places a Model Risk Management obligation on nearly every Indian financial institution — banks, SFBs, payments banks, co-operative banks, NBFCs, AIFIs, ARCs, CICs — covering **every model**, from a credit-scoring spreadsheet to a frontier LLM agent.

The mandate is concrete and demanding: a board-approved framework, a complete model inventory ("no model used unless inventoried"), risk tiering, independent validation, **kill switches** and human oversight for AI, explainability thresholds, immutable audit evidence, and 10-year retention.

Most institutions manage this today in Word, Excel, and tribal knowledge. Commercial tools exist (ValidMind, Credo AI, Monitaur…) but are closed, foreign-regulator-shaped, and not built for Indian core-banking or data-residency.

**Prahari is the open, India-native, self-hostable answer** — and an open, paragraph-by-paragraph map of the regulation to working controls.

## What Prahari does (mapped to the regulation)

| Capability | RBI principle | Status |
|---|---|---|
| **Model registry** — all models (incl. spreadsheets, ML, GenAI), lifecycle states, dependencies | Para 21–24 inventory | Building |
| **Risk-tiering engine** — composite materiality × complexity × autonomy; non-offsetting | Para 17–20, 52 | Building |
| **In-path gate + kill switch** — observe / constrain / block GenAI calls in real time, with override | Para 60 human oversight | Reuse (engine exists) |
| **Immutable evidence ledger** — WORM, hash-chained audit of every decision | Para 21–24, 57 | Reuse |
| **Approvals & exceptions** — dual-approval, separation of duties, RMCB routing for high-risk | Para 12, 18, 34–35 | Reuse |
| **Explainability thresholds** — per-model threshold + compensating controls on breach | Para 54(1) | Building |
| **Third-party due diligence** — accountability, audit rights, validation regardless of vendor | Para 45–48 | Building |
| **Examiner / board reports** — generated from real captured evidence | Para 12, 33 | Building |
| **Core-banking connector spec** — adapter interface for Finacle/BaNCS/FLEXCUBE (community-contributable) | Para 21 inventory | Spec + reference adapter |

The full mapping — every RBI paragraph → control ID → required behaviour — lives in
**[`docs/rbi-mrm-2026-control-mapping.md`](docs/rbi-mrm-2026-control-mapping.md)**. Corrections against the official RBI text are the most valuable contributions.

## Principles

- **Open & self-hostable.** Your model data stays in your environment. Auditable by design.
- **The RE stays accountable.** Prahari produces evidence and controls; it never claims your compliance for you (matching RBI Para 45).
- **Secure by default.** Deny-by-default access, immutable audit, secrets hygiene — inherited by every self-hoster.
- **One inventory, all models.** Spreadsheets to frontier models, under one tiering and evidence model.

## Status

Early. The control mapping is published first (the reference artifact). The platform is being built by forking and re-aiming a working governance engine (gate + WORM ledger + approvals + evidence). See the design specs in [`docs/superpowers/specs/`](docs/superpowers/specs/).

## Roadmap (short)

1. **Control mapping v1** ✅ (this repo) — the citeable reference.
2. **Reference implementation** — registry + tiering + gate + evidence + report, self-hostable.
3. **Connector spec + mock adapter** — so banks/vendors contribute real Finacle/BaNCS adapters.
4. **Hardening for self-hosters** — RLS policies, data-residency guidance, retention enforcement.

## Contributing

This project gets better the more practitioners — model-risk officers, validators, RegTech consultants, bank engineers — shape it. Start with [CONTRIBUTING.md](CONTRIBUTING.md). The highest-value PRs right now: **corrections to the control mapping against the official RBI text.**

## License

[Apache-2.0](LICENSE). See [NOTICE](NOTICE) and [DISCLAIMER.md](DISCLAIMER.md).
