# Dressed Gates and Pauli Propagation
#qc/mitigation #qc/math

The algebra underlying all twirling-based mitigation methods. A gate "dressed" with Paulis on either side is the basic operation that both [[EstimatorOptions and the Five Mitigation Knobs|Pauli Twirling]] and [[Samplomatic — Boxes and Annotations|Samplomatic]] rely on.

## Dressed gate definition

For any $n$-qubit unitary $U$, a *dressed* version is:

$$\tilde{U} = V_\text{out} \, U \, V_\text{in}$$

where $V_\text{in}$ and $V_\text{out}$ are products of single-qubit unitaries. The dressing is **invariant** when:

$$V_\text{out} \, U \, V_\text{in} = U \quad \text{(up to global phase)}$$

This means the gate's logical action is unchanged, but any noise attached to $U$ gets twirled by $V_\text{in}$ and $V_\text{out}$.

## Clifford conjugation rule

For any Pauli $P$ and Clifford $U$:

$$U \, P \, U^\dagger = \pm P'$$

where $P'$ is another Pauli. Finding $V_\text{out}$ given $V_\text{in}$ amounts to propagating $V_\text{in}$ through $U$. In Qiskit:

```python
Pauli("IX").evolve(U, frame='s')   # returns U·P·U† with correct sign
Pauli.equiv(other)                  # compare up to global phase
```

## CZ propagation table (key rules)

For the CZ gate (used throughout this section's Ising circuits):
- **Z on either qubit** → passes through unchanged
- **X or Y on one qubit** → picks up a Z on the **other** qubit
- The pair XY ↔ YX picks up a **minus sign**

This asymmetry is why CZ is symmetric (both qubits play equal roles) while CX is not.

```python
# Examples
CZ · IX · CZ = ZX    (X on q0 picks up Z on q1)
CZ · XI · CZ = XZ    (X on q1 picks up Z on q0)
CZ · IZ · CZ = IZ    (Z passes through)
CZ · ZI · CZ = ZI    (Z passes through)
```

## Two maps from the propagation table

| Map | Contains | Used for |
|---|---|---|
| `cz_twirl_map` | $V_\text{in} \to V_\text{out}$ (unsigned) | What to physically apply as dressing |
| `cz_commutation_map` | $V_\text{in} \to (\text{sign}, V_\text{out})$ | Propagation rules including sign |

The sign does **not** affect gate invariance (absorbed as global phase) but **does** matter when propagating Paulis through a circuit to track observable modifications (as in [[PNA — Propagated Noise Absorption|PNA]]).

## Scale of application

The same Clifford conjugation operation is used at every level, only the scope differs:

| Method | Scope |
|---|---|
| `twirling.enable_gates` in EstimatorOptions | Whole circuit, uniform |
| `Twirl` box in Samplomatic | Per box (layer or gate) |
| PNA propagation | Per box, forward through entire circuit into observable |

## Qiskit helpers

```python
from qiskit.quantum_info import Pauli

# Propagate P through U: returns ±P'
result = Pauli("IX").evolve(cz_layer, frame='s')
result.to_label()    # e.g. "+ZX" or "-YX"

# Compare up to global phase
Pauli("ZX").equiv(Pauli("-ZX"))   # True
```

## Related
- [[EstimatorOptions and the Five Mitigation Knobs]]
- [[Samplomatic — Boxes and Annotations]]
- [[PNA — Propagated Noise Absorption]]

## Self-Check
- Could you explain what "dressing" a gate means and why the dressing has to be invariant?
- Why does propagating a Pauli through a CZ sometimes pick up a minus sign, and why does that sign matter for PNA but not for basic twirling?
- What's the one operation (Clifford conjugation) that shows up at every scale, from whole-circuit twirling to per-box Samplomatic to PNA?
