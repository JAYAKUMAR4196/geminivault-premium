import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookText,
  LayoutDashboard,
  Lock,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/journal", label: "Journal", icon: BookText },
  { to: "/app/reflections", label: "Reflections", icon: Sparkles },
  { to: "/app/timeline", label: "Growth", icon: TrendingUp },
  { to: "/app/security", label: "Security Center", icon: ShieldCheck },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav aria-label="Primary" className="space-y-1">
      {nav.map(({ to, label, icon: Icon, ...rest }) => {
        const exact = "exact" in rest && rest.exact;
        const active = exact ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <Icon
              aria-hidden
              className={cn("size-4 shrink-0", active ? "text-primary" : "text-muted-foreground")}
            />
            <span className="truncate">{label}</span>
            {active ? <span className="ml-auto h-4 w-0.5 rounded-full bg-primary" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function VaultMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-lg border border-primary/25 bg-signal-soft">
        <Lock aria-hidden className="size-4 text-primary" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        Gemini<span className="text-primary">Vault</span>
      </span>
    </span>
  );
}

function VaultStatus() {
  return (
    <div className="panel flex items-center gap-3 p-3.5">
      <span className="signal-dot size-2 shrink-0 rounded-full bg-primary" />
      <div className="min-w-0">
        <p className="text-xs font-medium text-foreground">Vault unlocked</p>
        <p className="truncate font-mono text-[10px] text-muted-foreground">
          AES-256 · locks in 4:38
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#vault-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
        <Link to="/" className="px-1">
          <VaultMark />
        </Link>
        <VaultStatus />
        <NavList />
        <div className="mt-auto space-y-3">
          <div className="rounded-xl border border-border bg-surface-raised p-3.5">
            <p className="text-eyebrow">Storage</p>
            <p className="mt-2 text-xs text-muted-foreground">124 entries · fully encrypted</p>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={38}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Vault storage used"
            >
              <div className="h-full w-[38%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-1 py-1">
            <span className="grid size-8 place-items-center rounded-full border border-border bg-muted font-mono text-xs text-foreground">
              JK
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">Jaya Kumar</p>
              <p className="truncate text-[11px] text-muted-foreground">Private workspace</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6">
            <div className="flex items-center justify-between">
              <VaultMark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <VaultStatus />
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <Menu className="size-4" aria-hidden />
          </button>

          <label className="relative hidden min-w-0 flex-1 items-center sm:flex md:max-w-sm">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
            />
            <span className="sr-only">Search your vault</span>
            <input
              type="search"
              placeholder="Search entries, reflections…"
              className="h-9 w-full rounded-lg border border-input bg-surface pr-16 pl-9 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-primary/40"
            />
            <kbd className="pointer-events-none absolute right-2.5 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </label>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-primary/25 bg-signal-soft px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-primary uppercase sm:inline-flex">
              <ShieldCheck aria-hidden className="size-3.5" />
              Zero-knowledge
            </span>
            <Link
              to="/app/journal"
              className="rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              New entry
            </Link>
          </div>
        </header>

        <main id="vault-main" className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
