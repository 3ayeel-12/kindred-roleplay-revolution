
import { useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarNavItemProps {
  path: string;
  label: string;
  icon: LucideIcon;
  onClick: (path: string) => void;
}

export const SidebarNavItem = ({ 
  path, 
  label, 
  icon: Icon, 
  onClick 
}: SidebarNavItemProps) => {
  const location = useLocation();
  
  // Is the current route active?
  const isActive = location.pathname === path;
  
  return (
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className="w-full justify-start bg-transparent hover:bg-[#333333] text-white"
      onClick={() => onClick(path)}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );
};
