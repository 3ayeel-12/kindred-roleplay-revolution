
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminLogout } from '@/services/adminAuthService';

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await adminLogout();
      toast.success('Logged out successfully');
      // The redirect is handled in adminLogout function
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <Button 
      variant="ghost" 
      className="justify-start text-red-400 hover:text-red-300 hover:bg-[#333333] mt-auto"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-5 w-5" />
      Logout
    </Button>
  );
};
