"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }

  return (
<button
  onClick={toggleTheme}
  className="
    ml-4 px-4 py-2 rounded 
    bg-white text-black font-bold
    hover:bg-gray-200
    dark:bg-white dark:text-black
    dark:hover:bg-gray-300
    transition-colors
  "
>
  {theme === "light" ? "Dark Mode" : "Light Mode"}
</button>
  );
}
