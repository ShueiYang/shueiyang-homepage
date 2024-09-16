"use client";

import { createContext, useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);
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

  /**
   * Fix the Hydration issue with server component.
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
