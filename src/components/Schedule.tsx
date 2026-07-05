import { wedding } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Schedule() {
  return (
    <section id="schedule" className="bg-paper">
      <div className="section-wrap">
        <SectionHeader
          eyebrow="The Weekend"
          title="Schedule"
          intro="Four days of celebration in the mountains. We hope you can join us for all of it."
        />

        <div className="mt-14 divide-y divide-line border-y border-line">
          {wedding.schedule.map((item, i) => (
            <Reveal key={item.day} delay={i * 80}>
              <article className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-10 lg:gap-16 lg:py-12">
                <div className="shrink-0 sm:w-36 lg:w-44">
                  <span className="font-sans text-xs uppercase tracking-widest2 text-mute">
                    {item.day}
                  </span>
                  <p className="mt-2 font-serif text-mute">{item.date}</p>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-3xl text-ink sm:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-serif text-ink">
                    <span className="text-mute">Venue · </span>
                    {item.venue}
                  </p>

                  <p className="mt-3 font-serif text-mute">
                    {item.note}
                    {item.noteItalic && (
                      <>
                        {" "}
                        <em className="text-ink/80">{item.noteItalic}</em>
                      </>
                    )}
                  </p>

                  <p className="mt-4 border-l-2 border-line pl-4 font-serif text-mute">
                    <span className="font-sans text-xs uppercase tracking-widest2 text-ink">
                      Dress code
                    </span>
                    <span className="mt-1 block">{item.dressCode}</span>
                  </p>

                  {item.coach && (
                    <div className="mt-5">
                      <p className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-ink">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 16V7a2 2 0 012-2h9a2 2 0 012 2v9M4 16h13M4 16v2a1 1 0 001 1h1m11-3h3v2a1 1 0 01-1 1h-1m-11 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0m14 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M7 9h8"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Coach from the Hilton
                      </p>
                      {item.coachDetail && (
                        <p className="mt-2 font-serif text-sm text-mute">
                          {item.coachDetail}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="shrink-0 sm:w-32 sm:text-right lg:w-36">
                  <span className="font-sans text-xs uppercase tracking-widest2 text-mute">
                    Time
                  </span>
                  <p className="mt-2 font-serif text-ink">{item.time}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center font-serif text-sm text-mute">
            {wedding.coachNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
