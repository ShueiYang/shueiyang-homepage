import { useContext, useEffect } from "react"
import { Switch } from "@headlessui/react"
import { IoSunny, IoMoon } from "react-icons/io5";

import { ThemeContext } from "@/providers/ThemeProvider";


export default function ThemeToggleButton() {
  // import from theme context
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
    }
  }, [theme]);


  function toggleTheme() {
    const themeColor = theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", themeColor)
    setTheme(themeColor)
  }

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      className={`${theme === "dark" ? "bg-violet-400" : "bg-orange-300"} 
        relative flex h-9 w-[4.5rem] items-center rounded-full`
      }
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${theme === "dark" ? "translate-x-9" : "translate-x-1"}
          inline-block h-8 w-8 transform rounded-full bg-white transition duration-300`
        }
      />
      <div className="flex justify-around items-center text-xl absolute w-16 inset-0 mx-auto dark:text-black">
        <IoSunny />
        <IoMoon />
      </div>
    </Switch>
  )
};