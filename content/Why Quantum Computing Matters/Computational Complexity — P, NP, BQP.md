# Computational Complexity — P, NP, BQP
#qc/algorithms #qc/math

The formal language for what "quantum speedup" actually claims. Problems are grouped into **complexity classes** by how their solution cost scales with input size $n$ — the key distinction is **polynomial** ($O(n^c)$, considered efficient) vs. **exponential** ($O(c^n)$, considered intractable at scale).

- **P** — solvable in polynomial time on a classical computer.
- **NP** — a candidate solution can be *verified* in polynomial time on a classical computer, even if finding one might not be.
- **BQP** — bounded-error quantum polynomial time: solvable with high probability in polynomial time **on a quantum computer**.

## How they relate

$P \subseteq NP$ (anything efficiently solvable is efficiently verifiable) and $P \subseteq BQP$ (a classical polynomial-time algorithm is trivially also a quantum one). **Key insight:** BQP and NP overlap without either containing the other — some BQP problems (like factoring) are inside NP, but BQP is not a subset of NP in general, and NP is not a subset of BQP either. [[The Deutsch-Jozsa Algorithm|Deutsch-Jozsa]] is a clean example of a problem efficiently solvable in BQP via a structured promise, independent of whether it sits inside NP.

## The Church-Turing caveat

**A quantum computer does not compute anything a classical computer fundamentally cannot.** The (extended) Church-Turing thesis holds: anything computable on a quantum computer is theoretically computable on a classical one too, given enough time. What quantum computing changes is *efficiency* — moving a problem from an exponential classical runtime into a polynomial quantum one (BQP) — not *computability*. This is the precise, careful version of "why quantum computers matter": not magic, not unlimited power, but a different cost curve for a specific class of problems with the right hidden structure (see [[Quantum Speedup — Ingredients and Myths]]).

## Related
- [[The Deutsch-Jozsa Algorithm]]
- [[Quantum Speedup — Ingredients and Myths]]
- [[The Quantum Algorithm Zoo]] — the actual catalog of problems known to live in BQP with better-than-classical scaling

## Self-Check
- Could you explain the difference between P, NP, and BQP to someone who's never seen complexity theory?
- Why does BQP overlap with NP instead of one containing the other?
- Why does the Church-Turing caveat matter — what would be a wrong way to describe what quantum computers can do?
