import { RATES, TALA_FALLBACK } from "./data";

export type NormItem = {
  name: string;
  code: string;
  flag: string;
  /** قیمت به ریال (خام API) */
  rial: number;
  /** قیمت به تومان */
  toman: number;
};

export type RatesPayload = {
  ok: boolean;
  source: "live" | "fallback";
  updatedAt: string;
  count: number;
  items: NormItem[];
};

type UpstreamRow = {
  name?: string;
  price?: string;
  change?: string;
  low?: string;
  High?: string;
  update?: string;
};

const ARZ_MATCH: { re: RegExp; code: string; flag: string; order: number }[] = [
  { re: /نیما/, code: "NIMA", flag: "🏦", order: 90 },
  { re: /توافقی/, code: "TAVAFOGHI", flag: "🏦", order: 91 },
  { re: /حواله/, code: "HAVALEH", flag: "🏦", order: 92 },
  { re: /دلار.*کانادا/, code: "CAD", flag: "🇨🇦", order: 20 },
  { re: /دلار.*استرالیا/, code: "AUD", flag: "🇦🇺", order: 21 },
  { re: /دلار/, code: "USD", flag: "🇺🇸", order: 0 },
  { re: /یورو/, code: "EUR", flag: "🇪🇺", order: 1 },
  { re: /درهم/, code: "AED", flag: "🇦🇪", order: 2 },
  { re: /تتر/, code: "USDT", flag: "🪙", order: 3 },
  { re: /پوند/, code: "GBP", flag: "🇬🇧", order: 4 },
  { re: /لیر/, code: "TRY", flag: "🇹🇷", order: 5 },
  { re: /یوان|یوآن/, code: "CNY", flag: "🇨🇳", order: 6 },
  { re: /دینار/, code: "IQD", flag: "🇮🇶", order: 7 },
  { re: /روبل/, code: "RUB", flag: "🇷🇺", order: 8 },
  { re: /فرانک/, code: "CHF", flag: "🇨🇭", order: 9 },
  { re: /کرون.*سوئد/, code: "SEK", flag: "🇸🇪", order: 10 },
  { re: /کرون.*نروژ/, code: "NOK", flag: "🇳🇴", order: 11 },
  { re: /کرون.*دانمارک/, code: "DKK", flag: "🇩🇰", order: 12 },
  { re: /کرون/, code: "KRW", flag: "🇰🇷", order: 13 },
  { re: /روپیه.*هند/, code: "INR", flag: "🇮🇳", order: 14 },
  { re: /روپیه/, code: "PKR", flag: "🇵🇰", order: 15 },
  { re: /ین ژاپن|ین/, code: "JPY", flag: "🇯🇵", order: 16 },
  { re: /ریال.*عمان/, code: "OMR", flag: "🇴🇲", order: 17 },
  { re: /ریال.*قطر/, code: "QAR", flag: "🇶🇦", order: 18 },
  { re: /ریال.*عربستان/, code: "SAR", flag: "🇸🇦", order: 19 },
  { re: /دولار.*هنگ|هنگ‌کنگ/, code: "HKD", flag: "🇭🇰", order: 22 },
  { re: /بیت‌کوین|بیت کوین/, code: "BTC", flag: "₿", order: 80 },
  { re: /اتریوم/, code: "ETH", flag: "💎", order: 81 },
];

const TALA_MATCH: { re: RegExp; code: string; flag: string; order: number }[] = [
  { re: /18 عیار|۱۸ عیار/, code: "GOLD18", flag: "✨", order: 0 },
  { re: /24 عیار|۲۴ عیار/, code: "GOLD24", flag: "✨", order: 1 },
  { re: /مثقال|مظنه/, code: "MESGHAL", flag: "✨", order: 1 },
  { re: /امامی/, code: "SEKEH", flag: "🪙", order: 2 },
  { re: /بهار آزادی/, code: "BAHAR", flag: "🪙", order: 3 },
  { re: /نیم سکه|نیم‌سکه/, code: "NIM", flag: "🪙", order: 4 },
  { re: /ربع سکه|ربع‌سکه/, code: "ROB", flag: "🪙", order: 5 },
  { re: /گرمی/, code: "GERAMI", flag: "🪙", order: 6 },
  { re: /سکه/, code: "COIN", flag: "🪙", order: 7 },
  { re: /طلا/, code: "GOLD", flag: "✨", order: 8 },
  { re: /نقره/, code: "SILVER", flag: "⚪", order: 9 },
  { re: /پلاتین/, code: "PLATINUM", flag: "🔘", order: 10 },
];

function parseRial(price?: string): number | null {
  if (!price) return null;
  const digits = price.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return n > 0 ? n : null;
}

function normalize(kind: "arz" | "tala", rows: unknown): NormItem[] {
  if (!Array.isArray(rows)) return [];
  const table = kind === "arz" ? ARZ_MATCH : TALA_MATCH;
  const seen = new Set<string>();
  const out: (NormItem & { order: number })[] = [];

  rows.forEach((row, idx) => {
    const r = row as UpstreamRow;
    const name = r?.name?.trim();
    const rial = parseRial(r?.price);
    if (!name || !rial || seen.has(name)) return;
    seen.add(name);
    const hit = table.find((t) => t.re.test(name));
    out.push({
      name,
      code: hit?.code ?? `X${idx}`,
      flag: hit?.flag ?? (kind === "arz" ? "💱" : "✨"),
      rial,
      toman: Math.round(rial / 10),
      order: hit?.order ?? 50,
    });
  });

  return out
    .sort((a, b) => a.order - b.order)
    .map(({ order: _order, ...item }) => item);
}

function fallbackItems(kind: "arz" | "tala"): NormItem[] {
  if (kind === "arz") {
    return RATES.map((r) => ({
      name: r.name,
      code: r.code,
      flag: r.flag,
      rial: r.sell * 10,
      toman: r.sell,
    }));
  }
  return TALA_FALLBACK.map((t) => ({
    name: t.name,
    code: t.code,
    flag: t.flag,
    rial: t.toman * 10,
    toman: t.toman,
  }));
}

export async function getRates(kind: "arz" | "tala"): Promise<RatesPayload> {
  const fallback = fallbackItems(kind);
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    const res = await fetch(`http://api.codebazan.ir/arz/?type=${kind}`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`upstream status ${res.status}`);
    const json = (await res.json()) as { Ok?: boolean; Result?: unknown };
    const items = normalize(kind, json?.Result);
    if (!items.length) throw new Error("empty upstream");
    return {
      ok: true,
      source: "live",
      updatedAt: new Date().toISOString(),
      count: items.length,
      items,
    };
  } catch {
    return {
      ok: true,
      source: "fallback",
      updatedAt: new Date().toISOString(),
      count: fallback.length,
      items: fallback,
    };
  }
}
