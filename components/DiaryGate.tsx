"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock, NotebookPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DiaryGateProps = {
  onUnlock: () => void;
  onBack: () => void;
};

type Question = {
  id: string;
  label: string;
  placeholder: string;
  maxAttempts: number;
  numeric?: boolean;
  check: (value: string) => boolean;
  clueAt?: number;
  clue?: string;
};

const questions: Question[] = [
  {
    id: "color",
    label: "What is My favorite color?",
    placeholder: "Your answer",
    maxAttempts: 3,
    check: (v) => {
      const n = v.trim().toLowerCase();
      return n === "gray" || n === "grey";
    }
  },
  {
    id: "months",
    label: "How many months are we at currently? (6/16/26)",
    placeholder: "Number only",
    maxAttempts: 3,
    numeric: true,
    check: (v) => v.trim() === "31"
  },
  {
    id: "hero",
    label: "Favorite MLBB Hero?",
    placeholder: "Hero name",
    maxAttempts: 5,
    check: (v) => v.trim().toLowerCase() === "phovius",
    clueAt: 3,
    clue: "P_ov__s"
  }
];

export function DiaryGate({ onUnlock, onBack }: DiaryGateProps) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const tapCountRef = useRef(0);
  const lastTapRef = useRef<number | null>(null);

  const q = questions[step];
  const used = attempts[q?.id] ?? 0;
  const remaining = q.maxAttempts - used;
  const showClue = q.clueAt !== undefined && used >= q.clueAt && q.clue;

  const submit = () => {
    if (locked || !q) return;
    const trimmed = value.trim();
    if (!trimmed) return;

    if (q.check(trimmed)) {
      setError("");
      setValue("");
      if (step >= questions.length - 1) {
        sessionStorage.setItem("diary_unlocked", "1");
        onUnlock();
        return;
      }
      setStep((s) => s + 1);
      return;
    }

    const nextUsed = used + 1;
    setAttempts((prev) => ({ ...prev, [q.id]: nextUsed }));
    setValue("");

    if (nextUsed >= q.maxAttempts) {
      setLocked(true);
      setError("Too many tries. Come back later.");
      return;
    }

    setError("That is not quite right. Try again.");
  };

  useEffect(() => {
    tapCountRef.current = 0;
    lastTapRef.current = null;
  }, [step]);

  const secretTap = () => {
    if (step !== 0) return;
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current > 1600) {
      tapCountRef.current = 0;
    }
    lastTapRef.current = now;
    tapCountRef.current += 1;
    if (tapCountRef.current >= 6) {
      sessionStorage.setItem("diary_unlocked", "1");
      onUnlock();
    }
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-8">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
        >
          ← Home
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Private</span>
      </div>

      <motion.div
        className="glass rounded-3xl p-6 shadow-glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="rounded-full bg-white/10 p-3">
            <NotebookPen className="h-6 w-6 text-[#ffd7e1]" />
          </div>
          <Lock className="h-5 w-5 text-white/60" />
        </div>

        <h1 className="text-center text-2xl font-semibold rose-gradient-text">Euwan&apos;s Diary</h1>
        <p className="mt-2 text-center text-sm text-white/75">Answer to unlock</p>

        <div className="mt-4 flex justify-center gap-2">
          {questions.map((item, idx) => (
            <div
              key={item.id}
              className={`h-2 rounded-full transition-all ${
                idx === step ? "w-8 bg-[#ffd7e1]" : idx < step ? "w-2 bg-[#ff8ba8]" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <label className="block text-sm font-medium text-white/90">{q.label}</label>
            <input
              type={q.numeric ? "text" : "text"}
              inputMode={q.numeric ? "numeric" : "text"}
              pattern={q.numeric ? "[0-9]*" : undefined}
              value={value}
              onChange={(e) => {
                const next = q.numeric ? e.target.value.replace(/\D/g, "") : e.target.value;
                setValue(next);
                setError("");
              }}
              onClick={secretTap}
              disabled={locked}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white outline-none focus:border-white/40 focus:ring-2 focus:ring-[#ff8ba8]/30"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            <p className="mt-2 text-xs text-white/60">
              Attempts remaining: <span className="font-semibold text-white">{remaining}</span>
            </p>
            {showClue && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-[#ffd7e1]"
              >
                Hint: {q.clue}
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-[#ffb4c4]"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          type="button"
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#f0abfc] px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-50"
          whileTap={{ scale: 0.98 }}
          disabled={locked}
          onClick={submit}
        >
          Continue
        </motion.button>
      </motion.div>
    </section>
  );
}
