# SLC — Shaded Lightcones
#qc/mitigation #qc/noise

[Shaded Lightcones (SLC)](https://qiskit.github.io/qiskit-addon-slc/) is an evolution of [[PEC — Probabilistic Error Cancellation|PEC]] that reduces its exponential sampling overhead by exploiting the **causal structure** of the circuit. Rather than cancelling all noise, it identifies which noise generators can actually affect the observable of interest and ignores the rest.

## Core idea

An observable measured at the end of a circuit can only be affected by noise **within its backward lightcone** — the set of circuit locations whose errors can propagate to the measurement. Errors outside the lightcone cannot influence the outcome and can be excluded from error cancellation.

SLC goes beyond a simple binary lightcone. It assigns each noise generator a **bound** on how strongly it can shift the observable, then uses a `bias_tolerance` budget to decide which generators to actively cancel vs leave alone.

## PEC vs SLC

| | PEC | SLC |
|---|---|---|
| What's cancelled | All noise generators in the circuit | Only generators within the observable's lightcone (above a bias threshold) |
| Sampling overhead $\gamma^2$ | Full: $\gamma = \exp(2 \sum_{l,\sigma} \lambda_{l,\sigma})$ | Reduced: only the cancelled subset contributes |
| Bias | Exact (with accurate model) | Small admitted bias (controlled by `bias_tolerance`) |
| Best for | General observables | **Local observables** with a narrow lightcone |

## Why locality matters

A local observable (e.g. $Z_7$ on one qubit) has a narrow backward lightcone — only a small fraction of circuit gates can affect it. SLC prunes the vast majority of noise generators, dramatically reducing $\gamma^2$.

A global observable (e.g. $\sum_i Z_i$) has a lightcone spanning the entire circuit — SLC provides little reduction over full PEC.

## SLC workflow

### 1. Box with individual_modification

```python
slc_boxing_pm = generate_boxing_pass_manager(
    enable_gates=True,
    enable_measures=True,
    measure_annotations="all",
    twirling_strategy="active",
    inject_noise_targets="gates",
    inject_noise_strategy="individual_modification",   # ← SLC requires this
)
boxed_circuit_slc = slc_boxing_pm.run(isa_circuit_slc)
```

`individual_modification` gives each box its own `noise_scales.<ref>` slot so SLC can scale each generator independently.

### 2. Predict noise model Paulis (no QPU needed)

```python
from qiskit_addon_slc.utils import generate_noise_model_paulis

noise_model_paulis = generate_noise_model_paulis(
    unique_layers, backend.coupling_map, boxed_circuit
)
noise_model_rates = {ref: None for ref in noise_model_paulis}   # rates unknown yet
```

This step scans the boxed circuit and generates all weight-1 and weight-2 Pauli terms supported by the qubit connectivity — the **possible** noise support, independent of noise strength. No QPU time used.

### 3. Compute forward and backward bounds

```python
from qiskit_addon_slc.bounds import compute_forward_bounds, compute_backward_bounds

# Forward bounds: how each error can propagate forward to the observable
# (observable-dependent, compute once per observable)
forward_bounds = compute_forward_bounds(
    boxed_circuit,
    noise_model_paulis,           # positional
    observable=obs_isa,           # keyword
    evolution_max_terms=1000,
    eigval_max_qubits=18,
    atol=1e-8,
    num_processes=8,
    timeout=600,
)

# Backward bounds: how errors propagate backward from the observable
# (observable-independent, compute once)
backward_bounds = compute_backward_bounds(
    boxed_circuit,
    noise_model_paulis,           # positional
    evolution_max_terms=1000,
    num_processes=1,
    timeout=600,
)
```

> ⚠️ API gotcha: `noise_model_rates` is **not** a parameter of these functions in current versions. The observable is a **keyword** argument for `compute_forward_bounds`. `compute_backward_bounds` does not accept `atol` or `eigval_max_qubits`.

### 4. Merge bounds (requires learned noise)

```python
from qiskit_addon_slc.bounds import merge_bounds

merged = merge_bounds(
    forward_bounds,
    backward_bounds,
    refs_to_noise_models,          # learned rates needed here
    id_map,
)
```

Merging picks the transition point in the circuit where backward switches to forward bounds, minimizing total estimated bias. **Requires learned noise rates** — the circuit must be re-characterized if the qubit count changed since the last learning run.

### 5. Compute local scales

```python
from qiskit_addon_slc.bounds import compute_local_scales

local_scales, sampling_cost, residual_bias = compute_local_scales(
    merged,
    bias_tolerance=chosen_bias_threshold,
)
```

Returns:
- `local_scales` — per-generator scale factors (0 = cancel, 1 = leave, intermediate = partial)
- `sampling_cost` — predicted $\gamma^2$ for this tolerance
- `residual_bias_bound` — bias from leaving some generators unmitigated

### 6. Execute with Executor

```python
# Compute gamma for PEC+SLC normalization
from qiskit_addon_utils.noise_management import gamma_from_noisy_boxes
import numpy as np

gamma_slc = gamma_from_noisy_boxes(refs_to_noise_models, id_map, local_scales)
gamma_slc = np.asarray(gamma_slc).item()   # must be scalar

# Bind local_scales into samplex arguments
samplex_args = (
    samplex.inputs()
    .make_broadcastable()
    .bind(
        pauli_lindblad_maps=refs_to_noise_models,
        noise_scales=local_scales,
        # noise_scales=-1 means "use PEC anti-noise", 0 means "unmitigated"
    )
)
```

## Sampling overhead comparison

For `obs_Z7` (local, single qubit) on a 15-qubit, 3-step Ising mirror:
- Full PEC: $\gamma^2$ from all generators in the circuit
- SLC at low `bias_tolerance`: $\gamma^2$ drops by factors of 10–100× compared to full PEC
- The trade-off is **bias for cost** — a small admitted bias buys a large overhead reduction

For a 7-qubit-wide observable on the same circuit, the lightcone is much wider and SLC provides much less reduction.

## Exercise 5 — Locality comparison

Three observables with different locality on a 15-qubit, 3-step Ising chain:

```python
# Local: Z on qubit 7 only
obs_Z7 = SparsePauliOp.from_sparse_list([("Z", [7], 1.0)], num_qubits=15)

# Two-body: X on qubit 3, Z on qubit 11
obs_X3_Z11 = SparsePauliOp.from_sparse_list([("XZ", [3, 11], 1.0)], num_qubits=15)
# Note: "XZ" maps left-to-right: X→qubit 3, Z→qubit 11

# Global-ish: Z on 7 central qubits (single 7-body Pauli product)
obs_7_Zs = SparsePauliOp.from_sparse_list(
    [("ZZZZZZZ", [4, 5, 6, 7, 8, 9, 10], 1.0)],
    num_qubits=15,
)
```

Expected: `obs_Z7` sees the greatest SLC overhead reduction; `obs_7_Zs` sees the least.

## Related
- [[PNA — Propagated Noise Absorption]]
- [[PEC — Probabilistic Error Cancellation]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[Samplomatic — Boxes and Annotations]]
- [[Executor Primitive]]
- [[1D Ising Chain and the Mirror Trick]]

## Self-Check
- Could you explain why a local observable benefits far more from SLC than a global one?
- What does `bias_tolerance` actually trade off, and what are the three outputs of `compute_local_scales`?
- Why is full PEC described as "the limit of SLC at `bias_tolerance = 0`"?
