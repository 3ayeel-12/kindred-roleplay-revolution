
import { useState } from 'react';
import { toast } from 'sonner';

interface SupportTicket {
  id: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'open' | 'in-progress' | 'resolved';
  replies?: SupportReply[];
}

interface SupportReply {
  id: string;
  ticketId: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

interface CreateTicketParams {
  email: string;
  message: string;
}

// Since we don't have a backend yet, we'll store tickets in localStorage
// This is a temporary solution until we integrate with a backend
const STORAGE_KEY = 'support-tickets';

// Helper to get tickets from localStorage
const getTicketsFromStorage = (): SupportTicket[] => {
  try {
    const tickets = localStorage.getItem(STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch (error) {
    console.error('Error parsing tickets from localStorage', error);
    return [];
  }
};

// Helper to save tickets to localStorage
const saveTicketsToStorage = (tickets: SupportTicket[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error('Error saving tickets to localStorage', error);
  }
};

export const useCreateSupportTicket = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createTicket = async ({ email, message }: CreateTicketParams) => {
    setIsLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTicket: SupportTicket = {
        id: Date.now().toString(),
        email,
        message,
        createdAt: new Date().toISOString(),
        status: 'open',
        replies: []
      };
      
      const existingTickets = getTicketsFromStorage();
      const updatedTickets = [...existingTickets, newTicket];
      saveTicketsToStorage(updatedTickets);
      
      return newTicket;
    } catch (error) {
      console.error('Error creating support ticket', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTicket, isLoading };
};

export const useGetSupportTickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const getTickets = async () => {
    setIsLoading(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingTickets = getTicketsFromStorage();
      setTickets(existingTickets);
      
      return existingTickets;
    } catch (error) {
      console.error('Error fetching support tickets', error);
      toast.error('Failed to load support tickets');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTicket = async (ticketId: string, updates: Partial<SupportTicket>) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingTickets = getTicketsFromStorage();
      const updatedTickets = existingTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      );
      
      saveTicketsToStorage(updatedTickets);
      setTickets(updatedTickets);
      
      return updatedTickets.find(ticket => ticket.id === ticketId);
    } catch (error) {
      console.error('Error updating support ticket', error);
      toast.error('Failed to update ticket');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addReply = async (ticketId: string, message: string, isAdmin: boolean) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingTickets = getTicketsFromStorage();
      const updatedTickets = existingTickets.map(ticket => {
        if (ticket.id === ticketId) {
          const newReply: SupportReply = {
            id: Date.now().toString(),
            ticketId,
            message,
            isAdmin,
            createdAt: new Date().toISOString()
          };
          
          return {
            ...ticket,
            replies: [...(ticket.replies || []), newReply],
            status: isAdmin ? 'in-progress' : ticket.status
          };
        }
        return ticket;
      });
      
      saveTicketsToStorage(updatedTickets);
      setTickets(updatedTickets);
      
      return updatedTickets.find(ticket => ticket.id === ticketId);
    } catch (error) {
      console.error('Error adding reply to ticket', error);
      toast.error('Failed to add reply');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { tickets, isLoading, getTickets, updateTicket, addReply };
};

export const useAdminAnnouncements = () => {
  const ANNOUNCEMENTS_KEY = 'admin-announcements';
  const [isLoading, setIsLoading] = useState(false);
  
  interface Announcement {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    createdAt: string;
    isPublished: boolean;
  }

  const getAnnouncements = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedData = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const announcements: Announcement[] = storedData ? JSON.parse(storedData) : [];
      
      return announcements;
    } catch (error) {
      console.error('Error fetching announcements', error);
      toast.error('Failed to load announcements');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedData = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const announcements: Announcement[] = storedData ? JSON.parse(storedData) : [];
      
      const newAnnouncement: Announcement = {
        ...announcement,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const updatedAnnouncements = [...announcements, newAnnouncement];
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(updatedAnnouncements));
      
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement', error);
      toast.error('Failed to create announcement');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedData = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const announcements: Announcement[] = storedData ? JSON.parse(storedData) : [];
      
      const updatedAnnouncements = announcements.map(announcement => 
        announcement.id === id ? { ...announcement, ...updates } : announcement
      );
      
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(updatedAnnouncements));
      
      return updatedAnnouncements.find(a => a.id === id);
    } catch (error) {
      console.error('Error updating announcement', error);
      toast.error('Failed to update announcement');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const storedData = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const announcements: Announcement[] = storedData ? JSON.parse(storedData) : [];
      
      const updatedAnnouncements = announcements.filter(a => a.id !== id);
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(updatedAnnouncements));
      
      return true;
    } catch (error) {
      console.error('Error deleting announcement', error);
      toast.error('Failed to delete announcement');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isLoading, 
    getAnnouncements, 
    createAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement 
  };
};
