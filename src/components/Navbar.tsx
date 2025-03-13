
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="w-10 h-10 bg-gaming-primary rounded-md flex items-center justify-center mr-2">
              <span className="text-gaming-dark font-bold text-xl">K</span>
            </div>
            <span className="font-display font-bold text-white text-xl">KindreD</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#how-to-play" className="nav-link">How to Play</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#community" className="nav-link">Community</a>
        </nav>
        
        <div className="hidden md:flex items-center">
          <Button className="btn-primary">
            Start Playing
          </Button>
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="nav-link text-center text-base" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="nav-link text-center text-base" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#how-to-play" className="nav-link text-center text-base" onClick={() => setIsMobileMenuOpen(false)}>How to Play</a>
              <a href="#features" className="nav-link text-center text-base" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#community" className="nav-link text-center text-base" onClick={() => setIsMobileMenuOpen(false)}>Community</a>
              <Button className="btn-primary mt-4 w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Start Playing
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
