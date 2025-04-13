
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { LucideIcon } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  hasNotification?: boolean;
}

interface DesktopNavProps {
  navItems: NavItem[];
  activeSection: string;
  ctaText: string;
}

export function DesktopNav({ navItems, activeSection, ctaText }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <nav className="flex items-center space-x-1">
        {navItems.map((item, i) => (
          <NavLink 
            key={item.id}
            id={item.id}
            label={item.label}
            href={item.href}
            isActive={activeSection === item.id}
            index={i}
            icon={item.icon}
            hasNotification={item.hasNotification}
          />
        ))}
      </nav>
      
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <LanguageSwitcher />
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darkest font-bold transition-all duration-300 shadow-md hover:shadow-kindred-accent/20 hover:shadow-lg rounded-lg light-mode:bg-kindred-primary light-mode:text-white light-mode:hover:bg-kindred-primary/90">
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
