# The Quantum+HPC Software Stack
#qc/hpc #qc/workflow

The layered software architecture that makes [[Quantum-Centric Supercomputing (QCSC)|QCSC]] actually runnable, top to bottom:

1. **User layer** — Python/Qiskit APIs, C/C++ APIs, the [[The Primitives Family|Executor primitive]] for box-annotated programs.
2. **Application middleware & orchestration** — MPI and other distributed-programming models, schedulers, containers, telemetry.
3. **System orchestration** — workflow management, resource management, and **QRMI**.
4. **Compute** — multi-tenancy support, co-located classical and quantum backends.

## QRMI — Quantum Resource Management Interface

**Key insight:** QPUs are scarcer and harder to schedule than GPUs — there's no equivalent of spinning up another GPU node on demand, and a QPU's calibration state changes over time in ways a GPU's doesn't. QRMI exists specifically to standardize **vendor-neutral** scheduling of this scarce, stateful resource across an HPC system, the same role Slurm plays for classical compute but adapted to quantum's constraints.

## Concrete architecture

```
Slurm login node
  → classical job queue / circuit job queue
    → middleware (Qiskit primitives handler)
      → classical compute nodes (CPU)  /  virtual quantum nodes (vQPU)
        → quantum computer (DA API, controllers)
```

A **benchmark suite** — Benchpress — spans chemistry, physics models, and discrete/binary optimization problem categories, used to evaluate this stack's actual end-to-end performance rather than just individual component speed.

## Related
- [[Quantum-Centric Supercomputing (QCSC)]]
- [[The Primitives Family]]
- [[What is HPC]]

## Self-Check
- Could you walk through the four layers of this stack, from user code down to the QPU?
- Why does QPU scheduling need its own interface (QRMI) instead of reusing GPU scheduling tools?
- What role does a benchmark suite like Benchpress play that testing individual components wouldn't cover?
