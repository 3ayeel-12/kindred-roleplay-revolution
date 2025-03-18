
import { SupportTicket, TicketReply, LOCAL_TICKETS_KEY, LOCAL_REPLIES_KEY } from './types';

// Helper to get local tickets
export const getLocalTickets = (): SupportTicket[] => {
  const ticketsJSON = localStorage.getItem(LOCAL_TICKETS_KEY);
  return ticketsJSON ? JSON.parse(ticketsJSON) : [];
};

// Helper to save local tickets
export const saveLocalTickets = (tickets: SupportTicket[]) => {
  localStorage.setItem(LOCAL_TICKETS_KEY, JSON.stringify(tickets));
};

// Helper to get local replies
export const getLocalReplies = (): TicketReply[] => {
  const repliesJSON = localStorage.getItem(LOCAL_REPLIES_KEY);
  return repliesJSON ? JSON.parse(repliesJSON) : [];
};

// Helper to save local replies
export const saveLocalReplies = (replies: TicketReply[]) => {
  localStorage.setItem(LOCAL_REPLIES_KEY, JSON.stringify(replies));
};
