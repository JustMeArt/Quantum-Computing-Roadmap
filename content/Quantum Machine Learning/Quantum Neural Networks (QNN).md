# Quantum Neural Networks (QNN)
#qc/ml

A QNN is a [[Data Encoding Circuits (Feature Maps)|feature map]] plus a *trainable observable*, optimized against a supervised loss the same way [[Variational Quantum Eigensolver (VQE)|VQE]] optimizes against energy. **Key insight:** it's the same five-step variational loop as VQE — prepare a parameterized state, measure an observable, classically optimize — except the loss is a supervised prediction error instead of $\langle H\rangle$, and (distinctively) the *observable itself* can be trainable, not just the circuit. sQUlearn's construction uses $O=\theta_0 I+\sum_i\theta_i Z_i$ (a `SummedPaulis` observable): the readout weighting on each qubit is a learned parameter, so the model isn't just choosing *how* to prepare a state, it's also choosing *how to weigh what it measures* — a second trainable stage VQE doesn't have (VQE's observable, the Hamiltonian, is fixed by the physics problem, not learned).

## The loop

```
1. Encode input x through a feature map circuit (see [[Data Encoding Circuits (Feature Maps)]])
2. Prepare |ψ(x, θ)⟩ — encoding + trainable ansatz layers
3. Measure the trainable observable O(θ_readout) = θ_0·I + Σ θ_i·Z_i
4. Loss = SquaredLoss(prediction, y_true); classical optimizer (e.g. Adam) updates θ
5. Repeat over the training set
```

## Training under the noise you'll deploy on

A concrete result worth internalizing: a QNN trained *directly on* a noisy backend (e.g. `FakeTorino`) measurably outperforms a QNN trained on an ideal noiseless simulator and only *evaluated* on the noisy backend afterward. The optimizer, given noisy feedback throughout training, finds parameters that are robust to that specific noise profile — noise-aware training is a real, usable technique, not just theoretical hardening. Same broader lesson as elsewhere in this vault (see the Error Mitigation section generally, e.g. [[NoiseLearnerV3 and Pauli-Lindblad Models]]): don't treat "ideal circuit, apply mitigation after" and "expose the noise during optimization" as equivalent — they aren't.

## Related
- [[Data Encoding Circuits (Feature Maps)]]
- [[Variational Quantum Eigensolver (VQE)]] — same loop shape, energy loss instead of supervised loss, fixed observable instead of trainable
- [[Parameterized Circuits]]
- [[Quantum Kernel Methods]] — the other QML approach: no circuit parameters trained at all

## Self-Check
- How does a QNN's training loop resemble VQE's, and where does it diverge?
- Why does making the readout observable $O=\theta_0 I+\sum\theta_i Z_i$ trainable give the model something VQE's fixed Hamiltonian observable doesn't have?
- Why would a QNN trained directly on a noisy backend outperform one trained ideally and only evaluated on noise afterward?
