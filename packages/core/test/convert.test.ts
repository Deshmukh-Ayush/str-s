import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { convert, isConvertibleSvg } from "../src/index.js";

const FIXTURES_DIR = path.resolve(__dirname, "fixtures");

describe("STR Core (str-s)", () => {
  describe("isConvertibleSvg", () => {
    it("returns true for valid SVGs", () => {
      expect(isConvertibleSvg('<svg width="24" height="24"><path d="M0 0"/></svg>')).toBe(true);
      expect(isConvertibleSvg('  <svg viewBox="0 0 10 10"/>  ')).toBe(true);
    });

    it("returns false for non-SVG strings", () => {
      expect(isConvertibleSvg("")).toBe(false);
      expect(isConvertibleSvg("   ")).toBe(false);
      expect(isConvertibleSvg("<div>Not an SVG</div>")).toBe(false);
      expect(isConvertibleSvg("just some text")).toBe(false);
      expect(isConvertibleSvg("<p>some paragraph</p>")).toBe(false);
    });
  });

  describe("Fixture Conversions", () => {
    const fixtureFiles = fs.readdirSync(FIXTURES_DIR);

    it("has at least 15 fixtures", () => {
      expect(fixtureFiles.length).toBeGreaterThanOrEqual(15);
    });

    for (const file of fixtureFiles) {
      const filePath = path.join(FIXTURES_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");

      if (file.startsWith("malformed-")) {
        it(`handles malformed fixture gracefully without throwing: ${file}`, () => {
          expect(() => {
            const res = convert(content);
            // Must return string and never throw uncaught
            expect(typeof res).toBe("string");
          }).not.toThrow();
        });
      } else {
        it(`successfully converts fixture: ${file}`, () => {
          expect(isConvertibleSvg(content)).toBe(true);
          const result = convert(content, { componentName: "TestIcon" });
          expect(result).toBeTruthy();
          expect(result).toContain('import * as React from "react";');
          expect(result).toContain("export const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (");
          expect(result).toContain("{...props}");
          expect(result).toContain("<svg");
          expect(result).toContain("</svg>");
          // Ensure no kebab-case attributes that should be camelCased
          expect(result).not.toContain("stroke-width=");
          expect(result).not.toContain("fill-rule=");
          expect(result).not.toContain("clip-rule=");
          expect(result).not.toContain("clip-path=");
        });
      }
    }
  });

  describe("Convert Options", () => {
    const sampleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14"/>
    </svg>`;

    it("respects componentName", () => {
      const result = convert(sampleSvg, { componentName: "CustomArrowIcon" });
      expect(result).toContain("export const CustomArrowIcon =");
    });

    it("respects componentStyle: 'function'", () => {
      const result = convert(sampleSvg, {
        componentName: "ArrowFunc",
        componentStyle: "function",
      });
      expect(result).toContain("export function ArrowFunc(props: React.SVGProps<SVGSVGElement>) {");
      expect(result).toContain("return (");
    });

    it("respects typescript: false", () => {
      const result = convert(sampleSvg, {
        componentName: "ArrowJs",
        typescript: false,
        componentStyle: "arrow",
      });
      expect(result).toContain("export const ArrowJs = (props) => (");
      expect(result).not.toContain("React.SVGProps");
    });

    it("respects tailwindMapping: 'strict'", () => {
      const strictSvg = `<svg width="24" height="13" viewBox="0 0 24 13"><path d="M0 0"/></svg>`;
      const result = convert(strictSvg, { tailwindMapping: "strict" });
      // width="24" is on standard scale (w-6), but height="13" is not -> height attribute preserved
      expect(result).toContain("w-6");
      expect(result).toContain('height="13"');
      expect(result).not.toContain("h-[13px]");
    });

    it("respects tailwindMapping: 'loose'", () => {
      const looseSvg = `<svg width="13" height="27px" viewBox="0 0 13 27"><path d="M0 0"/></svg>`;
      const result = convert(looseSvg, { tailwindMapping: "loose" });
      expect(result).toContain("w-[13px]");
      expect(result).toContain("h-[27px]");
    });

    it("respects tailwindMapping: 'off'", () => {
      const offSvg = `<svg width="24" height="24" style="color: red; stroke-width: 2px;" viewBox="0 0 24 24"><path d="M0 0"/></svg>`;
      const result = convert(offSvg, { tailwindMapping: "off" });
      expect(result).toContain('width="24"');
      expect(result).toContain('height="24"');
      expect(result).toContain('style={{ color: "red", strokeWidth: "2px" }}');
      expect(result).not.toContain("w-6");
    });
  });

  describe("Edge cases & Optimization", () => {
    it("strips comments, doctypes, and xml declarations", () => {
      const svgWithExtras = `<?xml version="1.0"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <!-- A comment -->
      <svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0"/></svg>`;
      const result = convert(svgWithExtras);
      expect(result).not.toContain("<?xml");
      expect(result).not.toContain("<!DOCTYPE");
      expect(result).not.toContain("A comment");
    });

    it("removes unused xmlns:xlink", () => {
      const unusedXlink = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
        <circle cx="12" cy="12" r="10"/>
      </svg>`;
      const result = convert(unusedXlink);
      expect(result).not.toContain("xmlnsXlink");
      expect(result).not.toContain("xmlns:xlink");
    });

    it("preserves used xlink:href", () => {
      const usedXlink = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
        <use xlink:href="#arrow"/>
      </svg>`;
      const result = convert(usedXlink);
      expect(result).toContain("xlinkHref=");
    });

    it("merges existing className with tailwind classes", () => {
      const svgWithClass = `<svg width="24" height="24" class="custom-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
      const result = convert(svgWithClass, { tailwindMapping: "loose" });
      expect(result).toContain('className="custom-icon w-6 h-6"');
    });
  });
});
