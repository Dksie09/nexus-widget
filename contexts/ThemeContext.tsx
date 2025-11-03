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

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("neumorphic-theme") as ThemeColor;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      // Set the data attribute on document root
      document.documentElement.setAttribute("data-neu-theme", savedTheme);
    }
    // Update theme config from CSS variables
    setThemeConfig(getThemeConfig());
  }, []);

  // Update CSS attribute and theme config when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-neu-theme", theme);
    // Wait for CSS to apply, then read the new values
    requestAnimationFrame(() => {
      setThemeConfig(getThemeConfig());
    });
  }, [theme]);

  // Save theme to localStorage when it changes
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
