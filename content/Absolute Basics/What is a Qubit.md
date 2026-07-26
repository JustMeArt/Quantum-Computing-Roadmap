---
order: 2
modified: 2026-01-02
---

# What is a Qubit?
#qc/basics #qc/math

A classical bit is always definitely 0 or 1. A **qubit** is a vector in a 2-dimensional complex vector space, written in **ket notation**:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad \alpha,\beta \in \mathbb{C}, \qquad |\alpha|^2 + |\beta|^2 = 1$$

where $|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}$ and $|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}$ — kets are just column vectors, and $\alpha, \beta$ are its **amplitudes**.

**Key insight:** "0 and 1 at once" is a misleading pop-science shorthand. A qubit isn't secretly holding two classical values for free — it holds one pair of complex amplitudes that determine *probabilities* when you measure it (see [[Measurement and Collapse]]), and those amplitudes can **interfere** — add or cancel — in ways plain probabilities never can. That interference, not "parallel storage," is the actual resource quantum algorithms exploit. See [[Superposition]] for what that means in practice.

```python
from qiskit.quantum_info import Statevector

psi = Statevector([0.6, 0.8])   # alpha=0.6, beta=0.8 — must satisfy |alpha|^2+|beta|^2=1
psi.probabilities()             # array([0.36, 0.64]) — P(0), P(1)
```

The normalization constraint $|\alpha|^2+|\beta|^2=1$ is why arbitrary pairs of numbers don't make a valid qubit state — Qiskit enforces it.

## Bras and inner products

A **ket** $|\psi\rangle$ is a column vector; its **bra** $\langle\psi|$ is the conjugate-transpose row vector. Pairing a bra with a ket gives the **inner product**: $\langle a|b\rangle = 1$ if $a=b$, else $0$, for computational basis states — the formal statement that $|0\rangle$ and $|1\rangle$ are orthonormal. More generally $\langle\phi|\psi\rangle$ gives the overlap (amplitude) between two states. The reverse pairing, a ket times a bra like $|0\rangle\langle1|$, is an **outer product** — a matrix, not a number — and is exactly how operators like [[Pauli Operators|the Pauli matrices]] can be built up from basis states.

## Related
- [[What is a Quantum Computer]]
- [[Superposition]]
- [[Bloch Sphere]] — the geometric picture of this state
- [[Measurement and Collapse]]
- [[Tensor Products and Multi-Qubit States]] — how single-qubit states like this one combine into many-qubit states
- [[Why Gates Are Unitary]]

## Self-Check
- Why is "a qubit is a 0 and a 1 at the same time" a misleading way to describe $\alpha|0\rangle+\beta|1\rangle$?
- What does the normalization constraint $|\alpha|^2+|\beta|^2=1$ actually guarantee, physically?
- What does [[Measurement and Collapse]] let you extract from $\alpha$ and $\beta$, and what can it never give you directly?
- What's the difference between a bra and a ket, and what does pairing them (in each order) give you?
