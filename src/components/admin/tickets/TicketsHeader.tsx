
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketsHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
}

export function TicketsHeader({ isLoading, onRefresh }: TicketsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-3xl font-bold">Support Tickets</h1>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onRefresh}
        disabled={isLoading}
        title="Refresh tickets"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
