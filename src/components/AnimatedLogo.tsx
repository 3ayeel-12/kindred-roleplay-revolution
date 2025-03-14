
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export const AnimatedLogo = () => {
  const { language } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Add sparkle effect on hover or on random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 3000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center relative group">
      <div className="relative">
        <img 
          src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
          alt="KindreD Logo" 
          className={cn(
            "h-12 w-auto mr-2 transition-all duration-300 hover:scale-110",
            isSpinning ? "animate-logo-spin" : "animate-logo-pulse"
          )}
          onMouseEnter={() => setIsSpinning(true)}
          onMouseLeave={() => setIsSpinning(false)}
        />
        <Sparkles 
          className={cn(
            "absolute top-0 right-0 text-kindred-highlight opacity-0 transition-opacity duration-300",
            isSpinning ? "opacity-100 animate-sparkle" : "group-hover:opacity-70"
          )}
          size={18}
        />
      </div>
      <div className="flex flex-col items-start">
        <span 
          className={cn(
            "font-display font-bold bg-gradient-to-r from-white to-kindred-accent bg-clip-text text-transparent text-xl transition-all duration-300",
            "light-mode:from-kindred-dark light-mode:to-kindred-secondary",
            "hover:from-kindred-accent hover:to-white light-mode:hover:from-kindred-secondary light-mode:hover:to-kindred-dark",
            language === 'ar' ? "font-[Tajawal]" : ""
          )}
        >
          KindreD
        </span>
        <span 
          className={cn(
            "text-xs text-kindred-accent/80 font-medium tracking-wider",
            language === 'ar' ? "font-[Tajawal]" : ""
          )}
        >
          ADVENTURING TOGETHER
        </span>
      </div>
    </div>
  );
};
