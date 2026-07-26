---
order: 4
---

# Bloch Sphere
#qc/basics #qc/math

Any single-qubit pure state can be written, up to an unobservable global phase, using two real angles instead of two complex amplitudes:

$$|\psi\rangle = \cos\!\left(\frac{\theta}{2}\right)|0\rangle + e^{i\phi}\sin\!\left(\frac{\theta}{2}\right)|1\rangle, \qquad \theta \in [0,\pi],\ \phi \in [0, 2\pi)$$

This is exactly a point on the surface of a unit sphere — the **Bloch sphere**. North pole ($\theta=0$) is $|0\rangle$, south pole ($\theta=\pi$) is $|1\rangle$, and every point on the equator is an equal superposition of $|0\rangle$ and $|1\rangle$ differing only in relative phase $\phi$.

**Key insight:** single-qubit gates are rotations of this point around an axis.

## Why only two degrees of freedom

A general 2-state complex system has 4 real parameters (2 complex amplitudes = 4 real numbers). Normalization ($|\alpha|^2+|\beta|^2=1$) removes one. Global phase — multiplying the whole state by $e^{i\gamma}$ — is physically unobservable (see [[Measurement and Collapse]], the Born rule only ever depends on $|\cdot|^2$) and removes another. That leaves exactly **2** real degrees of freedom, $\theta$ and $\phi$ — which is precisely enough to specify a point on the surface of a sphere.

```python
from qiskit.visualization import plot_bloch_multivector
from qiskit.quantum_info import Statevector
from qiskit import QuantumCircuit

qc = QuantumCircuit(1)
qc.h(0)
plot_bloch_multivector(Statevector(qc))   # shows the point moved to the equator
```

## Gates as rotations

| Gate | Rotation |
|---|---|
| [[X Gate]] | 180° about the X-axis |
| [[Z Gate and Relative Phase]] | 180° about the Z-axis |
| [[H Gate]] | 180° about the axis halfway between X and Z (swaps the poles with the equator) |

Reading gates this way turns [[Pauli Operators]] from abstract matrices into concrete geometric moves — the same picture used later when circuits are described as sequences of rotations.

## The limit of this picture

The Bloch sphere only exists for a **single** qubit's pure state. There is no analogous single point for a two-qubit entangled state — that irreducibility is part of what "entangled" means. See [[Bell States]].

## Related
- [[What is a Qubit]]
- [[Superposition]]
- [[H Gate]], [[X Gate]], [[Z Gate and Relative Phase]]
- [[Pauli Operators]]
- [[S and T Gates]] — smaller Z-axis rotations than the full Z gate

## Self-Check
- Could you sketch, or describe in words, where $|0\rangle$, $|1\rangle$, and $H|0\rangle$ each sit on the Bloch sphere?
- Why does thinking of gates as rotations help build intuition that the raw matrices don't?
- Why can't a two-qubit entangled state be drawn as a point on a single Bloch sphere?
- Why does a 2-state complex system have exactly 2, not 3 or 4, real degrees of freedom?
