# Dynamic GHZ via Qubit Reuse
#qc/entanglement #qc/dynamic

A GHZ state can be built with far less connectivity and depth than the naive fan-out approach (see [[GHZ States]]) if you're willing to use mid-circuit measurement and feedforward — see [[Dynamic Circuits]]. This construction follows the paper *Efficient Long-Range Entanglement Using Dynamic Circuits* (PRX Quantum, 2024).

## The core idea, step by step

1. **Hadamards on data qubits** — turn each "even" qubit ($q_0, q_2, \dots$) into $|+\rangle$: independent random coins.
2. **First CNOT layer** — `CX(2,1)`, `CX(4,3)`, ... — creates a Bell pair between each even qubit and the odd qubit just before it, forming a "bridge."
3. **Second CNOT layer** — `CX(0,1)`, `CX(2,3)`, ... — folds each even qubit into the bridge and onto the next edge qubit. After this, the bridge qubit holds the **parity** of its two neighboring coins.
4. **Measure the bridge, then correct** — measuring the bridge qubit reveals whether its two neighboring coins agreed or disagreed. Reset the bridge, and *only if they disagreed*, flip the next pair to force agreement. This is the feedforward step: a random local outcome gets locally corrected so the overall state stays coherent, without ever needing a direct physical connection between far-apart qubits.
5. **Repeat down the chain** — each measured connector qubit only needs to correct the *next* pair, not every qubit downstream — corrections propagate link by link rather than needing global knowledge.
6. **Boundary qubit** — the very last qubit in the chain has no downstream pair to correct, so it's just measured and reset with no feedforward.
7. **Final CNOT layer** — same pattern as step 3 — brings the last pair of qubits into full agreement, producing the final GHZ signature: every run reads out as all-`0`s or all-`1`s, roughly 50/50.

```python
def _apply_dynamic_section(qc, qr, cr, num_qubits) -> None:
    last = num_qubits - 1
    for i in range(1, last - 1, 2):
        _measure_reset_and_correct(qc, qr, cr, meas_qubit=i, x_targets=[i + 1, i + 2])
    _measure_and_reset_only(qc, qr, cr, qubit=last)
```

**Why this matters practically:** the naive GHZ fan-out (`CX(0,1), CX(0,2), ..., CX(0,n-1)`) needs qubit 0 directly connected to *every* other qubit — physically unrealistic on real hardware topologies like [[Coupling Map and Topology|heavy-hex]]. The dynamic version trades that impossible connectivity requirement for classical feedforward, at the cost of needing hardware that supports mid-circuit measurement (Eagle/Heron-class devices generally do; check for the `if_else` operation in a backend's supported operations).

## Related
- [[Dynamic Circuits]]
- [[GHZ States]]
- [[Coupling Map and Topology]]
- [[Circuit Introspection Cheat Sheet]]

## Self-Check
- Could you walk someone through the 7-step construction, in your own words, without looking?
- Why does the "measure the bridge, then correct" step only need to fix the *next* pair, not every qubit downstream?
- What connectivity requirement does this construction trade away, and what does it trade it for?
