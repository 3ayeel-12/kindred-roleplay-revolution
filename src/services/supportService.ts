
import { supabase } from "@/integrations/supabase/client";

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

// Local storage key for support tickets when Supabase fails
const LOCAL_TICKETS_KEY = 'local_support_tickets';
const LOCAL_REPLIES_KEY = 'local_ticket_replies';

// Helper to get local tickets
const getLocalTickets = (): SupportTicket[] => {
  const ticketsJSON = localStorage.getItem(LOCAL_TICKETS_KEY);
  return ticketsJSON ? JSON.parse(ticketsJSON) : [];
};

// Helper to save local tickets
const saveLocalTickets = (tickets: SupportTicket[]) => {
  localStorage.setItem(LOCAL_TICKETS_KEY, JSON.stringify(tickets));
};

// Helper to get local replies
const getLocalReplies = (): TicketReply[] => {
  const repliesJSON = localStorage.getItem(LOCAL_REPLIES_KEY);
  return repliesJSON ? JSON.parse(repliesJSON) : [];
};

// Helper to save local replies
const saveLocalReplies = (replies: TicketReply[]) => {
  localStorage.setItem(LOCAL_REPLIES_KEY, JSON.stringify(replies));
};

export const createSupportTicket = async (
  email: string,
  message: string,
  userName: string = "",
  subject: string = "Support Request"
): Promise<SupportTicket> => {
  try {
    // First try to create in Supabase
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_email: email,
        message,
        user_name: userName,
        subject,
        status: 'open'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating support ticket in Supabase (using local fallback):', error);
      throw error;
    }
    
    // Cast the status to the expected type
    return {
      ...data,
      status: data.status as 'open' | 'in-progress' | 'resolved'
    };
  } catch (error) {
    // Fallback to local storage if Supabase fails
    console.log('Creating support ticket in local storage instead');
    
    const newTicket: SupportTicket = {
      id: `local-${Date.now()}`,
      subject,
      message,
      user_name: userName,
      user_email: email,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const localTickets = getLocalTickets();
    localTickets.push(newTicket);
    saveLocalTickets(localTickets);
    
    return newTicket;
  }
};

export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching support tickets from Supabase (using local fallback):', error);
      throw error;
    }
    
    // Cast each ticket's status to the expected type
    return (data || []).map(ticket => ({
      ...ticket,
      status: ticket.status as 'open' | 'in-progress' | 'resolved'
    }));
  } catch (error) {
    // Fallback to local storage
    console.log('Fetching support tickets from local storage instead');
    return getLocalTickets();
  }
};

export const getSupportTicketById = async (id: string): Promise<SupportTicket | null> => {
  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching support ticket from Supabase (using local fallback):', error);
      throw error;
    }
    
    // Cast the status to the expected type
    return {
      ...data,
      status: data.status as 'open' | 'in-progress' | 'resolved'
    };
  } catch (error) {
    // Fallback to local storage
    console.log('Fetching support ticket from local storage instead');
    const localTickets = getLocalTickets();
    const ticket = localTickets.find(t => t.id === id);
    return ticket || null;
  }
};

export const updateTicketStatus = async (id: string, status: 'open' | 'in-progress' | 'resolved'): Promise<void> => {
  try {
    // Try Supabase first
    const { error } = await supabase
      .from('support_tickets')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating ticket status in Supabase (using local fallback):', error);
      throw error;
    }
  } catch (error) {
    // Fallback to local storage
    console.log('Updating ticket status in local storage instead');
    const localTickets = getLocalTickets();
    const ticketIndex = localTickets.findIndex(t => t.id === id);
    
    if (ticketIndex !== -1) {
      localTickets[ticketIndex].status = status;
      localTickets[ticketIndex].updated_at = new Date().toISOString();
      saveLocalTickets(localTickets);
    }
  }
};

export const getTicketReplies = async (ticketId: string): Promise<TicketReply[]> => {
  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from('ticket_replies')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching ticket replies from Supabase (using local fallback):', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    // Fallback to local storage
    console.log('Fetching ticket replies from local storage instead');
    const localReplies = getLocalReplies();
    return localReplies.filter(r => r.ticket_id === ticketId);
  }
};

export const addTicketReply = async (
  ticketId: string,
  message: string,
  isAdmin: boolean
): Promise<TicketReply> => {
  try {
    // First try to use Supabase
    const { data, error } = await supabase
      .from('ticket_replies')
      .insert({
        ticket_id: ticketId,
        message,
        is_admin: isAdmin
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding ticket reply to Supabase (using local fallback):', error);
      throw error;
    }
    
    // If this is an admin reply, update the ticket status to in-progress
    if (isAdmin) {
      await updateTicketStatus(ticketId, 'in-progress');
    }
    
    return data;
  } catch (error) {
    // Fallback to local storage
    console.log('Adding ticket reply to local storage instead');
    
    // Create the reply
    const newReply: TicketReply = {
      id: `local-reply-${Date.now()}`,
      ticket_id: ticketId,
      message,
      is_admin: isAdmin,
      created_at: new Date().toISOString()
    };
    
    const localReplies = getLocalReplies();
    localReplies.push(newReply);
    saveLocalReplies(localReplies);
    
    // Update the ticket status if this is an admin reply
    if (isAdmin) {
      await updateTicketStatus(ticketId, 'in-progress');
    }
    
    return newReply;
  }
};
