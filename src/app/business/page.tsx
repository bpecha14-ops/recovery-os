import type { Metadata } from "next";
import { Waitlist } from "@/components/recovery/waitlist";

/**
 * /business — the one footer link for organizations. One honest
 * paragraph, everything else labeled "Planned" (no numbers without
 * sources), and a contact form. Individuals never pay; requests are
 * never sold.
 */

export const metadata: Metadata = {
  title: "For organizations",
  description:
    "Institutions pay for API access, bulk data and service guarantees; sponsors finance new countries and languages. Individuals never pay.",
};

const PLANNED = [
  {
    title: "Catalog API with freshness SLA",
    note: "The read-only open-data API already runs for individuals; the institutional tier adds SLAs and change alerts.",
  },
  {
    title: "Bulk data & change alerts",
    note: "Per-package feeds with deadline monitoring for agencies, insurers and researchers.",
  },
  {
    title: "Embeddable program finder",
    note: "For legal-aid sites, libraries and social services — the same verified data, framed in your service.",
  },
  {
    title: "Sponsored countries & languages",
    note: "Foundations and donors fund the next verified package; public metrics on /impact.",
  },
];

export default function Business() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        For organizations.
      </h1>
      <p className="mt-5 leading-relaxed text-zinc-300">
        CivicClaim is free forever for individuals. Institutions —
        agencies, insurers, researchers, legal-aid networks — pay for API
        access, bulk data and service guarantees; sponsors finance new
        countries and languages. That funds the free citizen layer.
        Individual requests are never sold, shared or used for outreach.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-50">What institutions get</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {PLANNED.map((item) => (
            <div key={item.title} className="panel-black rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <span className="inline-flex shrink-0 items-center rounded-full border border-cf-cyan/30 bg-cf-cyan/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-cf-cyan">
                  Planned
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {item.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-zinc-600">
          No pricing numbers on this page — none are published yet. The
          free read-only API is live on /data.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-50">Talk to us</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Leave a contact — we reply about API access, bulk data or
          sponsoring a country.
        </p>
      </section>
      <Waitlist />
    </div>
  );
}
