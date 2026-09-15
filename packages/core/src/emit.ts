import type { SvgNode } from "./parse.js";

export interface ConvertOptions {
  /**
   * Component name for the exported React component.
   * @default "SvgComponent"
   */
  componentName?: string;
  /**
   * Whether to output TypeScript with React.SVGProps<SVGSVGElement>.
   * @default true
   */
  typescript?: boolean;
  /**
   * Tailwind class mapping mode.
   * - "strict": only emit exact scale matches (e.g. width="24" -> w-6)
   * - "loose": fall back to arbitrary values (e.g. w-[13px])
   * - "off": preserve raw attributes or style={{}}
   * @default "loose"
   */
  tailwindMapping?: "strict" | "loose" | "off";
  /**
   * Style of the component definition.
   * - "arrow": export const Name = (props) => (...)
   * - "function": export function Name(props) { return (...); }
   * @default "arrow"
   */
  componentStyle?: "arrow" | "function";
}

/**
 * Serializes an SvgNode tree to formatted JSX.
 */
export function emitJsxNode(node: SvgNode, indentLevel = 2, isRoot = false): string {
  const indent = " ".repeat(indentLevel);
  const childIndent = " ".repeat(indentLevel + 2);

  // Format attributes
  const attrParts: string[] = [];
  for (const [key, val] of Object.entries(node.attrs)) {
    // Boolean attributes or standard string attributes
    if (val === "" && key.startsWith("data-")) {
      attrParts.push(key);
    } else {
      const escapedVal = val.replace(/"/g, '&quot;');
      attrParts.push(`${key}="${escapedVal}"`);
    }
  }

  // Format inline React style={{ ... }} if present
  if (node.reactStyles && Object.keys(node.reactStyles).length > 0) {
    const styleEntries = Object.entries(node.reactStyles)
      .map(([k, v]) => `${k}: "${v.replace(/"/g, '\\"')}"`)
      .join(", ");
    attrParts.push(`style={{ ${styleEntries} }}`);
  }

  // Add {...props} to the root SVG tag
  if (isRoot) {
    attrParts.push("{...props}");
  }

  const attrsString = attrParts.length > 0 ? " " + attrParts.join(" ") : "";

  // Check if self-closing or void tag without children
  if (node.isSelfClosing || node.children.length === 0) {
    return `${indent}<${node.tag}${attrsString} />`;
  }

  // Handle <style> tag specifically to avoid unescaped CSS braces in JSX
  if (node.tag.toLowerCase() === "style") {
    const cssText = node.children
      .filter((c): c is string => typeof c === "string")
      .join("\n")
      .trim();
    return `${indent}<style${attrsString}>{\`${cssText.replace(/`/g, "\\`")}\`}</style>`;
  }

  // Render children
  const renderedChildren: string[] = [];
  for (const child of node.children) {
    if (typeof child === "string") {
      if (child.trim()) {
        renderedChildren.push(`${childIndent}${child.trim()}`);
      }
    } else {
      renderedChildren.push(emitJsxNode(child, indentLevel + 2, false));
    }
  }

  if (renderedChildren.length === 0) {
    return `${indent}<${node.tag}${attrsString} />`;
  }

  return `${indent}<${node.tag}${attrsString}>\n${renderedChildren.join("\n")}\n${indent}</${node.tag}>`;
}

/**
 * Emits the complete React component string from the parsed SvgNode root.
 */
export function emitComponent(rootNode: SvgNode, options?: ConvertOptions): string {
  const componentName = sanitizeComponentName(options?.componentName || "SvgComponent");
  const typescript = options?.typescript ?? true;
  const componentStyle = options?.componentStyle || "arrow";

  const propsType = typescript ? ": React.SVGProps<SVGSVGElement>" : "";
  const propsArg = `props${propsType}`;
  const jsxTree = emitJsxNode(rootNode, 2, true);

  if (componentStyle === "function") {
    return `import * as React from "react";

export function ${componentName}(${propsArg}) {
  return (
${jsxTree}
  );
}
`;
  }

  return `import * as React from "react";

export const ${componentName} = (${propsArg}) => (
${jsxTree}
);
`;
}

/**
 * Ensures component name is a valid PascalCase JavaScript identifier.
 */
function sanitizeComponentName(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9_$]/g, "");
  if (!cleaned) return "SvgComponent";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
