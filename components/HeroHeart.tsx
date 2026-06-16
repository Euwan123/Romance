"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { notifySession } from "@/lib/sessionStore";

const sparkles = [
  { id: 0, x: -42, y: -28, delay: 0 },
  { id: 1, x: 38, y: -34, delay: 0.6 },
  { id: 2, x: -30, y: 36, delay: 1.1 },
  { id: 3, x: 44, y: 22, delay: 1.7 },
  { id: 4, x: 0, y: -48, delay: 2.2 },
  { id: 5, x: -50, y: 8, delay: 0.9 }
];

const miniHearts = [
  { id: 0, x: -56, y: -10, delay: 0.2 },
  { id: 1, x: 58, y: -6, delay: 0.8 },
  { id: 2, x: -48, y: 30, delay: 1.4 },
  { id: 3, x: 52, y: 28, delay: 2.0 }
];

export function HeroHeart({ onKiss }: { onKiss?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mx-auto mb-5 flex h-36 w-36 items-center justify-center will-change-transform">
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,139,168,0.35)_0%,transparent_70%)]"
        animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute h-28 w-28 rounded-full bg-gradient-to-br from-[#ffd7e1]/30 via-[#ff8ba8]/20 to-transparent blur-xl"
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-24 w-1 rounded-full bg-gradient-to-b from-[#ffd7e1]/0 via-[#ffd7e1]/25 to-transparent"
          style={{ rotate: i * 60 - 30 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#fff0f5]"
          style={{ left: "50%", top: "50%", marginLeft: s.x, marginTop: s.y }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
      {miniHearts.map((h) => (
        <motion.div
          key={h.id}
          className="pointer-events-none absolute"
          style={{ left: "50%", top: "50%", marginLeft: h.x, marginTop: h.y }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4], rotate: [0, 12, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: h.delay, ease: "easeInOut" }}
        >
          <Heart className="h-3 w-3 text-[#ff8ba8]/80" fill="#ff8ba8" />
        </motion.div>
      ))}
      <motion.button
        type="button"
        className="relative flex h-28 w-28 items-center justify-center"
        animate={{
          scale: [1, 1.06, 1, 1.03, 1],
          y: [0, -4, 0, -2, 0],
          rotate: [0, -2, 2, 0]
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(0)" }}
        onClick={() => {
          sessionStorage.setItem("euwan_kissed", "1");
          onKiss?.();
          notifySession();
          setOpen(true);
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-white/10 blur-md" />
        <div className="absolute inset-2 rounded-[1.6rem] border border-white/30 bg-gradient-to-br from-white/20 via-[#ffd7e1]/15 to-transparent backdrop-blur-md" />
        <motion.div
          className="absolute inset-3 rounded-[1.4rem] bg-gradient-to-br from-[#ff8ba8] via-[#ff9db0] to-[#b76e79] shadow-[0_0_40px_rgba(255,139,168,0.55)]"
          animate={{
            boxShadow: [
              "0 0 30px rgba(255,139,168,0.4)",
              "0 0 50px rgba(255,215,225,0.65)",
              "0 0 30px rgba(255,139,168,0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-4 rounded-[1.2rem] bg-gradient-to-tr from-white/35 via-transparent to-transparent" />
        <Heart className="relative z-10 h-14 w-14 text-white drop-shadow-[0_2px_8px_rgba(255,100,130,0.5)]" fill="white" strokeWidth={1.2} />
      </motion.button>
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-medium text-[#5c3d4a] shadow-md"
        animate={{ y: [0, -3, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        tap the heart
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex items-center justify-center bg-black/65 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/40 bg-[#fffaf8] shadow-[0_0_40px_rgba(255,139,168,0.4)]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", damping: 20, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative h-56 w-full">
                <Image
                  src="/images/cats/IMG_20260207_221053.jpg"
                  alt="Our little secret cat"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
