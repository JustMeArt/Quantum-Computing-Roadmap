# SparsePauliOp
#qc/qiskit #qc/math

Qiskit's sparse representation of a weighted sum of Pauli strings (e.g. `Z`, `ZZ`, `XIZY`), used to define observables for measurement (e.g. with `Estimator`).

```python
from qiskit.quantum_info import SparsePauliOp
observable = SparsePauliOp('Z', coeffs=[1.0])   # single-qubit Z
```

**Common trap:** must be passed as a plain object, *not* wrapped in a list, for methods like `.apply_layout()` to work. Also: the Pauli string length must match the circuit's qubit count (one letter = one qubit).

## Related
- [[Pauli Operators]]
- [[Transpilation]] — `.apply_layout()` is used after transpiling to remap an observable onto physical qubits
- [[Qiskit API Gotchas]] — this "plain object, not a list" trap is one entry in the running gotchas list

## Self-Check
- What is a `SparsePauliOp` actually representing, in plain language?
- Why does the Pauli string length have to match the circuit's qubit count?
- Why does an observable need `.apply_layout()` after [[Transpilation]]?
