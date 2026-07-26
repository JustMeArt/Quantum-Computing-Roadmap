# Readout as a Confusion Matrix
#qc/noise #qc/hardware

A qubit is read out via **dispersive coupling** to a resonator: the qubit's state shifts the resonator's frequency slightly, and that shift is inferred from the reflected microwave signal's I/Q (in-phase/quadrature) components, classified against a decision boundary as $0$ or $1$. This classification step isn't perfect — [[Backend Properties|readout error]] is exactly the rate at which it gets it wrong.

## The confusion matrix formalism

For $n$ qubits, readout error is fully described by a $2^n\times2^n$ **confusion matrix** $M$:

$$\vec{p}_\text{meas} = M\,\vec{p}_\text{true}$$

where $\vec p_\text{true}$ is the true outcome-probability vector and $\vec p_\text{meas}$ is what you actually observe after readout error mixes things up. **Key insight:** this is a real matrix, not just an error rate — it captures *which* wrong outcomes a given true outcome tends to be confused with, not just how often readout is wrong overall. In principle, if $M$ is known and invertible, $M^{-1}\vec p_\text{meas}$ recovers an estimate of $\vec p_\text{true}$ — this is the formal object [[EstimatorOptions and the Five Mitigation Knobs|TREX]] is built to correct for, more efficiently than inverting the full $2^n\times2^n$ matrix directly.

## Related
- [[Backend Properties]]
- [[EstimatorOptions and the Five Mitigation Knobs]] — TREX, the readout-error-correction technique
- [[Coherent vs Incoherent Gate Errors]]
- [[Measurement and Collapse]]

## Self-Check
- Could you explain what dispersive readout physically measures, and why classification can go wrong?
- Why is a full confusion matrix more informative than a single readout error rate?
- What would $M^{-1}\vec p_\text{meas}$ give you, in principle, and why is that only "in principle"?
