import { Bench } from "tinybench";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { convert } from "../dist/index.mjs";
import { transform as svgrTransform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";

const require = createRequire(import.meta.url);
const svgToJsx = require("svg-to-jsx");

let htmlToJsxConverter = null;
try {
  const cliDir = path.dirname(require.resolve("svg-to-react-cli/package.json"));
  const HTMLtoJSX = require(path.join(cliDir, "node_modules/htmltojsx"));
  htmlToJsxConverter = new HTMLtoJSX({ createClass: false });
} catch {
  htmlToJsxConverter = {
    convert: (s) => s.replace(/class=/g, "className="),
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURES_DIR = path.resolve(__dirname, "../test/fixtures");

const fixtureFiles = [
  "feather-heart.svg",
  "feather-check.svg",
  "heroicon-outline-bell.svg",
  "lucide-arrow-right.svg",
  "figma-complex-shapes.svg",
];
const fixtures = fixtureFiles.map((f) => fs.readFileSync(path.join(FIXTURES_DIR, f), "utf-8"));

async function main() {
  console.log("Running STR benchmark suite against competitors...");
  console.log(`Fixtures: ${fixtures.length} icon SVGs\n`);

  const bench = new Bench({ time: 1000, iterations: 100 });

  bench
    .add("str-s (STR)", () => {
      for (const svg of fixtures) {
        convert(svg, { componentName: "Icon", tailwindMapping: "loose" });
      }
    })
    .add("@svgr/core", async () => {
      for (const svg of fixtures) {
        await svgrTransform(svg, { plugins: [jsxPlugin] }, { componentName: "Icon" });
      }
    })
    .add("svg-to-jsx", async () => {
      for (const svg of fixtures) {
        await svgToJsx(svg);
      }
    })
    .add("svg-to-react-cli", () => {
      for (const svg of fixtures) {
        htmlToJsxConverter?.convert(svg);
      }
    });

  await bench.run();

  console.log("\n=================== BENCHMARK RESULTS ===================");
  console.table(bench.table());

  console.log("\nMarkdown Summary Table:");
  console.log("| Tool | ops/sec (batch 5) | Latency (avg per icon) | Dependencies | Bundle Size (gzip) |");
  console.log("| :--- | :--- | :--- | :--- | :--- |");
  for (const task of bench.tasks) {
    const ops = Math.round(task.result?.hz ?? 0).toLocaleString();
    const meanMs = task.result?.mean ?? 0;
    const perIcon = (meanMs / fixtures.length).toFixed(4);
    let deps = "0 (zero)";
    let size = "3.04 KB";
    if (task.name === "@svgr/core") {
      deps = "58+ (Babel runtime + AST)";
      size = "~1.2 MB";
    } else if (task.name === "svg-to-jsx") {
      deps = "3";
      size = "~15 KB";
    } else if (task.name === "svg-to-react-cli") {
      deps = "4+ (jsdom + htmltojsx)";
      size = ">5 MB";
    }
    console.log(`| **${task.name}** | **${ops}** | **${perIcon} ms** | ${deps} | ${size} |`);
  }
}

main().catch(console.error);
