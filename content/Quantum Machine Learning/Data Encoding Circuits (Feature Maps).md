# Data Encoding Circuits (Feature Maps)
#qc/ml

A **feature map** (or encoding circuit) is what turns a classical data point $x$ into a quantum state $|\Psi(x)\rangle$ before anything "quantum" can happen to it — every quantum machine learning technique needs one. Mechanically it's a [[Parameterized Circuits|parameterized circuit]] exactly like the ones VQE/QAOA use, except the bound values aren't free optimization variables — they're (transformations of) the classical input itself. The simplest version is **angle encoding**: feed $x$ directly into a rotation gate, e.g. $R_y(x)|0\rangle$. **Key insight:** naive angle encoding wastes the circuit's expressive range, since a single rotation only covers one period; **Chebyshev encoding** (used by sQUlearn's `ChebyshevPQC`) instead scales the input through Chebyshev polynomials before it hits the rotation angles, spreading the data non-linearly across multiple qubits/layers — a form of *data re-uploading*, where the same classical value gets fed back into the circuit at several points rather than just once, which measurably increases the model's expressive capacity for the same qubit count.

```python
from qiskit.circuit import Parameter
import numpy as np

x = Parameter('x')
# naive angle encoding: one rotation, one period of coverage
qc.ry(x, 0)

# Chebyshev-style: re-scale through a polynomial before the rotation,
# then re-upload x again in a later layer — same value, more expressive coverage
qc.ry(2 * np.arccos(x), 0)   # T_1(x)-style rescaling, illustrative
```

## Related
- [[Parameterized Circuits]] — same "structure once, bind values" substrate; here the bound values come from data, not free optimization parameters
- [[Quantum Neural Networks (QNN)]] — the model built on top of this encoding
- [[Quantum Kernel Methods]] — the other model built on top of this encoding

## Self-Check
- How is a feature map's `Parameter` binding different from how VQE binds its ansatz parameters, given both use the exact same `Parameter`/`ParameterVector` machinery?
- Why does naive single-rotation angle encoding limit a circuit's expressive range, and how does Chebyshev/data-re-uploading encoding address that?
- Could you explain "data re-uploading" to someone who only knows angle encoding as "feed x into a rotation gate"?
