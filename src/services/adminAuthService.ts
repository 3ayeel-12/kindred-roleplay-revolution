
import { supabase } from "@/integrations/supabase/client";
import { createClient } from '@supabase/supabase-js';

// Admin credentials (hardcoded for this demo)
const ADMIN_EMAIL = "admin@kindred.com";
const ADMIN_PASSWORD = "kindredadmin@123";

// For admin authentication, we'll use a simple service
// In a production app, you should use a more secure approach
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  // Check if the credentials match our hardcoded admin values
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminEmail', email);
    return true;
  }
  
  // If using hardcoded credentials failed, try Supabase as a fallback
  try {
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
  } catch (error) {
    console.error('Supabase admin login failed, but we have a fallback:', error);
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
  // First check if admin credentials are already in localStorage
  if (!localStorage.getItem('defaultAdminInitialized')) {
    // Store the default admin credentials in localStorage for reference
    localStorage.setItem('defaultAdminEmail', ADMIN_EMAIL);
    localStorage.setItem('defaultAdminPassword', ADMIN_PASSWORD);
    localStorage.setItem('defaultAdminInitialized', 'true');
  }
  
  // Try to create in Supabase but don't worry if it fails due to RLS
  try {
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
          email: ADMIN_EMAIL,
          password_hash: ADMIN_PASSWORD // This is just for demonstration - use proper hashing in production
        });
      
      if (insertError) {
        console.error('Error creating default admin user in Supabase (this is expected if RLS policies are restrictive):', insertError);
        console.log('Using local fallback authentication instead');
      } else {
        console.log('Default admin user created in Supabase');
      }
    }
  } catch (error) {
    console.error('Error with Supabase admin initialization (using local fallback):', error);
  }
};
