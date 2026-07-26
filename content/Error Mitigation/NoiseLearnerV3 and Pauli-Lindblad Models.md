# NoiseLearnerV3 and Pauli-Lindblad Models
#qc/mitigation #qc/noise

`NoiseLearnerV3` characterizes each gate layer as a sparse **Pauli-Lindblad channel** by running calibration circuits on real hardware. The result is the per-layer noise description that [[PNA — Propagated Noise Absorption|PNA]], [[SLC — Shaded Lightcones|SLC]], and PEC use to mitigate errors.

> ⚠️ Noise learning **requires real QPU hardware** — simulators cannot provide the noise being characterized.

## The Pauli-Lindblad model

Each layer's noise is modeled as:

$$\Lambda = \exp(\mathcal{L}), \quad \mathcal{L}(\rho) = \sum_k \lambda_k \, (P_k \rho P_k - \rho)$$

- $\mathcal{L}$ is a superoperator acting on density matrices $\rho$
- $\Lambda = e^{\mathcal{L}}$ is its formal exponential (the actual noise channel)
- Each $P_k$ is a Hermitian Pauli ($P_k^\dagger = P_k$, $P_k^2 = I$)
- $\lambda_k$ is the **rate** of that Pauli generator — what NoiseLearnerV3 learns

### Generator set for a CZ layer on qubits (0, 1)

- 3 single-qubit generators per qubit: $X_0, Y_0, Z_0, X_1, Y_1, Z_1$ → 6 total
- 9 two-qubit generators: $XX, XY, XZ, YX, YY, YZ, ZX, ZY, ZZ$ → 9 total
- **Total: 15 generators** for a single CZ gate

The model does **not** capture:
- Coherent error (assumed twirled away into Pauli form first)
- Cross-layer crosstalk (generators outside a layer's qubit connectivity don't appear)

## Setup and configuration

```python
from qiskit_ibm_runtime.options_models.noise_learner_v3_options import NoiseLearnerV3Options
from qiskit_ibm_runtime.noise_learner_v3 import NoiseLearnerV3

nl_options = NoiseLearnerV3Options(
    num_randomizations=5,          # random benchmarking circuits per configuration
    shots_per_randomization=20,    # shots per circuit
    layer_pair_depths=[1, 2],      # depths at which each layer is repeated
)
learner = NoiseLearnerV3(backend, nl_options)
learner.options.environment.job_tags = ["my-experiment"]
```

The learner fits a **fidelity-vs-depth decay** to extract each generator's rate $\lambda_k$. More depths → more accurate fit.

## Running and fetching results

```python
# Submit (pass unique layers from find_unique_box_instructions)
learner_job = learner.run(unique_layers)
job_id = learner_job.job_id()

# Re-fetch on kernel restart
learner_job = service.job(saved_job_id)

# Get result
result = learner_job.result()

# Convert to {ref: PauliLindbladMap} dict
refs_to_noise = result.to_dict(unique_layers, require_refs=False)
```

## Inspecting the learned model

```python
ref, plm = next(iter(refs_to_noise.items()))

# List of (pauli_string, qubit_indices, rate) tuples
generators = plm.to_sparse_list()
generators.sort(key=lambda g: -abs(g[2]))   # sort by rate magnitude

# Print top 10
for pauli, qubits, rate in generators[:10]:
    print(f"{pauli} @ {qubits}: {rate:.4e}")
```

Typical dominant generators for a CZ on Heron hardware are single-qubit Z terms at rates ~$10^{-3}$.

## Per-layer noise differences

Even layers that play similar structural roles in a circuit (e.g. even-bond vs odd-bond CZ layers in an Ising brickwork) have **different learned noise profiles**. The dominant generator of one layer may be weak or absent in the other. This is the key motivation for per-layer mitigation — a uniform correction tuned for one layer's noise structure will mis-correct the other.

## Noise drift

QPU noise drifts daily due to recalibration. For best results, re-learn noise close to the time the final job is run. Results from different backends or different days are not interchangeable.

## Related
- [[Samplomatic — Boxes and Annotations]]
- [[Executor Primitive]]
- [[PNA — Propagated Noise Absorption]]
- [[SLC — Shaded Lightcones]]
- [[Density Matrix]] — the open-system/Lindblad formalism this model is a specialization of

## Self-Check
- Why does noise learning require real QPU hardware, unlike most of the rest of this vault's noise content?
- Could you explain why a single CZ gate has 15 noise generators, not just 1?
- Why do even-bond and odd-bond layers in the same circuit end up with different learned noise, despite playing symmetric roles?
