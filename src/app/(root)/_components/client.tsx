"use client";

import { motion, Transition, Variants } from "motion/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFontRye } from "@/hooks/useFontRye";
import { cn } from "@/lib/utils";

import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { shortStoryChema } from "@/schema";

import { ShortStory } from "./short-story";

const transitionSet: Transition = { ease: "easeOut", duration: 0.4 };

const initVar: Variants = {
  init: { y: 20, opacity: 0, transition: transitionSet },
  start: {
    y: 0,
    opacity: 1,
    transition: transitionSet,
  },
  generate: { y: 0, opacity: 0, display: "none", transition: transitionSet },
};

type AnimState = "start" | "generate" | "finish";

export type Log = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const HomeClient = () => {
  const [animState, setAnimState] = useState<AnimState>("start");
  const [wordLong, setWordLong] = useState(100);

  const [story, setStory] = useState("");
  const [log, setLog] = useState<Log[]>([]);

  const form = useForm<z.infer<typeof shortStoryChema>>({
    resolver: zodResolver(shortStoryChema),
    defaultValues: {
      genre: undefined,
      wordLong: 100,
    },
  });

  const onSubmit = async (value: z.infer<typeof shortStoryChema>) => {
    try {
      setAnimState("generate");
      const body = {
        log,
        genre: value.genre,
        wordLong: value.wordLong,
      };

      await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setStory(data.story);
          setLog([...log, ...data.log]);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setAnimState("finish");
    }
  };

  const close = () => {
    setAnimState("start");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-10">
      {/* Text */}
      <motion.div
        initial="init"
        animate={animState}
        className="space-y-3 text-center md:max-w-[600px]"
      >
        <motion.h1
          variants={initVar}
          className={cn("text-4xl md:text-7xl", useFontRye.className)}
        >
          <span className="text-blue-900 dark:text-cream">Short </span>
          Story AI
        </motion.h1>
        <motion.p variants={initVar} className="text-xs md:text-base">
          Driven by AI, painlessly construct unique stories, illustrate
          thrilling tales, write seductive romances, or just fool around. No
          censorship or guidelines - anything goes!
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial="init"
        animate={animState}
        className="space-y-3 text-center"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap items-start justify-center gap-4"
          >
            <motion.div variants={initVar}>
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="flex w-[180px] items-center justify-center rounded-full bg-blue-900 font-bold text-white hover:brightness-90 dark:bg-[#FCEDB4] dark:text-black">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ADVENTURE">Adventure</SelectItem>
                          <SelectItem value="FANTASY">Fantasy</SelectItem>
                          <SelectItem value="SCI-FI">Sci-Fi</SelectItem>
                          <SelectItem value="ROMANCE">Romance</SelectItem>
                          <SelectItem value="HORROR">Horror</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="rounded-full bg-white p-1 text-sm" />
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="space-y-4">
              <motion.button
                type="submit"
                variants={initVar}
                className="rounded-full bg-blue-950 p-2 px-6 text-sm font-bold text-white hover:brightness-90 dark:bg-[#FCEDB4] dark:text-black md:w-[300px] md:text-base"
              >
                Generate{" "}
                <span className="underline underline-offset-8">
                  {wordLong}{" "}
                </span>
                word story
              </motion.button>
              <motion.div variants={initVar} className="space-y-2">
                <FormField
                  control={form.control}
                  name="wordLong"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          max={500}
                          min={100}
                          onValueChange={(v) => {
                            field.onChange(v);
                            setWordLong(v[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="rounded-full bg-white p-1 text-sm" />
                    </FormItem>
                  )}
                />

                <p className="text-left text-sm">Custom Word Number</p>
              </motion.div>
            </div>
          </form>
        </Form>
      </motion.div>
      <motion.div
        animate={animState}
        className="absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%]"
      >
        <ShortStory close={close} story={story} />
      </motion.div>
    </div>
  );
};
