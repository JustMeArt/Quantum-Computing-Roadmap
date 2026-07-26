# Pauli Correlation Encoding (PCE)
#qc/algorithms

A qubit-reduction technique that encodes $n$ classical variables into only $\mathcal{O}(\sqrt{n})$ qubits by exploiting **pairwise correlations** between qubits, instead of the usual one-qubit-per-variable encoding (from Sciorili et al., *Nature Communications* 2024). Rather than assigning each classical node its own qubit, PCE partitions the $n$ nodes into three groups and assigns each group a Pauli basis (X, Y, or Z); a node's classical value is then read out not from a single qubit's expectation value but from the **correlation** between a pair of qubits measured in its assigned basis. Because a set of $k$ qubits supports $\binom{k}{2}$ pairwise correlations, encoding $n$ nodes this way only needs enough qubits so that $\mathcal{O}(k^2) \approx n$, i.e. $k = \mathcal{O}(\sqrt{n})$ — for example, 160 classical nodes compress down to 11 qubits. **Key insight:** this trades a hardware constraint (limited qubit count) for a different cost — building the cost Hamiltonian now requires a nonlinear ($\tanh$-based) loss function over correlations rather than a direct linear sum over per-node expectation values, since the correlation itself, not a single-qubit measurement, carries the classical information.

```python
def reduce_qubits_with_pce(initial_qubits: int) -> int:
    # k such that O(k^2) ~= n, e.g. reduce_qubits_with_pce(160) == 11
    ...

# Partition nodes into three groups, one per Pauli basis
node_x, node_y, node_z = ...  # index lists

# 2-body Pauli correlation Hamiltonian terms per basis
pauli_correlation_encoding_x = build_pauli_correlation_encoding("X", node_x, num_qubits)
pauli_correlation_encoding_y = build_pauli_correlation_encoding("Y", node_y, num_qubits)
pauli_correlation_encoding_z = build_pauli_correlation_encoding("Z", node_z, num_qubits)
```

## The loss function
Because classical values are encoded as products of pairwise expectation values rather than single-qubit ones, the cost function used for optimization applies $\tanh(\alpha \cdot \langle Z_i\rangle)$ per node (with $\alpha$ scaling with qubit count) before combining pairs — a soft, differentiable proxy for the $\pm 1$ classical assignment, plus a regularization term that pulls each node's expectation toward $\pm 1$ (a confident classical assignment) rather than letting it sit near 0.

## Related
- [[The Partition Problem — QAOA Worked Example]] — PCE is applied here to scale the same partition problem from ~160 to ~1600 nodes
- [[QAOA — Quantum Approximate Optimization Algorithm]] — the algorithm whose ansatz PCE's reduced-qubit Hamiltonian feeds into
- [[Sample-Based Quantum Diagonalization (SQD)]] — a different qubit/resource-reduction strategy, for chemistry rather than optimization

## Self-Check
- Why does encoding $n$ classical variables into pairwise qubit correlations only require $\mathcal{O}(\sqrt{n})$ qubits instead of $n$?
- What's the practical cost of using PCE — what do you have to give up in exchange for the qubit savings?
- If you doubled the number of classical nodes to encode, roughly how many more qubits would PCE need?
