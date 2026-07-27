# Black Hole Visual Identity — Design

## Context

The QC Study Roadmap site (justmeart.github.io/Quantum-Computing-Roadmap) is running Quartz's stock default theme — unmodified default color palette in `quartz.config.yaml` and an empty `quartz/styles/custom.scss`. After the site gained real outside traffic (Reddit #1 in r/QuantumComputing, QGSS Discord share), the owner wants a small, low-risk visual identity pass rather than a structural redesign — content, graph, Explorer, and TOC are staying as-is.

The identity is inspired by the owner's own black-and-white pixel art of a black hole (`~/Pictures/13.png`): a charcoal background, an off-white ringed silhouette with jets, and a pure-black event horizon — fully monochrome, no color in the source art.

Decisions below were reached interactively via mockups (visual-companion screens `visual-style.html`, `light-mode.html`, `hero-usage.html`, `ascii-preview.html`), each approved by the owner before moving to the next.

## Decisions

**1. Accent strategy — monochrome base + one ice-blue spark.** Charcoal/off-white/gray everywhere (body text, backgrounds, borders), with a single ice-blue accent reserved for links, the active/hover state, and highlighted elements — like the glow of the accretion disk against the monochrome art. Rejected: zero-color (felt too flat for a text-heavy study site — links need to be scannable) and color-coded tag pills (adds a second accent system, more than this pass needs).

**2. Light mode — mirrored, not left alone.** Both light and dark mode get the black-hole treatment: neutral grays (not today's warm off-white/blue-gray/sage), same ice-blue accent family, just inverted contrast. Rejected: leaving light mode untouched — would read as two unrelated identities depending on which mode a visitor lands in.

**3. Image usage — small corner mark, no hero banner.** The black hole art appears only as a small mark on the hub note (`QC Study Roadmap.md`) and as the site favicon. Rejected: a large hero banner (more visual weight than a study-notes site needs) and using the raw source image at full color depth for the favicon (doesn't read at 16–32px — needs a simplified, high-contrast crop, see Assets below).

**4. Asset form — ASCII art, generated from the actual source image.** Rather than a redrawn/traced icon, the corner mark is real ASCII art (5-tone threshold: space/`.`/`:`/`*`/`#`) sampled from `~/Pictures/13.png`'s pixel data, cropped to the shape's bounding box. This keeps the mark visually identical to the source pixel art and reuses work already validated for the GitHub profile README banner (github.com/JustMeArt, commit `4046e1d`) that this design pass grew out of.

## Palette

Semantics per `quartz/styles/base.scss`: `light`=page background, `lightgray`=borders/dividers, `gray`=faint/muted icons, `darkgray`=body text, `dark`=headings/strong text, `secondary`=links/accent, `tertiary`=hover-state accent. `highlight`/`textHighlight` (the `==mark==` highlighter color) are unrelated to this identity pass and are left unchanged.

| Variable | Dark mode | Light mode |
|---|---|---|
| light (bg) | `#1c1c1e` | `#f4f4f2` |
| lightgray (borders) | `#2e2e30` | `#e0e0de` |
| gray (muted) | `#6a6a6c` | `#9a9a9c` |
| darkgray (body text) | `#d8d8d8` | `#5a5a5c` |
| dark (headings) | `#f0f0ef` | `#1c1c1e` |
| secondary (links) | `#8fc8ff` | `#1a5fa8` |
| tertiary (hover) | `#5fa8e0` | `#0d4a8a` |
| highlight / textHighlight | *(unchanged)* | *(unchanged)* |

## Assets

- **Favicon** (`quartz/static/icon.png`, consumed by `@quartz-community/favicon`): regenerated from the source pixel art — cropped to the shape's bounding box, recolored to off-white-on-transparent, composited onto a `#1c1c1e` rounded-square badge (200×200), matching the previous icon's rounded-square silhouette convention. Verified legible down to 32×32.
- **Corner mark**: the same ASCII art used in the GitHub README, at the README's compact 54-column size, placed top-right of the hub note via a small inline HTML block + a `.blackhole-mark` class in `custom.scss` (color: `var(--secondary)`, sized/positioned to sit beside the hub note's intro paragraph without disrupting the existing Note Style template). This is a site-presentation-only change to `content/QC Study Roadmap.md` in this repo — it does not touch the source vault at `qc_obsidian_vault/`, which this repo's `content/` is a manually-synced publish copy of.

## Scope

**In scope:** `quartz.config.yaml` (`theme.colors.lightMode`/`darkMode`), `quartz/styles/custom.scss` (new `.blackhole-mark` rule), `quartz/static/icon.png` (replaced), `content/QC Study Roadmap.md` (one small addition, no removals).

**Out of scope:** note content/structure elsewhere in the vault, Explorer/graph/TOC layout, typography (fonts stay as configured), the og-image asset (separate plugin, not part of this pass).
