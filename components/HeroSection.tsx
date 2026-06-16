"use client";

import { motion } from "framer-motion";

type HeroSectionProps = {
  onOpen: () => void;
};

const hearts = Array.from({ length: 10 });

export function HeroSection({ onOpen }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-xl sm:text-2xl"
          style={{ left: `${(i * 11 + 5) % 96}%`, top: `${(i * 9 + 10) % 80}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.95, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.2 }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        className="glass relative z-10 mx-auto w-full max-w-xl rounded-3xl p-8 text-center shadow-glass"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18, stiffness: 120 }}
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">
          Journey Back to Your Heart
        </p>
        <h1 className="mb-6 text-3xl font-semibold leading-tight sm:text-5xl">
          I Have Something Important To Tell You ❤️
        </h1>
        <motion.button
          className="rounded-full bg-gradient-to-r from-[#ff8ba8] to-[#b76e79] px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={onOpen}
        >
          Open My Heart
        </motion.button>
      </motion.div>
    </section>
  );
}
