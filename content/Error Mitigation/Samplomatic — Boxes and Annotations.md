# Samplomatic — Boxes and Annotations
#qc/mitigation #qc/workflow

[Samplomatic](https://github.com/Qiskit/samplomatic) is a framework for per-layer control over error mitigation. It addresses parts of a circuit through **boxes** and **annotations**, then compiles annotated circuits into a parametric template + recipe (samplex) that the [[Executor Primitive|Executor]] runs.

## The three components

Together with [[NoiseLearnerV3 and Pauli-Lindblad Models|NoiseLearnerV3]] and the [[Executor Primitive|Executor]], Samplomatic forms Qiskit Runtime's **directed execution model**:

1. **Samplomatic** — box and annotate the circuit, build template + samplex
2. **NoiseLearnerV3** — learn per-box noise on hardware
3. **Executor** — run the mitigated program

## Boxes

A box is a marked region of a circuit — a single gate, a layer, or the measurement. Created with:

```python
# Manual (hand-written)
with circuit.box(annotations=[Twirl()]):
    circuit.cz(0, 1)

# Automatic (boxing pass manager)
pm = generate_boxing_pass_manager(
    enable_gates=True,
    enable_measures=True,
    twirling_strategy="active",
    inject_noise_targets="gates",
    inject_noise_strategy="no_modification",   # or "uniform_modification", "individual_modification"
)
boxed_circuit = pm.run(isa_circuit)
```

## Annotations

Annotations are instructions attached to a box (not to the whole circuit).

| Annotation | Purpose |
|---|---|
| `Twirl()` | Randomize this box's Pauli dressings each randomization |
| `InjectNoise(ref=...)` | Declare a slot for a learned Pauli-Lindblad noise model, keyed by `ref` string |
| `ChangeBasis(...)` | Rotate the measurement to a non-Z basis (needed when PNA introduces non-Z observable terms) |

### `inject_noise_strategy` options

| Strategy | Used for | Effect |
|---|---|---|
| `"no_modification"` | Chapter 2 baseline | All equivalent boxes share the same `ref`; noise is a passthrough, never applied |
| `"uniform_modification"` | **PNA** | One global `noise_scales` slot; set to 0 to leave circuits untouched while associating each layer with its learned model for propagation into the observable |
| `"individual_modification"` | **SLC** | Separate `noise_scales.<ref>` per box; SLC can scale each generator independently along the observable's lightcone |

## Templates and the samplex

`build(boxed_circuit)` converts an annotated circuit into two objects:

```python
from samplomatic import build
template, samplex = build(boxed_circuit)
```

- **Template** — a parametric `QuantumCircuit` with free parameter slots where random Paulis will go
- **Samplex** — a classical DAG (recipe) that, for each randomization, draws random Paulis and outputs `parameter_values` + `measurement_flips`

### The samplex DAG nodes
- **Red stars** — sampling nodes (one per Twirl box), draws random Paulis
- **Green circles** — processing steps (Pauli propagation through gates, register slicing)
- **Blue bowties** — collectors into `parameter_values`
- **Purple bowtie** — collector into `measurement_flips.meas`

### Common build error

A `Twirl` box places random Pauli dressings on the *left* side. Those dressings must propagate through the gate and land somewhere — a **collector box** on the right. If the circuit ends without a collector (measurement box), `build` raises a `SamplexBuildError`:

```
SamplexBuildError: unterminated virtual gates on qubits [0, 1]
```

Fix: always add a measurement box after each gate box.

## Sampling

```python
# Draw num_randomizations sets of random Paulis (purely classical)
outputs = samplex.sample({}, num_randomizations=32)
outputs["parameter_values"]       # shape (32, num_params)
outputs["measurement_flips.meas"] # shape (32, 1, num_qubits)
```

## Unique layers

Equivalent boxes share one noise model. `find_unique_box_instructions` collapses a boxed circuit to its structurally distinct layers:

```python
from samplomatic.utils import find_unique_box_instructions
unique_layers = find_unique_box_instructions(
    boxed_circuit,
    normalize_annotations=None,
    undress_boxes=True,   # strip dressing before comparison
)
```

Only unique layers are passed to `NoiseLearnerV3`, saving QPU time.

## API gotcha

`generate_boxing_pass_manager` options are keyword arguments. Always check the `ref` strings from `samplex.inputs()` — the dict keys passed to `.bind()` must match exactly.

## Related
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[Executor Primitive]]
- [[Dressed Gates and Pauli Propagation]]
- [[PNA — Propagated Noise Absorption]]
- [[SLC — Shaded Lightcones]]

## Self-Check
- Could you explain what a "box" and an "annotation" are, and how they differ from a whole-circuit switch?
- Why does `no_modification` vs `uniform_modification` vs `individual_modification` correspond to baseline vs PNA vs SLC?
- Why must every gate box be followed by a measurement box, and what error do you get if you forget?
