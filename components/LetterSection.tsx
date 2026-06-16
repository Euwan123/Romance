"use client";

import { apologyLines } from "@/data/apology";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";

export function LetterSection() {
  return (
    <section className="section-spacing">
      <motion.div
        className="relative glass rounded-3xl p-6 shadow-glass sm:p-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-[#ffd7e1]/20 to-transparent"
          initial={{ rotateX: -75, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", damping: 20, stiffness: 180, delay: 0.04 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff8ba8]/10 via-transparent to-[#b76e79]/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9 }}
        />
        <motion.h2 variants={fadeUp} className="mb-6 text-3xl font-semibold rose-gradient-text">
          My Apology Letter
        </motion.h2>
        <div className="space-y-4 font-light leading-relaxed text-white/90">
          {apologyLines.map((line, idx) => (
            <motion.p
              key={line}
              variants={fadeUp}
              transition={{ delay: idx * 0.08, duration: 0.7 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
