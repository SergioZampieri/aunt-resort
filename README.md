# Mirador de Animas

Website for [Mirador de Animas](https://miradordeanimas.com.ar/), a cabin resort in the
hills of Tandil, Argentina. Built with Next.js and Mantine, replacing the original
WordPress site.

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
yarn build   # production build
yarn start   # run the production build
yarn lint    # oxlint
```

## Updating availability

There's no booking backend — availability is a plain config file. To mark a cabin as
booked (or free it up), edit `app/data/availability.ts` and add/remove an entry:

```ts
{ cabinId: "uno", from: "2026-01-10", to: "2026-01-15", label: "Reservado" }
```

`from`/`to` are `YYYY-MM-DD`, `to` is the checkout day. Save the file and redeploy (or
just refresh in dev) — the calendar on the site updates automatically.

## Project structure

- `app/data/*.ts` — site content (cabins, contact, banners, promotions, booked ranges).
- `app/lib/` — availability and WhatsApp link helpers.
- `app/components/` — shared UI.
- `public/images/` — photos by section (`hero/`, `cabana-1..6/`, `exteriores/`, ...).
- `theme.ts` + `app/globals.css` — Mantine theme and brand tokens.
