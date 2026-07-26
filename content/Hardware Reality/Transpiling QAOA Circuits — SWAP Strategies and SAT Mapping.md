# Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping
#qc/hardware #qc/algorithms

General-purpose [[Transpilation|transpilation]] — greedily inserting SWAPs given a random initial qubit placement — is **NP-hard** and has an exponentially small chance of finding a good initial map, because it treats the circuit as an arbitrary sequence of gates. **Key insight:** [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]] cost-layer gates all commute (they're all built from the same diagonal $H_C$), so instead of solving the general routing problem, you can fix a sequence of SWAP layers up front and use it to reach *every* required interaction — turning an NP-hard search into a structured, near-optimal recipe.

## The two questions transpilation has to answer

1. How to place qubits on hardware initially ($\pi_i$)?
2. In what order to apply gates to minimize depth (the routing schedule)?

For circuits with arbitrary gates, answering both well is NP-hard. For QAOA specifically, commutativity of the cost-layer gates makes both tractable.

## SWAP strategies (Weidenfeller et al. 2022)

Fix a sequence of SWAP layers $S_0, S_1, S_0, \ldots$ along a line of qubits; each layer induces a new set of possible interactions $E'(k)$ after $k$ layers. Pick an initial mapping so the problem graph's required interactions $E(\text{nodes})$ land inside $E'(\text{qubits})$ as early as possible.

> **Theorem (Weidenfeller et al. 2022):** a fully-connected QUBO on $n$ qubits is optimally implemented in at most $n-2$ linear SWAP layers.

## SAT mapping (Matsuo et al.)

Once a SWAP strategy is fixed, finding the best *initial* qubit map is itself encoded as a Boolean satisfiability question: "does this layout need $\le k$ SWAP layers?" — then binary-searched over $k$ using a SAT solver. Scales to 500+ qubits, far beyond what brute-force search over initial mappings could handle.

## Three Qiskit tools for the full pipeline

- **`qiskit-addon-opt-mapper`** — NetworkX graph → optimization problem → QUBO → Ising Hamiltonian, in ~4 lines; built-in problems include MaxCut, TSP, Knapsack, VehicleRouting, BinPacking, VertexCover, Clique, SKModel.
- **`qopt-best-practices`** — implements the three-step hardware-aware transpilation above: (1) `find_lines(num_qubits, backend)` to pick a long line through the hardware's coupling graph, (2) `SwapStrategy.from_line(line_qubits)` + `make_qaoa_pm(swap_strategy, backend)` to apply the SWAP strategy, (3) `SATMapper(timeout=60).find_initial_mappings(program_graph, swap_strategy)` for the initial layout.
- **`qaoa_training_pipeline`** — trains QAOA angles $(\gamma,\beta)$ classically offline before running on hardware (quantum parameter training is expensive and prone to barren plateaus): brute-force scan at $p=1$, transition-state seeding at $p=2$, then MPS-based recursion for $p=3$; beyond $p=3$, barren plateaus dominate.

## The real-world payoff

On a 50-node 3-regular MaxCut problem on heavy-hex hardware at depth $p=1$, each transpilation step roughly halves the cost:

| Step | 2-qubit gate count | Circuit depth |
|---|---|---|
| Default transpile | 3850 | 820 |
| + SWAP strategy | 1980 (−~50%) | 410 |
| + SAT mapper | 1320 (−~30% more) | 295 |

Since two-qubit gates are the dominant noise source, this is a direct, large reduction in the error the circuit accumulates before it ever reaches an error-mitigation layer — a smaller/simpler graph (10 nodes, 24 edges, $p=3$) shows the same pattern at a different scale: naive transpile gives 359 CZ gates / depth 241, versus 333 CZ gates / depth 84 for the optimized version — the gate-count gain is modest here but the *depth* gain is large, since the naive circuit serializes far more than it needs to.

## Related
- [[Transpilation]] — the general transpilation problem this note specializes for QAOA
- [[SWAP Overhead and Routing]] — why SWAP gates are costly in general (3 CNOTs each)
- [[QAOA — Quantum Approximate Optimization Algorithm]] — the algorithm whose commuting cost layer makes this optimization possible
- [[The Full Pipeline of a Quantum Solver]] — this note is a deep dive on that pipeline's "Hardware" stage
- [[Heavy-Hex Topology]] — the connectivity these SWAP-strategy examples are routed against

## Self-Check
- Why does QAOA's cost-layer commutativity turn an NP-hard routing problem into something tractable?
- What does the SWAP-strategy theorem guarantee, and for what class of problem?
- Looking at the gate-count table, why does the SAT mapper's percentage improvement look smaller than the SWAP strategy's, even though both matter?
