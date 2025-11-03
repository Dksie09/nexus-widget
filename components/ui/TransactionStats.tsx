"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface StatRow {
  label?: string;
  value: ReactNode;
  action?: ReactNode;
}

export interface TransactionStatsProps {
  rows: StatRow[];
  className?: string;
}

export function TransactionStats({ rows, className }: TransactionStatsProps) {
  const { themeConfig } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={className}
      style={{
        background: themeConfig.background,
        boxShadow: `
          inset -3px -3px 8px 0 ${themeConfig.insetLightShadow.replace(
            "1)",
            "0.5)"
          )},
          inset 3px 3px 8px 0 ${themeConfig.insetDarkShadow.replace(
            "0.4",
            "0.2"
          )}
        `,
      }}
    >
      {rows.map((row, index) => (
        <div key={index}>
          {index > 0 && (
            <div
              className="h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${themeConfig.darkShadow.replace(
                  "0.4",
                  "0.3"
                )}, transparent)`,
              }}
            />
          )}
          <div className="flex items-center justify-between">
            {row.label ? (
              <>
                <span className="text-gray-600 font-medium">{row.label}</span>
                {row.value}
              </>
            ) : (
              <>
                {row.value}
                {row.action}
              </>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
