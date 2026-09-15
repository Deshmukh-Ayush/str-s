# Roadmap: STR (str-s)

Tracked future enhancements and planned architectural features for upcoming releases.

---

## 🚀 v2.0 — Motion-Ready Output Mode

### Overview
Add an optional motion mode (`animationReady: boolean` or `mode: "static" | "motion"`) tailored for Framer Motion / Motion (`motion/react`) animations.

### Proposed Capabilities
1. **Motion Element Swap**:
   - Automatically transform standard SVG elements into their `motion.*` equivalents (e.g. `<svg>` → `<motion.svg>`, `<path>` → `<motion.path>`, `<circle>` → `<motion.circle>`).
   - Add the standard import: `import { motion } from "motion/react";`.

2. **Index Annotation for Targetability**:
   - Add `data-path-index` (or `data-motion-index`) attributes to each individual path, group, or shape in the vector hierarchy.
   - Allows developers to quickly target, style, and animate specific strokes and fills without manually inspecting complex SVG path definitions.

3. **Scaffolded Variants Object**:
   - Automatically emit a clean, customizable scaffold `variants` object (e.g. container stagger with child path-drawing transitions: `pathLength: 0` to `pathLength: 1`).
   - Provides an immediate starting point for interactive hover, draw-in, or tap animations rather than an unopinionated static graphic.

### Scope & Constraints
- Must maintain the zero-dependency, ≤5kb footprint for the static mode bundle.
- Motion utilities will be tree-shakeable or conditionally included.
