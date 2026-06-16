"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function HiddenLetter() {
  const [open, setOpen] = useState(false);
  const [corner, setCorner] = useState(0);

  const positions = useMemo(
    () => [
      { left: 14, top: 100, right: undefined, bottom: undefined },
      { left: undefined, top: 110, right: 14, bottom: undefined },
      { left: 14, top: undefined, right: undefined, bottom: 110 },
      { left: undefined, top: undefined, right: 14, bottom: 110 }
    ],
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setCorner((c) => (c + 1) % positions.length);
    }, 12000);
    return () => window.clearInterval(id);
  }, [positions.length]);

  return (
    <>
      <motion.div
        className="fixed z-40 flex flex-col items-center"
        style={positions[corner]}
        animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative mb-2 rounded-2xl border border-white/30 bg-[#fffaf8]/95 px-3 py-1.5 text-xs font-medium text-[#5c3d4a] shadow-md notebook-heading"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          Click me 💌
          <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/30 bg-[#fffaf8]/95" />
        </motion.div>
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="glass flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffd7e1]/40 shadow-glow"
          animate={{ y: [0, -5, 0], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open hidden letter"
        >
          <Mail className="h-5 w-5 text-[#ffd7e1]" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-md overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(255,139,168,0.25)]"
              initial={{ y: 40, opacity: 0, rotateX: 12, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="notebook-page max-h-[85vh] overflow-y-auto rounded-3xl p-6">
                <div className="notebook-lines absolute inset-0 rounded-3xl opacity-20" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 z-20 rounded-full border border-[#b76e79]/30 bg-white/80 p-1.5 text-[#5c3d4a]"
                  aria-label="Close letter"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative z-10">
                  <h2 className="notebook-heading text-center text-2xl font-semibold text-[#5c3d4a]">
                    A Little Secret ❤️
                  </h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#4a3540]">
                    <p>If your reading this My Bing it means you found the hidden letter.</p>
                    <p>
                      I wanted to share something that isn&apos;t part of our storybook.
                    </p>
                    <p>
                      This project wasn&apos;t made in a day. It took me about 2 weeks to finish, all in secret.
                    </p>
                    <p>
                      I worked on it little by little whenever I had free time. Even when I was busy with other
                      projects and responsibilities, I still made time for this because I wanted to create something
                      special for you.
                    </p>
                    <p>
                      Every page, animation, memory, photo, and detail was made with both the happy moments and
                      difficult moments we&apos;ve experienced together in mind.
                    </p>
                    <div className="rounded-2xl border border-[#ffd7e1]/60 bg-white/50 p-4">
                      <p className="notebook-heading text-lg font-semibold text-[#5c3d4a]">Project Statistics</p>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li>⏳ Total development time: 13 hours and 25 minutes</li>
                        <li>⌨️ Total keyboard presses: 412,329</li>
                        <li>📸 Memories included: 92+ photos</li>
                        <li>❤️ Motivation: You</li>
                      </ul>
                    </div>
                    <p>
                      This website isn&apos;t just code, pictures, or animations.
                    </p>
                    <p>
                      It&apos;s a collection of memories, milestones, achievements, and moments that mattered to us.
                    </p>
                    <p>Thank you for being part of this journey.</p>
                    <p>I hope this little project makes you smile.</p>
                    <p className="notebook-heading pt-2 text-lg text-[#5c3d4a]">
                      Love,
                      <br />
                      Euwan
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
