# The Operator Loschmidt Echo (OLE) Benchmark
#qc/algorithms #qc/hardware

The hardest case for trust: estimating an observable $\langle O\rangle = \langle\psi|U^\dagger O U|\psi\rangle$ where there's **no built-in quality metric** — unlike [[The Variational Principle as a Trust Tool|the variational principle]], nothing guarantees you're getting closer to the right answer as you improve, and the ground truth is often genuinely unknown. Trust has to be built the conventional way physics has always built it — the same way telescopes and particle colliders earned trust before either could be checked against a known answer: benchmark on small classically-solvable cases, check reproducibility under different conditions, and compare against theoretical predictions.

## The circuit

The **Operator Loschmidt Echo** probes exactly this: $\rho \propto O \to U \to V_\delta \to U^\dagger \to$ measure $O$, where $U$ is Floquet Ising dynamics (chosen specifically because it scrambles operators under time evolution) and $V_\delta$ is a small single-qubit-rotation perturbation. The signal follows

$$\text{Signal} \approx 1 - \tfrac{1}{2}\delta^2 \times \text{OTOC}$$

where OTOC is the out-of-time-order correlator — the quantity that actually probes how far an operator has spread under $U$.

## The real experiment

Run on a **56-qubit patch of `ibm_boston`** (a Heron-generation device), at circuit depths up to 72 (1488 CZ gates), measuring $k$-local Pauli observables drawn from $\{I,Z\}^{\otimes N}$. Mitigation used: **Global Rescaling** — assumes the noise-induced decay factor $\alpha=\tilde f_i/f_i$ stays constant across different perturbation strengths $\delta$, so noisy signals $\tilde f_i$ get rescaled by $1/\alpha$ to recover the underlying signal $f_i$.

## The classical competitor

Compared against **Tensor-Network Belief Propagation (TN-BP)** at bond dimension $\chi$ (see [[Quantum Utility vs Quantum Advantage|the three classical competitors]]): CPU runtime becomes impractical around $\chi=256$ (~6 hours), GPU memory exceeds an Nvidia H200's 141GB beyond $\chi=640$, and even a hybrid GPU-CPU approach needs roughly 3 hours to evolve plus 1 hour to measure **per observable, per initial state**. The quantum run took roughly **1 hour total** for all 512 initial states and all diagonal observables combined.

## The disagreement, and how trust was actually built

At depth 72, the mitigated quantum answer and TN-BP **disagree**. Three independent pieces of evidence were used to decide which to trust:

1. At lower depth (36), the mitigated quantum signal agrees with *converged* TN-BP — the methods validate each other where TN-BP is still reliable.
2. The mitigated quantum signal is **reproducible** across different CZ gate durations (68/96/128ns) and different perturbation strengths $\delta$ — a result that depended on a specific hardware quirk wouldn't survive this.
3. At depth 72, the result falls within a theoretically predicted bound region.

**The honest verdict:** *"We can trust the answer from `ibm_boston` more than TN-BP."* But *"Quantum Advantage? No"* — the result hasn't been benchmarked against every classical heuristic that exists, only against TN-BP specifically. **More trustworthy is not the same as verified**, and verified-against-one-method is not the same as advantage over the field. This is the [[Quantum Utility vs Quantum Advantage|utility-vs-advantage distinction]] playing out on real hardware, in real time.

## Related
- [[Quantum Advantage — Definition and Criteria]] — this benchmark is a real instance of criterion 1's error-mitigation sub-strategy, and the honest "utility, not yet advantage" verdict is criterion 2 playing out in practice
- [[Quantum Utility vs Quantum Advantage]]
- [[The Variational Principle as a Trust Tool]] — the easier case, contrasted against this one
- [[Peaked Circuits and Verifiable Quantum Advantage]]
- [[Backend Properties]]

## Self-Check
- Why does observable estimation lack the kind of built-in check the variational principle gives VQE?
- Could you name the three pieces of evidence used to trust the `ibm_boston` result, and explain why each one matters?
- Why is "more trustworthy than TN-BP" explicitly not the same claim as "quantum advantage"?
