export type ThemeColor = "blue" | "pink" | "green";

export interface ThemeConfig {
  background: string;
  lightShadow: string;
  darkShadow: string;
  lightShadowHover: string;
  insetLightShadow: string;
  insetDarkShadow: string;
}

export function getThemeConfig(): ThemeConfig {
  if (typeof window === "undefined") {
    return {
      background: "#F0F0F3",
      lightShadow: "#FFFFFF",
      darkShadow: "rgba(174, 174, 192, 0.4)",
      lightShadowHover: "rgba(174, 174, 192, 0.08)",
      insetLightShadow: "#FFFFFF",
      insetDarkShadow: "rgba(174, 174, 192, 0.4)",
    };
  }

  const styles = getComputedStyle(document.documentElement);
  return {
    background: styles.getPropertyValue("--neu-bg").trim() || "#F0F0F3",
    lightShadow: styles.getPropertyValue("--neu-light").trim() || "#FFFFFF",
    darkShadow:
      styles.getPropertyValue("--neu-dark").trim() ||
      "rgba(174, 174, 192, 0.4)",
    lightShadowHover: "rgba(174, 174, 192, 0.08)",
    insetLightShadow:
      styles.getPropertyValue("--neu-inset-light").trim() || "#FFFFFF",
    insetDarkShadow:
      styles.getPropertyValue("--neu-inset-dark").trim() ||
      "rgba(174, 174, 192, 0.4)",
  };
}

export const themes: Record<ThemeColor, ThemeConfig> = {
  blue: {
    background: "#F0F0F3",
    lightShadow: "#FFFFFF",
    darkShadow: "rgba(174, 174, 192, 0.4)",
    lightShadowHover: "rgba(174, 174, 192, 0.08)",
    insetLightShadow: "#FFFFFF",
    insetDarkShadow: "rgba(174, 174, 192, 0.4)",
  },
  pink: {
    background: "#F3F0F3",
    lightShadow: "#FFFFFF",
    darkShadow: "rgba(192, 174, 192, 0.4)",
    lightShadowHover: "rgba(192, 174, 192, 0.08)",
    insetLightShadow: "#FFFFFF",
    insetDarkShadow: "rgba(192, 174, 192, 0.4)",
  },
  green: {
    background: "#F0F3F0",
    lightShadow: "#FFFFFF",
    darkShadow: "rgba(174, 192, 174, 0.4)",
    lightShadowHover: "rgba(174, 192, 174, 0.08)",
    insetLightShadow: "#FFFFFF",
    insetDarkShadow: "rgba(174, 192, 174, 0.4)",
  },
};

export function getNeumorphicShadow(
  theme: ThemeConfig,
  variant: "default" | "inset" | "primary" | "tab-inset" = "default"
): string {
  switch (variant) {
    case "inset":
      return `
        inset -5px -5px 10px 0 ${theme.insetLightShadow},
        inset 5px 5px 10px 0 ${theme.insetDarkShadow}
      `;
    case "primary":
      return `
        -5px -5px 15px 0 ${theme.lightShadow},
        5px 5px 15px 0 ${theme.darkShadow},
        inset -5px -5px 10px 0 ${theme.insetDarkShadow.replace("0.4", "0.25")},
        inset 5px 5px 10px 0 ${theme.insetLightShadow}
      `;
    case "tab-inset":
      return `
        inset -5px -5px 10px 0 ${theme.insetLightShadow.replace("1)", "0.5)")},
        inset 5px 5px 10px 0 ${theme.insetDarkShadow.replace("0.4", "0.3")}
      `;
    default:
      return `
        -5px -5px 10px 0 ${theme.lightShadow},
        5px 5px 10px 0 ${theme.darkShadow}
      `;
  }
}

export function getDialogOverlayColor(theme: ThemeConfig): string {
  return (
    theme.background
      .replace("#", "rgba(")
      .match(/.{2}/g)!
      .map((hex) => parseInt(hex, 16))
      .join(", ") + ", 0.3)"
  );
}
