# Executor Primitive
#qc/mitigation #qc/qiskit

The `Executor` is the box-aware counterpart to [[The Primitives Family|`Sampler` and `Estimator`]]. It runs programs built from [[Samplomatic — Boxes and Annotations|Samplomatic]] templates and samplexes, honoring `Twirl`, `InjectNoise`, and `ChangeBasis` annotations at execution time.

## Key difference from Sampler/Estimator

| Primitive | Input | Use case |
|---|---|---|
| `Sampler` / `Estimator` | PUBs (circuit + params + observables) | Standard circuits |
| `Executor` | `QuantumProgram` with `SamplexItem`s | Box-annotated circuits with per-layer mitigation |

## The full workflow

```python
from qiskit_ibm_runtime import Executor, QuantumProgram

# 1. Build template + samplex from boxed circuit
template, samplex = build(boxed_circuit)

# 2. Inspect what the samplex needs
print(samplex.inputs())   # shows pauli_lindblad_maps.<ref> slots

# 3. Bind the learned noise models
samplex_args = (
    samplex.inputs()
    .make_broadcastable()
    .bind(pauli_lindblad_maps=refs_to_noise_models)
)

# 4. Assemble QuantumProgram
program = QuantumProgram(shots=64)
program.append_samplex_item(
    template,
    samplex=samplex,
    samplex_arguments=samplex_args,
    shape=(16,),    # number of randomizations
)

# 5. Submit
executor = Executor(backend)
job = executor.run(program)
```

## samplex.inputs() and binding

The samplex reports which runtime slots it needs. For a circuit with `Twirl` + `InjectNoise`:

```
Inputs:
  pauli_lindblad_maps.r0001   <- ref string for layer 0
  pauli_lindblad_maps.r0002   <- ref string for layer 1
Outputs:
  parameter_values
  measurement_flips.meas
  pauli_signs                 <- appears when InjectNoise is present
```

The dict keys of `refs_to_noise_models` must **exactly match** the ref strings in `samplex.inputs()`. Both come from the same `InjectNoise` annotations, so they match automatically when using the same boxing pass manager.

## Result structure

```python
result = job.result()

item_data = result[0]           # first SamplexItem

meas   = item_data["meas"]                        # (randomizations, shots, qubits)
flips  = item_data["measurement_flips.meas"]      # (randomizations, 1, qubits)
signs  = item_data.get("pauli_signs", None)        # (randomizations, num_terms) or None
```

## Processing results with executor_expectation_values

```python
from qiskit_addon_utils.exp_vals.expectation_values import executor_expectation_values
import numpy as np

# Convert gamma to plain scalar first (version compatibility fix)
gamma = np.asarray(gamma_value).item()

result_tuple = executor_expectation_values(
    meas,
    basis_mapping,       # dict from Samplomatic
    meas_basis_axis=None,
    avg_axis=0,          # average over randomizations axis
    measurement_flips=flips,
    pauli_signs=signs,
    rescale_factors=None,
    gamma_factor=gamma,  # None for unmitigated, gamma for PEC
)

# Return is (mean, variance) — NOT (mean, std)
mean, variance = result_tuple[0]
std = np.sqrt(variance)
```

> ⚠️ **Version gotcha (qiskit-addon-utils 0.4.0):** `gamma_factor` must be a plain Python scalar, not a numpy array. Use `np.asarray(gamma).item()`. The return value is `(mean, variance)` — take `np.sqrt(variance)` for std.

## Related
- [[Samplomatic — Boxes and Annotations]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[PNA — Propagated Noise Absorption]]
- [[SLC — Shaded Lightcones]]
- [[The Primitives Family]] — where Executor sits relative to Sampler/Estimator

## Self-Check
- What does Executor need as input that Sampler/Estimator don't?
- Why must the dict keys of `refs_to_noise_models` exactly match the ref strings from `samplex.inputs()`?
- What does `executor_expectation_values` actually return, and what's the gotcha in extracting a standard deviation from it?
