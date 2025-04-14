
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  BellDot, 
  Settings, 
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminLogout } from '@/services/adminAuthService';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  onCloseSidebar?: () => void;
}

export const AdminSidebar = ({ sidebarOpen, isMobile, onCloseSidebar }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  // Is the current route active?
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobile && onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div 
      className={`
        bg-black text-white
        ${sidebarOpen ? 'block' : 'hidden'} md:block
        w-full md:w-64 p-4 md:min-h-screen flex flex-col border-r border-[#333333]
        fixed md:static top-[60px] left-0 h-[calc(100vh-60px)] md:h-auto z-40`}
    >
      <div className="flex items-center justify-between mb-8 md:mt-0">
        <h1 className="text-xl font-bold text-white hidden md:block">Admin Dashboard</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        <Button 
          variant={isRouteActive('/admin') && !isRouteActive('/admin/tickets') && !isRouteActive('/admin/announcements') && !isRouteActive('/admin/settings') ? "secondary" : "ghost"} 
          className="w-full justify-start bg-transparent hover:bg-[#333333] text-white"
          onClick={() => handleNavClick('/admin')}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Dashboard
        </Button>
        
        <Button 
          variant={isRouteActive('/admin/tickets') ? "secondary" : "ghost"} 
          className="w-full justify-start bg-transparent hover:bg-[#333333] text-white"
          onClick={() => handleNavClick('/admin/tickets')}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Support Tickets
        </Button>
        
        <Button 
          variant={isRouteActive('/admin/announcements') ? "secondary" : "ghost"} 
          className="w-full justify-start bg-transparent hover:bg-[#333333] text-white"
          onClick={() => handleNavClick('/admin/announcements')}
        >
          <BellDot className="mr-2 h-5 w-5" />
          Announcements
        </Button>
        
        <Button 
          variant={isRouteActive('/admin/settings') ? "secondary" : "ghost"} 
          className="w-full justify-start bg-transparent hover:bg-[#333333] text-white"
          onClick={() => handleNavClick('/admin/settings')}
        >
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </Button>
      </nav>
      
      <Button 
        variant="ghost" 
        className="justify-start text-red-400 hover:text-red-300 hover:bg-[#333333] mt-auto"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </Button>
    </div>
  );
};
