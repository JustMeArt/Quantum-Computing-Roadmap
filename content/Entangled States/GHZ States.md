# GHZ States
#qc/entanglement

Generalizes [[Bell States]] to N qubits — all qubits maximally correlated:

$$|\text{GHZ}_N\rangle = \frac{1}{\sqrt2}(|00\ldots0\rangle + |11\ldots1\rangle)$$

Measuring gives all-0s or all-1s, 50/50, never mixed.

**Two naive constructions**, both depth N (no advantage over each other):
1. **Fan-out**: H(0), then CX(0,1), CX(0,2), …, CX(0,N-1) — all share qubit 0 as control, so none parallelize.
2. **Chain**: H(0), then CX(0,1), CX(1,2), … — each CX depends on the previous, purely sequential.

**Reducing depth** is the whole story of this topic — see [[Circuit Depth]], [[Start From the Middle]], and [[Recursive Fan-Out]].

## Related
- [[Bell States]]
- [[Circuit Depth]]
- [[Bridge Gate Identity]]
- [[Heavy-Hex Topology]] — building GHZ states that respect real hardware connectivity
- [[Dynamic GHZ via Qubit Reuse]] — a third construction: mid-circuit measurement + feedforward instead of more connectivity or more depth-optimization

## Self-Check
- Why do fan-out and chain constructions both have depth N, despite looking structurally different?
- What outcome do you always get when measuring a GHZ state, and why never a mix?
- Name the three different ways this vault builds a GHZ state, and what each one optimizes for.
