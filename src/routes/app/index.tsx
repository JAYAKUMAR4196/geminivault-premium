import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookText, Flame, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader, Pill, StatTile } from "@/components/vault/primitives";
import { journalEntries, moodSeries, reflections } from "@/lib/vault-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard · GeminiVault" },
      {
        name: "description",
        content:
          "Your private overview: encrypted entries, streak, latest Gemini reflections and vault health at a glance.",
      },
      { property: "og:title", content: "Dashboard · GeminiVault" },
      {
        property: "og:description",
        content: "Encrypted entries, streaks and grounded AI reflections in one private overview.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const peak = Math.max(...moodSeries.map((d) => d.value));

  return (
    <>
      <PageHeader
        eyebrow="Monday, 31 August 2026"
        title="Good evening, Jaya"
        description="Everything below was decrypted locally, in this browser session. Your vault relocks after five idle minutes."
        actions={
          <>
            <Link
              to="/app/journal"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Write today's entry
            </Link>
            <Link
              to="/app/security"
              className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Security Center
            </Link>
          </>
        }
      />

      <section aria-label="Vault summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Entries" value="124" hint="All encrypted at rest" icon={BookText} />
        <StatTile label="Streak" value="14 days" hint="Longest run: 21 days" icon={Flame} />
        <StatTile label="Reflections" value="38" hint="Each cites its sources" icon={Sparkles} />
        <StatTile label="Vault health" value="98%" hint="1 item needs review" icon={ShieldCheck} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className="panel p-6" aria-labelledby="recent-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="recent-heading" className="text-sm font-semibold text-foreground">
              Recent entries
            </h2>
            <Link
              to="/app/journal"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Open journal
              <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {journalEntries.slice(0, 3).map((entry) => (
              <li key={entry.id} className="group py-4 first:pt-0 last:pb-0">
                <Link to="/app/journal" className="block">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate text-sm font-medium text-foreground group-hover:text-primary">
                      {entry.title}
                    </h3>
                    <Pill className="ml-auto shrink-0">{entry.mood}</Pill>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.excerpt}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                    {entry.date} · {entry.words} words · encrypted
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="panel p-6" aria-labelledby="mood-heading">
            <h2 id="mood-heading" className="text-sm font-semibold text-foreground">
              Steadiness this week
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Derived on device from entry tone. Never uploaded.
            </p>
            <div className="mt-6 flex h-32 items-end gap-2" role="img" aria-label="Weekly steadiness trend, rising from 58 to 88">
              {moodSeries.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-primary/25 transition-colors hover:bg-primary/45"
                    style={{ height: `${(d.value / peak) * 100}%` }}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">{d.day[0]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel p-6" aria-labelledby="insight-heading">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden className="size-4 text-primary" />
              <h2 id="insight-heading" className="text-sm font-semibold text-foreground">
                Latest reflection
              </h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{reflections[0]!.body}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <Pill tone="signal">{Math.round(reflections[0]!.confidence * 100)}% confidence</Pill>
              <Link
                to="/app/reflections"
                className="text-xs font-medium text-primary hover:underline"
              >
                All reflections
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
