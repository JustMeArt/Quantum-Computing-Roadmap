# Physical Decoherence Mechanisms
#qc/noise #qc/hardware

[[Depolarizing Noise]], [[Pauli Error Model]], and [[Thermal Relaxation]] describe noise *effects* — what the state does under imperfection. This note is the physical layer underneath: the actual named causes of decoherence in superconducting hardware (see [[What is a Quantum Computer]]).

- **Charge noise** — fluctuating electric charges near the qubit shift its energy levels.
- **Flux noise** — fluctuating magnetic flux does the same for flux-sensitive qubit designs.
- **Dielectric loss** — energy absorbed by imperfections in the insulating materials surrounding the qubit circuit.
- **Quasiparticle poisoning** — stray unpaired electrons (quasiparticles) breaking the superconducting state locally, causing energy relaxation.
- **Crosstalk** — unwanted coupling between nominally-independent qubits or control lines, so an operation on one qubit leaks into its neighbors.

**Key insight:** the toy models elsewhere in this vault (depolarizing/Pauli/thermal) are deliberately agnostic about *why* — they're useful precisely because they isolate an effect for study without needing the underlying physics. This note is what those effects are effects *of*.

## Related
- [[Depolarizing Noise]], [[Pauli Error Model]], [[Thermal Relaxation]]
- [[What is a Quantum Computer]]
- [[Coherent vs Incoherent Gate Errors]]

## Self-Check
- Could you name the five physical decoherence mechanisms listed here?
- Why do the vault's toy noise models deliberately avoid specifying a physical cause?
- What's the difference between quasiparticle poisoning and crosstalk?
