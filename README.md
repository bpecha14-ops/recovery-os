# RecoveryOS — The World Library

A global directory of official unclaimed-money databases: bank deposits,
pensions, tax refunds, insurance payouts, court funds and investor balances.
Enter a name, pick the countries you have lived, worked or banked in, and get
a personal checklist of every official registry to search — each entry points
to a government-backed service, never to a paid middleman.

## What's inside

- **World Library** — 50 markets, 66+ official sources, every entry verified
  against the regulator's own publications (central banks, treasury programs,
  deposit insurers, securities regulators).
- **Free scanner** — upload a purchases export (CSV/TSV) and match it against
  open class-action settlements, IEEPA tariff refunds and duty-drawback
  candidates. Parsing and matching happen entirely in your browser; the file
  is never uploaded anywhere.
- **Settlements browser** — open claims with deadlines, fund sizes and direct
  links to the court-appointed administrators.
- **IEEPA calculator** — estimate tariff-refund exposure with statutory
  interest for importers.

## Quick start

```bash
bun install
cp .env.example .env        # or create .env with DATABASE_URL
npx prisma db push          # creates the SQLite database
bun run dev                 # http://localhost:3000
```

Environment: `DATABASE_URL` (SQLite by default, any Prisma-supported
database in production).

## Privacy — read this first

**How the site works, honestly:**

- **World Library search** — the name you type is used only in your browser
  to personalize the on-screen checklist. It is never transmitted to our
  servers and never stored. Only the list of country codes you select is
  sent (over HTTPS) to build the checklist, and it is not stored either.
- **Scanner** — your purchases export is parsed and matched entirely in
  your browser. The file is never uploaded anywhere. The only thing ever
  recorded is two anonymous counters: rows parsed and matches found —
  no file contents, no names, no amounts.
- **Waitlist / claim-pack requests** — when you explicitly submit an email
  to join the launch list or request a claim pack, that email (and the
  optional company name) is stored for the sole purpose of contacting you
  about the thing you asked for. You can request deletion at any time —
  records are removed promptly and without questions.

Personal information submitted through the explicit signup forms is never
sold, rented, shared, transferred or disclosed to any third party, and is
never used for advertising, marketing or profiling. There are no trackers,
no analytics pixels and no advertising SDKs.

## Data sources

Every registry entry references an official operator (central bank,
treasurer, deposit insurer, securities regulator or court administrator).
Figures are compiled from official disclosures and major press. Where a
market has no public register yet, it is marked "researching" and points to
the responsible regulator — we never link to paid search services or
intermediaries.

## Tech

Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · SQLite.
The world registry is a single typed data module (`src/lib/world-registry.ts`)
that drives the library UI, the search API and all headline statistics.

## License

Proprietary — all rights reserved.
