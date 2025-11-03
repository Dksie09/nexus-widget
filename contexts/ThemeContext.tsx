"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeColor, ThemeConfig, themes, getThemeConfig } from "@/lib/theme";

interface ThemeContextValue {
  theme: ThemeColor;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeColor>("blue");
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(themes.blue);

  useEffect(() => {
    const savedTheme = localStorage.getItem("neumorphic-theme") as ThemeColor;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-neu-theme", savedTheme);
    }
    setThemeConfig(getThemeConfig());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-neu-theme", theme);
    requestAnimationFrame(() => {
      setThemeConfig(getThemeConfig());
    });
  }, [theme]);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    localStorage.setItem("neumorphic-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
