import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, EyeOff, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { VaultMark } from "@/components/vault/app-shell";
import { Pill } from "@/components/vault/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeminiVault — Your thoughts. Your AI. Your privacy." },
      {
        name: "description",
        content:
          "An end-to-end encrypted journal with a private Gemini reflection layer. Your writing stays yours: encrypted on device, never used for training.",
      },
      { property: "og:title", content: "GeminiVault — Your thoughts. Your AI. Your privacy." },
      {
        property: "og:description",
        content:
          "Encrypted journaling with a private AI that finds your patterns without ever reading your words in the clear.",
      },
    ],
  }),
  component: Landing,
});

const guarantees = [
  {
    icon: Lock,
    title: "Encrypted before it leaves",
    body: "AES-256-GCM with keys derived on your device. The server stores ciphertext and nothing else.",
  },
  {
    icon: EyeOff,
    title: "Redacted, ephemeral AI context",
    body: "Gemini sees a minimised, transient window. No retention, no training, no profile built from you.",
  },
  {
    icon: KeyRound,
    title: "You hold the only key",
    body: "A recovery key you generate and keep. We cannot reset it, and we cannot read around it.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <VaultMark />
          <div className="flex items-center gap-3">
            <a
              href="#security"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Security
            </a>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open vault
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="relative overflow-hidden">
          <div aria-hidden className="grid-canvas absolute inset-0" />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="rise max-w-3xl">
              <Pill tone="signal">
                <span className="signal-dot size-1.5 rounded-full bg-primary" />
                Zero-knowledge by architecture
              </Pill>
              <h1 className="mt-7 font-display text-4xl leading-[1.05] font-semibold text-balance text-foreground sm:text-6xl">
                Your thoughts. Your AI. <span className="text-primary">Your privacy.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                GeminiVault is an encrypted journal with an intelligence layer that finds your
                patterns, questions and growth — without any system, including ours, ever reading
                your words in the clear.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/app"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Enter the vault
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
                <Link
                  to="/app/security"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-input px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <ShieldCheck aria-hidden className="size-4 text-primary" />
                  Inspect the security model
                </Link>
              </div>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              {guarantees.map(({ icon: Icon, title, body }) => (
                <article key={title} className="panel panel-hover p-6">
                  <Icon aria-hidden className="size-5 text-primary" />
                  <h2 className="mt-4 text-sm font-semibold text-foreground">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="border-t border-border">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-eyebrow">The intelligence layer</p>
              <h2 className="font-display text-3xl font-semibold text-balance text-foreground">
                Insight that cites your own words back to you
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every reflection is grounded in specific entries, with a confidence signal and its
                sources attached. No vague affirmations, no invented memories — an analyst for your
                inner life that shows its work.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Grounded citations on every generated reflection",
                  "Confidence scoring so you know what to trust",
                  "Growth timeline built from real entry history",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <BrainCircuit aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <Pill tone="signal">Reflection · 86% confidence</Pill>
                <span className="font-mono text-[10px] text-muted-foreground">9 sources</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-foreground">
                “Across nine entries, delay appears one to two days before anything public — a
                launch, a review, a hard message. The work is rarely the blocker.”
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                <Pill>Shipping without the fear tax</Pill>
                <Pill>The conversation I rehearsed</Pill>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <VaultMark />
          <p className="font-mono text-[11px] text-muted-foreground">
            Encrypted on device · No training on your data
          </p>
        </div>
      </footer>
    </div>
  );
}
