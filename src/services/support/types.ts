
export interface SupportTicket {
  id: string;
  subject?: string;
  message: string;
  user_name?: string;
  user_email: string;
  status: 'open' | 'in-progress' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface TicketReply {
  id: string;
  ticket_id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
}

// Storage keys for local storage fallback
export const LOCAL_TICKETS_KEY = 'local_support_tickets';
export const LOCAL_REPLIES_KEY = 'local_ticket_replies';
