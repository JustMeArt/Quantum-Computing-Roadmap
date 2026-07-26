# The LUCJ Ansatz
#qc/algorithms #qc/gates

The circuit that prepares $|\psi\rangle$ for [[Sample-Based Quantum Diagonalization (SQD)|SQD]] — Local Unitary Cluster Jastrow, a chemistry-motivated ansatz built specifically to be both physically meaningful and hardware-friendly.

## From UCCSD to a hardware-native circuit

Start from Unitary Coupled-Cluster Singles and Doubles (UCCSD), the standard quantum-chemistry ansatz:

$$|\Psi\rangle = e^{T-T^\dagger}|\Phi_0\rangle, \qquad T = \sum_{ai}t_i^a\hat c_a^\dagger\hat c_i + \sum_{abij}t_{ij}^{ab}\hat c_a^\dagger\hat c_b^\dagger\hat c_j\hat c_i$$

(single and double fermionic excitation operators — see [[Hamiltonians and Encoding for Quantum Circuits]] for the underlying fermion encoding). This is accurate but expensive to implement directly. **Jastrow-factorizing** it gives an equivalent-in-spirit but circuit-friendlier form:

$$T - T^\dagger \simeq \sum_\mu e^{-K_\mu}\,iJ_\mu\,e^{K_\mu}$$

where $K_\mu$ is an **orbital rotation generator** and $J_\mu$ is a **density-density Jastrow term** ($\sum J^{\sigma\tau}_{pr}\hat n_{p\sigma}\hat n_{r\tau}$). LUCJ keeps this structure directly:

$$|\Psi\rangle \simeq \prod_\mu e^{-K_\mu}\,e^{iJ_\mu}\,e^{K_\mu}\,|\Phi_0\rangle$$

— a product of orbital-rotation → Jastrow → inverse-orbital-rotation layers, each implementable as a specific hardware-native gate block.

## The tradeoff it resolves

| | Hardware-efficient ansätze | Physically-motivated ansätze (e.g. plain UCCSD) |
|---|---|---|
| Compatible with real device gates/connectivity/depth | Yes | No — needs all-to-all connectivity, high depth |
| Easy to initialize/optimize | No — arbitrary parameters, no physical starting point | Yes — parameters come from classical calculations |

**Key insight:** LUCJ is designed to get both — physical motivation (parameters derived from classical coupled-cluster theory, so optimization starts from a sensible point) *and* hardware compatibility (the gate sequence respects a specific device's native connectivity).

## Real-world evidence

LUCJ circuits are believed hard to classically simulate, have outperformed their classical coupled-cluster counterpart on real benchmarks, and are compatible with real hardware execution — demonstrated on an N₂ bond-breaking curve (matching HCI reference energies better than RHF/CISD/CCSD) and a 77-qubit Fe₄S₄ cluster calculation. Reference: Motta, Sung, Whaley, Head-Gordon, Shee, *Chem. Sci.* **14**, 40, 11213–11227 (2023).

## Concrete circuit construction (`ffsim`)

In practice, one LUCJ layer $\mu$ is built from two ingredients with a slightly different but equivalent notation to the derivation above:

$$U_\mu = e^{i\hat K_\mu}\; e^{i\sum_{p<q} J^{(\mu)}_{pq}\,\hat n_p \hat n_q}\; e^{-i\hat K_\mu}$$

— an **orbital rotation** $e^{i\hat K}$ (a one-body unitary that mixes molecular orbitals, i.e. "rearranges the seats") composed with a **Jastrow factor** $e^{i\sum_{pq} J_{pq}\hat n_p\hat n_q}$ (a diagonal term that penalizes or rewards pairs of orbitals being simultaneously occupied), where $\hat n_p=a_p^\dagger a_p$ is the occupation-number operator. `ffsim.UCJOpSpinBalanced.from_t_amplitudes(t1, t2, n_reps, interaction_pairs)` takes classically-computed **CCSD amplitudes** — $t_1[i,a]$ (single-electron jump amplitudes) and $t_2[i,j,a,b]$ (electron-pair scattering amplitudes) — and compiles them directly into the rotation angles $K_\mu$ and Jastrow couplings $J_{pq}^{(\mu)}$. This is the literal mechanism behind "parameters come from classical calculations" in the tradeoff table above: CCSD is not used as the final answer, just mined for its amplitudes as a high-quality parameter seed. "**Spin-balanced**" means the α and β sectors share the same orbital-rotation parameters, appropriate for closed-shell molecules like N₂ where both spin sectors are chemically identical.

Encoding onto qubits uses **Jordan-Wigner**: orbital $p$ occupied ⟺ qubit $p=|1\rangle$, empty ⟺ $|0\rangle$, with the qubit register split into a first block for spin-α orbitals and a second block for spin-β orbitals (`PrepareHartreeFockJW` sets the initial Hartree-Fock occupation pattern; `UCJOpSpinBalancedJW` applies the correlator in this qubit basis).

## Hardware topology shapes the circuit, not just the ansatz math

The Jastrow term's $\hat n_p\hat n_q$ couplings need physical qubit adjacency between orbital $p$ and orbital $q$ for the corresponding gate to be hardware-native — so which `interaction_pairs` are cheap to implement depends entirely on the target device's connectivity graph, not on the chemistry. Two IBM topologies illustrate this concretely:
- **Heron (`ibm_kingston`)**: the α and β qubit chains only touch at every 4th site — only 5 α–β crossing pairs are hardware-native.
- **Nighthawk (`ibm_miami`)**: the α and β rails run adjacent to each other, so up to 24 α–β pairs can be made hardware-native — far denser cross-spin connectivity, at the cost of a harder `initial_layout` design problem (each same-spin chain must trace a connected path through the device graph *and* stay close to its α–β partners, occasionally requiring a few parallel swaps).

This is a concrete answer to "how does LUCJ perform on heavy-hex vs. a different connectivity graph": more native cross-spin connectivity (Nighthawk) means fewer or shallower SWAP insertions are needed to realize the same Jastrow couplings, directly reducing two-qubit gate count for the identical ansatz.

## Related
- [[Sample-Based Quantum Diagonalization (SQD)]]
- [[Hamiltonians and Encoding for Quantum Circuits]]
- [[Variational Quantum Eigensolver (VQE)]] — another parameterized-ansatz approach, different tradeoff
- [[SQD on N₂ (Worked Example)]] — the Heron-vs-Nighthawk mapping exercise and CCSD-seeded circuit construction described above, in full worked-example context

## Self-Check
- Why does Jastrow-factorizing UCCSD make it more hardware-friendly?
- Could you explain the hardware-efficient vs. physically-motivated tradeoff, and how LUCJ tries to get both?
- Why does starting optimization from classically-derived parameters matter in practice?
- Why does the number of hardware-native α–β interaction pairs depend on the device topology rather than on the molecule being simulated?
