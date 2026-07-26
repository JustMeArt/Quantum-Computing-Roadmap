# H Gate (Hadamard / superposition)
#qc/gates

Puts a qubit into [[Superposition|superposition]] — partly |0⟩ and partly |1⟩:

$$H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$$

Measuring gives |0⟩ or |1⟩ with 50/50 probability. Geometrically: 180° rotation around an axis halfway between X and Z on the [[Bloch Sphere]].

## Related
- [[X Gate]]
- [[Bell States]] — H is always the first gate, creating the superposition that CX then entangles
- [[GHZ States]]
- [[Superposition]], [[Bloch Sphere]]
- [[Deutsch's Algorithm]] — H sandwiching the oracle is what makes the interference trick work

## Self-Check
- Could you explain what the Hadamard gate does to someone who's never heard of it?
- What is a Hadamard gate typically used for, at the start of a circuit?
- Why is H always the first gate in building [[Bell States]], before [[CX Gate and Entanglement|CX]]?
