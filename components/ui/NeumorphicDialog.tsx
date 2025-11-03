"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef, ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  NeumorphicTabs,
  NeumorphicTabPanels,
  type NeumorphicTabsProps,
  type NeumorphicTabPanelsProps,
} from "./NeumorphicTabs";

export interface NeumorphicDialogProps {
  trigger?: ReactNode;
  triggerText?: string;
  title?: string;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NeumorphicDialog({
  trigger,
  triggerText = "Open",
  title,
  children,
  open: controlledOpen,
  onOpenChange,
}: NeumorphicDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const { themeConfig } = useTheme();

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && open) {
        const form = dialogRef.current?.querySelector("form");
        if (form) {
          form.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {!open && (
          <>
            {trigger ? (
              <div onClick={handleOpenDialog}>{trigger}</div>
            ) : (
              <motion.button
                onClick={handleOpenDialog}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative w-32 h-16 rounded-3xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                style={{
                  background: themeConfig.background,
                  boxShadow: `
                    -10px -10px 30px 0 ${themeConfig.lightShadow},
                    10px 10px 30px 0 ${themeConfig.darkShadow},
                    inset -10px -10px 10px 0 ${themeConfig.insetDarkShadow.replace(
                      "0.4",
                      "0.25"
                    )},
                    inset 10px 10px 10px 0 ${themeConfig.insetLightShadow}
                  `,
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: `
                      inset 0 0 15px 0 rgba(255, 255, 255, 0.5),
                      0 0 20px 0 rgba(255, 255, 255, 0.3)
                    `,
                  }}
                />
                <motion.span className="relative z-10 text-gray-700 font-medium">
                  {triggerText}
                </motion.span>
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor:
                themeConfig.background
                  .replace("#", "rgba(")
                  .match(/.{2}/g)!
                  .map((hex) => parseInt(hex, 16))
                  .join(", ") + ", 0.3)",
            }}
          >
            <motion.div
              ref={dialogRef}
              className="w-full max-w-md rounded-3xl p-8 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                background: themeConfig.background,
                boxShadow: `
                  -10px -10px 30px 0 ${themeConfig.lightShadow},
                  10px 10px 30px 0 ${themeConfig.darkShadow}
                `,
              }}
            >
              <motion.button
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1,
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center group transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-200"
                  style={{
                    stroke: "#9CA3AF",
                  }}
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="group-hover:stroke-red-500 transition-all duration-200"
                  />
                </svg>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                {title && (
                  <motion.h2
                    className="text-2xl font-semibold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h2>
                )}
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const NeumorphicDialogTabs = NeumorphicTabs;
export const NeumorphicDialogContent = NeumorphicTabPanels;

export type { NeumorphicTabsProps, NeumorphicTabPanelsProps };
