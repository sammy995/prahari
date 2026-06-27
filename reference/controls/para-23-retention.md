# Para 23 — Ten-year retention of decommissioned models

[← Control reference](README.md) · RBI MRM 2026, Chapter III-B

## Verbatim

> **23.** Decommissioned models should remain part of the inventory **for at least ten years** from the date of decommissioning **or** the date they cease to serve as backup or benchmark reference, **whichever is later**, or such longer period as required under applicable law.

## Intent

Preserve the audit trail and reproducibility of decisions a model made long after it is retired — examinations and disputes can look back years. "Whichever is later" guards the case where a retired model still acts as a fallback/benchmark.

## Expected controls

- On decommission, keep the record (do **not** delete) and stamp `decommissionedAt`.
- A retention clock = max(decommissioned, ceased-as-reference) + 10 years (configurable upward for longer legal floors).
- A guard that blocks/flags purge before the clock elapses.
- Reconciliation with data-protection erasure: retain **metadata, methodology and validation artefacts**, not necessarily underlying personal data (see "Common mistakes").

## Evidence required

- Decommissioned models still present in the inventory with `decommissionedAt`.
- A computed retention-until date per decommissioned model.
- A purge process that checks retention first.

## Example (Prahari)

```ts
import { retentionUntil, isRetentionExpired } from '@prahari/rbi-tiering';

retentionUntil({ decommissionedAt: new Date('2026-01-01') });               // 2036-01-01
retentionUntil({ decommissionedAt: new Date('2026-01-01'),
                 ceasedAsReferenceAt: new Date('2028-01-01') });            // 2038-01-01 (later wins)

isRetentionExpired({ decommissionedAt: new Date('2026-01-01'), now: new Date() }); // false until 2036
```

`prahari check` surfaces a `RETENTION_ELAPSED` finding once the clock passes.

## Common mistakes

- **Deleting on decommission.** The record must stay in the inventory for ≥10 years.
- **Counting from the wrong date.** Use the later of decommission vs ceasing as backup/benchmark.
- **Retention vs DPDP conflict.** If documentation embeds personal data, retaining it 10 years can clash with erasure/storage-limitation under the DPDP Act, 2023. Retain model metadata/methodology/validation artefacts; anonymise or segregate underlying personal data. (This is exactly the kind of point worth raising in consultation.)

---

*Cite as:* **Prahari Control Reference — Para 23** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
