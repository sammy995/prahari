import { describe, it, expect } from 'vitest';
import { deriveCoverage, validateControlCore } from './derive.js';
import type { ControlCore } from './types.js';

function fixture(): ControlCore {
  return {
    version: 1,
    coreControls: [
      { id: 'LIFE-02', cluster: 'LIFE', title: 'Independent validation', summary: 's', rbiParas: ['29'], referencePage: 'reference/controls/para-29-32-validation.md' },
      { id: 'HO-01', cluster: 'HO', title: 'Human oversight', summary: 's', rbiParas: ['60'], referencePage: 'reference/controls/para-60-human-oversight.md' },
    ],
    frameworkClauses: [
      { framework: 'nist-ai-rmf', ref: 'MEASURE 2.3', title: 'Performance measured', category: 'MEASURE' },
      { framework: 'nist-ai-rmf', ref: 'MANAGE 4.1', title: 'Post-deployment monitoring', category: 'MANAGE' },
      { framework: 'nist-ai-rmf', ref: 'GOVERN 1.1', title: 'Legal/regulatory understood', category: 'GOVERN' },
    ],
    mappings: [
      { coreControlId: 'LIFE-02', framework: 'nist-ai-rmf', clauseRef: 'MEASURE 2.3', relationship: 'partial' },
    ],
  };
}

describe('deriveCoverage', () => {
  it('partitions mapped vs delta clauses', () => {
    const cov = deriveCoverage(fixture(), 'nist-ai-rmf');
    expect(cov.mappedClauses.map((c) => c.ref)).toEqual(['MEASURE 2.3']);
    expect(cov.deltaClauses.map((c) => c.ref).sort()).toEqual(['GOVERN 1.1', 'MANAGE 4.1']);
  });

  it('lists core controls with no mapping to this framework', () => {
    const cov = deriveCoverage(fixture(), 'nist-ai-rmf');
    expect(cov.unmappedCoreControls.map((c) => c.id)).toEqual(['HO-01']);
  });
});

describe('validateControlCore', () => {
  it('returns [] for a valid core', () => {
    expect(validateControlCore(fixture())).toEqual([]);
  });

  it('flags a mapping to a missing core control', () => {
    const core = fixture();
    core.mappings.push({ coreControlId: 'NOPE', framework: 'nist-ai-rmf', clauseRef: 'MEASURE 2.3', relationship: 'partial' });
    expect(validateControlCore(core).join(' ')).toContain('NOPE');
  });

  it('flags a mapping to a missing clause', () => {
    const core = fixture();
    core.mappings.push({ coreControlId: 'HO-01', framework: 'nist-ai-rmf', clauseRef: 'GHOST 9.9', relationship: 'partial' });
    expect(validateControlCore(core).join(' ')).toContain('GHOST 9.9');
  });

  it('flags duplicate core control ids', () => {
    const core = fixture();
    core.coreControls.push({ ...core.coreControls[0]! });
    expect(validateControlCore(core).join(' ')).toContain('LIFE-02');
  });
});
