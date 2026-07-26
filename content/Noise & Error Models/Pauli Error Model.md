# Pauli Error Model
#qc/noise

A more structured alternative to [[Depolarizing Noise]]: instead of randomizing uniformly, apply one specific Pauli operator ($I$, $X$, $Y$, or $Z$) with some probability after each gate.

$$
\rho \mapsto p_I \rho + p_X X\rho X + p_Y Y\rho Y + p_Z Z\rho Z, \qquad p_I = 1 - p_X - p_Y - p_Z
$$

If $p_X = p_Y = p_Z = \lambda/4$ (uniform), this reduces exactly to the depolarizing model. The key extra power here is **directionality** — noise can be stronger along one axis than another, which is physically realistic (real hardware noise is rarely isotropic).

This directionality is exactly what [[Bit-flip and Phase-flip Sensitivity]] exploits: by choosing *which basis you measure in*, you can selectively reveal or hide different Pauli components of the error.

| Error | Bit-flip sensitive (Z-basis) | Phase-flip sensitive (X-basis) |
|---|---|---|
| $I$ | No | No |
| $X$ | **Yes** | No |
| $Y$ | **Yes** | **Yes** |
| $Z$ | No | **Yes** |

Quick mnemonic: bit-flip sensitivity ↔ "does this error contain an $X$?"; phase-flip sensitivity ↔ "does this error contain a $Z$?" — reading straight off the identity $Y = iXZ$ explains why $Y$ trips both.

## Related
- [[Bit-flip and Phase-flip Sensitivity]]
- [[Depolarizing Noise]]
- [[Density Matrix]]
- [[Thermal Relaxation]] — sibling toy noise model, but time-dependent rather than per-gate
- [[Pauli Operators]]
- [[Coherent vs Incoherent Gate Errors]] — this model describes incoherent (stochastic Pauli) error specifically
- [[Physical Decoherence Mechanisms]]

## Self-Check
- What extra realism does the Pauli error model add over depolarizing noise?
- Using the $Y=iXZ$ mnemonic, could you explain why a $Y$ error trips both bit-flip and phase-flip sensitivity?
- Under what condition does the Pauli error model reduce exactly to the depolarizing model?
