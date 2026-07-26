# Density Matrix
#qc/noise #qc/math

A statevector $|\psi\rangle$ can only describe a qubit that's in a definite (if possibly superposed) pure state. Once noise enters the picture — a qubit weakly coupled to its environment, an imperfect gate, a noisy measurement — you often need to describe a **mixture** of possible states, each with some classical probability. That's what a density matrix $\rho$ is for.

For a pure state, $\rho = |\psi\rangle\langle\psi|$ — no new information, just a different notation. The real value shows up for **mixed states**, where $\rho$ is a weighted sum over several possible pure states:

$$
\rho = \sum_i p_i |\psi_i\rangle\langle\psi_i|
$$

This is the natural language for describing noise: every noise model in this lab — [[Depolarizing Noise]], [[Pauli Error Model]], [[Thermal Relaxation]] — is really just a rule for how $\rho$ transforms under an imperfect operation.

## Open vs. closed systems

**Key insight:** noise is what happens when your qubit isn't actually isolated — it's weakly entangled with an environment ("bath") you don't have access to. The density matrix $\rho$ is what you get by mathematically averaging out (formally, taking the **partial trace** over) that inaccessible bath, leaving only the qubit's own reduced description. The general law governing how an *open* system's $\rho$ evolves over time is the **Lindblad master equation** — it replaces the closed-system Schrödinger equation once you can't ignore the environment. This is the formal justification underneath [[NoiseLearnerV3 and Pauli-Lindblad Models|NoiseLearnerV3's Pauli-Lindblad noise model]]: that model's $\mathcal{L}(\rho)=\sum_k\lambda_k(P_k\rho P_k-\rho)$ *is* a Lindblad-form generator, specialized to Pauli jump operators.

## Related
- [[Depolarizing Noise]]
- [[Pauli Error Model]]
- [[Thermal Relaxation]]
- [[NoiseLearnerV3 and Pauli-Lindblad Models]] — the Pauli-Lindblad model this open-system framing justifies

## Self-Check
- Could you explain why a statevector alone isn't enough once noise enters the picture?
- What does $\rho = |\psi\rangle\langle\psi|$ tell you for a pure state, and why is it "no new information"?
- Why is the density matrix described as "the natural language for describing noise"?
- What does the partial trace conceptually do, and why does it produce exactly the density matrix?
