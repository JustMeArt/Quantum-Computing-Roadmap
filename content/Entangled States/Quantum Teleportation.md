# Quantum Teleportation
#qc/entanglement #qc/gates

Transfers an **unknown** quantum state from Alice to Bob using a pre-shared [[Bell States|Bell pair]] plus a classical channel — not matter transport, despite the name. Alice ends up with nothing (her copy is destroyed by measurement, consistent with the [[No-Cloning Theorem]]); Bob ends up with the exact original state.

## Setup

Alice holds two qubits: **Q** (the unknown state to send) and **A** (her half of a pre-shared Bell pair). Bob holds **B**, the other half of that same Bell pair.

## The protocol

1. **Entangle and measure.** Alice applies `CX(Q, A)` then `H(Q)`, then measures both qubits: $Q\to c_1$, $A\to c_0$.
2. **Classical channel.** Alice sends the two classical bits $(c_0, c_1)$ to Bob — over an ordinary, light-speed-limited classical channel.
3. **Conditional correction.** Bob applies `X` on B if $c_1=1$, then `Z` on B if $c_0=1$. B now holds exactly the state Q started in.

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 3)
# ... prepare qc's qubit 0 (Q) in the unknown state to send, qubits 1(A)/2(B) as a Bell pair ...
qc.cx(0, 1)
qc.h(0)
qc.measure([0, 1], [1, 0])          # c1 <- Q, c0 <- A
with qc.if_test((qc.clbits[1], 1)):  # if c1
    qc.x(2)
with qc.if_test((qc.clbits[0], 1)):  # if c0
    qc.z(2)
```

## Why this doesn't break relativity

Measuring A instantly affects the joint state, but Bob's qubit is just noise until he applies the correction — and he can't know *which* correction to apply without the two classical bits, which travel no faster than light. The entanglement carries correlation, not information; the classical channel is what actually carries the information (see [[CHSH Inequality and Bell Tests]] for the same "correlation without signaling" point in a different context).

## Key insight: entanglement is consumed

The Bell pair is used up by this protocol — it can't be reused for a second teleportation. Entanglement here is a **resource**, spent to buy the transfer of one qubit's worth of quantum information using only two classical bits.

First proposed in 1993; demonstrated over 1,400 km lab-to-satellite. Considered the prototype building block for quantum networking and quantum repeaters.

## Related
- [[Bell States]]
- [[No-Cloning Theorem]] — why Alice's original has to be destroyed, not copied
- [[CHSH Inequality and Bell Tests]]
- [[Dynamic Circuits]] — the same mid-circuit-measurement + classical-feedforward pattern

## Self-Check
- Could you walk through all three steps of the teleportation protocol from memory?
- Why does teleportation need a classical channel at all — what would go wrong without it?
- What happens to Alice's copy of the state, and why does that matter for whether this violates no-cloning?
- Why must Bob's correction gates be *classically conditioned* on Alice's measurement outcomes rather than applied unconditionally?
- If you look at the raw measurement counts of a simulated teleportation circuit including Alice's classical bits, why do they look wrong until you marginalize those bits out and keep only Bob's?
