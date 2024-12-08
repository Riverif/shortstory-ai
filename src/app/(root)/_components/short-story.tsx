"use client";

import { useToast } from "@/hooks/use-toast";
import { parseStory } from "@/lib/story-format";
import { Copy, Loader2, XCircle } from "lucide-react";
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

export const ShortStory = ({
  close,
  story,
}: {
  close: () => void;
  story?: string;
}) => {
  const theStory = parseStory(story);
  const { toast } = useToast();

  const copyCodeToClipboard = () => {
    navigator.clipboard
      .writeText(story || "")
      .then(() => {
        toast({ title: "Success copy to clipboard" });
      })
      .catch((err) => {
        console.error("Failed to copy code:", err);
      });
  };

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
      <motion.div
        variants={{ generate: { opacity: 0 }, finish: { opacity: 1 } }}
        className="absolute inset-0 flex h-[80%] flex-col gap-2 overflow-y-scroll px-10 pt-6"
      >
        <h2 className="text-2xl font-semibold">{theStory.title}</h2>
        <p className="whitespace-pre-wrap">{theStory.story}</p>
        {/* {story} */}
      </motion.div>
      <motion.div
        variants={{ generate: { opacity: 0 }, finish: { opacity: 1 } }}
        className="absolute bottom-10 flex gap-5 rounded-full p-2 dark:bg-black"
      >
        <motion.button
          onClick={close}
          className="flex items-center gap-1 hover:brightness-75"
        >
          <XCircle className="aspect-square h-5" />
          Close
        </motion.button>
        <motion.button
          onClick={copyCodeToClipboard}
          className="flex items-center gap-1 hover:brightness-75"
        >
          <Copy className="aspect-square h-5" /> Copy
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
