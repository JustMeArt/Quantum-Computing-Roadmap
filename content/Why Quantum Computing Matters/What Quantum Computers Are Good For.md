# What Quantum Computers Are Good For
#qc/algorithms

Translating [[The Quantum Algorithm Zoo|complexity-class speedups]] into actual problem domains. Three broad categories:

- **Simulating nature** — spin models, materials science, quantum chemistry, high-energy physics. The founding motivation for the whole field: *"Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical"* (Feynman, 1981). This is the domain the whole [[Hamiltonian Simulation — Why It's Hard|Quantum Algorithms section]], [[1D Ising Chain and the Mirror Trick|this vault's own Ising-chain benchmark]], and the Error Mitigation section's toolchain are all built around.
- **Mathematics and data with structure** — factoring, the Abelian hidden subgroup problem, supervised/unsupervised learning, time series, regression, linear algebra. "Structure" is the operative word — see [[Quantum Speedup — Ingredients and Myths]] for why unstructured problems don't get the same benefit.
- **Search and optimization** — combinatorial optimization, black-box optimization, general mixed-integer programming. Unlike the two domains above, this one is heuristic today, not proven: algorithms like [[QAOA — Quantum Approximate Optimization Algorithm|QAOA]] have no proven speedup over classical solvers (see [[The Quantum Algorithm Zoo]]).

## Named industry applications

| Sector | Example applications |
|---|---|
| Aerospace & Automotive | Materials design, structural optimization |
| Financial Services | Fraud detection, derivatives pricing, portfolio optimization, risk analysis |
| High Tech | Seismic imaging, catalyst design, supply chain, manufacturing scheduling |
| Energy, Environment & Utilities | Portfolio optimization, grid optimization, battery design |
| Health Care & Life Sciences | Disease risk prediction, drug discovery, protein folding |

**Key insight:** none of these are guaranteed wins yet — they're the domains where the *shape* of the problem (structured, high-dimensional, hard to simulate classically) matches what quantum algorithms are actually good at, per [[Computational Complexity — P, NP, BQP]]. Whether a given instance of any of these actually achieves [[Quantum Utility vs Quantum Advantage|quantum advantage]] is a separate, harder question.

## Related
- [[The Quantum Algorithm Zoo]]
- [[Computational Complexity — P, NP, BQP]]
- [[Quantum Utility vs Quantum Advantage]]
- [[1D Ising Chain and the Mirror Trick]] — a concrete "simulating nature" example already in this vault

## Self-Check
- Could you name the three problem-area categories and give one example application for each?
- Why does "structure" keep coming up as the deciding factor for whether quantum helps?
- Why is naming an industry application not the same as proving quantum advantage for it?
