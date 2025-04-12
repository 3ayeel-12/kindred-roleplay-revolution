
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useGetSupportTickets } from '@/hooks/use-support-tickets';
import { getTicketReplies, TicketReply } from '@/services/support';

import { TicketHeader } from '@/components/admin/tickets/TicketHeader';
import { TicketMessage } from '@/components/admin/tickets/TicketMessage';
import { ConversationList } from '@/components/admin/tickets/ConversationList';
import { TicketReplyForm } from '@/components/admin/tickets/TicketReplyForm';
import { TicketSidebar } from '@/components/admin/tickets/TicketSidebar';
import { TicketLoading } from '@/components/admin/tickets/TicketLoading';
import { TicketNotFound } from '@/components/admin/tickets/TicketNotFound';

export default function AdminTicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [isSending, setIsSending] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { updateTicket, addReply } = useGetSupportTickets();
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    if (!ticketId) {
      navigate('/admin/tickets');
      return;
    }
    
    loadTicketData();
    
    // Set up real-time subscription for changes
    const channel = supabase
      .channel('ticket-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'support_tickets', filter: `id=eq.${ticketId}` }, 
        () => {
          console.log('Ticket updated, refreshing...');
          loadTicketData();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ticket_replies', filter: `ticket_id=eq.${ticketId}` }, 
        () => {
          console.log('Replies updated, refreshing...');
          loadReplies();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [ticketId, navigate]);
  
  const loadTicketData = async () => {
    setIsLoading(true);
    try {
      if (!ticketId) return;
      
      // Load the ticket
      const updatedTicket = await updateTicket(ticketId, { status: 'open' });
      setTicket(updatedTicket);
      
      // Load replies
      await loadReplies();
    } catch (error) {
      console.error('Error loading ticket data:', error);
      toast.error('Failed to load ticket data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadReplies = async () => {
    try {
      if (!ticketId) return;
      
      const ticketReplies = await getTicketReplies(ticketId);
      setReplies(ticketReplies);
    } catch (error) {
      console.error('Error loading replies:', error);
    }
  };
  
  const handleSendReply = async (message: string) => {
    if (!ticketId || !message.trim()) return;
    
    setIsSending(true);
    try {
      await addReply(ticketId, message, true);
      loadReplies();
      toast.success('Reply sent');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
    }
  };
  
  const handleStatusChange = async (newStatus: 'open' | 'in-progress' | 'resolved') => {
    if (!ticketId) return;
    
    try {
      await updateTicket(ticketId, { status: newStatus });
      toast.success(`Ticket marked as ${newStatus}`);
      loadTicketData();
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };
  
  if (isLoading) {
    return <TicketLoading />;
  }
  
  if (!ticket) {
    return <TicketNotFound />;
  }
  
  return (
    <div className="space-y-6">
      <TicketHeader onRefresh={loadTicketData} isLoading={isLoading} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <TicketMessage ticket={ticket} />
          
          <Card>
            <CardContent className="p-6">
              <ConversationList ticket={ticket} replies={replies} />
              
              <Separator className="my-6" />
              
              <TicketReplyForm onSendReply={handleSendReply} isSending={isSending} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden w-full mb-4">
                <Settings className="mr-2 h-4 w-4" />
                Ticket Settings
              </Button>
            </SheetTrigger>
            <div className="hidden lg:block">
              <TicketSidebar 
                ticket={ticket} 
                onStatusChange={handleStatusChange}
                repliesCount={replies.length}
              />
            </div>
            <SheetContent>
              <TicketSidebar 
                ticket={ticket} 
                onStatusChange={handleStatusChange}
                repliesCount={replies.length}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
