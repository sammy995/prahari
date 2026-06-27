# Para 21–22 — Model inventory and minimum fields

[← Control reference](README.md) · RBI MRM 2026, Chapter III-B

## Verbatim

> **21.** Maintain an accurate, comprehensive, up-to-date inventory of all **active, inactive (incl. under development), and decommissioned** models … "no model is used, relied upon, or deployed unless it is part of inventory."
> **22.** The inventory, at minimum, should include: model owners, developers, validators, approvers; risk tier; intended use; upstream/downstream dependencies; and key observations from validation, monitoring and audit.

## Intent

The inventory is the backbone of the whole framework and an enforcement gate: if it is not in the inventory, it must not be in production. It must also span the full lifecycle (including decommissioned models, for retention — [Para 23](para-23-retention.md)) and capture inter-dependencies so enterprise-wide risk is visible.

## Expected controls

- A single canonical register holding **all** lifecycle states.
- Required-field validation on intake (Para 22): the four roles, intended use, tier, dependencies.
- An "inventoried?" gate that production/deployment checks before a model is used (Para 21).
- Dependency links (upstream/downstream) between models.

## Evidence required

- The register itself, with the Para 22 fields populated for every model.
- A demonstrable gate: deployment of a non-inventoried model is blocked/flagged.
- Dependency graph or links between related models.

## Example (Prahari)

Required fields are enforced at add time; missing fields are rejected with the citation:

```ts
import { emptyInventory, addModel, isRegistered } from '@prahari/mrm';

const inv = emptyInventory();
addModel(inv, {
  name: 'Retail Scorecard', type: 'ml', intendedUse: 'Score applicants',
  roles: { owner: 'a', developer: 'b', validator: 'c', approver: 'd' },
  dependencies: [], // upstream/downstream ids (Para 22)
});
// throws MrmValidationError "Missing required inventory fields (RBI Para 22): ..." if any role/use is absent

isRegistered(inv, id); // the Para 21 gate: only inventoried models may be used
```

## Common mistakes

- **A partial inventory.** Excluding EUC/spreadsheets or third-party models breaks Para 21's "all models".
- **No enforcement.** A list nobody checks is not a gate — wire `isRegistered` into deployment.
- **Dropping decommissioned models.** They must stay (Para 23), not be deleted.
- **Skipping dependencies.** Without upstream/downstream links you cannot see enterprise-wide or cascading risk.
