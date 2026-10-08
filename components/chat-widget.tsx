
"use client";

import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  role: "ai" | "you";
  text: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const [msg, setMsg] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi! I’m NOVA AI. Tell me what you’re shopping for, your budget, or what you want to compare.",
    },
  ]);

  const send = () => {
    const question = q.trim();

    if (!question) return;

    setQ("");

    const isShoe = question.toLowerCase().includes("shoe");

    const answer = isShoe
      ? "I’d recommend starting with our Flux Runner. I can refine the recommendation by budget, color, use case, or style."
      : "I’d recommend starting with our curated collection. I can refine the recommendation by budget, color, use case, or style.";

    setMsg((current) => [
      ...current,
      {
        role: "you",
        text: question,
      },
      {
        role: "ai",
        text: `${answer} (Demo AI — connect OPENAI_API_KEY for live answers.)`,
      },
    ]);
  };

  return (
    <>
      {/* Floating AI button */}
      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-black text-white shadow-2xl dark:bg-white dark:text-black"
          aria-label="Open NOVA AI"
        >
          <Sparkles size={22} />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed bottom-5 right-5 z-[60] w-[min(380px,calc(100%-32px))] overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-2xl dark:bg-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-black p-4 text-white dark:bg-white dark:text-black">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 dark:bg-black/10">
                  <Bot size={19} />
                </div>

                <div>
                  <p className="font-semibold">NOVA AI</p>
                  <p className="text-xs opacity-60">
                    Shopping intelligence
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 transition hover:bg-white/10 dark:hover:bg-black/10"
                aria-label="Close NOVA AI"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 space-y-3 overflow-y-auto p-4">
              {msg.map((m, i) => (
                <motion.div
                  key={`${m.role}-${i}`}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    m.role === "you"
                      ? "ml-auto bg-violet-600 text-white"
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-[var(--line)] p-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                placeholder="Ask NOVA AI..."
                className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-zinc-400"
              />

              <motion.button
                type="button"
                onClick={send}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black"
                aria-label="Send message"
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
