# Coherent vs Incoherent Gate Errors
#qc/noise

Not all gate errors accumulate the same way with circuit depth — the distinction matters for predicting how badly a deep circuit will actually degrade.

- **Coherent (systematic) errors** — deterministic miscalibration, e.g. a gate that over-rotates by a small fixed angle every time. In principle correctable if you knew the exact miscalibration.
- **Incoherent errors** — decoherence-driven, fundamentally stochastic (see [[Physical Decoherence Mechanisms]]). Not correctable by better calibration, because there's no fixed error to calibrate away.
- **Crosstalk** — a third category, from unwanted coupling between qubits rather than either qubit's own imperfection.

## Why the distinction matters: different depth scaling

**Key insight:** in the short-time/shallow-circuit limit, **coherent error accumulates quadratically** with circuit depth (small systematic rotations compound coherently, adding up like amplitudes), while **incoherent error accumulates linearly** (independent random events just add in probability). **SPAM errors** (state preparation and measurement) add a **depth-independent constant offset** — they happen once per circuit, not once per layer.

This means two circuits with the same *total* error budget can behave very differently: a circuit dominated by coherent error gets disproportionately worse as it gets deeper, while one dominated by incoherent error degrades more predictably. [[EstimatorOptions and the Five Mitigation Knobs|Pauli twirling]] exists specifically to convert coherent error into incoherent (Pauli) error — trading the bad quadratic scaling for the more benign linear one, at the cost of extra randomization overhead.

## Related
- [[Physical Decoherence Mechanisms]]
- [[Pauli Error Model]]
- [[EstimatorOptions and the Five Mitigation Knobs]] — Pauli twirling as coherent-to-incoherent conversion
- [[Readout as a Confusion Matrix]]

## Self-Check
- Could you explain the difference between coherent and incoherent errors, and why only one is "correctable by calibration"?
- Why does coherent error scale quadratically with depth while incoherent error scales linearly?
- Why does Pauli twirling deliberately convert coherent error into incoherent error, given incoherent sounds worse?
