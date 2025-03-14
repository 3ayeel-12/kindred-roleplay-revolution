
import { useEffect, useState } from "react";
import { Sparkles, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const AnimatedLogo = () => {
  const { language } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Add sparkle effect on hover or on random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && !isHovering) {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 3000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <motion.div 
      className="flex items-center relative group"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="relative"
        onMouseEnter={() => {
          setIsSpinning(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsSpinning(false);
          setIsHovering(false);
        }}
      >
        <motion.div 
          className="relative overflow-hidden rounded-full bg-gradient-to-r from-kindred-primary/30 to-kindred-accent/30 p-0.5"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.img 
            src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
            alt="KindreD Logo" 
            className={cn(
              "h-12 w-auto drop-shadow-glow rounded-full"
            )}
            animate={isSpinning ? {
              rotate: 360,
              transition: { duration: 3, ease: "easeInOut" }
            } : {
              scale: [1, 1.05, 1],
              transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 text-kindred-highlight transform -translate-x-1 translate-y-2 scale-75"
            animate={isSpinning ? {
              x: [-20, 30],
              opacity: [0, 1, 0],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
          >
            <Car size={16} />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute top-0 right-0 text-kindred-highlight"
          animate={isSpinning ? {
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 1, 0.3],
            transition: { duration: 1.5, repeat: Infinity }
          } : {
            opacity: isHovering ? 0.7 : 0
          }}
        >
          <Sparkles size={18} />
        </motion.div>
      </div>
      <motion.div 
        className="flex flex-col items-start ml-2"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.span 
          className={cn(
            "font-display font-bold bg-gradient-to-r from-white to-kindred-accent bg-clip-text text-transparent text-xl",
            "light-mode:from-kindred-dark light-mode:to-kindred-secondary",
            language === 'ar' ? "font-[Tajawal]" : "",
            "drop-shadow-text"
          )}
          whileHover={{
            backgroundPosition: ["0%", "100%"],
            transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          KindreD
        </motion.span>
        <motion.span 
          className={cn(
            "text-xs text-kindred-accent/80 font-medium tracking-wider",
            language === 'ar' ? "font-[Tajawal]" : ""
          )}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          GTA SAMP ROLE PLAY
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
