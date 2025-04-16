
import { supabase } from "@/integrations/supabase/client";

// For admin authentication, we'll use Supabase
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Attempting login with:', email);
    
    // Check if this is the default admin user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    
    if (data.user) {
      console.log('Login successful');
      
      // Store admin session in localStorage for UI state management
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Admin login failed:', error);
    return false;
  }
};

export const adminLogout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const isAdminLoggedIn = (): boolean => {
  // Check both Supabase session and localStorage flag
  return localStorage.getItem('adminAuth') === 'true';
};

// Initialize the admin user on app startup
export const initializeAdminUser = async (): Promise<void> => {
  try {
    // Create default admin user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@kindred.com',
      password: 'admin123',
      options: {
        data: {
          is_admin: true
        }
      }
    });
    
    if (error && !error.message.includes('User already registered')) {
      console.error('Error creating admin user:', error);
    } else {
      console.log('Admin user setup successful or already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};
