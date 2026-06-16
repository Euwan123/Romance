"use client";

import { useEffect, useRef, useState } from "react";

export function FpsCounter() {
  const [fps, setFps] = useState(0);
  const lastTime = useRef<number | null>(null);
  const frames = useRef<number[]>([]);

  useEffect(() => {
    let frameId: number;

    const loop = (timestamp: number) => {
      if (lastTime.current == null) {
        lastTime.current = timestamp;
      } else {
        const delta = timestamp - lastTime.current;
        lastTime.current = timestamp;
        const currentFps = delta > 0 ? 1000 / delta : 0;
        frames.current.push(currentFps);
        if (frames.current.length > 40) frames.current.shift();
        const avg = frames.current.reduce((a, b) => a + b, 0) / frames.current.length;
        setFps(Math.round(avg));
      }
      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed right-2 top-2 z-[90] rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium text-[#ffd7e1]">
      {fps} fps
    </div>
  );
}

