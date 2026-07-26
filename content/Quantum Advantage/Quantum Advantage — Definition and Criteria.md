# Quantum Advantage — Definition and Criteria
#qc/algorithms #qc/hardware

Lanes et al. ([Framework for Quantum Advantage](https://arxiv.org/abs/2506.20658), 2025) define quantum advantage as an information-processing task on quantum hardware that satisfies two essential criteria: **(1)** the correctness of the output can be rigorously validated, and **(2)** the result demonstrates a genuine performance separation over classical methods. **Key insight:** criterion 1 isn't one universal test — it splits into three different sub-strategies depending on the problem, and which one applies determines how you'd even go about trusting the answer: rigorous error bars/bounds (fault-tolerant computing, justified error mitigation, or post-selected error detection), efficient classical verification of an otherwise-hard-to-find answer (sampling problems — see [[Peaked Circuits and Verifiable Quantum Advantage]]), or variational scoring against a known bound (ground-state/optimization problems — see [[The Variational Principle as a Trust Tool]]). When none of the three apply — general observable estimation with no built-in check — you're in the hardest case this vault documents: [[The Operator Loschmidt Echo (OLE) Benchmark]].

Criterion 2 is harder than it sounds: no unconditional quantum-vs-classical separation has been proven in general, so every claimed separation currently rests either on the best *known* classical algorithm or on complexity-theoretic assumptions — meaning any advantage claim must be tested against both today's classical methods and plausible future classical improvements, not a fixed goalpost.

## Three problem families poised for advantage

- **Sampling problems** — generating probability distributions a classical computer can't feasibly reproduce, but whose specific output can be checked once produced.
- **Variational principle problems** — finding ground states or optimal solutions, where the answer can be scored and compared even without knowing the true optimum in advance.
- **Expectation values of observables** — measuring physical properties of quantum systems; the hardest family, since there's often no independent classical ground truth at all.

## What has to work together

No single piece of hardware or software gets you there alone: Quantum Error Correction (QEC), Quantum Error Mitigation (QEM), and Error Detection each address a different failure mode and have to work in concert with high-fidelity hardware (tunable-coupler superconducting qubits, dynamic circuits with mid-circuit measurement). The orchestration layer for all of this at scale is [[Quantum-Centric Supercomputing (QCSC)]], where QPUs, CPUs, and GPUs each handle the part of a hybrid workflow they're best suited for.

## Related
- [[Quantum Utility vs Quantum Advantage]] — the utility/advantage distinction this framework formalizes, plus the Quantum Advantage Tracker that catalogs real attempts against it
- [[Peaked Circuits and Verifiable Quantum Advantage]] — a concrete instance of the "efficient classical verification" sub-strategy
- [[The Variational Principle as a Trust Tool]] — a concrete instance of the "variational scoring" sub-strategy
- [[The Operator Loschmidt Echo (OLE) Benchmark]] — the hardest case, where none of the three sub-strategies apply directly
- [[Quantum-Centric Supercomputing (QCSC)]]

## Self-Check
- Why does "criterion 1" split into three different sub-strategies instead of being one single test you can always apply?
- If no proven quantum-classical separation exists in general, what does it actually mean to satisfy "criterion 2" for a specific task?
- Can you map each of this note's three problem families onto one of the vault's three existing Quantum Advantage notes (Peaked Circuits, Variational Principle, OLE Benchmark)?
