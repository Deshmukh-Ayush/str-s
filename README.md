# STR (str-s) — SVG to React + Tailwind, Everywhere

[![CI](https://github.com/str-tools/str-s/actions/workflows/ci.yml/badge.svg)](https://github.com/str-tools/str-s/actions)
[![npm version](https://img.shields.io/npm/v/str-s.svg)](https://www.npmjs.com/package/str-s)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-3.04%20kB%20gzip-brightgreen.svg)](https://bundlephobia.com/package/str-s)
[![Dependencies](https://img.shields.io/badge/dependencies-0%20(zero)-blue.svg)](https://www.npmjs.com/package/str-s)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Quick Start (Copy & Run):**

```ts
import { convert } from "str-s";

const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>`;

const reactCode = convert(svg, {
  componentName: "ArrowRightIcon",
  tailwindMapping: "loose", // "strict" | "loose" | "off"
  typescript: true,
  componentStyle: "arrow",  // "arrow" | "function"
});

console.log(reactCode);
```

**Output:**
```tsx
import * as React from "react";

export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-2" fill="none" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
```

---

## 🎯 Positioning

**STR** is the **smallest and fastest** SVG → React + Tailwind converter, purpose-built for icons and simple graphics. 

It is not trying to be the most feature-complete converter for every exotic SVG edge case (gradients-heavy illustrations, embedded raster data, complex masks) — for those, use **SVGR**. 

STR's pitch is:
- ⚡ **Near-instant conversion** (>7,000 ops/sec, sub-millisecond per icon)
- 🪶 **Near-zero bundle weight** (3.04 kB gzipped, **zero runtime dependencies**)
- 💻 **Works identically across all IDEs** (VS Code, Cursor, Windsurf, VSCodium)
- 🤖 **Directly invokable by AI coding agents** (MCP Server & [`llms.txt`](packages/core/llms.txt))

---

## 📊 Benchmark Results

Benchmarked across representative real-world icon fixture sets (Feather, Heroicons, Lucide, Figma exports) using `tinybench`.

| Tool | Ops / sec (Batch 5) | Latency (avg per icon) | Runtime Deps | Bundle Size (gzip) |
| :--- | :--- | :--- | :--- | :--- |
| **`str-s` (STR)** | **7,114** | **0.043 ms** (43 µs) | **0 (zero)** | **3.04 kB** |
| **`@svgr/core`** | 78 | 3.061 ms | 58+ (Babel + AST) | ~1,200 kB |
| **`svg-to-jsx`** | 842 | 0.326 ms | 3 | ~15 kB |
| **`svg-to-react-cli`** | CLI / JSDOM | Process spawn overhead | 4+ (jsdom) | >5,000 kB |

> **Verdict**: STR converts icons **~70x faster than SVGR** with **less than 0.3% of the bundle footprint** and zero Babel overhead.

---

## 📦 Monorepo Architecture

All ecosystem wrappers are thin layers that import the `str-s` core package directly:

```
str-s/
├── packages/
│   ├── core/                    # Core npm package: str-s (<=5kb gzip, 0 deps)
│   │   ├── src/
│   │   │   ├── parse.ts         # Lightweight single-pass SVG tokenizer
│   │   │   ├── attrs.ts         # Kebab -> camelCase attribute lookup map
│   │   │   ├── tailwind.ts      # Style/attr -> Tailwind class mapping
│   │   │   ├── emit.ts          # JSX component generator
│   │   │   └── index.ts         # Public API
│   │   ├── test/fixtures/       # 19 real-world SVG fixtures & edge cases
│   │   ├── bench/               # Tinybench benchmark suite
│   │   └── llms.txt             # Machine-readable usage doc for AI agents
│   ├── vscode-extension/        # VS Code & Cursor extension (Marketplace + OpenVSX)
│   ├── raycast-extension/       # Raycast commands (Clipboard + Selection)
│   └── mcp-server/              # Model Context Protocol server for Claude / Cursor
├── package.json                 # pnpm workspaces root
└── README.md
```

None of the wrappers re-implement conversion logic. All four surfaces automatically stay in sync.

---

## 🚀 Installation & Usage

### 1. Library (`str-s`)

```bash
pnpm add str-s
# or
npm install str-s
```

#### API

```ts
import { convert, isConvertibleSvg } from "str-s";

// Fast pre-check (<0.01ms) to bail early if string is not an SVG
if (isConvertibleSvg(input)) {
  const jsx = convert(input, {
    componentName: "MyIcon",
    tailwindMapping: "loose", // "strict" | "loose" | "off"
    typescript: true,         // true (TSX) | false (JSX)
    componentStyle: "arrow",  // "arrow" | "function"
  });
}
```

#### Tailwind Mapping Modes
- **`loose`** (default): Maps exact scales (e.g. `width="24"` → `w-6`), and falls back to arbitrary values (e.g. `width="13"` → `w-[13px]`, `fill="#3b82f6"` → `fill-[#3b82f6]`).
- **`strict`**: Only maps standard Tailwind scale values. Non-standard dimensions/colors are preserved as raw attributes.
- **`off`**: No Tailwind classes are generated. Preserves attributes and emits `style={{ ... }}` objects for inline styles.

---

### 2. VS Code & Cursor Extension (`packages/vscode-extension`)

Works in **VS Code**, **Cursor**, **Windsurf**, and **VSCodium**.

#### Features
- **Instant Paste Conversion**: Automatically intercepts SVG pastes in `.tsx`, `.jsx`, `.ts`, and `.js` files and replaces them with clean React components.
- **Single Undo Step**: Press `Cmd+Z` / `Ctrl+Z` to revert the entire paste in one step.
- **Commands**:
  - `STR: Convert Selection`: Converts selected SVG text in the editor.
  - `STR: Convert Clipboard`: Converts clipboard SVG into the current editor or back to clipboard.
- **Configurable Settings**: `str.tailwindMapping`, `str.componentStyle`, `str.typescript`, `str.autoConvertOnPaste`.

#### Publishing / Installation
Publishable to both **VS Code Marketplace** and **OpenVSX** (which Cursor, VSCodium, and Gitpod pull from):
```bash
# Package VSIX
pnpm --filter str-vscode package:vsce
pnpm --filter str-vscode package:ovsx

# Publish
pnpm --filter str-vscode publish:vsce
pnpm --filter str-vscode publish:ovsx
```

---

### 3. Raycast Extension (`packages/raycast-extension`)

Convert SVGs directly from macOS menu bar or hotkey into your clipboard.

#### Commands
1. **Convert SVG from Clipboard**: Reads SVG from clipboard, runs `convert()`, copies the React component back, and alerts via toast.
2. **Convert SVG from Selected Text**: Reads selected SVG from any active application window (or fallback clipboard) and replaces it with the React component.

#### Build & Run
```bash
cd packages/raycast-extension
pnpm build
```

---

### 4. MCP Server (`packages/mcp-server`)

Exposes STR directly to AI agents (Claude Code, Cursor, Windsurf) as a Model Context Protocol tool.

#### Tool Definition
- **Tool**: `convert_svg_to_react`
- **Parameters**: `svg` (string), `options` (optional object)

#### Configuration

##### For Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "str": {
      "command": "npx",
      "args": ["-y", "str-s-mcp"]
    }
  }
}
```

##### For Cursor (`~/.cursor/mcp.json` or Project MCP settings):
```json
{
  "mcpServers": {
    "str": {
      "command": "node",
      "args": ["<path-to-repo>/packages/mcp-server/dist/index.js"]
    }
  }
}
```

---

## 🤖 AI Agent Integration (`llms.txt`)

For AI assistants and agentic workflows, STR provides a dedicated, machine-readable documentation file at [`packages/core/llms.txt`](packages/core/llms.txt). It contains the complete function signatures, examples, and boundary conditions for automated code generation.

---

## 🛠️ Development & Contributing

```bash
# Clone the repository
git clone https://github.com/str-tools/str-s.git
cd str-s

# Install dependencies
pnpm install

# Run all tests
pnpm test

# Verify <=5kb gzip size budget
pnpm size

# Run benchmark suite
pnpm bench

# Build all packages
pnpm build
```

---

## 📄 License

MIT © STR Contributors
