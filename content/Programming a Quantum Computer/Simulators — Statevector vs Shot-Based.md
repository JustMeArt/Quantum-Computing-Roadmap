# Simulators — Statevector vs Shot-Based
#qc/programming #qc/qiskit

Two fundamentally different ways to run a circuit without real hardware.

## Statevector simulation

Computes the exact amplitudes directly — no sampling, no shot noise, the mathematical ground truth.

```python
from qiskit.quantum_info import Statevector
from qiskit import QuantumCircuit

qc = QuantumCircuit(1)
qc.h(0)
Statevector(qc).probabilities()   # array([0.5, 0.5]) — exact, not estimated
```

**Key insight:** this only works because the simulator can see amplitudes directly — something no real device can ever give you (see [[Measurement and Collapse]]). It also doesn't scale: representing $n$ qubits exactly needs $2^n$ complex amplitudes, so this is a debugging/learning tool for small circuits, not a path to simulating utility-scale circuits. **Concretely:** exact statevector simulation becomes infeasible beyond roughly 30 qubits, and 50 qubits alone would need on the order of 8 petabytes of RAM. Simulating *noisy* circuits is worse still — density-matrix simulation (see [[Density Matrix]]) scales as $4^n$, strictly worse than statevector's already-brutal $2^n$, since $\rho$ is a $2^n\times2^n$ matrix ($4^n$ entries) where $|\psi\rangle$ is just a $2^n$-entry vector.

## Shot-based simulation

`AerSimulator` simulates individual measurement shots the way real hardware actually behaves — you get counts, not exact probabilities, with statistical noise from finite sampling even when the simulator itself is otherwise "clean" (noiseless).

```python
from qiskit_aer import AerSimulator
from qiskit import QuantumCircuit, transpile

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

sim = AerSimulator()
counts = sim.run(transpile(qc, sim), shots=1000).result().get_counts()
# e.g. {'0': 512, '1': 488} — sampling noise even though the simulator has zero hardware noise
```

## Adding realistic noise

`AerSimulator.from_backend(backend)` builds a shot-based simulator informed by a real (or fake) backend's actual calibration data — basis gates, coupling map, measured error rates — see [[Backend Properties]] for the full breakdown of what that data contains.

**Fake backends** (e.g. `FakeTorino`, used in [[Heavy-Hex Topology]]) package up a real device's calibration snapshot without needing live hardware access — useful for realistic testing without consuming QPU time or waiting in a queue.

Official reference: [Qiskit Aer documentation](https://docs.quantum.ibm.com/).

## Related
- [[Measurement and Collapse]]
- [[Backend Properties]]
- [[Heavy-Hex Topology]]
- [[The Primitives Family]] — local primitives wrap these same two simulation modes
- [[Density Matrix]] — the noisy-simulation object, and why it scales even worse

## Self-Check
- Why does statevector simulation give you "ground truth" while shot-based simulation still has noise even with zero hardware error?
- Why doesn't statevector simulation scale to large circuits?
- What's the point of a fake backend like `FakeTorino` if it's still just a simulator?
- Why does density-matrix (noisy) simulation scale as $4^n$ instead of $2^n$?
