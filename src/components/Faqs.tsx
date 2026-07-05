"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-mist">
      <div className="section-wrap">
        <SectionHeader eyebrow="Good to Know" title="FAQs" />

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-line border-y border-line">
          {wedding.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-xl text-ink">{f.q}</span>
                  <span
                    className={`flex-none text-2xl font-light text-mute transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-serif text-mute">{f.a}</p>
                    {"list" in f && f.list && (
                      <ul className="mt-4 space-y-3">
                        {f.list.map((tip) => (
                          <li key={tip} className="flex gap-3 font-serif text-mute">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink/60" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
