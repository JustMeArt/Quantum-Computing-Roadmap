# Hamiltonian Simulation — Why It's Hard
#qc/algorithms #qc/math

Simulating how a quantum system evolves over time — the field's founding motivation (see [[What Quantum Computers Are Good For]]) — is classically hard for a structural reason: an $n$-qubit state needs $2^n$ complex amplitudes to describe exactly (see [[Simulators — Statevector vs Shot-Based]]). At 100 qubits that's roughly $10^{31}$ bytes — informally, about 2000 Earth-surfaces' worth of supercomputer memory. There is no clever encoding that avoids this in general.

## Classical workarounds, and where each one fails

- **Sparse/structured states** — exploit zero-amplitudes or symmetries. Fails when the physical system genuinely has no such structure.
- **Tensor networks** — exploit limited entanglement, representing a state compactly if correlations stay short-range. Fails once entanglement grows (bond dimension blows up).
- **Quantum Monte Carlo** — samples instead of storing the full state. Fails when the **sign problem** makes the sampled quantity's variance intractable (common for fermionic and frustrated systems).
- **Effective theories** (mean-field, DFT) — approximate away most microscopic detail. Fails outside the semiclassical regime the approximation assumes.

**Key insight:** each classical method has a specific failure mode, not a uniform "too slow" — a quantum computer's advantage shows up precisely in the regime where *all four* break down at once (strongly correlated, high-entanglement, sign-problem-afflicted systems).

## Four target problem classes

1. **Time evolution** — how does a state evolve under $H$? (dynamics)
2. **Ground/low-energy states** — see [[The Ground-State Problem]]
3. **Spectral properties** — Green's functions, response functions
4. **Thermal properties** — finite-temperature expectation values

## Related
- [[Hamiltonians and Encoding for Quantum Circuits]]
- [[The Ground-State Problem]]
- [[Simulators — Statevector vs Shot-Based]] — the same exponential-scaling fact, from the simulator side
- [[What Quantum Computers Are Good For]]

## Self-Check
- Could you explain, with the memory-size framing, why simulating 100 qubits classically is genuinely infeasible?
- For each of the four classical workarounds, could you say specifically what makes it fail?
- Why do all four classical methods tend to fail together in exactly the regime where quantum computers are expected to help?
