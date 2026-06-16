"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Star } from "lucide-react";
import { ReactNode } from "react";

type FrameStyle = "wiggle" | "hearts" | "tape" | "sparkle" | "tilt" | "star";

const frameStyles: FrameStyle[] = ["wiggle", "hearts", "tape", "sparkle", "tilt", "star"];

type PolaroidFrameProps = {
  src: string;
  alt: string;
  index: number;
  priority?: boolean;
  showEntrance?: boolean;
  children?: ReactNode;
};

export function PolaroidFrame({ src, alt, index, priority, showEntrance, children }: PolaroidFrameProps) {
  const style = frameStyles[index % frameStyles.length];
  const rotate = index % 2 === 0 ? -2.5 : 2.5;

  const motionProps = {
    wiggle: {
      animate: { rotate: [rotate, rotate + 1.5, rotate - 1.5, rotate] },
      transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const }
    },
    hearts: {
      animate: { scale: [1, 1.02, 1], y: [0, -3, 0] },
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const }
    },
    tape: {
      animate: { rotate: [rotate, rotate + 0.6, rotate] },
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const }
    },
    sparkle: {
      animate: {
        boxShadow: [
          "0 14px 36px rgba(255,139,168,0.2)",
          "0 18px 42px rgba(255,215,225,0.45)",
          "0 14px 36px rgba(255,139,168,0.2)"
        ]
      },
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const }
    },
    tilt: {
      animate: { rotate: [rotate - 1, rotate + 1, rotate - 1] },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
    },
    star: {
      animate: { y: [0, -4, 0], rotate: [rotate, rotate + 2, rotate] },
      transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" as const }
    }
  };

  const entrance = showEntrance
    ? { initial: { opacity: 0, y: 16, rotate } as const, animate: { opacity: 1, y: 0, ...motionProps[style].animate } }
    : { initial: { opacity: 1, y: 0, rotate } as const, animate: motionProps[style].animate };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xs rounded-[1.15rem] border-2 border-[#fff6f8] bg-[#fffafc] p-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
      {...entrance}
      transition={{ delay: showEntrance ? index * 0.06 : 0, ...motionProps[style].transition }}
      style={style === "sparkle" ? undefined : { rotate }}
    >
      {style === "tape" && (
        <>
          <div className="absolute -left-2 top-3 z-20 h-7 w-14 -rotate-12 rounded-sm bg-[#fff3c4]/85 shadow-sm" />
          <div className="absolute -right-2 top-5 z-20 h-7 w-14 rotate-12 rounded-sm bg-[#fff3c4]/85 shadow-sm" />
        </>
      )}
      {style === "hearts" && (
        <motion.div
          className="absolute -right-1 -top-2 z-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <Heart className="h-4 w-4 text-[#ff8ba8]" fill="#ff8ba8" />
        </motion.div>
      )}
      {style === "sparkle" && (
        <motion.div
          className="absolute -left-1 top-1 z-20"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 text-[#ffd7e1]" />
        </motion.div>
      )}
      <div
        className={`relative overflow-hidden rounded-xl bg-[#fffafc] ${
          style === "hearts" ? "ring-2 ring-[#ff8ba8]/50" : ""
        } ${style === "star" ? "ring-2 ring-[#ffd7e1]/40" : ""}`}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={1200}
          className="h-auto w-full object-cover"
          sizes="(max-width: 640px) 90vw, 450px"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder="empty"
        />
        {style === "wiggle" && (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#ff8ba8]/15 via-transparent to-[#ffd7e1]/20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-xs text-[#b76e79]/80 [font-family:'Segoe_Script','Lucida_Handwriting',cursive]">
          us
        </span>
        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <Star className="h-3.5 w-3.5 text-[#ff8ba8]" fill="#ff8ba8" />
        </motion.div>
      </div>
      {children}
    </motion.div>
  );
}
