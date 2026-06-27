# Para 7(3) — What counts as a "model"

[← Control reference](README.md) · RBI MRM 2026, Definitions

## Verbatim

> "'Model' means a system … that incorporates data, applies … assumptions (input component), uses statistical, mathematical, economic, financial, or such other cognitive techniques (including … AI / ML) … (processing component) and produce results that are used for business or any other operations and decision making (output component). It includes algorithms, analytics, interfaces, applications, decision-based rules, and other computational tools which, by virtue of their use, have a material impact on decision-making … irrespective of whether such tools are recognised as models by the RE."
>
> *Illustration* — a spreadsheet-based loan-pricing calculator becomes a model once its output (a lending rate/price) affects business decisions.

## Intent

Stop "it's just a spreadsheet / a rule / a vendor API" from being an escape hatch. Scope is defined by **function** (input → processing → output that drives a decision), not by the technology or by whether the RE calls it a model. This deliberately sweeps in End-User Computing (EUC) tools, deterministic rule engines, and third-party black boxes.

## Expected controls

- A model **type taxonomy** broad enough to capture non-ML tools: spreadsheets, rule-based engines, statistical models, ML, GenAI.
- An intake question that classifies by *use* ("does its output affect a business/customer decision?"), not by build technology.
- Proportionality: low-materiality EUC tools are inventoried but governed lightly (tie depth to risk tier — see [Para 17–20](para-17-20-risk-tiering.md)).

## Evidence required

- The model register shows a **type** for every model, including non-software/EUC tools.
- A documented definition/decision rule for "is this a model?" with examples.

## Example (Prahari)

A spreadsheet that drives lending rates is a first-class model:

```bash
prahari add --name "Loan Pricing Sheet" --type spreadsheet \
  --use "Derive lending rate from borrower attributes" \
  --owner eve --developer frank --validator grace --approver heidi \
  --materiality 3 --complexity 1 --active
```

The `ModelType` enum encodes the breadth:

```ts
export enum ModelType {
  Spreadsheet = 'spreadsheet', RuleBased = 'rule_based',
  Statistical = 'statistical', Ml = 'ml', GenAi = 'genai',
}
```

## Common mistakes

- **Treating EUC spreadsheets as out of scope.** The illustration explicitly brings them in.
- **Classifying by technology, not use.** A simple rule engine that denies credit is in scope; a complex ML model used only for internal dashboards may be lower-tier.
- **Over-inventorying at full depth.** Capture everything, but make documentation/validation depth proportionate to tier — otherwise the framework collapses under EUC volume.
