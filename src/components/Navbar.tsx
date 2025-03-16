
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedLogo } from './AnimatedLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion } from "framer-motion";

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

  const navbarVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      } 
    })
  };

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-md py-2 shadow-lg border-b" 
          : "bg-transparent py-4",
        theme === 'dark' 
          ? isScrolled ? "bg-kindred-darkest/90 border-kindred-primary/20" : "" 
          : isScrolled ? "bg-white/90 border-kindred-primary/20" : ""
      )}
      variants={navbarVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a href="/" className="flex items-center">
            <AnimatedLogo />
          </a>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, i) => (
            <motion.a 
              key={item.id}
              href={item.href} 
              className={cn(
                "nav-link relative overflow-hidden group px-4 py-2 rounded-md font-bold",
                activeSection === item.id 
                  ? "text-kindred-highlight light-mode:text-kindred-primary" 
                  : "text-white light-mode:text-kindred-dark hover:text-kindred-accent light-mode:hover:text-kindred-primary"
              )}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 text-shadow drop-shadow-sm">{item.label}</span>
              {activeSection === item.id && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-kindred-highlight light-mode:bg-kindred-primary"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="absolute inset-0 bg-kindred-primary/10 light-mode:bg-kindred-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
            </motion.a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
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
          
          {/* Language Selector */}
          <LanguageSwitcher />
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold transition-all duration-300 shadow-md hover:shadow-kindred-accent/20 hover:shadow-lg rounded-lg light-mode:bg-kindred-primary light-mode:text-white light-mode:hover:bg-kindred-primary/90">
              {ctaText}
            </Button>
          </motion.div>
        </div>
        
        <motion.button 
          className="md:hidden p-2 rounded-full transition-colors bg-kindred-primary/10 light-mode:bg-kindred-primary/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-kindred-accent light-mode:text-kindred-primary" />
          ) : (
            <Menu className="w-6 h-6 text-white light-mode:text-kindred-dark" />
          )}
        </motion.button>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className={cn(
          "md:hidden backdrop-blur-lg overflow-hidden",
          theme === 'dark' ? "bg-kindred-darkest/95" : "bg-white/95"
        )}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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
              <motion.a 
                key={item.id}
                href={item.href} 
                className={cn(
                  "px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between font-bold",
                  activeSection === item.id 
                    ? "bg-kindred-primary/20 text-kindred-highlight light-mode:bg-kindred-primary/10 light-mode:text-kindred-primary" 
                    : "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/10"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronDown className="h-4 w-4" />}
              </motion.a>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold mt-4 w-full rounded-lg light-mode:bg-kindred-primary light-mode:text-white light-mode:hover:bg-kindred-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaText}
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}
