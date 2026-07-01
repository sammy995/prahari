# Crosswalk — one control core, many frameworks

[← Prahari](../../README.md) · [Control reference](../controls)

> Not legal advice; not a NIST or RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts.

The **Prahari Control Core** is a framework-neutral set of controls, seeded from the RBI control taxonomy. Each core control maps to RBI paragraphs and to the clauses of other frameworks.

**The honest promise:** implement the core once, and the crosswalk shows how far that gets you toward each framework — and **itemizes the deltas** each framework adds. It does **not** claim "comply with us = comply with all"; the frameworks are not subsets of one another. The deltas are the point.

Each mapping carries a **relationship**: `equivalent` (genuine 1:1) or `partial` (overlap with caveats in the note). Framework clauses with **no** mapping are surfaced as **deltas** — obligations the core does not cover.

## Frameworks

| Framework | Status |
| --- | --- |
| [NIST AI RMF 1.0](nist-ai-rmf.md) | ✅ mapped |
| [ISO/IEC 42001:2023](iso-42001.md) | ✅ mapped |
| [SR 11-7](sr-11-7.md) | ✅ mapped |
| [EU AI Act](eu-ai-act.md) | ✅ mapped |
| [MAS FEAT](mas-feat.md) | ✅ mapped |

The mapping pages are **generated** from the `@prahari/crosswalk` package (`control-core.json` is the machine-readable artifact); do not edit them by hand. Regenerate with `npm run crosswalk:gen`.

## How to cite

Cite a specific mapping as **Prahari Control Core LIFE-02 → NIST AI RMF**, linking the crosswalk page.
