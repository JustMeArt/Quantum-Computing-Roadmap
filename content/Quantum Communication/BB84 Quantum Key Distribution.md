# BB84 Quantum Key Distribution
#qc/crypto

A protocol for two parties to agree on a shared secret key by sending single qubits through a quantum channel, where any eavesdropping attempt is guaranteed to introduce a detectable error rate. Alice encodes each random bit in one of two randomly-chosen **bases** — computational ($Z$: $|0\rangle,|1\rangle$) or Hadamard ($X$: $|+\rangle,|-\rangle$) — by applying $X$ if the bit is 1, then $H$ if the basis is Hadamard. Bob measures each incoming qubit in his own randomly-chosen basis (applying $H$ first if his basis is Hadamard, then measuring in $Z$). **Key insight:** Bob only ever gets a meaningful, correlated result when his basis happens to match Alice's — because the four possible states span two *mutually unbiased* bases, measuring in the wrong basis collapses the qubit to a uniformly random outcome that carries zero information about the encoded bit. This is basis-dependent [[Measurement and Collapse]] doing the real security work.

## The protocol flow

1. **Encode (Alice):** for each bit, pick a random basis and a random bit value; prepare the corresponding single-qubit state and send it.
2. **Decode (Bob):** pick a random basis independently; measure in it.
3. **Sift:** Alice and Bob publicly announce *only their basis choices* (never their bit values) and keep only the positions where both chose the same basis — on average, half the string.
4. **Verify:** publish a random subset of the sifted key openly and compare. A near-zero mismatch rate means the channel was clean; a mismatch rate near 25% means someone eavesdropped. The remaining, unpublished sifted bits become the final secret key.

**Why 25%, not 50%:** an eavesdropper (Eve) who intercepts a qubit has to guess a measurement basis before relaying a fresh qubit onward — she has no way to know Alice's basis any more than Bob does. She picks the wrong basis half the time; when she does, she irreversibly randomizes the state before re-sending it, and Bob's own later measurement (even in the *correct* Alice-basis) then disagrees with Alice's original bit half the time. $0.5\times0.5=0.25$. This is the same physical fact the [[No-Cloning Theorem]] formalizes: Eve cannot copy the unknown qubit and forward an undisturbed original while keeping a copy for herself — measuring to extract information *is* disturbing it.

```python
import random
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

n = 100
alice_bits = [random.randint(0, 1) for _ in range(n)]
alice_bases = [random.randint(0, 1) for _ in range(n)]   # 0 = Z, 1 = X
bob_bases   = [random.randint(0, 1) for _ in range(n)]

def encode(bit, basis):
    qc = QuantumCircuit(1, 1)
    if bit == 1:
        qc.x(0)
    if basis == 1:
        qc.h(0)
    return qc

def decode(qc, basis):
    if basis == 1:
        qc.h(0)
    qc.measure(0, 0)
    return qc

sim = AerSimulator()
bob_bits = []
for bit, a_basis, b_basis in zip(alice_bits, alice_bases, bob_bases):
    qc = decode(encode(bit, a_basis), b_basis)
    counts = sim.run(qc, shots=1).result().get_counts()
    bob_bits.append(int(next(iter(counts))))

sifted = [(a, b) for a, b, ab, bb in zip(alice_bits, bob_bits, alice_bases, bob_bases) if ab == bb]
mismatch_rate = sum(a != b for a, b in sifted) / len(sifted)  # ~0 clean, ~0.25 under eavesdropping
```

## Related
- [[No-Cloning Theorem]] — BB84's security proof *is* the no-cloning argument in protocol form: Eve can't extract information from an unknown state without disturbing it
- [[Measurement and Collapse]] — basis-dependent measurement is the entire mechanism
- [[E91 — Entanglement-Based Quantum Key Distribution]] — sibling protocol; contrast the eavesdropping-detection mechanism (basis-mismatch error rate here vs. live Bell-test violation there)

## Self-Check
- Why does Bob only get a meaningful result when his basis matches Alice's, rather than a partially-correct one?
- Walk through why an eavesdropper's interception introduces errors in exactly 25% of the sifted key, not 50% or 100%.
- Why do Alice and Bob compare their *basis choices* publicly but never their *bit values*, until the final verification step?
