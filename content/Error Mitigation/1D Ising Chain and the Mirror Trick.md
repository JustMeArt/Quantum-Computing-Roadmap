# 1D Ising Chain and the Mirror Trick
#qc/mitigation #qc/workflow

The 1D transverse-field Ising chain is the benchmark circuit used throughout this section's mitigation examples. It is deep enough for per-layer noise to compound into a measurable deviation, while remaining simple enough to inspect structurally.

## The Hamiltonian

$$H = -J \sum_{\langle i,j \rangle} Z_i Z_j + h \sum_i X_i$$

The same Hamiltonian (on a 2D heavy-hex lattice) drove IBM's 127-qubit [[Quantum Utility vs Quantum Advantage|utility]] demonstration ([Kim et al., Nature 618, 2023](https://www.nature.com/articles/s41586-023-06096-3)).

## Trotter circuit construction

Each Trotter step applies:
1. $R_x(\theta)$ on all qubits (transverse field)
2. $S^\dagger \cdot CZ$ on alternating pairs (ZZ interaction — even bonds, then odd bonds)

The $S^\dagger \cdot CZ$ sequence equals $R_{ZZ}(-\pi/2)$ up to a global phase. Writing it this way keeps every two-qubit gate a CZ, so all boxing and dressing machinery applies directly.

```python
def construct_ising_circuit(num_qubits, num_trotter_steps, rx_angle, barrier=True):
    qc = QuantumCircuit(num_qubits)
    for _ in range(num_trotter_steps):
        qc.rx(rx_angle, range(num_qubits))
        if barrier:
            qc.barrier()
        for first_qubit in (1, 2):           # even bonds, then odd bonds
            for idx in range(first_qubit, num_qubits, 2):
                qc.sdg([idx - 1, idx])
                qc.cz(idx - 1, idx)
        if barrier:
            qc.barrier()
    return qc
```

`rx_angle = π/8` is used throughout the lab.

## The mirror trick

For arbitrary circuits at utility scale, classical simulation to find the ideal result is expensive or intractable. The mirror trick sidesteps this:

**Append the inverse circuit** after the forward circuit: $U^\dagger U = I$

On a noiseless device, every qubit returns to $|0\rangle$, so:
$$\langle Z_i \rangle = +1 \quad \forall i \quad \text{(ideal)}$$

Any deviation from $+1$ is hardware noise. This makes the mirror a **standard benchmark** — the ideal answer is always known without classical simulation.

### Construction

```python
# Method 1: simple (transpiler may cancel U†U to identity)
mirror = ising.compose(ising.inverse())
mirror.measure_all()

# Method 2: with barrier (prevents transpiler cancellation — REQUIRED)
mirror = QuantumCircuit(num_qubits)
mirror.compose(ising, inplace=True)
mirror.barrier()                        # ← critical
mirror.compose(ising.inverse(), inplace=True)
mirror.measure_all()
```

> ⚠️ The `barrier()` between forward and inverse is **required** — without it the transpiler sees $U^\dagger U$ and optimizes it away to nothing, destroying the mirror and giving fidelity ~1 trivially rather than as a noise benchmark.

> ⚠️ Also use `barrier=True` inside `construct_ising_circuit` — barriers between the Rx layer and CZ layers prevent gate reordering within each Trotter step.

### Transpile

```python
mirror_isa = isa_pm.run(mirror)   # optimization_level=0
```

Use `optimization_level=0` to avoid the transpiler merging or reordering gates that would break the layer structure needed for boxing.

## Unique layers in the Ising brickwork

A 4-qubit, 1-step Ising mirror has 5 boxes but only **3 unique layers**:
- Even-bond CZ layer (e.g. qubits 0-1 and 2-3)
- Odd-bond CZ layer (e.g. qubits 1-2)
- Measurement layer

`find_unique_box_instructions` collapses to these unique layers for noise learning, since equivalent boxes share one noise model.

Even though even-bond and odd-bond layers play symmetric roles in the physics, their **learned noise profiles differ** — different dominant generators, different total noise. This is why per-layer mitigation matters.

## Circuit sizes across these examples

| Example | Qubits | Trotter steps | Purpose |
|---|---|---|---|
| Toy example | 2 | 1 | Introduce boxing workflow |
| Demo | 4 | 1 | Full noise-learning demo |
| Exercise (small) | 6 | 2 | Student exercise |
| PNA example | 10 | 2 | PNA demonstration |
| SLC example | 10 | 10 | SLC demonstration (deep lightcone) |
| Exercise (locality) | 15 | 3 | Student exercise (locality comparison) |

## Related
- [[Samplomatic — Boxes and Annotations]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]]
- [[PNA — Propagated Noise Absorption]]
- [[SLC — Shaded Lightcones]]
- [[Quantum Utility vs Quantum Advantage]] — the same 2023 Nature paper, from the "what does utility actually mean" side
- [[Trotterization]] — the same Hamiltonian/circuit family, taught as a simulation technique instead of a noise benchmark

## Self-Check
- Could you explain the mirror trick to someone who's never heard of it, and why it avoids needing classical simulation?
- Why is `barrier()` required in two different places for the mirror trick to work correctly?
- Why does a 4-qubit Ising mirror have 5 boxes but only 3 unique layers, and why does that distinction matter for noise learning?
