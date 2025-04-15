
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Bell } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { SupportTicket } from '@/services/support';

interface DashboardCardsGridProps {
  tickets: SupportTicket[];
  isLoading: boolean;
  hasNewTicket: boolean;
}

export const DashboardCardsGrid = ({ tickets, isLoading, hasNewTicket }: DashboardCardsGridProps) => {
  const navigate = useNavigate();
  
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard 
        title="Support Tickets" 
        value={isLoading ? '...' : tickets.length}
        description={`${openTickets} open, ${inProgressTickets} in progress, ${resolvedTickets} resolved`}
        icon={MessageSquare}
        hasNotification={hasNewTicket}
        onClick={() => {
          navigate('/admin/tickets');
        }}
      />
      
      <DashboardCard 
        title="Announcements" 
        value="Manage"
        description="Create and manage site announcements"
        icon={Bell}
        onClick={() => navigate('/admin/announcements')}
      />
      
      <DashboardCard 
        title="User Analytics" 
        value="Stats"
        description="User stats and site analytics"
        icon={Users}
        onClick={() => navigate('/admin/settings')}
      />
    </div>
  );
};
