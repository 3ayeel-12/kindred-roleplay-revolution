
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Car, LoaderCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading" }: LoadingScreenProps) {
  // Try to use the language context, but provide fallback values
  let language = "en";
  let theme = "dark";
  
  try {
    const languageContext = useLanguage();
    language = languageContext.language;
    theme = languageContext.theme;
  } catch (error) {
    console.log("Language context not available, using fallbacks");
  }
  
  const [dots, setDots] = useState(".");
  const [isSpinning, setIsSpinning] = useState(true);
  
  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background with gradient */}
      <div className={cn(
        "absolute inset-0",
        theme === "dark" 
          ? "bg-gradient-to-b from-kindred-darkest to-black" 
          : "bg-gradient-to-b from-kindred-light to-white"
      )}></div>
      
      {/* Geometric line patterns */}
      <div className="geometric-lines absolute inset-0 opacity-30"></div>
      
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Logo animation similar to the navbar */}
        <div className="mb-8">
          <motion.div 
            className="relative bg-gradient-to-r from-kindred-primary/30 to-kindred-accent/30 p-3 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, isSpinning ? 5 : -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.img 
              src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
              alt="KindreD Logo" 
              className={cn(
                "h-20 w-auto object-contain drop-shadow-glow"
              )}
              animate={{
                rotate: 360,
                transition: { duration: 3, ease: "linear", repeat: Infinity }
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 text-kindred-highlight transform translate-x-1 translate-y-1"
              animate={{
                x: [-10, 15],
                opacity: [0, 1, 0],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <Car size={24} />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 text-kindred-highlight"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 1, 0.3],
              transition: { duration: 1.5, repeat: Infinity }
            }}
          >
            <Sparkles size={24} />
          </motion.div>
        </div>

        {/* Text and loading indicator */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2 
            className={cn(
              "text-2xl font-display font-bold mb-2",
              "bg-gradient-to-r from-white to-kindred-accent bg-clip-text text-transparent",
              "light-mode:from-kindred-dark light-mode:to-kindred-secondary",
              language === 'ar' ? "font-[Tajawal]" : "",
              "drop-shadow-text"
            )}
            animate={{
              backgroundPosition: ["0%", "100%"],
              transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            KindreD
          </motion.h2>
          
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <LoaderCircle className={cn(
                "mr-2 h-6 w-6",
                theme === "dark" ? "text-kindred-accent" : "text-kindred-primary"
              )} />
            </motion.div>
            <span className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-kindred-dark/70"
            )}>
              {message}{dots}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
