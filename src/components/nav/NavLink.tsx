
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  index: number;
}

export function NavLink({ id, label, href, isActive, index }: NavLinkProps) {
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
    <motion.a 
      key={id}
      href={href} 
      className={cn(
        "nav-link relative overflow-hidden group px-4 py-2 rounded-md font-bold",
        isActive 
          ? "text-kindred-highlight light-mode:text-kindred-primary" 
          : "text-white light-mode:text-kindred-dark hover:text-kindred-accent light-mode:hover:text-kindred-primary"
      )}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10 text-shadow drop-shadow-sm">{label}</span>
      {isActive && (
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-kindred-highlight light-mode:bg-kindred-primary"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="absolute inset-0 bg-kindred-primary/10 light-mode:bg-kindred-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
    </motion.a>
  );
}
