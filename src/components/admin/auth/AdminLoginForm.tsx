
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminLogin } from '@/services/adminAuthService';
import { Input } from '@/components/ui/input';

interface AdminLoginFormProps {
  defaultEmail?: string;
}

export const AdminLoginForm = ({ defaultEmail = 'admin@kindred.com' }: AdminLoginFormProps) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    try {
      // Remove password logging - only log the email for debugging
      console.log('Login attempt with email:', email);
      const success = await adminLogin(email, password);
      
      if (success) {
        toast.success('Logged in successfully');
        navigate('/admin');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 admin-layout">
      <div className="geometric-lines"></div>
      <div className="geometric-circle"></div>
      
      <div className="w-full max-w-md p-8 rounded-xl bg-black/90 text-white shadow-2xl border border-[#333333] relative z-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-black border border-[#333333] text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-md bg-black border border-[#333333] text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              required
              autoComplete="current-password"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-white text-black hover:bg-white/90"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-white hover:text-white/80"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Website
          </Button>
        </div>
      </div>
    </div>
  );
};
