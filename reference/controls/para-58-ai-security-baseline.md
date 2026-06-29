# Para 58 — AI deployment security baseline

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.2

## Verbatim

> **58.** Deploying AI models shall **not introduce new vulnerabilities**. Apply **access controls**, **cyber-security safeguards**, and **controls over external interfaces, APIs and integrations** through which the model is consumed.

## Intent

Before the customer-facing specifics of [Para 59](para-59-ai-deployment-security.md), Para 58 sets the general rule: an AI model is a new component in your estate, and bolting it on must not open a hole. The threat surface is the *integration* as much as the model — the API the model is called through, the data it reads, the service account it runs as. The recurring failure is a model wired into production with broad credentials and an unauthenticated internal endpoint "because it's just internal". Para 58 says secure the AI deployment to at least the standard of everything else you run, treating its interfaces and integrations as first-class attack surface.

## Expected controls

- **Deny-by-default access** to the model and its data; least-privilege service accounts; authenticated, authorised API access (Para 58).
- A **secure-integration checklist** for every interface/API/integration the model is consumed through — applied at deployment ([Para 36–37](para-36-37-deployment-monitoring.md)).
- Standard **cyber safeguards** (network controls, secrets management, logging) extended to the AI components, not exempted from them.
- For **customer / external-facing** interfaces, the additional controls in [Para 59](para-59-ai-deployment-security.md) (prompt injection, disclosure, human handoff) apply on top of this baseline.

## Evidence required

- Access-control configuration for the model, its data, and its service identity.
- The secure-integration review for each interface/API the model exposes or consumes.
- Evidence the AI components are inside the RE's normal cyber-security and logging perimeter.

## Example (Prahari) and honest scope

This is a **runtime / infrastructure** control, so Prahari's role is to *require and evidence* it, not to be the security layer. Prahari governs which models exist, their tier, and their consumer-facing flag — which determines the depth of security review a model needs — and holds the secure-integration checklist and access-control review as evidence against the model. The actual access controls, API authentication, and cyber safeguards live in the serving stack and platform (this is where a request-path gateway and your existing IAM/network controls sit). Prahari makes the requirement explicit and auditable; it does not enforce it in the request path.

## Common mistakes

- **"It's internal, so it's safe."** Para 58 covers all interfaces and integrations, internal ones included.
- **Over-broad model credentials.** A model service account with wide access is the new vulnerability Para 58 forbids.
- **Securing the model but not the integration.** The API/integration is the attack surface as much as the model itself.
- **Treating AI as exempt from standard cyber controls.** Para 58 says the opposite — extend them to AI, don't carve AI out.

---

*Cite as:* **Prahari Control Reference — Para 58** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
