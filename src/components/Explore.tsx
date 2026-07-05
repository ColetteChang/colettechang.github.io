"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import { submitToFormSubmit } from "@/lib/static-site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Status = "idle" | "loading" | "success" | "error";

export default function Explore() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const [email] = wedding.rsvpContact.emails;
      await submitToFormSubmit(email, {
        _subject: "Extend your stay — wedding guest",
        name: String(data.name ?? ""),
        contact: String(data.contact ?? ""),
        dates: String(data.dates ?? ""),
        interests: String(data.interests ?? ""),
        message: String(data.note ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="explore" className="bg-paper">
      <div className="section-wrap">
        <SectionHeader
          eyebrow="Make a Trip of It"
          title="Explore Whistler"
          intro={wedding.exploreIntro}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wedding.activities.map((a, i) => (
            <Reveal key={a.name} delay={(i % 3) * 80}>
              <article className="h-full rounded-2xl bg-mist p-6 ring-1 ring-line/60">
                <h3 className="font-display text-xl text-ink">{a.name}</h3>
                <p className="mt-2 font-serif text-sm text-mute">{a.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-line bg-mist p-8 sm:p-10">
            <h3 className="text-center font-display text-3xl text-ink">
              Staying a little longer?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center font-serif text-mute">
              Some guests are extending their trip to explore Whistler together.
              Let us know your plans and we'll happily help connect you with
              others doing the same.
            </p>

            {status === "success" ? (
              <p className="mt-8 text-center font-serif text-ink">
                Thank you! We've got your details and will be in touch about
                connecting you with other guests. ✦
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Your name</label>
                    <input name="name" required className="field" placeholder="Full name" />
                  </div>
                  <div>
                    <label className="label">Email or phone</label>
                    <input name="contact" className="field" placeholder="How to reach you" />
                  </div>
                </div>
                <div>
                  <label className="label">Which dates are you around?</label>
                  <input
                    name="dates"
                    className="field"
                    placeholder="e.g. Sept 12–15"
                  />
                </div>
                <div>
                  <label className="label">What are you keen to do?</label>
                  <input
                    name="interests"
                    className="field"
                    placeholder="Hiking, spa, gondola, dining…"
                  />
                </div>
                <div>
                  <label className="label">Anything else? (optional)</label>
                  <textarea
                    name="note"
                    rows={3}
                    className="field resize-none"
                    placeholder="Tell us more about your plans"
                  />
                </div>
                {status === "error" && (
                  <p className="font-sans text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button type="submit" disabled={status === "loading"} className="btn w-full">
                  {status === "loading" ? "Sending…" : "Count me in"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
