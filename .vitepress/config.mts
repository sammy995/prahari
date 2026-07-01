import { defineConfig } from 'vitepress';

// The docs site is built from the repo root (srcDir = '.') so the reference's
// existing repo-relative markdown links keep working. Non-doc trees are excluded.
export default defineConfig({
  title: 'Prahari',
  description:
    'Open-source model-risk governance for regulated AI — a citeable RBI MRM 2026 control reference, a local-first toolkit, and a multi-framework crosswalk (NIST AI RMF · ISO 42001 · SR 11-7 · EU AI Act · MAS FEAT).',
  base: '/prahari/',
  ignoreDeadLinks: true,
  srcExclude: [
    'README.md',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'DISCLAIMER.md',
    'SECURITY.md',
    'node_modules/**',
    'packages/**',
    'apps/**',
    'scripts/**',
    '.github/**',
    '.superpowers/**',
    'docs/**',
    '**/*.test.*',
  ],
  themeConfig: {
    nav: [
      { text: 'Control Reference', link: '/reference/controls/README' },
      { text: 'Crosswalk', link: '/reference/crosswalk/README' },
      { text: 'Examples', link: '/examples/README' },
    ],
    sidebar: [
      {
        text: 'Control Reference (RBI MRM 2026)',
        link: '/reference/controls/README',
        items: [
          { text: 'Control mapping (full table)', link: '/reference/rbi-mrm-2026-control-mapping' },
          { text: 'Para 8 — Accountability', link: '/reference/controls/para-08-accountability' },
          { text: 'Para 17–20 — Risk tiering', link: '/reference/controls/para-17-20-risk-tiering' },
          { text: 'Para 21–22 — Inventory', link: '/reference/controls/para-21-22-inventory' },
          { text: 'Para 29–32 — Validation', link: '/reference/controls/para-29-32-validation' },
          { text: 'Para 54 — AI behavioural/explainability', link: '/reference/controls/para-54-ai-behavioural-explainability' },
          { text: 'Para 60 — Human oversight / kill switch', link: '/reference/controls/para-60-human-oversight' },
        ],
      },
      {
        text: 'Framework Crosswalk',
        link: '/reference/crosswalk/README',
        items: [
          { text: 'NIST AI RMF 1.0', link: '/reference/crosswalk/nist-ai-rmf' },
          { text: 'ISO/IEC 42001:2023', link: '/reference/crosswalk/iso-42001' },
          { text: 'SR 11-7', link: '/reference/crosswalk/sr-11-7' },
          { text: 'EU AI Act', link: '/reference/crosswalk/eu-ai-act' },
          { text: 'MAS FEAT', link: '/reference/crosswalk/mas-feat' },
        ],
      },
      { text: 'Examples', link: '/examples/README' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/sammy995/prahari' }],
    footer: {
      message: 'Apache-2.0 · Not legal advice; not an RBI/NIST/ISO/EU publication; no guarantee of compliance.',
      copyright: 'Prahari — the Regulated Entity remains accountable for its models (RBI Para 8).',
    },
  },
});
