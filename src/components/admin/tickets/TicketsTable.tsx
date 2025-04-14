
import { Button } from "@/components/ui/button";
import { ArrowUpDown, AlertCircle } from "lucide-react";
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
    <div className="border border-[#333333] rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#333333]">
            <TableHead className="w-[180px] text-white">User</TableHead>
            <TableHead className="hidden md:table-cell text-white">Message</TableHead>
            <TableHead className="w-[100px] text-white">Status</TableHead>
            <TableHead className="w-[150px] text-white">
              <Button 
                variant="ghost" 
                className="flex items-center p-0 h-auto font-medium text-white hover:text-white/80"
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
            <TableRow className="border-[#333333]">
              <TableCell colSpan={4} className="text-center py-8 text-white">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                  <span>Loading tickets...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : tickets.length === 0 ? (
            <TableRow className="border-[#333333]">
              <TableCell colSpan={4} className="text-center py-8 text-white">
                <div className="flex flex-col items-center justify-center">
                  <AlertCircle className="h-8 w-8 mb-2 text-[#555555]" />
                  <span>No tickets found</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tickets.map(ticket => (
              <TableRow 
                key={ticket.id}
                className="cursor-pointer hover:bg-[#222222] border-[#333333]"
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
              >
                <TableCell className="font-medium text-white">
                  {ticket.user_name ? `${ticket.user_name} (${ticket.user_email})` : ticket.user_email}
                </TableCell>
                <TableCell className="hidden md:table-cell text-white">
                  <span className="line-clamp-1">{ticket.message}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={`status-indicator ${
                      ticket.status === 'open' 
                        ? 'status-open' 
                        : ticket.status === 'in-progress' 
                        ? 'status-in-progress'
                        : 'status-resolved'
                    }`}></span>
                    <span className="text-white text-xs">{ticket.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#999999] whitespace-nowrap">
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
