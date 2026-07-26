# Hybrid Workflow Patterns — VQE and SQD at HPC Scale
#qc/hpc #qc/algorithms

[[Variational Quantum Eigensolver (VQE)|VQE]] and [[Sample-Based Quantum Diagonalization (SQD)|SQD]] are already covered in depth as algorithms — this note is about what HPC specifically contributes around them, not how they work internally.

## VQE's HPC footprint

HPC generates the molecular integrals and basis sets classically *before* any quantum circuit runs; the QPU only evaluates the parameterized ansatz. **Key insight — VQE is not a single computation, it's repeated classical-quantum loops**, and HPC's job is to batch, parallelize, and validate those loops across many nodes rather than run them one at a time. The same trainability/barren-plateau and shot-count challenges from [[Variational Quantum Eigensolver (VQE)|the algorithm itself]] apply here — HPC scale doesn't remove them, it just gives you more parallel attempts to work around them.

## SQD's HPC footprint

HPC orchestrates and preprocesses (one- and two-body electronic integrals, qubit mapping, circuit preparation) before sampling; after the QPU produces bitstrings, classical HPC — CPU/GPU, MPI-based, multi-node — constructs the effective subspace and performs the diagonalization. The [[Sample-Based Quantum Diagonalization (SQD)|iterative configuration recovery]] step scales the same way: more classical compute means more samples can be corrected and re-diagonalized per round.

## The common pattern

Both are the same shape: a **narrow, specialized quantum kernel embedded inside a much larger classical workflow**. The QPU never sees molecular integrals, optimizer state, or subspace diagonalization directly — it only ever sees a circuit and returns bitstrings or expectation values. Everything else, at whatever scale, is HPC's job.

## Related
- [[Variational Quantum Eigensolver (VQE)]]
- [[Sample-Based Quantum Diagonalization (SQD)]]
- [[Why Quantum Needs HPC]]
- [[The Quantum+HPC Software Stack]]

## Self-Check
- What does HPC actually do in a VQE run that the QPU itself never sees?
- Why does SQD's configuration recovery step specifically benefit from more classical compute?
- Could you describe the "common pattern" both algorithms share, in one sentence?
