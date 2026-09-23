"use client";

import { useMemo, useRef, useState } from "react";
import { RATES } from "@/lib/data";
import { formatUpdateTime, useRates } from "@/lib/useRates";
import type { NormItem } from "@/lib/upstream";
import { I, Reveal, SectionHead } from "./ui";

/* ================= seeded market engine ================= */

type Candle = { o: number; h: number; l: number; c: number; v: number };

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TF = {
  "1H": { label: "۱ ساعته", n: 60, vol: 0.0014 },
  "1D": { label: "۱ روزه", n: 84, vol: 0.004 },
  "1W": { label: "۱ هفته", n: 70, vol: 0.009 },
  "1M": { label: "۱ ماهه", n: 60, vol: 0.02 },
} as const;
type TFKey = keyof typeof TF;

/** درصد تغییر نماد — از داده واقعی یا مشتق قطعی از کد نماد */
function changeOf(item: NormItem): number {
  const fb = RATES.find((r) => r.code === item.code);
  if (fb) return fb.change;
  return Math.round((((hashStr(item.code + item.name) % 300) / 100) - 1.5) * 100) / 100;
}

/** ساخت تاریخچه OHLC نمایشی که دقیقاً به قیمت فعلی ختم می‌شود */
function genHistory(item: NormItem, tf: TFKey): Candle[] {
  const { n, vol } = TF[tf];
  const rand = mulberry32(hashStr(item.code + item.name + tf));
  const end = item.toman;
  const chg = changeOf(item) / 100;
  const start = chg > -0.99 ? end / (1 + chg) : end;
  const drift = (end - start) / n;
  let p = start;
  const closes: number[] = [];
  for (let i = 0; i < n; i++) {
    p += drift + (rand() - 0.5) * end * vol * 2;
    closes.push(p);
  }
  const err = end - closes[n - 1];
  const fixed = closes.map((c, i) => Math.max(c + (err * (i + 1)) / n, end * 0.5));
  return fixed.map((c, i) => {
    const o = i === 0 ? start : fixed[i - 1];
    const spread = Math.abs(c - o) + end * vol * (0.4 + rand());
    return {
      o,
      c,
      h: Math.max(o, c) + (spread * rand()) / 2,
      l: Math.min(o, c) - (spread * rand()) / 2,
      v: 20 + rand() * 80,
    };
  });
}

function useTimeLabels(tf: TFKey): string[] {
  return useMemo(() => {
    const now = Date.now();
    const fmtT = new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit" });
    const fmtD = new Intl.DateTimeFormat("fa-IR", { weekday: "short" });
    const fmtM = new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "short" });
    const step = tf === "1H" ? 15 * 60e3 : tf === "1D" ? 6 * 3600e3 : tf === "1W" ? 24 * 3600e3 : 7 * 24 * 3600e3;
    return Array.from({ length: 5 }, (_, i) => {
      const t = new Date(now - step * (4 - i));
      return tf === "1W" ? fmtD.format(t) : tf === "1M" ? fmtM.format(t) : fmtT.format(t);
    });
  }, [tf]);
}

/* ================= sparkline ================= */

function Spark({ data, up, className = "h-9 w-24" }: { data: number[]; up: boolean; className?: string }) {
  const pts = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const r = max - min || 1;
    return data.map((v, i) => `${(i / (data.length - 1)) * 96},${30 - ((v - min) / r) * 26}`).join(" ");
  }, [data]);
  const c = up ? "#34d399" : "#f87171";
  return (
    <svg viewBox="0 0 96 32" className={className} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={c} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={96} cy={Number(pts.split(" ").pop()?.split(",")[1] ?? 16)} r={2.6} fill={c} />
    </svg>
  );
}

/* ================= candlestick chart ================= */

function CandleChart({ item, tf }: { item: NormItem; tf: TFKey }) {
  const data = useMemo(() => genHistory(item, tf), [item.code, item.name, item.toman, tf]);
  const [hover, setHover] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const W = 800;
  const H = 300;
  const min = Math.min(...data.map((d) => d.l));
  const max = Math.max(...data.map((d) => d.h));
  const pad = (max - min) * 0.14 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const y = (v: number) => H - 46 - ((v - lo) / (hi - lo)) * (H - 78);
  const step = W / data.length;
  const cw = Math.max(step * 0.58, 2.2);
  const vmax = Math.max(...data.map((d) => d.v));

  const last = data[data.length - 1];
  const first = data[0];
  const up = last.c >= first.o;
  const ink = up ? "#34d399" : "#f87171";
  const gid = `area-${hashStr(item.code + tf)}`;

  const line = data.map((d, i) => `${((i + 0.5) * step).toFixed(1)},${y(d.c).toFixed(1)}`).join(" L");
  const ticks = [0.06, 0.36, 0.64, 0.92].map((f) => lo + (hi - lo) * f);
  const times = useTimeLabels(tf);

  const onMove = (e: React.MouseEvent) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(data.length - 1, Math.floor(x / step))));
  };

  const hc = hover !== null ? data[hover] : null;

  return (
    <div>
      <div ref={boxRef} dir="ltr" onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative aspect-[800/300] w-full cursor-crosshair select-none">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ink} stopOpacity="0.32" />
              <stop offset="100%" stopColor={ink} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grid */}
          {ticks.map((t, i) => (
            <line key={i} x1={0} x2={W} y1={y(t)} y2={y(t)} stroke="#fff" strokeOpacity="0.06" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}

          {/* area */}
          <path d={`M0,${H - 46} L${line} L${W},${H - 46} Z`} fill={`url(#${gid})`} />
          <path d={`M${line}`} fill="none" stroke={ink} strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

          {/* volume */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={(i + 0.5) * step - cw / 2}
              y={H - 40}
              width={cw}
              height={Math.max((d.v / vmax) * 30, 2)}
              rx={1}
              fill={d.c >= d.o ? "#34d399" : "#f87171"}
              opacity={0.28}
            />
          ))}

          {/* candles */}
          {data.map((d, i) => {
            const cx = (i + 0.5) * step;
            const isUp = d.c >= d.o;
            const col = isUp ? "#10b981" : "#ef4444";
            return (
              <g key={i} opacity={hover === null || hover === i ? 1 : 0.45}>
                <line x1={cx} x2={cx} y1={y(d.h)} y2={y(d.l)} stroke={col} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
                <rect
                  x={cx - cw / 2}
                  y={y(Math.max(d.o, d.c))}
                  width={cw}
                  height={Math.max(Math.abs(y(d.o) - y(d.c)), 1.6)}
                  rx={1}
                  fill={col}
                />
              </g>
            );
          })}

          {/* last price line */}
          <line x1={0} x2={W} y1={y(last.c)} y2={y(last.c)} stroke="#22d3ee" strokeOpacity="0.7" strokeDasharray="5 4" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />

          {/* crosshair */}
          {hover !== null && hc && (
            <g>
              <line x1={(hover + 0.5) * step} x2={(hover + 0.5) * step} y1={0} y2={H - 40} stroke="#fff" strokeOpacity="0.35" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <line x1={0} x2={W} y1={y(hc.c)} y2={y(hc.c)} stroke="#fff" strokeOpacity="0.2" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <circle cx={(hover + 0.5) * step} cy={y(hc.c)} r={4} fill={ink} stroke="#0a1c44" strokeWidth={2} />
            </g>
          )}
        </svg>

        {/* price axis */}
        {ticks.map((t, i) => (
          <span
            key={i}
            className="absolute right-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-black text-sky-200/70 tabular-nums backdrop-blur"
            style={{ top: `${(y(t) / H) * 100}%`, transform: "translateY(-50%)" }}
          >
            {Math.round(t).toLocaleString("fa-IR")}
          </span>
        ))}

        {/* last price tag */}
        <span
          className="absolute right-1 rounded-md bg-cyan-400 px-1.5 py-0.5 text-[10px] font-black text-brand-950 tabular-nums"
          style={{ top: `${(y(last.c) / H) * 100}%`, transform: "translateY(-50%)" }}
        >
          {last.c.toLocaleString("fa-IR", { maximumFractionDigits: 0 })}
        </span>

        {/* tooltip */}
        {hover !== null && hc && (
          <div
            dir="rtl"
            className="glass-dark pointer-events-none absolute z-10 w-44 rounded-2xl border border-white/15 p-3 text-[11.5px] shadow-soft"
            style={{
              left: `${Math.min(Math.max(((hover + 0.5) / data.length) * 100, 12), 82)}%`,
              top: "6%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-bold tabular-nums">
              <span className="text-sky-200/60">باز شدن</span>
              <span className="text-left text-white">{Math.round(hc.o).toLocaleString("fa-IR")}</span>
              <span className="text-sky-200/60">بالاترین</span>
              <span className="text-left text-green-300">{Math.round(hc.h).toLocaleString("fa-IR")}</span>
              <span className="text-sky-200/60">پایین‌ترین</span>
              <span className="text-left text-red-300">{Math.round(hc.l).toLocaleString("fa-IR")}</span>
              <span className="text-sky-200/60">بسته شدن</span>
              <span className="text-left font-black text-white">{Math.round(hc.c).toLocaleString("fa-IR")}</span>
            </div>
          </div>
        )}
      </div>

      {/* time axis */}
      <div dir="ltr" className="mt-1 flex items-center justify-between px-1 text-[10.5px] font-bold text-sky-200/50 tabular-nums">
        {times.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ================= ticker tape ================= */

function Tape({ items }: { items: NormItem[] }) {
  const list = [...items.slice(0, 12), ...items.slice(0, 12)];
  return (
    <div className="marquee-hover relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 py-2.5" dir="ltr">
      <div className="animate-marquee-fast flex w-max items-center gap-8 pr-8">
        {list.map((r, i) => {
          const chg = changeOf(r);
          const up = chg >= 0;
          return (
            <span key={`${r.code}-${i}`} dir="rtl" className="flex items-center gap-2 text-[12.5px] font-black whitespace-nowrap">
              <span>{r.flag}</span>
              <span className="text-white">{r.name}</span>
              <span className="text-sky-200/80 tabular-nums">{r.toman.toLocaleString("fa-IR")}</span>
              <span className={`tabular-nums ${up ? "text-green-400" : "text-red-400"}`} dir="ltr">
                {up ? "▲" : "▼"} {Math.abs(chg).toLocaleString("fa-IR")}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ================= watchlist row ================= */

function WatchRow({
  item,
  selected,
  onSelect,
}: {
  item: NormItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const hist = useMemo(
    () => genHistory(item, "1D").map((d) => d.c),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.code, item.name, item.toman]
  );
  const c = changeOf(item);
  const isUp = c >= 0;
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-2.5 rounded-2xl border p-2.5 text-start transition ${
        selected ? "border-cyan-300/60 bg-cyan-400/10 shadow-glow" : "border-transparent hover:bg-white/5"
      }`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-xl">{item.flag}</span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[13px] font-black text-white">{item.name}</span>
        <span className="mt-0.5 block text-[12px] font-black text-sky-200/80 tabular-nums">
          {item.toman.toLocaleString("fa-IR")} <span className="text-[10px] font-bold text-sky-200/40">تومان</span>
        </span>
      </span>
      <span className="hidden shrink-0 xl:block">
        <Spark data={hist} up={isUp} className="h-8 w-20" />
      </span>
      <span className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[12px] font-black tabular-nums ${isUp ? "bg-green-400/15 text-green-300" : "bg-red-400/15 text-red-300"}`} dir="ltr">
        {isUp ? "+" : "−"}{Math.abs(c).toLocaleString("fa-IR")}%
      </span>
    </button>
  );
}

/* ================= main section ================= */

export function Rates() {
  const [tab, setTab] = useState<"arz" | "tala">("arz");
  const [tf, setTf] = useState<TFKey>("1D");
  const arz = useRates("arz");
  const tala = useRates("tala");
  const active = tab === "arz" ? arz : tala;

  const [selCode, setSelCode] = useState<string | null>(null);
  const selected = active.items.find((i) => i.code === selCode) ?? active.items[0];
  const chg = selected ? changeOf(selected) : 0;
  const up = chg >= 0;

  const movers = useMemo(
    () => [...active.items].sort((a, b) => changeOf(b) - changeOf(a)),
    [active.items]
  );
  const gainers = movers.slice(0, 3);
  const losers = [...movers].reverse().slice(0, 3);

  const selHistory = useMemo(
    () => (selected ? genHistory(selected, "1D") : []),
    [selected?.code, selected?.name, selected?.toman]
  );
  const dayHigh = selHistory.length ? Math.max(...selHistory.map((d) => d.h)) : 0;
  const dayLow = selHistory.length ? Math.min(...selHistory.map((d) => d.l)) : 0;
  const buyers = Math.round(Math.min(Math.max(50 + chg * 9, 12), 88));

  return (
    <section id="rates" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050d20] via-brand-950 to-[#050d20]" />
      <div className="bg-grid-white absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
      <div className="animate-drift absolute top-20 right-1/4 h-96 w-96 rounded-full bg-brand-600/25 blur-[130px]" />
      <div className="animate-drift absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px] [animation-delay:2.5s]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          dark
          eyebrow="تالار معاملات تریدچاره"
          title={
            <>
              بورس ارز و طلا، <span className="text-gradient-light">زنده و لحظه‌ای</span>
            </>
          }
          desc="قیمت‌ها مستقیم از بازار دریافت می‌شوند؛ نماد موردنظرتان را از دیده‌بان انتخاب کنید تا نمودار تکنیکال آن را ببینید."
        />

        {/* controls */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex w-full gap-2 rounded-3xl border border-white/10 bg-white/5 p-1.5 backdrop-blur sm:w-auto">
              <button
                onClick={() => {
                  setTab("arz");
                  setSelCode(null);
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-[14px] font-black transition sm:flex-none ${
                  tab === "arz" ? "bg-gradient-to-l from-cyan-400 to-brand-500 text-white shadow-glow" : "text-sky-200/70 hover:bg-white/10"
                }`}
              >
                💱 تابلوی ارز
                <span className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${tab === "arz" ? "bg-white/25" : "bg-white/10"}`}>
                  {arz.items.length.toLocaleString("fa-IR")}
                </span>
              </button>
              <button
                onClick={() => {
                  setTab("tala");
                  setSelCode(null);
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-[14px] font-black transition sm:flex-none ${
                  tab === "tala" ? "bg-gradient-to-l from-amber-400 to-orange-500 text-white shadow-glow" : "text-sky-200/70 hover:bg-white/10"
                }`}
              >
                ✨ تابلوی طلا و سکه
                <span className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${tab === "tala" ? "bg-white/25" : "bg-white/10"}`}>
                  {tala.items.length.toLocaleString("fa-IR")}
                </span>
              </button>
            </div>
            <p
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-black backdrop-blur ${
                active.live ? "border-green-400/30 bg-green-400/10 text-green-300" : "border-amber-400/30 bg-amber-400/10 text-amber-300"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${active.live ? "animate-live bg-green-400" : "bg-amber-400"}`} />
              {active.live ? `متصل به بازار — ${formatUpdateTime(active.updatedAt)}` : "حالت آفلاین — آخرین نرخ‌های ثبت‌شده"}
            </p>
          </div>
        </Reveal>

        {/* tape */}
        <Reveal delay={120} className="mt-5">
          <Tape items={active.items} />
        </Reveal>

        {/* terminal */}
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.65fr_1fr]">
          {/* chart panel */}
          <Reveal className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-soft backdrop-blur-xl">
              {/* symbol header */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">{selected?.flag}</span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-black text-white">{selected?.name}</span>
                    <span className="mt-0.5 block text-[11px] font-bold text-sky-200/60" dir="ltr">
                      {selected?.code}/IRR • {tab === "arz" ? "FOREX" : "GOLD"}
                    </span>
                  </span>
                </div>
                <div className="mr-auto flex items-center gap-3">
                  <div className="text-left leading-tight">
                    <p className="text-[22px] font-black text-white tabular-nums sm:text-[26px]">
                      {selected?.toman.toLocaleString("fa-IR")}
                    </p>
                    <p className="text-[11px] font-bold text-sky-200/60">تومان • قیمت لحظه‌ای</p>
                  </div>
                  <span className={`flex items-center gap-1 rounded-2xl px-3 py-2 text-[13px] font-black tabular-nums ${up ? "bg-green-400/15 text-green-300" : "bg-red-400/15 text-red-300"}`}>
                    <I name={up ? "trendUp" : "trendDown"} className="h-4 w-4" />
                    <span dir="ltr">{up ? "+" : "−"}{Math.abs(chg).toLocaleString("fa-IR")}%</span>
                  </span>
                </div>
              </div>

              {/* bid/ask + day range */}
              <div className="grid grid-cols-2 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-4">
                {[
                  { l: "قیمت خرید", v: selected ? Math.round(selected.toman * 0.9985).toLocaleString("fa-IR") : "—", c: "text-green-300" },
                  { l: "قیمت فروش", v: selected?.toman.toLocaleString("fa-IR") ?? "—", c: "text-red-300" },
                  { l: "بالاترین روز", v: dayHigh ? Math.round(dayHigh).toLocaleString("fa-IR") : "—", c: "text-white" },
                  { l: "پایین‌ترین روز", v: dayLow ? Math.round(dayLow).toLocaleString("fa-IR") : "—", c: "text-white" },
                ].map((s) => (
                  <div key={s.l} className="bg-[#0a1836]/80 px-4 py-3">
                    <p className="text-[11px] font-bold text-sky-200/50">{s.l}</p>
                    <p className={`mt-0.5 text-[15px] font-black tabular-nums ${s.c}`}>{s.v}</p>
                  </div>
                ))}
              </div>

              {/* timeframe */}
              <div className="flex items-center gap-2 overflow-x-auto px-5 pt-4 sm:px-6">
                {(Object.keys(TF) as TFKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTf(k)}
                    className={`shrink-0 rounded-xl px-4 py-2 text-[12.5px] font-black transition ${
                      tf === k ? "bg-cyan-400 text-brand-950 shadow-glow" : "bg-white/5 text-sky-200/70 hover:bg-white/10"
                    }`}
                  >
                    {TF[k].label}
                  </button>
                ))}
                <span className="mr-auto hidden items-center gap-1.5 text-[11.5px] font-bold text-sky-200/50 sm:flex">
                  <I name="chart" className="h-4 w-4" />
                  نمودار کندل‌استیک + حجم معاملات
                </span>
              </div>

              <div className="px-3 pt-2 pb-4 sm:px-4">
                {selected && <CandleChart key={`${selected.code}-${tf}-${tab}`} item={selected} tf={tf} />}
              </div>
            </div>
          </Reveal>

          {/* watchlist */}
          <Reveal delay={140} className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="flex items-center gap-2 text-[14px] font-black text-white">
                  <I name="star" className="h-4 w-4 text-amber-300" />
                  دیده‌بان بازار
                </p>
                <p className="text-[11px] font-bold text-sky-200/50">برای نمودار کلیک کنید</p>
              </div>
              <div className="chat-scroll max-h-[548px] overflow-y-auto p-2.5">
                {active.items.map((r) => (
                  <WatchRow
                    key={`${r.code}-${r.name}`}
                    item={r}
                    selected={selected?.code === r.code && selected?.name === r.name}
                    onSelect={() => setSelCode(r.code)}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* movers + depth */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[26px] border border-green-400/20 bg-green-400/[0.06] p-5 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 text-[14px] font-black text-green-300">
                <I name="trendUp" className="h-5 w-5" />
                صعودی‌ترین نمادها
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                {gainers.map((g) => (
                  <button key={g.code + g.name} onClick={() => setSelCode(g.code)} className="flex items-center gap-2.5 rounded-2xl bg-black/20 px-3.5 py-2.5 text-[13px] font-black text-white transition hover:bg-black/35">
                    <span className="text-lg">{g.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-start">{g.name}</span>
                    <span className="text-green-300 tabular-nums" dir="ltr">+{changeOf(g).toLocaleString("fa-IR")}%</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="h-full rounded-[26px] border border-red-400/20 bg-red-400/[0.06] p-5 backdrop-blur-xl">
              <h3 className="flex items-center gap-2 text-[14px] font-black text-red-300">
                <I name="trendDown" className="h-5 w-5" />
                نزولی‌ترین نمادها
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                {losers.map((g) => (
                  <button key={g.code + g.name} onClick={() => setSelCode(g.code)} className="flex items-center gap-2.5 rounded-2xl bg-black/20 px-3.5 py-2.5 text-[13px] font-black text-white transition hover:bg-black/35">
                    <span className="text-lg">{g.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-start">{g.name}</span>
                    <span className="text-red-300 tabular-nums" dir="ltr">{changeOf(g).toLocaleString("fa-IR")}%</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex h-full flex-col gap-4 rounded-[26px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div>
                <h3 className="flex items-center gap-2 text-[14px] font-black text-white">
                  <I name="chart" className="h-5 w-5 text-cyan-300" />
                  عمق بازار {selected?.name}
                </h3>
                <div className="mt-3 flex h-3.5 overflow-hidden rounded-full bg-white/10" dir="ltr">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-700" style={{ width: `${buyers}%` }} />
                  <div className="h-full flex-1 bg-gradient-to-r from-red-400 to-red-500 transition-all duration-700" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px] font-black tabular-nums">
                  <span className="text-green-300">🟢 خریداران {buyers.toLocaleString("fa-IR")}٪</span>
                  <span className="text-red-300">فروشندگان {(100 - buyers).toLocaleString("fa-IR")}٪ 🔴</span>
                </div>
              </div>
              <a
                href="/calculator"
                className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-cyan-400 to-brand-500 px-4 py-3 text-[13.5px] font-black text-white shadow-glow transition hover:brightness-110"
              >
                <I name="calc" className="h-4.5 w-4.5" />
                مبدل ارز و ماشین‌حساب گمرکی
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
