#!/usr/bin/env node
/**
 * `prahari` — local-first RBI MRM CLI.
 *
 * Commands:
 *   prahari init
 *   prahari add --name .. --type ml --use ".." --owner a --developer b --validator c --approver d \
 *               [--materiality 1-3] [--complexity 1-3] [--autonomy 1-3] [--third-party] [--consumer-facing] [--active]
 *   prahari import --csv models.csv
 *   prahari update --id <id> [--materiality 1-3] [--active|--inactive|--decommission] ...
 *   prahari list
 *   prahari check
 *   prahari report [--org "Acme Bank"] [--out report.md] [--framework nist-ai-rmf|iso-42001|sr-11-7]
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { Command } from 'commander';
import type { FactorScore } from '@prahari/rbi-tiering';
import { LifecycleState, ModelType, type ModelTieringInputs } from './model.js';
import { addModel, listModels, updateModel, decommissionModel } from './inventory.js';
import { importModelsCsv } from './csv.js';
import { runChecks } from './checks.js';
import { renderReport, renderFrameworkReport } from './report.js';
import { DEFAULT_STORE_PATH, loadInventory, saveInventory } from './store.js';

const program = new Command();
program.name('prahari').description('Local-first RBI Model Risk Management toolkit').version('0.1.0');

program
  .command('init')
  .description('Create an empty inventory file')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    saveInventory(inv, opts.file);
    console.log(`Inventory ready at ${opts.file}`);
  });

program
  .command('add')
  .description('Add a model to the inventory')
  .requiredOption('--name <name>')
  .requiredOption('--type <type>', 'spreadsheet|rule_based|statistical|ml|genai')
  .requiredOption('--use <intendedUse>')
  .requiredOption('--owner <owner>')
  .requiredOption('--developer <developer>')
  .requiredOption('--validator <validator>')
  .requiredOption('--approver <approver>')
  .option('--materiality <1-3>')
  .option('--complexity <1-3>')
  .option('--autonomy <1-3>')
  .option('--third-party')
  .option('--consumer-facing')
  .option('--active', 'mark lifecycle as active')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    const tieringInputs: ModelTieringInputs | undefined = opts.materiality && opts.complexity
      ? {
          materiality: Number(opts.materiality) as FactorScore,
          complexity: Number(opts.complexity) as FactorScore,
          autonomy: opts.autonomy ? (Number(opts.autonomy) as FactorScore) : undefined,
        }
      : undefined;
    const m = addModel(inv, {
      name: opts.name,
      type: opts.type as ModelType,
      intendedUse: opts.use,
      roles: { owner: opts.owner, developer: opts.developer, validator: opts.validator, approver: opts.approver },
      isThirdParty: Boolean(opts.thirdParty),
      consumerFacing: Boolean(opts.consumerFacing),
      lifecycle: opts.active ? LifecycleState.Active : undefined,
      tieringInputs,
    });
    saveInventory(inv, opts.file);
    console.log(`Added "${m.name}" (${m.id}) — tier: ${m.tier ?? 'untiered'}`);
  });

program
  .command('import')
  .description('Bulk-import models from a CSV file (header row required)')
  .requiredOption('--csv <path>', 'CSV file: name,type,use,owner,developer,validator,approver,materiality,complexity,autonomy,third_party,ai,consumer_facing,active')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    const res = importModelsCsv(inv, readFileSync(opts.csv, 'utf8'));
    saveInventory(inv, opts.file);
    console.log(`Imported ${res.added.length} model(s) into ${opts.file}.`);
    for (const e of res.errors) console.error(`  [skipped CSV line ${e.line}] ${e.message}`);
    if (res.errors.length) process.exitCode = 1;
  });

program
  .command('update')
  .description('Update fields of an existing model (re-tiers if inputs change)')
  .requiredOption('--id <id>')
  .option('--use <intendedUse>')
  .option('--materiality <1-3>')
  .option('--complexity <1-3>')
  .option('--autonomy <1-3>')
  .option('--third-party', 'mark as third-party')
  .option('--consumer-facing', 'mark as consumer-facing')
  .option('--active', 'set lifecycle to active')
  .option('--inactive', 'set lifecycle to inactive')
  .option('--decommission', 'decommission (retained 10 years, Para 23)')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    if (opts.decommission) {
      const m = decommissionModel(inv, opts.id);
      saveInventory(inv, opts.file);
      console.log(`Decommissioned "${m.name}" (${m.id}) — retained until ${new Date(new Date(m.decommissionedAt!).setFullYear(new Date(m.decommissionedAt!).getFullYear() + 10)).getFullYear()} (Para 23).`);
      return;
    }
    const tieringInputs: Partial<ModelTieringInputs> = {};
    if (opts.materiality) tieringInputs.materiality = Number(opts.materiality) as FactorScore;
    if (opts.complexity) tieringInputs.complexity = Number(opts.complexity) as FactorScore;
    if (opts.autonomy) tieringInputs.autonomy = Number(opts.autonomy) as FactorScore;
    const lifecycle = opts.active
      ? LifecycleState.Active
      : opts.inactive
        ? LifecycleState.Inactive
        : undefined;
    const m = updateModel(inv, opts.id, {
      intendedUse: opts.use,
      isThirdParty: opts.thirdParty ? true : undefined,
      consumerFacing: opts.consumerFacing ? true : undefined,
      lifecycle,
      tieringInputs: Object.keys(tieringInputs).length ? tieringInputs : undefined,
    });
    saveInventory(inv, opts.file);
    console.log(`Updated "${m.name}" (${m.id}) — tier: ${m.tier ?? 'untiered'}, lifecycle: ${m.lifecycle}`);
  });

program
  .command('list')
  .description('List inventoried models')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    const models = listModels(inv);
    if (models.length === 0) {
      console.log('Inventory is empty.');
      return;
    }
    for (const m of models) {
      console.log(`${m.tier ?? '—'}\t${m.lifecycle}\t${m.type}\t${m.name}\t(${m.id})`);
    }
  });

program
  .command('check')
  .description('Run RBI compliance checks')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    const findings = runChecks(inv);
    if (findings.length === 0) {
      console.log('No findings. ✅');
      return;
    }
    for (const f of findings) {
      console.log(`[${f.severity.toUpperCase()}] ${f.code} (Para ${f.para}) — ${f.modelName}: ${f.message}`);
    }
    process.exitCode = findings.some((f) => f.severity === 'critical') ? 1 : 0;
  });

program
  .command('report')
  .description('Generate an examiner-ready Markdown report')
  .option('--org <name>', 'organisation name')
  .option('--out <path>', 'write to file instead of stdout')
  .option('--framework <id>', 'also render a framework view (e.g. nist-ai-rmf)')
  .option('-f, --file <path>', 'inventory file', DEFAULT_STORE_PATH)
  .action((opts) => {
    const inv = loadInventory(opts.file);
    const md = opts.framework
      ? renderFrameworkReport(inv, opts.framework, { organisation: opts.org })
      : renderReport(inv, { organisation: opts.org });
    if (opts.out) {
      writeFileSync(opts.out, md, 'utf8');
      console.log(`Report written to ${opts.out}`);
    } else {
      console.log(md);
    }
  });

try {
  program.parse();
} catch (err) {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
