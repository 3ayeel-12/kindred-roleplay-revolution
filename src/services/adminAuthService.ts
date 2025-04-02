
import { supabase } from "@/integrations/supabase/client";

// For admin authentication, we'll use Supabase
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Attempting login with:', email);
    
    // For the specific admin user, check the credentials against the database
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      console.error('Admin login error:', error);
      return false;
    }
    
    console.log('Found admin user:', data.id);
    
    // For demo purposes, we're doing a direct comparison
    // In a production app, you would use proper password hashing
    if (data.password_hash === password) {
      console.log('Password matches, login successful');
      
      // Store admin session in localStorage for persistent login
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminId', data.id);
      
      return true;
    } else {
      console.error('Password does not match');
      console.log('Expected:', data.password_hash);
      console.log('Received:', password);
      return false;
    }
  } catch (error) {
    console.error('Admin login failed:', error);
    return false;
  }
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminId');
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('adminAuth') === 'true';
};

// No need to initialize admin user as it's now in the database
export const initializeAdminUser = async (): Promise<void> => {
  // We don't need to initialize anything as the admin user is already in the database
  // The SQL migration has already inserted the admin user
};
