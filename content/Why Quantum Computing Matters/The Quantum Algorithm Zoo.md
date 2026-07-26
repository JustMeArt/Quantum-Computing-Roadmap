# The Quantum Algorithm Zoo
#qc/algorithms #qc/moc

A running map of what's actually been discovered since [[Deutsch's Algorithm|Deutsch]] kicked things off in 1985. Maintained in full as the [Quantum Algorithm Zoo](https://quantumalgorithmzoo.org/) (Stephen Jordan, 400+ entries) — this note is the milestone skeleton, not the exhaustive list.

## Milestone timeline

| Year | Algorithm | Significance |
|---|---|---|
| 1985 | [[Deutsch's Algorithm]] | First proof a quantum computer needs fewer queries than classical |
| 1992 | [[The Deutsch-Jozsa Algorithm]] | First proven **exponential** speedup |
| 1994 | Simon's algorithm | Exponential speedup for a hidden-structure problem, direct precursor to Shor's |
| 1994 | **Shor's algorithm** | Superpolynomial speedup for integer factoring — breaks RSA |
| 1995 | **Quantum Phase Estimation (QPE)** | Extracts eigenvalues efficiently; the subroutine underlying Shor's and many later algorithms |
| 1996 | [[Grover's Algorithm]] | Quadratic speedup for unstructured search |

> ⚠️ **Honest gap:** Shor's and QPE's internals are named here as milestones but not derived in this vault. **Grover's algorithm is now derived in full** — see [[Grover's Algorithm]] for the oracle/phase-kickback mechanism, the geometric rotation picture, and the optimal-iteration-count proof.

## Categorized by speedup type

- **Factoring** (superpolynomial) — Shor's algorithm.
- **Quantum Simulation** (superpolynomial) — the general problem of simulating physical Hamiltonians; see [[Hamiltonian Simulation — Why It's Hard]] and the rest of the Quantum Algorithms section for [[Trotterization]]/[[Quantum Phase Estimation (QPE)|QPE]]-based approaches.
- **Searching** (polynomial) — [[Grover's Algorithm|Grover's algorithm]] and variants.
- **Abelian Hidden Subgroup** (superpolynomial) — the general algebraic framework Shor's algorithm is a special case of.
- **Machine Learning** (varies) — speedups here are more use-case-dependent and contested than the others.
- **Combinatorial Optimization** (heuristic, no proven speedup) — [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]], unlike the entries above, has no proven asymptotic speedup; it's a practical near-term heuristic for problems like TSP and Max-Cut.
- **Verifying Matrix Products** (polynomial).
- **Pattern Matching, String Rewriting, Knot Invariants** (superpolynomial) — narrower, more specialized results.

## Few foundational ideas, many variants

Nearly every entry in the zoo traces back to one of three foundational ideas, each with its own "inspiration" lineage:

| Inspiration | Foundational idea | General goal | Resulting algorithms |
|---|---|---|---|
| Physics | Adiabatic & counter-diabatic evolution | Resolve the energy spectrum of Hamiltonians | [[QAOA — Quantum Approximate Optimization Algorithm]], DC-QAOA / BF-DCQO, Floquet engineering |
| Math | Quantum Fourier Transform | Solve discrete problems | [[Quantum Phase Estimation (QPE)]], Shor's, HHL |
| CS | Quantum oracles & machine learning | Build tools for quantum solvers | [[Grover's Algorithm]], amplitude amplification, DQI, quantum neural networks |

This is a good sanity check for "is this a new algorithm or a new variant?" — most new results are a new *variant* along one of these three lineages, not a fourth foundational idea.

## Error correction needed vs. mitigation suffices

Every algorithm above eventually runs into the same wall: noisy hardware. The zoo splits cleanly along how each entry copes with that, and on what time horizon:

- **Hardware pressure — long term (full error correction needed):** algorithms that need genuinely correct answers at scale — resulting technology: surface codes, LDPC codes, bicycle-bivariate codes (e.g. IBM's "Gross code," denoted $[\![144,12,12]\!]$ in the literature, ~10× lower qubit overhead than surface codes at the same error suppression).
- **Hardware pressure — short term (error mitigation suffices):** near-term heuristics like VQE, ADAPT-VQE, and RQAOA get by on problem-based robustness (warm-starts, problem-dependent mixers, [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping|efficient QAOA transpilation]]) plus error mitigation (PEC, ZNE) rather than requiring corrected qubits.

This is the same "Error Mitigation & Reduction SUFFICE" vs. "Error Correction NEEDED" split that determines which algorithms are usable *today* versus which are waiting on the fault-tolerant era — see [[The Full Pipeline of a Quantum Solver]] for where this choice sits in the overall solver pipeline.

## Related
- [[Computational Complexity — P, NP, BQP]] — the formal classes these speedups are claims about
- [[Deutsch's Algorithm]], [[The Deutsch-Jozsa Algorithm]]
- [[Grover's Algorithm]] — the full derivation behind the 1996 milestone above
- [[QAOA — Quantum Approximate Optimization Algorithm]] — the "Combinatorial Optimization" category above, in full
- [[What Quantum Computers Are Good For]] — translating "speedup exists" into "useful for X"
- [[Hamiltonian Simulation — Why It's Hard]] — where "Quantum Simulation" actually gets taught
- [[The Full Pipeline of a Quantum Solver]] — the "Algorithm" stage this note's lineage table zooms in on
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] — a concrete "error mitigation suffices, for now" technique in practice

## Self-Check
- Could you name three algorithms from this timeline and, for each, say whether its speedup is polynomial or superpolynomial?
- Why is it worth knowing Grover's/Shor's *exist* and what they claim, even without knowing how they work internally?
- What's the relationship between Shor's algorithm and the "Abelian Hidden Subgroup" category?
- Which of the three foundational lineages (physics/math/CS) does QAOA belong to, and which does Shor's belong to?
- Why do some algorithms get by on error mitigation today while others are stuck waiting for full error correction?
