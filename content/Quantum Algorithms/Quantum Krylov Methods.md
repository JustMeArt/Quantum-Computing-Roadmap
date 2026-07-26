# Quantum Krylov Methods
#qc/algorithms #qc/math

Framed as a happy medium between [[Quantum Phase Estimation (QPE)|QPE]] (deep, precise, needs fault tolerance) and [[Variational Quantum Eigensolver (VQE)|VQE]] (shallow, near-term, but a hard classical optimization with no convergence guarantee). **Key insight:** the quantum computer only collects short-time data; the actual spectral estimation (extracting eigenvalues) happens **classically**, unlike QPE where the phase is extracted coherently on the QPU itself.

## Statistical phase estimation

Collect a timeseries $x_k = \langle\psi_0|U^k|\psi_0\rangle$ via a Hadamard-test circuit for increasing $k$. Interpreted as a signal, its frequencies are $H$'s eigenvalues and its weights are $|\gamma_i|^2$ — recoverable classically (e.g. via a Fourier transform), without ever running a coherent phase-estimation circuit. One concrete method: **Observable Dynamic Mode Decomposition (ODMD)** — solve $X' = AX$ (shifted vs. unshifted data matrices) by least squares, then diagonalize $A$ classically.

## Quantum Krylov construction

Build the Krylov subspace $\{|\psi_0\rangle, U|\psi_0\rangle, U^2|\psi_0\rangle, \dots, U^{d-1}|\psi_0\rangle\}$ from repeated applications of $U=e^{-iH\Delta t}$ (see [[Trotterization]]). Measure the overlap matrix $S_{jk}=\langle\psi_j|\psi_k\rangle$ and the projected Hamiltonian matrix in this basis, then solve the **generalized eigenvalue problem**:

$$Hv = \lambda S v$$

The lowest $\lambda$ approximates the ground-state energy. This converges **exponentially fast** in the Krylov dimension $d$ — a small $d$ often suffices — and has favorable noise properties compared to deep coherent circuits, since each individual circuit stays comparatively shallow.

## Why this matters for the rest of this vault

A real IBM+University of Tokyo experiment ran quantum Krylov on a 5-particle Heisenberg model across **44 qubits** — roughly 10× the scale of prior quantum-Krylov demonstrations — and explicitly used [[EstimatorOptions and the Five Mitigation Knobs|PEA and ZNE error mitigation]] to get there. This is a direct, real-world payoff of the Error Mitigation section: Krylov methods are exactly the kind of near-term algorithm those mitigation techniques exist to make practical at scale.

## Related
- [[The Ground-State Problem]]
- [[Quantum Phase Estimation (QPE)]]
- [[Variational Quantum Eigensolver (VQE)]]
- [[EstimatorOptions and the Five Mitigation Knobs]] — the mitigation techniques the 44-qubit demonstration actually used

## Self-Check
- Why is Krylov described as a "happy medium" between QPE and VQE — what does it take from each?
- What's the key structural difference between how QPE extracts a phase and how statistical phase estimation does?
- Why does exponential convergence in Krylov dimension $d$ matter practically — what would linear convergence have meant instead?
