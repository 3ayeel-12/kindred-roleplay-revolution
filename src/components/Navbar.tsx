
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedLogo } from './AnimatedLogo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { theme, toggleTheme, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
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

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "backdrop-blur-md py-2 shadow-lg border-b" 
        : "bg-transparent py-4",
      theme === 'dark' 
        ? isScrolled ? "bg-kindred-darkest/80 border-kindred-primary/10" : "" 
        : isScrolled ? "bg-white/80 border-kindred-primary/10" : ""
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <AnimatedLogo />
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className={cn(
                "nav-link relative overflow-hidden group",
                activeSection === item.id 
                  ? "text-kindred-highlight" 
                  : "text-white light-mode:text-kindred-dark hover:text-kindred-accent"
              )}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kindred-highlight" />
              )}
              <span className="absolute inset-0 bg-kindred-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
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
          
          {/* Language Selector */}
          <LanguageSwitcher />
          
          <Button className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold transition-all duration-300 shadow-md hover:shadow-kindred-accent/20 hover:shadow-lg rounded-lg">
            {ctaText}
          </Button>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-kindred-accent" />
          ) : (
            <Menu className="w-6 h-6 text-white light-mode:text-kindred-dark" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          theme === 'dark' ? "bg-kindred-darkest/90" : "bg-white/90"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-kindred-primary/20">
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
          </div>
          
          <LanguageSwitcher variant="mobile" />
          
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <a 
                key={item.id}
                href={item.href} 
                className={cn(
                  "px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between",
                  activeSection === item.id 
                    ? "bg-kindred-primary/20 text-kindred-highlight" 
                    : "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/10",
                  "animate-slide-down",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronDown className="h-4 w-4" />}
              </a>
            ))}
            <Button 
              className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold mt-4 w-full animate-slide-down rounded-lg"
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
