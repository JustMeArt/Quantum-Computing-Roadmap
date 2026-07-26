# Circuit Introspection Cheat Sheet
#qc/qiskit

A collection of `QuantumCircuit` methods/properties for pulling structural facts out of a built circuit — useful for benchmarking, comparing transpilation results across backends, or just debugging.

| What you want | How to get it |
|---|---|
| Total qubit count | `circuit.num_qubits` (property) |
| Ancilla qubit count | `circuit.num_ancillas` |
| Circuit depth (longest dependent-gate chain) | `circuit.depth()` |
| Depth counting only 2-qubit gates | `circuit.depth(lambda instr: instr.operation.num_qubits >= 2)` |
| Gate name → count mapping | `dict(circuit.count_ops())` |
| Count of multi-qubit gate operations | `circuit.num_nonlocal_gates()` |
| Iterate every instruction in order | `for instr in circuit.data: instr.operation.name` |

**Depth vs size, the important distinction:** `.size()` counts total gates; `.depth()` counts the longest chain assuming independent gates run in parallel. Depth is the better proxy for actual circuit *runtime* on hardware, since gates on disjoint qubits can execute simultaneously.

**Why 2-qubit depth specifically matters:** two-qubit gates are typically the noisiest, slowest operations on real hardware (see [[Backend Properties]]), so isolating how much of the total depth comes from them specifically is a much sharper signal than raw depth when comparing e.g. two different topologies ([[Coupling Map and Topology]]) or layouts ([[Physical vs Logical Qubits and Layout]]).

```python
def quantum_circuit_params(circuit: QuantumCircuit) -> dict:
    return {
        "Number of qubits": circuit.num_qubits,
        "Depth": circuit.depth(),
        "2-qubit depth": circuit.depth(lambda instr: instr.operation.num_qubits >= 2),
        "Gates": dict(circuit.count_ops()),
        "Multi-qubit gates": circuit.num_nonlocal_gates(),
        "Number of ancillas": circuit.num_ancillas,
    }
```

## Related
- [[SWAP Overhead and Routing]]
- [[Backend Properties]]
- [[Coupling Map and Topology]]
- [[Qiskit API Gotchas]]

## Self-Check
- What's the difference between `circuit.size()` and `circuit.depth()`, and which better predicts real runtime?
- Why would you want 2-qubit-only depth instead of total depth when comparing topologies or layouts?
- Which method would you reach for to count how many `cx` gates are in a circuit?
