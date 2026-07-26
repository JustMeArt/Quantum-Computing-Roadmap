# What is HPC?
#qc/hpc #qc/hardware

High-performance computing (HPC): thousands of interconnected CPU+GPU nodes working as one system. CPUs orchestrate and handle conventional workloads; GPUs do the massively parallel numerical work. High-speed interconnects (InfiniBand, Slingshot) link nodes together, hierarchical memory and parallel filesystems feed them data, and Slurm (scheduling), Kubernetes (automation), and MPI (distributed computation) coordinate the whole thing. Power budgets run into the tens of megawatts.

## A concrete sense of scale

A representative modern HPC system: 11,520 nodes, 4 GPUs per node (46,080 GPUs total), 250.8 TFLOPS per node, **2,889.2 PFLOPS system peak**, 512 GiB memory per node (5,760 TiB system-wide), ~36.0 MW peak power draw.

**Historical trajectory:** ENIAC (1946) — 500 FLOPS. Cray-1 (1976) — 160 MFLOPS. El Capitan (2024) — 1.7 EXAFLOPS. Roughly 15 orders of magnitude in under 80 years.

## What HPC is actually good at

- **Structured PDE/continuum problems** — climate modeling, computational fluid dynamics, nuclear/plasma physics.
- **Large-scale AI training and inference.**
- **Sampling, uncertainty, and ensembles** — digital twins, Monte Carlo methods, parameter sweeps.

**Key insight:** none of this is what a QPU is good at (see [[Hamiltonian Simulation — Why It's Hard]]) — HPC and quantum computing are solving different parts of the same larger problem, which is exactly why [[Why Quantum Needs HPC|they need to be integrated, not swapped]].

## Related
- [[Why Quantum Needs HPC]]
- [[Quantum-Centric Supercomputing (QCSC)]]
- [[Hamiltonian Simulation — Why It's Hard]] — the specific problem class HPC can't solve alone

## Self-Check
- Could you describe, in your own words, what an HPC system's CPUs and GPUs each contribute?
- Why does the scale example (46,080 GPUs, 36 MW) matter for understanding what "supercomputing" actually means today?
- What kinds of problems is HPC well-suited for, and how does that differ from what a QPU targets?
