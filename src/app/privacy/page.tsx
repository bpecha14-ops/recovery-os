import type { Metadata } from "next";

/**
 * /privacy — plain and specific. No vague comfort: exactly what is
 * collected, what is not, and where to inspect it.
 */

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "No accounts, no tracking cookies, answers computed in the browser. Exactly what is collected and what is not.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        Privacy.
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-400">
        The short version: there are no accounts, no login and no
        newsletter. Your wizard answers are computed in your browser and
        never leave it. This page is the long version.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            What we never collect
          </h2>
          <ul className="panel-black mt-4 space-y-2 rounded-2xl p-5 text-sm text-zinc-300">
            {[
              "No accounts, no login, no newsletter signup on the citizen layer.",
              "No wizard answers, ever: the eligibility engine runs in your browser; state lives in memory and is wiped on reload.",
              "No cookies for tracking — see the analytics section below.",
              "No personal data in the open-data downloads.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cf-teal"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            The AI guide (Goldie)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            The AI guide is powered by Z.ai (GLM), named here and in the
            guide&apos;s drawer. When you type a message to Goldie, that
            text is sent to the model provider to generate a reply — the
            wizard never does this, only the chat. Conversations are not
            stored after the reply is generated, are not used for
            training, and the guide is constrained to explain
            already-verified text. Any machine-translated content is
            labeled as such in the interface.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">Analytics</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            If analytics are enabled on a deployment they are cookieless
            and aggregate-only: page views by route, referrer class and
            approximate country, with IP addresses truncated before
            storage. There is no cross-site tracking, no fingerprinting
            and no session recording. You can inspect every outbound
            request your browser makes with its developer tools — the site
            makes none after page load except the AI chat you initiate.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            The &ldquo;Report an error&rdquo; form
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            The report form opens a draft in your own email client — what
            you send, and whether you include an email address, is your
            choice. Reports sent by email or GitHub issues are kept only
            until the error is fixed and published in the changelog; we do
            not add reporters to any list.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-50">
            Institutional requests
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            If an organization contacts us through the business form, that
            correspondence is kept for the duration of the conversation.
            Individual requests are never sold, shared or used for
            outreach — see the terms.
          </p>
        </section>
      </div>
    </div>
  );
}
