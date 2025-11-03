"use client";

import { motion } from "motion/react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeColor } from "@/lib/theme";

const themeOptions: { value: ThemeColor; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#F0F0F3" },
  { value: "pink", label: "Pink", color: "#F3F0F3" },
  { value: "green", label: "Green", color: "#F0F3F0" },
];

export function ThemeToggle() {
  const { theme, themeConfig, setTheme } = useTheme();

  return (
    <div
      className="inline-flex gap-2 p-2 rounded-2xl"
      style={{
        background: themeConfig.background,
        boxShadow: `
          inset -5px -5px 10px 0 ${themeConfig.insetLightShadow.replace(
            "1)",
            "0.5)"
          )},
          inset 5px 5px 10px 0 ${themeConfig.insetDarkShadow.replace(
            "0.4",
            "0.3"
          )}
        `,
      }}
    >
      {themeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            color: theme === option.value ? "#6B7280" : "#9CA3AF",
          }}
        >
          {theme === option.value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 rounded-xl"
              style={{
                background: themeConfig.background,
                boxShadow: `
                  -5px -5px 10px 0 ${themeConfig.lightShadow.replace(
                    "1)",
                    "0.7)"
                  )},
                  5px 5px 10px 0 ${themeConfig.darkShadow.replace("0.4", "0.2")}
                `,
              }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: option.color,
                boxShadow: `
                  -2px -2px 4px 0 rgba(255, 255, 255, 0.8),
                  2px 2px 4px 0 rgba(0, 0, 0, 0.1)
                `,
              }}
            />
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
