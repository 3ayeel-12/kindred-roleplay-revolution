
import { useState, useEffect } from "react";
import { Language, Theme } from "./types";
import { translations } from "./translations";

export const useLanguageProvider = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  // Load saved preferences on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === "ar" ? "rtl" : "ltr");
    }

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light-mode", savedTheme === "light");
    }
  }, []);

  // Update language related settings
  useEffect(() => {
    localStorage.setItem("language", language);
    setDirection(language === "ar" ? "rtl" : "ltr");
    
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    if (language === "ar") {
      document.documentElement.classList.add("font-ar");
    } else {
      document.documentElement.classList.remove("font-ar");
    }
  }, [language]);

  // Update theme settings
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light-mode", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
    direction
  };
};
