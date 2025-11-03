"use client";

import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

interface Option<T> {
  value: T;
  label: string;
}

export interface NeumorphicSelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  compact?: boolean;
}

function NeumorphicSelectInner<T extends string>(
  {
    options,
    value,
    onChange,
    className,
    compact = false,
  }: NeumorphicSelectProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { themeConfig } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const ChevronIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-200"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const DropdownOption = ({
    option,
    isSelected,
    onClick,
  }: {
    option: Option<T>;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full px-4 py-2 text-sm font-medium transition-all duration-200 text-left"
        style={{
          background: isSelected
            ? themeConfig.darkShadow.replace("0.4)", "0.15)")
            : isHovered
            ? themeConfig.lightShadowHover
            : "transparent",
          color: isSelected ? "#1F2937" : "#374151",
          fontWeight: isSelected ? 600 : 500,
        }}
      >
        {option.label}
      </button>
    );
  };

  return (
    <div ref={ref || containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-xl text-sm font-medium text-gray-700 transition-all duration-200 flex items-center justify-between",
          compact ? "px-3 py-2 hover:scale-105" : "px-4 py-3 hover:scale-[1.01]"
        )}
        style={{
          background: themeConfig.background,
          boxShadow: getNeumorphicShadow(themeConfig),
        }}
      >
        <span>{selectedOption?.label || "Select..."}</span>
        <ChevronIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute mt-2 rounded-xl overflow-hidden z-50",
              compact ? "right-0" : "left-0 right-0"
            )}
            style={{
              background: themeConfig.background,
              boxShadow: `
                -5px -5px 15px 0 ${themeConfig.lightShadow},
                5px 5px 15px 0 ${themeConfig.darkShadow}
              `,
            }}
          >
            {options.map((option) => (
              <DropdownOption
                key={String(option.value)}
                option={option}
                isSelected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const NeumorphicSelect = forwardRef(NeumorphicSelectInner) as <
  T extends string
>(
  props: NeumorphicSelectProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof NeumorphicSelectInner>;
