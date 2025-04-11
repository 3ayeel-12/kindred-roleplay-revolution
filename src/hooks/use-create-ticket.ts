
import { useState } from 'react';
import { createSupportTicket } from '@/services/support';

/**
 * Hook for creating a new support ticket
 */
export const useCreateSupportTicket = () => {
  const [isLoading, setIsLoading] = useState(false);

  interface CreateTicketParams {
    email: string;
    message: string;
    userName?: string;
    subject?: string;
  }

  const createTicket = async ({ email, message, userName, subject }: CreateTicketParams) => {
    setIsLoading(true);
    
    try {
      // Create a new support ticket
      const newTicket = await createSupportTicket(
        email, 
        message, 
        userName || '', 
        subject || 'Support Request'
      );
      
      return newTicket;
    } catch (error) {
      console.error('Error creating support ticket:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTicket, isLoading };
};
