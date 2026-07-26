# The Ground-State Problem
#qc/algorithms

Find the lowest eigenvalue (the ground-state energy) and its eigenvector (the ground state) of a Hamiltonian $H$ — one of the most broadly important computational problems in physics and chemistry: reaction energies, material properties, and binding energies all reduce to some version of this.

## Why it's hard, both ways

**Classically:** representing an arbitrary quantum state at all is exponentially expensive (see [[Hamiltonian Simulation — Why It's Hard]]), and searching the full $2^n$-dimensional Hilbert space for the minimum-energy direction is intractable without approximation.

**Quantumly, it's still hard:** a quantum computer doesn't remove the need to *search* Hilbert space efficiently — you still need an algorithm that converges toward the ground state in reasonable time, not just a device that can represent one.

## The assumptions every practical algorithm leans on

- **A good initial guess state** — some overlap with the true ground state to start from, rather than starting blind.
- **A gapped adiabatic path** — a way to deform a simple, known ground state into the target ground state without crossing a near-degenerate energy level.
- **Bounded correlation length** — the ground state isn't arbitrarily long-range entangled.

**Key insight:** these assumptions are exactly what separates the three approaches this section covers — [[Quantum Phase Estimation (QPE)]], [[Variational Quantum Eigensolver (VQE)]], and [[Quantum Krylov Methods]] — each leans on a different subset of them, and trades circuit depth against how good an initial guess you need.

## Related
- [[Hamiltonian Simulation — Why It's Hard]]
- [[Quantum Phase Estimation (QPE)]]
- [[Variational Quantum Eigensolver (VQE)]]
- [[Quantum Krylov Methods]]

## Self-Check
- Why is finding a ground state still hard on a quantum computer, even though representing the state itself is easy?
- Could you name the three typical assumptions ground-state algorithms rely on?
- Why might a "gapped adiabatic path" assumption fail for a real physical system?
