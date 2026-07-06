"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
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
      className="relative z-[7] -mt-14 md:-mt-20 min-h-screen rounded-t-[40px] md:rounded-t-[48px] bg-parchment px-6 md:px-[8vw] py-24 md:py-32"
      style={{
        backgroundImage: "radial-gradient(rgba(58,74,38,0.16) 1px, transparent 1.4px)",
        backgroundSize: "26px 26px",
      }}
    >
      <FlowerStamps tone="light" />

      <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr] items-stretch">
        <div className="flex flex-col justify-between gap-10">
          <h2
            className="font-display font-medium text-moss-700"
            style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
          >
            <SplitReveal as="span" className="block">
              {"Frequently Asked Questions"}
            </SplitReveal>
          </h2>

          {/* Decorative vertical polaroids pinned between heading and contact.
              The back one peeks out to the left; hovering either brings it to
              the top of the pile. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            className="hidden justify-center py-12 md:flex"
          >
            <div className="relative">
              <motion.div
                data-cursor="hover"
                style={{ rotate: 6, boxShadow: "0 0 0 rgba(29,36,18,0)" }}
                whileHover={{
                  scale: 1.06,
                  rotate: 1,
                  boxShadow: "0 26px 60px rgba(29,36,18,0.28)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute -left-[115px] top-5 z-0 w-[180px] bg-white p-3 pb-4 hover:z-10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/about-05.jpg"
                  alt=""
                  draggable={false}
                  className="h-[225px] w-full object-cover"
                />
                <div className="mt-3 text-center font-serif-it text-[15px] text-moss-700">
                  demo day
                </div>
              </motion.div>

              <motion.div
                data-cursor="hover"
                style={{ rotate: -3, boxShadow: "0 0 0 rgba(29,36,18,0)" }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1.5,
                  boxShadow: "0 26px 60px rgba(29,36,18,0.28)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative z-[1] w-[200px] bg-white p-3 pb-4 hover:z-10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/about-02.jpg"
                  alt=""
                  draggable={false}
                  className="h-[250px] w-full object-cover"
                />
                <div className="mt-3 text-center font-serif-it text-[15px] text-moss-700">
                  see you in october
                </div>
              </motion.div>
            </div>
          </motion.div>

          <p className="max-w-[340px] text-[15px] leading-[1.6] text-[#4d5942]">
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
