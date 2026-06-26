# Disclaimer

**Prahari is an independent, open-source engineering project. It is not legal, compliance, or regulatory advice, and it is not affiliated with or endorsed by the Reserve Bank of India (RBI).**

Please read this carefully before using Prahari.

## No compliance guarantee

Prahari provides tooling — a model registry, risk-tiering engine, in-path gate, evidence ledger, approvals, and reporting — intended to help Regulated Entities (REs) *operationalize* their own Model Risk Management Framework (MRMF). **Using Prahari does not make any organization compliant with RBI's Guidance on Regulatory Principles for Model Risk Management, any other regulation, or any law.** Compliance depends on each organization's policies, governance, data, and judgment.

## The Regulated Entity remains accountable

Consistent with the RBI draft's own principle (Para 8: a Regulated Entity "is accountable for the outcomes of all models used by it"; reinforced by Para 45 for third-party models), **the deploying organization is solely responsible** for its model risk management, the correctness of its configuration of Prahari, the evidence it produces, and the outcomes of its models. The Prahari project and its contributors accept no responsibility or liability for those outcomes.

## "AS IS", no warranty

Prahari is provided under the Apache License 2.0 **"AS IS", without warranties or conditions of any kind**, express or implied, and **with no limitation of liability** beyond what that license states. See [LICENSE](LICENSE), Sections 7 and 8.

## The RBI mapping is interpretation, not the law

The control mapping in [`docs/rbi-mrm-2026-control-mapping.md`](docs/rbi-mrm-2026-control-mapping.md) is an independent interpretation of the **draft** RBI guidance (June 24, 2026), derived from the official text but not authored by RBI. The draft may change before it is finalized. **Always read the official RBI notification** and consult qualified legal and compliance professionals for your obligations.

## Security and data

Prahari is designed to be **self-hosted**, so that REs keep their own model data within their own controlled, data-resident environment. The project ships secure defaults, but **secure deployment, access control, data residency, and retention are the operator's responsibility.**

---

If any part of this disclaimer is unclear, do not use Prahari for regulated purposes until you have obtained appropriate professional advice.
