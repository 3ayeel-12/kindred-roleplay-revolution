
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SupportTicket } from '@/services/support';
import { useNavigate } from 'react-router-dom';

interface RecentTicketsListProps {
  tickets: SupportTicket[];
  isLoading: boolean;
}

export const RecentTicketsList = ({ tickets, isLoading }: RecentTicketsListProps) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-[#111111] border-[#333333] text-white">
      <CardHeader>
        <CardTitle className="text-white">Recent Support Tickets</CardTitle>
        <CardDescription className="text-[#999999]">
          View the most recent support requests from users
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
            <p>Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-8 border border-[#333333] rounded-md">
            <AlertCircle className="h-8 w-8 mb-2 mx-auto text-[#555555]" />
            <p className="text-center text-[#999999]">No tickets found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.slice(0, 5).map(ticket => (
              <motion.div 
                key={ticket.id} 
                className="p-3 border border-[#333333] rounded-md hover:bg-[#222222] transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white">{ticket.user_email}</p>
                    <p className="text-sm text-[#999999] line-clamp-1">{ticket.message}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`status-indicator ${
                      ticket.status === 'open' 
                        ? 'status-open' 
                        : ticket.status === 'in-progress' 
                        ? 'status-in-progress'
                        : 'status-resolved'
                    }`}></span>
                    <span className="text-xs text-white">{ticket.status}</span>
                  </div>
                </div>
                <div className="text-xs text-[#666666] mt-2">
                  {new Date(ticket.created_at).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
