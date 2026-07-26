# Reducing Depth: Start From the Middle
#qc/depth #qc/ghz

Key insight: a [[GHZ States|GHZ state]] is symmetric — all qubits end up identical. You don't have to build it from one end.

Put H on the **middle** qubit, grow entanglement outward in both directions **simultaneously** (two parallel chains: one heading left, one heading right). This roughly **halves** the CX depth vs. a single-direction chain or fan-out (both depth N).

**Subtlety (easy to undercount visually):** the two CNOTs both leaving the middle qubit at the very first step *cannot* be in the same layer — the middle qubit can't fire twice at once. This costs one extra layer beyond the naive "steps in the loop" count, so total depth = 1 (H) + (steps needed for the *longer* arm to finish), where the longer arm's step count is `ceil` of the larger half-distance to either end.

Example: 20 qubits, middle = qubit 10 → left arm needs 10 steps (reach qubit 0), right arm needs 9 (reach qubit 19) → loop runs 10 times (until both done) → depth = 1 + 10 = **11**.

## Related
- [[GHZ States]]
- [[Circuit Depth]]
- [[Recursive Fan-Out]] — applies this halving idea recursively for exponential improvement

## Self-Check
- Why does a GHZ state's symmetry let you start building it from the middle instead of an end?
- Why can't the two CNOTs leaving the middle qubit be in the same layer?
- For 20 qubits, could you work out the depth by hand, including the "longer arm" subtlety?
