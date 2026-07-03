"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { SplitReveal } from "@/components/SplitReveal";
import { FaqItem } from "@/components/FaqItem";
import { FlowerStamps } from "@/components/FlowerStamps";

const FAQS = [
  {
    q: "Who can apply?",
    a: "Any current undergraduate or graduate student is welcome. You don't need to be a CS major — designers, hardware tinkerers, and first-time hackers are encouraged to apply.",
  },
  {
    q: "Is there a cost to attend?",
    a: "No. MHacks is free for accepted hackers, including meals, swag, and mentorship. Travel reimbursement is available for select schools.",
  },
  {
    q: "Do I need a team?",
    a: "Nope. You can apply solo and form a team of up to four during opening ceremonies. We host team-matching on Friday evening.",
  },
  {
    q: "What should I build?",
    a: "Anything. Past projects have spanned AI agents, hardware wearables, climate tools, games, and creative installations. Sponsor tracks offer focused prize categories.",
  },
  {
    q: "When do applications close?",
    a: "Applications open in early summer and close September 15, 2026. Decisions roll out two weeks later.",
  },
  {
    q: "Where does the event happen?",
    a: "North Campus of the University of Michigan in Ann Arbor. Detailed venue and logistics ship with your acceptance email.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative z-[7] -mt-14 md:-mt-20 rounded-t-[40px] md:rounded-t-[48px] bg-parchment px-6 md:px-[8vw] py-24 md:py-32"
    >
      <FlowerStamps tone="light" />

      <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr] items-start">
        <div className="md:sticky md:top-24">
          <h2 className="font-serif-it text-moss-700" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, letterSpacing: "-0.015em" }}>
            <SplitReveal as="span" className="block">{"Frequently"}</SplitReveal>
            <SplitReveal as="span" className="block" delay={0.15}>{"Asked"}</SplitReveal>
            <SplitReveal as="span" className="block" delay={0.3}>{"Questions"}</SplitReveal>
          </h2>
          <p className="mt-6 max-w-[340px] text-[15px] leading-[1.6] text-[#4d5942]">
            Can&rsquo;t find what you&rsquo;re looking for? Email us at{" "}
            <a href="mailto:hello@mhacks.org" className="text-moss-700 underline underline-offset-4 hover:text-moss-800" data-cursor="hover">
              hello@mhacks.org
            </a>
            .
          </p>
        </div>

        <Accordion.Root type="multiple" className="flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} value={`item-${i}`} q={f.q} a={f.a} />
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
