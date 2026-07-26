---
order: 1
---

# What is a Quantum Computer?
#qc/basics #qc/hardware

A quantum computer is a device that stores and transforms information in **qubits** — quantum-mechanical states — instead of classical bits, exploiting [[Superposition|superposition]] and entanglement to represent and manipulate information in ways classical bits fundamentally can't. **Key insight:** it is not a faster classical computer. A classical bit is always definitely 0 or 1; a qubit's advantage comes from interference between possibilities, not from "trying every answer at once for free" — you still only ever read out plain classical bits at the end (see [[Measurement and Collapse]]).

## What's physically inside one

IBM's devices (and the ones used throughout this vault) use **superconducting transmon qubits** — tiny circuits etched from superconducting metal on a chip, each behaving like an artificial atom with quantized energy levels that stand in for $|0\rangle$ and $|1\rangle$. Other physical implementations exist — trapped ions (individual atoms held by electromagnetic fields, controlled with lasers), photonic qubits (single photons) — but superconducting is what Heron/Nighthawk-class IBM hardware uses.

**What's actually inside a transmon:** a **Josephson junction** — a thin insulating gap between two superconductors — acting as a *nonlinear* inductor in an otherwise ordinary LC oscillator circuit. The junction's nonlinearity is essential: a plain (linear) LC oscillator has evenly-spaced energy levels, so no pair of levels could ever be addressed individually — every drive pulse would excite all levels at once. The Josephson junction's **anharmonicity** unevenly spaces the levels, which is precisely what lets $|0\rangle$ and $|1\rangle$ be isolated and driven independently without leaking into higher levels. The macroscopic quantum variable being manipulated is the superconducting phase $\phi$ across the junction.

| Platform | Qubit encoding | Dominant noise source | Strengths |
|---|---|---|---|
| Superconducting (IBM) | Josephson-junction anharmonic oscillator | Decoherence (see [[Physical Decoherence Mechanisms]]) | Fast gates, scalable fabrication |
| Trapped ion | Hyperfine atomic states | Motional heating, laser noise | Long coherence, all-to-all connectivity |
| Neutral atom | Atomic states, optical tweezers | Atom loss, laser noise | Flexible qubit layout |
| Photonic | Photon states | Photon loss | Room-temperature operation, natural for networking |

## Why it needs to be so cold and isolated

Superconducting qubits only behave quantum-mechanically (hold superposition without immediately decaying) when isolated from thermal noise and stray electromagnetic fields. IBM's chips run inside a **dilution refrigerator** at around 15 millikelvin — colder than deep space. Any stray heat or noise leaking in causes the qubit to lose its quantum state (decoherence), which is the root cause behind $T_1$/$T_2$ limits and gate errors (see [[Backend Properties]]).

## The architecture, top to bottom

- **Room-temperature classical electronics** — generate and read microwave control pulses; a classical computer still orchestrates the whole experiment.
- **Cryostat, staged down to ~15 mK** — the QPU sits at the coldest stage; wiring runs down through intermediate temperature stages to minimize heat leaking in.
- **The QPU chip itself** — the physical qubits, laid out in a fixed grid dictated by chip fabrication.

The QPU is a specialized co-processor a classical computer calls out to, not a standalone replacement for one.

## Why connectivity is limited

Physical qubits sit at fixed positions on the chip, wired to interact directly with only their physical neighbors. This fixed wiring *is* the coupling map — a hardware fact, not a software choice. See [[Coupling Map and Topology]] and [[Heavy-Hex Topology]] for how that graph looks in practice and what it costs when your circuit needs qubits that aren't neighbors.

## A brief history

**1980–82:** Paul Benioff shows computation can be built from purely quantum-mechanical laws (a quantum Turing machine); Richard Feynman and Yuri Manin independently propose using quantum systems to simulate nature, since classical computers scale so badly at it (see [[Hamiltonian Simulation — Why It's Hard]]). **1985:** David Deutsch formalizes universal quantum computation and proves a quantum machine can simulate any other physical system — see [[Deutsch's Algorithm]] for the first concrete algorithm this produced. **1994:** Shor's algorithm demonstrates an exponential speedup for factoring, proving RSA breakable in principle — named (not derived) in [[The Quantum Algorithm Zoo]]. **1996:** [[Grover's Algorithm|Grover's algorithm]] gives a quadratic speedup for unstructured search, derived in full there.

## Related
- [[What is a Qubit]]
- [[Coupling Map and Topology]] — the physical connectivity constraint described here, in full detail
- [[Backend Properties]] — the measurable numbers (error rates, $T_1$/$T_2$) that this physical reality produces
- [[Superposition]]
- [[Deutsch's Algorithm]], [[The Quantum Algorithm Zoo]]
- [[Physical Decoherence Mechanisms]]

## Self-Check
- Could you explain to a friend why a quantum computer isn't "just a faster classical computer"?
- Why does a superconducting QPU need to be cooled to ~15 millikelvin?
- Why does [[Coupling Map and Topology|the coupling map]] exist at all — what physical fact forces it to?
- Who first proposed using quantum systems to simulate nature, and why?
- Why does a Josephson junction's *nonlinearity* matter for being able to address $|0\rangle$ and $|1\rangle$ individually?
