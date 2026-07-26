# The Variational Principle as a Trust Tool
#qc/algorithms #qc/math

[[Variational Quantum Eigensolver (VQE)|VQE]]-style ground-state estimates have a property most quantum computations lack: **a built-in correctness check**. The variational principle guarantees $E(\vec\theta)=\langle\psi(\vec\theta)|H|\psi(\vec\theta)\rangle \geq E_\text{ground}$ for *any* trial state — so a lower measured energy is *provably* closer to the true ground state, verifiable without ever knowing the true ground-state energy in advance.

**Key insight:** this is exactly what [[Peaked Circuits and Verifiable Quantum Advantage|peaked circuits]] have and general observable estimation doesn't — a way to know your answer is improving without an independent classical check. Contrast with the honest difficulty in [[The Operator Loschmidt Echo (OLE) Benchmark]]: there, no such built-in guarantee exists, and trust has to be built by other means entirely.

## Where this shows up in practice

[[Sample-Based Quantum Diagonalization (SQD)|SQD]] and its variants ([[SKQD and SqDRIFT]]) are described as "quantum heuristics becoming increasingly competitive" for ground-state problems precisely because of this self-verifying property — every iteration's energy estimate is checkable against the same inequality, giving a natural convergence signal even without a known correct answer to compare against.

## Related
- [[Quantum Advantage — Definition and Criteria]] — this is the "rigorous error bars via the problem's own structure" sub-strategy of criterion 1, made concrete
- [[Variational Quantum Eigensolver (VQE)]] — the algorithm this principle underlies
- [[The Ground-State Problem]]
- [[Sample-Based Quantum Diagonalization (SQD)]]
- [[Peaked Circuits and Verifiable Quantum Advantage]] — the other case where a built-in check exists

## Self-Check
- Could you state the variational principle and explain why it holds for *any* trial state, not just good ones?
- Why does this inequality act as a trust mechanism even when the true ground-state energy is unknown?
- Why don't all quantum computations get this kind of built-in check — what's different about observable estimation in general?
