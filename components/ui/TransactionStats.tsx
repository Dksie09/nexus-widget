"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface StatRow {
  label: string;
  value: ReactNode;
  action?: ReactNode;
}

export interface TransactionStatsProps {
  rows: StatRow[];
  className?: string;
}

export function TransactionStats({ rows, className }: TransactionStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={className}
      style={{
        background: "#F0F0F3",
        boxShadow: `
          inset -3px -3px 8px 0 rgba(255, 255, 255, 0.5),
          inset 3px 3px 8px 0 rgba(174, 174, 192, 0.2)
        `,
      }}
    >
      {rows.map((row, index) => (
        <div key={index}>
          {index > 0 && (
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(174, 174, 192, 0.3), transparent)",
              }}
            />
          )}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-gray-600 font-medium">{row.label}</span>
              {row.action}
            </div>
            <div className="flex flex-col items-end">{row.value}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
