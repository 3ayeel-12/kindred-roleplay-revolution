
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Bell } from 'lucide-react';
import { useGetSupportTickets } from '@/hooks/use-support';
import { useNavigate } from 'react-router-dom';

export default function AdminIndex() {
  const { tickets, getTickets, isLoading } = useGetSupportTickets();
  const navigate = useNavigate();
  
  useEffect(() => {
    getTickets();
  }, []);
  
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/tickets')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Support Tickets
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : tickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {openTickets} open, {inProgressTickets} in progress, {resolvedTickets} resolved
            </p>
          </CardContent>
        </Card>
        
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
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Support Tickets</CardTitle>
            <CardDescription>
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
                  <div 
                    key={ticket.id} 
                    className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{ticket.email}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{ticket.message}</p>
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
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
