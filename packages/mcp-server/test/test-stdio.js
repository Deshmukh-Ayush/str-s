import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMcpServer() {
  console.log("Connecting to STR MCP Server over stdio...");

  const serverPath = path.resolve(__dirname, "../dist/index.js");

  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath],
  });

  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  });

  await client.connect(transport);
  console.log("Connected successfully to MCP server.");

  // List tools
  const tools = await client.listTools();
  console.log("Registered Tools:", tools.tools.map((t) => ({ name: t.name, description: t.description })));

  // Call convert_svg_to_react tool with the exact Tabler SVG
  const tablerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`;

  console.log("\nInvoking convert_svg_to_react...");
  const result = await client.callTool({
    name: "convert_svg_to_react",
    arguments: {
      svg: tablerSvg,
      options: {
        componentName: "UsersIcon",
        tailwindMapping: "loose",
        typescript: true,
        componentStyle: "arrow",
      },
    },
  });

  console.log("\nMCP Response isError:", result.isError);
  console.log("MCP Generated Component Output:\n");
  console.log(result.content[0]?.text);

  await client.close();
  console.log("\nMCP client session closed cleanly.");
}

testMcpServer().catch(console.error);
