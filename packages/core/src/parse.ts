import { toJsxAttributeName } from "./attrs.js";
import { processTailwindAttributes, type TailwindMode } from "./tailwind.js";

export interface SvgNode {
  tag: string;
  attrs: Record<string, string>;
  reactStyles?: Record<string, string>;
  children: (SvgNode | string)[];
  isSelfClosing: boolean;
}

// Void tags in SVG that should self-close if empty
const VOID_SVG_TAGS = new Set([
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "stop",
  "use",
  "image",
]);

/**
 * Fast pre-check to verify if an input string looks like a convertible SVG.
 * Returns quickly without doing a full parse.
 */
export function isConvertibleSvg(input: string): boolean {
  if (typeof input !== "string") return false;
  const trimmed = input.trim();
  if (!trimmed) return false;

  // Must contain an <svg tag and either closing </svg> or self-closing <svg.../>
  const hasSvgOpen = /<svg[\s>]/i.test(trimmed);
  const hasSvgClose = /<\/svg>|\/>/i.test(trimmed);
  return hasSvgOpen && hasSvgClose;
}

/**
 * Strips comments, XML declarations, and doctypes from SVG string.
 */
export function sanitizeSvgString(svg: string): string {
  return svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .trim();
}

/**
 * Parses SVG attributes from attribute string into key-value pairs.
 */
export function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  if (!attrString) return attrs;

  // Matches: attr="val", attr='val', or attr=val
  const attrRegex = /([a-zA-Z0-9_:.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(attrString)) !== null) {
    const key = match[1];
    if (!key) continue;
    // value could be in double quotes (match[2]), single quotes (match[3]), or unquoted (match[4])
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    attrs[key] = value;
  }

  return attrs;
}

/**
 * Lightweight single-pass SVG parser that constructs an SvgNode tree.
 * Gracefully handles malformed input without throwing uncaught exceptions.
 */
export function parseSvg(rawSvg: string, tailwindMode: TailwindMode = "loose"): SvgNode | null {
  try {
    if (!isConvertibleSvg(rawSvg)) {
      return null;
    }

    const cleanSvg = sanitizeSvgString(rawSvg);
    const tagRegex = /<(\/)?([a-zA-Z0-9_:-]+)([^>]*?)(\/?)>/g;

    let rootNode: SvgNode | null = null;
    const stack: SvgNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    let usesXLink = false;

    while ((match = tagRegex.exec(cleanSvg)) !== null) {
      const fullMatch = match[0];
      const isClosing = Boolean(match[1]);
      const tagName = match[2];
      const rawAttrs = match[3] || "";
      let isSelfClose = Boolean(match[4]);

      // Check text between last tag and current tag
      const textBetween = cleanSvg.slice(lastIndex, match.index).trim();
      if (textBetween && stack.length > 0) {
        stack[stack.length - 1].children.push(textBetween);
      }
      lastIndex = match.index + fullMatch.length;

      if (isClosing) {
        // Find matching tag in stack
        const lowerTagName = tagName.toLowerCase();
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].tag.toLowerCase() === lowerTagName) {
            // Unwind stack to this tag
            stack.length = i;
            break;
          }
        }
      } else {
        // Opening tag
        const rawAttrMap = parseAttributes(rawAttrs);

        // Check for xlink usage
        for (const k of Object.keys(rawAttrMap)) {
          if (k.toLowerCase().startsWith("xlink:") || k === "xlinkHref") {
            usesXLink = true;
          }
        }

        // Process Tailwind classes and attributes
        const { classes, consumedAttrs, reactStyles } = processTailwindAttributes(
          rawAttrMap,
          tailwindMode
        );

        // Build final JSX attributes
        const jsxAttrs: Record<string, string> = {};
        const existingClass = rawAttrMap["class"] || rawAttrMap["className"] || "";
        const combinedClasses = [
          ...existingClass.split(/\s+/).filter(Boolean),
          ...classes,
        ];
        // Deduplicate classes
        const uniqueClasses = Array.from(new Set(combinedClasses)).join(" ");
        if (uniqueClasses) {
          jsxAttrs["className"] = uniqueClasses;
        }

        for (const [attrKey, attrVal] of Object.entries(rawAttrMap)) {
          if (attrKey === "class" || attrKey === "className") continue;
          if (consumedAttrs.has(attrKey)) continue;

          const jsxKey = toJsxAttributeName(attrKey);
          jsxAttrs[jsxKey] = attrVal;
        }

        const isVoid = VOID_SVG_TAGS.has(tagName.toLowerCase());
        if (isVoid) {
          isSelfClose = true;
        }

        const node: SvgNode = {
          tag: tagName,
          attrs: jsxAttrs,
          reactStyles,
          children: [],
          isSelfClosing: isSelfClose,
        };

        if (!rootNode && tagName.toLowerCase() === "svg") {
          rootNode = node;
        }

        if (stack.length > 0) {
          stack[stack.length - 1].children.push(node);
        }

        if (!isSelfClose) {
          stack.push(node);
        }
      }
    }

    if (!rootNode) {
      return null;
    }

    // Strip redundant xmlns:xlink if xlink is not used
    if (!usesXLink) {
      delete rootNode.attrs["xmlnsXlink"];
      delete rootNode.attrs["xmlns:xlink"];
    }

    return rootNode;
  } catch {
    // Fail gracefully without throwing uncaught exceptions
    return null;
  }
}
