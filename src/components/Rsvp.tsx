"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import {
  isExactPartyMatch,
  searchParties,
  type Party,
} from "@/config/guests";
import { submitToFormSubmit } from "@/lib/static-site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type MemberState = { name: string; attending: boolean; meal: string };
type PlusOneState = { name: string; meal: string };

const MEALS = ["No preference", "Vegetarian", "Vegan", "Halal", "Gluten-free"];

function startPartyForm(party: Party) {
  return {
    party,
    members: party.members.map((m) => ({
      name: m,
      attending: true,
      meal: MEALS[0],
    })),
    plusOnes: [] as PlusOneState[],
  };
}

export default function Rsvp() {
  const [step, setStep] = useState<"lookup" | "form" | "done">("lookup");
  const [name, setName] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [matchResults, setMatchResults] = useState<Party[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [party, setParty] = useState<Party | null>(null);
  const [members, setMembers] = useState<MemberState[]>([]);
  const [plusOnes, setPlusOnes] = useState<PlusOneState[]>([]);
  const [note, setNote] = useState("");
  const [submitError, setSubmitError] = useState("");

  function openPartyForm(selected: Party) {
    const next = startPartyForm(selected);
    setParty(next.party);
    setMembers(next.members);
    setPlusOnes(next.plusOnes);
    setMatchResults(null);
    setLookupError("");
    setStep("form");
  }

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLookupError("");
    setMatchResults(null);
    try {
      const parties = searchParties(name);
      if (parties.length === 0) {
        setLookupError(
          "Hm... we can't find your name. Make sure you enter your name exactly as it appears on your invitation."
        );
        return;
      }
      if (parties.length === 1 && isExactPartyMatch(parties[0], name)) {
        openPartyForm(parties[0]);
        return;
      }
      setMatchResults(parties);
    } catch {
      setLookupError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function updateMember(i: number, patch: Partial<MemberState>) {
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  }

  function addPlusOne() {
    if (!party) return;
    if (plusOnes.length >= party.plusOnesAllowed) return;
    setPlusOnes((prev) => [...prev, { name: "", meal: MEALS[0] }]);
  }

  function updatePlusOne(i: number, patch: Partial<PlusOneState>) {
    setPlusOnes((prev) => prev.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));
  }

  function removePlusOne(i: number) {
    setPlusOnes((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!party) return;
    setLoading(true);
    setSubmitError("");
    try {
      const [email] = wedding.rsvpContact.emails;
      const memberSummary = members
        .map(
          (m) =>
            `${m.name}: ${m.attending ? `Attending (${m.meal})` : "Not attending"}`
        )
        .join("\n");
      const plusOneSummary = plusOnes
        .filter((g) => g.name.trim())
        .map((g) => `${g.name} (${g.meal})`)
        .join("\n");

      await submitToFormSubmit(email, {
        _subject: `RSVP — ${party.members.join(" & ")}`,
        partyId: party.id,
        members: memberSummary,
        plusOnes: plusOneSummary || "None",
        note: note || "None",
      });
      setStep("done");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="rsvp" className="bg-paper">
      <div className="section-wrap">
        <SectionHeader
          eyebrow="Will You Join Us?"
          title="RSVP"
          intro={`Kindly respond by ${wedding.rsvpDeadline}.`}
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-2xl">
            {step === "lookup" && (
              <>
                <form onSubmit={handleLookup} className="rounded-2xl bg-mist p-8 sm:p-10">
                  <p className="text-center font-serif text-ink">
                    Please enter the first and last name of one member of your party
                    below. If you&apos;re responding for you and a guest (or your
                    family), you&apos;ll be able to RSVP for your entire group on the
                    next step.
                  </p>
                  <div className="mx-auto mt-7 max-w-md">
                    <input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (lookupError) setLookupError("");
                        if (matchResults) setMatchResults(null);
                      }}
                      required
                      placeholder="First and Last name"
                      className="field text-center"
                    />
                    {lookupError && (
                      <p className="mt-3 text-center font-sans text-sm text-mute">
                        {lookupError}
                      </p>
                    )}
                    {!lookupError && (
                      <p className="mt-2 text-center font-sans text-xs text-mute">
                        {wedding.rsvpNameExample}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn mt-6 w-full"
                    >
                      {loading ? "Searching…" : "Continue"}
                    </button>
                    {!matchResults && <RsvpContactHelp />}
                  </div>
                </form>

                {matchResults && matchResults.length > 0 && (
                  <div className="mt-10">
                    <p className="text-center font-serif text-ink">
                      {wedding.rsvpSelectPrompt}
                    </p>
                    <ul className="mt-6 divide-y divide-ink">
                      {matchResults.map((result) => (
                        <li
                          key={result.id}
                          className="flex flex-wrap items-center justify-between gap-4 py-5"
                        >
                          <div className="space-y-1 font-serif text-lg text-ink">
                            {result.members.map((member) => (
                              <p key={member}>{member}</p>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => openPartyForm(result)}
                            className="btn shrink-0"
                          >
                            Select
                          </button>
                        </li>
                      ))}
                    </ul>
                    <RsvpSelectHelp />
                  </div>
                )}
              </>
            )}

            {step === "form" && party && (
              <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-mist p-8 sm:p-10">
                <p className="text-center font-serif text-mute">
                  Found you! Please confirm attendance for your party.
                </p>

                {members.map((m, i) => (
                  <div key={m.name} className="rounded-xl bg-paper p-5 ring-1 ring-line/60">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-display text-xl text-ink">{m.name}</span>
                      <div className="flex gap-2">
                        <Toggle
                          active={m.attending}
                          onClick={() => updateMember(i, { attending: true })}
                          label="Attending"
                        />
                        <Toggle
                          active={!m.attending}
                          onClick={() => updateMember(i, { attending: false })}
                          label="Can't make it"
                        />
                      </div>
                    </div>
                    {m.attending && (
                      <div className="mt-4">
                        <label className="label">Meal preference</label>
                        <select
                          value={m.meal}
                          onChange={(e) => updateMember(i, { meal: e.target.value })}
                          className="field"
                        >
                          {MEALS.map((meal) => (
                            <option key={meal}>{meal}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                {party.plusOnesAllowed > 0 && (
                  <div className="rounded-xl border border-dashed border-line bg-paper/60 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-xs uppercase tracking-widest text-ink">
                        Guests ({plusOnes.length}/{party.plusOnesAllowed})
                      </p>
                      {plusOnes.length < party.plusOnesAllowed && (
                        <button
                          type="button"
                          onClick={addPlusOne}
                          className="font-sans text-xs uppercase tracking-widest text-ink underline underline-offset-4"
                        >
                          + Add guest
                        </button>
                      )}
                    </div>
                    {plusOnes.length === 0 && (
                      <p className="mt-2 font-serif text-sm text-mute">
                        You may bring up to {party.plusOnesAllowed} additional
                        guest{party.plusOnesAllowed > 1 ? "s" : ""}.
                      </p>
                    )}
                    {plusOnes.map((g, i) => (
                      <div key={i} className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="label">Guest name</label>
                          <input
                            value={g.name}
                            onChange={(e) => updatePlusOne(i, { name: e.target.value })}
                            className="field"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="label">Meal preference</label>
                          <div className="flex gap-2">
                            <select
                              value={g.meal}
                              onChange={(e) => updatePlusOne(i, { meal: e.target.value })}
                              className="field"
                            >
                              {MEALS.map((meal) => (
                                <option key={meal}>{meal}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => removePlusOne(i)}
                              aria-label="Remove guest"
                              className="flex-none rounded-md border border-line px-3 text-mute hover:text-ink"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="label">A note for us (optional)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="field resize-none"
                    placeholder="Song requests, well wishes, anything else…"
                  />
                </div>

                {submitError && (
                  <p className="font-sans text-sm text-red-500">{submitError}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("lookup");
                      setLookupError("");
                      setMatchResults(null);
                    }}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn flex-1">
                    {loading ? "Sending…" : "Submit RSVP"}
                  </button>
                </div>
              </form>
            )}

            {step === "done" && (
              <div className="rounded-2xl bg-mist p-10 text-center">
                <h3 className="font-display text-3xl text-ink">Thank you!</h3>
                <p className="mx-auto mt-3 max-w-md font-serif text-mute">
                  Your RSVP has been received. We can&apos;t wait to celebrate with
                  you in Whistler. You can revisit this page anytime to update your
                  response before {wedding.rsvpDeadline}.
                </p>
                <button
                  onClick={() => {
                    setStep("lookup");
                    setName("");
                    setMatchResults(null);
                  }}
                  className="btn-outline mt-7"
                >
                  RSVP for another party
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RsvpContactHelp() {
  const { label, emails } = wedding.rsvpContact;
  return (
    <p className="mt-5 text-center font-sans text-sm text-mute">
      <a
        href={`mailto:${emails.join(",")}`}
        className="text-ink underline decoration-1 underline-offset-4 transition hover:text-mute"
      >
        {label}
      </a>
    </p>
  );
}

function RsvpSelectHelp() {
  const { emails } = wedding.rsvpContact;
  return (
    <div className="mt-10 space-y-3 text-center font-sans text-sm text-mute">
      <p>{wedding.rsvpSelectHelp}</p>
      <p>
        {wedding.rsvpSelectTrouble}{" "}
        <a
          href={`mailto:${emails.join(",")}`}
          className="text-ink underline decoration-1 underline-offset-4 transition hover:text-mute"
        >
          Contact us
        </a>
        .
      </p>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 font-sans text-xs uppercase tracking-widest transition ${
        active
          ? "bg-ink text-paper"
          : "border border-line text-mute hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
