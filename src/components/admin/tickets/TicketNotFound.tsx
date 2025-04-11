
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TicketNotFound() {
  const navigate = useNavigate();
  
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
