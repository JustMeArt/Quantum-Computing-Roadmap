# Grover's Algorithm
#qc/algorithms

Solves unstructured search: given $f:\{0,1\}^n\to\{0,1\}$ marking $M$ "solution" strings out of $N=2^n$ total, find one — classically this needs $O(N/M)$ oracle calls on average, Grover's needs only $O(\sqrt{N/M})$. **Key insight:** this is a proven-optimal quadratic speedup, not a shortcut to exponential — no sequence of unitaries interleaved with oracle calls can beat $O(\sqrt{N/M})$ for a genuinely *unstructured* problem. Shor's algorithm gets an exponential speedup instead, but only because factoring has extra algebraic structure (see [[The Quantum Algorithm Zoo]]) that Grover's problem setup doesn't have.

## Oracle and phase kickback

The oracle acts as $U_f|x,y\rangle=|x,y\oplus f(x)\rangle$. Prepared against a target qubit in $|-\rangle$, this becomes a pure phase flip on solutions — exactly the [[Deutsch's Algorithm|phase-kickback]] trick: $U_f|x,-\rangle=P_f|x\rangle\otimes|-\rangle$ where $P_f|x\rangle=(-1)^{f(x)}|x\rangle$.

## The geometric picture

Split the search space into $|\alpha\rangle$ (uniform superposition over the $N-M$ non-solutions) and $|\beta\rangle$ (uniform superposition over the $M$ solutions). The uniform starting state is $|\psi_0\rangle=\cos\vartheta_0|\alpha\rangle+\sin\vartheta_0|\beta\rangle$ with $\sin\vartheta_0=\sqrt{M/N}$ — a 2D problem living entirely in the $\{|\alpha\rangle,|\beta\rangle\}$ plane. $P_f$ reflects the state across $|\alpha\rangle$; the **diffusion operator** $D=H^{\otimes n}(2|0\rangle\langle0|-\mathbb{1})H^{\otimes n}=2|\psi_0\rangle\langle\psi_0|-\mathbb{1}$ reflects it back across $|\psi_0\rangle$. Two reflections compose into a rotation: one Grover iteration $G=DP_f$ rotates the state by $2\vartheta_0$ toward $|\beta\rangle$.

After $m$ iterations, $|\psi_m\rangle=\cos\vartheta_m|\alpha\rangle+\sin\vartheta_m|\beta\rangle$ with $\vartheta_m=(1+2m)\vartheta_0$, and success probability $\sin^2\vartheta_m$. Since this is a *rotation*, overshooting past $\vartheta_m\approx\pi/2$ swings the probability back down — there's a sharp optimum, not a monotonic improvement:

$$m \approx \frac{\pi}{4}\sqrt{\frac{N}{M}}$$

## Circuit sketch

```python
# one Grover iteration = oracle (phase flip on solutions) + diffusion
qc.append(oracle, range(n))                  # P_f: flips sign of solution states
qc.h(range(n))
qc.append(MCXGate(n-1), range(n))             # 2|0><0| - I, via multi-controlled phase
qc.h(range(n))
# repeat ~ (pi/4)*sqrt(N/M) times, then measure
```

## Related
- [[Deutsch's Algorithm]] — same phase-kickback mechanism, applied to a search problem instead of a promise problem
- [[The Quantum Algorithm Zoo]] — names Grover's on the milestone timeline; this note is the derivation that closes that gap
- [[The Quantum Fourier Transform]] — the other major "on hold" algorithm, unrelated mechanism but same milestone tier

## Self-Check
- Why is one Grover iteration a *rotation* rather than a monotonic increase toward the answer — what goes wrong if you run too many iterations?
- How does phase kickback let a classical-looking oracle $U_f|x,y\rangle=|x,y\oplus f(x)\rangle$ turn into a pure sign flip on solutions?
- Why is $O(\sqrt{N/M})$ provably optimal for unstructured search, while Shor's algorithm still gets an exponential speedup on a different problem?
