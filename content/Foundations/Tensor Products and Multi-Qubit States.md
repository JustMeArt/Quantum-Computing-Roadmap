# Tensor Products and Multi-Qubit States
#qc/math

Multiple quantum systems combine via the **tensor product** ($\otimes$), not addition. For two single-qubit states $|\phi\rangle=\alpha_0|0\rangle+\alpha_1|1\rangle$ and $|\psi\rangle=\beta_0|0\rangle+\beta_1|1\rangle$:

$$|\phi\rangle\otimes|\psi\rangle = \sum_{a,b\in\{0,1\}} \alpha_a\beta_b\,|ab\rangle$$

— bilinear in both arguments. In column-vector form this is the **Kronecker product**:

$$|\phi\rangle\otimes|\psi\rangle = \begin{pmatrix}\alpha_0\\\alpha_1\end{pmatrix}\otimes\begin{pmatrix}\beta_0\\\beta_1\end{pmatrix} = \begin{pmatrix}\alpha_0\beta_0\\\alpha_0\beta_1\\\alpha_1\beta_0\\\alpha_1\beta_1\end{pmatrix}$$

The same operation combines operators: $M\otimes N$ acts on the combined space, built the same component-wise way. This is exactly the fact behind [[Pauli Operators]]' "tensor products extend this to any number of qubits" line — an $n$-qubit Pauli string like $XZI$ is literally $X\otimes Z\otimes I$.

## Why this makes state spaces explode

**Key insight:** $n$ single qubits combine into one $2^n$-dimensional space, not $2n$-dimensional — this is the exact mechanism behind [[Hamiltonian Simulation — Why It's Hard|why quantum states are classically expensive]] and why [[Simulators — Statevector vs Shot-Based|statevector simulation doesn't scale]]. Two qubits: 4 amplitudes. Twenty qubits: over a million. This is also structurally why entanglement exists at all: a general $2^n$-dimensional vector doesn't have to factor as a tensor product of $n$ single-qubit vectors — when it doesn't, that's what "entangled" means (see [[Bell States]]).

## Classical parallel

Multiple *classical* systems combine via the Cartesian product of their state sets, and the same tensor-product operation combines their probability vectors — the math is identical. The difference isn't the combination rule, it's that a quantum joint state can hold [[Superposition|superposition]] and phase relationships a classical joint probability distribution can't.

```python
from qiskit.quantum_info import Statevector

phi = Statevector([1, 0])       # |0>
psi = Statevector([0, 1])       # |1>
combined = phi.tensor(psi)      # |0> ⊗ |1> = |01>
```

## Related
- [[What is a Qubit]]
- [[Pauli Operators]]
- [[Hamiltonian Simulation — Why It's Hard]]
- [[Simulators — Statevector vs Shot-Based]]
- [[Bell States]]

## Self-Check
- Could you compute $|0\rangle\otimes|1\rangle$ by hand using the Kronecker product formula?
- Why does $n$ qubits give a $2^n$-dimensional space rather than $2n$?
- Why does "not every vector in the combined space factors as a tensor product" matter for what entanglement means?
