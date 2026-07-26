# Quantum Speedup — Ingredients and Myths
#qc/algorithms #qc/math

Three ingredients are necessary for a quantum algorithm to beat its classical counterpart: [[Superposition]] (a system in a complex linear combination of states until measured), **entanglement** (information shared jointly across qubits — see [[Bell States]]), and **interference** (combining amplitudes so possibilities reinforce or cancel — see [[Superposition]]). None of them alone is enough; real speedups come from an algorithm that engineers *all three together* around a problem's hidden structure.

## The myth: does superposition evaluate everything at once, for free?

**No.** Prepare an equal superposition over all inputs $x$, apply a query gate $U_f$ computing $f$:

$$U_f \frac{1}{\sqrt{2^n}}\sum_x |x\rangle|0\rangle = \frac{1}{\sqrt{2^n}}\sum_x |x\rangle|f(x)\rangle$$

This state genuinely contains every input-output pair — but measuring it collapses to exactly **one** random pair, exactly as if you'd picked one $x$ classically and computed $f(x)$ (see [[Measurement and Collapse]]). You have not "read out" every answer; you've paid the cost of preparing a superposition and gotten one sample back. **Key insight:** quantum algorithms don't win by brute-force evaluating every possibility — they win by exploiting a problem's *hidden global structure* (symmetry, periodicity, correlations) so that interference makes wrong answers cancel and right answers reinforce, concentrating measurement probability where you want it. [[Deutsch's Algorithm]] is the smallest possible worked example of this.

## The other myth: entanglement alone isn't enough either

Entanglement plus a **random** circuit gives no advantage over classical computation — a random tangle of correlations with no structure to exploit is just noise. Entanglement plus **structured interference** (the actual mechanism behind Shor's and [[Grover's Algorithm|Grover's]] algorithms, see [[The Quantum Algorithm Zoo]]) is what gives a speedup. **The algorithm does the work; entanglement only enables it** — entanglement is necessary but nowhere near sufficient, the same way having a well-shuffled deck doesn't win you a card game by itself.

## Related
- [[Superposition]]
- [[Bell States]]
- [[Measurement and Collapse]]
- [[Deutsch's Algorithm]] — the mechanism above, made concrete
- [[The Quantum Algorithm Zoo]]

## Self-Check
- Why doesn't preparing a superposition over all inputs let you read out every $f(x)$ value?
- Could you name the three necessary ingredients for quantum speedup and explain, in one sentence each, what role they play?
- What does "hidden global structure" mean, and why does an algorithm need one to exploit for a speedup to exist?
- Why does entanglement alone, without structured interference, fail to give any speedup?
