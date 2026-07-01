/**
 * CSV import for the model inventory. Banks live in spreadsheets, so let them
 * bulk-load models from a CSV. Each row becomes a model via addModel (which
 * enforces Para 22 + validator independence); bad rows are collected, not fatal,
 * so one malformed row does not abort a large import.
 */

import { addModel, type AddModelInput } from './inventory.js';
import { LifecycleState, type Inventory, type ModelRecord, type ModelType } from './model.js';

/** Parse RFC-4180-ish CSV text into rows of fields (handles quoted commas/quotes). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  // Drop fully-blank lines.
  return rows.filter((r) => !(r.length === 1 && r[0]!.trim() === ''));
}

export interface CsvImportResult {
  added: ModelRecord[];
  errors: { line: number; message: string }[];
}

const truthy = (v: string): boolean => /^(true|1|yes|y)$/i.test(v.trim());
const numOrUndef = (v: string): number | undefined => {
  if (v.trim() === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Import models from CSV. Recognised headers (case-insensitive):
 * name,type,use,owner,developer,validator,approver,materiality,complexity,
 * autonomy,third_party,ai,consumer_facing,active
 */
export function importModelsCsv(
  inv: Inventory,
  csvText: string,
  now: Date = new Date(),
): CsvImportResult {
  const rows = parseCsv(csvText);
  const result: CsvImportResult = { added: [], errors: [] };
  if (rows.length < 2) {
    result.errors.push({ line: 0, message: 'CSV has no data rows (need a header + at least one row).' });
    return result;
  }
  const header = rows[0]!.map((h) => h.trim().toLowerCase());
  const col = (r: string[], name: string): string => {
    const i = header.indexOf(name);
    return i >= 0 ? (r[i] ?? '').trim() : '';
  };

  for (let li = 1; li < rows.length; li++) {
    const r = rows[li]!;
    try {
      const mat = numOrUndef(col(r, 'materiality'));
      const comp = numOrUndef(col(r, 'complexity'));
      const auto = numOrUndef(col(r, 'autonomy'));
      let tieringInputs: AddModelInput['tieringInputs'];
      if (mat !== undefined && comp !== undefined) {
        tieringInputs = {
          materiality: mat as 1 | 2 | 3,
          complexity: comp as 1 | 2 | 3,
          ...(auto !== undefined ? { autonomy: auto as 1 | 2 | 3 } : {}),
        };
      }
      const aiCell = col(r, 'ai');
      const input: AddModelInput = {
        name: col(r, 'name'),
        type: col(r, 'type') as ModelType,
        intendedUse: col(r, 'use'),
        roles: {
          owner: col(r, 'owner'),
          developer: col(r, 'developer'),
          validator: col(r, 'validator'),
          approver: col(r, 'approver'),
        },
        isThirdParty: truthy(col(r, 'third_party')),
        isAi: aiCell === '' ? undefined : truthy(aiCell),
        consumerFacing: truthy(col(r, 'consumer_facing')),
        lifecycle: truthy(col(r, 'active')) ? LifecycleState.Active : undefined,
        tieringInputs,
      };
      result.added.push(addModel(inv, input, now));
    } catch (e) {
      result.errors.push({ line: li + 1, message: e instanceof Error ? e.message : String(e) });
    }
  }
  return result;
}
