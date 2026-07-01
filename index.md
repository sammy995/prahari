---
layout: home

hero:
  name: Prahari
  text: Open model-risk governance for regulated AI
  tagline: A citeable control reference, a local-first toolkit, and a multi-framework crosswalk — for the RBI Draft Guidance on Model Risk Management (2026).
  actions:
    - theme: brand
      text: Control Reference
      link: /reference/controls/README
    - theme: alt
      text: Framework Crosswalk
      link: /reference/crosswalk/README
    - theme: alt
      text: GitHub
      link: https://github.com/sammy995/prahari

features:
  - title: Regulation → Control → Evidence → Audit
    details: Every RBI paragraph (1–63) mapped, in 24 citeable pages, to a concrete control, the evidence that proves it, common mistakes, and an examiner-ready report.
  - title: One control core, five frameworks
    details: The same controls mapped to NIST AI RMF · ISO/IEC 42001 · SR 11-7 · EU AI Act · MAS FEAT. Coverage and the deltas each framework adds are derived, never asserted — it never claims you are "compliant".
  - title: Local-first toolkit
    details: The prahari CLI runs on a single JSON file — no server, no cloud. Model inventory, non-offsetting risk tiering, CSV bulk-import, CI-gate compliance checks, and per-framework reports.
---

> **Not legal advice. Not an RBI publication. No guarantee of compliance.** Prahari helps you operationalize *your* Model Risk Management Framework; your organization remains accountable for its models (RBI Para 8).

## Why Prahari

AI-governance frameworks describe *what* to do; Prahari shows *how*. The hard part of model-risk compliance is not storing a list of models — it is **connecting a regulation to a concrete control, the evidence that proves it, and an audit trail an examiner can read.**

Prahari is two complementary artifacts: a **human-readable [control reference](/reference/controls/README)** that maps the regulation paragraph by paragraph, and an **open-source toolkit** that implements those controls and produces auditable evidence — extended by a **[framework crosswalk](/reference/crosswalk/README)** so one implementation aligns you with the shared backbone of many regimes.

## Install

```bash
npm install @prahari/mrm
```
