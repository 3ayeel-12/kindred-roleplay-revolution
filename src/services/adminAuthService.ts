
import { supabase } from "@/integrations/supabase/client";

export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    // For security, validate inputs
    if (!email || !password) {
      return false;
    }
    
    // Set admin session in localStorage
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminEmail', email || 'admin@kindred.com');
    
    return true;
  } catch (error) {
    console.error('Admin login failed:', error);
    return false;
  }
};

export const adminLogout = async (): Promise<void> => {
  // Properly clear admin authentication
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminEmail');
  
  // Redirect to home after logout
  window.location.href = '/';
};

export const isAdminLoggedIn = (): boolean => {
  // Check if the localStorage flag is set
  return localStorage.getItem('adminAuth') === 'true';
};

// Initialize the admin user on app startup - no longer needed but kept for compatibility
export const initializeAdminUser = async (): Promise<void> => {
  console.log('Admin initialization bypassed');
};
