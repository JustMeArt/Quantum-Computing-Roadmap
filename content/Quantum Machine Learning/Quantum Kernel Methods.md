# Quantum Kernel Methods
#qc/ml

An entirely different way to build a "quantum ML model" from [[Quantum Neural Networks (QNN)|QNNs]]: instead of training circuit parameters, use a fixed [[Data Encoding Circuits (Feature Maps)|feature map]] $|\Psi(x)\rangle$ to compute a **fidelity kernel** — a similarity score between two data points — and hand that kernel matrix to an ordinary classical support-vector machine.

$$
K(x, x') = |\langle\Psi(x)|\Psi(x')\rangle|^2
$$

**Key insight:** no quantum circuit parameters are ever optimized here. The quantum computer's only job is to compute $K(x,x')$ for every pair of data points once, producing a kernel/similarity matrix; all actual learning — finding the decision boundary — happens classically afterward via a standard SVM (`QSVC` = quantum kernel + classical SVC). This is a fundamentally different division of labor than a QNN, where the circuit *is* the trainable model. Here the quantum part is a fixed similarity-measuring subroutine, and the "quantumness" of the model lives entirely in the *choice of feature map* — a different encoding circuit gives a different notion of similarity, and therefore a different classifier, without any quantum-side training at all.

```python
# schematic — sQUlearn-style
from squlearn.encoding_circuit import YZ_CX_EncodingCircuit
from squlearn.kernel import FidelityKernel, QSVC

fmap = YZ_CX_EncodingCircuit(num_qubits=4, num_layers=2, num_features=2)
kernel = FidelityKernel(fmap)
model = QSVC(kernel)
model.fit(X_train, y_train)   # kernel matrix computed once, SVM optimizes classically
```

## Related
- [[Data Encoding Circuits (Feature Maps)]] — the only quantum-side choice that matters here
- [[Quantum Neural Networks (QNN)]] — contrast: circuit parameters are trained there, not here

## Self-Check
- What role does the quantum computer actually play in a quantum kernel method, versus a QNN?
- If no circuit parameters are trained, what quantum-side choice still determines how good the classifier is?
- Why might two different feature maps produce two different classifiers from the exact same classical SVM training procedure?
