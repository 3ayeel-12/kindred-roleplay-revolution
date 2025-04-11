
import { useState, useMemo } from 'react';
import { SupportTicket } from '@/services/support';

export function useTicketFilters(tickets: SupportTicket[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSortChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredTickets = useMemo(() => {
    let filtered = [...tickets];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        ticket => 
          ticket.user_email.toLowerCase().includes(query) || 
          ticket.message.toLowerCase().includes(query) ||
          (ticket.user_name && ticket.user_name.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return filtered;
  }, [tickets, searchQuery, statusFilter, sortDirection]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortDirection,
    handleSortChange,
    filteredTickets
  };
}
