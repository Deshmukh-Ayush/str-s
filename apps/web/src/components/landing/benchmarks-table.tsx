import * as React from "react";
// Data sourced directly from verified packages/core/bench/run-bench.js output across real icon fixtures
import benchmarkData from "@/data/benchmarks.json";
import { StrLogo } from "@/components/str-logo";

export function BenchmarksTable() {
  return (
    <div className="w-full overflow-hidden rounded-[1.75rem] border border-fd-border/70 bg-str-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-fd-border/70 text-xs text-fd-muted-foreground">
              <th scope="col" className="px-6 py-4 font-medium">Tool</th>
              <th scope="col" className="px-6 py-4 font-medium">Throughput</th>
              <th scope="col" className="px-6 py-4 font-medium">Latency / icon</th>
              <th scope="col" className="px-6 py-4 font-medium">Deps</th>
              <th scope="col" className="px-6 py-4 font-medium">Bundle (gzip)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fd-border/50 font-mono text-[13px] tabular-nums">
            {benchmarkData.map((row) => (
              <tr
                key={row.name}
                className={row.isHighlight ? "bg-fd-background/60 text-fd-foreground" : "text-fd-muted-foreground"}
              >
                <th scope="row" className="whitespace-nowrap px-6 py-4 font-sans font-medium text-fd-foreground">
                  <span className="inline-flex items-center gap-2">
                    {row.isHighlight && <StrLogo size={16} className="size-4 rounded-xs" />}
                    <span>{row.name}</span>
                    {row.isHighlight && (
                      <span className="rounded-full bg-str-accent/12 px-2 py-0.5 text-[10px] font-medium text-str-accent">
                        fastest
                      </span>
                    )}
                  </span>
                </th>
                <td className="whitespace-nowrap px-6 py-4">{row.opsPerSec} ops/s</td>
                <td className="whitespace-nowrap px-6 py-4">{row.latencyPerIcon}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.dependencies}</td>
                <td className="whitespace-nowrap px-6 py-4">{row.bundleSizeGzip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
