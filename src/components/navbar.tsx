"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Menu, MoonStar, Sun } from "lucide-react";

import { Transition, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useFontRye } from "@/hooks/useFontRye";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";

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
      url: "https://github.com/Riverif/shortstory-ai",
      isActive: false,
    },
    {
      label: "Contact",
      url: "mailto:rifkialfiann@gmail.com",
      isActive: false,
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-between px-6 md:px-[120px]",
        !routes[0].isActive && "bg-background",
      )}
    >
      <Link href="/" className={cn("md:text-2xl", useFontRye.className)}>
        Short Story AI
      </Link>

      <div className="flex gap-4 md:gap-6">
        <ul className="hidden items-center gap-4 md:flex">
          {routes.map((route) => (
            <motion.li
              animate="init"
              whileHover="hover"
              key={route.url}
              className="relative"
            >
              <Link href={route.url}>
                <motion.div
                  variants={{
                    init: { scaleX: route.isActive ? 1 : 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={transitionSet}
                  className="absolute top-0.5 h-full w-full origin-left border-b border-foreground"
                />
                {route.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center justify-center md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-translate-x-10">
              {routes.map((route) => (
                <DropdownMenuItem key={route.url}>
                  <Link href={route.url}>{route.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Button */}
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
