# Z Gate & Relative Phase
#qc/gates #qc/phase

The Z gate leaves |0⟩ unchanged but maps |1⟩ → −|1⟩:

$$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

This minus sign is a **relative phase**. It doesn't change measurement probabilities in the standard basis (still 50/50) but is physically real — it affects how the state interferes in later computation. It's what distinguishes |00⟩+|11⟩ from |00⟩−|11⟩.

## The general phase gate

Z is one member of a whole family, the **phase gate** $P_\theta$:

$$P_\theta = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\theta} \end{pmatrix}$$

Z is the special case $\theta=\pi$ (a half-turn about the Z-axis on the [[Bloch Sphere]]). See [[S and T Gates]] for the two other special cases that matter most in practice.

## Related
- [[Pauli Operators]]
- [[Bell States]] — the two "minus" Bell states come from combining X and Z
- [[S and T Gates]]
- [[Bloch Sphere]]

## Self-Check
- Why does the Z gate not change measurement probabilities in the standard basis, if it's clearly doing something?
- What is a "relative phase," and why does it matter even though it's invisible to a Z-basis measurement?
- What's the difference between $|00\rangle+|11\rangle$ and $|00\rangle-|11\rangle$, and how would you actually detect it?
- What angle $\theta$ makes $P_\theta$ equal to the Z gate?
