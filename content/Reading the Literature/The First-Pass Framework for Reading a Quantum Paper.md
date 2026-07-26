# The First-Pass Framework for Reading a Quantum Paper
#qc/research

Quantum papers feel dense because of unfamiliar structure, compressed jargon, figures that carry more meaning than the surrounding text, and caveats hidden outside the headline claim — but reading them well is a learnable method, not a cover-to-cover slog. **Key insight:** read out of order. Hit Abstract → Conclusion → Figures → Introduction → Methods/Supplement, asking three questions immediately: what is the claim, what evidence supports it, and what would weaken it. The goal of a first pass is to triage the paper before investing in technical detail — not every section deserves equal attention (Methods matters for reproducibility but can be skimmed first-pass; Supplementary info is low-priority to skim but often hides the important caveats).

Once you've triaged the claim, check who's making it: first author did the bulk of the work, last author is the PI/lab lead, and venue carries real weight — peer-reviewed journal (PRL, Nature Physics, PRX Quantum) > conference proceeding > arXiv preprint > blog post/press release (marketing, not science). Credibility comes from context plus evidence, not branding alone.

Figures get their own workflow, read in this order: caption (what you're supposed to see) → axes/units/legend (the coordinate system) → raw visual trend (what the data actually shows) → error bars/confidence regions (how certain is this) → fit lines/model curves (separate data from interpretation) → compare to the text's claim (does the figure actually match what's asserted). Red flags in figures: missing/unlabeled axes, no error bars where uncertainty should exist, truncated/manipulated axis scales that exaggerate effects, a figure that tells a weaker story than the text claims, or figures referenced in text but never clearly explained.

| Figure type | What to look for |
|---|---|
| Gate fidelity charts | Average vs. best-case values, which gates were tested |
| Coherence time graphs (T1/T2) | Time scales, comparison across qubits, decay curves |
| Bloch sphere representations | State trajectories, decoherence paths, ideal vs. measured states |
| Quantum circuit diagrams | Circuit depth, gate types, measurement points |
| Energy level diagrams | Level spacing, avoided crossings, drive frequencies |
| Randomized benchmarking | Decay rate, confidence intervals, comparison conditions |

Even a paper's headline figure only answers a subset of the important questions — a caption like "Fig. 6: two specialized sparse iterative solvers and DMRG on the same 49-qubit Hamiltonian" can reveal that a companion figure narrows the scope of what the headline figure actually claims. Recovering that precise scope, rather than the one-sentence summary version, is the whole point of reading figures carefully instead of skimming past them.

## Related
- [[Spotting Hype and Omissions in Quantum Claims]] — the companion skill: what to do once you suspect the claim outruns the evidence

## Self-Check
- Someone hands you a new quantum paper and says "just read the abstract and intro first." Why is that the wrong order, and what should you read first instead?
- You're comparing two papers on the same technique — one is a Nature Physics article, the other a company blog post making a bigger claim. Which do you trust more, and why isn't that just snobbery?
- A figure's caption says it compares method A and B, but the plot only shows a single curve trending downward with no error bars. What two things are missing before you'd trust this as evidence?
