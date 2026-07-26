# SQD on N₂ (Worked Example)
#qc/algorithms

A concrete, end-to-end run of [[Sample-Based Quantum Diagonalization (SQD)]] on molecular nitrogen (N₂), stretched to 2.0 Å (roughly double its ~1.1 Å equilibrium bond length, chosen because a stretched bond has stronger electron correlation and a bigger gap between the cheap Hartree-Fock guess and the true ground state). The pipeline: PySCF builds the molecule in a `cc-pvdz` basis (28 spatial orbitals total), freezes the 2 inert core orbitals, and leaves an active space of 26 orbitals with 5 electrons per spin — a Hilbert space of $\binom{26}{5}=65{,}780$ configurations per spin sector, over 4 billion states total, far beyond brute-force diagonalization. **Key insight:** the lab makes "quantum utility" a measurable, falsifiable claim rather than a slogan — it defines a purely classical brute-force baseline, then shows the quantum-sampled subspace beats it once augmented, which is the actual empirical bar for "the quantum computer contributed something classical enumeration alone could not."

## State preparation and hardware mapping

The [[The LUCJ Ansatz|LUCJ ansatz]] circuit is built from CCSD amplitudes (`ffsim.UCJOpSpinBalanced.from_t_amplitudes`) and prepared via Jordan-Wigner encoding on $2\times26=52$ qubits (26 for spin-α, 26 for spin-β). The same circuit is mapped to two different IBM device topologies to compare hardware connectivity, directly answering the "which topology fits this circuit better" question:
- **Heron (`ibm_kingston`)**: the α and β qubit chains only touch at every 4th site — only 5 hardware-native α–β crossing pairs are available (`[(p, p) for p in range(0, 26, 4)]`, truncated to 5).
- **Nighthawk (`ibm_miami`)**: the α and β rails sit adjacent to each other, so up to 24 α–β pairs can be made hardware-native — far denser cross-spin connectivity than Heron, at the cost of needing a custom `initial_layout` that keeps each same-spin chain connected *and* keeps α–β pairs close.

## Sampling and configuration recovery

2,000 shots are drawn from the mapped circuit; each shot is a 52-bit string splitting into an α-half and β-half, one proposed electron configuration. On real hardware, it's normal for **zero** of the 2,000 raw shots to have the correct particle number (5 electrons per spin) — bit-flip noise reliably pushes samples out of the physical sector. [[Sample-Based Quantum Diagonalization (SQD)|Configuration recovery]] repairs this using the concrete weight function $W_{0\to1}(\text{occ}) = e^{\text{occ}} - 1$ (favor filling orbitals that are usually occupied) and its mirror $W_{1\to0}(\text{occ})=W_{0\to1}(1-\text{occ})$, seeded from the Hartree-Fock occupancy prior and refined each iteration using the diagonalizer's own orbital-occupancy output.

## The self-consistent loop and the reference-subspace result

The full loop (recover → subsample into batches → build a Slater-determinant subspace via `qiskit_addon_sqd.fermion.solve_sci_batch` → diagonalize → feed occupancies back) runs for several iterations, tracking the best (lowest) energy seen. On its own, this typically lands **below Hartree-Fock but above CCSD** — proof the quantum samples carry real signal, but not yet chemistry-grade. The lab then builds a purely classical baseline: enumerate the 300 lowest-excitation-rank Slater determinants around the Hartree-Fock reference (brute-force, no chemical insight, via `itertools.combinations`) and diagonalize in that fixed set alone. This classical reference subspace typically **beats pure-sampling SQD** — proof that hardware noise is dropping chemically important near-HF configurations that a systematic classical enumeration would keep. The final step pins the 100 best classical reference determinants as a guaranteed floor and lets quantum sampling fill the remaining subspace slots each iteration. **If this reference-augmented SQD result beats the classical-only reference subspace, that is quantum utility demonstrated empirically**: the quantum device contributed configurations that brute-force classical enumeration could not find on its own, and that contribution measurably lowered the energy (and typically tightens the run-to-run variance too, since the pinned floor stabilizes every batch).

## Related
- [[Sample-Based Quantum Diagonalization (SQD)]] — the general method this is a worked instance of
- [[The LUCJ Ansatz]] — the state-preparation circuit used here, including the CCSD-seeded orbital rotations
- [[Quantum Chemistry — QPE on H2 (Worked Example)]] — the QPE-flavored worked example on a much smaller molecule; contrast the fault-tolerant-style precision-vs-depth tradeoff there with SQD's noisy near-term sampling-plus-classical-cleanup approach here
- [[Quantum Utility vs Quantum Advantage]] — the general framing of what "quantum utility" means; this note is a concrete instance of it
- [[The Ground-State Problem]]

## Self-Check
- Why is it unsurprising (not a bug) that zero of the 2,000 raw hardware shots have the correct particle number before configuration recovery?
- What exactly does it mean for reference-augmented SQD to beat the classical reference subspace, and why is that the specific bar for "quantum utility" rather than just "SQD beat Hartree-Fock"?
- Why would the Nighthawk topology allow far more native α–β interaction pairs than Heron, and what does that cost in the initial-layout design?
