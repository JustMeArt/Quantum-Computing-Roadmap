# E91 — Entanglement-Based Quantum Key Distribution
#qc/crypto #qc/entanglement

A protocol for two parties to agree on a shared secret key using entangled qubit pairs, where the security check is a live violation of the [[CHSH Inequality and Bell Tests|CHSH inequality]] rather than an error-rate comparison. A source distributes [[Bell States|Bell pairs]] to Alice and Bob; each independently and randomly picks one of three measurement bases per qubit (Alice: $Z$, $X$, and a tilted $W=(Z+X)/\sqrt2$ basis; Bob: $Z$ and two other bases tilted at the standard CHSH offset angles). **Key insight:** the protocol splits its measurement outcomes into two disjoint uses — outcomes from one specific set of basis-pairs become the raw secret key (kept secret, never compared), while outcomes from the *other* basis-pairs are publicly compared to compute the CHSH value $S$. A clean channel gives $S\approx2\sqrt2\approx2.83$; any eavesdropper intercepting and re-measuring the pairs collapses the entanglement, pulling the measured $S$ down toward — or below — the classical bound $S\le2$. The eavesdropping check and the key-generation measurements never touch the same data, so checking security doesn't cost you any key material.

## Why this differs from prepare-and-measure QKD

Unlike [[BB84 Quantum Key Distribution]], where Alice actively prepares and sends a qubit in a state she knows, E91 relies purely on a shared entangled resource — neither party "chooses" the bit value, it falls out of the (genuinely random) measurement outcome. Security doesn't come from Eve's measurement disturbing a known preparation; it comes from Eve's intercept-and-resend attack being fundamentally unable to preserve the correlations that make CHSH violation possible in the first place. A real implementation also has to separate this from ordinary hardware noise: depolarizing noise degrades $S$ the same way an eavesdropper does, so a measured $S$ between the classical and quantum bounds doesn't unambiguously mean "attacked" — it could just mean "noisy."

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import SparsePauliOp

# Bell pair source
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

# CHSH combination reuses the same S = E(a1,b1) + E(a1,b2) + E(a2,b1) - E(a2,b2)
# machinery as CHSH Inequality and Bell Tests — here applied to the
# *non-key* basis-pairs only, as a live eavesdropping check.
```

## Related
- [[CHSH Inequality and Bell Tests]] — the exact $S\le2$ vs. $S\approx2\sqrt2$ math, here repurposed as a security primitive instead of a foundational physics demo
- [[Bell States]]
- [[No-Cloning Theorem]] — the deeper reason Eve can't intercept-and-resend without disturbing the correlations
- [[BB84 Quantum Key Distribution]] — sibling protocol; contrast the eavesdropping-detection mechanism (live Bell-test violation here vs. basis-mismatch error rate there)

## Self-Check
- Why can the same set of entangled pairs supply both a secret key and a live security check, without the check leaking any key information?
- Why does an eavesdropper's intercept-and-resend attack necessarily pull the measured CHSH value down, even though Eve never touches the qubits Alice and Bob keep for their key?
- How would you distinguish "the channel is just noisy" from "someone is eavesdropping" if both push $S$ below $2\sqrt2$?
