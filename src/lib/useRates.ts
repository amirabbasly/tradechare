"use client";

import { useEffect, useState } from "react";
import { RATES, TALA_FALLBACK } from "./data";
import type { NormItem } from "./upstream";

export type RatesState = {
  items: NormItem[];
  live: boolean;
  updatedAt: string | null;
};

const ARZ_FALLBACK: NormItem[] = RATES.map((r) => ({
  name: r.name,
  code: r.code,
  flag: r.flag,
  rial: r.sell * 10,
  toman: r.sell,
}));

const TALA_FB: NormItem[] = TALA_FALLBACK.map((t) => ({
  name: t.name,
  code: t.code,
  flag: t.flag,
  rial: t.toman * 10,
  toman: t.toman,
}));

/** نرخ زنده از API نکست (با fallback آفلاین) — هر ۵ دقیقه تازه‌سازی */
export function useRates(kind: "arz" | "tala"): RatesState {
  const [state, setState] = useState<RatesState>({
    items: kind === "arz" ? ARZ_FALLBACK : TALA_FB,
    live: false,
    updatedAt: null,
  });

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/${kind}`, { cache: "no-store" });
        const json = await res.json();
        if (alive && Array.isArray(json?.items) && json.items.length > 0) {
          setState({
            items: json.items as NormItem[],
            live: json.source === "live",
            updatedAt: (json.updatedAt as string) ?? null,
          });
        }
      } catch {
        /* keep fallback */
      }
    };
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [kind]);

  return state;
}

export function formatUpdateTime(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      timeZone: "Asia/Tehran",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
