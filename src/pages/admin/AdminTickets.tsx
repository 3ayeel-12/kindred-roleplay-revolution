
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useGetSupportTickets } from '@/hooks/use-support';
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

export default function AdminTickets() {
  const { tickets, getTickets, isLoading } = useGetSupportTickets();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();
  
  useEffect(() => {
    getTickets();
  }, []);
  
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
          ticket.email.toLowerCase().includes(query) || 
          ticket.message.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === statusFilter);
    }
    
    // Apply sorting
    filteredTickets.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
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
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Email</TableHead>
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
                  <TableCell className="font-medium">{ticket.email}</TableCell>
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
                  <TableCell className="text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString()}
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
