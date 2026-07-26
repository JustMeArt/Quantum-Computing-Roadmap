# Quantum Phase Estimation (QPE)
#qc/algorithms #qc/gates

Given a state $|\psi_0\rangle = \sum_i \gamma_i|E_i\rangle$ decomposed in $H$'s eigenbasis, QPE measures out an eigenvalue $E_i$ with probability $|\gamma_i|^2$ — in particular, $E_0$ (the ground-state energy) whenever $|\psi_0\rangle$ has overlap with the true ground state. It's called "phase estimation" because it extracts $E_i$ from the phase accumulated by $U=e^{-iH\Delta t}$ (see [[Trotterization]] for how to actually build $U$).

## Circuit (3-bit example)

1. Apply $H$ (Hadamard) to each of 3 ancilla qubits, preparing an equal superposition.
2. Apply controlled-$U$, controlled-$U^2$, controlled-$U^4$ from each ancilla onto the $|\psi_0\rangle$ register — each ancilla controls a different power of $U$, writing binary digits of the phase into the ancilla register via [[Deutsch's Algorithm|phase kickback]].
3. Apply the inverse Quantum Fourier Transform ($QFT^\dagger$) to the ancilla register — see [[The Quantum Fourier Transform]] for the full circuit derivation.
4. Measure the ancillas — the result is a 3-bit binary approximation of an energy eigenvalue, sampled with probability $|\gamma_i|^2$.

QPE is the QFT's one genuinely load-bearing use case: it never loads classical data into amplitude form and its output (an eigenvalue) is exactly the kind of peaked distribution the QFT reads out cheaply — see [[The Quantum Fourier Transform]] for why that combination matters.

## Worked example — spin precession

A single qubit under $R_z(\pi/2)$ has eigenphase $\varphi=1/8$ (since $R_z(\theta)$ contributes phase $\theta/2\pi$ per application). Running QPE with enough ancilla/phase qubits to represent $1/8=0.001$ in binary recovers $\varphi$ exactly; with fewer ancillas, the estimate rounds to the nearest representable binary fraction — a concrete illustration of why circuit depth (ancilla count) trades directly against estimation accuracy $\varepsilon$.

## Pros and cons

**Pros:** high accuracy, asymptotically optimal query complexity, the natural target algorithm for future fault-tolerant hardware (see [[Error Correction (EC)]]).

**Cons:** needs circuit depth $O(1/\varepsilon)$ for error $\varepsilon$ — deep circuits with today's noise levels — and the controlled time-evolutions are nonlocal, adding significant overhead even for small problems. This is exactly why [[Variational Quantum Eigensolver (VQE)]] and [[Quantum Krylov Methods]] exist as near-term alternatives.

## Related
- [[The Ground-State Problem]]
- [[Trotterization]] — how $U$ is actually implemented
- [[The Quantum Fourier Transform]] — the circuit this note's step 3 uses, now derived in full
- [[Variational Quantum Eigensolver (VQE)]]
- [[Quantum Krylov Methods]]
- [[Quantum Chemistry — QPE on H2 (Worked Example)]] — this circuit run end-to-end on a real molecule, with concrete accuracy-vs-circuit-cost numbers

## Self-Check
- Why is QPE called "phase estimation" — what phase, and where does it come from?
- Why does deeper circuit depth trade directly against QPE's accuracy $\varepsilon$?
- Why is QPE considered better suited to future fault-tolerant hardware than to today's noisy devices?
