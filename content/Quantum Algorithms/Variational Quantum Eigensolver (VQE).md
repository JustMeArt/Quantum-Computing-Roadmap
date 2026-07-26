# Variational Quantum Eigensolver (VQE)
#qc/algorithms #qc/gates

Among the earliest algorithms designed specifically for **noisy** quantum computers — the near-term counterpart to [[Quantum Phase Estimation (QPE)|QPE]]'s deep, fault-tolerant-era circuits. Build a [[Parameterized Circuits|parameterized circuit]] $|\psi(\vec\theta)\rangle$, measure it against the Hamiltonian's Pauli terms, and let a classical optimizer search for the energy-minimizing $\vec\theta$.

## The loop

```
1. Prepare |ψ(θ)⟩ on the QPU — a hardware-efficient ansatz:
   layers of Ry/Rz single-qubit rotations + CNOT entangling gates, repeated
2. Measure each Pauli term P_j of H = Σ h_j P_j (see [[SparsePauliOp]])
3. Combine: E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩ = Σ_j h_j ⟨ψ(θ)|P_j|ψ(θ)⟩
4. Classical optimizer proposes new θ to reduce E(θ)
5. Repeat from step 1 with the new θ
```

**Key insight:** this is exactly the "structure once, values many times" pattern from [[Parameterized Circuits]] — the same ansatz circuit is transpiled once, then rebound with new parameter values every optimization iteration, which is what makes hundreds of iterations practical at all.

## Pros and cons

**Pros:** works with any viable parameterized circuit (no restriction to a specific ansatz family), and classical optimization can partially compensate for coherent quantum errors by simply optimizing around them.

**Cons:** each energy evaluation needs many shots for adequate precision (see [[Measurement and Collapse]]); classical parameter optimization is genuinely hard and slow in practice, with no general convergence guarantee — and any assumption strong enough to *guarantee* convergence would typically also make the problem classically tractable, defeating the point.

## Related
- [[The Ground-State Problem]]
- [[Parameterized Circuits]] — VQE is the worked example that note only namedropped
- [[SparsePauliOp]]
- [[Quantum Phase Estimation (QPE)]]
- [[Quantum Krylov Methods]]
- [[Hybrid Workflow Patterns — VQE and SQD at HPC Scale]] — what HPC does around this loop
- [[The Variational Principle as a Trust Tool]] — why this loop's output is self-verifying
- [[Quantum Neural Networks (QNN)]] — the same circuit→measure→classical-optimizer loop, retargeted at a supervised-learning loss instead of energy minimization

## Self-Check
- Could you walk through VQE's five-step loop from memory?
- Why does VQE need a classical optimizer in the loop at all, instead of computing $\theta$ directly?
- Why is "no general convergence guarantee" not just a minor caveat, but a real practical problem for VQE?
