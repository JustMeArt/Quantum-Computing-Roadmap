# Physical vs Logical Qubits and Layout
#qc/hardware

**Logical qubits** are the abstract `q[0]`, `q[1]`, ... you design a circuit with. **Physical qubits** are the actual hardware elements, each sitting at a specific location on the chip with its own error rates and connectivity. A **layout** is the mapping between the two.

By default, logical qubit $i$ maps to physical qubit $i$ — but you can control this explicitly via `initial_layout` during transpilation, which matters a lot because backend properties (gate errors, readout errors, $T_1$/$T_2$ — see [[Backend Properties]]) are **not uniform** across a chip. A good layout puts your circuit's qubits on the hardware's best-performing, best-connected physical qubits.

```python
from qiskit import transpile

initial_layout = list(range(qc.num_qubits))  # ascending logical->physical mapping

transpiled = transpile(
    qc,
    backend=backend,
    initial_layout=initial_layout,
    basis_gates=['h', 'cx', 'swap'],
    optimization_level=3,
)
```

Why `list(range(n))` and not just `range(n)`: Qiskit's transpiler internals distinguish `list` from other iterables when disambiguating "one layout" vs "a list of layouts, one per circuit" — passing a bare `range` can get silently misinterpreted. See [[Qiskit API Gotchas]].

Layout choice interacts directly with [[Coupling Map and Topology]]: if the layout puts two qubits that need to interact onto physical qubits that aren't directly connected, the transpiler has to insert extra [[SWAP Overhead and Routing|SWAP gates]] to route around it.

## Related
- [[Backend Properties]]
- [[Coupling Map and Topology]]
- [[SWAP Overhead and Routing]]
- [[Qiskit API Gotchas]]

## Self-Check
- Could you explain the difference between a logical qubit and a physical qubit to someone new to this?
- Why does layout choice matter if every physical qubit can run the same gates?
- Why `list(range(n))` and not just `range(n)` for `initial_layout`?
