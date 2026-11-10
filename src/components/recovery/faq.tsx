"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, GoldenStream } from "./effects";

export function Faq() {
  const { t, tArr } = useI18n();
  const faqs = tArr<{ question: string; answer: string }>("faq.items");

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-20 sm:py-28">
      <GoldenStream density={0.35} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/90">
            <span className="hairline-gold w-8" aria-hidden="true" />
            {t("faq.eyebrow")}
            <span className="hairline-gold w-8" aria-hidden="true" />
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
            {t("faq.heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="panel-black panel-beam mt-12 rounded-2xl p-4 sm:p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <Reveal key={f.question} delay={Math.min(i * 0.05, 0.3)}>
                  <AccordionItem value={f.question} className="border-amber-400/[0.10] transition-colors data-[state=open]:border-amber-400/25">
                    <AccordionTrigger className="text-left text-base font-medium text-zinc-100 hover:text-amber-300 hover:no-underline data-[state=open]:text-amber-200 [&>svg]:text-amber-400/80">
                      <span className="flex items-center gap-3">
                        <span className="tabular text-xs font-semibold text-amber-400/50" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {f.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-zinc-400">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
