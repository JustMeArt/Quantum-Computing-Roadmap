# The Primitives Family
#qc/programming #qc/qiskit

Qiskit doesn't "run a circuit and read qubits directly" — it runs a circuit through a **primitive**, an object that abstracts over simulator-vs-real-hardware and returns one of two things: bitstring counts, or expectation values.

## The two base primitives

| Primitive | Returns | Needs |
|---|---|---|
| `Sampler` | Bitstring counts/probabilities | Circuit **with** measurement gates |
| `Estimator` | Expectation values of an observable | Circuit **without** measurement — a [[SparsePauliOp]] instead |

```python
from qiskit_aer.primitives import SamplerV2, EstimatorV2
from qiskit import QuantumCircuit
from qiskit.quantum_info import SparsePauliOp

qc = QuantumCircuit(1)
qc.h(0)

# Sampler needs an explicit measurement
sampler_qc = qc.copy()
sampler_qc.measure_all()
SamplerV2().run([sampler_qc], shots=1000).result()[0].data.meas.get_counts()

# Estimator needs an observable, not a measurement
obs = SparsePauliOp('Z')
EstimatorV2().run([(qc, obs)]).result()[0].data.evs
```

## A third family member

[[Executor Primitive|Executor]] is the box-aware counterpart used by [[Samplomatic — Boxes and Annotations|Samplomatic]] — same family, but it consumes a `QuantumProgram` built from a template + samplex instead of a plain circuit. See [[Executor Primitive]] for the full workflow.

## PUBs (Primitive Unified Blocs)

Every primitive call takes a **list of PUBs** — tuples describing one job of work:

- `Sampler` PUB: `(circuit,)` or `(circuit, parameter_values)`
- `Estimator` PUB: `(circuit, observable)` or `(circuit, observable, parameter_values)`

Submitting a list of PUBs in one `.run()` call batches many circuits/observables/parameter sets into a single job — see [[Parameterized Circuits]] for why the parameter-values slot matters.

## Local vs Runtime

- **Local** (`qiskit.primitives`, `qiskit_aer.primitives`) — runs on your machine, either exact statevector math or local noisy simulation. See [[Simulators — Statevector vs Shot-Based]].
- **Runtime** (`qiskit_ibm_runtime`) — submits to real IBM hardware or cloud simulators, and is where [[EstimatorOptions and the Five Mitigation Knobs|EstimatorOptions]] (suppression/mitigation knobs) and session/job management live. See [[Running on Real IBM Hardware]].

Same PUB-based interface either way — swapping `qiskit_aer.primitives.SamplerV2` for `qiskit_ibm_runtime.SamplerV2` is usually the only code change needed to go from local testing to real hardware.

Official reference: [Qiskit primitives documentation](https://docs.quantum.ibm.com/).

## Related
- [[QuantumCircuit Basics]]
- [[EstimatorOptions and the Five Mitigation Knobs]]
- [[Executor Primitive]]
- [[Running on Real IBM Hardware]]
- [[Measurement and Collapse]] — why Sampler returns statistics, not exact amplitudes

## Self-Check
- How would you explain the difference between `Sampler` and `Estimator` to someone who's never used either?
- Why does `Sampler` need a measurement gate in the circuit while `Estimator` doesn't?
- What does going from local testing to real hardware actually require you to change in your code?
