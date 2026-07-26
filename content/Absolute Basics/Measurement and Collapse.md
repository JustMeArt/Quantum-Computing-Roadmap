---
order: 5
---

# Measurement and Collapse
#qc/basics #qc/math

Measuring a qubit $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ in the standard (Z) basis gives outcome 0 with probability $|\alpha|^2$ and outcome 1 with probability $|\beta|^2$ — the **Born rule**. Immediately after, the state is no longer $\alpha|0\rangle+\beta|1\rangle$: it's *exactly* $|0\rangle$ or *exactly* $|1\rangle$, matching whatever outcome occurred. **The superposition is destroyed by the act of measuring** — this is collapse, and it's irreversible.

## Why this makes quantum programs inherently probabilistic

A single run of a circuit on hardware gives you exactly one classical bit per qubit — never $\alpha$ and $\beta$ directly. To learn anything about the underlying amplitudes (or estimate an expectation value, see [[SparsePauliOp]]), you run the same circuit many times ("shots") and build up statistics over the outcomes. This is why Qiskit's [[The Primitives Family|`Sampler`]] returns a distribution of counts, not a single deterministic answer, and why quantities used throughout this vault (fidelity, expectation values) are *estimates*, not exact numbers, once real hardware is involved.

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit_aer.primitives import SamplerV2

qc = QuantumCircuit(1, 1)
qc.h(0)

# Simulator only: peek at exact amplitudes before measurement (impossible on real hardware)
Statevector(qc).probabilities()   # array([0.5, 0.5]) — the ground truth

qc.measure(0, 0)
result = SamplerV2().run([qc], shots=1000).result()
result[0].data.c.get_counts()     # e.g. {'0': 512, '1': 488} — the statistical estimate of that ground truth
```

## Related
- [[What is a Qubit]]
- [[Superposition]]
- [[Backend Properties]] — readout error: measurement itself isn't perfectly faithful on real hardware
- [[EstimatorOptions and the Five Mitigation Knobs|TREX]] — the mitigation technique specifically for readout error
- [[The Primitives Family]], [[Simulators — Statevector vs Shot-Based]]

## Self-Check
- Why can't you just "read off" $\alpha$ and $\beta$ from a single run on real hardware?
- What's the difference between what `Statevector(qc).probabilities()` gives you and what `SamplerV2` gives you, and why?
- Why does collapse being irreversible matter for how quantum programs have to be structured?
