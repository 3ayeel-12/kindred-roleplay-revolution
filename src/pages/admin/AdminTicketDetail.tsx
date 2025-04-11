
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  getSupportTicketById, 
  getTicketReplies, 
  addTicketReply, 
  updateTicketStatus,
  SupportTicket,
  TicketReply
} from '@/services/support';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { supabase } from '@/integrations/supabase/client';

// Import the refactored components
import { TicketHeader } from '@/components/admin/tickets/TicketHeader';
import { TicketMessage } from '@/components/admin/tickets/TicketMessage';
import { ConversationList } from '@/components/admin/tickets/ConversationList';
import { TicketReplyForm } from '@/components/admin/tickets/TicketReplyForm';
import { TicketSidebar } from '@/components/admin/tickets/TicketSidebar';
import { TicketLoading } from '@/components/admin/tickets/TicketLoading';
import { TicketNotFound } from '@/components/admin/tickets/TicketNotFound';

export default function AdminTicketDetail() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [replies, setReplies] = useState<TicketReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    if (ticketId) {
      fetchTicketDetails();
      
      // Set up realtime subscriptions
      const ticketChannel = supabase
        .channel('ticket-updates')
        .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'support_tickets', filter: `id=eq.${ticketId}` }, 
          () => {
            console.log('Ticket updated, refreshing details...');
            fetchTicketDetails();
          }
        )
        .subscribe();
        
      const repliesChannel = supabase
        .channel('ticket-replies')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'ticket_replies', filter: `ticket_id=eq.${ticketId}` }, 
          (payload) => {
            console.log('New reply received:', payload);
            fetchTicketDetails();
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(ticketChannel);
        supabase.removeChannel(repliesChannel);
      };
    }
  }, [ticketId, navigate]);
  
  const fetchTicketDetails = async () => {
    if (!ticketId) return;
    
    setIsLoading(true);
    try {
      const ticketData = await getSupportTicketById(ticketId);
      if (ticketData) {
        setTicket(ticketData);
        
        const repliesData = await getTicketReplies(ticketId);
        setReplies(repliesData);
      }
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      toast.error('Failed to load ticket details');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStatusChange = async (status: 'open' | 'in-progress' | 'resolved') => {
    if (!ticketId || !ticket) return;
    
    try {
      await updateTicketStatus(ticketId, status);
      
      // Update local state
      setTicket(prev => prev ? { ...prev, status } : null);
      
      toast.success(`Ticket status updated to ${status}`);
    } catch (error) {
      console.error('Failed to update ticket status:', error);
      toast.error('Failed to update ticket status');
    }
  };
  
  const handleSendReply = async (replyMessage: string) => {
    if (!ticketId) return;
    
    setIsSending(true);
    
    try {
      // Try direct Supabase insert first for better reliability
      const { data, error } = await supabase
        .from('ticket_replies')
        .insert({
          ticket_id: ticketId,
          message: replyMessage,
          is_admin: true
        })
        .select();
      
      if (error) {
        console.error('Direct reply insert failed, trying fallback:', error);
        await addTicketReply(ticketId, replyMessage, true);
      } else {
        console.log('Reply added successfully:', data);
        
        // Also update ticket status to in-progress
        await updateTicketStatus(ticketId, 'in-progress');
        
        if (ticket) {
          setTicket({ ...ticket, status: 'in-progress' });
        }
      }
      
      await fetchTicketDetails(); // Refresh ticket details
      toast.success('Reply sent successfully');
    } catch (error) {
      console.error('Failed to send reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
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
      <TicketHeader onRefresh={fetchTicketDetails} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket details */}
        <div className="md:col-span-2 space-y-6">
          <TicketMessage ticket={ticket} />
          
          {/* Conversation */}
          <div className="space-y-4">
            <ConversationList ticket={ticket} replies={replies} />
            
            {/* Reply form */}
            <TicketReplyForm onSendReply={handleSendReply} isSending={isSending} />
          </div>
        </div>
        
        {/* Sidebar details */}
        <TicketSidebar 
          ticket={ticket} 
          repliesCount={replies.length} 
          onStatusChange={handleStatusChange} 
        />
      </div>
    </div>
  );
}
