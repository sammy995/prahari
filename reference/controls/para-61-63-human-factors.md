# Para 61–63 — Human factors: bias, competency, and reviewing overrides

[← Control reference](README.md) · RBI MRM 2026, Chapter V-B.3

## Verbatim

> **61.** Guard against **automation bias, over-reliance, and decision fatigue** among staff who oversee or act on model outputs.
> **62.** Oversight personnel shall have the **expertise to understand and challenge** the model, and the authority to **override and escalate**.
> **63.** **Periodically review** overrides, interventions, incidents and **near-misses**, and **strengthen** the oversight arrangements accordingly. (Structured AI-incident / near-miss reporting — cf. FREE-AI report, Annex VI.)

## Intent

The kill switch and human-in-command of [Para 60](para-60-human-oversight.md) only work if the *humans* work. Para 61 names the human failure modes: people rubber-stamp model output (automation bias), lean on it past its competence (over-reliance), and miss things when tired (decision fatigue). Para 62 sets the bar for the overseer — enough expertise to actually *challenge* the model, plus the standing to override and escalate; an under-qualified reviewer is theatre. Para 63 closes the learning loop: the override and incident log is not just kept, it is **reviewed** periodically and the arrangements are *strengthened* — including near-misses, where harm was avoided but the warning is real. Together these turn "a human is in the loop" into "a capable human, watched and improving".

## Expected controls

- An **oversight policy** that designs against automation bias / over-reliance / fatigue — e.g. reviewer rotation, decision-volume limits, mandatory independent checks on high-tier outputs (Para 61).
- A **reviewer-competency attestation** per model and a defined **escalation path**; overseers have authority to override (Para 62).
- An **override / intervention / incident / near-miss log**, fed into a **periodic review** that can change the oversight design (Para 63) — building on the override log from [Para 60](para-60-human-oversight.md).
- A standard **AI-incident / near-miss report** format, exportable (Para 63; FREE-AI Annex VI as a template).

## Evidence required

- The oversight policy and evidence of fatigue/bias mitigations (e.g. rotation schedules).
- Competency attestations for the people overseeing each model, and the escalation path.
- The override/incident/near-miss log and minutes of its periodic review, showing arrangements were strengthened.

## Example (Prahari) and honest scope

Prahari holds the **records and cadence**, not the human judgement. The override / intervention / near-miss log attaches as evidence (the same log [Para 60](para-60-human-oversight.md) requires for the kill switch), and the periodic-review output is recorded against the oversight policy. Reviewer-competency attestations and the escalation path attach per model. What Prahari does **not** do is assess whether a reviewer is actually competent or detect automation bias in real time — those are RE judgements and process; Prahari requires the attestation, keeps the incident log, and makes a missing or un-reviewed log visible to an examiner. A periodic-review reminder is a natural extension of the existing cadence checks.

## Common mistakes

- **A capable switch, an incapable watcher.** Para 62 fails if the overseer cannot challenge the model — expertise is the control.
- **Keeping the override log but never reading it.** Para 63 requires *periodic review* and improvement, not just retention.
- **Ignoring near-misses.** A near-miss is a free lesson; Para 63 explicitly includes them.
- **No fatigue/bias design.** Para 61 wants the oversight *process* built against human failure modes, not just a named reviewer.

---

*Cite as:* **Prahari Control Reference — Para 61-63** · part of [Prahari](https://github.com/sammy995/prahari) (Apache-2.0). Aligned with the RBI Draft Guidance (2026); re-verify against the final notification.
