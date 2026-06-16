"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookHeart, Camera, ChevronRight, Lock, NotebookPen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { HiddenLetter } from "@/components/HiddenLetter";
import { HeroHeart } from "@/components/HeroHeart";

type LandingHubProps = {
  onSelect: (mode: "book" | "gallery" | "diary") => void;
};

const options = [
  {
    id: "book" as const,
    title: "Our Journey Together",
    subtitle: "Flip through our storybook",
    icon: BookHeart,
    frame: "book",
    gradient: "from-[#ff8ba8] via-[#ff9db0] to-[#b76e79]",
    border: "border-[#ffd7e1]/50",
    glow: "shadow-[0_0_28px_rgba(255,139,168,0.35)]",
    anim: { y: [0, -4, 0], rotate: [0, -1, 1, 0] }
  },
  {
    id: "gallery" as const,
    title: "Gallery",
    subtitle: "Pick an album of memories",
    icon: Camera,
    frame: "gallery",
    gradient: "from-[#f6c177] via-[#f8d49a] to-[#e88d67]",
    border: "border-[#ffe8c8]/50",
    glow: "shadow-[0_0_28px_rgba(246,193,119,0.35)]",
    anim: { scale: [1, 1.03, 1], rotate: [0, 2, -2, 0] }
  },
  {
    id: "diary" as const,
    title: "Euwan's Diary",
    subtitle: "Private notes, just for you",
    icon: NotebookPen,
    frame: "diary",
    gradient: "from-[#c4b5fd] via-[#ddd6fe] to-[#f0abfc]",
    border: "border-[#ede9fe]/50",
    glow: "shadow-[0_0_28px_rgba(196,181,253,0.35)]",
    anim: { y: [0, -3, 0], x: [0, 2, 0] }
  }
];

function FrameDecor({ frame }: { frame: string }) {
  if (frame === "book") {
    return (
      <>
        <div className="pointer-events-none absolute -left-1 top-6 h-16 w-2 rounded-full bg-[#ffd7e1]/40" />
        <div className="pointer-events-none absolute -right-1 top-6 h-16 w-2 rounded-full bg-[#ffd7e1]/40" />
      </>
    );
  }
  if (frame === "gallery") {
    return (
      <motion.div
        className="pointer-events-none absolute -right-2 -top-2 text-[#ffe8c8]"
        animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.div>
    );
  }
  return (
    <>
      <div className="pointer-events-none absolute left-3 top-0 h-6 w-10 -translate-y-1/2 rounded-sm bg-[#fff3c4]/80" />
      <div className="pointer-events-none absolute right-4 top-0 h-6 w-10 -translate-y-1/2 rotate-6 rounded-sm bg-[#fff3c4]/80" />
    </>
  );
}

export function LandingHub({ onSelect }: LandingHubProps) {
  const [kissed, setKissed] = useState(false);
  const [kissModalOpen, setKissModalOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("euwan_kissed") === "1") setKissed(true);
  }, []);

  const handleOptionClick = (id: "book" | "gallery" | "diary") => {
    if (id === "diary" && !kissed) {
      setKissModalOpen(true);
      return;
    }
    onSelect(id);
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-8 pb-24">
      <HiddenLetter />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6 text-center"
      >
        <HeroHeart onKiss={() => setKissed(true)} />
        <h1 className="text-3xl font-semibold rose-gradient-text">Our Journey Together ❤️</h1>
        <p className="mt-3 px-2 text-sm leading-relaxed text-white/80">
          A collection of memories, milestones, and moments that shaped our story ❤️
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">Choose your path</p>
      </motion.div>

      <div className="space-y-5">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          const isDiaryLocked = opt.id === "diary" && !kissed;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => handleOptionClick(opt.id)}
              className={`relative w-full overflow-hidden rounded-[1.6rem] border-2 text-left ${
                isDiaryLocked
                  ? "border-white/15 bg-black/20 shadow-none"
                  : `${opt.border} bg-white/5 ${opt.glow}`
              }`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + idx * 0.1, type: "spring", damping: 18, stiffness: 200 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`relative rounded-[1.45rem] bg-gradient-to-br p-[1px] ${
                  isDiaryLocked ? "from-white/10 via-white/5 to-white/10" : opt.gradient
                }`}
              >
                <div
                  className={`relative rounded-[1.4rem] px-4 py-4 backdrop-blur-sm ${
                    isDiaryLocked ? "bg-[#0d0509]/95" : "bg-[#1a0a12]/85"
                  }`}
                >
                  <FrameDecor frame={opt.frame} />
                  {isDiaryLocked && (
                    <div className="pointer-events-none absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40">
                      <Lock className="h-4 w-4 text-white/55" />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
                        isDiaryLocked ? "from-[#4a3f5c] via-[#3a3048] to-[#2a2235]" : opt.gradient
                      }`}
                      animate={isDiaryLocked ? undefined : opt.anim}
                      transition={{ duration: 3.5 + idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {isDiaryLocked ? (
                        <Lock className="h-7 w-7 text-white/55" strokeWidth={1.8} />
                      ) : (
                        <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                      )}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h2 className={`text-lg font-semibold ${isDiaryLocked ? "text-white/55" : "text-white"}`}>
                        {opt.title}
                      </h2>
                      <p className={`mt-0.5 text-sm ${isDiaryLocked ? "text-white/40" : "text-white/75"}`}>
                        {isDiaryLocked ? "Locked for now" : opt.subtitle}
                      </p>
                    </div>
                    <motion.div
                      animate={isDiaryLocked ? undefined : { x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.25 }}
                    >
                      <ChevronRight className={`h-6 w-6 ${isDiaryLocked ? "text-white/25" : "text-white/50"}`} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {kissModalOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setKissModalOpen(false)}
          >
            <motion.div
              className="glass w-full max-w-sm rounded-3xl p-6 text-center shadow-glass"
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Lock className="h-7 w-7 text-[#ffd7e1]" />
              </div>
              <p className="text-lg font-semibold text-white">kiss euwan first to unlock</p>
              <motion.button
                className="mt-5 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white"
                onClick={() => setKissModalOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                Okay
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
