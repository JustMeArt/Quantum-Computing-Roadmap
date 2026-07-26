# Qiskit Patterns (Map–Optimize–Execute–Post-process)
#qc/workflow

The standard 4-step workflow for running a quantum computation:

1. **Map** — design the abstract circuit for the problem (gates, qubits, observable)
2. **Optimize (Transpile)** — adapt the circuit to the target backend's native gates & connectivity — see [[Transpilation]]
3. **Execute** — run using a [[The Primitives Family|primitive]] (`Sampler` for bitstring counts, `Estimator` for expectation values of an [[SparsePauliOp|observable]])
4. **Post-process** — analyze/interpret the results (e.g. compare fidelity, plot distributions)

## Related
- [[Transpilation]]
- [[SparsePauliOp]]
- [[Noisy Execution and Fidelity]]
- [[The Primitives Family]] — what "Execute" actually dispatches to
- [[QuantumCircuit Basics]] — what "Map" actually builds
- [[Why Quantum Needs HPC]] — the same four steps, reframed at HPC scale

## Self-Check
- Could you name all four steps of Qiskit Patterns in order, and explain what each one does?
- Why does "Optimize" (transpile) have to happen between "Map" and "Execute," not before or after?
- Which primitive would you use for "Execute" if you wanted expectation values instead of bitstring counts?
