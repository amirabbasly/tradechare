"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { MEGA_MENU } from "@/lib/mega";
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
  const [mega, setMega] = useState(false);
  const [megaMobile, setMegaMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
          <p className="flex items-center gap-3 text-stone-200">
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
          scrolled || mega ? "glass shadow-card" : "bg-white/60 backdrop-blur-xl"
        } border-b border-brand-100/60`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="ناوبری اصلی">
            {/* mega trigger */}
            <div onMouseEnter={() => setMega(true)}>
              <button
                onClick={() => setMega(!mega)}
                aria-expanded={mega}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-black transition ${
                  mega ? "bg-brand-600 text-white shadow-soft" : "text-stone-600 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                تجارت
                <I name="down" className={`h-3.5 w-3.5 transition-transform ${mega ? "rotate-180" : ""}`} strokeWidth={2.5} />
              </button>
            </div>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setMega(false)}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-bold whitespace-nowrap text-stone-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href="/ai"
              className="group flex items-center gap-2 rounded-full border border-amber-300 bg-gradient-to-l from-brand-50 to-amber-50 px-4 py-2.5 text-[13px] font-black text-brand-700 shadow-sm transition hover:shadow-card"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-brand-600 text-white transition group-hover:scale-110">
                <I name="bot" className="h-3.5 w-3.5" />
              </span>
              چاره‌بات
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-500" />
            </a>
            <a
              href="/markets"
              className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-[13px] font-black whitespace-nowrap text-brand-700 shadow-sm transition hover:border-brand-300 hover:shadow-card"
            >
              <I name="trendUp" className="h-4 w-4" />
              نرخ لحظه‌ای ارز
            </a>
            <button
              onClick={openContact}
              className="btn-shine flex items-center gap-2 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 px-5 py-2.5 text-[13.5px] font-black whitespace-nowrap text-white shadow-soft transition hover:shadow-glow"
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

        {/* mega panel (desktop) */}
        {mega && (
          <div className="animate-fade-in absolute inset-x-0 top-full hidden lg:block" onMouseEnter={() => setMega(true)}>
            <div className="mx-auto max-w-7xl px-6 pb-6">
              <div className="glass-strong overflow-hidden rounded-[28px] border border-brand-100 shadow-soft">
                <div className="grid grid-cols-4 gap-6 p-7">
                  {MEGA_MENU.map((col) => (
                    <div key={col.title}>
                      <p className="flex items-center gap-2 text-[14px] font-black text-ink-900">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
                          <I name={col.icon} className="h-4.5 w-4.5" />
                        </span>
                        {col.title}
                      </p>
                      <p className="mt-1 text-[11.5px] font-bold text-stone-400">{col.desc}</p>
                      <ul className="mt-3 flex flex-col gap-1">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              onClick={() => setMega(false)}
                              className="group block rounded-2xl px-3 py-2.5 transition hover:bg-brand-50"
                            >
                              <span className="block text-[13.5px] font-black text-stone-700 transition group-hover:text-brand-700">
                                {l.title}
                              </span>
                              <span className="mt-0.5 block text-[11.5px] font-bold text-stone-400">{l.desc}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* featured */}
                  <div className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-brand-800 to-brand-950 p-6 text-white">
                    <div className="bg-grid-white absolute inset-0 opacity-40" />
                    <div className="animate-drift absolute -top-16 -left-16 h-48 w-48 rounded-full bg-amber-300/30 blur-3xl" />
                    <div className="relative">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-brand-500 shadow-glow">
                        <I name="calc" className="h-6 w-6" />
                      </span>
                      <p className="mt-3 text-[15px] font-black">حقوق گمرکی کالایتان چقدر می‌شود؟</p>
                      <p className="mt-1 text-[12px] leading-6 font-bold text-stone-300">
                        در ۳۰ ثانیه با ماشین‌حساب رسمی تریدچاره محاسبه کنید.
                      </p>
                    </div>
                    <a
                      href="/calculator"
                      onClick={() => setMega(false)}
                      className="btn-shine relative flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-[13.5px] font-black text-brand-800 transition hover:bg-brand-50"
                    >
                      محاسبه حقوق گمرکی
                      <I name="arrow" className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-brand-100 bg-brand-50/60 px-7 py-3">
                  <p className="text-[12px] font-bold text-stone-500">
                    بیش از ۲۵٬۰۰۰ پرونده موفق در ۴۸ گمرک سراسری
                  </p>
                  <a href="/services" onClick={() => setMega(false)} className="flex items-center gap-1.5 text-[12.5px] font-black text-brand-700 hover:text-brand-600">
                    مشاهده همه خدمات
                    <I name="arrow" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* mobile menu */}
        {menu && (
          <div className="glass-strong animate-fade-in max-h-[70vh] overflow-y-auto border-t border-brand-100 px-4 pt-2 pb-5 lg:hidden">
            {/* mobile mega accordion */}
            <button
              onClick={() => setMegaMobile(!megaMobile)}
              className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-l from-brand-600 to-brand-500 px-4 py-3 text-[15px] font-black text-white shadow-soft"
            >
              <span className="flex items-center gap-2">
                <I name="globe" className="h-5 w-5" />
                تجارت (واردات و صادرات)
              </span>
              <I name="down" className={`h-4 w-4 transition-transform ${megaMobile ? "rotate-180" : ""}`} strokeWidth={2.5} />
            </button>
            <div className={`faq-panel ${megaMobile ? "open" : ""}`}>
              <div className="faq-inner">
                <div className="flex flex-col gap-3 px-1 pt-3 pb-2">
                  {MEGA_MENU.map((col) => (
                    <div key={col.title} className="rounded-2xl border border-brand-100 bg-white p-3">
                      <p className="flex items-center gap-2 px-2 text-[14px] font-black text-ink-900">
                        <I name={col.icon} className="h-4.5 w-4.5 text-brand-600" />
                        {col.title}
                      </p>
                      {col.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          onClick={() => setMenu(false)}
                          className="mt-1 block rounded-xl px-3 py-2.5 text-[13.5px] font-bold text-stone-600 transition hover:bg-brand-50 hover:text-brand-700"
                        >
                          {l.title}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="mt-1 block rounded-2xl px-4 py-3 text-[15px] font-bold text-stone-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/ai"
              onClick={() => setMenu(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-amber-300 bg-gradient-to-l from-brand-50 to-amber-50 px-6 py-3 text-[14px] font-black text-brand-700"
            >
              <I name="bot" className="h-5 w-5" />
              چاره‌بات — هوش مصنوعی
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-500" />
            </a>
            <a
              href="/markets"
              onClick={() => setMenu(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-6 py-3 text-[14px] font-black text-brand-700"
            >
              <I name="trendUp" className="h-5 w-5" />
              نرخ لحظه‌ای ارز و طلا
            </a>
            <button
              onClick={() => {
                setMenu(false);
                openContact();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-700 to-brand-500 px-6 py-3.5 text-[15px] font-black text-white shadow-soft"
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
