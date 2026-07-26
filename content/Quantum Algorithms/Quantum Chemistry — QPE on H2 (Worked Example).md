# Quantum Chemistry — QPE on H2 (Worked Example)
#qc/algorithms

A concrete, end-to-end run of [[Quantum Phase Estimation (QPE)]] on a real molecule: H₂ at its equilibrium bond length (0.735 Å). The pipeline is compute → map → estimate → read: classical chemistry software (PySCF, STO-3G basis) produces the molecular integrals, Jordan-Wigner (see [[Hamiltonians and Encoding for Quantum Circuits]]) maps the fermionic Hamiltonian to a 4-qubit, 15-Pauli-term operator, then a full QPE circuit — Hadamards on the ancilla register, controlled-$U^{2^k}$ time evolutions, inverse QFT, measurement — extracts the ground-state energy as a phase. The result matches the textbook value: nuclear repulsion $0.71996899$ Ha plus electronic energy gives a total of $-1.13730604$ Ha, in line with the literature figure of $-1.137$ Ha. **Key insight:** QPE's accuracy is not free — it comes from how many phase (ancilla) qubits you spend, and this notebook makes that trade-off concrete rather than asymptotic: chemical accuracy ($<0.01$ Ha error) is first reached at 6 phase qubits and 4494 CX gates, and error keeps shrinking roughly exponentially all the way to 14 phase qubits (10537 CX gates, error $\approx 8\times10^{-6}$ Ha) — precision bought directly with circuit depth, exactly as [[Quantum Phase Estimation (QPE)]]'s $O(1/\varepsilon)$ scaling predicts, just now with real numbers attached.

## Why the initial state matters in practice, not just in theory

QPE only measures out an eigenvalue $E_i$ with probability $|\gamma_i|^2$, where $\gamma_i$ is the initial state's overlap with eigenstate $|E_i\rangle$ — so a poorly chosen initial state can make the ground-state energy vanishingly unlikely to ever be measured. This experiment tests that directly: preparing the ancilla-target register in the **Hartree-Fock state** (the standard classical mean-field guess for the electron configuration) gives 99.376% amplitude overlap with the true ground state (98.76% measurement probability), while random initial states essentially never win — 0 out of 20 trials in the experiment beat Hartree-Fock. A uniform-superposition or all-zero initial state fares no better than random. The lesson: QPE's promise of "measure out the ground energy" is conditional on supplying it a state that already has substantial overlap with the answer — a good classical initial guess isn't a nicety, it's what makes the whole run worth attempting.

## Related
- [[Quantum Phase Estimation (QPE)]] — the general circuit and derivation this is a worked instance of
- [[Hamiltonians and Encoding for Quantum Circuits]] — the Jordan-Wigner mapping mechanics used to build the 4-qubit Hamiltonian here
- [[The Ground-State Problem]]
- [[Sample-Based Quantum Diagonalization (SQD)]] — a contrasting near-term approach to chemistry: SQD leans on classical sampling and post-processing instead of a deep fault-tolerant-flavored QPE circuit like this one

## Self-Check
- Why does the Hartree-Fock initial state win almost every trial against a random initial state, when both are just guesses at the ground state?
- If you wanted chemical accuracy (<0.01 Ha) on this H₂ example, roughly how many phase qubits and CX gates would you need to budget for?
- What would happen to the measured energy distribution if you ran this experiment starting from an eigenstate orthogonal to the true ground state?
