
import { supabase } from "@/integrations/supabase/client";

// For admin authentication, we'll use Supabase
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('Attempting login with:', email);
    
    // First check if this is the default admin user
    if (email === 'admin@kindred.com' && (password === 'kindredadmin@123' || password === 'admin123')) {
      // Check if admin user already exists
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', 'admin@kindred.com')
        .maybeSingle();
      
      if (error) {
        console.error('Error checking for admin user:', error);
        return false;
      }
      
      if (!data) {
        // Create the default admin user if it doesn't exist
        console.log('Creating default admin user...');
        const { data: insertData, error: insertError } = await supabase
          .from('admin_users')
          .insert([
            { 
              email: 'admin@kindred.com', 
              password_hash: 'admin123' 
            }
          ])
          .select();
          
        if (insertError) {
          console.error('Failed to create admin user:', insertError);
          return false;
        }
        
        console.log('Default admin user created successfully:', insertData);
        
        // Store admin session in localStorage for persistent login
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminId', insertData[0].id);
        
        return true;
      } else {
        // Admin exists, verify password - allow both the old password and new password
        if (data.password_hash === 'admin123' || data.password_hash === 'kindredadmin@123') {
          console.log('Default admin login successful');
          
          // Store admin session in localStorage for persistent login
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('adminEmail', email);
          localStorage.setItem('adminId', data.id);
          
          return true;
        }
      }
    }
    
    // For non-default admin, check the credentials against the database
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (error) {
      console.error('Admin login error:', error);
      return false;
    }
    
    if (!data) {
      console.error('No admin user found with email:', email);
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

// Initialize the admin user on app startup
export const initializeAdminUser = async (): Promise<void> => {
  try {
    // Check if admin user already exists
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@kindred.com')
      .maybeSingle();
    
    if (error) {
      console.error('Error checking for admin user:', error);
      return;
    }
    
    if (!data) {
      console.log('Admin user does not exist, creating...');
      // Create default admin user
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { 
            email: 'admin@kindred.com', 
            password_hash: 'admin123' 
          }
        ]);
        
      if (insertError) {
        console.error('Failed to create admin user:', insertError);
      } else {
        console.log('Default admin user created successfully');
      }
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};
