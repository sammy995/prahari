<div align="center">

# Prahari

**Open, local-first tooling for RBI Model Risk Management (2026).**

*Inventory every model, risk-tier it the way RBI asks, check compliance, and generate an examiner-ready report — from one command line, with your data staying on your machine.*

[MRM toolkit](packages/mrm) · [Tiering engine](packages/rbi-tiering) · [Disclaimer](DISCLAIMER.md) · Apache-2.0

</div>

> ⚠️ **Not legal advice. Not an RBI publication. No guarantee of compliance.** Prahari is tooling to help you operationalize *your* Model Risk Management Framework; your organization remains accountable for its models (RBI Para 8). Read [DISCLAIMER.md](DISCLAIMER.md).

> *Prahari* (प्रहरी) — Hindi for *sentinel / guard*.

---

## Why

On **June 24, 2026**, the RBI issued its draft *Guidance on Regulatory Principles for Model Risk Management* (Public Consultation C2R/2026-27/487, comments open until **2026-07-24**). It places a model-risk obligation on nearly every Indian financial institution, over **every model** — from a credit-scoring spreadsheet (Para 7(3)) to a frontier LLM agent.

Most institutions track this in Word and Excel. Prahari is a small, open, self-hostable tool that does the mechanical parts correctly so a model-risk team can spend its time on judgment, not formatting.

## What's here

This repository contains two original, dependency-light packages:

| Package | What it does |
| --- | --- |
| **[@prahari/mrm](packages/mrm)** | The toolkit + `prahari` CLI: model inventory, auto risk-tiering, compliance checks, examiner-ready report. Local-first (a JSON file). |
| **[@prahari/rbi-tiering](packages/rbi-tiering)** | Pure risk-tiering engine: composite non-offsetting tier (Para 17–20, 52), tier→controls (Para 18), review cadence (Para 17), 10-year retention (Para 23), validation SLA (Para 33). |

## Quick start

```bash
npm install
npm run build
node packages/mrm/dist/cli.js init
node packages/mrm/dist/cli.js add --name "Loan Pricing Sheet" --type spreadsheet \
  --use "Derive lending rate" --owner eve --developer frank --validator grace --approver heidi \
  --materiality 3 --complexity 1 --active
node packages/mrm/dist/cli.js report --org "Acme Bank"
```

## RBI coverage (today)

Model definition incl. spreadsheets (Para 7(3)) · accountability (Para 8) · model inventory + required fields (Para 21–22) · 10-year retention (Para 23) · validator independence / three lines of defence (Para 7(8), 15) · risk-based non-offsetting tiering (Para 17–20) · AI autonomy factor (Para 52) · tier→controls incl. RMCB for high risk (Para 18) · annual tier review (Para 17) · validation-report SLA to RMCB (Para 33) · examiner/board report (Para 12).

## Principles

- **Local-first & self-hostable.** Your model data never leaves your environment.
- **The RE stays accountable.** Prahari produces evidence and checks; it never claims your compliance for you (Para 8).
- **Faithful to the text.** Every rule cites its RBI paragraph.

## Develop

```bash
npm test         # all package tests
npm run build    # build both packages
```

## License

[Apache-2.0](LICENSE). See [NOTICE](NOTICE) and [DISCLAIMER.md](DISCLAIMER.md).
