
import { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  BellDot, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { adminLogin, adminLogout, isAdminLoggedIn } from '@/services/adminAuthService';
import { useIsMobile } from '@/hooks/use-mobile';

export const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t, theme } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if admin is already authenticated
    setIsAdmin(isAdminLoggedIn());
    
    // Set default email for easier testing
    if (email === '') {
      setEmail('admin@kindred.com');
    }
    
    // Auto-close sidebar on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    try {
      console.log('Login attempt:', email, password);
      const success = await adminLogin(email, password);
      
      if (success) {
        setIsAdmin(true);
        toast.success('Logged in successfully');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setIsAdmin(false);
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Is the current route active?
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-kindred-darker to-black p-4">
        <div className={`w-full max-w-md p-8 rounded-xl ${theme === 'light' ? 'bg-white/90 text-gray-800' : 'bg-black/60 text-gray-100'} shadow-2xl`}>
          <h1 className="text-2xl font-bold text-center mb-6 text-kindred-accent">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 rounded-md bg-black/30 border border-kindred-primary/30 text-white focus:outline-none focus:ring-2 focus:ring-kindred-accent/50"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-black/30 border border-kindred-primary/30 text-white focus:outline-none focus:ring-2 focus:ring-kindred-accent/50"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-kindred-accent hover:bg-kindred-accent/90"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={() => navigate('/')}
              className="text-kindred-primary hover:text-kindred-accent"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Website
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header */}
      <div className={`${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-white'} p-4 flex justify-between items-center md:hidden border-b border-gray-200 dark:border-gray-700`}>
        <h1 className="text-xl font-bold text-kindred-accent">Admin Dashboard</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-white'} 
            ${sidebarOpen ? 'block' : 'hidden'} md:block
            w-full md:w-64 p-4 md:min-h-screen flex flex-col border-r border-gray-200 dark:border-gray-700
            fixed md:static top-[60px] left-0 h-[calc(100vh-60px)] md:h-auto z-40`}
        >
          <div className="flex items-center justify-between mb-8 md:mt-0">
            <h1 className="text-xl font-bold text-kindred-accent hidden md:block">Admin Dashboard</h1>
          </div>
          
          <nav className="space-y-2 flex-1">
            <Button 
              variant={isRouteActive('/admin') && !isRouteActive('/admin/tickets') && !isRouteActive('/admin/announcements') && !isRouteActive('/admin/settings') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            
            <Button 
              variant={isRouteActive('/admin/tickets') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/tickets');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Support Tickets
            </Button>
            
            <Button 
              variant={isRouteActive('/admin/announcements') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/announcements');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <BellDot className="mr-2 h-5 w-5" />
              Announcements
            </Button>
            
            <Button 
              variant={isRouteActive('/admin/settings') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => {
                navigate('/admin/settings');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </nav>
          
          <Button 
            variant="ghost" 
            className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10 mt-auto"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
