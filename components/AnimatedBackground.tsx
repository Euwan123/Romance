"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const particles = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: `${(i * 7.2 + 8) % 100}%`,
  size: 6 + (i % 4) * 6,
  duration: 7 + (i % 5)
}));

const sparkles = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  left: `${(i * 17 + 9) % 100}%`,
  top: `${(i * 13 + 7) % 100}%`,
  size: 4 + (i % 3) * 2,
  delay: i * 0.35
}));

export function AnimatedBackground() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      <div className="romantic-bg" />
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-[-10%] h-[380px] w-[380px] rounded-full bg-[#ff8ba8]/10 blur-2xl"
          style={{ y: reducedMotion ? 0 : y1 }}
        />
        <motion.div
          className="absolute right-[-12%] bottom-[-18%] h-[420px] w-[420px] rounded-full bg-[#b76e79]/10 blur-2xl"
          style={{ y: reducedMotion ? 0 : y2 }}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.id * 0.35,
              ease: "linear"
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-[#ffd7e1]/70"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.95, 0], scale: [0.6, 1.15, 0.8] }}
            transition={{ duration: reducedMotion ? 0 : 2.8, repeat: reducedMotion ? 0 : Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </>
  );
}
