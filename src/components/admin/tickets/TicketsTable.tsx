
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SupportTicket } from "@/services/support";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TicketsTableProps {
  tickets: SupportTicket[];
  isLoading: boolean;
  sortDirection: 'asc' | 'desc';
  onSortChange: () => void;
}

export function TicketsTable({ tickets, isLoading, sortDirection, onSortChange }: TicketsTableProps) {
  const navigate = useNavigate();
  
  return (
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
                onClick={onSortChange}
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
          ) : tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No tickets found
              </TableCell>
            </TableRow>
          ) : (
            tickets.map(ticket => (
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
  );
}
