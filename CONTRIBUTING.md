# Contributing to Prahari

Thank you for helping build the open reference for RBI Model Risk Management. This project is most valuable when shaped by practitioners — model-risk officers, validators, RegTech consultants, and bank/vendor engineers.

## Highest-value contributions right now

1. **Corrections to the control mapping** ([`docs/rbi-mrm-2026-control-mapping.md`](docs/rbi-mrm-2026-control-mapping.md)) against the **official** RBI text. If a mapping misreads a paragraph, that is the most important PR you can open. Cite the paragraph.
2. **Core-banking adapters** against the connector spec (Finacle / TCS BaNCS / Oracle FLEXCUBE / Temenos). You do not need to share proprietary details — the interface is open.
3. **Real-world gaps:** controls an examiner would expect that the mapping misses.

## Ground rules

- **Cite the source.** For any compliance-mapping claim, reference the RBI paragraph number and (where possible) quote it.
- **No legal advice.** Keep contributions to engineering and faithful interpretation. We do not assert that any configuration makes anyone "compliant." See [DISCLAIMER.md](DISCLAIMER.md).
- **No proprietary or confidential data.** Never include a real institution's model data, vendor contracts, or non-public RBI correspondence.
- **Security-sensitive issues** go through [SECURITY.md](SECURITY.md), not public issues.

## How to contribute

1. Open an issue describing the change (or pick an existing one).
2. Fork, branch, and make focused changes. One concern per PR.
3. For code: include tests. For mapping: include the citation.
4. Sign off your commits (`git commit -s`) to certify the [Developer Certificate of Origin](https://developercertificate.org/).
5. Open a PR; describe what changed and why.

## Code of conduct

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be respectful; assume good faith.

## Scope discipline

Prahari aims to be the *reference* implementation, not every feature for everyone. Proposals that broaden scope dramatically (other regulators, unrelated domains) are welcome as discussions first — we keep the core focused on RBI MRM so it stays correct and maintainable.
