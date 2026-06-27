/**
 * Local-first persistence: the inventory lives in a single JSON file
 * (default `.prahari/inventory.json`). Self-hosted, data stays with the RE.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { emptyInventory, type Inventory } from './model.js';

export const DEFAULT_STORE_PATH = '.prahari/inventory.json';

export function loadInventory(path: string = DEFAULT_STORE_PATH): Inventory {
  if (!existsSync(path)) return emptyInventory();
  const raw = readFileSync(path, 'utf8');
  const parsed = JSON.parse(raw) as Inventory;
  if (parsed.version !== 1 || !Array.isArray(parsed.models)) {
    throw new Error(`Invalid inventory file at ${path}`);
  }
  return parsed;
}

export function saveInventory(inv: Inventory, path: string = DEFAULT_STORE_PATH): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(inv, null, 2) + '\n', 'utf8');
}
