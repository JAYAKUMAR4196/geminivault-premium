import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PageHeader, Pill, StatTile } from "@/components/vault/primitives";
import { timeline } from "@/lib/vault-data";

export const Route = createFileRoute("/app/timeline")({
  head: () => ({
    meta: [
      { title: "Growth timeline · GeminiVault" },
      {
        name: "description",
        content:
          "A private growth timeline built from your encrypted journal history: how your patterns, boundaries and recovery have shifted over time.",
      },
      { property: "og:title", content: "Growth timeline · GeminiVault" },
      {
        property: "og:description",
        content: "See how your patterns and recovery have shifted across months of writing.",
      },
    ],
  }),
  component: Timeline,
});

function Timeline() {
  return (
    <>
      <PageHeader
        eyebrow="Growth"
        title="Six months, measured in your own words"
        description="Milestones are computed locally from entry history. Move through them to see what changed and what held."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Entries analysed" value="124" hint="Mar – Aug 2026" icon={TrendingUp} />
        <StatTile label="Steadiness" value="+27%" hint="vs. your first month" icon={ArrowUpRight} />
        <StatTile label="Recovery time" value="36h" hint="Down from 72h" icon={TrendingUp} />
      </section>

      <section aria-label="Growth milestones" className="panel p-6 sm:p-8">
        <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-border">
          {timeline.map((node) => (
            <li key={node.id} className="relative pl-8">
              <span
                aria-hidden
                className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-primary/40 bg-background"
              >
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                  {node.period}
                </span>
                {node.delta > 0 ? <Pill tone="signal">+{node.delta}% steadiness</Pill> : null}
                <Pill>{node.entries} entries</Pill>
              </div>
              <h2 className="mt-2.5 text-base font-semibold text-foreground">{node.label}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {node.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
