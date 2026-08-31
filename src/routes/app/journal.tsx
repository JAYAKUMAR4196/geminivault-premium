import { createFileRoute } from "@tanstack/react-router";
import { BookText, Check, Lock, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState, PageHeader, Pill } from "@/components/vault/primitives";
import { conversation, journalEntries } from "@/lib/vault-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/journal")({
  head: () => ({
    meta: [
      { title: "Journal · GeminiVault" },
      {
        name: "description",
        content:
          "Write privately in an end-to-end encrypted journal and ask Gemini about your own entries, with every answer grounded in real sources.",
      },
      { property: "og:title", content: "Journal · GeminiVault" },
      {
        property: "og:description",
        content: "Encrypted writing with a private, source-grounded Gemini conversation alongside.",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState(journalEntries[0].id);
  const [thinking, setThinking] = useState(false);
  const [prompt, setPrompt] = useState("");

  const words = useMemo(() => draft.trim().split(/\s+/).filter(Boolean).length, [draft]);
  const active = journalEntries.find((e) => e.id === selected)!;

  function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setThinking(true);
    setPrompt("");
    setTimeout(() => setThinking(false), 1600);
  }

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Write it down, keep it yours"
        description="Text is encrypted in this browser before a single byte is sent. Gemini only ever receives a redacted, ephemeral slice."
        actions={<Pill tone="signal"><Lock aria-hidden className="size-3" /> Encrypting as you type</Pill>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="panel overflow-hidden" aria-labelledby="composer-heading">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
              <h2 id="composer-heading" className="text-sm font-semibold text-foreground">
                New entry · 31 Aug
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                {words} words · autosaved
              </span>
            </div>
            <label htmlFor="entry" className="sr-only">
              Journal entry
            </label>
            <textarea
              id="entry"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={9}
              placeholder="What actually happened today — and what did it cost you?"
              className="w-full resize-none bg-transparent px-5 py-5 text-[15px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
              <div className="flex flex-wrap gap-2">
                {["Calm", "Focused", "Restless", "Hopeful"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {m}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={!draft.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Check aria-hidden className="size-4" />
                Seal entry
              </button>
            </div>
          </section>

          <section aria-labelledby="gemini-heading" className="panel p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden className="size-4 text-primary" />
              <h2 id="gemini-heading" className="text-sm font-semibold text-foreground">
                Ask Gemini about your writing
              </h2>
            </div>

            <ol className="mt-6 space-y-5">
              {conversation.map((m) => (
                <li
                  key={m.id}
                  className={cn("flex flex-col gap-2", m.role === "you" ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "you"
                        ? "rounded-br-md bg-surface-raised text-foreground"
                        : "rounded-bl-md border border-primary/20 bg-signal-soft text-foreground",
                    )}
                  >
                    <p className="text-eyebrow mb-2">{m.role === "you" ? "You" : "Gemini"} · {m.time}</p>
                    {m.text}
                    {m.grounded ? (
                      <div className="mt-3 flex flex-wrap gap-2 border-t border-primary/15 pt-3">
                        {m.grounded.map((g) => (
                          <Pill key={g} tone="signal">
                            <BookText aria-hidden className="size-3" />
                            {g}
                          </Pill>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
              {thinking ? (
                <li aria-live="polite" className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="signal-dot size-1.5 rounded-full bg-primary" />
                  Gemini is reading a redacted slice of 4 entries…
                </li>
              ) : null}
            </ol>

            <form onSubmit={ask} className="mt-6 flex items-center gap-2">
              <label htmlFor="ask" className="sr-only">
                Ask Gemini
              </label>
              <input
                id="ask"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about a pattern, a month, a feeling…"
                className="h-11 flex-1 rounded-xl border border-input bg-surface px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
              />
              <button
                type="submit"
                aria-label="Send question to Gemini"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send aria-hidden className="size-4" />
              </button>
            </form>
          </section>
        </div>

        <aside className="space-y-4" aria-label="Entry history">
          <div className="panel divide-y divide-border">
            {journalEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry.id)}
                aria-pressed={selected === entry.id}
                className={cn(
                  "block w-full px-5 py-4 text-left transition-colors",
                  selected === entry.id ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-foreground">{entry.title}</span>
                  <Lock aria-hidden className="size-3 shrink-0 text-primary" />
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {entry.date} · {entry.mood}
                </p>
              </button>
            ))}
          </div>

          <div className="panel p-5">
            <p className="text-eyebrow">Selected</p>
            <h3 className="mt-2 text-sm font-semibold text-foreground">{active.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {active.tags.map((t) => (
                <Pill key={t}>#{t}</Pill>
              ))}
            </div>
          </div>

          <EmptyState
            icon={BookText}
            title="No archived entries yet"
            description="Entries you archive stay encrypted and searchable, but leave your active timeline."
          />
        </aside>
      </div>
    </>
  );
}
