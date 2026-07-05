import { wedding } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Registry() {
  const hasLinks = wedding.registries.some((r) => r.url);

  return (
    <section id="registry" className="bg-mist">
      <div className="section-wrap">
        <SectionHeader
          eyebrow="With Gratitude"
          title="Registry"
          intro={wedding.registryIntro}
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-xl text-center">
            {hasLinks ? (
              <div className="flex flex-wrap justify-center gap-4">
                {wedding.registries.map((r) =>
                  r.url ? (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      {r.name}
                    </a>
                  ) : null
                )}
              </div>
            ) : (
              <p className="font-serif text-mute">
                {wedding.registries[0]?.name}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
