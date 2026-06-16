"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryAlbums } from "@/data/galleries";

type GalleryAlbumPickerProps = {
  covers: Record<string, string | null>;
  counts: Record<string, number>;
  onSelect: (albumId: string) => void;
  onBack: () => void;
};

export function GalleryAlbumPicker({ covers, counts, onSelect, onBack }: GalleryAlbumPickerProps) {
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
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Gallery</span>
      </div>

      <motion.h1
        className="mb-2 text-center text-2xl font-semibold rose-gradient-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pick an Album
      </motion.h1>
      <p className="mb-6 text-center text-sm text-white/75">Six little worlds of us</p>

      <div className="grid grid-cols-2 gap-3">
        {galleryAlbums.map((album, idx) => {
          const cover = covers[album.id];
          const count = counts[album.id] ?? 0;
          return (
            <motion.button
              key={album.id}
              type="button"
              onClick={() => onSelect(album.id)}
              className="overflow-hidden rounded-2xl border border-white/20 text-left shadow-glass"
              style={{ background: album.theme.cardBg }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`relative h-28 bg-gradient-to-br ${album.theme.gradient}`}>
                {cover ? (
                  <Image src={cover} alt={album.title} fill className="object-cover opacity-90" sizes="45vw" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">{album.theme.emoji}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2 left-2 text-lg">{album.theme.emoji}</span>
              </div>
              <div className="p-3">
                <h2 className="text-sm font-semibold text-white">{album.title}</h2>
                <p className="mt-0.5 text-xs text-white/70">{album.subtitle}</p>
                <p className="mt-1 text-[10px] text-white/55">{count} photos</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
