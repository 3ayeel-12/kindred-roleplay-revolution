
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
      {/* Enhanced animated background with multiple gradients */}
      <motion.div className={cn(
        "absolute inset-0",
        theme === "dark" 
          ? "bg-gradient-radial from-kindred-primary/20 via-kindred-darkest to-black" 
          : "bg-gradient-radial from-kindred-primary/10 via-white to-kindred-light"
      )}
      animate={{
        background: theme === "dark" 
          ? [
              "radial-gradient(circle at 20% 50%, hsl(203 61% 32% / 0.3) 0%, #101820 30%, #000000 100%)",
              "radial-gradient(circle at 80% 50%, hsl(187 34% 46% / 0.3) 0%, #000000 30%, #101820 100%)",
              "radial-gradient(circle at 50% 20%, hsl(163 43% 71% / 0.2) 0%, #101820 40%, #000000 100%)",
              "radial-gradient(circle at 50% 80%, hsl(203 61% 32% / 0.3) 0%, #000000 30%, #101820 100%)"
            ]
          : [
              "radial-gradient(circle at 20% 50%, hsl(203 61% 32% / 0.1) 0%, #ffffff 30%, #f0f8ff 100%)",
              "radial-gradient(circle at 80% 50%, hsl(187 34% 46% / 0.1) 0%, #f0f8ff 30%, #ffffff 100%)",
              "radial-gradient(circle at 50% 20%, hsl(163 43% 71% / 0.1) 0%, #ffffff 40%, #f0f8ff 100%)",
              "radial-gradient(circle at 50% 80%, hsl(203 61% 32% / 0.1) 0%, #f0f8ff 30%, #ffffff 100%)"
            ]
      }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
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
      
      {/* Main content with enhanced glow effects */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Enhanced animated logo section with multiple glow layers */}
        <div className="relative mb-12">
          {/* Multiple glowing circles behind logo for enhanced effect */}
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full blur-3xl -z-30",
              theme === "dark" ? "bg-kindred-accent/30" : "bg-kindred-primary/30"
            )}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full blur-xl -z-20",
              theme === "dark" ? "bg-kindred-primary/40" : "bg-kindred-secondary/40"
            )}
            animate={{
              scale: [1.2, 1.8, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full blur-lg -z-10",
              theme === "dark" ? "bg-kindred-highlight/50" : "bg-kindred-primary/50"
            )}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.div 
            className="relative bg-gradient-to-r from-kindred-primary/40 to-kindred-accent/40 p-6 rounded-full shadow-2xl"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(135deg, rgba(79, 149, 157, 0.4), rgba(152, 210, 192, 0.4))"
                : "linear-gradient(135deg, rgba(32, 87, 129, 0.3), rgba(79, 149, 157, 0.3))"
            }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, isSpinning ? 5 : -5, 0],
              boxShadow: theme === "dark"
                ? [
                    '0 0 20px rgba(152,210,192,0.3), 0 0 40px rgba(79,149,157,0.2), 0 0 60px rgba(152,210,192,0.1)',
                    '0 0 40px rgba(152,210,192,0.5), 0 0 80px rgba(79,149,157,0.3), 0 0 120px rgba(152,210,192,0.2)',
                    '0 0 20px rgba(152,210,192,0.3), 0 0 40px rgba(79,149,157,0.2), 0 0 60px rgba(152,210,192,0.1)'
                  ]
                : [
                    '0 0 20px rgba(32,87,129,0.3), 0 0 40px rgba(79,149,157,0.2), 0 0 60px rgba(32,87,129,0.1)',
                    '0 0 40px rgba(32,87,129,0.5), 0 0 80px rgba(79,149,157,0.3), 0 0 120px rgba(32,87,129,0.2)',
                    '0 0 20px rgba(32,87,129,0.3), 0 0 40px rgba(79,149,157,0.2), 0 0 60px rgba(32,87,129,0.1)'
                  ]
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
