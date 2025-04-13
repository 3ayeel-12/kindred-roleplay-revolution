
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { MobileNavLink } from "./MobileNavLink";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  hasNotification?: boolean;
}

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeSection: string;
  ctaText: string;
  onClose: () => void;
}

export function MobileNav({ isOpen, navItems, activeSection, ctaText, onClose }: MobileNavProps) {
  const { theme } = useLanguage();
  
  return (
    <motion.div 
      className={cn(
        "md:hidden backdrop-blur-lg overflow-hidden",
        theme === 'dark' ? "bg-kindred-darkest/95" : "bg-white/95"
      )}
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-kindred-primary/20">
          <ThemeToggle variant="mobile" />
        </div>
        
        <LanguageSwitcher variant="mobile" />
        
        <nav className="flex flex-col space-y-2">
          {navItems.map((item, index) => (
            <MobileNavLink 
              key={item.id}
              id={item.id}
              label={item.label}
              href={item.href}
              isActive={activeSection === item.id}
              index={index}
              onClick={onClose}
              icon={item.icon}
              hasNotification={item.hasNotification}
            />
          ))}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold mt-4 w-full rounded-lg light-mode:bg-kindred-primary light-mode:text-white light-mode:hover:bg-kindred-primary/90"
              onClick={onClose}
            >
              {ctaText}
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
}
