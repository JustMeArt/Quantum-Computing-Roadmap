# Depolarizing Noise
#qc/noise

The simplest way to model an imperfect gate: after the gate, the state gets partially replaced by the fully mixed (maximally random) state.

$$
\rho \mapsto (1-\lambda)\rho + \lambda \frac{I}{2}
$$

Larger $\lambda$ = more randomization. It's intentionally non-specific about *why* the gate is imperfect — no direction, no timing dependence, just "some of the information got scrambled."

## The repeated-X experiment

A clean way to *see* this noise accumulate: apply an even number $2n$ of `x` gates to $|0\rangle$ and measure. Since $X^2 = I$, an ideal circuit always returns exactly to $|0\rangle$ regardless of $n$ — so any decay in $\Pr(0)$ as $n$ grows is a pure noise signal, not a logic error.

```python
def repeated_x_circuit(n):
    qc = QuantumCircuit(1, 1)
    for _ in range(2 * n):
        qc.x(0)
    qc.measure(0, 0)
    return qc
```

Under this model, the survival probability decays exponentially toward $1/2$ (fully random) as $n$ grows:

$$
\Pr(0) = \frac{1 + (1-\lambda)^{2n}}{2}
$$

This same repeated-gate structure is reused (with different measurement bases) to probe [[Pauli Error Model|directional Pauli errors]] and [[Thermal Relaxation|time-dependent decay]] — it's a general-purpose noise-characterization pattern, not just a depolarization-specific trick.

## Related
- [[Density Matrix]]
- [[Pauli Error Model]]
- [[Thermal Relaxation]]
- [[Backend Properties]]
- [[Bit-flip and Phase-flip Sensitivity]] — same repeated-gate experiment, extended to detect *which* Pauli error is present

## Self-Check
- Why does the repeated-X experiment isolate noise from logic errors — what makes $2n$ gates special?
- Could you explain in plain language what depolarizing noise does to a qubit?
- Why is depolarizing noise called "non-specific" compared to the Pauli error model?
