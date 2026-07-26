# PNA — Propagated Noise Absorption
#qc/mitigation #qc/noise

[Propagated Noise Absorption (PNA)](https://qiskit.github.io/qiskit-addon-pna/) mitigates gate noise by **rewriting the observable** rather than the circuit. It propagates the inverse of each layer's learned Pauli-Lindblad noise forward through the circuit and absorbs it into the measurement observable, producing a *noise mitigating observable* $\tilde{O}$.

## Core idea

- **Circuit**: unchanged
- **Observable**: rewritten from $O$ to $\tilde{O}$

Measuring $\tilde{O}$ on the noisy circuit gives the same expectation value as measuring $O$ on the ideal (noiseless) circuit.

This works because Pauli noise channels compose and propagate efficiently through Clifford gates via the [[Dressed Gates and Pauli Propagation|commutation rules]] from section 1.2.

## PNA vs PEC

| | PNA | PEC |
|---|---|---|
| Circuit | Unchanged | Rewritten (anti-noise sampling) |
| Observable | Rewritten to $\tilde{O}$ | Unchanged |
| Cost | More observable terms to measure | Sampling overhead $\gamma^2$ |
| Bias | Exact (up to truncation) | Exact (with accurate model) |

## Boxing strategy

PNA uses `inject_noise_strategy="uniform_modification"`. All layers share a global `noise_scales` slot, set to 0 — this leaves the sampled circuits untouched while still associating each layer with its learned model so the model can be propagated into the observable.

```python
pna_boxing_pm = generate_boxing_pass_manager(
    enable_gates=True,
    enable_measures=True,
    measure_annotations="all",       # adds ChangeBasis annotation too
    twirling_strategy="active",
    inject_noise_targets="gates",
    inject_noise_strategy="uniform_modification",
)
```

`measure_annotations="all"` adds both `Twirl` and `ChangeBasis` to the measurement box, because $\tilde{O}$ will contain non-Z terms that require measuring in different bases.

## Four-step PNA workflow

### 1. Box the circuit
```python
boxed_circuit_pna = pna_boxing_pm.run(mirror_isa_pna)
unique_layers_pna = find_unique_box_instructions(
    boxed_circuit_pna, normalize_annotations=None, undress_boxes=True
)
```

### 2. Learn the noise
```python
refs_to_noise_models_pna = noise_result_pna.to_dict(unique_layers_pna, require_refs=False)
```

### 3. Compute the noise mitigating observable $\tilde{O}$

```python
from qiskit_addon_pna import generate_noise_mitigating_observable

# Define target observable
target_obs = SparsePauliOp.from_sparse_list(
    [("ZZ", [4, 5], 1.0)],   # e.g. Z₄Z₅
    num_qubits=10,
)
target_obs_isa = target_obs.apply_layout(mirror_isa_pna.layout)

# Generate noise mitigating observable
obs_tilde = generate_noise_mitigating_observable(
    boxed_circuit_pna,
    target_obs_isa,
    refs_to_noise_models_pna,
    max_err_terms=10000,
    max_obs_terms=10000,
    num_processes=8,
)
```

The function propagates the **inverse** of each layer's noise channel through the circuit using [[Dressed Gates and Pauli Propagation|Clifford conjugation]], then folds those corrections into $O$ to produce $\tilde{O}$.

**Truncation**: `max_err_terms` and `max_obs_terms` keep only the dominant terms so $\tilde{O}$ remains measurable. More terms → better accuracy, but more measurement bases required.

### 4. Run with Executor

```python
# Use ChangeBasis because obs_tilde has non-Z terms
samplex_args = (
    samplex.inputs()
    .make_broadcastable()
    .bind(
        pauli_lindblad_maps=refs_to_noise_models_pna,
        basis_changes=get_measurement_bases(obs_tilde),
        noise_scales={ref: 0 for ref in refs_to_noise_models_pna},
    )
)
```

## What $\tilde{O}$ looks like

For a ZZ observable on the middle pair of a 10-qubit chain:
- The original ZZ term at magnitude 1 remains the dominant term (slightly amplified above 1)
- Many new Pauli terms appear — these are the anti-noise corrections PNA propagated from the learned noise model
- Results vary by QPU and calibration date

## Adding TREX on top of PNA

PNA mitigates gate noise; [[EstimatorOptions and the Five Mitigation Knobs|TREX]] handles readout errors. They compose:

```python
from qiskit_addon_utils.noise_management import trex_factors

rescale = trex_factors(
    meas_results,
    obs_tilde,
    measurement_flips=flips,
)
# Pass rescale_factors=rescale to executor_expectation_values
```

PNA + TREX consistently outperforms either alone on hardware.

## Exercise 4 — Magnetization observable

Build $\tilde{O}_Z$ for the magnetization $O_Z = \sum_{i=0}^{9} Z_i$ on a 10-qubit chain:

```python
target_observable_ex4 = SparsePauliOp.from_sparse_list(
    [("Z", [i], 1.0) for i in range(10)],
    num_qubits=10,
)
target_observable_ex4_isa = target_observable_ex4.apply_layout(mirror_isa_pna.layout)

obs_tilde_ex4 = generate_noise_mitigating_observable(
    boxed_circuit_pna,
    target_observable_ex4_isa,
    refs_to_noise_models_pna,
    max_err_terms=10000,
    max_obs_terms=10000,
    num_processes=8,
)
```

Ideal value: $\langle O_Z \rangle = 10$ (all qubits in $|0\rangle$ give $\langle Z_i \rangle = +1$).

## Related
- [[Samplomatic — Boxes and Annotations]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[Executor Primitive]]
- [[Dressed Gates and Pauli Propagation]]
- [[SLC — Shaded Lightcones]]
- [[1D Ising Chain and the Mirror Trick]]

## Self-Check
- Could you explain to someone how PNA mitigates noise without touching the circuit at all?
- Why does PNA need `uniform_modification` specifically, with `noise_scales` set to 0?
- Why does $\tilde{O}$ end up needing more measurement bases than the original observable $O$?
