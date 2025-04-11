
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  getSupportTickets, 
  updateTicketStatus, 
  addTicketReply,
  getSupportTicketById,
  SupportTicket 
} from '@/services/support';

/**
 * Hook for managing support tickets
 */
export const useGetSupportTickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const getTickets = async () => {
    setIsLoading(true);
    
    try {
      // Fetch tickets from service
      const existingTickets = await getSupportTickets();
      setTickets(existingTickets);
      
      return existingTickets;
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      toast.error('Failed to load support tickets');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (ticketId: string, updates: Partial<SupportTicket>) => {
    setIsLoading(true);
    
    try {
      // Update ticket status
      await updateTicketStatus(ticketId, updates.status as 'open' | 'in-progress' | 'resolved');
      
      // Update local state
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      ));
      
      // Fetch the updated ticket
      const updatedTicket = await getSupportTicketById(ticketId);
      return updatedTicket;
    } catch (error) {
      console.error('Error updating support ticket:', error);
      toast.error('Failed to update ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addReply = async (ticketId: string, message: string, isAdmin: boolean) => {
    setIsLoading(true);
    
    try {
      // Add reply to ticket
      await addTicketReply(ticketId, message, isAdmin);
      
      // If admin reply, update ticket status to in-progress
      if (isAdmin) {
        await updateTicketStatus(ticketId, 'in-progress');
        
        // Update local state
        setTickets(prev => prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status: 'in-progress' } : ticket
        ));
      }
      
      // Fetch the updated ticket
      const updatedTicket = await getSupportTicketById(ticketId);
      return updatedTicket;
    } catch (error) {
      console.error('Error adding reply to ticket:', error);
      toast.error('Failed to add reply');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { tickets, isLoading, getTickets, updateTicket, addReply };
};
