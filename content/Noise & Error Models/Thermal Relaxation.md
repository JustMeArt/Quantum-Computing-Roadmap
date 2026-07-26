# Thermal Relaxation (T1 / T2)
#qc/noise

Unlike [[Depolarizing Noise]] and [[Pauli Error Model]], which apply noise *per gate*, thermal relaxation is noise **per unit time** — it happens just because time passes and the qubit isn't perfectly isolated from its environment. This means two circuits that are logically identical can perform differently if one simply takes longer to run.

Two governing timescales:

- **$T_1$ (energy relaxation time):** how long it takes an excited state to decay toward $|0\rangle$.
- **$T_2$ (dephasing time):** how long superposition/coherence survives, typically $T_2 \le 2T_1$.

## Two complementary experiments

**Experiment A ($T_1$-type):** prepare $|1\rangle$, insert a delay, measure in the computational basis. Tracks population decay — longer delay, more likely to have relaxed back to $|0\rangle$.

**Experiment B ($T_2$-type):** prepare $|+\rangle$, insert a delay, measure in the X basis (same "Hadamard sandwich" idea as in [[Bit-flip and Phase-flip Sensitivity]]). Tracks coherence loss — a superposition can lose its "quantumness" even before its population has fully relaxed.

## Real numbers

On real IBM hardware: $T_1 = 330\pm12\,\mu s$ measured on `ibm_marrakesh`, $T_2 = 269\pm20.3\,\mu s$ on `ibm_fez` — and the two aren't independent: $\frac{1}{T_2}=\frac{1}{2T_1}+\frac{1}{T_\phi}$, where $T_\phi$ is the pure-dephasing contribution. Rule of thumb: roughly **37% of population remains after one $T_1$**, under **5% after three**. A typical gate takes 50–100ns, so a circuit gets roughly **1,000–5,000 gates** before $T_1$ decay starts to dominate the error budget — a concrete depth ceiling, not just an abstract "keep circuits shallow" rule.

## Quick comparison of all three toy noise models

| Model | Type | Governed by |
|---|---|---|
| [[Depolarizing Noise]] | isotropic gate imperfection | $\lambda$ |
| [[Pauli Error Model]] | directional stochastic error | $p_X, p_Y, p_Z$ |
| Thermal relaxation | time-dependent decay | $T_1, T_2$ |

The point of all three isn't to memorize formulas — it's to have a mental model for *why* a real device's output distribution spreads probability beyond the ideal outcomes: some randomization, some directionality, some just from elapsed time.

## Related
- [[Depolarizing Noise]]
- [[Pauli Error Model]]
- [[Density Matrix]]
- [[Backend Properties]]

## Self-Check
- Why is thermal relaxation fundamentally different from depolarizing and Pauli noise in *when* it acts?
- Could you explain the difference between what $T_1$ and $T_2$ each measure?
- Why can two logically identical circuits perform differently under this noise model?
- Roughly how many gates can run before $T_1$ decay starts to dominate, and why does that number matter practically?
