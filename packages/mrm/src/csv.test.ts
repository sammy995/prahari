import { describe, it, expect } from 'vitest';
import { emptyInventory } from './model.js';
import { parseCsv, importModelsCsv } from './csv.js';

describe('parseCsv', () => {
  it('parses quoted fields containing commas and escaped quotes', () => {
    const rows = parseCsv('a,b,c\n"x,y","he said ""hi""",z\n');
    expect(rows).toEqual([
      ['a', 'b', 'c'],
      ['x,y', 'he said "hi"', 'z'],
    ]);
  });

  it('drops blank lines', () => {
    expect(parseCsv('a\n\n b \n')).toEqual([['a'], [' b ']]);
  });
});

const HEADER =
  'name,type,use,owner,developer,validator,approver,materiality,complexity,autonomy,third_party,ai,consumer_facing,active';

describe('importModelsCsv', () => {
  it('imports a valid row, tiers it, and honours flags', () => {
    const inv = emptyInventory();
    const csv = `${HEADER}\nScorecard,ml,Score applicants,priya,dev,val,cro,3,2,,false,,false,true\n`;
    const res = importModelsCsv(inv, csv);
    expect(res.errors).toEqual([]);
    expect(res.added).toHaveLength(1);
    expect(inv.models).toHaveLength(1);
    const m = inv.models[0]!;
    expect(m.name).toBe('Scorecard');
    expect(m.tier).toBe('high'); // materiality 3 wins (non-offsetting)
    expect(m.lifecycle).toBe('active');
  });

  it('collects a bad row (missing validator) without aborting the import', () => {
    const inv = emptyInventory();
    const csv =
      `${HEADER}\n` +
      `Good,ml,use,o,d,v,a,2,2,,,,,\n` + // valid
      `Bad,ml,use,o,d,,a,2,2,,,,,\n`; // missing validator -> error
    const res = importModelsCsv(inv, csv);
    expect(res.added).toHaveLength(1);
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.line).toBe(3);
    expect(res.errors[0]!.message).toMatch(/Para 22/);
  });

  it('reports an error when there are no data rows', () => {
    const res = importModelsCsv(emptyInventory(), HEADER);
    expect(res.added).toHaveLength(0);
    expect(res.errors[0]!.message).toMatch(/no data rows/);
  });
});
