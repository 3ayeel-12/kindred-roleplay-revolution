
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
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
      isScrolled ? "bg-kindred-darker/90 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/kindred-logo.png" 
              alt="KindreD Logo" 
              className="h-12 w-auto mr-2"
            />
            <span className="font-display font-bold text-white text-xl">KindreD</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { id: "home", label: "Home", href: "#" },
            { id: "about", label: "About", href: "#about" },
            { id: "how-to-play", label: "How to Play", href: "#how-to-play" },
            { id: "features", label: "Features", href: "#features" },
            { id: "community", label: "Community", href: "#community" }
          ].map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              className={cn(
                "nav-link",
                activeSection === item.id && "text-kindred-accent"
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kindred-accent" />
              )}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center">
          <Button className="btn-accent">
            Start Playing
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
          "md:hidden bg-kindred-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {[
              { id: "home", label: "Home", href: "#" },
              { id: "about", label: "About", href: "#about" },
              { id: "how-to-play", label: "How to Play", href: "#how-to-play" },
              { id: "features", label: "Features", href: "#features" },
              { id: "community", label: "Community", href: "#community" }
            ].map((item, index) => (
              <a 
                key={item.id}
                href={item.href} 
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center justify-between",
                  activeSection === item.id ? "bg-kindred-primary/20 text-kindred-accent" : "text-white hover:bg-kindred-primary/10",
                  "animate-slide-down",
                  { "animation-delay-100": index === 1 },
                  { "animation-delay-200": index === 2 },
                  { "animation-delay-300": index === 3 },
                  { "animation-delay-400": index === 4 }
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronDown className="h-4 w-4" />}
              </a>
            ))}
            <Button 
              className="btn-accent mt-4 w-full animate-slide-down" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: '250ms' }}
            >
              Start Playing
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
