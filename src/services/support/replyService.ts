
import { supabase } from "@/integrations/supabase/client";
import { TicketReply } from './types';
import { getLocalReplies, saveLocalReplies } from './localStorage';
import { updateTicketStatus } from './ticketService';

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
    
    console.log(`Fetched ${data?.length || 0} replies for ticket ${ticketId}`);
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
    
    console.log('Reply added successfully:', data);
    
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
