# SWAP Overhead and Routing
#qc/hardware

When two logical qubits that need to interact are mapped onto physical qubits that aren't directly connected (per the [[Coupling Map and Topology|coupling map]]), the transpiler inserts SWAP gates to physically move quantum states around until the interaction becomes possible on real hardware.

This has real costs:
- **More circuit depth** — more sequential layers, so more elapsed time and more exposure to [[Thermal Relaxation]].
- **More total gates** — and since a SWAP is typically built from three CNOTs, each one adds three lots of two-qubit gate error, not just one.

This is exactly why layout ([[Physical vs Logical Qubits and Layout]]) and topology ([[Coupling Map and Topology]]) matter so much: a poor layout on a sparse topology can multiply your effective error rate through SWAP overhead alone, even with perfect individual gate fidelities.

## Counting SWAPs in a transpiled circuit

```python
def count_swap_gates(circuit: QuantumCircuit) -> int:
    swap_count = 0
    for instruction in circuit.data:
        if instruction.operation.name == "swap":
            swap_count += 1
    return swap_count
```

This uses `circuit.data`, a list of `CircuitInstruction` objects — one of the general tools for introspecting exactly what's inside a circuit. See [[Circuit Introspection Cheat Sheet]] for the fuller toolkit.

## Related
- [[Coupling Map and Topology]]
- [[Physical vs Logical Qubits and Layout]]
- [[Circuit Introspection Cheat Sheet]]

## Self-Check
- Why is a SWAP gate actually three CNOTs, and what does that mean for error accumulation?
- Could you explain why a poor layout can hurt fidelity even with perfect individual gate quality?
- How would you count SWAP gates in a transpiled circuit using `circuit.data`?
