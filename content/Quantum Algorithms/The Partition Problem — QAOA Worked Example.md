# The Partition Problem — QAOA Worked Example
#qc/algorithms

A concrete, end-to-end derivation of [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]] applied to the partition problem: given a set of numbers, split them into two groups whose sums are as close as possible. It's NP-hard classically (verifying a candidate split is trivial — sum both sides — but finding one requires checking $2^n$ splits in the worst case) yet easy to verify — that "easy to check, hard to find" shape is exactly what QUBO/Ising heuristics like QAOA are built to attack, but QAOA has no proven speedup over classical solvers here (see [[The Quantum Algorithm Zoo]]), so this note is a worked implementation, not a demonstration of quantum advantage. The derivation goes QUBO → Ising in three steps: encode each element with a binary variable $x_i \in \{0,1\}$ (which subset it's in), write the imbalance cost $C = \sum_i a_i(2x_i-1)$, then swap to spin variables $z_i \in \{-1,+1\}$ via $x_i = (1-z_i)/2$ and minimize $C^2$ instead of $|C|$ to avoid absolute values. Expanding $C^2$ and dropping the constant diagonal term (using $z_i^2=1$) leaves $C^2 = 2\sum_{i<j} a_i a_j z_i z_j$ — replacing spins with Pauli-Z operators gives the cost Hamiltonian $H_C = \sum_{i<j} a_i a_j Z_i Z_j$, with each coupling weighted by the product of the two numbers it connects. **Key insight:** this is the same graph-based recipe as MaxCut — the partition problem *is* MaxCut on a complete graph whose edge weights are $a_i a_j$ — which is why the implementation reaches for MaxCut tooling rather than writing a bespoke encoder.

```python
from qiskit_addon_opt_mapper.applications import Maxcut
from qiskit_addon_opt_mapper.translators import to_ising
from qopt_best_practices.circuit_library import annotated_qaoa_ansatz

# graph: networkx.Graph with edge weights = a_i * a_j
maxcut = Maxcut(graph)
partition_hamiltonian = to_ising(maxcut.to_quadratic_program())  # SparsePauliOp
circuit = annotated_qaoa_ansatz(partition_hamiltonian, reps=layers)
```

## API notes
- `to_ising` takes an `OptimizationProblem`, **not** a `Maxcut` object directly — call `.to_quadratic_program()` (or equivalent) on the `Maxcut` application first.
- `annotated_qaoa_ansatz` (from `qopt_best_practices`) produces a circuit with the QAOA cost/mixer layers **annotated** (boxed), which the transpiler can then unroll with `UnrollBoxes()` — this preserves layer structure through `generate_preset_qaoa_pass_manager` for SWAP-strategy-aware routing, instead of losing it to generic optimization passes.
- For a hardware-native graph (one that already matches the backend's coupling map after a greedy edge-coloring), `SwapStrategy(cmap, ())` — an *empty* strategy — is valid: no SWAPs are needed because the problem graph and the hardware graph coincide after coloring.

## Bonus: scaling to larger instances
At 1600 nodes, brute-force partition assignment from raw sampling accumulates bit-flip errors. A **local-search refinement pass** (`swap_partitions`) improves the best sampled bitstring by trying single-node swaps between the two partitions and keeping any swap that reduces the imbalance — cheap classical post-processing layered on top of the quantum result rather than an alternative to it. Because this refinement is itself a graph operation over thousands of edges, the notebook converts the NetworkX graph to **Rustworkx** first — Rustworkx is a Rust-backed graph library with the same conceptual API as NetworkX but built for exactly this kind of large-graph performance case.

## Related
- [[QAOA — Quantum Approximate Optimization Algorithm]] — the algorithm this note is a worked instance of
- [[Pauli Correlation Encoding (PCE)]] — the qubit-reduction technique used to scale this same partition problem from ~160 to ~1600 nodes
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] — how the annotated ansatz here gets mapped onto real hardware connectivity
- [[Quantum Chemistry — QPE on H2 (Worked Example)]] — another worked-example note in the same style, for a different algorithm family

## Self-Check
- Why does minimizing $C^2$ avoid the need to handle an absolute value, and what step of the derivation drops the constant term that $z_i^2=1$ produces?
- Why is "easy to verify, hard to find" a useful shape for a QUBO/Ising heuristic like QAOA to target, and why doesn't NP-hardness by itself mean QAOA has any proven advantage over classical solvers here?
- What would go wrong if you passed a `Maxcut` object directly to `to_ising` instead of first converting it to a quadratic program?
