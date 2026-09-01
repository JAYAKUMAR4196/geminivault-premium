import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Fingerprint,
  Info,
  KeyRound,
  Lock,
  ServerOff,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Pill } from "@/components/vault/primitives";
import { auditLog, securityChecks } from "@/lib/vault-data";

export const Route = createFileRoute("/app/security")({
  head: () => ({
    meta: [
      { title: "Security Center · GeminiVault" },
      {
        name: "description",
        content:
          "Inspect GeminiVault's zero-knowledge architecture: device-side AES-256 encryption, redacted Gemini context, recovery keys, trusted devices and a full audit log.",
      },
      { property: "og:title", content: "Security Center · GeminiVault" },
      {
        property: "og:description",
        content: "Device-side encryption, redacted AI context and a transparent audit log.",
      },
    ],
  }),
  component: SecurityCenter,
});

const statusMeta = {
  secure: { icon: CheckCircle2, tone: "signal", label: "Secure" },
  attention: { icon: AlertTriangle, tone: "warning", label: "Review" },
  info: { icon: Info, tone: "info", label: "Info" },
} as const;

const flow = [
  { icon: Lock, title: "On your device", body: "Keys derived with Argon2id. Plaintext never leaves memory." },
  { icon: ServerOff, title: "In transit & at rest", body: "Only AES-256-GCM ciphertext. We cannot decrypt it." },
  { icon: Fingerprint, title: "At inference", body: "Redacted ephemeral window. No retention, no training." },
];

function SecurityCenter() {
  return (
    <>
      <PageHeader
        eyebrow="Security Center"
        title="Verifiable privacy, not a promise"
        description="Every guarantee below maps to a mechanism you can inspect. One item currently needs your attention."
        actions={<Pill tone="signal"><ShieldCheck aria-hidden className="size-3" /> Vault health 98%</Pill>}
      />

      <section
        aria-label="Encryption flow"
        className="panel relative overflow-hidden p-6 sm:p-8"
      >
        <div aria-hidden className="grid-canvas pointer-events-none absolute inset-0" />
        <div className="relative">
          <p className="text-eyebrow">How a thought travels</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {flow.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="rounded-xl border border-border bg-surface-raised p-5">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden className="size-5 text-primary" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="mt-4 text-sm font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="checks-heading" className="space-y-3">
          <h2 id="checks-heading" className="text-sm font-semibold text-foreground">
            Protection checklist
          </h2>
          <ul className="panel divide-y divide-border">
            {securityChecks.map((check) => {
              const meta = statusMeta[check.status];
              const Icon = meta.icon;
              return (
                <li key={check.id} className="flex items-start gap-4 p-5">
                  <Icon
                    aria-hidden
                    className={
                      check.status === "secure"
                        ? "mt-0.5 size-4 shrink-0 text-primary"
                        : check.status === "attention"
                          ? "mt-0.5 size-4 shrink-0 text-warning"
                          : "mt-0.5 size-4 shrink-0 text-info"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground">{check.label}</h3>
                      <Pill tone={meta.tone}>{meta.label}</Pill>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {check.detail}
                    </p>
                  </div>
                  {check.status === "attention" ? (
                    <button className="shrink-0 rounded-lg border border-input px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent">
                      Verify
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="panel p-6" aria-labelledby="key-heading">
            <div className="flex items-center gap-2">
              <KeyRound aria-hidden className="size-4 text-primary" />
              <h2 id="key-heading" className="text-sm font-semibold text-foreground">
                Recovery key
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This key is the only way back into your vault. We never see it and cannot reset it.
            </p>
            <p className="mt-4 rounded-lg border border-border bg-surface-raised px-4 py-3 font-mono text-xs tracking-[0.18em] text-foreground">
              GV-••••-••••-••••-4K9Z
            </p>
            <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Re-verify key
            </button>
          </section>

          <section className="panel p-6" aria-labelledby="audit-heading">
            <h2 id="audit-heading" className="text-sm font-semibold text-foreground">
              Audit log
            </h2>
            <ol className="mt-5 space-y-4">
              {auditLog.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{item.event}</p>
                    <p className="truncate font-mono text-[10px] text-muted-foreground">
                      {item.meta}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {item.time}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
