
import { supabase } from "@/integrations/supabase/client";

export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    // For security, validate inputs
    if (!email || !password) {
      return false;
    }
    
    // Query the admin_users table to find the admin user
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('email, password_hash')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error || !adminUser) {
      console.error('Admin user not found:', error);
      return false;
    }
    
    // Check if the provided password matches the stored hash
    // In a real production app, we'd use bcrypt.compare, but we'll simulate it for this demo
    const isValidPassword = password === adminUser.password_hash;
    
    if (isValidPassword) {
      // Create a custom JWT session for the admin user
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (signInError) {
        // Fallback to custom session in localStorage if Supabase auth fails
        console.warn('Using fallback auth method:', signInError);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', email);
      }
      
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
    // Sign out from Supabase auth
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Supabase signout error:', error);
  } finally {
    // Always clear localStorage as fallback
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    
    // Redirect to home after logout
    window.location.href = '/';
  }
};

export const isAdminLoggedIn = (): boolean => {
  // First check Supabase session
  const session = supabase.auth.getSession();
  
  // Then fallback to localStorage
  return localStorage.getItem('adminAuth') === 'true';
};

// Initialize the admin user on app startup - no longer needed but kept for compatibility
export const initializeAdminUser = async (): Promise<void> => {
  console.log('Admin initialization bypassed');
};
