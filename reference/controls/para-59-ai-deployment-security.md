# Para 59 — Customer-facing AI: prompt injection, disclosure, human handoff

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.2

## Verbatim

> **58.** AI deployment shall not introduce new vulnerabilities — apply access controls, cyber safeguards, and controls over external interfaces, APIs and integrations.
> **59.** For customer / external-facing AI interfaces, the RE shall in particular:
> **59(i).** apply controls against **prompt injection and adversarial input**, limit session / context persistence, and detect anomalous usage;
> **59(ii).** **disclose to users that they are interacting with an AI** system and its limitations;
> **59(iii).** **offer a switch to human assistance** on request.

## Intent

Once an AI model talks to customers, it becomes an attack surface and a consumer-protection surface at the same time. Para 58 is the general rule (don't let the AI integration open new holes); Para 59 is the customer-facing specialisation. Three obligations sit together deliberately: a **security** control (59(i): prompt injection, session limits, anomaly detection), a **transparency** control (59(ii): tell people it's an AI and what it can't do), and a **fallback** control (59(iii): let them reach a human). A chatbot that is secure but pretends to be human, or honest but offers no human escape, only partially satisfies the paragraph.

## Expected controls

- **Prompt-injection / adversarial-input filtering** at the request boundary, plus session/context-persistence limits and anomalous-usage detection (59(i)).
- A configured, visible **AI disclosure** per customer-facing model, including its stated limitations (59(ii)).
- A **human-handoff path** the user can invoke on request, with the handoff recorded (59(iii)).
- Secure integration baseline for the AI's APIs/interfaces — deny-by-default access, logging (58).

## Evidence required

- The disclosure text actually shown to users, recorded against each customer-facing model.
- Configuration + tests for prompt-injection controls, session limits, and anomaly detection.
- A human-handoff record / log showing the route exists and is used.
- The integration's access-control and interface-security configuration (58).

## Example (Prahari) and honest scope

The [genai-chatbot example](../../examples/genai-chatbot) holds the models this paragraph governs — a customer-support copilot and other generative bots. Prahari records, per customer-facing model, **whether the 59 controls are configured**: the disclosure text, that a prompt-injection control and human-handoff path exist, and the evidence backing each. The **runtime** controls themselves — the in-path prompt-injection filter, the session limiter, the live "talk to a human" button — live in the serving layer (this is where a request-path gateway such as the sibling `agentguard` engine sits). Prahari's job is to *require* these controls for any customer-facing AI model and to *hold the evidence* that they are present and exercised, not to be the live filter.

## Common mistakes

- **Securing the model but hiding that it's AI.** 59(ii) is not optional dressing — disclosure is a named control.
- **No human escape.** 59(iii) requires a *switch to human assistance on request*, not just an FAQ link.
- **Treating prompt injection as a one-time test.** Adversarial input evolves; 59(i) pairs filtering with ongoing anomaly detection.
- **Unbounded session/context.** Long-lived context is itself an injection and data-leak vector (59(i)).
- **Disclosure without limitations.** 59(ii) asks for the AI *and its limitations* — say what it can't do.

---

*Cite as:* **Prahari Control Reference — Para 59** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
