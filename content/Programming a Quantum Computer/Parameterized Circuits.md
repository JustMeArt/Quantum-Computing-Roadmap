# Parameterized Circuits
#qc/programming #qc/qiskit

A `Parameter` is a symbolic placeholder in a circuit — you build the circuit's *structure* once, then bind concrete numeric values later, possibly many different sets of values against the exact same compiled circuit.

```python
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter

theta = Parameter('θ')
qc = QuantumCircuit(1)
qc.rx(theta, 0)          # circuit built once, angle unbound

bound = qc.assign_parameters({theta: 3.14159})   # bind a concrete value
```

`ParameterVector` is the same idea for many parameters at once (e.g. one angle per layer of a variational circuit):

```python
from qiskit.circuit import ParameterVector

angles = ParameterVector('a', length=4)
qc = QuantumCircuit(4)
for i, angle in enumerate(angles):
    qc.rx(angle, i)
```

## Why this matters

**Key insight:** transpilation is expensive, and it only depends on circuit *structure* (gates and connectivity), not on the numeric values inside rotation gates. A parameterized circuit is transpiled **once**; every subsequent run just rebinds numbers into the already-transpiled template. Variational algorithms ([[Variational Quantum Eigensolver (VQE)|VQE]], QAOA) exploit this directly — they sweep over hundreds of parameter values on the same fixed circuit structure, and would be far slower if every iteration re-transpiled from scratch.

You don't have to bind values yourself before running — primitives accept parameter values directly as part of a PUB (see [[The Primitives Family]]), letting you submit many parameter sets as one batched job:

```python
from qiskit_aer.primitives import EstimatorV2
from qiskit.quantum_info import SparsePauliOp

obs = SparsePauliOp('Z')
param_sets = [[0.0], [1.57], [3.14]]   # three different theta values, one job
EstimatorV2().run([(qc, obs, param_sets)]).result()[0].data.evs
```

## A missed opportunity, in hindsight

[[1D Ising Chain and the Mirror Trick]]'s `construct_ising_circuit` takes `rx_angle` as a plain Python float baked in at construction time (`rx_angle = π/8` throughout the worked examples here), rebuilding the whole circuit for any other angle. A `Parameter` there would let the same boxed/[[Samplomatic — Boxes and Annotations|Samplomatic]]-compiled **template** be reused across many angle values without rebuilding or re-boxing it — exactly the same "structure once, values many times" idea Samplomatic already applies to random Pauli dressings.

Official reference: [Qiskit circuit library documentation](https://docs.quantum.ibm.com/).

## Related
- [[QuantumCircuit Basics]]
- [[The Primitives Family]]
- [[Samplomatic — Boxes and Annotations]] — the same "template once, bind many times" idea, applied to noise mitigation
- [[1D Ising Chain and the Mirror Trick]]
- [[Variational Quantum Eigensolver (VQE)]] — the real worked example this note only namedropped
- [[Data Encoding Circuits (Feature Maps)]], [[Quantum Neural Networks (QNN)]] — the same "structure once, bind many times" pattern, applied to encoding classical data instead of energy minimization

## Self-Check
- Why is a parameterized circuit transpiled once instead of once per parameter value?
- Could you explain to someone why variational algorithms like VQE and QAOA specifically benefit from this?
- What would change in [[1D Ising Chain and the Mirror Trick]]'s `construct_ising_circuit` if `rx_angle` were a `Parameter` instead of a float?
