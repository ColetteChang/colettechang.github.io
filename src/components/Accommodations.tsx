"use client";

import { useMemo, useState } from "react";
import { wedding } from "@/config/wedding";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Hotel = (typeof wedding.hotels)[number];

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={i < Math.round(rating) ? "text-ink" : "text-line"}
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Accommodations() {
  const hostHotel =
    wedding.hotels.find((h) => h.isHostHotel) ?? wedding.hotels[0];

  const mapEmbedUrl = useMemo(() => {
    const hilton = wedding.hotels.find((h) => h.isHostHotel) ?? wedding.hotels[0];
    return `https://maps.google.com/maps?ll=${hilton.lat},${hilton.lng}&z=15&output=embed`;
  }, []);

  const exploreMapUrl =
    "https://www.google.com/maps/search/Hilton+Whistler+Resort+%26+Spa";

  return (
    <section id="travel" className="bg-mist">
      <div className="section-wrap">
        <SectionHeader
          eyebrow="Getting There & Staying"
          title="Hotel & Travel"
        />

        <Reveal>
          <div className="rounded-2xl border border-line bg-paper p-8 sm:p-10">
            <h3 className="text-center font-display text-2xl text-ink">
              {wedding.gettingToWhistler.title}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center font-serif text-mute">
              {wedding.gettingToWhistler.intro}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {wedding.gettingToWhistler.operators.map((op) => (
                <article
                  key={op.name}
                  className="flex h-full flex-col rounded-xl bg-mist p-5 ring-1 ring-line/60"
                >
                  <h4 className="font-display text-xl text-ink">{op.name}</h4>
                  <p className="mt-2 font-sans text-xs uppercase tracking-widest text-mute">
                    {op.route}
                  </p>
                  <p className="mt-3 font-serif text-sm font-medium text-ink">
                    {op.fare}
                  </p>
                  <p className="mt-2 flex-1 font-serif text-sm text-mute">
                    {op.highlights}
                  </p>
                  <a
                    href={op.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-sans text-xs uppercase tracking-widest text-ink underline decoration-1 underline-offset-4 hover:text-mute"
                  >
                    Book &amp; schedules →
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <p className="font-sans text-xs uppercase tracking-widest2 text-mute">
                Main pickup &amp; drop-off points
              </p>
              <ul className="mt-4 space-y-2">
                {wedding.gettingToWhistler.pickups.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-serif text-sm text-ink"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ink/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-center font-serif text-xs text-mute">
              {wedding.gettingToWhistler.fareNote}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 text-center">
            <h3 className="section-title">Where to Stay</h3>
            <div className="hairline" />
            <div className="mx-auto mt-6 max-w-2xl space-y-5 font-serif text-mute">
              <p>{wedding.whereToStay.intro}</p>
              <div className="grid gap-4 sm:grid-cols-2 sm:text-left">
                <p>
                  <span className="font-sans text-xs uppercase tracking-widest2 text-mute">
                    Room Block
                  </span>
                  <span className="mt-1 block text-lg text-ink">
                    {wedding.whereToStay.roomBlock}
                  </span>
                </p>
                <p>
                  <span className="font-sans text-xs uppercase tracking-widest2 text-mute">
                    Group Code
                  </span>
                  <span className="mt-1 block text-lg text-ink">
                    {wedding.whereToStay.groupCode}
                  </span>
                </p>
              </div>
              <p className="text-sm italic">{wedding.whereToStay.note}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative mt-12 overflow-hidden rounded-3xl bg-paper ring-1 ring-line/60">
            <div className="relative aspect-[5/4] sm:aspect-[16/10]">
              <iframe
                title="Whistler accommodations map"
                src={mapEmbedUrl}
                className="pointer-events-none absolute inset-0 h-full w-full grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-paper/10 via-transparent to-paper/20" />

              {hostHotel && (
                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex max-w-[200px] items-center gap-2 rounded-xl bg-paper px-2 py-1.5 shadow-lg ring-1 ring-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={hostHotel.images[0]}
                        alt=""
                        className="h-10 w-10 flex-none rounded-lg object-cover"
                      />
                      <span className="line-clamp-2 text-left font-sans text-[11px] font-medium leading-tight text-ink">
                        {hostHotel.name}
                      </span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-md ring-2 ring-ink">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              <a
                href={exploreMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-sans text-sm font-medium text-ink shadow-lg ring-1 ring-line transition hover:bg-mist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-7-5.3-7-11a7 7 0 1114 0c0 5.7-7 11-7 11z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Explore on Map
              </a>
            </div>
          </div>
        </Reveal>

        {hostHotel && (
          <Reveal>
            <HotelCard hotel={hostHotel} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultiple = hotel.images.length > 1;

  return (
    <article className="mt-8 overflow-hidden rounded-3xl bg-paper ring-1 ring-line/60">
      <div className="relative aspect-[16/10] bg-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hotel.images[imageIndex]}
          alt={hotel.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink shadow-md ring-2 ring-ink">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </span>
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() =>
                setImageIndex((i) => (i === 0 ? hotel.images.length - 1 : i - 1))
              }
              className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md rotate-180"
              aria-label="Previous photo"
            >
              ›
            </button>
            <button
              type="button"
              onClick={() =>
                setImageIndex((i) => (i + 1) % hotel.images.length)
              }
              className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md"
              aria-label="Next photo"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {hotel.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === imageIndex ? "bg-paper" : "bg-paper/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              {hotel.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Stars rating={hotel.rating} />
              <span className="font-serif text-sm text-mute">
                {hotel.distance}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-ink">
              {formatPrice(hotel.price, hotel.currency)}
            </p>
            <p className="font-sans text-xs text-mute">{hotel.priceNote}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Book now
          </a>
          <a
            href={hotel.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View on map
          </a>
        </div>
      </div>
    </article>
  );
}
