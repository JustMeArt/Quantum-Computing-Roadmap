# Bridge Gate Identity
#qc/hardware #qc/gates

A circuit identity that implements a non-local `CX(0,2)` using only nearest-neighbor gates on a chain `0—1—2`, **without moving any state** (unlike SWAP):

$$CX(0,2) = CX(0,1)\cdot CX(1,2)\cdot CX(0,1)\cdot CX(1,2)$$

Qubit 1 acts as a "bridge" — temporarily disturbed, then restored, while the entangling effect propagates from qubit 0 to qubit 2.

**Cost:** 4 nearest-neighbor CX gates to replace 1 non-local CX — a concrete "tax" for ignoring hardware topology. (After cancelling an adjacent identical CX with a neighboring gate in context, this can sometimes simplify to 3.)

**Order matters, and it's context-dependent:** there are two mirror-image valid forms —
- `CX(0,1)·CX(1,2)·CX(0,1)·CX(1,2)` (starts near)
- `CX(1,2)·CX(0,1)·CX(1,2)·CX(0,1)` (starts far)

Both are mathematically equal to `CX(0,2)`, but which one composes correctly depends on what gate already precedes the substitution point in your circuit — a gate that looks reusable from an earlier line usually isn't; it was serving a different purpose (e.g. GHZ-building) and the bridge identity needs its own full, self-contained 4-gate block.

## Related
- [[Transpilation]]
- [[CX Gate and Entanglement]]
- [[GHZ States]] — used to build nearest-neighbor GHZ circuits without SWAPs

## Self-Check
- Could you explain what the "bridge" qubit is doing in this identity, and why it ends up unchanged?
- Why is this identity sometimes preferable to a SWAP-based approach?
- Why do the two mirror-image forms of the identity matter — why isn't either one always correct?
