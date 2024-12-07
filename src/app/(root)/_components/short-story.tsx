"use client";

import { Loader2 } from "lucide-react";
import { motion, Variants } from "motion/react";

const containerVar: Variants = {
  start: { opacity: 0, scale: 0 },
  generate: {
    opacity: 1,
    scale: 1,
    borderRadius: 100,
    transition: { delay: 0.4 },
  },
  finish: {
    width: "var(--finish-width)",
    height: "var(--finish-height)",
    opacity: 0.9,
    scale: 1,
    borderRadius: 16,
    transition: { duration: 0.4 },
  },
};

export const ShortStory = ({ close }: { close: () => void }) => {
  return (
    <motion.div
      variants={containerVar}
      className="relative flex aspect-square w-14 items-center justify-center bg-black opacity-0"
    >
      <motion.div
        variants={{ generate: { opacity: 1 }, finish: { opacity: 0 } }}
      >
        <Loader2 className="w-6 animate-spin" />
      </motion.div>
      <motion.button
        variants={{ generate: { opacity: 0 }, finish: { opacity: 1 } }}
        className="absolute bottom-5 left-5"
        onClick={close}
      >
        Close
      </motion.button>
      <motion.button
        variants={{ generate: { opacity: 0 }, finish: { opacity: 1 } }}
        className="absolute right-5 top-5"
        onClick={close}
      >
        Copy
      </motion.button>
    </motion.div>
  );
};
