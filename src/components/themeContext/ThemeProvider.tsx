"use client";

import { createContext, useState } from "react";

type ThemeColor = "light" | "dark";

//create context for theme color to be used in other components
export const ThemeContext = createContext(
  {} as { 
    theme: ThemeColor, 
    setTheme: (theme: ThemeColor) => void 
  }
);


function ThemeProvider({
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
}

export default ThemeProvider;