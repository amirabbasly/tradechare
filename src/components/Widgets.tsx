"use client";

import { useEffect, useRef, useState } from "react";
import { ADDRESSES, PHONES } from "@/lib/data";
import { CHAT_SUGGESTIONS } from "@/lib/chatBrain";
import { useChat } from "@/lib/useChat";
import { AiOrb, AiWaves } from "./AiOrb";
import { I, useUI } from "./ui";

/* ================= Contact modal ================= */

function ContactModal() {
  const { contactOpen, closeContact } = useUI();

  useEffect(() => {
    if (!contactOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeContact();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [contactOpen, closeContact]);

  if (!contactOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="تماس با ما">
      <div className="animate-fade-in absolute inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={closeContact} />
      <div className="animate-pop-in relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[32px] bg-white p-7 shadow-soft sm:rounded-[32px] sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-[32px] bg-gradient-to-b from-brand-100/80 to-transparent" />
        <button
          onClick={closeContact}
          aria-label="بستن"
          className="absolute top-5 left-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-brand-100 bg-white text-slate-500 shadow-sm transition hover:rotate-90 hover:text-red-500"
        >
          <I name="x" className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <div className="relative flex flex-col items-center gap-2 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft">
            <I name="headset" className="h-8 w-8" />
          </span>
          <h3 className="mt-1 text-[22px] font-black text-ink-900">تماس با تریدچاره</h3>
          <p className="text-[13.5px] font-bold text-slate-500">
            کارشناسان ما آماده پاسخ‌گویی به شما هستند
          </p>
        </div>

        <div className="relative mt-6 flex flex-col gap-3">
          {PHONES.map((p, i) => (
            <div
              key={p.value}
              className={`animate-slide-up flex items-center gap-4 rounded-3xl border-2 p-4 transition hover:shadow-card ${
                i === 0 ? "border-brand-500 bg-brand-50/60" : "border-brand-100 bg-white hover:border-brand-300"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-white shadow-soft">
                <I name="phone" className="h-6 w-6" />
              </span>
              <span className="flex-1 leading-tight">
                <span className="block text-[12px] font-black text-brand-600">{p.tag}</span>
                <span className="mt-0.5 block text-[13px] font-bold text-slate-500">{p.label}</span>
                <span dir="ltr" className="mt-0.5 block text-[20px] font-black text-ink-900 tabular-nums">{p.value}</span>
              </span>
              <span className="flex shrink-0 flex-col gap-2">
                <a
                  href={p.href}
                  className="rounded-xl bg-gradient-to-l from-brand-600 to-brand-500 px-4 py-2 text-center text-[13px] font-black text-white shadow-soft transition hover:shadow-glow"
                >
                  تماس
                </a>
                {"whatsapp" in p && p.whatsapp ? (
                  <a
                    href={p.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-green-200 bg-green-50 px-4 py-1.5 text-center text-[12px] font-black text-green-700 transition hover:bg-green-100"
                  >
                    واتساپ
                  </a>
                ) : null}
              </span>
            </div>
          ))}
        </div>

        <div className="relative mt-4 grid gap-2.5 rounded-3xl bg-brand-950 p-5 text-white">
          <p className="flex items-center gap-2 text-[13px] font-black text-amber-300">
            <I name="clock" className="h-4 w-4" />
            {ADDRESSES.hours}
          </p>
          <p className="flex items-start gap-2 text-[12.5px] leading-7 font-bold text-stone-100">
            <I name="pin" className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
            {ADDRESSES.tehran.text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= AI chat widget (live API + offline brain) ================= */

function ChatWidget() {
  const { chatOpen, setChatOpen, openContact } = useUI();
  const chat = useChat();
  const { messages, typing, send, mode } = chat;
  const [input, setInput] = useState("");
  const [seen, setSeen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) setSeen(true);
  }, [chatOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, chatOpen]);

  const submit = (text: string) => {
    if (!text.trim()) return;
    send(text);
    setInput("");
  };

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="پشتیبانی آنلاین"
        className="group fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 py-2.5 pr-3 pl-5 text-white shadow-soft transition hover:shadow-glow sm:right-7 sm:bottom-7"
      >
        <span className="absolute inset-0 animate-ring-ping rounded-full bg-brand-500/50" />
        {!seen && !chatOpen && (
          <span className="absolute -top-1.5 -left-1.5 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-[12px] font-black ring-2 ring-white">
            ۱
          </span>
        )}
        <span className="relative">
          <AiOrb size={42} active={typing && chatOpen} />
          <span className="absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-brand-600" />
        </span>
        <span className="relative text-start leading-tight">
          <span className="flex items-center gap-2 text-[14px] font-black">
            پشتیبانی آنلاین
            <AiWaves className="eq-light" />
          </span>
          <span className="block text-[11px] font-bold text-stone-200">چاره‌بات • پاسخ در چند ثانیه</span>
        </span>
      </button>

      {/* panel */}
      {chatOpen && (
        <div className="animate-slide-up fixed right-4 bottom-24 z-50 flex h-[540px] max-h-[calc(100vh-130px)] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-brand-100 bg-white shadow-soft sm:right-7 sm:bottom-26">
          {/* header */}
          <div className="relative flex items-center gap-3 bg-gradient-to-l from-brand-800 to-brand-600 px-4 py-3.5 text-white">
            <div className="bg-grid-white absolute inset-0 opacity-40" />
            <AiOrb size={48} className="relative shrink-0" active={typing} />
            <span className="relative min-w-0 leading-tight">
              <span className="flex items-center gap-2 text-[15px] font-black">
                چاره‌بات 🤖
                {typing && <AiWaves className="eq-light" />}
              </span>
              <span className="block truncate text-[11.5px] font-bold text-stone-200">
                {mode === "live" ? "متصل به هوش مصنوعی" : mode === "offline" ? "حالت هوشمند آفلاین" : "هوش مصنوعی تریدچاره"}
              </span>
            </span>
            <span className={`relative rounded-full px-2.5 py-1 text-[10.5px] font-black ${mode === "offline" ? "bg-amber-400 text-amber-950" : "bg-green-400 text-green-950"}`}>
              {mode === "offline" ? "آفلاین" : "زنده"}
            </span>
            <button onClick={() => setChatOpen(false)} aria-label="بستن چت" className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 transition hover:bg-white/25">
              <I name="x" className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* messages */}
          <div ref={bodyRef} className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-brand-50/70 to-white px-4 py-4">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-to-l from-brand-600 to-brand-500 px-4 py-2.5 text-[13.5px] leading-7 font-bold text-white shadow-md">
                    {m.content}
                  </p>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-end gap-1.5">
                  <p className="max-w-[90%] rounded-2xl rounded-tl-md border border-brand-100 bg-white px-4 py-2.5 text-[13px] leading-7 font-medium whitespace-pre-line text-slate-700 shadow-sm">
                    {m.content}
                  </p>
                  {m.action === "contact" && (
                    <button
                      onClick={openContact}
                      className="flex items-center gap-1.5 rounded-full bg-gradient-to-l from-brand-700 to-brand-500 px-4 py-2 text-[12.5px] font-black text-white shadow-soft transition hover:shadow-glow"
                    >
                      <I name="phone" className="h-3.5 w-3.5" />
                      تماس با کارشناس
                    </button>
                  )}
                </div>
              )
            )}
            {typing && (
              <div className="flex justify-end">
                <span className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-brand-100 bg-white px-4 py-3 shadow-sm">
                  <AiWaves />
                </span>
              </div>
            )}
          </div>

          {/* quick replies */}
          <div className="flex gap-2 overflow-x-auto border-t border-brand-50 bg-white px-3 py-2.5">
            {CHAT_SUGGESTIONS.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => submit(q)}
                className="shrink-0 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[12px] font-black whitespace-nowrap text-brand-700 transition hover:bg-brand-100"
              >
                {q}
              </button>
            ))}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-brand-50 bg-white px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید…"
              className="flex-1 rounded-2xl border border-brand-100 bg-brand-50/50 px-4 py-2.5 text-[13.5px] font-bold text-ink-900 outline-none placeholder:font-bold placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
            />
            <button
              type="submit"
              aria-label="ارسال"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-soft transition hover:shadow-glow disabled:opacity-40"
              disabled={!input.trim() || typing}
            >
              <I name="send" className="h-5 w-5 -scale-x-100" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default function Widgets() {
  return (
    <>
      <ContactModal />
      <ChatWidget />
    </>
  );
}
