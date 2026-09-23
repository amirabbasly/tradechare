"use client";

import { useEffect, useRef, useState } from "react";
import { CHAT_SUGGESTIONS } from "@/lib/chatBrain";
import { useChat, type ChatMsg } from "@/lib/useChat";
import { AiOrb, AiWaves } from "./AiOrb";
import { I, Reveal, SectionHead, useUI } from "./ui";

/* ================= Shared live chat panel ================= */

function MsgBubble({ m, onContact }: { m: ChatMsg; onContact: () => void }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-start">
        <p className="max-w-[88%] rounded-2xl rounded-tr-md bg-gradient-to-l from-brand-600 to-brand-500 px-4 py-2.5 text-[13px] leading-7 font-bold text-white shadow-md sm:text-[13.5px]">
          {m.content}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end gap-1.5">
      <p className="max-w-[92%] rounded-2xl rounded-tl-md border border-brand-100 bg-white px-4 py-2.5 text-[12.5px] leading-7 font-medium whitespace-pre-line text-slate-700 shadow-sm sm:text-[13px]">
        {m.content}
      </p>
      {m.action === "contact" && (
        <button
          onClick={onContact}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 px-4 py-2 text-[12px] font-black text-white shadow-soft transition hover:shadow-glow"
        >
          <I name="phone" className="h-3.5 w-3.5" />
          تماس با کارشناس
        </button>
      )}
    </div>
  );
}

export function ChatPanel({
  chat,
  height = 340,
  suggestions = CHAT_SUGGESTIONS.slice(0, 4),
}: {
  chat: ReturnType<typeof useChat>;
  height?: number;
  suggestions?: string[];
}) {
  const { messages, typing, send, mode } = chat;
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const { openContact } = useUI();

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-soft">
      <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-l from-brand-800 to-brand-600 px-5 py-3.5 text-white">
        <div className="bg-grid-white absolute inset-0 opacity-40" />
        <AiOrb size={46} className="relative" active={typing} />
        <span className="relative leading-tight">
          <span className="flex items-center gap-2 text-[14.5px] font-black">
            چاره‌بات
            <AiWaves className="eq-light" />
          </span>
          <span className="mt-0.5 block text-[11.5px] font-bold text-sky-200">
            {mode === "live" ? "متصل به هوش مصنوعی" : mode === "offline" ? "حالت هوشمند آفلاین" : "آنلاین — پاسخ در چند ثانیه"}
          </span>
        </span>
        <span
          className={`relative mr-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black ${
            mode === "offline" ? "bg-amber-400/90 text-amber-950" : "bg-green-400/90 text-green-950"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${mode === "offline" ? "bg-amber-900" : "animate-live bg-green-900"}`} />
          {mode === "offline" ? "آفلاین" : "زنده"}
        </span>
      </div>

      <div ref={bodyRef} className="chat-scroll space-y-3 overflow-y-auto bg-gradient-to-b from-brand-50/70 to-white px-4 py-4" style={{ height }}>
        {messages.map((m, i) => (
          <MsgBubble key={i} m={m} onContact={openContact} />
        ))}
        {typing && (
          <div className="flex justify-end">
            <span className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-brand-100 bg-white px-4 py-3 shadow-sm">
              <AiWaves />
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-brand-50 bg-white px-3 py-2.5">
        {suggestions.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            disabled={typing}
            className="shrink-0 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black whitespace-nowrap text-brand-700 transition hover:bg-brand-100 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            send(input);
            setInput("");
          }
        }}
        className="flex items-center gap-2 border-t border-brand-50 bg-white px-3 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="سؤال بازرگانی خود را بپرسید…"
          className="flex-1 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-2.5 text-[13.5px] font-bold text-ink-900 outline-none placeholder:font-bold placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
        />
        <button
          type="submit"
          aria-label="ارسال"
          disabled={!input.trim() || typing}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-soft transition hover:shadow-glow disabled:opacity-40"
        >
          <I name="send" className="h-5 w-5 -scale-x-100" />
        </button>
      </form>
    </div>
  );
}

/* ================= Homepage AI section (redesigned) ================= */

const FEATS = [
  { icon: "search", t: "تشخیص هوشمند HS Code", d: "تشخیص کد تعرفه از روی نام، عکس و کاتالوگ کالا با دقت ۹۷٪" },
  { icon: "calc", t: "محاسبه دقیق هزینه‌ها", d: "حقوق ورودی، عوارض، مالیات و کارمزدها را لحظه‌ای و شفاف ببینید" },
  { icon: "chart", t: "پیش‌بینی بازار ارز", d: "تحلیل روند نرخ‌ها و پیشنهاد بهترین زمان خرید و تخصیص ارز" },
  { icon: "clock", t: "پیش‌بینی زمان ترخیص", d: "تخمین دقیق زمان ترخیص بر اساس گمرک، فصل و نوع کالا" },
];

export function AiSection() {
  const chat = useChat();
  const { setChatOpen } = useUI();

  return (
    <section id="ai" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-[#0d2557] to-brand-950" />
      <div className="bg-grid-white absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
      <div className="animate-drift absolute top-10 right-10 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="animate-drift absolute bottom-10 left-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px] [animation-delay:3s]" />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 53.7 + 11) % 100}%`,
              top: `${(i * 37.3 + 7) % 100}%`,
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              animationDelay: `${(i * 0.6) % 4}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* orb + copy */}
          <div>
            <Reveal className="flex items-center gap-5">
              <AiOrb size={120} active={chat.typing} />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12.5px] font-black text-cyan-200">
                  <span className="h-1.5 w-1.5 animate-live rounded-full bg-green-400" />
                  هوش مصنوعی اختصاصی بازرگانی
                </span>
                <h2 className="mt-3 text-3xl leading-snug font-black text-balance text-white sm:text-4xl">
                  با <span className="text-gradient-light">چاره‌بات</span>،
                  <br />
                  مثل یک هلدینگ تجارت کنید
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-4 max-w-xl text-[14.5px] leading-8 text-sky-100/80">
                اولین دستیار هوش مصنوعی فارسی‌زبان حوزه گمرک و تجارت؛ آموزش‌دیده
                روی ۲۰ سال پرونده واقعی ترخیص، بخشنامه‌ها و تعرفه‌های گمرکی.
                همین حالا سؤالتان را بپرسید — <span className="font-black text-white">پاسخ زنده می‌گیرید.</span>
              </p>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FEATS.map((f, i) => (
                <Reveal key={f.t} delay={i * 80}>
                  <div className="group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/10">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-brand-600 text-white shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-6">
                      <I name={f.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-black text-white">{f.t}</span>
                      <span className="mt-0.5 block text-[12px] leading-6 font-medium text-sky-100/70">{f.d}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={180}>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/ai"
                  className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-cyan-400 to-brand-500 px-7 py-3.5 text-[15px] font-black text-white shadow-glow transition hover:brightness-110"
                >
                  <I name="bot" className="h-5 w-5" />
                  ورود به صفحه چاره‌بات
                </a>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-[14px] font-black text-white backdrop-blur transition hover:bg-white/20"
                >
                  <I name="chat" className="h-5 w-5" />
                  شروع گفت‌وگوی رایگان
                </button>
              </div>
            </Reveal>
          </div>

          {/* live chat */}
          <Reveal delay={150}>
            <div className="relative">
              <div className="ring-conic absolute -inset-3 rounded-[36px] opacity-25 blur-2xl" />
              <div className="relative">
                <ChatPanel chat={chat} height={360} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
