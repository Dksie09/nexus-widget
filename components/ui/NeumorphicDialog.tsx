"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef, ReactNode } from "react";

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
        // Allow form submission via Cmd/Ctrl+Enter
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
      {/* Trigger Button */}
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
                  background: "#F0F0F3",
                  boxShadow: `
                    -10px -10px 30px 0 #FFFFFF,
                    10px 10px 30px 0 rgba(174, 174, 192, 0.4),
                    inset -10px -10px 10px 0 rgba(174, 174, 192, 0.25),
                    inset 10px 10px 10px 0 #FFFFFF
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

      {/* Dialog Overlay and Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "rgba(240, 240, 243, 0.3)",
            }}
          >
            <motion.div
              ref={dialogRef}
              className="w-full max-w-md rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  -10px -10px 30px 0 #FFFFFF,
                  10px 10px 30px 0 rgba(174, 174, 192, 0.4)
                `,
              }}
            >
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

// Subcomponents for better composition
export function NeumorphicDialogTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div
      className="relative flex gap-2 p-2 rounded-2xl"
      style={{
        background: "#F0F0F3",
        boxShadow: `
          inset -5px -5px 10px 0 rgba(255, 255, 255, 0.5),
          inset 5px 5px 10px 0 rgba(174, 174, 192, 0.3)
        `,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
          style={{
            color: "#9CA3AF",
            textShadow:
              activeTab === tab.id
                ? `
                    0 0 10px rgba(174, 174, 192, 0.2),
                    0 0 20px rgba(174, 174, 192, 0.2)
                  `
                : "none",
          }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-xl"
              style={{
                background: "#F0F0F3",
                boxShadow: `
                  -10px -10px 10px 0 rgba(255, 255, 255, 0.7),
                  10px 10px 10px 0 rgba(174, 174, 192, 0.2)
                `,
              }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export function NeumorphicDialogContent({
  children,
  activeKey,
}: {
  children: ReactNode;
  activeKey?: string;
}) {
  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
