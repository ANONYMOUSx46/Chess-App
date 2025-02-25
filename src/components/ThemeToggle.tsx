// src/components/ThemeToggle.tsx
import React from "react";

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="px-4 py-2 bg-primary text-primary-foreground rounded">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;