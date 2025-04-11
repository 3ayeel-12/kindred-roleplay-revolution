
import { SupportTicket, TicketReply } from "@/services/support";
import { ConversationItem } from "./ConversationItem";

interface ConversationListProps {
  ticket: SupportTicket;
  replies: TicketReply[];
}

export function ConversationList({ ticket, replies }: ConversationListProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Conversation</h2>
      
      {/* Original message as first item */}
      <ConversationItem
        isAdmin={false}
        message={ticket.message}
        sender={ticket.user_name || ticket.user_email}
        timestamp={ticket.created_at}
      />
      
      {/* Replies */}
      {replies.length > 0 ? (
        replies.map((reply) => (
          <ConversationItem
            key={reply.id}
            isAdmin={reply.is_admin}
            message={reply.message}
            sender={reply.is_admin ? 'Support Team' : ticket.user_name || ticket.user_email}
            timestamp={reply.created_at}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground py-4">No replies yet</p>
      )}
    </div>
  );
}
