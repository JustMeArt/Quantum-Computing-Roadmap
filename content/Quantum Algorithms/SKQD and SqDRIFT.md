# SKQD and SqDRIFT
#qc/algorithms #qc/math

Two variants of [[Sample-Based Quantum Diagonalization (SQD)|SQD]] that add a **provable convergence guarantee** — a step up from SQD's more heuristic self-consistent recovery.

## SKQD — Statistical/Sample-based Krylov Quantum Diagonalization

Combines the sampling idea from SQD with the [[Quantum Krylov Methods|Krylov subspace]] construction: samples bitstrings from time-evolution circuits $e^{-ik\epsilon\hat H}$ at increasing depths $k=1,2,\dots,T$ applied to a reference state, building up a Krylov-like sampled subspace instead of a single fixed circuit's output. **Convergence is provable** given three conditions all hold at only *polynomial* (not exponential) smallness in system size $n$:

1. The reference state's overlap with the true ground state is $1/\text{poly}(n)$.
2. The spectral gap is $1/\text{poly}(n)$.
3. The ground state is approximately sparse.

Not suitable for fully ab-initio chemistry (it needs a lattice/model Hamiltonian with well-defined hopping terms) — but a natural fit for lattice/impurity models, e.g. the Anderson impurity model $H=H_\text{bath}+H_\text{imp.}+H_\text{hyb.}$ used in dynamical mean-field theory (DMFT) workflows, where SKQD results have matched DMRG closely across multiple interaction strengths. Reference: arXiv:2501.09702.

## SqDRIFT — randomized time evolution

A qDRIFT-style approach: decompose $H=\sum_k \hat h_k$ into individual terms, randomly sample a *sequence* of terms weighted by $|h_k|$, and apply the sampled sequence as a product of small time-evolution exponentials $\prod\exp(-i\Delta t\,\hat h_k)$ — convergent, and hardware-friendly since it never needs a full [[Trotterization|Trotterization]] of the entire Hamiltonian at once. Reference: arXiv:2508.02578.

## Sparsity is basis-dependent

**Key insight:** whether a ground state is "approximately sparse" — the assumption SKQD's convergence proof leans on — depends on your choice of basis, not just the physics. Fermionic Gaussian unitaries (orbital rotations) can be applied efficiently *classically* to rotate into a basis (e.g. natural orbitals) where sparsity is much better, which is exactly why basis choice is a real, practical lever for these methods, not just a mathematical footnote.

## Real-world scale

N₂ at 58 qubits, Fe₄S₄ at 77 qubits, a 100-qubit SqDRIFT run computing a Dyson-orbital correlation energy (*Science*, 2026), and a coronene active-space calculation (24 electrons/24 orbitals) benchmarked against HCI, CCSD, and FCIQMC classical methods.

## Related
- [[Sample-Based Quantum Diagonalization (SQD)]]
- [[The LUCJ Ansatz]]
- [[Quantum Krylov Methods]] — the Krylov idea SKQD borrows
- [[Trotterization]] — the time-evolution machinery SqDRIFT randomizes over

## Self-Check
- What does SKQD add on top of plain SQD, and why does that matter?
- Could you name the three conditions SKQD's convergence proof depends on, and explain why "polynomial, not exponential" smallness matters for each?
- Why is sparsity "basis-dependent," and what practical lever does that give you?
