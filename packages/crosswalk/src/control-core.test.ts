import { describe, it, expect } from 'vitest';
import { controlCore } from './control-core.js';
import { validateControlCore, deriveCoverage } from './derive.js';

describe('controlCore data', () => {
  it('is internally valid (no dangling refs, no duplicates)', () => {
    expect(validateControlCore(controlCore)).toEqual([]);
  });

  it('covers all nine control clusters', () => {
    const clusters = new Set(controlCore.coreControls.map((c) => c.cluster));
    for (const k of ['GOV', 'TIER', 'INV', 'LIFE', 'TPM', 'AIR', 'AISEC', 'HO', 'CONS']) {
      expect(clusters.has(k)).toBe(true);
    }
  });

  it('every core control cites >=1 RBI paragraph and a reference page', () => {
    for (const c of controlCore.coreControls) {
      expect(c.rbiParas.length).toBeGreaterThan(0);
      expect(c.referencePage).toMatch(/^reference\/controls\/para-.*\.md$/);
    }
  });

  it('has NIST AI RMF clauses and at least one delta (honesty check)', () => {
    const cov = deriveCoverage(controlCore, 'nist-ai-rmf');
    expect(cov.mappedClauses.length).toBeGreaterThan(0);
    expect(cov.deltaClauses.length).toBeGreaterThan(0);
  });
});
