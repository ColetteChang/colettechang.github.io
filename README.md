# Coco & Sunny — Wedding Website

A password-protected, single-page wedding website built with Next.js (App Router) +
TypeScript + Tailwind CSS. Editorial black-and-white serif style, with scroll-based
progressive reveal.

Whistler, BC · September 9–12, 2027

## Sections

`Home · Schedule · Hotel & Travel · Explore · Registry · RSVP · Attire Guide · FAQs`

- **Password gate** — guests enter a password before seeing the site
- **Home** — names, dates, live countdown
- **Schedule** — the four-day itinerary (with "Coach from the Hilton" notes)
- **Hotel & Travel** — host hotel room block, nearby options, getting there
- **Explore** — Whistler activities + a form for guests extending their stay
- **Registry** — gift registry links
- **RSVP** — guest-list lookup by name, then RSVP for the whole party (limited +1s)
- **Attire Guide** — Indian attire guidance for all guests
- **FAQs** — common questions

## Quick start

```bash
npm install
npm run dev
```

Open the printed URL (e.g. http://localhost:3000).

> Note: if port 3000 is busy, Next picks the next free port — check the terminal,
> or run `npm run dev -- -p 3100` to force a specific port.

## Editing content

Everything guests see lives in one file:

```
src/config/wedding.ts
```

Couple names, dates, schedule, hotels, activities, registry, FAQs, attire guide,
and the nav menu are all there.

## The guest list (RSVP)

Edit `src/config/guests.ts`. Each "party" lists its invited members and how many
extra +1 guests they may bring (`plusOnesAllowed: 0` = no plus-ones). Guests look
themselves up by full name and then RSVP for their whole group.

This file stays on the server and is never sent to the browser.

## The password

Set it via an environment variable in `.env.local`:

```
SITE_PASSWORD=your-password-here
```

If unset, it defaults to `whistler2027` (see `src/app/api/unlock/route.ts`).

> The gate is light protection suitable for a private wedding site — fine for
> keeping the site out of search results and casual visitors.

## Where submissions go

- RSVPs → `data/rsvp.json` (also viewable at `/api/rsvp`)
- "Extend your stay" sign-ups → `data/connect.json` (also at `/api/connect`)

> File storage works for local use or a single always-on server. For a stateless
> host like Vercel, swap these API routes for a database / Google Sheet / Notion.

## Deploy

```bash
npm run build
npm run start
```
