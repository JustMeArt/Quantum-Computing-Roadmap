# Why Quantum Needs HPC
#qc/hpc #qc/hardware

**Key insight: quantum computing complements HPC, it does not replace it.** Even a fully quantum-native application still needs a classical supercomputer around it, for reasons that don't go away as hardware improves:

- **Classical control electronics** — every quantum computer is driven by extensive classical infrastructure (see [[What is a Quantum Computer]]); the QPU is never standalone.
- **Classical optimization loops** — algorithms like [[Variational Quantum Eigensolver (VQE)|VQE]] are *fundamentally* iterative classical-quantum loops, not one-shot quantum computations.
- **Pre- and post-processing** — even the most quantum-native applications need classical work before (problem encoding, basis sets, qubit mapping) and after (result interpretation, error mitigation post-processing) the quantum part runs.
- **Most of the workload stays classical** — QPUs target narrow, specialized kernels within a much larger computation; the surrounding orchestration, data movement, and analysis is HPC's job.

## Reframing the workflow

This is the same [[Qiskit Patterns|Map → Optimize → Execute → Post-process]] pattern from earlier in this vault, just viewed at HPC scale: **classical preprocessing on HPC → problem decomposition/encoding → QPU execution of a specialized kernel → HPC postprocessing.** The steps don't change; what changes is that "classical" now means a full supercomputer, not a laptop.

## Related
- [[What is HPC]]
- [[Qiskit Patterns]] — the same four-step pattern, at circuit scale
- [[Variational Quantum Eigensolver (VQE)]]
- [[Quantum-Centric Supercomputing (QCSC)]]

## Self-Check
- Could you explain why "quantum computing complements HPC" rather than replaces it, using VQE as an example?
- Name the four reasons a quantum computer still needs HPC around it, even hypothetically at its best.
- How does this note's four-step workflow map onto [[Qiskit Patterns]]'s Map → Optimize → Execute → Post-process?
