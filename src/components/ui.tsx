"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ================= UI context (modal + chat state) ================= */

type UIState = {
  contactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  return (
    <UIContext.Provider
      value={{ contactOpen, openContact, closeContact, chatOpen, setChatOpen }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}

/* ================= Icons ================= */

const PATHS: Record<string, ReactNode> = {
  anchor: (
    <>
      <circle cx="12" cy="5" r="3" />
      <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
    </>
  ),
  ship: (
    <>
      <path d="M3 17h18l-2 4H5l-2-4Z" />
      <path d="M6 17V9h5V7h4v2h3v8" />
      <path d="M12 9V5M9 13h6" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6M9 13l2 2 4-4" />
    </>
  ),
  coins: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" />
    </>
  ),
  bank: (
    <>
      <path d="M3 21h18M4 10h16M12 3 3 10v1h18v-1l-9-7Z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
      <path d="M8 11.5 10 13l3-3.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 3 3 5-7" />
      <path d="M15 6h4v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M12 10V4M8 4h8" />
      <circle cx="12" cy="2.5" r="1" />
      <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
      <path d="M9.5 17.5h5" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7a2 2 0 0 1 1.7 2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  checks: (
    <>
      <path d="m18 6-9 9-3-3" />
      <path d="m22 10-8.5 8.5L9 14" />
    </>
  ),
  star: (
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
  ),
  arrow: <path d="M19 12H5m7-7-7 7 7 7" />,
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="5" height="7" rx="2" />
      <rect x="17" y="14" width="5" height="7" rx="2" />
      <path d="M20 18a4 4 0 0 1-4 3h-2" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  calc: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  box: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  wallet: (
    <>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16V7" />
      <circle cx="17" cy="14" r="1.4" fill="currentColor" />
    </>
  ),
  plane: (
    <>
      <path d="M17.8 19.2 16 11l3.5-3.5c1.5-1.5 1.5-3 .7-3.7-.8-.8-2.2-.8-3.7.7L13 7.5 4.8 5.7c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5 0 1 .5 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.9 5.1c.3.5.8.7 1.3.5l.5-.2c.4-.3.6-.7.5-1.1Z" />
    </>
  ),
  truck: (
    <>
      <path d="M1 8h13v9H1zM14 11h4l4 4v2h-8z" />
      <circle cx="6" cy="19" r="1.8" />
      <circle cx="17.5" cy="19" r="1.8" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  spark: (
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
  ),
  bolt: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />,
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.2a6.5 6.5 0 0 1 4 6" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 3v6h-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" />
    </>
  ),
  down: <path d="m6 9 6 6 6-6" />,
  trendUp: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  trendDown: (
    <>
      <path d="m3 7 6 6 4-4 8 8" />
      <path d="M14 17h7v-7" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14" r="5" />
      <path d="M9 9 6 2h4l2 4 2-4h4l-3 7" />
      <path d="m10 14 1.5 1.5L14 13" />
    </>
  ),
};

export function I({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.8,
}: {
  name: keyof typeof PATHS | string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] ?? null}
    </svg>
  );
}

/* ================= Reveal ================= */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ================= CountUp ================= */

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} dir="rtl">
      {prefix}
      {val.toLocaleString("fa-IR")}
      {suffix}
    </span>
  );
}

/* ================= Section heading ================= */

export function SectionHead({
  eyebrow,
  title,
  desc,
  dark = false,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center items-center" : "text-start items-start"} flex max-w-3xl flex-col gap-4`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-bold ${
          dark
            ? "border-white/20 bg-white/10 text-sky-200"
            : "border-brand-200 bg-brand-50 text-brand-700"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`text-3xl leading-[1.5] font-black text-balance sm:text-4xl lg:text-[42px] lg:leading-[1.6] ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`text-[15px] leading-8 sm:text-base ${dark ? "text-sky-100/80" : "text-slate-500"}`}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/* ================= Logo ================= */

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 shadow-soft" />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-white/40 ring-inset" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17h18l-2 4H5l-2-4Z" />
          <path d="M6 17V9h5V7h4v2h3v8" />
          <path d="M12 9V5" />
        </svg>
        <span className="absolute -top-1 -left-1 h-3.5 w-3.5 rounded-full bg-cyan-300 ring-2 ring-white" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`text-[22px] font-black tracking-tight ${light ? "text-white" : "text-ink-900"}`}>
          ترید<span className="text-gradient">چاره</span>
        </span>
        <span className={`text-[10px] font-bold tracking-[0.28em] ${light ? "text-sky-200" : "text-brand-600"}`}>
          TRADECHARE
        </span>
      </span>
    </a>
  );
}
