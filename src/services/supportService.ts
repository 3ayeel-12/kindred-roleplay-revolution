
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

export const createSupportTicket = async (
  email: string,
  message: string,
  userName: string = "",
  subject: string = "Support Request"
): Promise<SupportTicket> => {
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
    console.error('Error creating support ticket:', error);
    throw error;
  }
  
  return data;
};

export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching support tickets:', error);
    throw error;
  }
  
  return data || [];
};

export const getSupportTicketById = async (id: string): Promise<SupportTicket | null> => {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching support ticket:', error);
    return null;
  }
  
  return data;
};

export const updateTicketStatus = async (id: string, status: 'open' | 'in-progress' | 'resolved'): Promise<void> => {
  const { error } = await supabase
    .from('support_tickets')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
};

export const getTicketReplies = async (ticketId: string): Promise<TicketReply[]> => {
  const { data, error } = await supabase
    .from('ticket_replies')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching ticket replies:', error);
    throw error;
  }
  
  return data || [];
};

export const addTicketReply = async (
  ticketId: string,
  message: string,
  isAdmin: boolean
): Promise<TicketReply> => {
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
    console.error('Error adding ticket reply:', error);
    throw error;
  }
  
  // If this is an admin reply, update the ticket status to in-progress
  if (isAdmin) {
    await updateTicketStatus(ticketId, 'in-progress');
  }
  
  return data;
};
