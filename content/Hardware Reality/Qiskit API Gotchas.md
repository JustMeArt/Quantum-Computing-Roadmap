# Qiskit API Gotchas
#qc/qiskit

A running list of "looks right, breaks anyway" traps in the Qiskit API — the kind of thing that costs 20 minutes of confused debugging once, then never again once it's written down.

## Properties vs methods
Some backend attributes are properties, not callable methods — no parentheses:
```python
backend.operation_names   # correct
backend.coupling_map      # correct
backend.operation_names()  # AttributeError
```
Same pattern for `circuit.num_qubits`, `circuit.num_ancillas`.

## Wrapper objects vs their "obvious" type
`backend.coupling_map` returns a `CouplingMap` object, not a plain list — it *behaves* like one (iterable, prints like a list of edges) but strict type-checkers (like autograders using `typeguard`) will reject it. Call `.get_edges()` to get an actual `list[tuple[int, int]]`.

Same lesson applies elsewhere: a `SparsePauliOp` needs to be passed as a plain object (not wrapped in a list) for methods like `.apply_layout()` to work — see [[SparsePauliOp]].

**General rule:** if something *looks* like the type a type hint or grader expects, but a type-checked function rejects it anyway, check `type(x)` — it's probably a Qiskit wrapper class that duck-types like the primitive but isn't literally an instance of it.

## `range` vs `list` when passing sequences into Qiskit APIs
```python
transpile(qc, initial_layout=range(n))       # can silently misbehave
transpile(qc, initial_layout=list(range(n))) # correct
```
Some internal Qiskit logic does an `isinstance(x, list)`-style check to decide how to interpret an argument (e.g. "one layout" vs "a list of layouts, one per circuit"). `range` is iterable but fails that check, causing confusing downstream errors that don't look related to the actual cause.

**Also prefer `circuit.num_qubits` over a hardcoded qubit count** when building a layout — avoids off-by-one errors if the circuit size changes.

## Introspecting what's actually inside a circuit
```python
for instruction in circuit.data:
    instruction.operation.name   # e.g. "h", "cx", "swap"
```
`circuit.data` is a list of `CircuitInstruction` objects (in current Qiskit versions — older tutorials may show plain 3-tuples instead). This is the general-purpose way to count, filter, or analyze gates — see [[Circuit Introspection Cheat Sheet]].

## System dependencies vs pip packages
Some Python libraries are thin wrappers around real system-level binaries. `rustworkx`'s `graphviz_draw` calls out to a `dot` executable — installing the pip package `graphviz` gives you Python bindings, but you still need the actual Graphviz binary installed via your OS package manager (`pacman -S graphviz` on Arch/Omarchy, `apt install graphviz` on Debian/Ubuntu). No amount of pip installing fixes a missing system binary.

## Samplomatic / error-mitigation gotchas
- `generate_boxing_pass_manager`'s `inject_noise_strategy` must be `"uniform_modification"` for [[PNA — Propagated Noise Absorption|PNA]] and `"individual_modification"` for [[SLC — Shaded Lightcones|SLC]] — not `"no_modification"`, which is the passthrough baseline.
- `compute_forward_bounds(circuit, noise_model_paulis, observable=obs, ...)` — `observable` is a **keyword** argument; `noise_model_rates` is not a parameter in the current API.
- `compute_backward_bounds(circuit, noise_model_paulis, ...)` — does not accept `atol` or `eigval_max_qubits` in the current API.
- `gamma_from_noisy_boxes(...)` returns an array-like — call `np.asarray(gamma).item()` before passing it on to `executor_expectation_values`.
- `executor_expectation_values` returns `(mean, variance)`, not `(mean, std)` — take `np.sqrt(variance)` for std. See [[Executor Primitive]].
- The [[1D Ising Chain and the Mirror Trick|mirror trick]] needs `barrier=True` both inside the circuit constructor and between the forward/inverse halves — without it, the transpiler cancels $U^\dagger U$ to identity and silently destroys the benchmark.
- `SparsePauliOp.from_sparse_list([("XZ", [3, 11], 1.0)], num_qubits=N)` — string characters map left-to-right onto the qubit index list: `X → qubit 3`, `Z → qubit 11`.

## Related
- [[SparsePauliOp]]
- [[Circuit Introspection Cheat Sheet]]
- [[Backend Properties]]
- [[Physical vs Logical Qubits and Layout]]
- [[Samplomatic — Boxes and Annotations]]

## Self-Check
- Could you explain the difference between a Qiskit "property" and a "method," and why it trips people up?
- What's the general rule for diagnosing a "looks like the right type but got rejected anyway" error?
- Why does `range(n)` misbehave in places where `list(range(n))` works fine?
