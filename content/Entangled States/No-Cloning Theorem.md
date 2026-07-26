# No-Cloning Theorem
#qc/entanglement #qc/math

There is no general operation that copies an **unknown** quantum state. The proof is a short chain of implications: to copy a state, you'd need to know it; to know it, you'd need to measure it; to measure it is to disturb it (see [[Measurement and Collapse]]) — so any attempt to copy an unknown state destroys the information needed to make the copy accurate in the first place.

**Key insight:** this is specifically about *unknown* states. You can always prepare two qubits in the same, already-known state — that's not cloning, it's just preparation done twice. No-cloning only forbids taking an arbitrary, unknown $|\psi\rangle$ and producing a second independent copy of it without already knowing what it is.

## Why this matters

- **Error correction must encode, not copy.** [[Error Correction (EC)|Quantum error correction]] can't protect information the way classical error correction does (majority-vote three copies of a bit) — copying the logical state isn't an option, so stabilizer codes instead spread information redundantly *without* ever producing an independent duplicate.
- **Eavesdropping always leaves a trace.** Anyone trying to intercept and copy an unknown quantum state to read it without detection would need to clone it first — impossible — which is the intuition underlying quantum cryptography's security guarantees.
- **[[Quantum Teleportation]] doesn't violate this.** Teleportation transfers a state, it doesn't duplicate it — Alice's original is destroyed by her measurement in the same step Bob's copy is created. At no point do two independent copies of the unknown state coexist.

## Related
- [[Measurement and Collapse]]
- [[Quantum Teleportation]]
- [[Error Correction (EC)]]
- [[CHSH Inequality and Bell Tests]]
- [[BB84 Quantum Key Distribution]] — the clearest practical illustration of why no-cloning matters: its security proof *is* the no-cloning argument

## Self-Check
- Could you walk through the proof sketch — copy → know → measure → disturb — in your own words?
- Why doesn't preparing two qubits in the same known state count as "cloning"?
- Why does [[Quantum Teleportation]] not violate no-cloning, even though Bob ends up with Alice's original state?
