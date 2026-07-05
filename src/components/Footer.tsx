import { wedding } from "@/config/wedding";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-16 text-center">
      <p className="font-display text-4xl text-ink">{wedding.coupleShort}</p>
      <div className="mx-auto my-5 h-px w-16 bg-ink/30" />
      <p className="font-serif text-mute">{wedding.dateText}</p>
      <p className="mt-1 font-sans text-xs uppercase tracking-widest2 text-mute">
        {wedding.location}
      </p>
      <p className="mt-8 font-sans text-xs tracking-wider text-mute/70">
        Can&apos;t wait to celebrate with you
      </p>
    </footer>
  );
}
