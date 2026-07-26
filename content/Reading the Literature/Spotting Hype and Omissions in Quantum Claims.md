# Spotting Hype and Omissions in Quantum Claims
#qc/research

A quantum paper can be technically correct and still leave out the context needed for strong evaluation — common omissions are cherry-picked qubit performance (best-case shown, not average), missing or incomplete error rates, vague noise-model/mitigation details, results shown only under ideal or simulated conditions, no comparison to existing state-of-the-art, and no discussion of scalability or practical limits. **Key insight:** train yourself to ask "what would a failure look like, and is that data shown?", "average across many runs, or the best single run?", "all qubits tested, or only the best subset?", "real hardware or only simulation?", and "are the error bars meaningful?" — hidden information tends to cluster in supplementary materials/appendices, footnotes and fine print in figure captions, and "limitations" or "future work" paragraphs.

Bold claims outside the paper itself (press releases, headlines, social posts) follow recurring, spottable patterns rather than requiring case-by-case suspicion: no baseline named ("X% better than classical" without saying which classical method, on which problem), engineering increment sold as breakthrough ("first N-qubit chip" without two-qubit gate fidelities or coherence numbers), speedup claims that quietly hide the classical I/O cost, an application tied to a specific year ("drug discovery solved by 2028"), a narrow toy-benchmark result blown up into a broad headline, a buzzword stack (quantum + AI + blockchain + agentic + ...), and a press conference that arrives before peer review (the paper is missing or still a preprint). The same red-flag checklist applies to any bold theoretical claim: solving major open problems without peer review, contradicting established limits without explanation, heavy jargon without clear definitions, no experimental validation for a theory, overly broad conclusions from narrow results, and "quantum breakthrough" language without rigorous benchmarks attached.

Before believing an extraordinary claim, ask: has it been independently replicated, is the claim actually narrower in the paper than in the headline, are the benchmarks fair, and do later responses/corrections change the picture? **Key insight:** the goal is calibrated interpretation, not cynicism — strong readers update their view when better evidence appears, and repeat the claim supported by the strongest source, not the loudest one.

## Related
- [[The First-Pass Framework for Reading a Quantum Paper]] — apply this skepticism check as the last step after you've already extracted the claim, evidence, authors, and figures

## Self-Check
- A headline says "quantum computer achieves 1000x speedup over classical methods." What single follow-up question would most quickly tell you whether this claim is trustworthy?
- Why can a paper be "technically correct" and still be misleading — what's actually happening when that occurs?
- What's the difference between healthy skepticism and cynicism when reading a bold quantum claim, and why does the workshop insist on the former?
