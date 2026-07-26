# AI in the Quantum+HPC Loop
#qc/hpc

A third participant alongside HPC and QPUs: AI models trained and run on the classical side, feeding back into how the quantum computation itself is run. Three concrete roles:

- **AI-assisted calibration and noise suppression** — drift prediction, pulse tuning, anomaly detection on the QPU's calibration state, replacing or augmenting manual recalibration schedules.
- **ML for error mitigation** — learned correction maps, denoising observables, and shot-allocation strategies, trained using either noiseless-simulator targets or [[Error Suppression and Mitigation — Overview|error-mitigated]] QPU output as ground truth.
- **Compiler optimization** — learned mapping, routing, and gate synthesis; reinforcement-learning agents searching circuit-architecture/gate-selection space directly, rather than using fixed transpiler heuristics (see [[Transpilation]]).

**Key insight:** the framing is "AI+HPC+QPU convergence" — HPC provides the scale to train and run these models, AI provides adaptive control and learned models that fixed heuristics can't easily replicate, and the QPU executes the quantum-native kernel none of the other two can substitute for. Each piece does the part the others structurally can't.

## Related
- [[Quantum-Centric Supercomputing (QCSC)]]
- [[Error Suppression and Mitigation — Overview]]
- [[Transpilation]]
- [[What is HPC]]

## Self-Check
- Could you name the three roles AI plays in this loop, and give one concrete example of each?
- Why does AI-based error mitigation need either simulator or already-mitigated QPU data as a training target?
- Why is "AI+HPC+QPU convergence" a three-way split rather than AI simply replacing one of the other two?
