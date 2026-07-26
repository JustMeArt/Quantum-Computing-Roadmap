# Transpilation
#qc/hardware

The process of turning an abstract circuit (H, CX, arbitrary qubit indices) into one that respects real hardware constraints:

1. **Limited native gate set** — IBM Heron processors use only {R_Z, √X, X, CZ}. No H, no CX — these get decomposed into combinations of native gates.
2. **Limited connectivity** — not all qubit pairs are physically connected; a two-qubit gate between non-neighbors needs inserted **SWAP** gates (each = 3 CZ gates).
3. **Physical qubit assignment (layout)** — abstract qubit 0 gets mapped to some specific physical qubit.

```python
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager
pm = generate_preset_pass_manager(optimization_level=1, backend=backend, initial_layout=[...])
isa_qc = pm.run(qc)
```

**Effects to expect:** depth typically *increases* (each abstract gate expands into several native gates). If your abstract circuit already matches the hardware's connectivity, no SWAPs are needed and the increase is smaller. If it ignores topology (e.g. a fan-out GHZ on a line-connected chip), the transpiler inserts many SWAPs and depth/gate-count jumps dramatically.

If layout changes which physical qubit is which, an [[SparsePauliOp|observable]] used for measurement must also be remapped via `.apply_layout(isa_qc.layout)`.

## Related
- [[SparsePauliOp]]
- [[Heavy-Hex Topology]]
- [[Coupling Map and Topology]] — the general concept behind point 2 (limited connectivity)
- [[Physical vs Logical Qubits and Layout]] — deeper dive on point 3 (layout)
- [[SWAP Overhead and Routing]] — the concrete cost of routing around limited connectivity
- [[Backend Properties]] — where the native gate set, coupling map, and error rates actually come from
- [[Bridge Gate Identity]] — an alternative to SWAP for one non-local gate
- [[Circuit Depth]]
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] — a deep dive for the special case where the circuit's gates commute, turning this NP-hard problem tractable

## Self-Check
- Could you name the three main things transpilation has to solve, in your own words?
- Why does depth typically increase after transpiling, even for a circuit that was already efficient?
- If you change a circuit's layout, what else has to be updated, and why?
