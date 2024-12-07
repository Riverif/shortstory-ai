"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { MoonStar, Sun } from "lucide-react";

import { Transition, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useFontRye } from "@/hooks/useFontRye";

const transitionSet: Transition = { ease: "easeInOut" };

export const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const routes = [
    {
      label: "Generate Story",
      url: "/",
      isActive: pathname === "/",
    },
    {
      label: "About",
      url: "/about",
      isActive: pathname === "/about",
    },
    {
      label: "Source Code",
      url: "/sourcecode",
      isActive: pathname === "/sourcecode",
    },
    {
      label: "Contact",
      url: "/contact",
      isActive: pathname === "/contact",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-between px-6 md:px-[120px]">
      <span className={cn("text-2xl", useFontRye.className)}>
        Short Story AI
      </span>
      <div className="flex gap-6">
        <ul className="hidden items-center gap-4 md:flex">
          {routes.map((route) => (
            <motion.li
              animate="init"
              whileHover="hover"
              key={route.url}
              className="relative cursor-pointer"
            >
              <motion.div
                variants={{
                  init: { scaleX: route.isActive ? 1 : 0 },
                  hover: { scaleX: 1 },
                }}
                transition={transitionSet}
                className="absolute top-0.5 h-full w-full origin-left border-b border-foreground"
              />
              {route.label}
            </motion.li>
          ))}
        </ul>
        <motion.button
          animate={theme}
          className="relative flex aspect-square h-10 items-center justify-center overflow-hidden rounded-full border border-foreground"
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <motion.div
            variants={{
              dark: { x: 50 },
              light: { x: 0 },
            }}
            transition={transitionSet}
            className="absolute bg-white p-4"
          >
            <Sun className="aspect-square h-5" />
          </motion.div>
          <motion.div
            variants={{
              dark: { x: 0 },
              light: { x: -50 },
            }}
            transition={transitionSet}
            className="absolute bg-black p-4"
          >
            <MoonStar className="aspect-square h-5" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
