# Coupling Map and Topology
#qc/hardware

The coupling map defines which pairs of physical qubits can directly execute a two-qubit gate. Two qubits not directly connected can't interact without help — the transpiler has to route the state between them first (see [[SWAP Overhead and Routing]]).

Different IBM architectures use different topologies:

- **Heron** — heavy-hex (heavy hexagonal lattice), a sparse topology chosen partly because it's favorable for quantum error correction schemes.
- **Nighthawk** — a different connectivity pattern, optimized for different operation profiles.
- Other processors may use chain, grid, or fully custom topologies.

The topology directly shapes how expensive a given circuit is to run: a logical circuit that needs lots of long-range interactions will need many more [[SWAP Overhead and Routing|SWAP insertions]] on a sparse topology than on a denser one — this is exactly why comparing architectures (Heron vs Nighthawk) for the same circuit is a meaningful benchmark, not just an academic exercise.

```python
coupling_map = backend.coupling_map.get_edges()  # list[tuple[int, int]]
```

## Related
- [[SWAP Overhead and Routing]]
- [[Physical vs Logical Qubits and Layout]]
- [[Backend Properties]]
- [[Heavy-Hex Topology]] — Heron's specific coupling map, worked through in detail
- [[Dynamic GHZ via Qubit Reuse]] — a way to sidestep topology limits entirely via feedforward instead of routing
- [[What is a Quantum Computer]] — why this constraint exists physically in the first place

## Self-Check
- Could you explain what a coupling map is to someone who's never seen one?
- Why does comparing Heron vs Nighthawk on the same circuit count as a meaningful benchmark?
- What has to happen if a circuit needs two qubits to interact that aren't in the coupling map?
