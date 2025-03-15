
import { Server } from "lucide-react";

export function ServerLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <Server className="animate-pulse mr-2 text-kindred-highlight" />
      <span className="text-kindred-highlight font-semibold">Loading server status...</span>
    </div>
  );
}
