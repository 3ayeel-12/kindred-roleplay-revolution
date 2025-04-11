
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { getSupportTickets, SupportTicket } from '@/services/support';

export default function AdminSettings() {
  const [supportStats, setSupportStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    // Get support ticket stats
    getSupportTickets().then((tickets: SupportTicket[]) => {
      if (tickets) {
        const stats = tickets.reduce((acc, ticket) => {
          acc.total++;
          if (ticket.status === 'open') acc.open++;
          else if (ticket.status === 'in-progress') acc.inProgress++;
          else if (ticket.status === 'resolved') acc.resolved++;
          return acc;
        }, { total: 0, open: 0, inProgress: 0, resolved: 0 });
        
        setSupportStats(stats);
      }
    }).catch(err => {
      console.error('Error fetching support ticket stats:', err);
    });
  }, [navigate]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Statistics</CardTitle>
            <CardDescription>Overview of support ticket data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Total Tickets</p>
                <p className="text-3xl font-bold">{supportStats.total}</p>
              </div>
              <div className="border rounded-lg p-4 text-center bg-yellow-50">
                <p className="text-yellow-800 text-sm">Open</p>
                <p className="text-3xl font-bold text-yellow-800">{supportStats.open}</p>
              </div>
              <div className="border rounded-lg p-4 text-center bg-blue-50">
                <p className="text-blue-800 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-blue-800">{supportStats.inProgress}</p>
              </div>
              <div className="border rounded-lg p-4 text-center bg-green-50">
                <p className="text-green-800 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-green-800">{supportStats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
            <CardDescription>Your admin account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">admin@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">System Administrator</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
