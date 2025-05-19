
import { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { AdminLoginForm } from '@/components/admin/auth/AdminLoginForm';
import { AdminSidebar } from '@/components/admin/navigation/AdminSidebar';
import { AdminMobileHeader } from '@/components/admin/navigation/AdminMobileHeader';

export const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already authenticated
    const adminLoggedIn = isAdminLoggedIn();
    setIsAdmin(adminLoggedIn);
    
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

  if (!isAdmin) {
    return <AdminLoginForm />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white admin-layout">
      <div className="geometric-lines"></div>
      
      {/* Mobile header */}
      <AdminMobileHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - responsive layout */}
        <AdminSidebar 
          sidebarOpen={sidebarOpen} 
          isMobile={isMobile} 
          onCloseSidebar={() => setSidebarOpen(false)} 
        />
        
        {/* Main content - responsive padding */}
        <div className="flex-1 p-3 md:p-6 overflow-auto bg-black text-white w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
