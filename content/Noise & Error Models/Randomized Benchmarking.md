# Randomized Benchmarking
#qc/noise #qc/qiskit

A technique for measuring a specific gate's error rate directly on hardware, isolated from state-preparation and measurement error. Run a long random sequence of gates from the [[Universal Gate Sets and the Clifford Group|Clifford group]], choosing the sequence so it composes to the identity — ideally you always measure back $|0\rangle^{\otimes n}$, and any deviation is accumulated gate error.

## Reference vs. interleaved

- **Reference RB** — random Clifford sequences alone, gives a baseline decay rate $r_\text{reference}$.
- **Interleaved RB** — the same random sequences, but with the gate under test inserted between every random Clifford, giving $r_\text{interleaved}$.

The **error per Clifford (EPC)** for the gate under test is extracted from the difference:

$$\text{EPC} = \left(1 - \frac{r_\text{interleaved}}{r_\text{reference}}\right)\times\frac{D-1}{D}$$

where $D=2^n$ for $n$ qubits. **Key insight:** comparing interleaved to reference cancels out the *other* Clifford gates' contribution to decay, isolating the error attributable specifically to the interleaved gate.

## In Qiskit

```python
from qiskit_experiments.library import InterleavedRB
from qiskit.circuit.library import CXGate

exp = InterleavedRB(
    interleaved_element=CXGate(),
    qubits=(0, 1),
    lengths=[1, 10, 30, 50, 100],
    num_samples=10,
    backend=backend,
)
result = exp.run().block_for_results()
```

## Related
- [[Universal Gate Sets and the Clifford Group]] — why Clifford sequences specifically
- [[Coherent vs Incoherent Gate Errors]]
- [[Backend Properties]]

## Self-Check
- Why does a randomized benchmarking sequence get built to compose to the identity?
- What does comparing interleaved RB to reference RB let you isolate that either alone wouldn't?
- Why are Clifford gates specifically the right building block for this technique?
