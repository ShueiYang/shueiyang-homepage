"use client";

import { createContext, useMemo, useState } from "react";

type ThemeColor = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeColor;
  setTheme: React.Dispatch<React.SetStateAction<ThemeColor>>;
};

// create context for theme color to be used in other components
export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue,
);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeColor>(() => {
    //check if Server Side Rendering
    if (typeof window === "undefined") {
      return "light";
    }
    if (localStorage?.getItem("theme")) {
      return localStorage.getItem("theme") as ThemeColor;
    }
    if (
      !localStorage &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  const contextThemeValue = useMemo(() => {
    return { theme, setTheme };
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextThemeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
