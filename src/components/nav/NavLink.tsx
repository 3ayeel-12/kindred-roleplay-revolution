
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  index: number;
  onClick?: () => void;
  icon?: LucideIcon;
  hasNotification?: boolean;
}

export function NavLink({ id, label, href, isActive, index, onClick, icon: Icon, hasNotification }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors relative flex items-center",
        isActive 
          ? "text-kindred-accent light-mode:text-kindred-primary" 
          : "text-white/80 hover:text-white light-mode:text-kindred-dark light-mode:hover:text-kindred-primary"
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      {Icon && (
        <Icon 
          className={cn(
            "mr-1 h-4 w-4",
            hasNotification ? "text-kindred-accent animate-pulse" : ""
          )} 
        />
      )}
      
      {hasNotification && !Icon && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-kindred-accent rounded-full animate-pulse"></span>
      )}
      
      {label}
      
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-kindred-accent light-mode:bg-kindred-primary"
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}
