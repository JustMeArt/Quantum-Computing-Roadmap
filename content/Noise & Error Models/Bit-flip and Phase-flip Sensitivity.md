# Bit-flip and Phase-flip Sensitivity
#qc/noise

The same measurement can be "blind" to certain errors and highly sensitive to others — it all depends on which basis you measure in relative to what the error actually does.

## The core intuition

- A **bit flip** swaps the roles of $|0\rangle$ and $|1\rangle$ — this is exactly what $X$ does.
- A **phase flip** flips the *sign* of the $|1\rangle$ component without touching the $|0\rangle$/$|1\rangle$ labels — this is exactly what $Z$ does: $Z|0\rangle = |0\rangle$, $Z|1\rangle = -|1\rangle$.

A Z-basis measurement only cares about $|\alpha|^2$ vs $|\beta|^2$ — a sign flip on $\beta$ changes nothing observable there. That's why a pure $Z$ error is invisible to a computational-basis measurement.

But $|+\rangle$ and $|-\rangle$ differ *only* by that same sign:

$$
|+\rangle = \tfrac{1}{\sqrt2}(|0\rangle + |1\rangle), \qquad |-\rangle = \tfrac{1}{\sqrt2}(|0\rangle - |1\rangle)
$$

So $Z|+\rangle = |-\rangle$ — the same sign flip that was invisible in the Z basis becomes a fully distinguishable outcome in the X basis. Measuring in a different basis turns invisible phase information into visible which-outcome information.

## Two complementary experiments (built on the repeated-X circuit)

**Experiment A — bit-flip test:** start at $|0\rangle$, apply $2n$ `x` gates, measure in Z-basis. Sensitive to $X$/$Y$ errors, blind to pure $Z$.

**Experiment B — phase-flip test:** prepare $|+\rangle$ (via `H`), apply $2n$ `x` gates, then apply another `H` before measuring (this rotates the X-basis question into a Z-basis measurement). Sensitive to $Z$/$Y$ errors, blind to pure $X$ (since $X|+\rangle = |+\rangle$).

```python
def repeated_x_meas_x_circuit(n):
    qc = QuantumCircuit(1, 1)
    qc.h(0)
    for _ in range(2 * n):
        qc.x(0)
    qc.h(0)          # rotate back before measuring — the "Hadamard sandwich" trick
    qc.measure(0, 0)
    return qc
```

The "Hadamard sandwich" — one `H` to enter a different basis, one `H` at the end to rotate back before a standard measurement — is a general technique for measuring in any basis, not just this experiment.

## Related
- [[Pauli Error Model]]
- [[Depolarizing Noise]]
- [[GHZ States]]

## Self-Check
- Could you explain why a pure Z error is invisible to a Z-basis measurement?
- What does the "Hadamard sandwich" trick actually accomplish, and why does it work?
- Why does a phase flip become visible in the X basis when it was invisible in the Z basis?
