"use client";

import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  isLoading: boolean;
};

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14060d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-4 text-5xl"
              animate={{ scale: [1, 1.18, 1], rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              ❤️
            </motion.div>
            <motion.p
              className="rose-gradient-text text-lg font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              Preparing Our Scrapbook...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
