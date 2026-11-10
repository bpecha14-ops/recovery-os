"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Sparkles, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** The corner trigger: a clean gold “spark” glyph — the universal AI mark.
 *  Goldie (the golden coin) roams the page as the live guide; this button
 *  stays a quiet, abstract launcher for the same chat. */
function AiGlyph({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const grad = `ai-glyph-${uid}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="52%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* main four-point spark */}
      <path
        d="M24 4 C25.7 14.3 33.7 22.3 44 24 C33.7 25.7 25.7 33.7 24 44 C22.3 33.7 14.3 25.7 4 24 C14.3 22.3 22.3 14.3 24 4 Z"
        fill={`url(#${grad})`}
      />
      {/* companion spark */}
      <path
        d="M37.5 7 C38.2 10.6 40.4 12.8 44 13.5 C40.4 14.2 38.2 16.4 37.5 20 C36.8 16.4 34.6 14.2 31 13.5 C34.6 12.8 36.8 10.6 37.5 7 Z"
        fill="#fde68a"
        opacity="0.92"
      />
    </svg>
  );
}

export function AiAssistant() {
  const { t, tArr, locale } = useI18n();
  const suggestions = tArr<string>("assistant.suggestions");
  const greeting = t("assistant.greeting");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);
  const sectionRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reduceMotion = useReducedMotionSafe();

  // If the language changes while the chat is still untouched, re-localize
  // the greeting so it always matches the interface language.
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === "assistant"
        ? [{ role: "assistant", content: t("assistant.greeting") }]
        : prev
    );
  }, [t]);

  // Scout (the roaming guide) asks us to open with a prefilled question.
  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<{ section?: string; question?: string }>)
        .detail;
      if (detail?.section) sectionRef.current = detail.section;
      setOpen(true);
      setUnread(false);
      if (detail?.question) setInput(detail.question);
    }
    window.addEventListener("recoveryos:open-chat", onOpen);
    return () => window.removeEventListener("recoveryos:open-chat", onOpen);
  }, []);

  // Scroll to the newest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || loading) return;
      setInput("");
      setError(null);
      const next: ChatMessage[] = [
        ...messages,
        { role: "user", content: text },
      ];
      setMessages(next);
      setLoading(true);
      try {
        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Keep the last 12 turns for context; the greeting stays first.
            messages: next.slice(-12),
            section: sectionRef.current ?? undefined,
            locale,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.reply) {
          throw new Error(data.error ?? "Chat failed.");
        }
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply as string },
        ]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Network error — try again.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, locale, t]
  );

  function resetChat() {
    setMessages([{ role: "assistant", content: t("assistant.greeting") }]);
    setError(null);
  }

  function toggle() {
    setOpen((o) => {
      const next = !o;
      if (next) setUnread(false);
      return next;
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <>
      {/* --- Floating button (bottom-right) --- */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? t("assistant.closeChat") : t("assistant.openChat")}
        initial={false}
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="fixed bottom-4 right-4 z-[60] group"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full bg-amber-400/25 blur-md transition-opacity duration-300 group-hover:opacity-100 animate-glow"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300/70 bg-zinc-950 shadow-[0_0_28px_-6px_rgba(251,191,36,0.55)] transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16">
          <AiGlyph className="h-7 w-7 drop-shadow-[0_0_10px_rgba(251,191,36,0.45)] sm:h-8 sm:w-8" />
        </span>
        {unread && !open && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-950 bg-amber-400 text-[10px] font-bold text-zinc-950"
          >
            1
          </span>
        )}
        <span className="pointer-events-none absolute -left-1 top-0 hidden -translate-x-full whitespace-nowrap rounded-md border border-amber-400/25 bg-zinc-950/95 px-2.5 py-1.5 text-xs font-medium text-amber-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
          {t("assistant.askGoldie")}
        </span>
      </motion.button>

      {/* --- Chat panel --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("assistant.chatDialog")}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-[5.5rem] right-4 z-[60] flex h-[min(560px,calc(100dvh-7.5rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-amber-400/25 bg-zinc-950/97 shadow-[0_24px_70px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-amber-400/15 bg-gradient-to-r from-amber-400/10 via-transparent to-transparent px-4 py-3">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-amber-300/60">
                { }
                <img
                  src="/ai-goldie.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  Goldie
                  <span className="ml-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                    {t("assistant.aiScout")}
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {t("assistant.online")}
                </p>
              </div>
              <button
                type="button"
                onClick={resetChat}
                aria-label={t("assistant.reset")}
                title={t("assistant.reset")}
                className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-amber-400/10 hover:text-amber-200"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={t("assistant.closeChat")}
                className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-amber-400/10 hover:text-amber-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex items-end gap-2"
                  }
                >
                  {m.role === "assistant" && (
                    <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-amber-300/50">
                      { }
                      <img src="/ai-goldie.png" alt="" className="h-full w-full object-cover" />
                    </span>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-amber-400 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-950"
                        : "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-amber-400/15 bg-white/[0.03] px-3.5 py-2.5 text-sm leading-relaxed text-zinc-200 [&_a]:text-amber-300 [&_a]:underline [&_strong]:text-amber-100 [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_p+p]:mt-2"
                    }
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-amber-300/50">
                    { }
                    <img src="/ai-goldie.png" alt="" className="h-full w-full object-cover" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-amber-400/15 bg-white/[0.03] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-amber-300"
                        animate={
                          reduceMotion
                            ? undefined
                            : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }
                        }
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </p>
              )}
            </div>

            {/* Quick suggestions (only while conversation is fresh) */}
            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-amber-200/90 transition-colors hover:border-amber-400/50 hover:bg-amber-400/15"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-amber-400/15 p-3">
              <div className="flex items-end gap-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={t("assistant.placeholder")}
                  rows={1}
                  className="max-h-28 min-h-[44px] flex-1 resize-none border-amber-400/20 bg-black/60 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-amber-400"
                />
                <Button
                  type="button"
                  onClick={() => void send()}
                  disabled={loading || input.trim().length === 0}
                  aria-label={t("assistant.send")}
                  className="btn-shimmer h-11 w-11 shrink-0 rounded-xl bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 p-0 text-zinc-950 shadow-[0_0_20px_-6px_rgba(251,191,36,0.6)] transition-all hover:brightness-110"
                >
                  {loading ? (
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] leading-none text-zinc-600">
                <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
                {t("assistant.disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
