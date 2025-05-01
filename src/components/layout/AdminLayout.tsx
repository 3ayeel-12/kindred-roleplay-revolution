
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { AdminSidebar } from '@/components/admin/navigation/AdminSidebar';
import { AdminMobileHeader } from '@/components/admin/navigation/AdminMobileHeader';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Auto-close sidebar on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Always considered logged in - bypassing authentication
  return (
    <div className="min-h-screen flex flex-col bg-black text-white admin-layout">
      <div className="geometric-lines"></div>
      
      {/* Mobile header */}
      <AdminMobileHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar 
          sidebarOpen={sidebarOpen} 
          isMobile={isMobile} 
          onCloseSidebar={() => setSidebarOpen(false)} 
        />
        
        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto bg-black text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
