# Recursive Fan-Out
#qc/depth #qc/ghz

Applying the "start from the middle" halving trick **recursively**: once a qubit becomes entangled, it can *immediately* help spread entanglement further, not just sit there.

**Mental model — spreading a rumor:** everyone who already knows the secret tells exactly one new person, all at once, every round. The number of "knowers" **doubles** each round instead of growing by one.

```python
for layer in range(k):          # k = number of doubling rounds
    step = 2 ** layer
    for i in range(step):
        qc.cx(i, i + step)      # every current "knower" tells a new qubit
```

Depth grows as **⌈log₂(N)⌉ + 1** instead of N — exponential improvement. For N=16: depth = log₂(16) + 1 = **5**.

**Common bug:** a control qubit used in a layer must have been entangled in a *strictly earlier* layer — never in the *same* layer it's currently receiving entanglement in. Violating this forces gates into a later layer (breaks the doubling), silently blowing up depth.

## Related
- [[Start From the Middle]]
- [[Circuit Depth]]
- [[GHZ States]]

## Self-Check
- Could you explain the "spreading a rumor" analogy to someone, and why it produces doubling instead of linear growth?
- Why does depth become $\lceil\log_2(N)\rceil+1$ instead of $N$?
- Why does using a control qubit entangled in the *same* layer break the doubling pattern?
