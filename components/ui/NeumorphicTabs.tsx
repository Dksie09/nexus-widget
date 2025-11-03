"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getNeumorphicShadow } from "@/lib/theme";

export interface Tab {
  id: string;
  label: string;
}

export interface NeumorphicTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function NeumorphicTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: NeumorphicTabsProps) {
  const { themeConfig } = useTheme();

  return (
    <div
      className={`relative flex gap-2 p-2 rounded-2xl ${className}`}
      style={{
        background: themeConfig.background,
        boxShadow: getNeumorphicShadow(themeConfig, "tab-inset"),
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
          style={{
            color: activeTab === tab.id ? "#6B7280" : "#9CA3AF",
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
                background: themeConfig.background,
                boxShadow: `
                  -5px -5px 10px 0 ${themeConfig.lightShadow.replace(
                    "1)",
                    "0.7)"
                  )},
                  10px 10px 10px 0 ${themeConfig.darkShadow.replace(
                    "0.4",
                    "0.2"
                  )}
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

export interface NeumorphicTabPanelsProps {
  children: ReactNode;
  activeKey?: string;
  className?: string;
}

export function NeumorphicTabPanels({
  children,
  activeKey,
  className = "",
}: NeumorphicTabPanelsProps) {
  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
