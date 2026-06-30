import type { ControlCore, Framework, FrameworkCoverage } from './types.js';

export function deriveCoverage(core: ControlCore, fw: Framework): FrameworkCoverage {
  const clauses = core.frameworkClauses.filter((c) => c.framework === fw);
  const mappings = core.mappings.filter((m) => m.framework === fw);
  const mappedRefs = new Set(mappings.map((m) => m.clauseRef));
  const mappedCoreIds = new Set(mappings.map((m) => m.coreControlId));

  return {
    framework: fw,
    mappedClauses: clauses.filter((c) => mappedRefs.has(c.ref)),
    deltaClauses: clauses.filter((c) => !mappedRefs.has(c.ref)),
    unmappedCoreControls: core.coreControls.filter((c) => !mappedCoreIds.has(c.id)),
  };
}

export function validateControlCore(core: ControlCore): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const c of core.coreControls) {
    if (ids.has(c.id)) errors.push(`Duplicate core control id: ${c.id}`);
    ids.add(c.id);
  }
  const clauseKey = (fw: Framework, ref: string) => `${fw}::${ref}`;
  const clauseKeys = new Set(core.frameworkClauses.map((c) => clauseKey(c.framework, c.ref)));
  for (const m of core.mappings) {
    if (!ids.has(m.coreControlId)) errors.push(`Mapping references missing core control: ${m.coreControlId}`);
    if (!clauseKeys.has(clauseKey(m.framework, m.clauseRef))) {
      errors.push(`Mapping references missing clause: ${m.framework}/${m.clauseRef}`);
    }
  }
  return errors;
}
