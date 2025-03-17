
import { supabase } from "@/integrations/supabase/client";
import { createClient } from '@supabase/supabase-js';

// For admin authentication, we'll use a simple service
// In a production app, you should use a more secure approach
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  // In a real app, you would hash the password and compare with the stored hash
  // For simplicity, we're using a direct comparison here
  // Note: This is not secure for production use
  
  // Get the admin user with the matching email
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error || !data) {
    console.error('Admin login error:', error);
    return false;
  }
  
  // In a real app, you would use a proper password comparison
  // This is just for demonstration
  if (data.password_hash === password) {
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminEmail', email);
    return true;
  }
  
  return false;
};

export const adminLogout = (): void => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminEmail');
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('adminAuth') === 'true';
};

// Initialize admin user if none exists
export const initializeAdminUser = async (): Promise<void> => {
  const { count, error } = await supabase
    .from('admin_users')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error checking admin users:', error);
    return;
  }
  
  // If no admin users exist, create a default one
  if (count === 0) {
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert({
        email: 'admin@example.com',
        password_hash: 'admin123' // This is just for demonstration - use proper hashing in production
      });
    
    if (insertError) {
      console.error('Error creating default admin user:', insertError);
    } else {
      console.log('Default admin user created');
    }
  }
};
