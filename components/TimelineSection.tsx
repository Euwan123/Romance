"use client";

import { relationshipTimeline } from "@/data/timeline";
import { motion } from "framer-motion";

export function TimelineSection() {
  return (
    <section className="section-spacing">
      <h2 className="mb-8 text-center text-3xl font-semibold rose-gradient-text">
        Our Relationship Timeline
      </h2>
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-5 top-0 h-full w-px bg-white/30" />
        <div className="space-y-8">
          {relationshipTimeline.map((item, idx) => (
            <motion.div
              key={item.id}
              className="relative pl-14"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
            >
              <div className="absolute left-2 top-2 h-6 w-6 rounded-full border border-white/50 bg-[#ff8ba8]/80" />
              <article className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.date}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-white/85">{item.detail}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
