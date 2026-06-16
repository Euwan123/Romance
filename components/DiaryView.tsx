"use client";

import { motion } from "framer-motion";
import { diaryEntries } from "@/data/diary";

type DiaryViewProps = {
  onBack: () => void;
};

export function DiaryView({ onBack }: DiaryViewProps) {
  return (
    <section className="relative z-10 mx-auto min-h-screen w-full max-w-md px-4 pb-10 pt-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
        >
          ← Home
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Diary</span>
      </div>

      <motion.h1
        className="mb-2 text-center text-2xl font-semibold rose-gradient-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Euwan&apos;s Diary
      </motion.h1>
      <p className="mb-6 text-center text-sm text-white/75">Little pages from my heart</p>

      <div className="space-y-4">
        {diaryEntries.map((entry, idx) => (
          <motion.article
            key={entry.id}
            className="notebook-page relative rounded-2xl p-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className="notebook-lines absolute inset-0 rounded-2xl opacity-25" />
            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.15em] text-[#8b6b7a]">{entry.date}</span>
                <span className="text-sm text-[#b76e79]">{entry.mood}</span>
              </div>
              <h2 className="notebook-heading text-xl font-semibold text-[#5c3d4a]">{entry.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4a3540]">{entry.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
