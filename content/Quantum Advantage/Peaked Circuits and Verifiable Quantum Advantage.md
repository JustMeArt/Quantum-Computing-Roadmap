# Peaked Circuits and Verifiable Quantum Advantage
#qc/algorithms #qc/hardware

A **peaked circuit** is one whose measurement outcomes concentrate heavily on a single bitstring rather than spreading across the full output distribution. **Key insight:** a peak can be efficiently verified classically — either by design (you constructed the circuit knowing the answer) or because the peak bitstring is *classically checkable* even without knowing it in advance. [[The Quantum Algorithm Zoo|Shor's algorithm]] is the standard example: its output peak encodes a factor of the number being factored, and checking whether that factor is correct is trivial classical trial division — verifying the answer is easy even though *finding* it was hard.

## Why this matters for trust

This is exactly the kind of problem [[Quantum Utility vs Quantum Advantage|advantage claims]] want: a genuinely hard quantum computation whose output you can still trust, because checking the answer doesn't require re-solving the problem classically.

## The noise problem

Real hardware noise flattens the peak toward the uniform distribution — the very thing that made the circuit's output trustworthy gets washed out by the same noise every circuit in this vault's [[Error Suppression and Mitigation — Overview|Error Mitigation section]] fights. A simple mitigation: **majority voting** across many noisy samples to distill the peak back out, on the assumption that the correct bitstring still appears more often than any single wrong one even under noise. This is described as an active area of research, not a solved problem — more sophisticated peak-recovery techniques than simple majority voting are still being developed.

## Related
- [[Quantum Advantage — Definition and Criteria]] — this is the "classically verifiable" sub-strategy of criterion 1, made concrete
- [[Quantum Utility vs Quantum Advantage]]
- [[The Quantum Algorithm Zoo]] — Shor's algorithm, named there, not derived
- [[Error Suppression and Mitigation — Overview]]

## Self-Check
- Why does a peaked circuit's output being classically checkable not mean the problem itself was classically easy?
- Could you explain, using Shor's algorithm, what makes its output specifically verifiable?
- Why does noise on real hardware threaten exactly the property that makes a peaked circuit useful for advantage claims?
