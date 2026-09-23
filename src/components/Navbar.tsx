"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { I, Logo, useUI } from "./ui";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Tehran",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export default function Navbar() {
  const { openContact } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* announcement bar */}
      <div className="bg-gradient-to-l from-brand-950 via-brand-800 to-brand-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[12px] font-medium sm:px-6">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 animate-live rounded-full bg-green-400" />
            <span className="hidden sm:inline">سامانه ثبت سفارش و تخصیص ارز — پاسخ‌گویی ۲۴ ساعته، ۷ روز هفته</span>
            <span className="sm:hidden">پشتیبانی ۲۴ ساعته</span>
          </p>
          <p className="flex items-center gap-3 text-sky-200">
            <span className="hidden items-center gap-1.5 md:flex">
              <I name="clock" className="h-3.5 w-3.5" />
              تهران — <LiveClock />
            </span>
            <span className="hidden h-3 w-px bg-white/20 md:block" />
            <span dir="ltr" className="font-bold text-white">
              021-91006669
            </span>
          </p>
        </div>
      </div>

      {/* main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "glass shadow-card" : "bg-white/60 backdrop-blur-xl"
        } border-b border-brand-100/60`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[14px] font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href="/ai"
              className="group flex items-center gap-2 rounded-full border border-cyan-300 bg-gradient-to-l from-brand-50 to-cyan-50 px-4 py-2.5 text-[13px] font-black text-brand-700 shadow-sm transition hover:shadow-card"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-brand-600 text-white transition group-hover:scale-110">
                <I name="bot" className="h-3.5 w-3.5" />
              </span>
              چاره‌بات
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-500" />
            </a>
            <a
              href="/#rates"
              className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-[13px] font-black text-brand-700 shadow-sm transition hover:border-brand-300 hover:shadow-card"
            >
              <I name="trendUp" className="h-4 w-4" />
              نرخ لحظه‌ای ارز
            </a>
            <button
              onClick={openContact}
              className="btn-shine flex items-center gap-2 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 px-6 py-2.5 text-[14px] font-black text-white shadow-soft transition hover:shadow-glow"
            >
              <I name="phone" className="h-4 w-4" />
              تماس با ما
            </button>
          </div>

          <button
            onClick={() => setMenu(!menu)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-100 bg-white text-ink-900 lg:hidden"
            aria-label="منو"
          >
            <I name={menu ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>

        {/* mobile menu */}
        {menu && (
          <div className="glass-strong animate-fade-in border-t border-brand-100 px-4 pt-2 pb-5 lg:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="block rounded-2xl px-4 py-3 text-[15px] font-bold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/ai"
              onClick={() => setMenu(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-gradient-to-l from-brand-50 to-cyan-50 px-6 py-3 text-[14px] font-black text-brand-700"
            >
              <I name="bot" className="h-5 w-5" />
              چاره‌بات — هوش مصنوعی
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-500" />
            </a>
            <button
              onClick={() => {
                setMenu(false);
                openContact();
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-6 py-3.5 text-[15px] font-black text-white shadow-soft"
            >
              <I name="phone" className="h-5 w-5" />
              تماس با ما
            </button>
          </div>
        )}
        <div className="nav-line" />
      </div>
    </header>
  );
}
