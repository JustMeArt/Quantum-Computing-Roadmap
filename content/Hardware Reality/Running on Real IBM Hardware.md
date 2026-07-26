# Running on Real IBM Hardware
#qc/hardware

Once a circuit works on simulators and fake backends, submitting it to real hardware via `qiskit-ibm-runtime` is the natural next step — and the point where every noise mechanism studied ([[Depolarizing Noise]], [[Pauli Error Model]], [[Thermal Relaxation]]) shows up at once, plus effects no toy model fully captures (crosstalk, leakage, drift).

## Workflow

1. **Authenticate** — `QiskitRuntimeService.save_account(...)` once; reused automatically afterward.
2. **Pick a backend that supports the features you need** — for [[Dynamic GHZ via Qubit Reuse|dynamic circuits]] specifically, check for `if_else` in the backend's supported operations, or the `dynamic_reprate_enabled` flag. Eagle/Heron-class devices generally support this; not every backend does.
3. **Inspect hardware properties** ([[Backend Properties]]) before choosing a layout — pick physical qubits with good connectivity and low error rates for your circuit's specific interaction pattern.
4. **Transpile with that layout**, then submit via `SamplerV2`, which handles session management, queuing, and result packaging.
5. **Compare against an ideal simulator run of the same transpiled circuit** — the gap between them is a direct, visual measure of real-hardware noise.

```python
from qiskit_ibm_runtime import SamplerV2 as Sampler

sampler = Sampler(mode=backend)
job = sampler.run([transpiled_circuit])
result = job.result()
```

The gap between fake-backend prediction and real hardware is exactly the target of [[Error Suppression and Mitigation — Overview|quantum error mitigation techniques]] — narrowing that gap is an active, ongoing area, not something any of these toy noise models fully solves.

## Related
- [[Dynamic GHZ via Qubit Reuse]]
- [[Backend Properties]]
- [[Thermal Relaxation]]
- [[Error Suppression and Mitigation — Overview]] — the mitigation techniques that actually close this gap

## Self-Check
- Could you walk through the five-step workflow for running on real IBM hardware, in order?
- Why is step 5 — comparing against an ideal simulator run — an essential part of the workflow, not just a nice-to-have?
- What is the "gap" this note keeps referring to, and what closes it?
