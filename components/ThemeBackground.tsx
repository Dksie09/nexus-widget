"use client";

import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeBackground() {
  const { themeConfig } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = themeConfig.background;
    document.body.style.transition = "background-color 0.3s ease";
  }, [themeConfig.background]);

  return null;
}
