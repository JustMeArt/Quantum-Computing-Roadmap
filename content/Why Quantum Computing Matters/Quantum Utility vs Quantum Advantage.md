# Quantum Utility vs Quantum Advantage
#qc/algorithms #qc/hardware

Two precise, easy-to-conflate claims about where the field actually stands.

- **Quantum Utility** (achieved, 2023) — a demonstration that a quantum computer can run quantum circuits **beyond the ability of a classical computer simulating a quantum computer**. IBM's claim rests on the same Nature 618 paper (Kim et al., 2023) already cited in this vault's own [[1D Ising Chain and the Mirror Trick]] note — the 127-qubit utility demonstration that motivated the Trotter-circuit benchmark used throughout the Error Mitigation section.
- **Quantum Advantage** (not yet achieved) — a demonstration that a quantum computer can solve a problem **more accurately, cheaper, or more efficiently than classical computing alone**. This is a strictly higher bar: utility only requires being hard to simulate classically, not being *useful* or *better* than the best classical alternative for the same task.

**Key insight:** these are commonly conflated in pop-science coverage. "We ran a circuit no classical computer could simulate" (utility) is not the same claim as "we solved a real problem better than the best classical method" (advantage) — see [[The Operator Loschmidt Echo (OLE) Benchmark|the honest verdict]] on a real 56-qubit benchmark that walks through exactly this distinction.

## Why the gap is hard to close

Individual gate error rates are low (~0.1%), but failure probability compounds with every additional operation — a circuit with thousands of two-qubit gates accumulates meaningful aggregate error even at excellent per-gate fidelity (see [[Backend Properties]]). IBM has deployed 60 devices under 100 qubits and 29 devices over 100 qubits capable of over 5,000 two-qubit gates since 2016 — utility-scale hardware is real and growing, but closing the remaining gap to advantage is an active research problem, not a solved one.

## The three pillars of advantage

Claiming quantum advantage for real requires all three at once:

- **Complexity** — the problem must be one where classical heuristics genuinely become computationally unviable, either through a proven complexity separation or practical time/memory exhaustion.
- **Trust** — the output must be trustworthy even when it can't be classically double-checked, built up step-by-step through calibration and mitigation — the same way physicists came to trust telescopes and particle colliders before either could be "checked" against a known answer.
- **Utility** — it has to drive real impact (materials science, drug discovery, fundamental physics), not just demonstrate hardware speed on an abstract puzzle.

## The three classical competitors

Whenever a quantum result claims to beat classical methods, it's being compared against the best available classical simulation — and each has a different limiting resource:

| Method | Limited by |
|---|---|
| **State vector** | Qubit count — exact, but memory is exponential (see [[Simulators — Statevector vs Shot-Based]]) |
| **Tensor networks** | Entanglement / bond dimension (see [[Hamiltonian Simulation — Why It's Hard]]) |
| **Pauli path methods** | Operator spreading — how fast Heisenberg-picture operators grow under evolution |

A quantum result only counts as advantage over *all three* — beating one classical method while another would have solved it faster isn't advantage, it's picking a weak opponent.

## The Quantum Advantage Tracker

A community-run platform ([quantum-advantage-tracker.github.io](https://quantum-advantage-tracker.github.io/)) that catalogs real experimental attempts at the gap above, organized into three pathways that map directly onto [[Quantum Advantage — Definition and Criteria|the three problem families]] poised for advantage:

| Pathway | Example on the tracker |
|---|---|
| **Observable Estimation** | Ising-model simulation — see [[The Operator Loschmidt Echo (OLE) Benchmark]] |
| **Variational Problems** | [[Sample-Based Quantum Diagonalization (SQD)]] for molecular ground states |
| **Classically Verifiable Problems** | QAOA for optimization problems |

Two concrete 2025-baseline entries worth knowing: the ground-state energy of Fe₄S₄ (an iron-sulfur cluster, biologically important and classically hard due to strong electron correlation) computed via **TrimCI** (Trimmed Configuration Interaction — builds ground states from random Slater determinants without a pre-selected reference, then trims unimportant components; recovers >99% of the 8×8 Hubbard model's ground-state energy using just $10^{-28}$ of the Hilbert space, beating AFQMC); and the expectation value of the **Loschmidt Echo operator** via Single-Path Monte Carlo at 49 qubits / 648 gates — the same quantity, and largely the same mitigation story, as [[The Operator Loschmidt Echo (OLE) Benchmark]]'s 56-qubit run, just a different baseline entry on the tracker rather than the same experiment.

**Key insight:** the tracker doesn't declare winners — it's a running scoreboard of *attempts*, most of which (like the OLE benchmark in this vault) land on "more trustworthy than one classical method" rather than "advantage over the field."

## Related
- [[What Quantum Computers Are Good For]]
- [[1D Ising Chain and the Mirror Trick]] — the same 2023 Nature paper, from the mitigation-benchmark side
- [[Backend Properties]]
- [[Error Correction (EC)]] — the long-term path to closing this gap for good
- [[Peaked Circuits and Verifiable Quantum Advantage]]
- [[The Operator Loschmidt Echo (OLE) Benchmark]] — a real worked example of exactly this gap
- [[Quantum Advantage — Definition and Criteria]] — the formal two-criterion framework this whole distinction is built on
- [[Sample-Based Quantum Diagonalization (SQD)]] — the Variational Problems pathway's flagship example

## Self-Check
- Could you explain the difference between quantum utility and quantum advantage in your own words?
- Why is "no classical computer could simulate this circuit" a weaker claim than "this beat the best classical method"?
- Why does a low individual gate error rate (~0.1%) not guarantee a low overall circuit error rate?
- Why does claiming advantage require beating *all three* classical competitors, not just one?
- How do the Quantum Advantage Tracker's three pathways map onto the three problem families in [[Quantum Advantage — Definition and Criteria]]?
