
import { supabase } from "@/integrations/supabase/client";
import { SupportTicket } from './types';
import { getLocalTickets, saveLocalTickets } from './localStorage';

export const createSupportTicket = async (
  email: string,
  message: string,
  userName: string = "",
  subject: string = "Support Request"
): Promise<SupportTicket> => {
  try {
    // Create in Supabase
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_email: email,
        message,
        user_name: userName || "", // Ensure it's not null
        subject,
        status: 'open'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating support ticket in Supabase (using local fallback):', error);
      throw error;
    }
    
    console.log('Support ticket created successfully:', data);
    
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
    
    console.log('Fetched support tickets:', data?.length || 0);
    
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
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching support ticket from Supabase (using local fallback):', error);
      throw error;
    }
    
    if (!data) {
      console.log('No ticket found with ID:', id);
      return null;
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
    
    console.log(`Ticket ${id} status updated to ${status}`);
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
