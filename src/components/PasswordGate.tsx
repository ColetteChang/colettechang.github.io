"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

const STORAGE_KEY = "wedding-unlocked";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    setReady(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const expected =
      process.env.NEXT_PUBLIC_SITE_PASSWORD || wedding.sitePassword;
    if (password.trim() === expected) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
    setLoading(false);
  }

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${wedding.heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 w-full max-w-md text-center text-paper">
        <p className="font-sans text-xs uppercase tracking-widest2 text-paper/80">
          You're invited to
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
          {wedding.coupleShort}
        </h1>
        <div className="mx-auto my-5 h-px w-16 bg-paper/50" />
        <p className="font-serif text-paper/90">
          {wedding.location} · {wedding.dateText}
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label className="mb-2 block font-sans text-xs uppercase tracking-widest text-paper/80">
            Enter password to continue
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-md border border-paper/40 bg-white/10 px-4 py-3 text-center font-serif text-paper placeholder-paper/60 outline-none backdrop-blur transition focus:border-paper"
          />
          {error && (
            <p className="mt-3 font-sans text-sm text-red-200">
              Sorry, that password isn't right. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-md bg-paper px-8 py-3 font-sans text-sm font-medium tracking-wide text-ink transition hover:bg-paper/90 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
          <p className="mt-4 font-sans text-xs text-paper/70">
            The password is on your invitation.
          </p>
        </form>
      </div>
    </div>
  );
}
