"use client";

import { useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SplitReveal } from "@/components/SplitReveal";
import { FaqItem } from "@/components/FaqItem";
import { FlowerStamps } from "@/components/FlowerStamps";
import { SpeciesLabel } from "@/components/SpeciesLabel";

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
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [openItem, setOpenItem] = useState("");

  // Violets zoom into existence as the sheet scrolls into place — staggered
  // so they bloom one after another. Scroll-linked scale, transform-only.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const bloom1 = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);
  const bloom2 = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);
  const bloom3 = useTransform(scrollYProgress, [0.55, 1], [0, 1]);

  const violets = [
    { src: "/faq/flower-1.webp", width: 152, scale: bloom1, sway: 5, drift: -3.5 },
    { src: "/faq/flower-2.webp", width: 120, scale: bloom2, sway: 6.2, drift: 4 },
    { src: "/faq/flower-3.webp", width: 138, scale: bloom3, sway: 5.6, drift: -4.5 },
  ];

  return (
    <section
      ref={ref}
      id="faq"
      data-nav-theme="light"
      className="relative z-[9] -mt-14 md:-mt-20 min-h-screen rounded-t-[40px] md:rounded-t-[48px] bg-parchment px-6 md:px-[8vw] pt-24 pb-32 md:pt-32 md:pb-[260px]"
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
                  src="/faq/polaroid-1.jpg"
                  alt=""
                  draggable={false}
                  className="h-[225px] w-full object-cover"
                />
                <div className="mt-3 text-center font-serif-it text-[15px] text-moss-700">
                  apply today
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
                  src="/faq/polaroid-2.jpg"
                  alt=""
                  draggable={false}
                  className="h-[250px] w-full object-cover"
                />
                <div className="mt-3 text-center font-serif-it text-[15px] text-moss-700">
                  see you soon
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

        {/* Single-open: expanding one answer collapses the previous, so the
            sheet's height stays consistent and can't crash into the violets */}
        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="flex flex-col gap-2"
        >
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              value={`item-${i}`}
              q={f.q}
              a={f.a}
              open={openItem === `item-${i}`}
            />
          ))}
        </Accordion.Root>
      </div>

      {/* Violet trio anchored to the section's bottom edge, beneath the
          questions — when an answer expands and the sheet grows, they ride
          down with the bottom. Each blooms in on scroll, then idles with its
          own slow sway. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[150px] right-[8vw] hidden items-end gap-12 md:flex"
      >
        {/* Species tag planted at the base of the trio */}
        <SpeciesLabel
          name="Dwarf Lake Iris"
          rotate={-5}
          className="absolute -left-[200px] bottom-[28px] flex"
        />
        {violets.map((v) => (
          <motion.div
            key={v.src}
            style={{
              scale: reduced ? 1 : v.scale,
              transformOrigin: "50% 100%",
            }}
          >
            <motion.img
              src={v.src}
              alt=""
              draggable={false}
              width={v.width}
              animate={
                reduced
                  ? undefined
                  : { rotate: [v.drift, -v.drift, v.drift], y: [-5, 6, -5] }
              }
              transition={{
                duration: v.sway,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
