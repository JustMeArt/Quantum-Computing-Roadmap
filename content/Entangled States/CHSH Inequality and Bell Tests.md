# CHSH Inequality and Bell Tests
#qc/entanglement #qc/math

The experimental proof that [[Bell States|entanglement]] isn't just "correlation from a hidden pre-agreed answer." Any theory where each particle secretly carries a definite, pre-determined value (a **local hidden variable**) is bound by the **CHSH inequality**: $S \le 2$, for a specific combination $S$ of correlation measurements Alice and Bob make with independently-chosen settings. Quantum mechanics predicts — and experiments confirm — $S \approx 2\sqrt2 \approx 2.83$, clearly violating the classical bound.

**CHSH** = Clauser, Horne, Shimony, Holt. First experimentally confirmed by Alain Aspect (1982); loophole-free versions closed remaining experimental gaps in 2015.

**Key insight:** *"Entanglement is not ignorance about a pre-existing state — the CHSH violation is the experimental receipt."* Classically, correlated outcomes always come from either direct causation or a shared hidden fact fixed in advance. The CHSH violation rules out the second option experimentally, not just theoretically.

## Why this doesn't allow signaling

Measuring one particle instantly affects the joint statistics, but this **cannot send information** — the correlation is only visible once Alice and Bob **classically compare** their individual (locally random) results, and that comparison is itself light-speed-limited. The non-locality lives in the correlations between two already-random outcomes, not in either individual outcome — so nothing travels faster than light. This is the same resolution as [[Quantum Teleportation]]'s reliance on a classical channel.

## Related
- [[Bell States]] — the states used to violate CHSH
- [[Quantum Teleportation]]
- [[No-Cloning Theorem]]
- [[Measurement and Collapse]]
- [[E91 — Entanglement-Based Quantum Key Distribution]] — this exact $S\le2$/$S\approx2\sqrt2$ math, reused as a security primitive

## Self-Check
- What does the classical CHSH bound ($S\le2$) assume about how the world works, and what does violating it rule out?
- Could you explain why entanglement correlations don't allow faster-than-light signaling, even though measuring one particle instantly affects the joint state?
- Why did it take until 1982 (Aspect) and 2015 (loophole-free) to fully confirm something quantum mechanics predicted decades earlier?
- If you parameterize a Bell state with a single rotation angle $\theta$ (e.g. `Ry(θ)` on one qubit before the entangling gate) and sweep $\theta$ while computing $S$, why does that let you scan continuously between CHSH-violating and non-violating configurations, rather than jumping straight from "classical" to "maximally quantum"?
- Framed as a nonlocal game (Alice and Bob win if $a\oplus b = x\wedge y$ for their random inputs $x,y$), why does the best classical strategy cap out at 75% win probability while the best quantum strategy reaches $\cos^2(\pi/8)\approx85.4\%$ — and how does that number relate to $S\approx2\sqrt2$?
