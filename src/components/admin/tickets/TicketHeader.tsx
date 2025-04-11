
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TicketHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function TicketHeader({ onRefresh, isLoading }: TicketHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/admin/tickets')}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold">Ticket Details</h1>
      <Button
        variant="outline"
        size="icon"
        onClick={onRefresh}
        disabled={isLoading}
        className="ml-auto"
        title="Refresh ticket"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
