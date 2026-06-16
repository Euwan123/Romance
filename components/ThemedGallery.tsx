"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { galleryAlbums } from "@/data/galleries";
import type { GalleryAlbum } from "@/data/galleries";

type MemoryPhoto = {
  id: string;
  src: string;
  thumbSrc: string;
  width: number;
  height: number;
  aspectRatio: number;
};

type ThemedGalleryProps = {
  albumId: string;
  photos: MemoryPhoto[];
  onBack: () => void;
};

function PhotoCard({
  photo,
  index,
  theme,
  onOpen
}: {
  photo: MemoryPhoto;
  index: number;
  theme: GalleryAlbum["theme"];
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
      { threshold: 0.15, rootMargin: "180px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paddingTop = useMemo(() => {
    const ratio = photo.aspectRatio && Number.isFinite(photo.aspectRatio) ? photo.aspectRatio : 1;
    return `${Math.max(0.2, 1 / ratio) * 100}%`;
  }, [photo.aspectRatio]);

  const rotate = index % 2 === 0 ? -2 : 2;

  return (
    <motion.button
      ref={cardRef}
      type="button"
      className="mb-3 inline-block w-full break-inside-avoid text-left"
      onClick={onOpen}
      initial={{ rotate }}
      whileTap={{ scale: 0.98 }}
      style={{ background: theme.cardBg }}
    >
      <div
        className="overflow-hidden rounded-2xl border border-white/20 p-2 shadow-glass"
        style={{ boxShadow: `0 8px 24px ${theme.glow}` }}
      >
        <div className="relative w-full overflow-hidden rounded-xl bg-white/5" style={{ paddingTop }}>
          {visible && (
            <Image
              src={photo.thumbSrc}
              alt="Memory"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 280px"
              quality={35}
              loading="lazy"
            />
          )}
        </div>
      </div>
    </motion.button>
  );
}

export function ThemedGallery({ albumId, photos, onBack }: ThemedGalleryProps) {
  const album = galleryAlbums.find((a) => a.id === albumId);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const theme = album?.theme ?? galleryAlbums[0].theme;
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeIndex]);

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
    <section className="relative z-10 mx-auto min-h-screen w-full max-w-md px-4 pb-10 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white"
        >
          ← Albums
        </button>
        <span className="text-lg">{theme.emoji}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-5 rounded-2xl bg-gradient-to-r ${theme.gradient} p-4 text-center shadow-glow`}
      >
        <h1 className="text-xl font-semibold text-white">{album?.title ?? "Gallery"}</h1>
        <p className="mt-1 text-sm text-white/90">{album?.subtitle}</p>
      </motion.div>

      {photos.length === 0 ? (
        <div className="glass rounded-3xl p-6 text-center text-white/80">No photos in this album yet.</div>
      ) : (
        <div className="columns-2" style={{ columnGap: 12 }}>
          {photos.map((photo, idx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={idx}
              theme={theme}
              onOpen={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="glass relative w-full max-w-md rounded-3xl p-3"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white"
                onClick={() => setActiveIndex(null)}
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
                  const sx = touchStartX.current;
                  const sy = touchStartY.current;
                  touchStartX.current = null;
                  touchStartY.current = null;
                  if (sx === null || sy === null) return;
                  const dx = e.changedTouches[0].clientX - sx;
                  const dy = e.changedTouches[0].clientY - sy;
                  if (Math.abs(dx) < 55) return;
                  if (Math.abs(dx) < Math.abs(dy)) return;
                  if (dx < 0) goNext();
                  else goPrev();
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={activePhoto.src}
                    alt="Memory"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                    loading="eager"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-white/75">
                {activeIndex + 1} / {photos.length} · swipe to browse
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
