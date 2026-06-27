# @prahari/mrm

**Local-first RBI Model Risk Management toolkit** — a model inventory, risk-tiering, compliance checks, and an examiner-ready report, in one command-line tool. No server, no cloud: your inventory is a single JSON file that stays with you (self-hosted, data-resident).

Implements core obligations of RBI's draft *Guidance on Regulatory Principles for Model Risk Management, 2026*: model inventory (Para 21–24), the broad model definition incl. spreadsheets (Para 7(3)), validator independence / three lines of defence (Para 7(8), 15), risk-based non-offsetting tiering (Para 17–20, via `@prahari/rbi-tiering`), annual review (Para 17), validation-report SLA (Para 33), and 10-year retention (Para 23).

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable (Para 8). See repository `DISCLAIMER.md`.

## Install

```bash
npm install -g @prahari/mrm   # or run via npx
```

## CLI

```bash
prahari init

# A spreadsheet that drives lending rates IS a model (Para 7(3)).
prahari add --name "Loan Pricing Sheet" --type spreadsheet \
  --use "Derive lending rate" \
  --owner eve --developer frank --validator grace --approver heidi \
  --materiality 3 --complexity 1 --active

prahari list      # tier  lifecycle  type  name  (id)
prahari check     # RBI compliance findings (exit 1 on any critical)
prahari report --org "Acme Bank" --out mrm-report.md
```

Validator independence is enforced — a validator who is also the developer or owner is rejected (Para 7(8)/15). A highly material model stays high-tier even when simple (non-offsetting rule, Para 20).

## Library

```ts
import { emptyInventory, addModel, runChecks, renderReport } from '@prahari/mrm';

const inv = emptyInventory();
addModel(inv, {
  name: 'AML Alert Triage', type: 'genai', intendedUse: 'Triage AML alerts',
  roles: { owner: 'a', developer: 'b', validator: 'c', approver: 'd' },
  tieringInputs: { materiality: 3, complexity: 2, autonomy: 3 },
});
const findings = runChecks(inv);
const markdown = renderReport(inv, { organisation: 'Acme Bank' });
```

## Storage

The inventory lives at `.prahari/inventory.json` (override with `--file`). It is plain JSON — diff it, commit it to your own private repo, or back it up like any record.
