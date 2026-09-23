"use client";

import { useCallback, useRef, useState } from "react";
import { brainReply } from "./chatBrain";

export type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  action?: "contact";
  live?: boolean;
};

const GREETING: ChatMsg = {
  role: "assistant",
  content:
    "سلام! 👋 به تریدچاره خوش اومدید. من چاره‌بات هستم؛ درباره ترخیص، ثبت سفارش، نرخ ارز، تعرفه و حقوق گمرکی ازم بپرسید.",
};

const CONTACT_HINT = /(0912|تماس بگیرید|کارشناس|پشتیبانی)/;

export function useChat(withGreeting = true) {
  const [messages, setMessages] = useState<ChatMsg[]>(withGreeting ? [GREETING] : []);
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"live" | "offline" | "unknown">("unknown");
  const busy = useRef(false);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy.current) return;
      busy.current = true;

      const userMsg: ChatMsg = { role: "user", content: q };
      const history = [...messages, userMsg].slice(-10);
      setMessages((m) => [...m, userMsg]);
      setTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: AbortSignal.timeout(35000),
        });
        const json = await res.json();
        if (!res.ok || typeof json?.reply !== "string" || !json.reply.trim()) {
          throw new Error(json?.error || "bad reply");
        }
        const reply = json.reply as string;
        setMode("live");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: reply,
            live: true,
            ...(CONTACT_HINT.test(reply) ? { action: "contact" as const } : {}),
          },
        ]);
      } catch {
        // هوشمند آفلاین — بدون قطعی سرویس
        await new Promise((r) => setTimeout(r, 900));
        const fb = brainReply(q);
        setMode("offline");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: fb.text,
            live: false,
            ...(fb.action ? { action: fb.action } : {}),
          },
        ]);
      } finally {
        setTyping(false);
        busy.current = false;
      }
    },
    [messages]
  );

  const reset = useCallback(() => {
    setMessages(withGreeting ? [GREETING] : []);
    setMode("unknown");
  }, [withGreeting]);

  return { messages, typing, send, reset, mode };
}
