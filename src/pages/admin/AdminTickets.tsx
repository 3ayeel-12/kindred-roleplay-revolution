
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

export default function AdminTickets() {
  const { tickets, isLoading, getTickets } = useGetSupportTickets();
  const navigate = useNavigate();
  
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
        () => {
          console.log('Tickets updated, refreshing...');
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
      
      <TicketsTable
        tickets={filteredTickets}
        isLoading={isLoading}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
