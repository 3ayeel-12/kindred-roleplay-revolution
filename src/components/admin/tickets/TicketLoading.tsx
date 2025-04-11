
import { RefreshCw } from "lucide-react";

export function TicketLoading() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
        <p>Loading ticket details...</p>
      </div>
    </div>
  );
}
