"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ForgivenessSection() {
  const [response, setResponse] = useState<"yes" | "maybe" | null>(null);
  const [burstHearts, setBurstHearts] = useState<
    Array<{ id: string; left: number; startTop: number; rise: number; delay: number; duration: number; rotate: number; size: number }>
  >([]);

  const celebrate = () => {
    setResponse("yes");
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.65 },
      colors: ["#ff8ba8", "#ffd7e1", "#b76e79", "#ffffff"]
    });

    const hearts = Array.from({ length: 22 }).map((_, i) => ({
      id: `h-${Date.now()}-${i}`,
      left: Math.random() * 100,
      startTop: 85 + Math.random() * 20,
      rise: 120 + Math.random() * 80,
      delay: Math.random() * 0.2,
      duration: 1.1 + Math.random() * 0.7,
      rotate: (Math.random() * 60 - 30) * 1.2,
      size: 14 + Math.random() * 12
    }));
    setBurstHearts(hearts);
    window.setTimeout(() => setBurstHearts([]), 2300);
  };

  return (
    <section className="section-spacing pb-24 text-center">
      <motion.div
        className="glass mx-auto max-w-2xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="mb-4 text-7xl"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.3, repeat: Infinity }}
        >
          ❤️
        </motion.div>
        <h2 className="mb-6 text-3xl font-semibold">Can You Forgive Me?</h2>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <motion.button
            className="rounded-full bg-gradient-to-r from-[#ff6f91] to-[#ff9db0] px-7 py-3 font-semibold shadow-glow"
            onClick={celebrate}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
          >
            Yes ❤️
          </motion.button>
          <motion.button
            className="rounded-full border border-white/30 bg-white/10 px-7 py-3 font-semibold"
            onClick={() => setResponse("maybe")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
          >
            Maybe 🥺
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {response && (
            <motion.p
              key={response}
              className="mt-6 text-white/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {response === "yes"
                ? "Thank you, my love. I will treasure this second chance and honor your heart."
                : "I understand, and I will keep showing you through my actions that my love is real."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {burstHearts.length > 0 && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {burstHearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute"
                style={{ left: `${h.left}%`, top: `${h.startTop}%`, fontSize: h.size }}
                initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -h.rise,
                  rotate: [0, h.rotate, 0],
                  scale: [0.9, 1.08, 0.98]
                }}
                transition={{ delay: h.delay, duration: h.duration, ease: "easeOut" }}
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
