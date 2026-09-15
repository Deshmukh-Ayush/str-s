import { bench, describe } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { convert } from "../src/index.js";
import { transform as svgrTransform } from "@svgr/core";
// @ts-expect-error - CJS import without DTS
import svgToJsx from "svg-to-jsx";

const FIXTURES_DIR = path.resolve(__dirname, "../test/fixtures");
const fixtureFiles = ["feather-heart.svg", "feather-check.svg", "heroicon-outline-bell.svg", "lucide-arrow-right.svg"];
const fixtures = fixtureFiles.map((f) => fs.readFileSync(path.join(FIXTURES_DIR, f), "utf-8"));

describe("SVG to React Performance Benchmark", () => {
  bench("str-s (STR)", () => {
    for (const svg of fixtures) {
      convert(svg, { componentName: "Icon", tailwindMapping: "loose" });
    }
  });

  bench("@svgr/core", async () => {
    for (const svg of fixtures) {
      await svgrTransform(svg, { plugins: ["@svgr/plugin-jsx"] }, { componentName: "Icon" });
    }
  });

  bench("svg-to-jsx", async () => {
    for (const svg of fixtures) {
      await svgToJsx(svg);
    }
  });
});
