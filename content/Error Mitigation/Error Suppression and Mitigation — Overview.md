# Error Suppression and Mitigation — Overview
#qc/mitigation #qc/noise

Four categories of techniques exist for dealing with noise on today's quantum hardware. They differ in *when* they act, *what* they cost, and whether they fix, flag, or statistically correct errors.

| Category | What it does | Cost type |
|---|---|---|
| **[[Error Correction (EC)]]** | Encodes qubits redundantly; syndromes detect and fix errors fault-tolerantly | Extra qubits (prohibitive near-term) |
| **Error Detection (ED)** | Flags corrupted shots and discards them via post-selection | Reduced usable sample size |
| **Error Mitigation (EM)** | Corrects the *statistics* across many noisy runs so the expectation value estimate is closer to ideal | More shots (time overhead) |
| **Error Suppression (ES)** | Reshapes noise during execution (DD, PT) | Modest circuit overhead |

This section focuses on **mitigation** and **suppression** — the two categories Qiskit Runtime's `Estimator` primitive implements.

## The runtime default

At `resilience_level=1` (default), `Estimator` already applies [[EstimatorOptions and the Five Mitigation Knobs|TREX]] — twirled readout error extinction. Everything else is opt-in.

## Why whole-circuit switches aren't enough

Qiskit Runtime exposes suppression and mitigation as **circuit-wide policies** — one setting applied uniformly to every gate or layer. This is sufficient for small workloads but has two gaps:

1. **No per-layer control** — PEA and PEC internally use per-layer noise models, but you cannot inspect or override per-layer noise, or apply different strategies to different layers.
2. **No observable rewriting** — you cannot absorb learned noise into the *observable* rather than the circuit (this is what [[PNA — Propagated Noise Absorption|PNA]] does).

These gaps are what [[Samplomatic — Boxes and Annotations|Samplomatic]] and the Chapter 3 add-ons ([[PNA — Propagated Noise Absorption|PNA]], [[SLC — Shaded Lightcones|SLC]]) fill.

## Related
- [[EstimatorOptions and the Five Mitigation Knobs]]
- [[Samplomatic — Boxes and Annotations]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[PNA — Propagated Noise Absorption]]
- [[SLC — Shaded Lightcones]]
- [[1D Ising Chain and the Mirror Trick]]
- [[Running on Real IBM Hardware]] — the fake-backend-vs-hardware gap this chapter closes
- [[Error Correction (EC)]] — the fourth category, now covered in full

## Self-Check
- Could you explain the difference between error correction, detection, mitigation, and suppression to someone new to this?
- Why does this section focus on mitigation and suppression instead of correction?
- What are the two specific gaps that whole-circuit switches leave open, and what fills them?
