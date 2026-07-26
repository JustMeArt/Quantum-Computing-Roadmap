# Why Gates Are Unitary
#qc/math

A valid quantum operation must preserve the norm of the state vector — probabilities have to sum to 1 both before and after, so $\|U|\psi\rangle\| = \||\psi\rangle\|$ for *every* valid input state $|\psi\rangle$. **Key insight:** this requirement is exactly equivalent to unitarity. Since $\|U|\psi\rangle\|^2 = \langle\psi|U^\dagger U|\psi\rangle$ must equal $\langle\psi|\psi\rangle$ for all $|\psi\rangle$, it forces $U^\dagger U = I$ — the definition of a unitary matrix. Norm-preservation isn't a separate property gates happen to have; it's the *reason* the unitary requirement exists in the first place.

## Why this rules some matrices out

Not every matrix is a valid gate. A plain scaling matrix breaks norm preservation immediately. More importantly: a Hamiltonian $H$ itself is generally **not** unitary (see [[Hamiltonians and Encoding for Quantum Circuits]]) — which is exactly why you can't apply $H$ directly as a gate, only $U(H,t)=e^{-iHt}$, which *is* unitary by construction.

## Unitarity means reversibility

Every unitary has an inverse, $U^{-1}=U^\dagger$, so every quantum gate (aside from measurement, which is not unitary — see [[Measurement and Collapse]]) is reversible. This is a sharp contrast with classical logic: an AND gate has no inverse (you can't recover both inputs from the output), but every gate in [[Pauli Operators|this vault's gate set]] can always be undone by applying its adjoint.

## Related
- [[Pauli Operators]] — states "Hermitian and unitary" as a property; this is why unitary specifically is required
- [[Hamiltonians and Encoding for Quantum Circuits]]
- [[What is a Qubit]]

## Self-Check
- Could you derive $U^\dagger U = I$ starting from the requirement that $U$ preserves a state's norm?
- Why isn't a Hamiltonian $H$ itself a valid gate, even though it's a perfectly good Hermitian matrix?
- Why does unitarity imply every quantum gate is reversible, and what's the classical contrast?
- What would it take to deliberately construct a matrix that is *not* unitary, and how would you verify computationally (e.g. via an `is_unitary()`-style check) that it fails $U^\dagger U = I$?
