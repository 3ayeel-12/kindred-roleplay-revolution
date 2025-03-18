import { supabase } from "@/integrations/supabase/client";

// For admin authentication, we'll use Supabase
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    // Get the admin user with the matching email
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .single();
    
    if (error || !data) {
      console.error('Admin login error:', error);
      return false;
    }
    
    // Store admin session in localStorage for persistent login
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminId', data.id);
    
    return true;
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
