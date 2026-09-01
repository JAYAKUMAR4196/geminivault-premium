import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { LoadingPanel, PageHeader, Pill } from "@/components/vault/primitives";
import { reflections } from "@/lib/vault-data";

export const Route = createFileRoute("/app/reflections")({
  head: () => ({
    meta: [
      { title: "Reflections · GeminiVault" },
      {
        name: "description",
        content:
          "Grounded AI reflections on your private journal: patterns, strengths, questions and watchpoints, each with confidence and cited sources.",
      },
      { property: "og:title", content: "Reflections · GeminiVault" },
      {
        property: "og:description",
        content: "Patterns, strengths and questions drawn from your own entries — with citations.",
      },
    ],
  }),
  component: Reflections,
});

const toneFor = {
  Pattern: "signal",
  Strength: "info",
  Question: "neutral",
  Watchpoint: "warning",
} as const;

function Reflections() {
  const [generating, setGenerating] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Reflections"
        title="What your writing keeps saying"
        description="Each card is generated from a redacted slice of your entries and shows its confidence and sources. Nothing here is stored on our servers."
        actions={
          <button
            onClick={() => {
              setGenerating(true);
              setTimeout(() => setGenerating(false), 1800);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles aria-hidden className="size-4" />
            Generate reflection
          </button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2">
        {generating ? <LoadingPanel lines={4} /> : null}
        {reflections.map((r) => (
          <article key={r.id} className="panel panel-hover flex flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <Pill tone={toneFor[r.kind]}>{r.kind}</Pill>
              <span className="font-mono text-[10px] text-muted-foreground">
                {r.sources} sources
              </span>
            </div>
            <h2 className="mt-4 text-base font-semibold text-balance text-foreground">{r.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Confidence</span>
                <span className="font-mono tabular-nums text-foreground">
                  {Math.round(r.confidence * 100)}%
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={Math.round(r.confidence * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Confidence for ${r.title}`}
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${r.confidence * 100}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
