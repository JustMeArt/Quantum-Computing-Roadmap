# S and T Gates
#qc/gates #qc/math

Two more special cases of the [[Z Gate and Relative Phase|general phase gate]] $P_\theta$, smaller rotations than Z's full half-turn:

$$S = P_{\pi/2} = \begin{pmatrix}1&0\\0&i\end{pmatrix}, \qquad T = P_{\pi/4} = \begin{pmatrix}1&0\\0&e^{i\pi/4}\end{pmatrix}$$

**S** ("phase gate," a quarter-turn about the Z-axis) and **T** (sometimes called the "$\pi/8$ gate," an eighth-turn). $S^2 = Z$ and $T^2 = S$ — each is literally a finer subdivision of the last, all rotating about the same axis on the [[Bloch Sphere]].

## Why T specifically matters

**Key insight:** T is the standard "magic" gate that shows up throughout fault-tolerant quantum computing. See [[Universal Gate Sets and the Clifford Group]] for why — S and H are not enough on their own, but adding T is. This is also the exact T referenced (without being defined) in [[Error Correction (EC)]]'s magic state distillation section: *"prepare many noisy magic states... consume one via gate teleportation to apply a fault-tolerant T gate"* — this note is what that T actually is.

## Related
- [[Z Gate and Relative Phase]]
- [[Bloch Sphere]]
- [[Universal Gate Sets and the Clifford Group]]
- [[Error Correction (EC)]] — where T shows up again, in magic state distillation

## Self-Check
- Could you write the matrices for S and T and verify $S^2=Z$?
- Why are S and T both described as smaller rotations than Z, geometrically?
- Why does [[Error Correction (EC)]] care about T specifically, rather than S or Z?
