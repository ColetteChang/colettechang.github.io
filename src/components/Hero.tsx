"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Hero() {
  const target = new Date(wedding.countdownTarget).getTime();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getRemaining(target));
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-paper"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 px-6 py-28">
        {wedding.heroEyebrow && (
          <p className="animate-fadeUp font-sans text-xs uppercase tracking-widest2 text-paper/85">
            {wedding.heroEyebrow}
          </p>
        )}
        <h1
          className={`animate-fadeUp font-display text-6xl font-medium tracking-tight drop-shadow-sm sm:text-8xl ${
            wedding.heroEyebrow ? "mt-6" : ""
          }`}
        >
          {wedding.coupleShort}
        </h1>
        <div className="mx-auto my-7 h-px w-20 bg-paper/60" />
        <p className="animate-fadeUp font-serif text-xl tracking-wide sm:text-2xl">
          {wedding.dateText}
        </p>
        <p className="mt-1 animate-fadeUp font-sans text-sm uppercase tracking-widest2 text-paper/85">
          {wedding.location}
        </p>

        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10">
          {units.map((u) => (
            <div key={u.label} className="text-center">
              <div className="font-display text-4xl sm:text-5xl">
                {mounted ? String(u.value).padStart(2, "0") : "--"}
              </div>
              <div className="mt-1 font-sans text-[11px] uppercase tracking-widest text-paper/80">
                {u.label}
              </div>
            </div>
          ))}
        </div>

        <a href="#rsvp" className="mt-12 inline-block">
          <span className="rounded-md bg-paper px-9 py-3 font-sans text-sm font-medium tracking-wide text-ink transition hover:bg-paper/90">
            RSVP
          </span>
        </a>
      </div>

      <a
        href="#schedule"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-paper/80"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
