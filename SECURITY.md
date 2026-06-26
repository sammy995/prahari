# Security Policy

Prahari is intended to be self-hosted by Regulated Entities handling sensitive model and customer data. Security is a first-class concern.

## Reporting a vulnerability

**Do not open a public issue for security vulnerabilities.**

Email the maintainer at: **security@<project-domain>** (update before launch) with:

- a description of the issue and its impact,
- steps to reproduce,
- affected version/commit.

You will receive an acknowledgement within a few business days. Please allow reasonable time for a fix before any public disclosure (coordinated disclosure).

## Scope

In scope: the Prahari codebase and its default configuration. Out of scope: a specific operator's deployment, infrastructure, or misconfiguration (those are the operator's responsibility — see [DISCLAIMER.md](DISCLAIMER.md)).

## Secure-by-default commitments

Prahari aims to ship with:

- Deny-by-default data access (row-level security; tenant isolation).
- Immutable, hash-chained audit ledger (WORM).
- Server-side auth on every protected route; least-privilege keys.
- Input validation at boundaries; rate limiting on auth/AI/expensive routes.
- No secrets in the repo; `.env` gitignored; example env only.

Operators are responsible for: transport security, key management, data residency, backups, and retention enforcement appropriate to their jurisdiction (incl. RBI's 10-year retention, Para 23).
