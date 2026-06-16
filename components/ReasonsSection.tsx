"use client";

import { loveReasons } from "@/data/reasons";
import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";

export function ReasonsSection() {
  return (
    <section className="section-spacing">
      <h2 className="mb-8 text-center text-3xl font-semibold rose-gradient-text">Reasons I Love You</h2>
      <div className="grid gap-4">
        {loveReasons.map((reason) => (
          <motion.article
            key={reason.id}
            className="glass rounded-2xl p-5 shadow-glass"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              <span className="mr-2">{reason.emoji}</span>
              {reason.title}
            </h3>
            <p className="text-white/85">{reason.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
