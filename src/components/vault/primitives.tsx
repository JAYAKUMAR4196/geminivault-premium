import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="rise flex flex-col gap-5 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-3">
        <p className="text-eyebrow">{eyebrow}</p>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}) {
  return (
    <div className="panel panel-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-eyebrow">{label}</p>
        <Icon aria-hidden className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "signal" | "warning" | "info";
  className?: string;
}) {
  const tones = {
    neutral: "border-border bg-muted text-muted-foreground",
    signal: "border-primary/30 bg-signal-soft text-primary",
    warning: "border-warning/30 bg-warning/10 text-warning",
    info: "border-info/30 bg-info/10 text-info",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center px-6 py-16 text-center">
      <div className="grid size-12 place-items-center rounded-xl border border-border bg-surface-raised">
        <Icon aria-hidden className="size-5 text-muted-foreground" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "We couldn't decrypt this view",
  description = "Your data is safe and still encrypted. Retry, or re-unlock the vault if the problem persists.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="panel border-destructive/30 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="rounded-lg border border-input px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div aria-hidden className={cn("shimmer rounded-lg", className)} />;
}

export function LoadingPanel({ lines = 3 }: { lines?: number }) {
  return (
    <div className="panel space-y-3 p-5" aria-busy="true" aria-live="polite">
      <SkeletonBlock className="h-3 w-24" />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} className={i === lines - 1 ? "h-3 w-1/2" : "h-3 w-full"} />
      ))}
      <span className="sr-only">Loading encrypted content</span>
    </div>
  );
}
