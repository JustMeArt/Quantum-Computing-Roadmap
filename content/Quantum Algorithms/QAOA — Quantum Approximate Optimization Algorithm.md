# QAOA — Quantum Approximate Optimization Algorithm
#qc/algorithms

A variational algorithm for **combinatorial optimization** (TSP, Max-Cut, scheduling, ...), not chemistry — same classical-optimizer-in-the-loop pattern as [[Variational Quantum Eigensolver (VQE)|VQE]], but instead of a general-purpose hardware-efficient ansatz, QAOA uses a problem-specific fixed structure: alternating layers of a **cost unitary** and a **mixer unitary**. **Key insight:** the problem itself becomes the ansatz — you don't design a generic trial state and hope it can represent the ground state, you build a circuit whose repeated structure is literally "apply the cost function, then stir," and let depth $p$ (how many times you alternate) trade circuit cost for solution quality.

## Encoding the problem

Combinatorial problems are first written as **QUBO** (Quadratic Unconstrained Binary Optimization): binary variables $x_i\in\{0,1\}$, a cost function to minimize, plus penalty terms enforcing any constraints (e.g. "each city visited exactly once" for TSP). QUBO converts to an **Ising Hamiltonian** via the substitution

$$x_i = \frac{1 - Z_i}{2}$$

turning the classical cost function into a diagonal Hamiltonian $H_C$ built entirely from $Z$ and $ZZ$ Pauli terms — a real quantum operator whose ground state *is* the optimal solution. For TSP specifically this blows up fast: encoding $n$ cities takes $n^2$ qubits (one per city-timestep pair), so 10 cities already means 100 qubits.

## The circuit

$$|\vec\gamma,\vec\beta\rangle = \underbrace{U_M(\beta_p)U_C(\gamma_p)\cdots U_M(\beta_1)U_C(\gamma_1)}_{p \text{ layers}}\,|+\rangle^{\otimes n}$$

- **Cost unitary** $U_C(\gamma)=e^{-i\gamma H_C}$ — encodes the objective; since $H_C$ is diagonal in the computational basis, this is just a phase applied to each basis state, proportional to that state's cost.
- **Mixer unitary** $U_M(\beta)=e^{-i\beta H_M}$, typically $H_M=\sum_i X_i$ — spreads amplitude across bitstrings, letting the optimizer explore rather than getting stuck.
- Classical outer loop (COBYLA, Powell, ...) adjusts $(\vec\gamma,\vec\beta)$ to push amplitude toward low-cost bitstrings, exactly [[Variational Quantum Eigensolver (VQE)|VQE's]] measure→optimize→repeat loop, just with a combinatorial cost instead of a molecular energy.
- **Depth $p$** is the real knob: on a worked 4-city TSP instance, ground-state (optimal-tour) probability rose from 0.15 at $p=1$ to 0.44 at $p=2$ to 0.54 at $p=3$ — deeper circuits track the true optimum more closely, at the cost of more gates.
- **Warm-starting**: rather than optimizing each depth from scratch, interpolate the converged $(\vec\gamma,\vec\beta)$ from depth $p{-}1$ as the starting point for depth $p$ — a real, named refinement that speeds up the optimization loop noticeably.

## QAOA as discretized adiabatic annealing

QAOA isn't an arbitrary circuit template — it's the **Adiabatic Theorem**, discretized. The theorem says: if a system starts in the ground state of $H_0$ and $H_0$ is perturbed slowly enough into $H_C$, the system stays in the ground state throughout — ending in the ground state of $H_C$, i.e. the optimal solution. Adiabatic annealing implements this as one continuous evolution

$$H(t) = -A(t)\sum_i X_i + B(t)\sum_{i,j} Z_iZ_j$$

with $A(t)$ decreasing from large to zero and $B(t)$ increasing from zero to large — "slowly enough" being the catch, since the runtime needed scales with the inverse of the *minimum spectral gap* the system passes through.

QAOA discretizes this schedule into $p$ alternating steps: each $(\gamma_k,\beta_k)$ pair is one "time slice" of $(B(t),A(t))$, and increasing $p$ is literally slowing down the annealing schedule to make the approximation to true adiabatic evolution more accurate — this is *why* $p$ trades circuit cost for solution quality, not just an empirical observation. QAOA can even **outperform** true adiabatic annealing for subexponential runtimes, since the variational optimizer can find shortcuts (deliberately diabatic transitions) through the minimum-gap bottleneck that a strictly-adiabatic schedule can't take.

## Warm-starting, in full

Rather than starting QAOA from the equal superposition $|+\rangle^{\otimes n}$, warm-starting biases the initial state toward a classically-obtained approximate solution. Given a QUBO, relax the binary constraint to get a continuous Quadratic Program $\min_{x\in[0,1]^n} x^TQx+b^Tx$ (efficiently solvable classically since convex QPs with PSD $Q$ have no combinatorial hardness), producing a fractional solution $c^*\in[0,1]^n$. Prepare the initial state as

$$|\psi_{c^*}\rangle = \bigotimes_{i=0}^{n-1} R_Y(\theta_i)|0\rangle, \qquad \theta_i = 2\sin^{-1}\!\left(\sqrt{c_i^*}\right)$$

and pair it with a modified mixer $H_{X,c^*}=\sum_i H^i_{X,c^*}$ whose ground state is exactly $|\psi_{c^*}\rangle$ (rather than the standard mixer's ground state $|+\rangle^{\otimes n}$). This works because $|\psi_{c^*}\rangle$ already overlaps the true optimum more than an equal superposition does, and it's still the correct ground state for the (modified) mixer Hamiltonian the algorithm needs. On a portfolio-optimization QUBO, warm-start QAOA reached a much higher probability of sampling the optimal solution than standard QAOA at the same depth, with the gap being largest at low $p$ — exactly where circuit-cost pressure is highest.

Because $H_C$ and $H_M$ act simply (diagonal phase, per-qubit rotation) on a computational-basis state, QAOA can be prototyped entirely in classical linear algebra — no quantum circuit needed at all — by applying the cost phase as elementwise multiplication and the mixer as an $X$-rotation amplitude mix directly on the statevector array. This is a deliberate transparency/speed trade-off for exploration and small instances, not how QAOA runs on real hardware.

## QAOA vs. quantum annealing

Both target the same class of problems (find the ground state of an Ising-type Hamiltonian), but QAOA is gate-based and gives explicit, tunable control over $p$ discrete layers, while quantum annealing (D-Wave-style) continuously interpolates from a simple Hamiltonian to $H_C$ over one long analog evolution — different hardware, different tuning knobs, same underlying optimization target.

## Related
- [[Variational Quantum Eigensolver (VQE)]] — same classical-optimizer-in-the-loop pattern, applied to molecular ground-state energy instead of combinatorial cost
- [[Parameterized Circuits]] — the "structure once, bind many times" pattern both VQE and QAOA build on
- [[The Quantum Algorithm Zoo]] — QAOA sits in that note's "Machine Learning"/optimization-adjacent territory, and in its physics-inspired adiabatic lineage
- [[Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping]] — how QAOA's commuting cost layer makes hardware-aware transpilation tractable
- [[The Full Pipeline of a Quantum Solver]] — QAOA as one "Algorithm" stage choice among several

## Self-Check
- Why does QAOA use a problem-specific alternating cost/mixer circuit instead of a generic hardware-efficient ansatz like VQE does?
- What does increasing depth $p$ actually buy you, and what does it cost?
- How does the QUBO→Ising substitution $x_i=\frac{1-Z_i}{2}$ turn a classical cost function into something a quantum computer can act on?
- In what precise sense is QAOA "discretized adiabatic annealing," and why can it sometimes outperform true adiabatic annealing?
- What does warm-starting actually change about the initial state and the mixer, and why does that improve low-depth performance specifically?
