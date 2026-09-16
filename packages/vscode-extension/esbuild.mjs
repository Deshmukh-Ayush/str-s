import esbuild from "esbuild";

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["src/extension.ts"],
      bundle: true,
      outfile: "dist/extension.js",
      external: ["vscode"],
      format: "cjs",
      platform: "node",
      sourcemap: true,
      minify: true,
      logLevel: "info",
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();
