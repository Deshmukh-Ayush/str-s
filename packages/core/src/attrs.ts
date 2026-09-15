/**
 * Hardcoded attribute mapping for SVG to React/JSX attributes.
 * Covers the ~40 attributes commonly found in SVG icons and simple graphics.
 */
export const SVG_ATTR_MAP: Record<string, string> = {
  class: "className",
  viewbox: "viewBox",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "fill-rule": "fillRule",
  "fill-opacity": "fillOpacity",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "xlink:href": "xlinkHref",
  "xlink:title": "xlinkTitle",
  "xlink:show": "xlinkShow",
  "xlink:actuate": "xlinkActuate",
  "xml:space": "xmlSpace",
  "xmlns:xlink": "xmlnsXlink",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "gradient-units": "gradientUnits",
  "gradient-transform": "gradientTransform",
  "spread-method": "spreadMethod",
  "pattern-units": "patternUnits",
  "pattern-content-units": "patternContentUnits",
  "pattern-transform": "patternTransform",
  "mask-units": "maskUnits",
  "mask-content-units": "maskContentUnits",
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "font-weight": "fontWeight",
  "font-style": "fontStyle",
  "letter-spacing": "letterSpacing",
  "text-anchor": "textAnchor",
  "dominant-baseline": "dominantBaseline",
  "alignment-baseline": "alignmentBaseline",
  "baseline-shift": "baselineShift",
  "color-interpolation": "colorInterpolation",
  "color-interpolation-filters": "colorInterpolationFilters",
  "color-rendering": "colorRendering",
  "shape-rendering": "shapeRendering",
  "text-rendering": "textRendering",
  "image-rendering": "imageRendering",
  preserveaspectratio: "preserveAspectRatio",
};

/**
 * Transforms an SVG attribute name to its JSX equivalent.
 */
export function toJsxAttributeName(attrName: string): string {
  const lower = attrName.toLowerCase();
  if (SVG_ATTR_MAP[lower]) {
    return SVG_ATTR_MAP[lower];
  }
  if (SVG_ATTR_MAP[attrName]) {
    return SVG_ATTR_MAP[attrName];
  }
  // Fallback for any other kebab-case SVG attributes (except data-* and aria-*)
  if (attrName.includes("-") && !attrName.startsWith("data-") && !attrName.startsWith("aria-")) {
    return attrName.replace(/-([a-z0-9])/gi, (_, c) => c.toUpperCase());
  }
  return attrName;
}
