# EstimatorOptions and the Five Mitigation Knobs
#qc/mitigation #qc/qiskit

`EstimatorV2` exposes five suppression/mitigation techniques through `EstimatorOptions`. Each is a **circuit-wide switch** — it applies the same policy to every gate or layer in the circuit.

## The five techniques

### DD — Dynamical Decoupling (suppression)
Idle qubits drift due to slow coherent noise while waiting for other qubits to finish. DD inserts pulse sequences (e.g. XY4) on idle qubits that multiply to the identity, averaging away the drift. Only helps when the circuit has idle gaps — on a densely packed circuit it can hurt because the pulses themselves are imperfect.

```python
dd_options = EstimatorOptions()
dd_options.dynamical_decoupling.enable = True
dd_options.dynamical_decoupling.sequence_type = "XY4"
```

### PT — Pauli Twirling (suppression)
Sandwiches two-qubit gates between random single-qubit Paulis chosen so the ideal gate is unchanged. Averaged over many randomizations, an arbitrary noise channel becomes a stochastic **Pauli channel** — coherent error (which grows quadratically with depth) is reshaped into Pauli noise (grows only linearly). Prerequisite for PEA and PEC.

```python
pt_options = EstimatorOptions()
pt_options.twirling.enable_gates = True
pt_options.twirling.strategy = "active"
pt_options.twirling.num_randomizations = 32
```

### TREX — Twirled Readout Error Extinction (mitigation)
Targets measurement error. Randomly inserts X before measurement and flips the classical bit back. This diagonalizes the readout-error transfer matrix so it can be inverted by simple rescaling. **On by default** at resilience level 1.

```python
trex_options = EstimatorOptions()
trex_options.resilience.measure_mitigation = True
```

### ZNE — Zero-Noise Extrapolation (mitigation)
Runs the circuit at amplified noise levels (by gate folding: replace U with UU†U) and extrapolates back to zero noise. Not guaranteed unbiased. Default noise factors are [1, 3, 5], so roughly 3× shot overhead.

```python
zne_options = EstimatorOptions()
zne_options.resilience.zne_mitigation = True
zne_options.resilience.zne.noise_factors = [1, 3, 5]
zne_options.resilience.zne.amplifier = "pea"   # use PEA amplifier
```

### PEA — Probabilistic Error Amplification (used with ZNE)
Replaces ZNE's crude gate-folding with **learned** amplification. Learns the twirled Pauli-Lindblad noise model and amplifies by probabilistically injecting that learned noise — a more faithful scaling of actual device noise. Still uses ZNE's extrapolation step.

### PEC — Probabilistic Error Cancellation (mitigation)
Learns the noise model and **inverts** it by sampling "anti-noise" circuits. Gives an **unbiased** estimate. Cost: sampling overhead γ² that grows exponentially with circuit depth and total noise.

```python
pec_options = EstimatorOptions()
pec_options.resilience.pec_mitigation = True
pec_options.resilience.pec.max_overhead = 100
```

> ⚠️ ZNE/PEA and PEC are **mutually exclusive** — one amplifies noise, the other cancels it. Cannot be enabled on the same `EstimatorOptions`.

## resilience_level presets

| Level | Techniques enabled |
|---|---|
| 0 | None |
| 1 (default) | TREX |
| 2 | TREX + PT + ZNE |

## Sampling overhead

Mitigation is not free — cost is paid in **shots**, not qubits:

- ZNE with 3 noise factors + 32 randomizations → ~3 × 32 = 96× overhead
- PEC overhead: $J = \bar{\gamma}^{nd} \cdot \beta^d$ where $n$ = qubits, $d$ = depth, $\bar{\gamma}$ comes from the learned noise model. Grows **exponentially** with depth.

The whole-circuit API gives no access to the per-layer $\bar{\gamma}$ that drives this cost. That gap is what [[Samplomatic — Boxes and Annotations|Samplomatic]] fills.

## Related
- [[Dressed Gates and Pauli Propagation]]
- [[Samplomatic — Boxes and Annotations]]
- [[Error Suppression and Mitigation — Overview]]
- [[The Primitives Family]] — where `EstimatorOptions` fits into the primitives picture
- [[Zero Noise Extrapolation (ZNE)]] — a deeper dive on the ZNE knob summarized above
- [[M3 — Matrix-Free Measurement Mitigation]] — the Sampler-side, post-processing counterpart to TREX

## Self-Check
- Could you name all five techniques and say, for each, whether it's suppression or mitigation?
- Why are ZNE/PEA and PEC mutually exclusive?
- What's missing from this whole-circuit API that motivates [[Samplomatic — Boxes and Annotations|Samplomatic]]?
