import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer } from "../src/index.js";

describe("STR MCP Server", () => {
  it("registers and executes convert_svg_to_react tool", async () => {
    const server = createMcpServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    const client = new Client({ name: "test-client", version: "1.0.0" });

    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport),
    ]);

    const tools = await client.listTools();
    expect(tools.tools.some((t) => t.name === "convert_svg_to_react")).toBe(true);

    const response = await client.callTool({
      name: "convert_svg_to_react",
      arguments: {
        svg: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0"/></svg>',
        options: {
          componentName: "TestMcpIcon",
          tailwindMapping: "loose",
        },
      },
    });

    expect(response.isError).toBeFalsy();
    const textContent = (response.content as Array<{ type: string; text: string }>)[0]?.text;
    expect(textContent).toContain("export const TestMcpIcon =");
    expect(textContent).toContain("w-6 h-6");

    await client.close();
    await server.close();
  });

  it("handles malformed input gracefully via tool error response", async () => {
    const server = createMcpServer();
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    const client = new Client({ name: "test-client", version: "1.0.0" });

    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport),
    ]);

    const response = await client.callTool({
      name: "convert_svg_to_react",
      arguments: {
        svg: "not an svg at all",
      },
    });

    expect(response.isError).toBe(true);
    const textContent = (response.content as Array<{ type: string; text: string }>)[0]?.text;
    expect(textContent).toContain("not a convertible SVG");

    await client.close();
    await server.close();
  });
});
