# CX Gate (CNOT) and Entanglement
#qc/gates #qc/entanglement

Two-qubit gate: flips the **target** qubit iff the **control** qubit is |1⟩. When the control is in superposition, the two qubits become **entangled** — their measurement outcomes become perfectly correlated with no classical explanation.

$$CX = \begin{pmatrix} 1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0 \end{pmatrix}$$

This is the mechanism behind [[Bell States]] and [[GHZ States]].

## CZ — the symmetric sibling

$$CZ = \begin{pmatrix} 1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&-1 \end{pmatrix}$$

CZ is the **native two-qubit gate on IBM's Heron devices** (see [[Backend Properties]]) — it applies a $-1$ phase only when *both* qubits are $|1\rangle$, which makes it symmetric under swapping the two qubits (unlike CX, which clearly distinguishes control from target). CX and CZ are interconvertible with single-qubit gates ($CZ = (I\otimes H)\,CX\,(I\otimes H)$), which is why [[Dressed Gates and Pauli Propagation|the Error Mitigation section's Ising circuits]] can build everything from CZ alone.

## Related
- [[H Gate]]
- [[Bridge Gate Identity]] — a non-local CX rewritten as nearest-neighbor CX gates
- [[Circuit Depth]] — CX gates are usually the bottleneck for depth
- [[Backend Properties]] — CZ as the hardware-native gate
- [[Dressed Gates and Pauli Propagation]]

## Self-Check
- Could you explain CNOT to someone who's never heard of it, including why it needs a "control" and a "target"?
- Why does entanglement only happen when the control qubit is in superposition, not when it's in a definite state?
- Why are CX gates usually the bottleneck for [[Circuit Depth]]?
- Why is CZ symmetric under swapping its two qubits, but CX isn't?
