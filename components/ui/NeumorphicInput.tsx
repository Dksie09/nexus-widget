"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

export interface NeumorphicInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  rightElement?: React.ReactNode;
}

export const NeumorphicInput = forwardRef<
  HTMLInputElement,
  NeumorphicInputProps
>(({ className, rightElement, ...props }, ref) => {
  const { themeConfig } = useTheme();

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        className={cn(
          "w-full rounded-2xl p-4 text-gray-700 placeholder-gray-400 focus:outline-none transition-all",
          rightElement && "pr-24",
          className
        )}
        style={{
          background: themeConfig.background,
          boxShadow: getNeumorphicShadow(themeConfig, "inset"),
        }}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
});

NeumorphicInput.displayName = "NeumorphicInput";
