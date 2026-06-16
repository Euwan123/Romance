"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { DiaryGate } from "@/components/DiaryGate";
import { DiaryView } from "@/components/DiaryView";
import { FpsCounter } from "@/components/FpsCounter";
import { GalleryAlbumPicker } from "@/components/GalleryAlbumPicker";
import { HeartTrail } from "@/components/HeartTrail";
import { LandingHub } from "@/components/LandingHub";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MusicToggle } from "@/components/MusicToggle";
import { StoryBook } from "@/components/StoryBook";
import { ThemedGallery } from "@/components/ThemedGallery";

type View = "landing" | "book" | "gallery-pick" | "gallery-view" | "diary-gate" | "diary";

type ManifestAlbum = {
  id: string;
  cover: string | null;
  count: number;
  photos: Array<{
    id: string;
    src: string;
    thumbSrc: string;
    width: number;
    height: number;
    aspectRatio: number;
  }>;
};

export function RomanceExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<View>("landing");
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [manifest, setManifest] = useState<ManifestAlbum[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch("/api/galleries");
        const data = (await res.json()) as { albums: ManifestAlbum[] };
        if (!cancelled) setManifest(Array.isArray(data.albums) ? data.albums : []);
      } catch {
        if (!cancelled) setManifest([]);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const covers = useMemo(() => {
    const map: Record<string, string | null> = {};
    for (const album of manifest) map[album.id] = album.cover;
    return map;
  }, [manifest]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const album of manifest) map[album.id] = album.count;
    return map;
  }, [manifest]);

  const albumPhotos = useMemo(() => {
    if (!selectedAlbum) return [];
    return manifest.find((a) => a.id === selectedAlbum)?.photos ?? [];
  }, [manifest, selectedAlbum]);

  const goHome = () => {
    setView("landing");
    setSelectedAlbum(null);
  };

  return (
    <main className="relative overflow-hidden">
      <LoadingScreen isLoading={isLoading} />
      <AnimatedBackground />
      <HeartTrail />
      <MusicToggle />
      <FpsCounter />

      <AnimatePresence mode="wait">
        <motion.div
          key={view + (selectedAlbum ?? "")}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.35 }}
        >
          {view === "landing" && (
            <LandingHub
              onSelect={(mode) => {
                if (mode === "book") setView("book");
                if (mode === "gallery") setView("gallery-pick");
                if (mode === "diary") {
                  const unlocked = sessionStorage.getItem("diary_unlocked") === "1";
                  setView(unlocked ? "diary" : "diary-gate");
                }
              }}
            />
          )}
          {view === "book" && <StoryBook onBack={goHome} />}
          {view === "gallery-pick" && (
            <GalleryAlbumPicker
              covers={covers}
              counts={counts}
              onBack={goHome}
              onSelect={(albumId) => {
                setSelectedAlbum(albumId);
                setView("gallery-view");
              }}
            />
          )}
          {view === "gallery-view" && selectedAlbum && (
            <ThemedGallery albumId={selectedAlbum} photos={albumPhotos} onBack={() => setView("gallery-pick")} />
          )}
          {view === "diary-gate" && (
            <DiaryGate onUnlock={() => setView("diary")} onBack={goHome} />
          )}
          {view === "diary" && <DiaryView onBack={goHome} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
