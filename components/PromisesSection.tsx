"use client";

import { promises } from "@/data/promises";
import { Flower2, HandHeart, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  flower: Flower2,
  hand: HandHeart
} as const;

export function PromisesSection() {
  return (
    <section className="section-spacing">
      <h2 className="mb-8 text-center text-3xl font-semibold rose-gradient-text">My Promises</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {promises.map((promise, idx) => {
          const Icon = iconMap[promise.icon];
          return (
            <motion.article
              key={promise.id}
              className="glass rounded-2xl p-5 shadow-glass"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08, duration: 0.65 }}
              whileHover={{ y: -2 }}
            >
              <motion.div
                className="mb-3 inline-flex rounded-full bg-white/10 p-2"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
              >
                <Icon className="h-5 w-5 text-[#ffd7e1]" />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">{promise.title}</h3>
              <p className="text-white/85">{promise.detail}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
