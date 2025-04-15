
import { useNavigate } from 'react-router-dom';
import { SidebarNavItem } from './SidebarNavItem';
import { LogoutButton } from './LogoutButton';
import { sidebarNavItems } from './sidebarNavConfig';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  onCloseSidebar?: () => void;
}

export const AdminSidebar = ({ sidebarOpen, isMobile, onCloseSidebar }: AdminSidebarProps) => {
  const navigate = useNavigate();

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
        {sidebarNavItems.map((item) => (
          <SidebarNavItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            onClick={handleNavClick}
          />
        ))}
      </nav>
      
      <LogoutButton />
    </div>
  );
};
