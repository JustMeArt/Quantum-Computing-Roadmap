# Circuit Depth
#qc/depth

The number of sequential **layers** needed to run a circuit, assuming maximum parallelism.

**Rules:**
- Two gates can share a layer only if they act on **completely different qubits**.
- If two gates share any qubit, they must be in different layers.

**Why it matters:** every gate introduces error; more layers = more accumulated noise + more time for qubits to decohere. Minimizing depth is one of the most important practical skills in quantum computing.

**Common trap:** the circuit *drawing* can be misleading — gates may look side-by-side visually but still be sequential if they share a qubit. Always verify with `qc.depth()` when it matters.

**Manual calculation** (without `.depth()`): track, per qubit, the layer its last gate finished at. A new gate's start layer = max(finish layer of all qubits it touches); its finish layer = start+1. Circuit depth = max finish layer over all gates. This is a critical-path/scheduling algorithm — each qubit is a timeline.

```python
def compute_depth(qc):
    qubit_layer = {q: 0 for q in qc.qubits}
    for instr in qc.data:
        qs = instr.qubits
        start = max(qubit_layer[q] for q in qs)
        for q in qs:
            qubit_layer[q] = start + 1
    return max(qubit_layer.values())
```

## Related
- [[GHZ States]] — depth is the central optimization target
- [[Start From the Middle]]
- [[Recursive Fan-Out]]
- [[Transpilation]] — depth typically *increases* after transpiling to native gates
- [[Circuit Introspection Cheat Sheet]] — `circuit.depth()` is the built-in equivalent of the manual algorithm above, plus the 2-qubit-only variant

## Self-Check
- Could you explain to someone why two gates drawn side-by-side in a diagram might still count as different layers?
- Why does minimizing depth matter more than minimizing total gate count?
- Could you walk through the manual `compute_depth` algorithm on a 3-gate circuit by hand?
