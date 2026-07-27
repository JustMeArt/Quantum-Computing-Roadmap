# QC Study Roadmap
#qc/moc

<pre class="blackhole-mark">  ...
    .:.
      .:.
        .::.
          .:*.
            .*#:.                               ..
              .##*:.                        .:::*#*.
                :###*::..         .......:**#*.:*:::
                 .###*:...::::::**############:.#.::
                  :#:..*####**::**###*::#####*..:.:.
                   ..:###*..      ...  *####:..:..
                    :*##:            .:####:.:..
                   .*##:             .###:..:.
                   ::##:             :#*::.:
                  .::###.          .*#:.:#.
                  ::###*...     .:*#*:.....
                 ::*###. ..:::*##*:.... .*:
               ..:#####*#####*:.. .....:##*
             ...*:*####**::.  ..... .::**##*.
           ...:.::::::::.......          ..*#:
           *..*:::.........                 .:..
           .::....                             ...
                                                  ..</pre>

Map of Content for a self-directed quantum computing curriculum, built up from lecture material, hands-on labs, and other resources along the way. Central hub — everything links back here.

## Concept Map

### Absolute Basics
- [[What is a Quantum Computer]] (the physical device and why it's not "a faster classical computer")
- [[What is a Qubit]] (state vector, ket notation, normalization)
- [[Superposition]] (interference, not classical probability)
- [[Bloch Sphere]] (the geometric picture — and where it stops applying)
- [[Measurement and Collapse]] (the Born rule, why quantum programs are inherently probabilistic)

### Programming a Quantum Computer
- [[QuantumCircuit Basics]] (registers, adding gates, `.compose()`, drawing)
- [[The Primitives Family]] (Sampler vs Estimator vs Executor, PUBs, local vs Runtime)
- [[Parameterized Circuits]] (`Parameter`/`ParameterVector`, why transpile-once-bind-many matters)
- [[Simulators — Statevector vs Shot-Based]] (exact amplitudes vs sampled counts, fake backends)

### Foundations
- [[Pauli Operators]] → [[SparsePauliOp]]
- [[X Gate]], [[H Gate]], [[CX Gate and Entanglement]]
- [[Z Gate and Relative Phase]] → [[S and T Gates]]
- [[Tensor Products and Multi-Qubit States]] (how single-qubit states combine into $2^n$-dimensional multi-qubit states)
- [[Why Gates Are Unitary]] (derived from norm-preservation, not just asserted)
- [[Universal Gate Sets and the Clifford Group]] (the Gottesman-Knill theorem — why non-Clifford gates are what make a circuit quantum-hard)

### Why Quantum Computing Matters
- [[Quantum Speedup — Ingredients and Myths]] (superposition + entanglement + interference — and why "evaluate everything at once" is a myth)
- [[Deutsch's Algorithm]] (the first concrete proof: 1 query vs. 2, via phase kickback)
- [[The Deutsch-Jozsa Algorithm]] (the n-qubit generalization — first proven exponential speedup)
- [[Computational Complexity — P, NP, BQP]] (what "speedup" formally means, and the Church-Turing caveat)
- [[The Quantum Algorithm Zoo]] (the milestone timeline — Grover/Shor/QPE named, not yet derived here)
- [[What Quantum Computers Are Good For]] (three problem-area categories + named industry applications)
- [[Quantum Utility vs Quantum Advantage]] (precise definitions, and an honest read on where things actually stand)

### Entangled States
- [[Bell States]] (2-qubit) → [[GHZ States]] (N-qubit) → [[Dynamic GHZ via Qubit Reuse]] (connectivity-free, via feedforward)
- [[CHSH Inequality and Bell Tests]] (the experimental proof entanglement isn't hidden pre-agreed answers)
- [[Quantum Teleportation]] (transferring an unknown state using one Bell pair + a classical channel)
- [[No-Cloning Theorem]] (why teleportation isn't cloning, and why error correction can't just copy)

### Quantum Communication
- [[E91 — Entanglement-Based Quantum Key Distribution]] (Bell-pair distribution + a live CHSH-violation check as the eavesdropping signal — reuses [[CHSH Inequality and Bell Tests]] directly as a security primitive, not just a physics demo)
- [[BB84 Quantum Key Distribution]] (prepare-and-measure QKD; basis-mismatch error rate as the eavesdropping signal; the practical, concrete face of [[No-Cloning Theorem]])

### Depth & Optimization
- [[Circuit Depth]] (what it is, how to compute it by hand) → [[Circuit Introspection Cheat Sheet]] (the built-in tooling equivalent)
- [[Start From the Middle]] (halves depth)
- [[Recursive Fan-Out]] (log-depth, exponential improvement)

### Hardware Reality
- [[Qiskit Patterns]] (Map → Optimize → Execute → Post-process)
- [[Transpilation]]
- [[Heavy-Hex Topology]] → [[Coupling Map and Topology]] (the general concept behind it)
- [[Physical vs Logical Qubits and Layout]]
- [[SWAP Overhead and Routing]] (the cost of ignoring topology)
- [[Bridge Gate Identity]] (alternative to SWAP)
- [[Backend Properties]] (basis gates, CLOPS, gate/readout errors, T1/T2 — where all of the above gets its numbers from)
- [[Running on Real IBM Hardware]] (the end-to-end workflow, tying the whole section together)
- [[Qiskit API Gotchas]] (running list of API traps encountered along the way)
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] (why circuit-to-hardware mapping is NP-hard in general, the SWAP-strategy theorem, and SAT-based mapping — real gate-count numbers on a 50-node problem)

### Noise & Error Models
- [[Density Matrix]] (the formalism: pure vs. mixed states)
- [[Depolarizing Noise]] (isotropic, simplest model) → [[Pauli Error Model]] (directional generalization) → [[Thermal Relaxation]] (time-dependent, not per-gate)
- [[Bit-flip and Phase-flip Sensitivity]] (why *which basis you measure in* determines what noise you can even see)
- [[Noisy Execution and Fidelity]] (why all of this matters: naive vs. topology-aware circuits under real noise)
- [[Physical Decoherence Mechanisms]] (the actual physical causes underneath the toy noise models: charge/flux noise, dielectric loss, quasiparticle poisoning, crosstalk)
- [[Coherent vs Incoherent Gate Errors]] (quadratic vs. linear vs. constant depth-scaling — and why twirling deliberately converts one into the other)
- [[Readout as a Confusion Matrix]] (the $2^n\times2^n$ matrix formalism underneath readout error, and what TREX corrects)
- [[Randomized Benchmarking]] (isolating one gate's error rate from SPAM, via reference vs. interleaved Clifford sequences)

### Dynamic Circuits
- [[Dynamic Circuits]] (mid-circuit measurement + reset + conditional ops)
- [[Dynamic GHZ via Qubit Reuse]] (the headline application: long-range entanglement without long-range connectivity)

### Error Mitigation
- [[Error Suppression and Mitigation — Overview]] (the four categories: EC, ED, EM, ES — and why this section focuses on the last two)
- [[Error Correction (EC)]] (stabilizer codes, syndromes, LDPC codes, magic state distillation — the fourth category, in full)
- [[EstimatorOptions and the Five Mitigation Knobs]] (DD, PT, TREX, ZNE/PEA, PEC as circuit-wide switches)
- [[Dressed Gates and Pauli Propagation]] (the Clifford-conjugation algebra underneath all twirling-based methods)
- [[Samplomatic — Boxes and Annotations]] (per-layer control via boxes/annotations → template + samplex)
- [[NoiseLearnerV3 and Pauli-Lindblad Models]] (learning per-layer noise as a sparse Pauli-Lindblad channel on real hardware)
- [[Executor Primitive]] (the box-aware primitive that runs samplex-built programs)
- [[1D Ising Chain and the Mirror Trick]] (the Trotter benchmark circuit + the U†U ideal-answer trick used throughout)
- [[PNA — Propagated Noise Absorption]] (rewrites the observable instead of the circuit)
- [[PEC — Probabilistic Error Cancellation]] (rewrites the circuit via anti-noise sampling; unbiased but exponential overhead)
- [[SLC — Shaded Lightcones]] (prunes PEC's overhead using the observable's causal lightcone)
- [[Zero Noise Extrapolation (ZNE)]] (deliberately amplify noise via gate-folding, then extrapolate back to the zero-noise limit)
- [[M3 — Matrix-Free Measurement Mitigation]] (post-processing readout-error correction via `mthree`, distinct from TREX's execution-time approach)

### Quantum Algorithms
- [[Hamiltonian Simulation — Why It's Hard]] (the motivating problem: exponential state size, and where every classical workaround fails)
- [[Hamiltonians and Encoding for Quantum Circuits]] ($H$ vs. $e^{-iHt}$, Pauli decomposition, Jordan-Wigner/Bravyi-Kitaev, now with a worked JW derivation example)
- [[Trotterization]] (first/second-order product formulas — the same Ising Hamiltonian as [[1D Ising Chain and the Mirror Trick]], taught as technique instead of benchmark)
- [[The Ground-State Problem]] (why it's hard both classically and quantumly, and the assumptions every algorithm leans on)
- [[The Quantum Fourier Transform]] (Hadamard + controlled-phase circuit; $O(n^2)$ vs. classical FFT's $O(N\log N)$ — and why that speedup evaporates once you account for loading real classical data)
- [[Quantum Phase Estimation (QPE)]] (full circuit; QFT now derived, not a black box)
- [[Quantum Chemistry — QPE on H2 (Worked Example)]] (a real H₂ ground-state energy calculation matching the literature value, the Hartree-Fock-vs-random initial-state experiment, and the accuracy-vs-circuit-cost curve)
- [[Variational Quantum Eigensolver (VQE)]] (real ansatz, cost function, the classical-optimizer loop)
- [[Quantum Krylov Methods]] (the middle ground between QPE and VQE; real 44-qubit PEA/ZNE-mitigated experiment)
- [[Sample-Based Quantum Diagonalization (SQD)]] (near-term chemistry: sample → recover → diagonalize classically)
- [[The LUCJ Ansatz]] (the circuit that prepares SQD's input state)
- [[SKQD and SqDRIFT]] (provably-convergent SQD variants, real 50–100 qubit results)
- [[SQD on N₂ (Worked Example)]] (a real chemistry run: LUCJ/CCSD state prep, Heron-vs-Nighthawk hardware mapping, configuration recovery, and the reference-subspace-augmentation "quantum utility" result)
- [[Grover's Algorithm]] (unstructured search; oracle phase kickback; the geometric two-state rotation picture; provably-optimal quadratic speedup)
- [[QAOA — Quantum Approximate Optimization Algorithm]] (combinatorial optimization via alternating cost/mixer layers; QUBO/Ising encoding; warm-starting across depths)
- [[The Partition Problem — QAOA Worked Example]] (a real QUBO→Ising derivation for graph partitioning, plus the transpilation tooling that turns it into a runnable circuit)
- [[Pauli Correlation Encoding (PCE)]] (O(√n)-qubit combinatorial-optimization encoding — pairwise qubit correlations instead of one-qubit-per-variable)
- [[The Full Pipeline of a Quantum Solver]] (MOC: target problem → encoding → algorithm → hardware → post-processing, tying the whole section together)

### Quantum Machine Learning
- [[Data Encoding Circuits (Feature Maps)]] (how classical data becomes a quantum state — angle/Chebyshev encoding, built directly on [[Parameterized Circuits]])
- [[Quantum Neural Networks (QNN)]] (encoding circuit + trainable observable + classical optimizer — [[Variational Quantum Eigensolver (VQE)|VQE's]] loop, retargeted at supervised learning instead of energy minimization)
- [[Quantum Kernel Methods]] (a fidelity kernel feeding a classical SVM — no circuit parameters are trained at all, a fundamentally different way to be a "quantum ML model")

### Quantum Advantage
- [[Quantum Advantage — Definition and Criteria]] (the Lanes et al. two-criterion framework — rigorous error bars + a demonstrable, provisional performance edge — and the three problem families poised for it)
- [[Peaked Circuits and Verifiable Quantum Advantage]] (classically-checkable quantum output, using Shor's algorithm as the example)
- [[The Variational Principle as a Trust Tool]] (why VQE-style estimates are self-verifying, and what isn't)
- [[The Operator Loschmidt Echo (OLE) Benchmark]] (the real 56-qubit `ibm_boston` trust-building experiment, and the honest "not yet advantage" verdict)

### Quantum + HPC
- [[What is HPC]] (thousands of interconnected CPU+GPU nodes; a concrete 2.9 exaflop system)
- [[Why Quantum Needs HPC]] (control electronics, optimization loops, pre/post-processing — QPU never stands alone)
- [[Quantum-Centric Supercomputing (QCSC)]] (IBM's three-stage integration roadmap, parallel to the EC hardware roadmap)
- [[The Quantum+HPC Software Stack]] (the four-layer stack, and QRMI)
- [[Hybrid Workflow Patterns — VQE and SQD at HPC Scale]] (what HPC does around the algorithms already covered)
- [[AI in the Quantum+HPC Loop]] (calibration, mitigation, and compiler optimization, all learned)

### Reading the Literature
- [[The First-Pass Framework for Reading a Quantum Paper]] (5-part reading order, the 3 first-pass questions, author/venue credibility ladder, and a 6-step figure-reading workflow)
- [[Spotting Hype and Omissions in Quantum Claims]] (what's typically missing from bold quantum claims, red-flag patterns, and calibration over cynicism)

## Suggested Study Order
1. Absolute basics — [[What is a Quantum Computer|what a quantum computer physically is]] → [[What is a Qubit|what a qubit is]] → [[Superposition]] → [[Bloch Sphere]] → [[Measurement and Collapse]]. The ground floor everything below is built on; start here with zero prior knowledge.
2. Programming a quantum computer — [[QuantumCircuit Basics]] → [[The Primitives Family]] → [[Parameterized Circuits]] → [[Simulators — Statevector vs Shot-Based]]. The mechanical/code layer every snippet from here on assumes; without this, the rest of the vault reads as unexplained syntax.
3. Gates — [[Pauli Operators]], [[X Gate]], [[H Gate]], [[CX Gate and Entanglement]], [[Z Gate and Relative Phase]]. The vocabulary everything else is written in.
4. Why quantum computing matters — now that you can read gates, see the actual payoff: [[Quantum Speedup — Ingredients and Myths]] → [[Deutsch's Algorithm]] → [[The Deutsch-Jozsa Algorithm]] → [[Computational Complexity — P, NP, BQP]] → [[The Quantum Algorithm Zoo]] → [[What Quantum Computers Are Good For]] → [[Quantum Utility vs Quantum Advantage]]. This is the "why bother" answer, made concrete instead of assumed.
5. Entanglement → Bell states (build intuition for correlation)
6. Quantum Communication — [[E91 — Entanglement-Based Quantum Key Distribution]] → [[BB84 Quantum Key Distribution]]. Bell states and CHSH stop being abstract physics demos and become a working security protocol: E91 catches an eavesdropper via a live CHSH-inequality violation, BB84 via a basis-mismatch error rate — two different mechanisms for the same goal.
7. GHZ states → circuit depth (why depth matters at all)
8. Depth-reduction tricks (middle-out, recursive fan-out) — the "aha" of exponential improvement
9. Transpilation reality check (abstract circuit → real hardware constraints) — later revisited with real numbers in [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]]
10. Heavy-hex topology + coupling maps + layout + bridge identity (designing *with* the hardware graph)
11. Noisy execution — first the black-box comparison ([[Noisy Execution and Fidelity]]), then the mechanisms underneath it: density matrices → depolarizing → Pauli → thermal relaxation, plus how measurement basis reveals different error types
12. Dynamic circuits — feedforward as a third lever (besides depth-reduction and topology-awareness) for building entanglement cheaply
13. Running on real IBM hardware — close the loop from simulation to an actual backend
14. Error suppression/mitigation — the whole-circuit knobs first ([[EstimatorOptions and the Five Mitigation Knobs]]), then the algebra underneath them ([[Dressed Gates and Pauli Propagation]]), then the per-layer machinery that fixes the whole-circuit knobs' blind spots: [[Samplomatic — Boxes and Annotations]] → [[NoiseLearnerV3 and Pauli-Lindblad Models]] → [[Executor Primitive]], applied to [[1D Ising Chain and the Mirror Trick|a real benchmark circuit]], then the Chapter 3 add-ons ([[PNA — Propagated Noise Absorption]], [[PEC — Probabilistic Error Cancellation]], [[SLC — Shaded Lightcones]]), then the fault-tolerant endgame ([[Error Correction (EC)]]) — full loop from "noisy today" to "corrected tomorrow"
15. Quantum algorithms — the capstone: why simulation is hard ([[Hamiltonian Simulation — Why It's Hard]]) → how to encode a real Hamiltonian ([[Hamiltonians and Encoding for Quantum Circuits]]) → [[Trotterization]] → [[The Ground-State Problem]] → derive the [[The Quantum Fourier Transform|QFT]] itself → the three ways to attack the ground-state problem ([[Quantum Phase Estimation (QPE)]] with its [[Quantum Chemistry — QPE on H2 (Worked Example)|H2 worked example]], [[Variational Quantum Eigensolver (VQE)]], [[Quantum Krylov Methods]]) → the near-term chemistry frontier ([[Sample-Based Quantum Diagonalization (SQD)]] → [[The LUCJ Ansatz]] → [[SKQD and SqDRIFT]] → [[SQD on N₂ (Worked Example)|a real N2 worked example]]) → the other landmark algorithms, [[Grover's Algorithm]] and [[QAOA — Quantum Approximate Optimization Algorithm]] (with [[The Partition Problem — QAOA Worked Example|its own worked example]] and the qubit-saving [[Pauli Correlation Encoding (PCE)]]) → zoom back out with [[The Full Pipeline of a Quantum Solver]], tying every stage back to the section that covers it. Everything from Foundations, Programming a Quantum Computer, and Error Mitigation gets used here for real.
16. Quantum Machine Learning — [[Data Encoding Circuits (Feature Maps)]] → [[Quantum Neural Networks (QNN)]] → [[Quantum Kernel Methods]]. Two different ways to put [[Parameterized Circuits]] to work on supervised learning: one trains circuit parameters like VQE does, the other trains nothing quantum at all and just computes a kernel matrix.
17. Quantum advantage — the "how do we know we can trust this" finale: start with [[Quantum Advantage — Definition and Criteria|the formal definition]] itself, then the trust-building tools that satisfy it: [[Peaked Circuits and Verifiable Quantum Advantage]] → [[The Variational Principle as a Trust Tool]] → [[The Operator Loschmidt Echo (OLE) Benchmark]]. Ties back to [[Quantum Utility vs Quantum Advantage]] from step 4, now with a real 56-qubit answer to the question that section could only pose.
18. Quantum + HPC — zooming out to systems scale: [[What is HPC]] → [[Why Quantum Needs HPC]] → [[Quantum-Centric Supercomputing (QCSC)]] → [[The Quantum+HPC Software Stack]] → [[Hybrid Workflow Patterns — VQE and SQD at HPC Scale]] → [[AI in the Quantum+HPC Loop]]. The final answer to "how does any of this actually get deployed for real" — closes the loop from single-qubit basics all the way to exascale integration.
19. Reading the literature — a change of register: [[The First-Pass Framework for Reading a Quantum Paper]] → [[Spotting Hype and Omissions in Quantum Claims]]. Not a physics topic and not required for anything above — a standalone research-literacy skill for once you're reading real papers instead of secondhand material.

## Open Threads
- ~~How does Nighthawk's denser connectivity change the "start from center" strategy? Only introduced as a named contrast to Heron's heavy-hex in [[Coupling Map and Topology]], without a worked comparison.~~ **Partially resolved** — see the Heron (`ibm_kingston`) vs. Nighthawk (`ibm_miami`) interaction-pair mapping exercise added to [[The LUCJ Ansatz]]. That's a worked comparison for LUCJ circuits specifically, not a general "start from center" answer — still open for the depth-reduction strategies in Depth & Optimization.
- Will recursive fan-out still give O(log N) depth on a non-heavy-hex graph? *(Still open.)*
- ~~What does quantum error mitigation actually look like in practice?~~ **Resolved** — see [[Error Suppression and Mitigation — Overview]] and the rest of the Error Mitigation section.
- ~~Error Correction (EC) ... was named only as a contrast category, not covered in depth.~~ **Resolved** — see [[Error Correction (EC)]], written from lecture material on noise, hardware, and error correction. Lighter than a dedicated QEC course, but real; extend additively once richer training material is available.
- Error Detection (ED) is still only a one-line contrast category in [[Error Suppression and Mitigation — Overview]], not covered in depth anywhere yet — open.
- ~~A batch of lecture-slide decks was extracted for content in July 2026.~~ **Fully built out**: [[Error Correction (EC)]], **Why Quantum Computing Matters**, **Quantum Algorithms**, **Quantum Advantage**, **Quantum + HPC** (all four new sections), plus the full reinforcement batch — tensor products & unitarity ([[Tensor Products and Multi-Qubit States]], [[Why Gates Are Unitary]]), S/T gates & the Clifford group ([[S and T Gates]], [[Universal Gate Sets and the Clifford Group]]), teleportation/CHSH/no-cloning ([[Quantum Teleportation]], [[CHSH Inequality and Bell Tests]], [[No-Cloning Theorem]]), and real noise physics ([[Physical Decoherence Mechanisms]], [[Coherent vs Incoherent Gate Errors]], [[Readout as a Confusion Matrix]], [[Randomized Benchmarking]]).
- ~~Grover's algorithm, QAOA, and the QFT itself (used as a black-box inside [[Quantum Phase Estimation (QPE)]] but never derived) were deliberately on hold.~~ **Resolved by a batch of hands-on notebooks** (13 notebooks, extracted and built out July 2026): [[Grover's Algorithm]] and [[The Quantum Fourier Transform]] — both fully derived, closing QPE's "QFT is a black box" honest gap — and [[QAOA — Quantum Approximate Optimization Algorithm]], derived from a from-scratch QUBO/Ising encoding and cost/mixer-unitary construction exercise. The same batch also built two entirely new sections: **Quantum Communication** ([[E91 — Entanglement-Based Quantum Key Distribution]], [[BB84 Quantum Key Distribution]]) and **Quantum Machine Learning** ([[Data Encoding Circuits (Feature Maps)]], [[Quantum Neural Networks (QNN)]], [[Quantum Kernel Methods]]) — plus [[Quantum Chemistry — QPE on H2 (Worked Example)]] and a worked Jordan-Wigner derivation added to [[Hamiltonians and Encoding for Quantum Circuits]]. Several notebooks in the same batch (teleportation, no-cloning, a general exercises notebook) were pure reinforcement or unsolved stubs and produced no vault changes; two exam notebooks were mined instead for Self-Check questions, added to [[CHSH Inequality and Bell Tests]], [[Bell States]], [[Why Gates Are Unitary]], and [[Quantum Teleportation]].
- **Deliberately on hold** (per explicit request): Shor's algorithm and superdense coding. Shor's is still only named, not derived, in [[The Quantum Algorithm Zoo]] — no source material has worked through it yet. Superdense coding's only source notebook left the actual protocol as unsolved student TODOs with no prose fallback either (unlike BB84, whose protocol was fully described in prose even though its code was also left blank) — holding off in case a future resource covers it properly first.
- **A further batch of algorithms lecture slides and a companion hands-on lab** (three notebooks) were extracted July 2026: [[The Full Pipeline of a Quantum Solver]] and [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] from the slides; [[Quantum Advantage — Definition and Criteria]] from the first notebook; [[The Partition Problem — QAOA Worked Example]], [[Pauli Correlation Encoding (PCE)]], [[M3 — Matrix-Free Measurement Mitigation]], and [[Zero Noise Extrapolation (ZNE)]] from the second (**its exercise cells are unsolved** — its content is the markdown/API surface, not confirmed working numbers); [[SQD on N₂ (Worked Example)]] plus enrichments to [[The LUCJ Ansatz]] and [[Sample-Based Quantum Diagonalization (SQD)]] from the third (also unsolved, so the worked example gives the qualitative HF < SQD < classical-reference < reference-augmented-SQD ordering, not literature energy numbers). A separate one-off resource on how to read a quantum paper became the new **Reading the Literature** section — out of scope for the rest of the vault by design.
