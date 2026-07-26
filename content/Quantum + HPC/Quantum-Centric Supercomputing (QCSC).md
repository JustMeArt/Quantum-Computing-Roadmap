# Quantum-Centric Supercomputing (QCSC)
#qc/hpc #qc/hardware

IBM's stated three-stage roadmap (as of 2026 — a target, not a guarantee) for integrating quantum processors into classical HPC infrastructure, tracking the same underlying timeline as [[Error Correction (EC)|the hardware roadmap]] but describing *how the systems get wired together* rather than what the QPU itself can do.

## The three stages

1. **Quantum as co-processor to HPC** (~2026–2028) — specialized offload engines, quantum hardware co-located with existing HPC systems, post-selected error correction.
2. **Heterogeneous Quantum+HPC Systems** (~2028–2031) — tight coupling between quantum and classical resources, advanced middleware purpose-built for hybrid algorithms, unified scheduling across both, near-time conditional error correction.
3. **Tightly Integrated Quantum+HPC Systems** (~2031–2034) — co-designed heterogeneous systems from the ground up, a single unified programming model spanning quantum and classical resources, interoperable high-performance fabric, multi-tenant execution, real-time error correction.

**Key insight:** this maps directly onto [[Error Correction (EC)|the hardware side]]'s progression from noisy-and-mitigated to fault-tolerant — Stage 1 is today's [[Error Suppression and Mitigation — Overview|Error Mitigation section]] reality, Stage 3 assumes the Starling/Blue Jay fault-tolerant hardware [[Error Correction (EC)|already described there]]. Two parallel roadmaps (hardware capability, integration architecture) converging on the same fault-tolerant endpoint.

## Qiskit Runtime's role

Positioned specifically as the layer that reduces classical-quantum **latency** — the round-trip cost of a classical optimizer calling back into a QPU repeatedly (as in [[Variational Quantum Eigensolver (VQE)|VQE]]'s loop) is itself a bottleneck QCSC's middleware stages are designed to shrink.

## Related
- [[Error Correction (EC)]] — the parallel hardware-capability roadmap
- [[What is HPC]]
- [[Why Quantum Needs HPC]]
- [[The Quantum+HPC Software Stack]]

## Self-Check
- Could you name the three QCSC stages and, for each, say what actually changes about how a QPU is used?
- Why does this roadmap track the same timeline as the hardware fault-tolerance roadmap in [[Error Correction (EC)]]?
- Why does classical-quantum *latency* matter enough to be a named design goal for Qiskit Runtime?
