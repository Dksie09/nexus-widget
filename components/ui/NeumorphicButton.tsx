"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

export interface NeumorphicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  isLoading?: boolean;
  loadingText?: string;
}

export const NeumorphicButton = forwardRef<
  HTMLButtonElement,
  NeumorphicButtonProps
>(
  (
    {
      className,
      children,
      variant = "default",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const { themeConfig } = useTheme();

    const baseStyles = {
      background: themeConfig.background,
      boxShadow: getNeumorphicShadow(
        themeConfig,
        variant === "primary" ? "primary" : "default"
      ),
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
          variant === "primary" ? "h-12" : "px-4 py-3",
          className
        )}
        style={baseStyles}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-gray-700 font-medium"
            >
              <motion.div
                className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          ) : (
            <motion.span
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-gray-700 font-medium"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";
