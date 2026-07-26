# The Quantum Fourier Transform
#qc/algorithms

The QFT is the classical Discrete Fourier Transform ($y_k=\frac{1}{\sqrt N}\sum_j x_j e^{2\pi ijk/N}$) applied to a quantum state instead of a classical array: $\sum_j x_j|j\rangle \to \sum_k y_k|k\rangle$. **Key insight:** the QFT circuit itself is exponentially cheaper than the classical FFT — $O(n^2)=O((\log N)^2)$ gates versus the FFT's $O(N\log N)$ — but that speedup evaporates the moment you need real classical data in or out, which is why the QFT is almost never used to "Fourier-transform a dataset" and instead shows up buried inside other algorithms like [[Quantum Phase Estimation (QPE)]].

## Circuit

Built from Hadamards and controlled phase gates $P_k=\text{diag}(1,e^{2\pi i/2^k})$ — the same general phase gate already defined in [[Z Gate and Relative Phase]], just with $\theta=2\pi/2^k$. Each qubit gets an $H$ followed by controlled-$P_k$ gates from every qubit below it, then a final qubit-reversal (swap) pass restores the expected bit order:

```python
from qiskit.circuit.library import QFT
qc = QFT(num_qubits=4)   # or build by hand: H + controlled-P_k per qubit + swaps
```

## Why the speedup doesn't survive contact with real data

Loading a classical array of $N$ values into amplitude-encoded form ($\sum_j x_j|j\rangle$) costs at least $O(N)$ operations — you have to touch every data point once — which already erases the QFT's asymptotic advantage before the transform even runs. Reading the output back out is worse: extracting all $y_k$ amplitudes needs exponentially many measurement shots unless the output distribution happens to be sharply peaked. **This is exactly why [[Quantum Phase Estimation (QPE)]] exists as the QFT's real use case** — QPE never loads a classical signal; it only ever reads a phase already encoded by a quantum evolution $U$, and only ever needs a peaked output (the eigenvalue), so neither of the QFT's usual failure modes applies.

## Related
- [[Quantum Phase Estimation (QPE)]] — applies the *inverse* QFT to read out eigenvalue phases; the QFT's one genuinely load-bearing use case
- [[Z Gate and Relative Phase]] — $P_\theta$ is the exact phase gate the QFT circuit is built from
- [[Grover's Algorithm]] — the other algorithm-milestone gap this closes; unrelated mechanism, same "on hold" tier

## Self-Check
- Why is the QFT circuit exponentially cheaper than the classical FFT, and why doesn't that make it useful for Fourier-transforming ordinary classical data?
- What are the controlled-$P_k$ gates inside the QFT circuit, in terms of a gate already covered in [[Z Gate and Relative Phase]]?
- Why does [[Quantum Phase Estimation (QPE)]] avoid both of the QFT's usual bottlenecks (data loading and output readout)?
