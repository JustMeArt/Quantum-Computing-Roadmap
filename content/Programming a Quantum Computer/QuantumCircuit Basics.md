# QuantumCircuit Basics
#qc/programming #qc/qiskit

`QuantumCircuit` is Qiskit's abstract representation of a quantum program — a sequence of gates (and measurements) acting on **registers**. Every code snippet elsewhere in this vault assumes you can read this layer fluently.

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)   # 2 qubits, 2 classical bits
qc.h(0)                     # gate on qubit 0
qc.cx(0, 1)                 # two-qubit gate: control=0, target=1
qc.measure([0, 1], [0, 1])  # qubit i -> classical bit i
```

## Registers

`QuantumCircuit(n)` creates `n` qubits with no classical register (fine for statevector work — see [[Simulators — Statevector vs Shot-Based]]). `QuantumCircuit(n, m)` adds `m` classical bits for storing measurement outcomes. Explicit `QuantumRegister`/`ClassicalRegister` objects exist for naming/grouping qubits, but the shorthand above covers most circuits in this vault.

## Composing circuits

`.compose()` stitches one circuit into another — this is how [[1D Ising Chain and the Mirror Trick]] builds the mirror benchmark: `mirror.compose(ising, inplace=True)` followed by `mirror.compose(ising.inverse(), inplace=True)`. It's the general tool for building circuits out of reusable sub-circuit pieces rather than writing every gate inline.

## Barriers

`qc.barrier()` is not a gate — it's an instruction to the transpiler: "don't reorder or cancel anything across this line." See [[1D Ising Chain and the Mirror Trick]] for why this matters in practice (without a barrier, the transpiler can silently optimize a mirror circuit's $U^\dagger U$ down to nothing).

## Inspecting and drawing

```python
qc.draw()          # text diagram
qc.draw('mpl')      # matplotlib diagram
qc.depth()          # see [[Circuit Depth]]
qc.data             # list of CircuitInstruction — see [[Circuit Introspection Cheat Sheet]]
```

Official reference: [Qiskit documentation](https://docs.quantum.ibm.com/).

## Related
- [[The Primitives Family]] — what actually runs a built circuit
- [[Parameterized Circuits]]
- [[Bell States]] — the canonical `h(0); cx(0,1)` pattern in practice
- [[Circuit Introspection Cheat Sheet]]
- [[1D Ising Chain and the Mirror Trick]] — `.compose()` and `.barrier()` used together at scale

## Self-Check
- What's the difference between `QuantumCircuit(3)` and `QuantumCircuit(3, 3)`, and when would you need the second form?
- What does `qc.barrier()` actually do — is it a gate?
- Why does [[1D Ising Chain and the Mirror Trick]] need both `.compose()` and `.barrier()` to build its benchmark correctly?
