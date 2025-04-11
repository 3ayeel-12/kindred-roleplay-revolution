import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSupportTickets, SupportTicket } from '@/services/support';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useGetSupportTickets } from '@/hooks/use-support-tickets';

export default function AdminTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();
  
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
    setIsLoading(true);
    try {
      const data = await getSupportTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSortChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  const filterTickets = () => {
    let filteredTickets = [...tickets];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTickets = filteredTickets.filter(
        ticket => 
          ticket.user_email.toLowerCase().includes(query) || 
          ticket.message.toLowerCase().includes(query) ||
          (ticket.user_name && ticket.user_name.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === statusFilter);
    }
    
    // Apply sorting
    filteredTickets.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    return filteredTickets;
  };
  
  const filteredTickets = filterTickets();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        
        <div className="flex w-full sm:w-auto items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchTickets}
            disabled={isLoading}
            title="Refresh tickets"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">User</TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">
                <Button 
                  variant="ghost" 
                  className="flex items-center p-0 h-auto font-medium"
                  onClick={handleSortChange}
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading tickets...
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map(ticket => (
                <TableRow 
                  key={ticket.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                >
                  <TableCell className="font-medium">
                    {ticket.user_name ? `${ticket.user_name} (${ticket.user_email})` : ticket.user_email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="line-clamp-1">{ticket.message}</span>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === 'open' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : ticket.status === 'in-progress' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
