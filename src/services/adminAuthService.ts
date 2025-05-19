
import { supabase } from "@/integrations/supabase/client";

export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    // For security, validate inputs
    if (!email || !password) {
      return false;
    }
    
    // Add proper password validation
    // For demonstration purposes, we're using a hardcoded password check
    // In a real application, this should use proper authentication methods
    const isAdmin = email.toLowerCase().includes('admin');
    const isValidPassword = password === 'admin123'; // Example password validation
    
    if (isAdmin && isValidPassword) {
      // Set admin session in localStorage only if credentials are valid
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email || 'admin@kindred.com');
      return true;
    }
    
    return false;
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
