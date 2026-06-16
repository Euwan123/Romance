"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type MemoryPhoto = {
  id: string;
  src: string;
  thumbSrc: string;
  width: number;
  height: number;
  aspectRatio: number;
};

function PhotoCard({
  photo,
  index,
  onOpen
}: {
  photo: MemoryPhoto;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.18, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paddingTop = useMemo(() => {
    const ratio = photo.aspectRatio && Number.isFinite(photo.aspectRatio) ? photo.aspectRatio : 1;
    const h = Math.max(0.2, 1 / ratio);
    return `${h * 100}%`;
  }, [photo.aspectRatio]);

  const rotate = index % 2 === 0 ? -1.8 : 1.8;

  return (
    <motion.button
      ref={cardRef}
      type="button"
      className="mb-4 inline-block w-full break-inside-avoid text-left"
      style={{ padding: 0 }}
      onClick={onOpen}
      initial={{ rotate }}
      whileHover={{ rotate: 0, y: -3 }}
      whileTap={{ scale: 0.99, y: -1 }}
    >
      <div className="glass overflow-hidden rounded-2xl p-2 shadow-glass">
        <div className="relative w-full overflow-hidden rounded-xl bg-white/5" style={{ paddingTop }}>
          {visible && (
            <Image
              src={photo.thumbSrc}
              alt="Memory photo"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, 280px"
              quality={30}
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff8ba8]/25 via-transparent to-[#ffd7e1]/20" />
        </div>
        <div className="mt-2 px-1 pb-1 text-xs text-white/80">
          Tap to open
        </div>
      </div>
    </motion.button>
  );
}

export function MemoryGallery() {
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch("/api/memories");
        const data = (await res.json()) as MemoryPhoto[];
        if (cancelled) return;
        setPhotos(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPhotos([]);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  const goNext = () => {
    if (photos.length === 0) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % photos.length;
    });
  };

  const goPrev = () => {
    if (photos.length === 0) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + photos.length) % photos.length;
    });
  };

  return (
    <section className="section-spacing">
      <h2 className="mb-8 text-center text-3xl font-semibold rose-gradient-text">Memory Gallery</h2>
      {photos.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl glass p-6 text-center text-white/80">
          Your memories will glow here when you add them.
        </div>
      ) : (
        <div className="columns-2 sm:columns-3" style={{ columnGap: 16 }}>
          {photos.map((photo, idx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={idx}
              onOpen={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="relative glass max-w-md w-full rounded-3xl p-3"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/90"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
              >
                Close
              </button>

              <div
                className="relative w-full overflow-hidden rounded-2xl bg-white/5"
                style={{ paddingTop: `${Math.max(0.2, 1 / (activePhoto.aspectRatio || 1)) * 100}%` }}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  touchStartX.current = t.clientX;
                  touchStartY.current = t.clientY;
                }}
                onTouchEnd={(e) => {
                  const startX = touchStartX.current;
                  const startY = touchStartY.current;
                  touchStartX.current = null;
                  touchStartY.current = null;
                  if (startX === null || startY === null) return;
                  const t = e.changedTouches[0];
                  const dx = t.clientX - startX;
                  const dy = t.clientY - startY;
                  if (Math.abs(dx) < 55) return;
                  if (Math.abs(dx) < Math.abs(dy)) return;
                  if (dx < 0) goNext();
                  else goPrev();
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={activePhoto.src}
                    alt="Memory photo"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                    loading="eager"
                  />
                </div>
              </div>
              <div className="mt-3 px-2 pb-2 text-center text-xs text-white/80">
                Swipe left and right
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
