# The Deutsch-Jozsa Algorithm
#qc/algorithms #qc/gates

Generalizes [[Deutsch's Algorithm]] from one bit to $n$ bits: given $f:\{0,1\}^n\to\{0,1\}$, **promised** to be either constant (same output for all inputs) or balanced (output 1 for exactly half of all inputs), determine which — in **1 query**, regardless of $n$.

## Why this is a bigger deal than Deutsch's algorithm

Classically, a deterministic algorithm needs $2^{n-1}+1$ queries in the worst case to be certain (you could query $2^{n-1}$ inputs, get the same answer every time, and still be looking at a balanced function whose other half you haven't checked). Deutsch-Jozsa's constant-vs-$2^{n-1}+1$ gap is the first algorithm with a proven **exponential** speedup over any deterministic classical algorithm — not just a constant-factor win like Deutsch's original 2-vs-1.

## Circuit

Same structure as Deutsch's algorithm, extended to $n$ query qubits: prepare $|0\rangle^{\otimes n}|1\rangle$, apply $H^{\otimes n}$ to the query register and $H$ to the ancilla, apply the oracle $U_f|x\rangle|y\rangle=|x\rangle|y\oplus f(x)\rangle$ (phase-kicked back onto the query register exactly as in Deutsch's algorithm), apply $H^{\otimes n}$ to the query register again, then measure it.

**Result:** the query register reads all-zeros ($|0\rangle^{\otimes n}$) with certainty if $f$ is constant, and *never* reads all-zeros if $f$ is balanced. One measurement, one bit of information ("was it all-zeros or not"), fully resolves the promise.

## Related
- [[Deutsch's Algorithm]]
- [[Quantum Speedup — Ingredients and Myths]]
- [[Computational Complexity — P, NP, BQP]] — this is the algorithm that made "exponential speedup" a concrete, provable claim rather than a hope

## Self-Check
- Why does a classical deterministic algorithm need $2^{n-1}+1$ queries in the worst case, not just 2?
- What specifically makes Deutsch-Jozsa's speedup "exponential" rather than just "faster"?
- What does measuring "not all-zeros" tell you, and why is that enough to conclude "balanced" with certainty?
