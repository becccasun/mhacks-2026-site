"use client";

import { SplitReveal } from "@/components/SplitReveal";
import { FlowerStamps } from "@/components/FlowerStamps";
import { AgentTerminal } from "@/components/AgentTerminal";
import { CommandBlock } from "@/components/CopyBlock";
import { Button } from "@/components/Button";
import { SERVER_URL } from "@/app/how-to-mcp/content";
import { asset } from "@/lib/asset";

/**
 * "Agent" — teaser sheet for the MCP guide: MHacks has an MCP server, so
 * hackers can apply through Claude/Codex instead of the web form. Sits
 * between the Timeline and FAQ sheets; the CTA leads to /how-to-mcp.
 */
export function Agent() {
  return (
    <section
      id="agent"
      data-nav-theme="light"
      className="relative z-[8] -mt-14 md:-mt-20 flex min-h-screen flex-col justify-center overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-parchment px-6 py-24 md:px-[8vw] md:py-32"
    >
      <FlowerStamps tone="light" />

      <div className="grid items-center gap-14 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2
              className="font-display font-medium text-moss-700"
              style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              <SplitReveal as="span" className="block">
                Apply with your agent
              </SplitReveal>
            </h2>
            <p className="max-w-[460px] text-[16px] leading-[1.65] text-[#4d5942]">
              MHacks has an MCP server. Connect Claude, Codex, or any MCP-capable agent and apply
              without ever opening the form. Your agent reads the application schema, drafts your
              answers with you, and submits, all tied to your real MHacks login.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-moss-700/50">
              Server URL
            </p>
            <div className="max-w-[460px]">
              <CommandBlock>{SERVER_URL}</CommandBlock>
            </div>
          </div>

          <div>
            <Button href={asset("/how-to-mcp")} variant="cta" size="md">
              How to connect →
            </Button>
          </div>
        </div>

        <AgentTerminal className="w-full max-w-[560px] justify-self-center md:justify-self-end" />
      </div>
    </section>
  );
}
