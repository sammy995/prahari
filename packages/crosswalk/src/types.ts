export type Framework = 'nist-ai-rmf' | 'iso-42001' | 'eu-ai-act' | 'sr-11-7' | 'mas-feat';

export type CrosswalkRelationship = 'equivalent' | 'partial';

export interface CoreControl {
  id: string;            // e.g. 'LIFE-02'
  cluster: string;       // 'GOV'|'TIER'|'INV'|'LIFE'|'TPM'|'AIR'|'AISEC'|'HO'|'CONS'
  title: string;
  summary: string;       // one sentence
  rbiParas: string[];    // e.g. ['29','30','31','32']
  referencePage: string; // e.g. 'reference/controls/para-29-32-validation.md'
}

export interface FrameworkClause {
  framework: Framework;
  ref: string;           // e.g. 'MEASURE 2.3'
  title: string;
  category?: string;     // e.g. 'MEASURE'
}

export interface CrosswalkMapping {
  coreControlId: string; // -> CoreControl.id
  framework: Framework;
  clauseRef: string;     // -> FrameworkClause.ref (same framework)
  relationship: CrosswalkRelationship;
  note?: string;
}

export interface ControlCore {
  version: number;
  coreControls: CoreControl[];
  frameworkClauses: FrameworkClause[];
  mappings: CrosswalkMapping[];
}

export interface FrameworkCoverage {
  framework: Framework;
  mappedClauses: FrameworkClause[];
  deltaClauses: FrameworkClause[];
  unmappedCoreControls: CoreControl[];
}
