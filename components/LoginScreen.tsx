"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Heart } from "lucide-react";

type LoginScreenProps = {
  attemptsLeft: number;
  errorOpen: boolean;
  errorMessage: string;
  disabled?: boolean;
  onSubmitPassword: (password: string) => void;
  onCloseError: () => void;
};

export function LoginScreen({
  attemptsLeft,
  errorOpen,
  errorMessage,
  disabled,
  onSubmitPassword,
  onCloseError
}: LoginScreenProps) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const password = useMemo(() => digits.join(""), [digits]);

  const setDigit = (index: number, value: string) => {
    const numeric = value.replace(/\D/g, "");
    if (!numeric) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    const char = numeric[0];
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (index < 3) inputsRef.current[index + 1]?.focus();
  };

  const onBackspace = (index: number, key: string) => {
    if (key !== "Backspace") return;
    if (digits[index]) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    if (index > 0) {
      inputsRef.current[index - 1]?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const submit = () => {
    onSubmitPassword(password);
    setDigits(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="romantic-bg" />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{
              left: `${(i * 13 + 7) % 95}%`,
              top: `${(i * 9 + 10) % 80}%`
            }}
            animate={{ y: [0, -16, 0], opacity: [0.25, 0.9, 0.25] }}
            transition={{ repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.2 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="glass w-full max-w-md rounded-3xl p-6 shadow-glass"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 180 }}
        >
          <div className="flex items-center justify-center">
            <motion.div
              className="rounded-full bg-white/10 p-3"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Heart className="h-6 w-6 text-[#ffd7e1]" />
            </motion.div>
          </div>

          <h1 className="mt-4 text-center text-2xl font-semibold leading-tight rose-gradient-text">
            Our Journey Together ❤️
          </h1>

          <p className="mt-3 text-center text-sm text-white/80">
            A private scrapbook made only for us.
          </p>

          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium text-white/85">
              Password
            </label>
            <div className="flex items-center justify-center gap-3">
              {digits.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="password"
                  value={digit}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={1}
                  disabled={disabled}
                  className="h-14 w-12 rounded-2xl border border-white/20 bg-white/10 text-center text-xl text-white outline-none focus:border-white/40 focus:ring-2 focus:ring-[#ff8ba8]/30"
                  whileTap={{ scale: 0.95 }}
                  animate={digit ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onChange={(e) => setDigit(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                    onBackspace(index, e.key);
                  }}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-white/70">
            Attempts remaining: <span className="font-semibold text-white">{attemptsLeft}</span>
          </div>

          <motion.button
            className="mt-5 w-full rounded-full bg-gradient-to-r from-[#ff8ba8] to-[#b76e79] px-6 py-3 text-base font-semibold text-white shadow-glow"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            disabled={disabled}
            onClick={submit}
          >
            Open My Heart
          </motion.button>

          <div className="mt-4 flex items-center justify-center">
            <div className="relative h-2 w-32 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ffd7e1]/0 via-[#ffd7e1]/60 to-[#ffd7e1]/0"
                animate={{ x: ["-40%", "40%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {errorOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseError}
          >
            <motion.div
              className="glass w-full max-w-sm rounded-3xl p-5 shadow-glass"
              initial={{ y: 28, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="mb-2 text-center text-2xl"
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Bing why? 🥺
              </motion.div>
              <p className="text-center text-sm text-white/85">{errorMessage}</p>
              <div className="mt-4 flex justify-center">
                <motion.button
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white"
                  onClick={onCloseError}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

