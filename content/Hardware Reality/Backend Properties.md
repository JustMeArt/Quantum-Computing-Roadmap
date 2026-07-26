# Backend Properties
#qc/hardware

A backend isn't just "a chip with qubits" — it's characterized by a specific set of measurable properties that determine how a circuit will actually run on it, and how much it will degrade once it does.

The core properties to know:

- **Basis gates** — the native gate set the hardware can physically execute (e.g. `rz`, `sx`, `x`, `cz`). Anything outside this set gets decomposed by the transpiler.
- **Coupling map** — which physical qubits can interact directly via a two-qubit gate. See [[Coupling Map and Topology]].
- **CLOPS** (circuit layer operations per second) — a throughput metric, roughly "how many layers of gates can this device execute per second."
- **Gate errors** — per-gate error rates, usually much higher for two-qubit gates than single-qubit gates.
- **Readout errors** — the chance a measurement reports the wrong bit even if the qubit's state was correct.
- **$T_1$ / $T_2$** — coherence timescales; see [[Thermal Relaxation]].

None of these are uniform across a chip — different physical qubits and different qubit pairs can have meaningfully different error rates, which is exactly why layout choice matters (see [[Physical vs Logical Qubits and Layout]]).

**Concrete scale:** the median two-qubit gate error rate is typically about **10x** the median single-qubit error rate. Useful circuits on IBM's newest devices currently run to roughly O(100) two-qubit gate layers and up to ~10,000 total two-qubit gates — extendable further with the techniques in [[Error Suppression and Mitigation — Overview|the Error Mitigation section]].

## Practical access in Qiskit

```python
from qiskit_ibm_runtime import QiskitRuntimeService

service = QiskitRuntimeService()
backend = service.backend("ibm_fez")

basis_operations = backend.operation_names   # property, not a method
coupling_map = backend.coupling_map.get_edges()  # returns list[tuple[int, int]]
```

Two easy-to-miss gotchas here — see [[Qiskit API Gotchas]] for the full pattern: `operation_names` and `coupling_map` are **properties**, not methods (no parentheses), and `backend.coupling_map` is a `CouplingMap` object, not a plain list — call `.get_edges()` if you need a plain `list[tuple[int,int]]` (e.g. for strict type-checked graders).

## Two ways to simulate backend-informed noise

1. `AerSimulator.from_backend(backend)` — builds a simulator using the real (or fake) backend's calibration data: basis gates, coupling map, and measured error rates. See [[Simulators — Statevector vs Shot-Based]].
2. Manually constructed noise models — build a `NoiseModel` from individual pieces like [[Depolarizing Noise]], [[Pauli Error Model]], or [[Thermal Relaxation]], useful when you want to isolate and study *one* noise mechanism at a time rather than realistic composite noise.

## Related
- [[Coupling Map and Topology]]
- [[Physical vs Logical Qubits and Layout]]
- [[Thermal Relaxation]]
- [[Depolarizing Noise]], [[Pauli Error Model]] — noise mechanisms this data feeds into
- [[Qiskit API Gotchas]]
- [[GHZ States]]
- [[What is a Quantum Computer]] — the physical reality (cryostats, decoherence) behind these numbers
- [[Simulators — Statevector vs Shot-Based]]

## Self-Check
- Could you name the six core backend properties and what each one tells you?
- Why aren't gate errors and $T_1$/$T_2$ uniform across a chip?
- What's the difference between `AerSimulator.from_backend(backend)` and a manually constructed noise model?
