import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { convert, isConvertibleSvg } from "str-s";

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "str-s-mcp",
    version: "0.1.0",
  });

  server.tool(
    "convert_svg_to_react",
    "Converts an SVG string into a React component with Tailwind CSS classes.",
    {
      svg: z.string().describe("The SVG string to convert"),
      options: z
        .object({
          componentName: z.string().optional().describe("React component name (default: SvgComponent)"),
          typescript: z.boolean().optional().describe("Whether to include TypeScript types (default: true)"),
          tailwindMapping: z
            .enum(["strict", "loose", "off"])
            .optional()
            .describe("Tailwind mapping mode: 'strict', 'loose', or 'off' (default: loose)"),
          componentStyle: z
            .enum(["arrow", "function"])
            .optional()
            .describe("Component style: 'arrow' or 'function' (default: arrow)"),
        })
        .optional()
        .describe("Conversion options"),
    },
    async ({ svg, options }) => {
      if (!isConvertibleSvg(svg)) {
        return {
          content: [
            {
              type: "text",
              text: "Error: The provided string is not a convertible SVG.",
            },
          ],
          isError: true,
        };
      }

      const code = convert(svg, options);
      if (!code) {
        return {
          content: [
            {
              type: "text",
              text: "Error: Failed to parse or convert SVG.",
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: code,
          },
        ],
      };
    }
  );

  return server;
}

export async function main() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("STR MCP Server running on stdio");
}

// Automatically start when executed directly
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith("index.js") ||
  process.argv[1].endsWith("index.ts") ||
  process.argv[1].endsWith("str-s-mcp")
);

if (isDirectRun) {
  main().catch((err) => {
    console.error("Fatal error in MCP Server:", err);
    process.exit(1);
  });
}
