# Noisy Execution & Fidelity
#qc/hardware #qc/noise

Comparing a topology-**naive** GHZ (e.g. fan-out from qubit 0, ignoring hardware connectivity → many inserted SWAPs) against a topology-**aware** GHZ (e.g. start-from-middle, matching physical connectivity → no SWAPs) on a noisy simulator (FakeTorino) shows the efficient circuit achieves significantly higher fidelity.

**Why:**
- Fewer CZ gates → fewer sources of two-qubit error
- Lower depth → less time for qubits to decohere
- No SWAP gates → no routing overhead

Absolute fidelities on real noisy hardware for e.g. a 15-qubit GHZ are often only ~0.4–0.6, not near-1 — every two-qubit gate adds error and there are many. What matters is the **relative** improvement of efficient vs. naive design.

**Takeaway:** circuit optimization isn't academic — it directly determines whether your computation's results are usable.

## Related
- [[Heavy-Hex Topology]]
- [[Transpilation]]
- [[Circuit Depth]]
- [[Density Matrix]] — the underlying formalism every noise model below transforms
- [[Depolarizing Noise]], [[Pauli Error Model]], [[Thermal Relaxation]] — the specific toy noise mechanisms behind fidelity loss
- [[Backend Properties]] — where realistic per-qubit/per-gate error rates come from
- [[Running on Real IBM Hardware]] — the same naive-vs-aware comparison, run for real instead of simulated

## Self-Check
- Could you list the three concrete reasons a topology-aware GHZ circuit beats a naive one on fidelity?
- Why does the note emphasize *relative* improvement rather than absolute fidelity numbers?
- What's the practical takeaway here, in your own words?
