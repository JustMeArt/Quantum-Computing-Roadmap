# The Full Pipeline of a Quantum Solver
#qc/algorithms #qc/moc

Every quantum algorithm you meet in this vault is really one stage of a five-stage pipeline: **target problem → encoding → algorithm → hardware → post-processing**. **Key insight:** most of the "quantum" part (stage 3) is reused across wildly different problems — QAOA, Shor's, and VQE are all just different choices at stage 3 — while stages 1, 2, 4, and 5 are where a real-world problem actually gets bent into and out of that shared quantum core.

## The five stages

1. **Target problem** — what you actually want to solve: Combinatorial Optimization (MaxCut, MIS, portfolios, scheduling), Cryptography (RSA, elliptic curves), Chemistry/materials (molecular ground states, reactions).
2. **Encoding** — rewriting the problem as qubits: QUBO → Ising via $x_i=(1-Z_i)/2$ for optimization (see [[QAOA — Quantum Approximate Optimization Algorithm]]), binary/decimal → qubit for numeric problems, fermion → qubit (Jordan-Wigner, Bravyi-Kitaev, or a more compact encoding) for chemistry — see [[Hamiltonians and Encoding for Quantum Circuits]] for the full mapping toolkit.
3. **Algorithm** — the quantum core itself: adiabatic/counter-diabatic evolution (e.g. [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]]), QFT-based (e.g. [[Quantum Phase Estimation (QPE)|QPE]], Shor's), or variational (e.g. [[Variational Quantum Eigensolver (VQE)|VQE]], ADAPT-VQE).
4. **Hardware** — making the abstract circuit survive real qubits: circuit compilation for a specific connectivity (see [[Transpilation]]), gate optimization for the device's native gate set, and error correction/mitigation — either full error correction (surface codes, LDPC, bicycle-bivariate codes) for the fault-tolerant future, or mitigation techniques (ZNE, PEC, dynamical decoupling) that suffice today.
5. **Post-processing** — turning raw quantum output back into an answer: computing observables $\langle\psi|H|\psi\rangle$, repairing constraint violations specific to the target problem (e.g. bit-flip correction using problem structure), or decoding (for error-correction-flavored algorithms).

## Why this framing matters

The same five slots recur whether the target problem is combinatorial optimization, chemistry, or (eventually) cryptography — only the specific choice made at each stage changes. Seeing [[Sample-Based Quantum Diagonalization (SQD)|SQD]] and [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]] as two different fillings of the same five slots, rather than as unrelated algorithms, is what makes the "algorithm zoo" navigable — see [[The Quantum Algorithm Zoo]] for how the stage-3 choices themselves cluster by mathematical origin (physics-, math-, or CS-inspired).

## Related
- [[Hamiltonians and Encoding for Quantum Circuits]] — stage 2 in full depth
- [[QAOA — Quantum Approximate Optimization Algorithm]], [[Variational Quantum Eigensolver (VQE)]], [[Quantum Phase Estimation (QPE)]] — stage 3 choices
- [[Transpilation]] — stage 4, hardware compilation
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] — a concrete, optimized version of stage 4 for QAOA specifically
- [[The Quantum Algorithm Zoo]] — how stage-3 algorithm choices group by inspiration and what hardware pressure (mitigation vs. full error correction) they each need

## Self-Check
- Without naming any specific algorithm, what are the five stages every quantum solver pipeline goes through?
- Why does it help to see QAOA and SQD as different fillings of the same five-stage template rather than as unrelated algorithms?
- Which stage does error mitigation belong to, and why does that stage currently have two very different long-term vs. short-term answers?
