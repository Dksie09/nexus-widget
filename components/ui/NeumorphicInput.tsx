"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface NeumorphicInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  rightElement?: React.ReactNode;
}

export const NeumorphicInput = forwardRef<
  HTMLInputElement,
  NeumorphicInputProps
>(({ className, rightElement, ...props }, ref) => {
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
          background: "#F0F0F3",
          boxShadow: `
            inset -5px -5px 10px 0 #FFFFFF,
            inset 5px 5px 10px 0 rgba(174, 174, 192, 0.4)
          `,
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
