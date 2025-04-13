
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MobileNavLinkProps {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  index: number;
  onClick?: () => void;
  icon?: LucideIcon;
  hasNotification?: boolean;
}

export function MobileNavLink({ id, label, href, isActive, index, onClick, icon: Icon, hasNotification }: MobileNavLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        "block py-3 px-4 rounded-md text-base font-medium relative flex items-center",
        isActive 
          ? "bg-kindred-primary/10 text-kindred-accent light-mode:bg-kindred-primary/5 light-mode:text-kindred-primary" 
          : "text-white/80 hover:bg-kindred-primary/5 hover:text-white light-mode:text-kindred-dark light-mode:hover:bg-kindred-primary/5 light-mode:hover:text-kindred-primary"
      )}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      {Icon && (
        <Icon 
          className={cn(
            "mr-3 h-5 w-5",
            hasNotification ? "text-kindred-accent animate-pulse" : ""
          )} 
        />
      )}
      
      {hasNotification && !Icon && (
        <span className="absolute top-3 left-0 w-2 h-2 bg-kindred-accent rounded-full animate-pulse"></span>
      )}
      
      {label}
    </motion.a>
  );
}
