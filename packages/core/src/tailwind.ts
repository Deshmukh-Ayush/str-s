export type TailwindMode = "strict" | "loose" | "off";

// Exact standard Tailwind spacing scale (in pixels)
const EXACT_SPACING_SCALE: Record<string, string> = {
  "0": "0",
  "0px": "0",
  "1": "px",
  "1px": "px",
  "2": "0.5",
  "2px": "0.5",
  "4": "1",
  "4px": "1",
  "6": "1.5",
  "6px": "1.5",
  "8": "2",
  "8px": "2",
  "10": "2.5",
  "10px": "2.5",
  "12": "3",
  "12px": "3",
  "14": "3.5",
  "14px": "3.5",
  "16": "4",
  "16px": "4",
  "20": "5",
  "20px": "5",
  "24": "6",
  "24px": "6",
  "28": "7",
  "28px": "7",
  "32": "8",
  "32px": "8",
  "36": "9",
  "36px": "9",
  "40": "10",
  "40px": "10",
  "44": "11",
  "44px": "11",
  "48": "12",
  "48px": "12",
  "56": "14",
  "56px": "14",
  "64": "16",
  "64px": "16",
  "72": "18",
  "72px": "18",
  "80": "20",
  "80px": "20",
  "96": "24",
  "96px": "24",
  "100%": "full",
  auto: "auto",
};

const EXACT_STROKE_WIDTH: Record<string, string> = {
  "0": "stroke-0",
  "1": "stroke-1",
  "2": "stroke-2",
};

const EXACT_COLORS: Record<string, { fill: string; stroke: string }> = {
  currentcolor: { fill: "fill-current", stroke: "stroke-current" },
  none: { fill: "fill-none", stroke: "stroke-none" },
  black: { fill: "fill-black", stroke: "stroke-black" },
  white: { fill: "fill-white", stroke: "stroke-white" },
  inherit: { fill: "fill-inherit", stroke: "stroke-inherit" },
  transparent: { fill: "fill-transparent", stroke: "stroke-transparent" },
  "#000": { fill: "fill-black", stroke: "stroke-black" },
  "#000000": { fill: "fill-black", stroke: "stroke-black" },
  "#fff": { fill: "fill-white", stroke: "stroke-white" },
  "#ffffff": { fill: "fill-white", stroke: "stroke-white" },
};

export interface ProcessAttributesResult {
  classes: string[];
  consumedAttrs: Set<string>;
  reactStyles?: Record<string, string>;
}

/**
 * Maps SVG attributes and styles to Tailwind classes based on the chosen mode.
 */
export function processTailwindAttributes(
  attrs: Record<string, string>,
  mode: TailwindMode
): ProcessAttributesResult {
  const classes: string[] = [];
  const consumedAttrs = new Set<string>();

  if (mode === "off") {
    // In "off" mode, no Tailwind classes are generated.
    // If style attribute is present, parse it to React style object.
    let reactStyles: Record<string, string> | undefined;
    if (attrs.style) {
      reactStyles = parseInlineStyle(attrs.style);
      consumedAttrs.add("style");
    }
    return { classes, consumedAttrs, reactStyles };
  }

  // Handle Width
  if (attrs.width) {
    const rawVal = attrs.width.trim();
    const scaleVal = EXACT_SPACING_SCALE[rawVal.toLowerCase()];
    if (scaleVal) {
      classes.push(`w-${scaleVal}`);
      consumedAttrs.add("width");
    } else if (mode === "loose") {
      const normalized = rawVal.endsWith("px") || isNumeric(rawVal) ? `${rawVal.replace(/px$/, "")}px` : rawVal;
      classes.push(`w-[${normalized}]`);
      consumedAttrs.add("width");
    }
  }

  // Handle Height
  if (attrs.height) {
    const rawVal = attrs.height.trim();
    const scaleVal = EXACT_SPACING_SCALE[rawVal.toLowerCase()];
    if (scaleVal) {
      classes.push(`h-${scaleVal}`);
      consumedAttrs.add("height");
    } else if (mode === "loose") {
      const normalized = rawVal.endsWith("px") || isNumeric(rawVal) ? `${rawVal.replace(/px$/, "")}px` : rawVal;
      classes.push(`h-[${normalized}]`);
      consumedAttrs.add("height");
    }
  }

  // Handle Fill
  if (attrs.fill) {
    const rawVal = attrs.fill.trim().toLowerCase();
    if (EXACT_COLORS[rawVal]) {
      classes.push(EXACT_COLORS[rawVal].fill);
      consumedAttrs.add("fill");
    } else if (mode === "loose" && isHexOrColor(rawVal)) {
      classes.push(`fill-[${rawVal}]`);
      consumedAttrs.add("fill");
    }
  }

  // Handle Stroke
  if (attrs.stroke) {
    const rawVal = attrs.stroke.trim().toLowerCase();
    if (EXACT_COLORS[rawVal]) {
      classes.push(EXACT_COLORS[rawVal].stroke);
      consumedAttrs.add("stroke");
    } else if (mode === "loose" && isHexOrColor(rawVal)) {
      classes.push(`stroke-[${rawVal}]`);
      consumedAttrs.add("stroke");
    }
  }

  // Handle Stroke Width
  if (attrs["stroke-width"]) {
    const rawVal = attrs["stroke-width"].trim();
    if (EXACT_STROKE_WIDTH[rawVal]) {
      classes.push(EXACT_STROKE_WIDTH[rawVal]);
      consumedAttrs.add("stroke-width");
    } else if (mode === "loose") {
      classes.push(`stroke-[${rawVal}]`);
      consumedAttrs.add("stroke-width");
    }
  }

  // Handle inline style if present
  let reactStyles: Record<string, string> | undefined;
  if (attrs.style) {
    const parsed = parseInlineStyle(attrs.style);
    const remainingStyles: Record<string, string> = {};
    for (const [key, val] of Object.entries(parsed)) {
      const kLower = key.toLowerCase();
      if (kLower === "width" && !consumedAttrs.has("width")) {
        const scaleVal = EXACT_SPACING_SCALE[val.toLowerCase()];
        if (scaleVal) {
          classes.push(`w-${scaleVal}`);
        } else if (mode === "loose") {
          classes.push(`w-[${val}]`);
        } else {
          remainingStyles[key] = val;
        }
      } else if (kLower === "height" && !consumedAttrs.has("height")) {
        const scaleVal = EXACT_SPACING_SCALE[val.toLowerCase()];
        if (scaleVal) {
          classes.push(`h-${scaleVal}`);
        } else if (mode === "loose") {
          classes.push(`h-[${val}]`);
        } else {
          remainingStyles[key] = val;
        }
      } else if (kLower === "color" && mode === "loose") {
        classes.push(`text-[${val}]`);
      } else if (kLower === "display" && val === "none") {
        classes.push("hidden");
      } else {
        remainingStyles[key] = val;
      }
    }
    if (Object.keys(remainingStyles).length > 0) {
      reactStyles = remainingStyles;
    }
    consumedAttrs.add("style");
  }

  return { classes, consumedAttrs, reactStyles };
}

function isNumeric(str: string): boolean {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

function isHexOrColor(str: string): boolean {
  return /^#([0-9a-f]{3,8})$/i.test(str) || /^rgb/i.test(str) || /^hsl/i.test(str);
}

/**
 * Parses inline CSS style string like "fill: red; stroke-width: 2px" to a camelCase key-value map.
 */
export function parseInlineStyle(styleStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  const rules = styleStr.split(";");
  for (const rule of rules) {
    const trimmed = rule.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const rawKey = trimmed.slice(0, colonIdx).trim();
    const val = trimmed.slice(colonIdx + 1).trim();
    if (!rawKey || !val) continue;

    // Convert CSS property to camelCase (e.g., stroke-width -> strokeWidth)
    const camelKey = rawKey.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase());
    result[camelKey] = val;
  }
  return result;
}
