
import { supabase } from "@/integrations/supabase/client";

// For admin authentication, we'll use a simple flag in localStorage
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Admin login bypass - setting admin session');
    
    // Always set admin session in localStorage
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminEmail', email || 'admin@kindred.com');
    
    return true;
  } catch (error) {
    console.error('Admin login failed:', error);
    return false;
  }
};

export const adminLogout = async (): Promise<void> => {
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('adminEmail');
};

export const isAdminLoggedIn = (): boolean => {
  // Simply check if the localStorage flag is set
  return localStorage.getItem('adminAuth') === 'true';
};

// Initialize the admin user on app startup - no longer needed but kept for compatibility
export const initializeAdminUser = async (): Promise<void> => {
  console.log('Admin initialization bypassed');
};
