import type { Metadata } from "next";

/**
 * /terms — information, not legal advice; boundaries, liability,
 * licensing.
 */

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Information about rights, not legal advice. No attorney-client relationship, no warranty of outcomes, content licensing.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        Terms.
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-400">
        CivicClaim is an open layer of information about citizens&apos;
        rights. Using it creates no professional relationship of any kind.
      </p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-zinc-400">
        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Information, not legal advice
          </h2>
          <p className="mt-3">
            Everything on this site — program pages, wizard results, AI
            guide replies — is information with official sources. It is not
            legal advice, and using the site creates no attorney-client
            relationship. Final eligibility decisions rest exclusively
            with the official program operators.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            No warranty of outcomes
          </h2>
          <p className="mt-3">
            We make no promise that you will receive any payment or
            benefit. Sources change; official pages govern at all times.
            Every figure links to its source and the date it was checked —
            if they disagree, the official page wins, and we ask you to
            report the error.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">Boundaries</h2>
          <p className="mt-3">
            We do not provide case strategy, representation, or
            interpretation of ambiguous situations, and we never predict
            outcomes. Complex cases belong with free local legal help and
            the official channels each program page links to.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Liability limits
          </h2>
          <p className="mt-3">
            To the maximum extent permitted by law, CivicClaim and its
            contributors are not liable for decisions made on the basis of
            this information. The service is provided &ldquo;as is&rdquo;
            without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Content licensing
          </h2>
          <p className="mt-3">
            Our data compilation and metadata are published under CC BY
            4.0. Underlying official texts remain under their
            sources&apos; terms. The code is open source. The CivicClaim
            name and visual identity are reserved for the project.
          </p>
        </section>
      </div>
    </div>
  );
}
