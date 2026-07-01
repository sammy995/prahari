# Crosswalk — EU AI Act

[← Crosswalk](README.md) · Generated from `@prahari/crosswalk` — do not edit by hand.

> Not legal advice; not a Regulation (EU) 2024/1689 or RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts.

Implementing the Prahari Control Core covers the **shared backbone** of EU AI Act. It does **not** make you "EU AI Act compliant"; the deltas below are obligations the core does not cover.

**Coverage:** 12 EU AI Act clauses mapped · 3 deltas · 22 core controls.

## Core control → EU AI Act

| Prahari Control Core | RBI | EU AI Act | Relationship | Notes |
| --- | --- | --- | --- | --- |
| `TIER-01` Risk-based non-offsetting tiering | Para 17, 18, 19, 20 | Art. 9 — Risk management system | partial | Risk management system ≈ risk-based tiering; EU requires a continuous, documented RMS. |
| `LIFE-02` Independent validation | Para 29, 30, 31, 32, 33 | Art. 9 — Risk management system | partial | Testing within the risk-management system. |
| `LIFE-01` Pre-development discipline | Para 26, 27, 28 | Art. 10 — Data and data governance | partial | Data and data governance (quality, bias examination). |
| `INV-04` Model documentation | Para 24 | Art. 11 — Technical documentation | partial | Technical documentation (Annex IV) ≈ model documentation. |
| `AISEC-01` AI deployment security baseline | Para 58 | Art. 12 — Record-keeping (logging) | partial | Automatic record-keeping / logging. |
| `CONS-01` Consumer protection | Para 25 | Art. 13 — Transparency and provision of information to deployers | partial | Transparency and information to deployers/users. |
| `HO-01` Human oversight + kill switch | Para 60 | Art. 14 — Human oversight | partial | Human oversight incl. the ability to intervene/stop; RBI mandates a kill switch. |
| `AIR-05` Explainability thresholds + behavioural risk | Para 54 | Art. 15 — Accuracy, robustness and cybersecurity | partial | Accuracy, robustness and cybersecurity; RBI adds explicit explainability thresholds. |
| `GOV-01` Board-approved MRMF + RMCB | Para 9, 10, 11, 12, 13 | Art. 17 — Quality management system | partial | Quality management system ≈ board-approved MRMF. |
| `GOV-02` Enterprise risk + three lines of defence | Para 14, 15, 16 | Art. 17 — Quality management system | partial | QMS roles/accountability ≈ three lines of defence. |
| `TPM-01` Third-party accountability + validation | Para 45, 46, 47, 48 | Art. 26 — Obligations of deployers of high-risk AI systems | partial | Deployer obligations ≈ RE accountability for third-party models. |
| `AISEC-02` Customer-facing AI controls | Para 59 | Art. 50 — Transparency obligations (e.g. disclose AI interaction) | partial | Disclosure of AI interaction on customer-facing systems. |
| `LIFE-04` Deployment + ongoing monitoring | Para 36, 37 | Art. 72 — Post-market monitoring | partial | Post-market monitoring ≈ ongoing monitoring of deployed models. |
| `HO-02` Human factors | Para 61, 62, 63 | Art. 73 — Reporting of serious incidents | partial | Serious-incident reporting ≈ incident/near-miss review. |

## Deltas — EU AI Act obligations not covered by the core

| EU AI Act | Title | Status |
| --- | --- | --- |
| Art. 43 | Conformity assessment | _No Prahari core control — assess separately._ |
| Art. 48 | CE marking of conformity | _No Prahari core control — assess separately._ |
| Art. 49 | Registration in the EU database | _No Prahari core control — assess separately._ |

---

*Cite as:* **Prahari Crosswalk — EU AI Act** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026) and Regulation (EU) 2024/1689; re-verify against source texts.
