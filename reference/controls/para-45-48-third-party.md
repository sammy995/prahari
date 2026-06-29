# Para 45–48 — Third-party models

[← Control reference](README.md) · RBI MRM 2026, Chapter V-A

## Verbatim

> **45.** The RE remains **accountable for the outcomes of any third-party model** at every stage of its lifecycle.
> **46.** The RE shall conduct its **own independent validation** regardless of any assurance given by the provider, and such models shall be subject to **enhanced RMCB oversight irrespective of their risk tier**.
> **47.** Before use, the RE shall perform **due diligence** on the provider's credibility, the methodological soundness and limitations of the model, and the suitability and quality of its data.
> **48.** The contract shall grant the RE **minimum technical documentation sufficient to validate** the model, **audit rights for the RE and its supervisor**, and continuity / exit arrangements.

## Intent

A bought model is still your model. The guidance closes the easy escape hatch — "the vendor validated it" — by stacking four requirements: accountability stays with the RE ([Para 8](para-08-accountability.md), Para 45); you must validate independently anyway (46); you must vet the provider and its data before use (47); and your contract must give you and the regulator the documentation and audit rights to actually do so (48). The recurring failure this prevents is a black-box vendor model in production that nobody at the RE can open, validate, or audit.

## Expected controls

- A **third-party flag** on each model, with a named RE owner accountable for it (Para 45).
- Independent RE validation forced for third-party models **even when vendor-certified**, and **auto-routing to the RMCB regardless of tier** (Para 46).
- A **pre-use due-diligence checklist** per vendor model: provider credibility, methodology + stated limitations, data suitability/quality (Para 47).
- Captured **contract attributes** as evidence: documentation access, audit rights (RE + supervisor), exit/continuity (Para 48).

## Evidence required

- The inventory marking which models are third-party, each with an RE owner.
- An RE validation report for every third-party model — not just the vendor's certificate.
- A completed due-diligence record per provider.
- Contract clauses (or extracts) evidencing documentation, audit rights, and exit terms.

## Example (Prahari)

The [nbfc example](../../examples/nbfc) carries a vendor model — *Income Estimation (vendor)* — flagged `thirdParty: true`. Because Para 46 demands enhanced RMCB oversight **irrespective of tier**, the validator and approver fields are still populated and it is governed exactly like an internal high-tier model. Prahari records the third-party flag, the RE owner, and the validation/oversight evidence; the due-diligence and contract attributes attach as evidence records against the model.

```jsonc
{
  "name": "Income Estimation (vendor)",
  "type": "ml",
  "thirdParty": true,            // Para 45: RE still accountable
  "roles": { "owner": "ravi", "validator": "vteam", "approver": "rmcb" }, // Para 46: RE validates + RMCB
  "intendedUse": "Estimate borrower income for underwriting"
}
```

## Common mistakes

- **Skipping independent validation** because the vendor supplied a certificate (Para 46 forbids this).
- **Tiering a vendor model down** to skip RMCB — Para 46's enhanced oversight applies *irrespective of tier*.
- **Signing a contract with no audit rights or documentation access** — then being unable to validate (Para 48).
- **No named RE owner** for the bought model, leaving accountability ambiguous (Para 45, [Para 8](para-08-accountability.md)).
- **Ignoring provider concentration / update drift** for material third-party *AI* models (Para 53) — a related, separate risk.

---

*Cite as:* **Prahari Control Reference — Para 45-48** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
