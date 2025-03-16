
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSwitcher = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };

  const toggleLanguage = (lang: typeof language) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Listen for custom language change events from other components
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && typeof e.detail === 'string' && languages[e.detail as keyof typeof languages]) {
        setLanguage(e.detail as typeof language);
      }
    };
    
    document.addEventListener('change-language' as any, handleLanguageChange as EventListener);
    return () => document.removeEventListener('change-language' as any, handleLanguageChange as EventListener);
  }, [setLanguage]);

  if (variant === "mobile") {
    return (
      <div className="w-full mb-4 space-y-2">
        <p className={cn(
          "text-kindred-accent text-sm mb-2",
          language === 'ar' ? "font-[Tajawal] text-right" : ""
        )}>
          {t('selectLanguage')}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(languages).map(([code, { name, flag }], index) => (
            <button
              key={code}
              className={cn(
                "flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                code === language 
                  ? "bg-kindred-accent/60 text-white shadow-md shadow-kindred-accent/20" 
                  : "bg-kindred-primary/10 text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20",
                "animate-slide-down",
                code === 'ar' ? "font-[Tajawal]" : ""
              )}
              onClick={() => toggleLanguage(code as typeof language)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="mr-1">{flag}</span>
              <span>{name}</span>
              {code === language && <Check className="ml-1 h-3 w-3" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop version with dropdown
  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20 flex items-center gap-2 rounded-lg",
          isOpen && "bg-kindred-primary/20",
          language === 'ar' ? "font-[Tajawal]" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4 text-kindred-accent" />
        <span className="flex items-center">
          <span className="mr-1">{languages[language].flag}</span>
          <span>{language.toUpperCase()}</span>
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 border animate-fade-in overflow-hidden">
          <div className="backdrop-blur-xl bg-kindred-darkest/80 light-mode:bg-white/80 border-kindred-accent/20">
            <p className={cn(
              "px-4 py-2 text-xs uppercase text-kindred-accent border-b border-kindred-primary/20",
              language === 'ar' ? "font-[Tajawal] text-right" : ""
            )}>
              {t('selectLanguage')}
            </p>
            <div className="max-h-[300px] overflow-auto py-1">
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm hover:bg-kindred-primary/20 transition-colors duration-150",
                    code === language 
                      ? "bg-kindred-primary/20 text-kindred-accent" 
                      : "text-white light-mode:text-kindred-dark",
                    code === 'ar' ? "font-[Tajawal] text-right justify-end" : "text-left"
                  )}
                  onClick={() => toggleLanguage(code as typeof language)}
                >
                  <span className="mr-2">{flag}</span>
                  <span>{name}</span>
                  {code === language && <Check className="ml-auto h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
