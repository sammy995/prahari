# @prahari/crosswalk

Framework-neutral **Prahari Control Core** and crosswalk mappings — a shared set of model-risk controls (seeded from the RBI MRM 2026 taxonomy) mapped to **NIST AI RMF · ISO/IEC 42001 · SR 11-7 · EU AI Act · MAS FEAT**, with coverage and deltas **derived, never asserted**.

Part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0).

> Not legal advice; not a NIST/ISO/EU/RBI publication; no guarantee of compliance. Mappings are an interpretation to verify against source texts. Implementing the core aligns you with the **shared backbone** of each framework — it does **not** make you "compliant"; the deltas are obligations each framework adds.

## Install

```bash
npm install @prahari/crosswalk
```

## Use

```ts
import { controlCore, deriveCoverage, validateControlCore } from '@prahari/crosswalk';

// Fails fast on dangling references or duplicate ids.
const errors = validateControlCore(controlCore); // string[]; [] = valid

// How far does the Prahari core get you toward a framework, and what's the delta?
const cov = deriveCoverage(controlCore, 'eu-ai-act');
cov.mappedClauses;   // framework clauses with >= 1 mapping
cov.deltaClauses;    // clauses with NO mapping — obligations the core does not cover
cov.unmappedCoreControls;
```

## What's inside

- `controlCore` — the source-of-truth data: core controls (each citing its RBI paragraphs and reference page), the framework clause catalog, and the mappings (each with a `relationship` of `equivalent` or `partial`).
- `deriveCoverage(core, framework)` — pure; partitions a framework's clauses into mapped vs delta.
- `validateControlCore(core)` — pure; integrity check.

Frameworks: `nist-ai-rmf` · `iso-42001` · `sr-11-7` · `eu-ai-act` · `mas-feat`.

The human-readable crosswalk pages and machine `control-core.json` are generated from this package; see the [crosswalk reference](https://github.com/sammy995/prahari/tree/main/reference/crosswalk).
