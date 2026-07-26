# M3 — Matrix-Free Measurement Mitigation
#qc/mitigation #qc/qiskit

A scalable readout-error mitigation method that corrects measurement bitstring counts in post-processing without ever building the full $2^n \times 2^n$ assignment matrix that naive readout correction requires. M3 assumes correlations of order three and higher between qubit readout errors are negligible, so it only needs small $2\times2$ (single-qubit) and $4\times4$ (two-qubit) assignment matrices, built by preparing all qubits in $|0\ldots0\rangle$ and $|1\ldots1\rangle$ and measuring their error rates. These small matrices are then combined **only for the bitstrings actually observed** in a run, so the effective mitigation matrix scales with the number of *distinct sampled outcomes*, not $2^n$ — which is what lets M3 mitigate circuits with far more qubits than a full linear-algebra inversion could handle. **Key insight:** M3 is a post-processing correction applied to *counts you already have*, unlike [[EstimatorOptions and the Five Mitigation Knobs|TREX]], which changes what happens *during* circuit execution (randomized bit-flips before measurement) to make the readout-error matrix invertible in the first place — the two are complementary, not competing: TREX conditions the noise, M3 corrects the counts after the fact.

```python
import mthree

meas_map = mthree.utils.final_measurement_mapping(optimized_circuit)
mit = mthree.M3Mitigation(backend)
mit.cals_from_system(meas_map)

quasi_probs = mit.apply_correction(counts, meas_map)  # quasi-probability distribution
```

## API notes
- `mthree.utils.final_measurement_mapping(circuit)` recovers which **physical** qubits the classical bits actually correspond to after transpilation/routing — required before calibration, since M3 needs to calibrate the exact physical qubits used, not the virtual/logical ones.
- `.cals_from_system(meas_map)` runs the $|0\ldots0\rangle$/$|1\ldots1\rangle$ calibration circuits on the backend for just the qubits in `meas_map`.
- `.apply_correction(counts, meas_map)` returns **quasi-probabilities** (can include small negative values from the correction), not counts — convert back to a valid distribution by clipping negatives to zero and renormalizing before further analysis.
- M3 correction is applied on top of *raw sampled counts*, so it composes with circuit-level suppression techniques (dynamical decoupling, gate/measurement twirling) applied beforehand — mitigating readout error doesn't preclude also suppressing coherent error during execution.

## Related
- [[EstimatorOptions and the Five Mitigation Knobs]] — TREX is the Estimator-side readout mitigation; M3 is the Sampler-side, post-processing alternative
- [[PEC — Probabilistic Error Cancellation]]
- [[Zero Noise Extrapolation (ZNE)]]
- [[The Partition Problem — QAOA Worked Example]] — M3 is compared against no-mitigation, suppression-only, and combined configurations on this worked example

## Self-Check
- Why does M3 avoid building the full $2^n \times 2^n$ assignment matrix, and what assumption makes that possible?
- What's the difference between what TREX does and what M3 does, and why are they complementary rather than redundant?
- Why does `apply_correction` return quasi-probabilities that can include negative values, and what do you need to do before treating them as a normal distribution?
