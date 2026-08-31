export type JournalEntry = {
  id: string;
  title: string;
  date: string;
  mood: "Calm" | "Focused" | "Restless" | "Hopeful" | "Drained";
  words: number;
  excerpt: string;
  tags: string[];
  encrypted: true;
};

export const journalEntries: JournalEntry[] = [
  {
    id: "e-104",
    title: "Shipping without the fear tax",
    date: "2026-08-31",
    mood: "Focused",
    words: 612,
    excerpt:
      "I noticed the pattern again: I delay releases not because the work is unfinished, but because finishing means being seen. Naming it made today's launch feel ordinary.",
    tags: ["work", "pattern"],
    encrypted: true,
  },
  {
    id: "e-103",
    title: "A quiet Sunday, unusually",
    date: "2026-08-30",
    mood: "Calm",
    words: 348,
    excerpt:
      "No notifications until noon. The silence was not empty, it was room. I want to design more weeks that end this way.",
    tags: ["rest", "boundaries"],
    encrypted: true,
  },
  {
    id: "e-102",
    title: "The conversation I rehearsed twelve times",
    date: "2026-08-27",
    mood: "Restless",
    words: 894,
    excerpt:
      "Rehearsal is just anxiety wearing a productivity costume. Wrote out the three sentences that actually matter and deleted the rest.",
    tags: ["relationships", "anxiety"],
    encrypted: true,
  },
  {
    id: "e-101",
    title: "Small proof that the habit holds",
    date: "2026-08-24",
    mood: "Hopeful",
    words: 421,
    excerpt:
      "Fourteen days of writing before email. The entries are shorter now, but they are more honest, which was the point all along.",
    tags: ["habits"],
    encrypted: true,
  },
];

export type Reflection = {
  id: string;
  kind: "Pattern" | "Question" | "Strength" | "Watchpoint";
  title: string;
  body: string;
  confidence: number;
  sources: number;
};

export const reflections: Reflection[] = [
  {
    id: "r-1",
    kind: "Pattern",
    title: "Avoidance clusters before visibility",
    body: "Across 9 entries, delays appear 1–2 days before anything public: launches, reviews, difficult messages. The work is rarely the blocker.",
    confidence: 0.86,
    sources: 9,
  },
  {
    id: "r-2",
    kind: "Strength",
    title: "You recover faster than you predict",
    body: "Entries following a hard day return to a steady tone within 36 hours on average — roughly half the time you forecast in the moment.",
    confidence: 0.79,
    sources: 12,
  },
  {
    id: "r-3",
    kind: "Question",
    title: "What does rest look like when it is planned?",
    body: "Rest appears in your writing only as an accident of an empty calendar. Consider what a deliberate version would require.",
    confidence: 0.64,
    sources: 5,
  },
  {
    id: "r-4",
    kind: "Watchpoint",
    title: "Sleep language precedes restless weeks",
    body: "Mentions of late nights lead a restless-mood stretch by about four days. Worth watching, not worth alarming over.",
    confidence: 0.71,
    sources: 7,
  },
];

export type TimelineNode = {
  id: string;
  period: string;
  label: string;
  summary: string;
  delta: number;
  entries: number;
};

export const timeline: TimelineNode[] = [
  {
    id: "t-1",
    period: "Mar 2026",
    label: "Starting the vault",
    summary: "First 20 entries. Mostly logistics, little reflection. Baseline established.",
    delta: 0,
    entries: 20,
  },
  {
    id: "t-2",
    period: "May 2026",
    label: "Naming the pattern",
    summary: "Avoidance identified for the first time. Entry length doubles; tone becomes specific.",
    delta: 18,
    entries: 34,
  },
  {
    id: "t-3",
    period: "Jul 2026",
    label: "Boundaries become concrete",
    summary: "Writing shifts from describing pressure to declining it. Restless days fall by a third.",
    delta: 27,
    entries: 41,
  },
  {
    id: "t-4",
    period: "Aug 2026",
    label: "Steadier, shorter, truer",
    summary: "Entries shorten while consistency holds. Recovery time after hard days halves.",
    delta: 12,
    entries: 29,
  },
];

export type GeminiMessage = {
  id: string;
  role: "you" | "gemini";
  text: string;
  time: string;
  grounded?: string[];
};

export const conversation: GeminiMessage[] = [
  {
    id: "m-1",
    role: "you",
    text: "Why do I keep stalling right before I ship something?",
    time: "09:14",
  },
  {
    id: "m-2",
    role: "gemini",
    text: "Your entries point at visibility rather than the work itself. In nine of them, the stall begins after the task is essentially complete — the remaining step is always the public one. The strongest counter-evidence in your own writing is Aug 31: you shipped within an hour of naming the fear out loud.",
    time: "09:14",
    grounded: ["Shipping without the fear tax", "The conversation I rehearsed twelve times"],
  },
  {
    id: "m-3",
    role: "you",
    text: "What should I try this week?",
    time: "09:16",
  },
  {
    id: "m-4",
    role: "gemini",
    text: "Pick one release and write the announcement before the work is finished. You already have a pattern that works: naming it first, then shipping. Keep it to three sentences — your own note said the rest was rehearsal.",
    time: "09:16",
    grounded: ["Small proof that the habit holds"],
  },
];

export type SecurityCheck = {
  id: string;
  label: string;
  detail: string;
  status: "secure" | "attention" | "info";
};

export const securityChecks: SecurityCheck[] = [
  {
    id: "s-1",
    label: "End-to-end encryption",
    detail: "AES-256-GCM, keys derived on device via Argon2id. Ciphertext only in storage.",
    status: "secure",
  },
  {
    id: "s-2",
    label: "Zero-knowledge sync",
    detail: "Server holds ciphertext and metadata length only. No plaintext ever transmitted.",
    status: "secure",
  },
  {
    id: "s-3",
    label: "Gemini processing scope",
    detail: "Redacted, ephemeral context windows. No training retention, 0-day server logs.",
    status: "secure",
  },
  {
    id: "s-4",
    label: "Recovery key",
    detail: "Generated and downloaded 41 days ago. Re-verify to confirm you still hold it.",
    status: "attention",
  },
  {
    id: "s-5",
    label: "Active devices",
    detail: "2 trusted devices. Last new device approved 12 days ago from Chennai, IN.",
    status: "info",
  },
  {
    id: "s-6",
    label: "Local vault lock",
    detail: "Auto-locks after 5 minutes idle. Biometric unlock enabled on this device.",
    status: "secure",
  },
];

export const auditLog = [
  { id: "a-1", event: "Vault unlocked", meta: "MacBook Pro · Chennai, IN", time: "2m ago" },
  { id: "a-2", event: "Entry encrypted & synced", meta: "e-104 · 2.1 KB ciphertext", time: "18m ago" },
  { id: "a-3", event: "Gemini reflection generated", meta: "Redacted context · 4 sources", time: "1h ago" },
  { id: "a-4", event: "Key rotation completed", meta: "Automatic · 90-day policy", time: "3d ago" },
  { id: "a-5", event: "Device approved", meta: "iPhone 17 · verified by recovery key", time: "12d ago" },
];

export const moodSeries = [
  { day: "Mon", value: 58 },
  { day: "Tue", value: 42 },
  { day: "Wed", value: 61 },
  { day: "Thu", value: 74 },
  { day: "Fri", value: 66 },
  { day: "Sat", value: 81 },
  { day: "Sun", value: 88 },
];
