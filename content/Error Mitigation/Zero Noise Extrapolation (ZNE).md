# Zero Noise Extrapolation (ZNE)
#qc/mitigation

A mitigation technique that deliberately runs a circuit at several **amplified** noise levels, then extrapolates the resulting expectation values back to the zero-noise limit — the value the circuit would produce on a noiseless device. The default amplification is gate folding: replacing a unitary $U$ with $U U^\dagger U$ (or higher odd repetitions) to scale up the effective noise per gate by an integer factor while leaving the ideal computation unchanged, at noise factors typically $[1, 3, 5]$. Each noise-scaled circuit is measured, and a fit (linear or polynomial) across the noise-factor/expectation-value pairs is extrapolated to noise factor 0. **Key insight:** ZNE is not guaranteed unbiased — it depends on the extrapolation model matching how the real device's noise actually scales with the folding factor — which is exactly what distinguishes it from [[PEC — Probabilistic Error Cancellation|PEC]]: PEC *inverts* a learned noise model for an unbiased (but exponentially expensive) estimate, while ZNE *extrapolates* a trend for a cheaper but approximate one. `EstimatorOptions.resilience.zne_mitigation` and `.resilience.pec_mitigation` are mutually exclusive on the same options object — one amplifies noise, the other cancels it, and Runtime doesn't support both in the same call.

```python
from qiskit_ibm_runtime import EstimatorV2 as Estimator
from qiskit_ibm_runtime.options import EstimatorOptions

options = EstimatorOptions()
options.default_shots = 10_000
options.resilience.zne_mitigation = True
options.twirling.enable_gates = True
options.twirling.enable_measure = True

estimator = Estimator(backend, options=options)
```

## Cost
Each additional noise factor is a separate circuit execution, so ZNE with 3 noise factors costs roughly 3× the shots of an unmitigated run — before accounting for any additional overhead from combining it with gate/measurement twirling (typically run alongside ZNE to also suppress coherent error). This is far cheaper than PEC's $\gamma^2$ overhead, which is why ZNE is the default at `resilience_level = 2` while PEC must be explicitly requested — ZNE trades some bias for keeping the shot cost roughly constant regardless of circuit depth, whereas PEC's cost grows exponentially with depth.

## Related
- [[EstimatorOptions and the Five Mitigation Knobs]] — where ZNE sits among the five whole-circuit mitigation/suppression knobs, including the PEA variant that replaces gate-folding with learned amplification
- [[PEC — Probabilistic Error Cancellation]] — the unbiased, more expensive alternative; mutually exclusive with ZNE on the same `EstimatorOptions`
- [[M3 — Matrix-Free Measurement Mitigation]] — a separate readout-only correction that composes with either ZNE or PEC
- [[The Partition Problem — QAOA Worked Example]] — ZNE is compared against no-mitigation, TREX, and PEC on this worked example

## Self-Check
- Why isn't ZNE guaranteed to produce an unbiased result, unlike PEC?
- What does "gate folding" mean, and why does replacing $U$ with $UU^\dagger U$ leave the ideal computation unchanged while still amplifying noise?
- Why can't `zne_mitigation` and `pec_mitigation` both be enabled on the same `EstimatorOptions`?
