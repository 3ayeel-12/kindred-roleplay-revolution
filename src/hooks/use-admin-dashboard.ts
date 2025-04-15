
import { useState, useEffect } from 'react';
import { getSupportTickets, SupportTicket } from '@/services/support';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAdminDashboard = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewTicket, setHasNewTicket] = useState(false);
  
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const data = await getSupportTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTickets();
    
    // Setup real-time subscription for new support tickets
    const channel = supabase
      .channel('public:support_tickets')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'support_tickets' }, 
        (payload) => {
          console.log('New support ticket received:', payload);
          fetchTickets();
          setHasNewTicket(true);
          toast.info('New support ticket received!', {
            description: 'A user has submitted a new support request.',
            action: {
              label: 'View',
              onClick: () => window.location.href = '/admin/tickets'
            }
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const clearNewTicketNotification = () => {
    setHasNewTicket(false);
  };
  
  return {
    tickets,
    isLoading,
    hasNewTicket,
    clearNewTicketNotification
  };
};
