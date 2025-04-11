
import { SupportTicket } from "@/services/support";

interface TicketMessageProps {
  ticket: SupportTicket;
}

export function TicketMessage({ ticket }: TicketMessageProps) {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg">{ticket.subject || 'Support Request'}</h2>
          <p className="mt-2 whitespace-pre-wrap">{ticket.message}</p>
        </div>
        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          ticket.status === 'open' 
            ? 'bg-yellow-100 text-yellow-800' 
            : ticket.status === 'in-progress' 
            ? 'bg-blue-100 text-blue-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {ticket.status}
        </div>
      </div>
    </div>
  );
}
