"use client";

import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/music/Music1.mp4";
const MUSIC_VOLUME = 0.22;

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    const startOnInteraction = async () => {
      if (!audioRef.current || playingRef.current) return;
      try {
        await audioRef.current.play();
        playingRef.current = true;
        setPlaying(true);
      } catch {}
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
    };

    window.addEventListener("pointerdown", startOnInteraction, { passive: true });
    window.addEventListener("touchstart", startOnInteraction, { passive: true });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      window.removeEventListener("pointerdown", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      playingRef.current = false;
      setPlaying(false);
      return;
    }
    try {
      audioRef.current.volume = MUSIC_VOLUME;
      await audioRef.current.play();
      playingRef.current = true;
      setPlaying(true);
    } catch {
      playingRef.current = false;
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className="glass fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm"
      aria-label="Toggle background music"
    >
      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      <Volume2 className="h-3.5 w-3.5 text-white/70" />
      {!ready ? "..." : playing ? "On" : "Off"}
    </button>
  );
}
