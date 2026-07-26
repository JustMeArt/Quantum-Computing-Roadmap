# Bell States
#qc/entanglement

**Entanglement, in plain language:** two qubits become correlated in a way no classical setup can reproduce — measuring one instantly tells you something certain about the other, no matter how the pair was separated, even though neither qubit had a definite value before measurement (see [[Measurement and Collapse]]). It's not "hidden pre-agreed answers" (that possibility is what [[CHSH Inequality and Bell Tests|Bell tests]] rule out); the correlation only exists because the two qubits share a single joint state that can't be factored into two independent single-qubit states — which is also why a two-qubit entangled pair has no single point on any one [[Bloch Sphere]].

The simplest entangled states — 2 qubits, 4 variants:

$$\frac{1}{\sqrt2}(|00\rangle+|11\rangle) \quad \frac{1}{\sqrt2}(|01\rangle+|10\rangle) \quad \frac{1}{\sqrt2}(|00\rangle-|11\rangle) \quad \frac{1}{\sqrt2}(|01\rangle-|10\rangle)$$

Base construction: `h(0); cx(0,1)` → gives |00⟩+|11⟩. Applying an extra X gate (before or after) flips which basis states appear; a Z gate introduces the minus-sign variants ([[Z Gate and Relative Phase]]).

**Key insight — multiple paths, same state:** X can be applied *before* the circuit (on qubit 1) or *after* (on qubit 0 **or** qubit 1) and all three give the same final state, because flipping either qubit of an entangled pair swaps the same basis states. This foreshadows circuit-optimization flexibility used later in [[Transpilation]].

## Related
- [[H Gate]], [[CX Gate and Entanglement]]
- [[GHZ States]] — the N-qubit generalization
- [[Z Gate and Relative Phase]]
- [[Bloch Sphere]], [[Measurement and Collapse]]
- [[CHSH Inequality and Bell Tests]], [[Quantum Teleportation]], [[No-Cloning Theorem]]

## Self-Check
- Could you explain entanglement to a friend using the Bell-state correlation, without saying "spooky"?
- Why can't a Bell state be described as "qubit 0 is in state A and qubit 1 is in state B" separately?
- How do you get from the base Bell state to each of the other three, and which gates does that use?
- If you compute the measurement probabilities for all four Bell states (not just $|\Phi^+\rangle$), what pattern do you see, and why does it follow directly from which basis states each superposition is built from?
