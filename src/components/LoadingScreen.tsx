
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Car, LoaderCircle, CircleFadingPlus, CircleFadingArrowUp } from "lucide-react";
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
  const [progress, setProgress] = useState(0);
  
  // Generate animated particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);
  
  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated background with gradient */}
      <motion.div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        theme === "dark" 
          ? "from-kindred-darkest via-black to-kindred-darkest" 
          : "from-kindred-light via-white to-kindred-light"
      )}
      animate={{
        background: theme === "dark" 
          ? ["linear-gradient(to bottom right, #101820 0%, #000000 50%, #101820 100%)", 
             "linear-gradient(to bottom right, #000000 0%, #101820 50%, #000000 100%)"]
          : ["linear-gradient(to bottom right, #f0f8ff 0%, #ffffff 50%, #f0f8ff 100%)", 
             "linear-gradient(to bottom right, #ffffff 0%, #f0f8ff 50%, #ffffff 100%)"]
      }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      
      {/* Animated particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className={cn(
            "absolute rounded-full",
            theme === "dark" ? "bg-kindred-accent/30" : "bg-kindred-primary/30"
          )}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [20, -20, 15, -15, 0],
            y: [-20, 20, -10, 10, 0],
            opacity: [0.1, 0.3, 0.2, 0.4, 0.1],
            scale: [1, 1.2, 1.5, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Geometric line patterns with animation */}
      <div className="geometric-lines absolute inset-0 opacity-30"></div>
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme === "dark" ? "#4F959D" : "#205781"} 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      
      {/* Grid overlay */}
      <motion.div
        className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
      >
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "border border-dashed",
              theme === "dark" ? "border-kindred-accent/20" : "border-kindred-primary/20"
            )}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.01,
            }}
          />
        ))}
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Animated logo section */}
        <div className="relative mb-12">
          {/* Glowing circle behind logo */}
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full blur-lg -z-10",
              theme === "dark" ? "bg-kindred-accent/20" : "bg-kindred-primary/20"
            )}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div 
            className="relative bg-gradient-to-r from-kindred-primary/30 to-kindred-accent/30 p-4 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, isSpinning ? 5 : -5, 0],
              boxShadow: theme === "dark"
                ? ['0 0 10px rgba(152,210,192,0.2)', '0 0 30px rgba(152,210,192,0.4)', '0 0 10px rgba(152,210,192,0.2)']
                : ['0 0 10px rgba(32,87,129,0.2)', '0 0 30px rgba(32,87,129,0.4)', '0 0 10px rgba(32,87,129,0.2)']
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <motion.img 
              src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
              alt="KindreD Logo" 
              className={cn(
                "h-24 w-auto object-contain drop-shadow-glow"
              )}
              animate={{
                rotate: 360,
                transition: { duration: 8, ease: "linear", repeat: Infinity }
              }}
            />
            
            {/* Moving car animation */}
            <motion.div
              className="absolute bottom-0 right-0 text-kindred-highlight transform translate-x-1 translate-y-1"
              animate={{
                x: [-30, 30],
                opacity: [0, 1, 0],
                transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Car size={28} />
            </motion.div>
            
            {/* Additional animated icons around the logo */}
            <motion.div
              className="absolute top-0 left-0 text-kindred-highlight/70 transform -translate-x-2 -translate-y-2"
              animate={{
                rotate: [0, 360],
                opacity: [0.5, 0.8, 0.5],
                transition: { duration: 5, repeat: Infinity }
              }}
            >
              <CircleFadingPlus size={18} />
            </motion.div>
            
            <motion.div
              className="absolute top-0 right-0 text-kindred-highlight/70 transform translate-x-2 -translate-y-2"
              animate={{
                rotate: [360, 0],
                opacity: [0.5, 0.8, 0.5],
                transition: { duration: 4, repeat: Infinity }
              }}
            >
              <CircleFadingArrowUp size={18} />
            </motion.div>
          </motion.div>
          
          {/* Animated sparkles */}
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
          
          <motion.div
            className="absolute bottom-0 left-0 text-kindred-highlight transform -translate-x-3 translate-y-3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.7, 0.2],
              transition: { duration: 2, repeat: Infinity, delay: 0.5 }
            }}
          >
            <Sparkles size={20} />
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
              "text-3xl font-display font-bold mb-3",
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
          
          <div className="flex items-center mb-4">
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
              "text-sm font-medium",
              theme === "dark" ? "text-gray-300" : "text-kindred-dark/80"
            )}>
              {message}{dots}
            </span>
          </div>
          
          {/* Add loading progress bar */}
          <div className="w-60 mt-2">
            <div className="progress-bar">
              <motion.div 
                className="progress-bar-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className={cn(
                "text-xs",
                theme === "dark" ? "text-gray-400" : "text-kindred-dark/60"
              )}>
                Initializing
              </span>
              <span className={cn(
                "text-xs",
                theme === "dark" ? "text-gray-400" : "text-kindred-dark/60"
              )}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
