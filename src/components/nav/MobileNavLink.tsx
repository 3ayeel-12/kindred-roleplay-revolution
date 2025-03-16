
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

export function MobileNavLink({ id, label, href, isActive, index, onClick }: MobileNavLinkProps) {
  return (
    <motion.a 
      key={id}
      href={href} 
      className={cn(
        "px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between font-bold",
        isActive 
          ? "bg-kindred-primary/20 text-kindred-highlight light-mode:bg-kindred-primary/10 light-mode:text-kindred-primary" 
          : "text-white light-mode:text-kindred-dark hover:bg-kindred-primary/10"
      )}
      onClick={onClick}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{label}</span>
      {isActive && <ChevronDown className="h-4 w-4" />}
    </motion.a>
  );
}
