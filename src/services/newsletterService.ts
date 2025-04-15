
import { supabase } from "@/integrations/supabase/client";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscriber> => {
  // Validate email (simple validation)
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    // Handle duplicate email error more user-friendly
    if (error.code === '23505') {
      throw new Error('This email is already subscribed to our newsletter');
    }
    
    throw new Error(error.message);
  }

  return data as NewsletterSubscriber;
};
