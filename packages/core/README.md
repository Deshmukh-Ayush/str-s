# str-s (STR: SVG to React + Tailwind)

> The smallest and fastest SVG → React + Tailwind converter, purpose-built for icons and simple vector graphics.

- **Zero dependencies**
- **≤3.04 kB gzipped**
- **~70x faster than SVGR**

See full documentation and monorepo at [GitHub](https://github.com/str-tools/str-s).

## Quick Start

```ts
import { convert, isConvertibleSvg } from "str-s";

const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>`;

const code = convert(svg, {
  componentName: "ArrowRight",
  tailwindMapping: "loose",
  typescript: true,
  componentStyle: "arrow",
});
```

Output:
```tsx
import * as React from "react";

export const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-2" fill="none" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
```

## AI Documentation
Machine-readable prompt guide for AI agents is available at [`llms.txt`](./llms.txt).

## License
MIT
