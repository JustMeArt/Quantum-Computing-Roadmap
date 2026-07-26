# Deutsch's Algorithm
#qc/algorithms #qc/gates

The first concrete proof that a quantum computer can need **fewer queries** than any classical algorithm. **Deutsch's problem:** given a function $f:\{0,1\}\to\{0,1\}$ as a black-box oracle, determine whether $f$ is **constant** ($f(0)=f(1)$) or **balanced** ($f(0)\neq f(1)$). Classically, this needs 2 queries to be certain (evaluate $f(0)$ and $f(1)$, compare). Deutsch's algorithm does it in **1 query**.

## The oracle and phase kickback

The oracle is a unitary $U_f|x\rangle|y\rangle = |x\rangle|y\oplus f(x)\rangle$ — reversible, since classical $f$ generally isn't. **Key insight — phase kickback:** if the target qubit is prepared in $|-\rangle=\frac{1}{\sqrt2}(|0\rangle-|1\rangle)$ instead of a computational basis state, applying $U_f$ leaves $|-\rangle$ unchanged but writes $f(x)$ into the *phase* of the query register instead:

$$U_f|x\rangle|-\rangle = (-1)^{f(x)}|x\rangle|-\rangle$$

This is because $U_f$ flips the target qubit iff $f(x)=1$, and flipping $|-\rangle$ just gives $-|-\rangle$.

## Circuit and derivation

Prepare $|0\rangle|1\rangle$, apply $H$ to both qubits, apply $U_f$, apply $H$ to the first qubit, measure it.

$$|\psi_0\rangle = |0\rangle|1\rangle \xrightarrow{H\otimes H} |\psi_1\rangle = |+\rangle|-\rangle$$

Applying $U_f$ via phase kickback on each branch of the query register's superposition:

$$|\psi_2\rangle = \frac{1}{\sqrt2}\Big[(-1)^{f(0)}|0\rangle + (-1)^{f(1)}|1\rangle\Big]\otimes|-\rangle = (-1)^{f(0)}\frac{1}{\sqrt2}\Big[|0\rangle + (-1)^{f(0)\oplus f(1)}|1\rangle\Big]\otimes|-\rangle$$

Applying $H$ to the first qubit: $H\frac{1}{\sqrt2}(|0\rangle+|1\rangle)=|0\rangle$ if $f(0)\oplus f(1)=0$, or $H\frac{1}{\sqrt2}(|0\rangle-|1\rangle)=|1\rangle$ if $f(0)\oplus f(1)=1$. So:

$$|\psi_3\rangle = (-1)^{f(0)}\,|f(0)\oplus f(1)\rangle \otimes |-\rangle$$

Measuring the first qubit gives $f(0)\oplus f(1)$ **exactly**: outcome 0 means constant, outcome 1 means balanced — determined with a single call to $U_f$, using the [[Quantum Speedup — Ingredients and Myths|interference]] set up by the two Hadamards around it.

## Related
- [[Quantum Speedup — Ingredients and Myths]]
- [[The Deutsch-Jozsa Algorithm]] — the n-qubit generalization
- [[H Gate]]
- [[Measurement and Collapse]]

## Self-Check
- Could you explain phase kickback — why does $U_f$ acting on $|-\rangle$ change the *phase* instead of the *state*?
- Why does Deutsch's algorithm need only 1 query when classically you need 2?
- What would happen to the final measurement outcome if you skipped the first Hadamard layer?
