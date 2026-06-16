"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
};

export function HeartTrail() {
  const [dots, setDots] = useState<Dot[]>([]);
  const currentIdRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPushRef = useRef(0);

  useEffect(() => {
    const push = () => {
      rafRef.current = null;
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (!pending) return;
      const now = performance.now();
      if (now - lastPushRef.current < 80) return;
      lastPushRef.current = now;
      const dot = { id: currentIdRef.current++, x: pending.x, y: pending.y };
      setDots((prev) => [...prev.slice(-10), dot]);
    };

    const schedule = (event: PointerEvent) => {
      pendingRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(push);
    };

    const onMove = (event: PointerEvent) => schedule(event);
    const onDown = (event: PointerEvent) => schedule(event);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {dots.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute text-xs"
            style={{ left: dot.x, top: dot.y }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 1.8, y: -16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
