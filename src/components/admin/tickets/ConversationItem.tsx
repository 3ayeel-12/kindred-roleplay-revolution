
import { User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  isAdmin: boolean;
  message: string;
  sender: string;
  timestamp: string;
}

export function ConversationItem({ isAdmin, message, sender, timestamp }: ConversationItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        isAdmin 
          ? "bg-primary text-primary-foreground" 
          : "bg-gray-200 text-gray-700"
      )}>
        {isAdmin ? (
          <Mail className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1">
        <div className={cn(
          "p-3 rounded-lg",
          isAdmin 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent"
        )}>
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
        <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
          <span className="font-medium">{sender}</span>
          <span>•</span>
          <span>{new Date(timestamp).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
