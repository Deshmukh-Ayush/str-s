import * as React from "react";
// Data sourced directly from verified packages/core/bench/run-bench.js output across real icon fixtures
import benchmarkData from "@/data/benchmarks.json";

export function BenchmarksTable() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-fd-border bg-fd-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/50 font-mono text-[11px] text-fd-muted-foreground">
              <th className="py-2.5 px-3 font-medium">Tool</th>
              <th className="py-2.5 px-3 font-medium">Throughput</th>
              <th className="py-2.5 px-3 font-medium">Latency / icon</th>
              <th className="py-2.5 px-3 font-medium">Deps</th>
              <th className="py-2.5 px-3 font-medium">Bundle (gzip)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fd-border/50 font-mono">
            {benchmarkData.map((row) => (
              <tr
                key={row.name}
                className={
                  row.isHighlight
                    ? "bg-fd-accent/40 font-semibold text-fd-foreground"
                    : "text-fd-muted-foreground hover:bg-fd-muted/20 transition-colors"
                }
              >
                <td className="py-2.5 px-3 whitespace-nowrap text-fd-foreground font-sans">
                  {row.name}
                  {row.isHighlight && (
                    <span className="ml-1.5 rounded bg-fd-primary/15 text-fd-primary px-1.5 py-0.2 text-[10px] font-mono">
                      fastest
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 whitespace-nowrap">{row.opsPerSec} ops/s</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{row.latencyPerIcon}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{row.dependencies}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{row.bundleSizeGzip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-fd-border/60 bg-fd-muted/30 px-3 py-2 text-[11px] text-fd-muted-foreground">
        Source: <code className="font-mono text-[10px]">packages/core/bench/run-bench.js</code> using tinybench on Node v24 across 5 standard icon fixtures.
      </div>
    </div>
  );
}
