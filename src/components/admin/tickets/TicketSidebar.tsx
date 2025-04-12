
import { SupportTicket } from "@/services/support";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface TicketSidebarProps {
  ticket: SupportTicket;
  onStatusChange: (status: 'open' | 'in-progress' | 'resolved') => void;
  repliesCount?: number; // Make repliesCount optional
}

export function TicketSidebar({ ticket, repliesCount = 0, onStatusChange }: TicketSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 space-y-4 bg-card">
        <h3 className="font-medium">Ticket Information</h3>
        
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Select 
            value={ticket.status} 
            onValueChange={(value) => onStatusChange(value as 'open' | 'in-progress' | 'resolved')}
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
          <p className="text-sm text-muted-foreground">User Name</p>
          <p className="mt-1 font-medium">{ticket.user_name || 'Not provided'}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">User Email</p>
          <p className="mt-1 font-medium">{ticket.user_email}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Created</p>
          <div className="mt-1 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(ticket.created_at).toLocaleString()}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Replies</p>
          <p className="mt-1 font-medium">{repliesCount}</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 space-y-4 bg-card">
        <h3 className="font-medium">Actions</h3>
        
        <div className="grid gap-2">
          <Button 
            variant={ticket.status === 'resolved' ? 'secondary' : 'default'}
            className="w-full"
            onClick={() => onStatusChange('resolved')}
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
  );
}
