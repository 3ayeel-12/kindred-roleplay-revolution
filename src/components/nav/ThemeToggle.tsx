
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
}

export function ThemeToggle({ variant = "desktop" }: ThemeToggleProps) {
  const { theme, toggleTheme, t } = useLanguage();
  
  if (variant === "mobile") {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        onClick={toggleTheme} 
        className="text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20 rounded-lg"
      >
        {theme === 'dark' ? (
          <><Sun className="h-4 w-4 mr-2 text-kindred-highlight" /> {t('lightMode')}</>
        ) : (
          <><Moon className="h-4 w-4 mr-2 text-kindred-dark" /> {t('darkMode')}</>
        )}
      </Button>
    );
  }

  return (
    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20 rounded-lg"
        aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-kindred-highlight animate-pulse-slow" />
        ) : (
          <Moon className="h-5 w-5 text-kindred-dark animate-pulse-slow" />
        )}
      </Button>
    </motion.div>
  );
}
