
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Clock, User, Mail } from 'lucide-react';
import { useGetSupportTickets } from '@/hooks/use-support';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function AdminTicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { tickets, getTickets, updateTicket, addReply, isLoading } = useGetSupportTickets();
  const [ticket, setTicket] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      await getTickets();
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (tickets.length > 0 && ticketId) {
      const foundTicket = tickets.find(t => t.id === ticketId);
      setTicket(foundTicket);
    }
  }, [tickets, ticketId]);
  
  const handleStatusChange = async (status: string) => {
    if (!ticketId) return;
    
    try {
      await updateTicket(ticketId, { status: status as any });
      toast.success(`Ticket status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update ticket status');
    }
  };
  
  const handleSendReply = async () => {
    if (!ticketId || !replyMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      await addReply(ticketId, replyMessage, true);
      setReplyMessage('');
      toast.success('Reply sent successfully');
    } catch (error) {
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Loading ticket details...</p>
      </div>
    );
  }
  
  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg mb-4">Ticket not found</p>
        <Button onClick={() => navigate('/admin/tickets')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/admin/tickets')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Ticket Details</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket details */}
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg">Original Message</h2>
                <p className="mt-2 whitespace-pre-wrap">{ticket.message}</p>
              </div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                ticket.status === 'open' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : ticket.status === 'in-progress' 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {ticket.status}
              </div>
            </div>
          </div>
          
          {/* Conversation */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Conversation</h2>
            
            {/* Original message as first item */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="bg-accent p-3 rounded-lg">
                  <p className="whitespace-pre-wrap">{ticket.message}</p>
                </div>
                <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">{ticket.email}</span>
                  <span>•</span>
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {ticket.replies && ticket.replies.length > 0 ? (
              ticket.replies.map((reply: any) => (
                <div key={reply.id} className="flex gap-4 items-start">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    reply.isAdmin 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gray-200 text-gray-700"
                  )}>
                    {reply.isAdmin ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "p-3 rounded-lg",
                      reply.isAdmin 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent"
                    )}>
                      <p className="whitespace-pre-wrap">{reply.message}</p>
                    </div>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="font-medium">
                        {reply.isAdmin ? 'Support Team' : ticket.email}
                      </span>
                      <span>•</span>
                      <span>{new Date(reply.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No replies yet</p>
            )}
            
            {/* Reply form */}
            <div className="mt-4 space-y-3">
              <Textarea
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSendReply} 
                  disabled={!replyMessage.trim() || isSending}
                >
                  {isSending ? 'Sending...' : 'Send Reply'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar details */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4 bg-card">
            <h3 className="font-medium">Ticket Information</h3>
            
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Select 
                value={ticket.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">User Email</p>
              <p className="mt-1 font-medium">{ticket.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <div className="mt-1 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Replies</p>
              <p className="mt-1 font-medium">{ticket.replies?.length || 0}</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 space-y-4 bg-card">
            <h3 className="font-medium">Actions</h3>
            
            <div className="grid gap-2">
              <Button 
                variant={ticket.status === 'resolved' ? 'secondary' : 'default'}
                className="w-full"
                onClick={() => handleStatusChange('resolved')}
                disabled={ticket.status === 'resolved'}
              >
                Mark as Resolved
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => {
                  // In a real app we might want to archive rather than delete
                  toast.error('Delete functionality not implemented');
                }}
              >
                Delete Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
