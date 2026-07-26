# Sample-Based Quantum Diagonalization (SQD)
#qc/algorithms #qc/workflow

A near-term, research-level approach to [[The Ground-State Problem]] for quantum chemistry: the ground-state energy is the extremal eigenvalue of a Hamiltonian $H_{x,x'}$ living in a $2^N$-dimensional space — exponentially large and exponentially sparse — but in practice the true eigenvector's amplitudes have only **polynomial support** (only a small number of electron configurations actually matter). SQD exploits this: use a quantum circuit to find *which* configurations matter, then diagonalize classically in just that subspace.

## Mechanics

A quantum circuit prepares $|\psi\rangle$; sampling it gives bitstrings $\mathbf{x}$ with probability $P(\mathbf{x})=|\langle\mathbf{x}|\psi_{QC}\rangle|^2$. Each bitstring parametrizes a **Slater determinant** (e.g. `110101` = a specific electron-orbital occupation pattern — this is exactly the fermion encoding from [[Hamiltonians and Encoding for Quantum Circuits]]). Writing $|\psi\rangle=\sum_{x\in\chi}c_x|x\rangle$ over the sampled set $\chi$, solving

$$\sum_{x\in\chi}\langle y|H|x\rangle\, c_x = E_0\, c_y$$

means building $H$ restricted to the sampled subspace $\chi$ and diagonalizing it **classically** (CPU), after the sampling itself happened on the QPU. The quantum computer's only job is proposing *which basis states are worth including* — the actual linear algebra is classical.

## Self-consistent configuration recovery

Real samples are noisy — some sampled bitstrings violate particle-number conservation, which is physically impossible for the true ground state. **Key insight:** rather than discarding noisy samples, compute the average per-orbital occupancy $n_{p\sigma}=\langle\psi|\hat n_{p\sigma}|\psi\rangle$ from the whole sample set, then probabilistically flip bits in noisy samples (weighted by how far each bit is from the average occupancy and a target filling factor) to restore valid particle number. Recompute occupancies from the corrected samples, iterate — this squeezes real signal out of a noisy QPU rather than throwing noisy shots away.

**Full loop:** Sample (QPU) → postselect + recover configurations (CPU, using occupancies) → project + diagonalize + update occupancies → repeat.

Concretely, the flip-probability weighting is $W_{0\to1}(\text{occ}) = e^{\text{occ}} - 1$ for filling an empty orbital (0 at occupancy 0, $e-1\approx1.718$ at occupancy 1 — never fill an orbital that's usually empty, strongly prefer filling one that's usually occupied) and its mirror $W_{1\to0}(\text{occ})=W_{0\to1}(1-\text{occ})$ for emptying an occupied one. The very first iteration has no measured occupancy yet, so it bootstraps from the **Hartree-Fock occupancy** (the cheap classical mean-field guess — orbitals filled from lowest energy up) as the initial prior, then replaces it with the diagonalizer's own output occupancy each subsequent iteration.

## Reference-subspace augmentation

A useful diagnostic and quality boost: build a purely classical baseline subspace by brute-force enumerating the lowest-excitation-rank Slater determinants around the Hartree-Fock reference (no chemical insight, just systematic enumeration) and diagonalizing in that fixed set alone. This typically beats pure-sampling SQD, since hardware noise can suppress chemically important near-HF configurations that a classical enumeration would never drop. Pinning the best of these classical reference determinants as a guaranteed floor in the subspace — while still letting quantum samples fill the remaining slots each iteration — typically both lowers the energy further and tightens the run-to-run variance. If this reference-augmented result beats the classical-reference-only baseline, that's a concrete, falsifiable instance of **quantum utility**: the quantum sampling contributed configurations no brute-force classical enumeration found on its own.

## Extension: excited states

The same sampled subspace can be reused for excited states via **quantum subspace expansion**: build $|e_i\rangle=\hat e_i^\dagger|\psi_0\rangle$ for excitation operators $\hat e_i^\dagger$ (single/double excitations), then solve the generalized eigenvalue problem $\langle e_j|H|e_i\rangle c_i^n = E_n\langle e_j|e_i\rangle c_i^n$ within the same sampled bitstring basis $\chi$ — no new quantum sampling needed.

## Real-world scale

N₂ bond-breaking curves matching classical HCI references better than RHF/CISD/CCSD across the whole curve; a Fe₄S₄ cluster calculation at **77 qubits** approaching CCSD-level accuracy as the subspace dimension grows to $10^8$. Qiskit addon: `qiskit-addon-sqd` — [tutorials for chemistry Hamiltonians and fermionic lattice models](https://qiskit.github.io/qiskit-addon-sqd/).

## Related
- [[The Ground-State Problem]]
- [[Hamiltonians and Encoding for Quantum Circuits]] — the Slater-determinant/fermion encoding this relies on
- [[The LUCJ Ansatz]] — the circuit that prepares $|\psi\rangle$ for SQD
- [[SKQD and SqDRIFT]]
- [[Hybrid Workflow Patterns — VQE and SQD at HPC Scale]] — what HPC does around this loop
- [[SQD on N₂ (Worked Example)]] — a full end-to-end run of this loop, including the concrete recovery weight function and reference-subspace augmentation described above

## Self-Check
- Why does SQD only need the quantum computer to *sample*, not to compute the final energy?
- Could you explain what self-consistent configuration recovery fixes, and why average occupancy is the right signal to use?
- Why does polynomial (not exponential) support in the true ground state make this whole approach tractable?
- Why does beating a classical brute-force reference subspace count as "quantum utility" when beating Hartree-Fock alone does not?
