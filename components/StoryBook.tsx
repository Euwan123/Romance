"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { storyPages } from "@/data/storybook";
import { PolaroidFrame } from "@/components/PolaroidFrame";

type StoryBookProps = {
  onBack: () => void;
};

let entranceShown = false;

export function StoryBook({ onBack }: StoryBookProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const page = storyPages[activeIndex];

  const goTo = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    if (nextIndex < 0 || nextIndex >= storyPages.length) return;
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  const goNext = () => {
    if (activeIndex >= storyPages.length - 1) return;
    goTo(activeIndex + 1);
  };

  const goPrev = () => {
    if (activeIndex <= 0) return;
    goTo(activeIndex - 1);
  };

  const pageBlocks = useMemo(() => {
    let imageIndex = 0;
    let canShowEntrance = !entranceShown;

    return page.blocks.map((block) => {
      if (block.type === "image") {
        const showEntrance = canShowEntrance;
        if (canShowEntrance) {
          canShowEntrance = false;
          entranceShown = true;
        }
        const idx = imageIndex;
        imageIndex += 1;
        return (
          <PolaroidFrame
            key={`${page.id}-${block.src}`}
            src={block.src}
            alt={block.alt}
            index={idx}
            priority={activeIndex === 0 && page.page === 1 && idx === 0}
            showEntrance={showEntrance}
          />
        );
      }

      return (
        <p key={block.content} className="px-1 text-[15px] leading-relaxed text-[#4a3540]">
          {block.content}
        </p>
      );
    });
  }, [activeIndex, page]);

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-8 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
        >
          ← Home
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Book Mode</span>
      </div>

      <p className="mb-4 text-center text-xs text-white/70">{page.chapter}</p>

      <div className="relative flex-1">
        <AnimatePresence custom={direction} mode="wait">
          <motion.article
            key={page.id}
            custom={direction}
            initial={{ rotateY: direction > 0 ? -18 : 18, x: direction > 0 ? 20 : -20, opacity: 0 }}
            animate={{ rotateY: 0, x: 0, opacity: 1 }}
            exit={{ rotateY: direction > 0 ? 12 : -12, x: direction > 0 ? -14 : 14, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
            className="notebook-page relative min-h-[68vh] rounded-[2rem] p-4 pb-10"
            onTouchStart={(e) => {
              const t = e.touches[0];
              touchStartX.current = t.clientX;
              touchStartY.current = t.clientY;
            }}
            onTouchEnd={(e) => {
              const sx = touchStartX.current;
              const sy = touchStartY.current;
              touchStartX.current = null;
              touchStartY.current = null;
              if (sx === null || sy === null) return;
              const dx = e.changedTouches[0].clientX - sx;
              const dy = e.changedTouches[0].clientY - sy;
              if (Math.abs(dx) < 52) return;
              if (Math.abs(dx) <= Math.abs(dy)) return;
              if (dx < 0) goNext();
              if (dx > 0) goPrev();
            }}
          >
            <div className="notebook-lines absolute inset-0 rounded-[2rem] opacity-30" />
            <div className="relative z-10">
              <h2 className="mb-4 text-center text-2xl font-semibold text-[#5c3d4a] notebook-heading">
                {page.heading}
              </h2>

              <div className="space-y-4">{pageBlocks}</div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-[#8b6b7a]">
              {page.page}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-center justify-center gap-2">
          {storyPages.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Chapter ${idx + 1}`}
              onClick={() => goTo(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? "w-8 bg-[#ffd7e1]" : "w-2.5 bg-white/35"
              }`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white disabled:opacity-45"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === storyPages.length - 1}
            className="rounded-full bg-gradient-to-r from-[#ff8ba8] to-[#b76e79] px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-45"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
