"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

type LockedScreenProps = {
  secondsLeft: number;
};

export function LockedScreen({ secondsLeft }: LockedScreenProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="romantic-bg" />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/15"
            style={{
              left: `${(i * 11 + 9) % 95}%`,
              top: `${(i * 7 + 12) % 80}%`
            }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ repeat: Infinity, duration: 4.5 + (i % 3), delay: i * 0.18 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="glass w-full max-w-md rounded-3xl p-7 text-center shadow-glass"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 180 }}
        >
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <Lock className="h-7 w-7 text-[#ffd7e1]" />
          </motion.div>

          <h1 className="mt-4 text-2xl font-semibold rose-gradient-text">Too many attempts ❤️</h1>
          <p className="mt-3 text-sm text-white/80">
            Take a breath… you can try again in a moment.
          </p>

          <motion.p
            className="mt-5 text-4xl font-semibold tabular-nums text-white"
            key={secondsLeft}
            initial={{ scale: 0.92, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {secondsLeft}s
          </motion.p>

          <motion.div
            className="mt-6 mx-auto h-2 w-56 overflow-hidden rounded-full bg-white/10"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#ffd7e1]/60 to-transparent"
              animate={{ x: ["-40%", "40%"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

