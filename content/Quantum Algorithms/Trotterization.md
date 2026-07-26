# Trotterization
#qc/algorithms #qc/math

The standard technique for turning $e^{-iHt}$ into an actual circuit when $H=\sum_{j=1}^N h_j P_j$ is a sum of non-commuting Pauli terms — you can't just exponentiate each term independently and multiply, because $e^{-iHt} \neq \prod_j e^{-ih_jP_jt}$ unless the terms commute. Trotterization approximates the product by breaking the evolution into $r$ small time slices.

## First-order Trotter

$$e^{-iHt} \approx \left(\prod_{j=1}^N e^{-ih_jP_jt/r}\right)^{r}, \qquad \text{error } O(t^2/r)$$

More slices ($r$) means a better approximation, at the cost of a deeper circuit — one layer of gates per slice.

## Second-order (symmetric) Trotter

Splitting $H$ into two non-commuting pieces (e.g. $H_X$ and $H_{ZZ}$ for a transverse-field model) and symmetrizing:

$$e^{-iHt}\approx\left(e^{-iH_Xt/2r}\,e^{-iH_{ZZ}t/r}\,e^{-iH_Xt/2r}\right)^{r}, \qquad \text{error } O(t^3/r^2)$$

**Key insight:** the leading first-order error term cancels in the symmetric ordering, so second-order Trotter reaches the same accuracy with far fewer slices — better error scaling in $r$, at the cost of a more complex (three-part) gate sequence per slice.

## The exact circuit family you already know

This is the *same* transverse-field Ising Hamiltonian and Trotter-step structure as [[1D Ising Chain and the Mirror Trick]] — $R_x(\theta)$ layers for the transverse-field term, $CZ$-based layers for the $ZZ$ interaction term, repeated per Trotter step. **The two notes use it for opposite purposes:** that note treats the circuit as a fixed-structure **noise benchmark** (append $U^\dagger$, check you get back to $|0\rangle^{\otimes n}$) and never varies $t$ or $r$ for physics reasons. This note is about Trotterization as a **simulation technique** in its own right — choosing $r$ and the order to trade circuit depth against approximation error for an actual physics question, independent of any noise-benchmarking use.

## Beyond Trotter (named, not derived here)

- **QDRIFT** — randomized Trotterization; sample which term to apply next, weighted by $|h_j|$, rather than a fixed deterministic order.
- **Taylor expansion / quantum walk / Qubitization methods** — fault-tolerant-era techniques with better asymptotic query complexity (Qubitization: $O(k\|H\|t + \log(1/\varepsilon))$ for sparsity $k$ and error $\varepsilon$), not used in near-term algorithms in this vault.

## Related
- [[Hamiltonians and Encoding for Quantum Circuits]]
- [[1D Ising Chain and the Mirror Trick]] — the same circuit family, used as a mitigation benchmark instead
- [[Quantum Phase Estimation (QPE)]] — the next step once you can implement $e^{-iHt}$

## Self-Check
- Why doesn't $e^{-iHt}$ just equal $\prod_j e^{-ih_jP_jt}$ when the $P_j$ don't commute?
- Why does second-order Trotter need fewer slices than first-order for the same accuracy?
- What's the actual difference in *purpose* between this note's use of the Ising Hamiltonian and [[1D Ising Chain and the Mirror Trick]]'s use of it, given the circuit is nearly identical?
