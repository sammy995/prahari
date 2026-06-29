# RBI MRM 2026 — Control Reference

Per-paragraph implementation guidance for the RBI Draft *Guidance on Regulatory Principles for Model Risk Management, 2026*. Each page turns one part of the regulation into something you can actually build and evidence.

> Not legal advice; not an RBI publication; no guarantee of compliance. The Regulated Entity remains accountable (Para 8). See [DISCLAIMER](../../DISCLAIMER.md). Paragraph numbers follow the draft; re-verify against the final notification.

For the full clause-by-clause table see the [control mapping](../rbi-mrm-2026-control-mapping.md). The pages below go deeper on the highest-value controls.

## Pages

| Paragraph(s) | Topic |
| --- | --- |
| [Para 7(3)](para-07-model-definition.md) | What counts as a "model" (incl. spreadsheets) |
| [Para 8](para-08-accountability.md) | The RE stays accountable for all models |
| [Para 9–13](para-09-13-governance.md) | Governance: the MRMF, the Board, the RMCB |
| [Para 14–16](para-14-16-enterprise-risk.md) | Enterprise-wide model risk + three lines of defence |
| [Para 17–20](para-17-20-risk-tiering.md) | Risk-based, non-offsetting model tiering |
| [Para 21–22](para-21-22-inventory.md) | Model inventory and minimum fields |
| [Para 23](para-23-retention.md) | Ten-year retention of decommissioned models |
| [Para 24–25](para-24-25-documentation-consumer.md) | Documentation and consumer protection |
| [Para 26–28](para-26-28-development.md) | Before you build: rationale, cost–benefit, data governance |
| [Para 29–32](para-29-32-validation.md) | Independent validation of all models |
| [Para 33](para-33-validation-report-sla.md) | Validation report to the RMCB within three months |
| [Para 34–35](para-34-35-approval.md) | Approval authority and time-boxed exceptions |
| [Para 36–37](para-36-37-deployment-monitoring.md) | Deployment and ongoing monitoring |
| [Para 38–42](para-38-42-change-management.md) | Change management + material-change trigger |
| [Para 43–44](para-43-44-bcp-decommissioning.md) | Business continuity and decommissioning |
| [Para 45–48](para-45-48-third-party.md) | Third-party models (validate anyway, audit rights) |
| [Para 49–53](para-49-53-ai-scope-autonomy.md) | AI/ML scope, autonomy, third-party AI supply chain |
| [Para 54](para-54-ai-behavioural-explainability.md) | AI behavioural risk + explainability thresholds |
| [Para 55–57](para-55-57-redteam-autoupdate-docs.md) | Red-teaming, auto-updating models, AI documentation |
| [Para 59](para-59-ai-deployment-security.md) | Customer-facing AI: prompt injection, disclosure, handoff |
| [Para 60](para-60-human-oversight.md) | Human oversight and the kill switch |

## Page template

Every page follows the same shape, so the set stays consistent and easy to extend:

1. **Verbatim** — the relevant draft text (quoted).
2. **Intent** — what the regulator is trying to achieve.
3. **Expected controls** — concrete, implementable controls.
4. **Evidence required** — what an examiner would expect to see.
5. **Example** — how Prahari implements it (CLI / library / data).
6. **Common mistakes** — where REs get it wrong.

## How to cite

Each page is a stable, citeable unit. Reference it as, e.g., **Prahari Control Reference — Para 60**, linking to the page. The goal is for practitioners to cite a specific control interpretation rather than "some GitHub README".

## Contributing

The most valuable contributions are (a) corrections against the official RBI text and (b) new pages for paragraphs not yet covered, following the template above. Cite the paragraph in every claim. See [CONTRIBUTING](../../CONTRIBUTING.md).
