# Dynamic Circuits
#qc/hardware #qc/dynamic

A traditional circuit is a fixed pipeline: **Preparation → Quantum Operations → Final Measurement**. Every operation is decided in advance; measurement only happens at the very end.

A dynamic circuit breaks that rule: it allows **mid-circuit measurement**, followed by classical logic that decides what happens next — a gate applied conditionally based on a measurement outcome. This is often called **feedforward** (or feedback).

Two building blocks make this possible:

- **Mid-circuit measurement** — measuring a qubit before the circuit ends, storing the result in a classical bit.
- **Reset + reuse** — `qc.reset(q)` reinitializes a measured qubit back to $|0\rangle$ so it can be reused later in the same circuit. This matters a lot when physical qubits are scarce.
- **Conditional operations** — `with qc.if_test((cr[i], 1)): ...` applies gates only if a classical bit matches a given value.

```python
qc.measure(qr[i], cr[0])
qc.reset(qr[i])
with qc.if_test((cr[0], 1)):
    qc.x(qr[j])
```

The headline use case explored in this lab is [[Dynamic GHZ via Qubit Reuse]] — using this mechanism to build long-range entanglement without needing every qubit to be directly, physically connected to every other qubit.

## Related
- [[Dynamic GHZ via Qubit Reuse]]
- [[GHZ States]]
- [[Coupling Map and Topology]]

## Self-Check
- Could you explain "feedforward" to someone who's only seen fixed-pipeline circuits before?
- What are the three building blocks that make a dynamic circuit possible?
- Why does reset-and-reuse matter when physical qubits are scarce?
