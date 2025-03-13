
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { language, setLanguage, theme, toggleTheme, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };
  
  const navItems = [
    { id: "home", label: t("home"), href: "#" },
    { id: "about", label: t("about"), href: "#about" },
    { id: "how-to-play", label: t("howToPlay"), href: "#how-to-play" },
    { id: "features", label: t("features"), href: "#features" },
    { id: "community", label: t("community"), href: "#community" }
  ];
  
  const ctaText = t("startPlaying");
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "how-to-play", "features", "community"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (lang: typeof language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-kindred-darkest/90 backdrop-blur-md py-2 shadow-md light-mode:bg-kindred-light/90" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
              alt="KindreD Logo" 
              className="h-12 w-auto mr-2"
            />
            <span className="font-display font-bold text-white light-mode:text-kindred-dark text-xl">KindreD</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className={cn(
                "nav-link",
                activeSection === item.id ? "text-kindred-accent" : "text-white light-mode:text-kindred-dark hover:text-kindred-accent",
                language === 'ar' ? "font-[Tajawal]" : ""
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kindred-accent" />
              )}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20"
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Language Selector */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20 flex items-center gap-2",
                language === 'ar' ? "font-[Tajawal]" : ""
              )}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <Globe className="h-4 w-4" />
              <span>{languages[language].flag}</span>
              <span>{language.toUpperCase()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-kindred-darkest/95 light-mode:bg-white/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-kindred-primary/20 animate-fade-in">
                <p className={cn(
                  "px-4 py-2 text-xs uppercase text-gray-400 light-mode:text-gray-600 border-b border-kindred-primary/20",
                  language === 'ar' ? "font-[Tajawal] text-right" : ""
                )}>
                  {t('selectLanguage')}
                </p>
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <button
                    key={code}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20",
                      code === language ? "bg-kindred-primary/20" : "",
                      code === 'ar' ? "font-[Tajawal] text-right justify-end" : "text-left"
                    )}
                    onClick={() => toggleLanguage(code as typeof language)}
                  >
                    <span className="mr-2">{flag}</span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button className="btn-accent">
            {ctaText}
          </Button>
        </div>
        
        <button 
          className="md:hidden text-white light-mode:text-kindred-dark p-2 bg-kindred-primary/20 rounded-md hover:bg-kindred-primary/30 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden bg-kindred-darkest/95 light-mode:bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-kindred-primary/20">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleTheme} 
              className={cn(
                "light-mode:text-kindred-dark text-white hover:bg-kindred-primary/20",
                language === 'ar' ? "font-[Tajawal]" : ""
              )}
            >
              {theme === 'dark' ? (
                <><Sun className="h-4 w-4 mr-2" /> {t('lightMode')}</>
              ) : (
                <><Moon className="h-4 w-4 mr-2" /> {t('darkMode')}</>
              )}
            </Button>
          </div>
          
          <div className="mb-4 border-b border-kindred-primary/20 pb-4">
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
                    "flex items-center justify-center p-2 rounded-md",
                    code === language 
                      ? "bg-kindred-primary/30 text-kindred-accent" 
                      : "bg-kindred-primary/10 text-white light-mode:text-kindred-dark hover:bg-kindred-primary/20",
                    "animate-slide-down",
                    code === 'ar' ? "font-[Tajawal]" : ""
                  )}
                  onClick={() => toggleLanguage(code as typeof language)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-1">{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a 
                key={item.id}
                href={item.href} 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center justify-between",
                  activeSection === item.id 
                    ? "bg-kindred-primary/20 text-kindred-accent" 
                    : "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/10",
                  "animate-slide-down",
                  language === 'ar' ? "font-[Tajawal] flex-row-reverse" : "",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronDown className="h-4 w-4" />}
              </a>
            ))}
            <Button 
              className={cn(
                "btn-accent mt-4 w-full animate-slide-down",
                language === 'ar' ? "font-[Tajawal]" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '250ms' }}
            >
              {ctaText}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
