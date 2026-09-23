"use client";

import { I } from "./ui";

/** گوی انیمیشنی چاره‌بات — هسته مورف‌شونده + هاله‌های چرخان */
export function AiOrb({
  size = 180,
  className = "",
  active = false,
}: {
  size?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`ai-orb ${active ? "ai-orb-active" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="ai-orb-glow" />
      <span className="ai-orb-halo h1" />
      <span className="ai-orb-halo h2" />
      <span className="ai-orb-core" />
      <span className="ai-orb-face">
        <I name="bot" className="h-1/2 w-1/2 text-white drop-shadow-lg" strokeWidth={1.6} />
      </span>
    </div>
  );
}

/** موج صوتی اکولایزر */
export function AiWaves({ className = "" }: { className?: string }) {
  return (
    <span className={`eq ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span key={i} style={{ animationDelay: `${i * 130}ms`, animationDuration: `${900 + (i % 3) * 220}ms` }} />
      ))}
    </span>
  );
}

/** حلقه مداری آیکون‌ها دور یک مرکز */
export function OrbitRing({
  size = 420,
  duration = 28,
  badges,
  className = "",
}: {
  size?: number;
  duration?: number;
  badges: { icon: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`orbit-ring ${className}`}
      style={{ width: size, height: size, ["--orbit-duration" as string]: `${duration}s` }}
      aria-hidden="true"
    >
      {badges.map((b, i) => (
        <span
          key={b.label}
          className="orbit-item"
          style={{ transform: `rotate(${(360 / badges.length) * i}deg) translateX(${size / 2}px)` }}
        >
          <span className="orbit-item-inner">
            <I name={b.icon} className="h-5 w-5" />
            <em>{b.label}</em>
          </span>
        </span>
      ))}
    </div>
  );
}
