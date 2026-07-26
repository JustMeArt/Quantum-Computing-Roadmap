# Superposition
#qc/basics #qc/math

A qubit in superposition is in a coherent combination of $|0\rangle$ and $|1\rangle$ simultaneously, e.g. $\frac{1}{\sqrt2}(|0\rangle+|1\rangle)$. **This is not the same as a classical coin flip.** A classical coin in the air is *either* heads *or* tails, and you just don't know which yet — a probability distribution over a definite hidden fact. A qubit in superposition doesn't have a hidden definite value; it genuinely carries both amplitudes at once, including their relative **phase**, until [[Measurement and Collapse|measured]].

## Why this matters: interference

Classical probabilities only ever add — they can shrink toward zero but never go negative, so two paths to the same outcome always make it *more* likely, never less. Quantum amplitudes are complex numbers and can **cancel**:

$$\frac{1}{2} + \left(-\frac{1}{2}\right) = 0$$

Two computational paths that would classically both contribute probability can instead destructively interfere to a net-zero amplitude for a "wrong" answer, while paths to the "right" answer constructively reinforce. This engineered cancellation — not brute-force parallel evaluation — is the actual mechanism behind quantum algorithmic speedups ([[Grover's Algorithm|Grover's search]] and [[The Deutsch-Jozsa Algorithm|Deutsch-Jozsa]] are the standard textbook examples).

## Creating it

The standard way to put a qubit into superposition is the [[H Gate|Hadamard gate]]:

$$H|0\rangle = \frac{1}{\sqrt2}(|0\rangle + |1\rangle)$$

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)
Statevector(qc).probabilities()   # array([0.5, 0.5]) — but this is amplitude info, not "two values at once"
```

## Related
- [[What is a Qubit]]
- [[H Gate]]
- [[Bloch Sphere]] — visualizing superposition states geometrically
- [[Measurement and Collapse]] — what happens to a superposition the instant you measure it
- [[Quantum Speedup — Ingredients and Myths]] — this interference mechanism, generalized

## Self-Check
- How would you explain to someone why superposition isn't the same as a classical coin flip?
- What does interference actually do that a classical probability distribution can't?
- Why is [[H Gate]] specifically the gate reached for to create superposition?
