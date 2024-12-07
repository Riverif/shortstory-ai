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

export const HomeClient = () => {
  const [animState, setAnimState] = useState<AnimState>("start");
  const [wordLong, setWordLong] = useState(100);

  const form = useForm<z.infer<typeof shortStoryChema>>({
    resolver: zodResolver(shortStoryChema),
    defaultValues: {
      genre: undefined,
      wordLong: 100,
    },
  });

  const onSubmit = async (value: z.infer<typeof shortStoryChema>) => {
    try {
      console.log(value);
      setAnimState("generate");
    } catch (error) {
      console.log(error);
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
        className="w-[40%] space-y-3 text-center"
      >
        <motion.h1
          variants={initVar}
          className={cn("text-7xl", useFontRye.className)}
        >
          <span className="text-[#FCEDB4]">Short </span>
          Story AI
        </motion.h1>
        <motion.p variants={initVar}>
          Driven by AI, painlessly construct unique stories, illustrate
          thrilling tales, write seductive romances, or just fool around. No
          censorship or guidelines - anything goes!
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial="init"
        animate={animState}
        className="w-[40%] space-y-3 text-center"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start justify-center space-x-2"
          >
            <motion.div variants={initVar}>
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="flex w-[180px] items-center justify-center rounded-full p-2 font-bold dark:bg-[#FCEDB4] dark:text-black">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="space-y-4">
              <motion.button
                type="submit"
                variants={initVar}
                className="w-[300px] rounded-full p-2 font-bold dark:bg-[#FCEDB4] dark:text-black"
              >
                Generate{" "}
                <span className="underline underline-offset-8">
                  {wordLong}{" "}
                </span>
                word story
              </motion.button>
              <motion.div variants={initVar} className="space-y-2">
                <Slider
                  max={500}
                  min={100}
                  onValueChange={(v) => setWordLong(v[0])}
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
        <ShortStory close={close} />
      </motion.div>
    </div>
  );
};