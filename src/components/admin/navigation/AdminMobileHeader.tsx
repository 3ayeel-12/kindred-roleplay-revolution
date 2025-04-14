
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface AdminMobileHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AdminMobileHeader = ({ sidebarOpen, toggleSidebar }: AdminMobileHeaderProps) => {
  return (
    <div className="bg-black p-4 flex justify-between items-center md:hidden border-b border-[#333333]">
      <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleSidebar}
        className="text-white"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>
    </div>
  );
};
