import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Bell, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSupportTickets, SupportTicket } from '@/services/support';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function AdminIndex() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewTicket, setHasNewTicket] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const data = await getSupportTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTickets();
    
    // Setup real-time subscription for new support tickets
    const channel = supabase
      .channel('public:support_tickets')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'support_tickets' }, 
        (payload) => {
          console.log('New support ticket received:', payload);
          fetchTickets();
          setHasNewTicket(true);
          toast.info('New support ticket received!', {
            description: 'A user has submitted a new support request.',
            action: {
              label: 'View',
              onClick: () => navigate('/admin/tickets')
            }
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);
  
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card 
            className={`hover:shadow-md transition-shadow cursor-pointer ${hasNewTicket ? 'border-red-500 bg-red-500/10 animate-pulse' : ''}`} 
            onClick={() => {
              navigate('/admin/tickets');
              setHasNewTicket(false);
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Support Tickets
              </CardTitle>
              <div className="relative">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                {hasNewTicket && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : tickets.length}</div>
              <p className="text-xs text-muted-foreground">
                {openTickets} open, {inProgressTickets} in progress, {resolvedTickets} resolved
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/announcements')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Announcements
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage</div>
              <p className="text-xs text-muted-foreground">
                Create and manage site announcements
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                User Analytics
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Stats</div>
              <p className="text-xs text-muted-foreground">
                User stats and site analytics
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {hasNewTicket && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-red-500/10 border-red-500 mb-4">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-base">New Support Request</CardTitle>
                </div>
                <CardDescription>
                  A new support ticket has been submitted and needs attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-kindred-primary"
                  onClick={() => {
                    navigate('/admin/tickets');
                    setHasNewTicket(false);
                  }}
                >
                  View Support Tickets
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-6">
        <Card className="bg-kindred-darker/70 border-kindred-primary/20 text-white">
          <CardHeader>
            <CardTitle>Recent Support Tickets</CardTitle>
            <CardDescription className="text-gray-300">
              View the most recent support requests from users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No tickets found</p>
            ) : (
              <div className="space-y-4">
                {tickets.slice(0, 5).map(ticket => (
                  <motion.div 
                    key={ticket.id} 
                    className="p-3 border border-kindred-primary/20 rounded-md hover:bg-kindred-primary/10 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{ticket.user_email}</p>
                        <p className="text-sm text-gray-300 line-clamp-1">{ticket.message}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === 'open' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : ticket.status === 'in-progress' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(ticket.created_at).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
