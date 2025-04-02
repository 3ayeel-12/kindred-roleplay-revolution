
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
    
    if (error) {
      console.error('Admin login error:', error);
      
      // If the error is because no rows were found, we should first check
      // if this is the default admin credentials
      if (email === 'admin@kindred.com' && password === 'kindredadmin@123') {
        // Create the default admin user
        console.log('Creating default admin user...');
        const { data: insertData, error: insertError } = await supabase
          .from('admin_users')
          .insert([
            { 
              email: 'admin@kindred.com', 
              password_hash: 'kindredadmin@123' 
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
      }
      
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
  try {
    // Check if admin user already exists
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@kindred.com')
      .single();
    
    if (error) {
      console.log('Admin user does not exist, creating...');
      // Create default admin user
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { 
            email: 'admin@kindred.com', 
            password_hash: 'kindredadmin@123' 
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
