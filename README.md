<div align="center">

# Prahari

**An open-source reference implementation for operationalizing the RBI Draft Guidance on Model Risk Management (2026).**

*From regulation to operational controls, evidence and governance — for AI, ML and analytical models.*

[Control mapping](docs/rbi-mrm-2026-control-mapping.md) · [MRM toolkit](packages/mrm) · [Tiering engine](packages/rbi-tiering) · [Disclaimer](DISCLAIMER.md) · Apache-2.0

</div>

> ⚠️ **Not legal advice. Not an RBI publication. No guarantee of compliance.** Prahari is tooling to help you operationalize *your* Model Risk Management Framework; your organization remains accountable for its models (RBI Para 8). It is *aligned with* the RBI Draft Guidance — it does not certify compliance. Read [DISCLAIMER.md](DISCLAIMER.md).

> *Prahari* (प्रहरी) — Hindi for *sentinel / guard*.

---

## The idea

The hard part of model-risk compliance is not storing a list of models — plenty of tools do that. It is connecting the **regulation** to a **concrete control**, the evidence that proves it, and an audit trail an examiner can read.

```
   Regulation  (every RBI paragraph)
        ↓
   Control     (a concrete, implementable check)
        ↓
   Evidence    (captured from your own inventory)
        ↓
   Audit       (examiner / board-ready report)
```

Prahari's hero artifact is the **[paragraph-by-paragraph control mapping](docs/rbi-mrm-2026-control-mapping.md)** — every clause of the RBI Draft Guidance (Para 1–64) mapped to a control, with its status and where it lives in the tooling. The software is the part that *executes* that mapping.

## Who is this for

- Banks, NBFCs, Urban/Rural Co-operative Banks, AIFIs, ARCs, CICs (the RBI-regulated entities)
- Model-risk officers, model validators, internal auditors
- AI / model governance teams and RegTech vendors
- Students and researchers studying model-risk regulation

## What's here

Two original, dependency-light packages:

| Package | What it does |
| --- | --- |
| **[@prahari/mrm](packages/mrm)** | Toolkit + `prahari` CLI: model inventory, auto risk-tiering, compliance checks, examiner-ready report. Local-first (a JSON file). |
| **[@prahari/rbi-tiering](packages/rbi-tiering)** | Pure tiering engine: composite non-offsetting tier (Para 17–20, 52), tier→controls (Para 18), review cadence (Para 17), 10-year retention (Para 23), validation SLA (Para 33). |

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

## Scope (today)

Govern the lifecycle of AI, ML and analytical models — inventory, tiering, validation timing, approvals routing and evidence — aligned with the RBI Draft Guidance: model definition incl. spreadsheets (Para 7(3)), accountability (Para 8), inventory + required fields (Para 21–22), 10-year retention (Para 23), validator independence / three lines of defence (Para 7(8), 15), non-offsetting risk tiering (Para 17–20), AI autonomy factor (Para 52), tier→controls incl. RMCB for high risk (Para 18), annual review (Para 17), validation-report SLA (Para 33), examiner/board report (Para 12).

## Roadmap

- Deeper control documentation per paragraph (intent → expected controls → evidence → example).
- Beyond RBI: a shared control core mappable to NIST AI RMF, ISO 42001, EU AI Act, SR 11-7, MAS FEAT, OSFI.
- `update` / CSV import / HTML-PDF report; optional API.

## Principles

- **Local-first & self-hostable.** Your model data never leaves your environment.
- **The RE stays accountable.** Prahari produces evidence and checks; it never claims your compliance for you (Para 8).
- **Faithful to the text.** Every control cites its RBI paragraph.

## License

[Apache-2.0](LICENSE). See [NOTICE](NOTICE) and [DISCLAIMER.md](DISCLAIMER.md).
