# PEC — Probabilistic Error Cancellation
#qc/mitigation #qc/noise

Probabilistic Error Cancellation (PEC) mitigates gate noise by **probabilistically rewriting the circuit** to sample from the inverse noise channel. It produces an **unbiased** expectation value estimate when the noise model is accurate, at the cost of a sampling overhead $\gamma^2$.

## Core idea

PEC uses the learned [[NoiseLearnerV3 and Pauli-Lindblad Models|Pauli-Lindblad noise model]] to construct an inverse noise map (anti-noise), then:
1. Samples circuits from the quasi-probability distribution of the anti-noise
2. Each shot gets a $\pm 1$ sign from the quasi-probability weights
3. After averaging with rescaling by $\gamma$, the result is unbiased

## PEC vs PNA

| | PEC | PNA |
|---|---|---|
| Circuit | Rewritten (anti-noise sampling) | Unchanged |
| Observable | Unchanged | Rewritten to $\tilde{O}$ |
| Cost | Sampling overhead $\gamma^2$ | More observable terms |
| Bias | Exact | Exact (up to truncation) |
| Requires special structure | No | No (but works best on local observables) |

## Sampling overhead

$$\gamma = \exp\!\Big(2\sum_{l,\sigma} \lambda_{l,\sigma}\Big)$$

where $\lambda_{l,\sigma}$ is the learned rate of generator $\sigma$ at layer $l$.

The number of shots needed scales as $\gamma^2$. Because $\gamma$ is exponential in total circuit noise, PEC becomes expensive quickly as circuits grow deeper.

For a 100-qubit Trotter circuit at depth 4000, even at IBM's best current error rates, full PEC would take more than a day of QPU time.

## Runtime PEC vs Samplomatic PEC

| | Runtime `Estimator` PEC | Samplomatic PEC (Chapter 3) |
|---|---|---|
| Enable | `resilience.pec_mitigation = True` | `inject_noise_strategy="individual_modification"` + SLC |
| Per-layer control | None exposed | Full access via `noise_scales` per generator |
| Overhead control | `resilience.pec.max_overhead` cap | `bias_tolerance` in `compute_local_scales` |

The Runtime switch is convenient but the API exposes no per-layer or per-generator knobs. The sampling overhead can blow up because *every* learned generator is cancelled.

## PEC + SLC

[[SLC — Shaded Lightcones|SLC]] reduces PEC's overhead by pruning generators outside the observable's lightcone. This is the practical path for utility-scale PEC.

Full PEC is the limit of SLC at `bias_tolerance = 0` (cancel everything).

## Related
- [[EstimatorOptions and the Five Mitigation Knobs]]
- [[SLC — Shaded Lightcones]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[PNA — Propagated Noise Absorption]]
- [[Zero Noise Extrapolation (ZNE)]] — the cheaper, biased alternative; mutually exclusive with PEC on the same `EstimatorOptions`

## Self-Check
- Could you explain why PEC produces an unbiased estimate while ZNE doesn't?
- Why does PEC's sampling overhead grow exponentially with circuit depth?
- What's the practical difference between enabling PEC via `resilience.pec_mitigation` vs via Samplomatic's `individual_modification`?
