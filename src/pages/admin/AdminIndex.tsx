
import { useNavigate } from 'react-router-dom';
import { DashboardCardsGrid } from '@/components/admin/dashboard/DashboardCardsGrid';
import { NewTicketAlert } from '@/components/admin/dashboard/NewTicketAlert';
import { RecentTicketsList } from '@/components/admin/dashboard/RecentTicketsList';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';

export default function AdminIndex() {
  const { tickets, isLoading, hasNewTicket, clearNewTicketNotification } = useAdminDashboard();
  const navigate = useNavigate();
  
  const handleViewTickets = () => {
    navigate('/admin/tickets');
    clearNewTicketNotification();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>
      
      <DashboardCardsGrid 
        tickets={tickets} 
        isLoading={isLoading} 
        hasNewTicket={hasNewTicket} 
      />
      
      <NewTicketAlert 
        isVisible={hasNewTicket} 
        onViewTickets={handleViewTickets} 
      />
      
      <div className="mt-6">
        <RecentTicketsList tickets={tickets} isLoading={isLoading} />
      </div>
    </div>
  );
}
