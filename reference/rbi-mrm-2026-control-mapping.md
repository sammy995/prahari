# RBI MRM 2026 → Controls Mapping (Open Reference)

**An open, paragraph-by-paragraph mapping of RBI's draft *Guidance on Regulatory Principles for Model Risk Management* (2026) to concrete, implementable controls.**

- **Source (official):** RBI Press Release, June 24, 2026 — *"RBI issues draft 'Guidance on Regulatory Principles for Model Risk Management'"* ([PR PDF](https://rbidocs.rbi.org.in/rdocs/PressRelease/PDFs/PR528C19BBE2D14B248E1A0D8CFCF6B210BDF.PDF)) · Draft text: [rbi.org.in Id=5089](https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=5089)
- **Comment window:** open until **2026-07-24** (Connect 2 Regulate / dor.mrmfeedback@rbi.org.in).
- **Status of this doc:** community reference, v0.1, derived from the *draft*. Paragraph numbers cite the draft; re-verify against the final notification when issued.

> ⚠️ **DISCLAIMER.** This is an independent open-source interpretation for engineering purposes. It is **not legal advice** and **not an RBI publication**. It makes **no guarantee of regulatory compliance**. Each Regulated Entity (RE) remains solely accountable for its own compliance (consistent with the draft's own Para 45 third-party-accountability principle). Verify every mapping against the official RBI text.

---

## How to read this

Each row maps an RBI obligation → a **Control ID** → what a system must do → **implementation status** in this project (reuse from the sibling `agentguard` engine, or new build).

- **Reuse** = an organ already exists in agentguard (fork basis).
- **Extend** = exists but needs RBI-shaping.
- **New** = net-new for this project.

Control ID prefixes: `GOV` governance · `TIER` tiering · `INV` inventory/docs · `LIFE` lifecycle (dev/val/approval/deploy/change/BCP) · `TPM` third-party · `AIR` AI/ML risk · `AISEC` AI deployment security · `HO` human oversight · `CONS` consumer.

## Scope & definitions (Para 4, 7)

- **Applies to (Para 4):** Commercial/SF/Payments/Local-Area/Regional-Rural banks, Urban & Rural Co-op banks, NBFCs (all layers), AIFIs (EXIM, NABARD, NaBFID, NHB, SIDBI), ARCs, CICs.
- **"Model" (Para 7(3)):** any system using data + statistical/mathematical/economic/financial/cognitive techniques to produce outputs for decisions — *including* algorithms, analytics, interfaces, applications, decision rules. **Even a spreadsheet loan-pricing tool qualifies if its output affects lending.** → registry must accept non-ML/non-software "models".
- **"Model Risk" (Para 7(7)):** errors (mis-specification, bad params, flawed hypotheses, data, weak controls) + misapplication + time-suitability.
- **Roles (Para 7(4)–(8)):** Owner, Developer, Validator (independent of dev/ownership/use), Approver. → registry needs these four role fields per model; SoD enforced.
- **Other definitions:** *Decommissioning* (7(1)) = retiring a model from active use → lifecycle state. *Explainability* (7(2)) = "property of a model to express important factors influencing its results, in a way that is understandable" → grounds the explainability-threshold controls.
- **Scope rule (Para 6):** apply to **all** models — internal, third-party, or combination.

---

## Chapter II — Governance

| RBI ¶ | Obligation (paraphrased) | Control ID | What the system must do | Status |
|---|---|---|---|---|
| **8** | **RE is accountable for outcomes of ALL models** (internal / third-party / combination) — general accountability principle | `GOV-00` | Per-model accountable-owner (RE) attestation; never assert the *tool* is accountable (anchors the project's disclaimer) | Extend (ownership + `sign_offs`) |
| 9–10 | Board-approved MRMF covering taxonomy, governance, tiering method, inventory/doc standards, and policies across the lifecycle | `GOV-01` | Hold a versioned, board-approved MRMF config; bind all controls to it; track approval + periodic review | Extend (`policy_versions`, `sign_offs`) |
| 11 | Board approves & reviews MRMF, risk appetite/tolerance (scenario/stress-informed), tiering policy | `GOV-02` | Record board approvals + risk-appetite thresholds; periodic-review reminders | Extend (`approvals`, `sign_offs`) |
| 12 | RMCB reviews high-risk validation reports & approves deployment; reviews tiering ≥ annually; oversees exception/third-party/AI models; reviews breach reports | `GOV-03` | RMCB approval queue scoped to high-tier; annual tiering-review workflow; breach/exception dashboards | Extend (`approval_requests` + new review workflows) |
| 13 | Senior mgmt operationalizes: resources, tiering, inventory upkeep, policy review, RMCB reporting | `GOV-04` | Role assignment + ownership; inventory upkeep tasks; RMCB report generation | Extend / New (report gen) |

## Chapter III — Enterprise-wide model risk

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 14 | Assess model risk at individual **and enterprise-wide** level, ongoing; if risk > appetite → timely action (enhanced controls / restriction / remediation / decommission) + report to RMCB | `ERM-01` | Enterprise risk roll-up + appetite-breach trigger → action workflow + RMCB report | **New** |
| 15 | Three lines of defence: owners / independent MRM+validation / independent internal audit | `ERM-02` | Enforce role separation (owner ≠ validator); audit read-only role | Extend (RLS roles + SoD) |
| 16 | Ongoing performance testing — backward- + forward-looking, AI-specific evaluations, benchmarking | `ERM-03` | Scheduled performance-test + benchmark evidence capture per model | Extend (`evidence`) |

## Chapter III-A — Risk-based tiering

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 17 | Tier ALL inventory models; review tier ≥ annually or on triggers | `TIER-01` | Tiering engine assigns tier to every model; annual + trigger-based re-tier | **New** |
| 18 | Tier drives validation intensity, approval authority (high→RMCB), controls, monitoring scope, doc depth, BCP | `TIER-02` | Tier → policy bundle (required validation freq, approver, monitoring, doc level) | **New** |
| 19 | Tier from materiality + complexity (incl. explainability difficulty, unstructured data) + regulatory factors | `TIER-03` | Configurable scoring inputs: materiality, complexity, reg flags | **New** |
| 20 | Composite tier; one low factor must not offset a high one | `TIER-04` | Non-offsetting aggregation (max/guardrail, not average) | **New** |

## Chapter III-B/C — Inventory, documentation, consumer

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 21 | Accurate, complete, current inventory of active/inactive/under-dev/decommissioned models; **no model used unless in inventory**; capture interdependencies | `INV-01` | Canonical model registry incl. lifecycle state + dependency graph; "unregistered = blocked" gate | Extend (`system_context` + gate) |
| 22 | Inventory min fields: owner/dev/validator/approver, tier, intended use, up/down dependencies, key val/monitor/audit observations | `INV-02` | Enforce required-field schema on registry | Extend |
| 23 | Retain decommissioned models in inventory **≥ 10 years** (or longer) | `INV-03` | Retention policy + immutable retention clock; block early purge | **New** (+ WORM backbone reuse) |
| 24 | Comprehensive documentation for all models incl. third-party; retention aligned to inventory | `INV-04` | Document store linked per model; retention enforced | Extend (`evidence`) |
| 25 | No consumer-harming models; grievance redressal for consumer-facing models | `CONS-01` | Flag consumer-facing models; link grievance/redressal records | **New** |

## Chapter IV — Lifecycle (development → decommissioning)

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 26–28 | Pre-dev: document rationale/objective/scope + cost-benefit (bias, fairness, ethics); structured dev process; data per data-governance | `LIFE-01` | Development record template; data-governance attestation | **New** (forms) |
| 29–33 | Independent RE validation of ALL models (incl. third-party) pre/post-deploy, on change/triggers, periodically; assess inputs/soundness/performance/fit; **validation report to RMCB ≤ 3 months** | `LIFE-02` | Validation workflow + independence check + 3-month SLA timer to RMCB | Extend / **New** (SLA timer) |
| 34–35 | Approval structure: authorities/thresholds, exception approval + extra requirements + remediation timelines; document rationale | `LIFE-03` | Approval engine with thresholds, exceptions (time-boxed), recorded rationale | **Reuse** (`approvals`, `governance_exceptions`) |
| 36–37 | Deploy with IT/data coordination; outputs replicable & stable in prod; ongoing monitoring of ALL deployed models; exception models → enhanced RMCB monitoring | `LIFE-04` | Deployment record + output-stability check; monitoring hooks; enhanced-monitoring flag | Extend (gateway records) |
| 38–42 | Structured change mgmt: controlled, enterprise-level, recovery from failed change; impact assessment pre-change; change/version log + approvals; "material change" threshold → re-validate + re-approve | `LIFE-05` | Versioned change log + impact-assessment gate + material-change trigger → reopen `LIFE-02/03` | **Reuse** (`policy_versioning`) + extend |
| 43 | BCP: disruption scenarios + fallback (manual, substitution, backup) | `LIFE-06` | Per-model BCP/fallback record; tie to tier | **New** |
| 44 | Inform all stakeholders on decommissioning for enterprise transition | `LIFE-07` | Decommission workflow + notifications + audit event | **New** (small) |

## Chapter V-A — Third-party models

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 45 | RE **accountable for outcomes** of any third-party model at any lifecycle stage | `TPM-01` | Mark third-party models; accountability attestation by RE owner | **New** (field) |
| 46 | Independent RE validation regardless of vendor assurance; **enhanced RMCB oversight irrespective of tier** | `TPM-02` | Force `LIFE-02` even for vendor-certified; auto-route to RMCB | Extend |
| 47 | Pre-use due diligence: provider credibility, methodological soundness/limits, data suitability/quality | `TPM-03` | Due-diligence checklist record per vendor model | **New** |
| 48 | Contract must grant: min technical documentation sufficient to validate; **audit rights for RE + supervisor**; continuity/exit | `TPM-04` | Capture contract attributes (doc access, audit rights, exit) as evidence | **New** |

## Chapter V-B.1 — AI/ML model risk

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 49–51 | Define AI/ML scope (incl. foundational/frontier); additional controls by impact; deploy only where risk manageable; if vendor non-disclosure → mitigate (e.g. limit usage) | `AIR-01` | AI flag + impact rating → required additional-control bundle; usage-restriction policy | Extend (policy engine) |
| 52 | Tiering also considers **reliance + level of autonomy** on outputs | `AIR-02` | Add autonomy/reliance inputs to `TIER-03` | **New** |
| 53 | Material third-party AI: supply-chain risk, few providers, validation limits, provider-driven update drift | `AIR-03` | Provider-concentration + update-risk record | **New** |
| 54 | Behavioural risks; test under atypical/stressed/edge/adversarial conditions | `AIR-04` | Link adversarial/stress test evidence per model | Extend (`evidence`) |
| 54(1)(i) | **Define explainability/transparency thresholds for ALL AI models**; higher for material/customer-impact | `AIR-05` | Per-model explainability threshold + tier-linked minimums | **New** |
| 54(1)(ii) | If full explainability unachievable → enhanced validation, output corroboration, frequent validation + continuous monitoring, usage restrictions, compensating controls | `AIR-06` | Breach of threshold → auto-require compensating-control set | **New** |
| 54(2) | Control boundaries vs hallucination in generative/customer-facing outputs | `AIR-07` | In-path gate guardrails on generative outputs | **Reuse** (gateway/policy) |
| 54(3) | Bias/discrimination risk; fairness assessment + mitigants (recalibrate/redesign; constrain complexity; limit features) | `AIR-08` | Fairness-assessment record + mitigation tracking | **New** |
| 54(4) | No overfitting; out-of-sample + varied-scenario generalisation | `AIR-09` | Generalisation-test evidence capture | **New** (evidence) |
| 54(5) | No spurious correlations / unintended relationships | `AIR-10` | Reviewer attestation + evidence | **New** |
| 54(6) | Manage output variability/stochasticity/uncertainty (confidence scores, probability outputs) | `AIR-11` | Capture confidence/variance metrics on gated calls | Extend (gateway metrics) |
| 54(7) | Data risks (quality, non-representativeness, incompleteness, IP); monitor **data drift + concept drift** ongoing | `AIR-12` | Drift monitoring hooks + data-risk record | **New** |
| 55 | Structured challenge incl. **red-teaming** for customer/generative models | `AIR-13` | Red-team result store + scheduled challenge | **New** |
| 56 | Dynamic/auto-update models: scope of auto-updates, strict justification, enhanced data checks, more frequent monitoring | `AIR-14` | Auto-update policy + tighter monitoring cadence | **New** |
| 57 | Enhanced AI documentation for traceability, reproducibility, auditability | `AIR-15` | Extended doc schema for AI models | Extend (`evidence`) |

## Chapter V-B.2 — AI deployment security

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 58 | No new vulnerabilities: access controls, cyber safeguards, controls on external interfaces/APIs/integrations | `AISEC-01` | Deny-by-default access; secure integration checklist | **Reuse** (RLS, auth) + extend |
| 59(i) | Customer/external interfaces: controls vs **prompt injection** + adversarial input; session/context-persistence limits; anomalous-usage detection | `AISEC-02` | Gateway prompt-injection filters + rate/anomaly detection + session limits | Extend (gateway + rate-limit) |
| 59(ii) | Disclose to users they interact with AI + its limitations | `AISEC-03` | Disclosure config per consumer-facing model | **New** |
| 59(iii) | Offer switch to human assistance on request | `AISEC-04` | Human-handoff flag + record | **New** |

## Chapter V-B.3 — Human oversight

| RBI ¶ | Obligation | Control ID | System behaviour | Status |
|---|---|---|---|---|
| 60 | Robust human oversight: human-in-command (in/on-the-loop); **override/suspend/deactivate incl. kill-switch**; periodic human review of outputs/decisions for anomalies | `HO-01` | **Kill switch** = gate `block` mode + override approval; human-review workflow | **Reuse** (`enforcement` gate + `approvals`) |
| 61 | Address automation bias, over-reliance, decision fatigue | `HO-02` | Oversight policy config + reviewer rotation prompts | **New** (config) |
| 62 | Oversight personnel have expertise; can challenge/override/escalate | `HO-03` | Reviewer competency attestation + escalation path | **New** |
| 63 | Periodically review overrides/interventions/incidents/near-misses; strengthen | `HO-04` | Incident + override log → periodic review report | Extend (`audit_events`) |
| 63 + FREE-AI Annex VI | Structured AI incident / near-miss reporting (indicative form in FREE-AI report) | `HO-05` | Incident-report capture using a standard taxonomy; exportable | **New** |

> **Adjacent surfaces (from FREE-AI report, Aug 2025 — supporting context, not the MRM draft):** Board Policy on AI outline (Annex V) → maps to `GOV-01/02`; AI Incident Reporting Form (Annex VI) → `HO-05`; the 7 Sutras (esp. *Accountability*, *Understandable by Design*, *Fairness and Equity*, *Safety/Resilience*) frame the "why" behind these controls. FREE-AI is a committee *report with recommendations* (non-binding); anchor compliance claims on the MRM Guidance, cite FREE-AI as context.

---

## Coverage summary

- **Reuse (already in agentguard):** GOV-00..04 partial, ERM-02/03 partial, LIFE-03, LIFE-05, AIR-07, HO-01, AISEC-01, audit/evidence backbone — the governance + gate + WORM-ledger + approvals core.
- **The "kill switch" (Para 60) and "no model used unless in inventory" (Para 21) and approval/exception engine (Para 34–35) already exist** as engine organs — the strongest credibility points.
- **Net-new clusters:** enterprise risk roll-up (`ERM-01`), risk-tiering engine (`TIER-*`), explainability thresholds (`AIR-05/06`), AI behavioural-risk evidence (`AIR-08..14`), third-party due-diligence (`TPM-*`), BCP/decommission/retention (`LIFE-06/07`, `INV-03`), consumer disclosures (`CONS-01`, `AISEC-03/04`).

## Open questions to resolve against the final notification

1. Exact effective date / phase-in — **confirmed absent in the full draft text** (no implementation timeline given). Raised in our public comment.
2. Spreadsheet/EUC tools are explicitly in scope (Para 7(3) illustration: a loan-pricing calculator that drives lending rates IS a model). → registry must handle non-software "models"; depth should be tier-proportionate (Para 18). Raised in our public comment.
3. Precise RMCB approval thresholds per tier (draft leaves to each RE's MRMF) → keep configurable.
4. Retention: 10-year floor (Para 23) interaction with DPDP Act erasure duties. Raised in our public comment.

---

*Maintained as the open reference mapping for the project. Contributions welcome once the repo is public (Apache-2.0). Corrections against the official RBI text are the highest-value PRs.*
