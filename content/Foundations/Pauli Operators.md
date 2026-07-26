# Pauli Operators
#qc/math #qc/gates

The four fundamental 2x2 matrices acting on a single qubit: **I, X, Y, Z**.

- **I** — identity, does nothing
- **X** — bit-flip (|0⟩↔|1⟩), 180° rotation around X-axis
- **Y** — bit-flip + phase-flip, 180° rotation around Y-axis
- **Z** — phase-flip (|1⟩→-|1⟩), 180° rotation around Z-axis

**Key properties:** Hermitian (→ valid observables) and unitary (→ valid gates). Each squares to I. They anticommute pairwise.

**Why they matter:** any single-qubit Hermitian matrix (observable/Hamiltonian term) is a weighted sum of I,X,Y,Z. Tensor products extend this to any number of qubits — the universal "alphabet" for quantum observables.

## Related
- [[SparsePauliOp]] — how Pauli strings are represented in Qiskit
- [[X Gate]]
- [[Z Gate and Relative Phase]]
- [[Pauli Error Model]] — the same four operators used as a probabilistic noise model instead of deterministic gates
- [[Bloch Sphere]] — the "180° rotation around an axis" language above, made geometric

## Self-Check
- Could you list all four Pauli operators and what each one does to a qubit?
- Why does "Hermitian and unitary" matter — what does each property buy you?
- Why can [[Pauli Error Model|the same four operators]] describe both a deterministic gate and a probabilistic noise model?
