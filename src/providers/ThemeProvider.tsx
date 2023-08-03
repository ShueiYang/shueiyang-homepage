"use client";

import { createContext, useState } from "react";

type ThemeColor = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeColor
  setTheme: React.Dispatch<React.SetStateAction<ThemeColor>>
}

//create context for theme color to be used in other components
export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);


export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [ theme, setTheme ] = useState(()=> {
    //check if Server Side Rendering
    if (typeof window === "undefined") {
        return "light";
    }
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
        return localStorage.getItem("theme") as ThemeColor;
    }
    if (!localStorage && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
    } 
    return "light";
  });
    
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
};