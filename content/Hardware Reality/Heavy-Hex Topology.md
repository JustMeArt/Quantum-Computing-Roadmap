# Heavy-Hex Topology
#qc/hardware

The physical connectivity pattern of IBM Heron processors (e.g. FakeTorino, 133 qubits — see [[Simulators — Statevector vs Shot-Based|fake backends]]):

- **Horizontal chains** of qubits run across rows
- **Vertical bridge qubits** connect rows at staggered positions
- Most qubits: **degree 2** (two neighbors)
- **Junction qubits: degree 3** (three neighbors) — branching points

Not all-to-all — gates between non-neighbors require SWAPs (expensive, see [[Transpilation]]). Efficient circuit design means working *with* this graph structure, not against it.

**Building GHZ on a subgraph:** start from the qubit that **minimizes the maximum distance to any other qubit in the subgraph** — the graph-theoretic "center" (minimum eccentricity). On a junction/T-shape, that's the junction itself, even though it can only fire one CX per layer (so it "tells" its neighbors one at a time, staggered, while already-informed neighbors relay onward in parallel).

**General case (many qubits):** build a **BFS spanning tree** from a well-chosen center qubit, then entangle each qubit with its BFS parent, layer by layer. Depth ≈ longest root-to-leaf distance in the tree. This generalizes "start from the middle" from a line to an arbitrary graph.

## Related
- [[Transpilation]]
- [[Coupling Map and Topology]] — the general concept this is a specific instance of (Heron's coupling map)
- [[GHZ States]]
- [[Circuit Depth]]
- [[Noisy Execution and Fidelity]]
- [[Simulators — Statevector vs Shot-Based]] — fake backends like FakeTorino, explained

## Self-Check
- Could you describe what a junction qubit is and why it's structurally different from most qubits on the chip?
- Why does building a GHZ state on this topology start from the graph-theoretic "center" rather than an arbitrary qubit?
- What does a BFS spanning tree buy you here that a simple fan-out doesn't?
