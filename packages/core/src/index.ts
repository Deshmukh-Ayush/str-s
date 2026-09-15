import { isConvertibleSvg, parseSvg } from "./parse.js";
import { emitComponent, type ConvertOptions } from "./emit.js";

export { isConvertibleSvg } from "./parse.js";
export { type ConvertOptions } from "./emit.js";
export { toJsxAttributeName, SVG_ATTR_MAP } from "./attrs.js";
export { processTailwindAttributes, type TailwindMode } from "./tailwind.js";

/**
 * Converts an SVG string into a React component with optional Tailwind CSS classes.
 *
 * @param svg The raw SVG string to convert.
 * @param options Configuration options for the generated React component.
 * @returns The generated React component code string, or an empty string if conversion failed.
 *
 * @example
 * ```ts
 * import { convert } from "str-s";
 *
 * const svg = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>';
 * const reactCode = convert(svg, {
 *   componentName: "ArrowIcon",
 *   tailwindMapping: "loose",
 *   typescript: true
 * });
 * ```
 */
export function convert(svg: string, options?: ConvertOptions): string {
  try {
    if (!isConvertibleSvg(svg)) {
      return "";
    }

    const tailwindMode = options?.tailwindMapping ?? "loose";
    const rootNode = parseSvg(svg, tailwindMode);
    if (!rootNode) {
      return "";
    }

    return emitComponent(rootNode, options);
  } catch {
    // Fail gracefully on unexpected malformed input
    return "";
  }
}
