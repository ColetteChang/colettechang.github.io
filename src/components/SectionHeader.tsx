import Reveal from "./Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      <div className="hairline" />
      {intro && (
        <p className="mx-auto max-w-2xl text-mute">{intro}</p>
      )}
    </Reveal>
  );
}
