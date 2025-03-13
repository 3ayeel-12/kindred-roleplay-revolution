
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = 'en' | 'fr' | 'ar';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  
  const languages = {
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    ar: { name: 'العربية', flag: '🇸🇦' }
  };
  
  const navItems = {
    en: [
      { id: "home", label: "Home", href: "#" },
      { id: "about", label: "About", href: "#about" },
      { id: "how-to-play", label: "How to Play", href: "#how-to-play" },
      { id: "features", label: "Features", href: "#features" },
      { id: "community", label: "Community", href: "#community" }
    ],
    fr: [
      { id: "home", label: "Accueil", href: "#" },
      { id: "about", label: "À Propos", href: "#about" },
      { id: "how-to-play", label: "Comment Jouer", href: "#how-to-play" },
      { id: "features", label: "Fonctionnalités", href: "#features" },
      { id: "community", label: "Communauté", href: "#community" }
    ],
    ar: [
      { id: "home", label: "الرئيسية", href: "#" },
      { id: "about", label: "حول", href: "#about" },
      { id: "how-to-play", label: "كيفية اللعب", href: "#how-to-play" },
      { id: "features", label: "الميزات", href: "#features" },
      { id: "community", label: "المجتمع", href: "#community" }
    ]
  };
  
  const ctaText = {
    en: "Start Playing",
    fr: "Commencer à Jouer",
    ar: "ابدأ اللعب"
  };
  
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

  const toggleLanguage = (lang: Language) => {
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-kindred-darkest/90 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
              alt="KindreD Logo" 
              className="h-12 w-auto mr-2"
            />
            <span className="font-display font-bold text-white text-xl">KindreD</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems[currentLang].map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className={cn(
                "nav-link",
                activeSection === item.id ? "text-kindred-accent" : "text-white hover:text-kindred-accent",
                currentLang === 'ar' ? "font-[Tajawal]" : ""
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
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-kindred-primary/20"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <Globe className="h-5 w-5" />
              <span className="ml-2">{languages[currentLang].flag}</span>
            </Button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-kindred-darkest/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-kindred-primary/20 animate-fade-in">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <button
                    key={code}
                    className={cn(
                      "flex items-center w-full px-4 py-2 text-sm text-white hover:bg-kindred-primary/20",
                      code === currentLang ? "bg-kindred-primary/20" : "",
                      code === 'ar' ? "font-[Tajawal] text-right justify-end" : "text-left"
                    )}
                    onClick={() => toggleLanguage(code as Language)}
                  >
                    <span className="mr-2">{flag}</span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button className="btn-accent">
            {ctaText[currentLang]}
          </Button>
        </div>
        
        <button 
          className="md:hidden text-white p-2 bg-kindred-primary/20 rounded-md hover:bg-kindred-primary/30 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Animated Mobile menu */}
      <div 
        className={cn(
          "md:hidden bg-kindred-darkest/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4 border-b border-kindred-primary/20 pb-4">
            <p className="text-kindred-accent text-sm mb-2">
              {currentLang === 'en' ? 'Select Language' : 
               currentLang === 'fr' ? 'Choisir la Langue' : 
               'اختر اللغة'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(languages).map(([code, { name, flag }], index) => (
                <button
                  key={code}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-md",
                    code === currentLang 
                      ? "bg-kindred-primary/30 text-kindred-accent" 
                      : "bg-kindred-primary/10 text-white hover:bg-kindred-primary/20",
                    "animate-slide-down",
                    code === 'ar' ? "font-[Tajawal]" : ""
                  )}
                  onClick={() => toggleLanguage(code as Language)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-1">{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navItems[currentLang].map((item, index) => (
              <a 
                key={item.id}
                href={item.href} 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center justify-between",
                  activeSection === item.id ? "bg-kindred-primary/20 text-kindred-accent" : "text-white hover:bg-kindred-primary/10",
                  "animate-slide-down",
                  currentLang === 'ar' ? "font-[Tajawal] flex-row-reverse" : "",
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
                currentLang === 'ar' ? "font-[Tajawal]" : ""
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '250ms' }}
            >
              {ctaText[currentLang]}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
