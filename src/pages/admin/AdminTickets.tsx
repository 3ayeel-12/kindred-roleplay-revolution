
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSupportTickets } from '@/hooks/use-support-tickets';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { TicketsHeader } from '@/components/admin/tickets/TicketsHeader';
import { TicketsSearchBar } from '@/components/admin/tickets/TicketsSearchBar';
import { TicketsTable } from '@/components/admin/tickets/TicketsTable';
import { useTicketFilters } from '@/hooks/use-ticket-filters';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminTickets() {
  const { tickets, isLoading, getTickets } = useGetSupportTickets();
  const navigate = useNavigate();
  const [hasNewTicket, setHasNewTicket] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortDirection,
    handleSortChange,
    filteredTickets
  } = useTicketFilters(tickets);
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    fetchTickets();
    
    // Set up real-time subscription to ticket changes
    const channel = supabase
      .channel('public:support_tickets')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'support_tickets' }, 
        (payload) => {
          console.log('Tickets updated, refreshing...', payload);
          
          if (payload.eventType === 'INSERT') {
            setHasNewTicket(true);
            toast.info('New support ticket received!', {
              description: 'A user has submitted a new support request.',
            });
          }
          
          fetchTickets();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);
  
  const fetchTickets = async () => {
    try {
      await getTickets();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    }
  };
  
  return (
    <div className="space-y-6">
      {hasNewTicket && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-white p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-white" />
            <span className="text-white">You have a new support ticket waiting for action</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setHasNewTicket(false)}
            className="border-white text-white hover:bg-[#333333]"
          >
            Dismiss
          </Button>
        </motion.div>
      )}
    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TicketsHeader 
          isLoading={isLoading} 
          onRefresh={fetchTickets} 
        />
        
        <TicketsSearchBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
        />
      </div>
      
      <div className="bg-[#111111] border border-[#333333] rounded-xl p-4">
        <TicketsTable
          tickets={filteredTickets}
          isLoading={isLoading}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}
