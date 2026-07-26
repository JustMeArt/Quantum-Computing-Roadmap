# Error Correction (EC)
#qc/qec #qc/noise

Unlike [[Error Suppression and Mitigation — Overview|mitigation, suppression, or detection]], error correction actively **fixes** errors *during* a computation, at the cost of extra qubits rather than extra shots or time. A **logical qubit** is encoded redundantly across many **physical qubits** using a **stabilizer code**; measuring the code's stabilizers reveals a **syndrome** — a pattern that identifies which error occurred — without collapsing the encoded logical information itself. A classical decoder reads the syndrome and applies the correction.

## Stabilizer codes and syndromes

A stabilizer code is defined by a set of mutually commuting Pauli operators (the **stabilizer generators**) whose simultaneous +1 eigenspace *is* the code space — the subspace where valid logical states live. Measuring each stabilizer gives ±1 without disturbing any logical state inside the code space, because logical states are eigenstates of every stabilizer by construction. If a physical error has occurred, one or more stabilizer measurements flip to −1; the specific pattern of flips (the syndrome) identifies the error (for errors within the code's correctable set) without ever revealing *what the logical state actually is* — measuring the syndrome only tells you about the error, not the data.

**Key insight:** this requires exactly the machinery [[Dynamic Circuits]] already introduces — **ancilla qubits**, **mid-circuit measurement** of those ancillas (not the data qubits), and **classical feedforward** to apply the correction — just organized around a specific redundant encoding rather than a single logical operation.

## Code families

- **Surface codes** — the most commonly discussed family; qubits arranged on a 2D grid, stabilizers act on small local neighborhoods. Straightforward to implement given real hardware's local connectivity, but qubit overhead per logical qubit is high.
- **LDPC codes** (low-density parity-check) — asymptotically more resource-efficient than surface codes, needing fewer physical qubits per logical qubit at scale, at the cost of requiring longer-range connectivity between qubits than a simple 2D grid provides.

## Why stabilizer codes alone aren't enough

Stabilizer codes give you fault-tolerant **Clifford** operations essentially for free — but [[Universal Gate Sets and the Clifford Group|the Clifford group is efficiently classically simulable]] (the Gottesman-Knill theorem), so a computation made only of protected Clifford gates would be pointless to run on a quantum computer at all. Fault-tolerant computation needs at least one non-Clifford gate (typically [[S and T Gates|T]]) implemented fault-tolerantly too. The standard technique is **magic state distillation**: prepare many noisy "magic states," distill them (using additional Clifford operations) into fewer, higher-fidelity magic states, then consume one via gate teleportation to apply a fault-tolerant T gate. This distillation step is a major source of the qubit and time overhead in fault-tolerant architectures.

## The road to fault tolerance

**Error correction (EC) is not the same claim as fault-tolerant quantum computing (FTQC).** EC alone — encoding + correcting during execution — only gets you protected Clifford operations. FTQC requires *both* that correction *and* a universal set of logical operations (i.e. including non-Clifford gates, via magic state distillation above) carried out while suppressing errors throughout. EC is the building block; FTQC is the full assembled capability.

IBM's public roadmap (stated as of 2026 — a target, not a guarantee) tracks this progression by device generation: Falcon (27 qubits, 2019) → Eagle (127 qubits) → Heron (133 qubits, ~5K gates) → Nighthawk (120 qubits, scaling to 7.5K/10K/15K gates via 3×/9× multi-chip coupling) → **Starling** (~100M gates, 200 qubits, fault-tolerant, targeted 2029) → **Blue Jay** (~1B gates, 2000 qubits, fault-tolerant, targeted 2033+). The jump from Nighthawk to Starling is exactly the jump from "noisy, mitigated" (this vault's whole Error Mitigation section) to "fault-tolerant" (this note) — see [[Quantum Utility vs Quantum Advantage]] for where things stand today, in between the two.

## Related
- [[Error Suppression and Mitigation — Overview]] — the four-category taxonomy this fills in
- [[Dynamic Circuits]] — the ancilla + mid-circuit-measurement + feedforward mechanism this reuses
- [[Executor Primitive]]
- [[Quantum Utility vs Quantum Advantage]] — where current hardware sits relative to this roadmap
- [[Quantum-Centric Supercomputing (QCSC)]] — the parallel integration-architecture roadmap tracking the same timeline
- [[Universal Gate Sets and the Clifford Group]], [[S and T Gates]]

## Self-Check
- Could you explain why measuring a syndrome doesn't collapse the encoded logical information, even though it's a measurement?
- Why isn't a stabilizer code alone enough for universal fault-tolerant computation — what's still missing?
- What's the practical tradeoff between a surface code and an LDPC code?
- Why is "error correction" not the same claim as "fault-tolerant quantum computing"?
