
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedLogo } from './AnimatedLogo';
import { DesktopNav } from './nav/DesktopNav';
import { MobileNav } from './nav/MobileNav';

export function Navbar() {
  const { theme, t } = useLanguage();
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
        
        <DesktopNav 
          navItems={navItems}
          activeSection={activeSection}
          ctaText={ctaText}
        />
        
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
      
      <MobileNav 
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        ctaText={ctaText}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
}
