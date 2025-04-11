
import { useState } from 'react';
import { toast } from 'sonner';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: string;
  isPublished: boolean;
}

/**
 * Hook for managing admin announcements
 */
export const useAdminAnnouncements = () => {
  const ANNOUNCEMENTS_KEY = 'admin-announcements';
  const [isLoading, setIsLoading] = useState(false);

  const getAnnouncements = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedData = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const announcements: Announcement[] = storedData ? JSON.parse(storedData) : [];
      
      return announcements;
    } catch (error) {
      console.error('Error fetching announcements:', error);
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
      console.error('Error creating announcement:', error);
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
      console.error('Error updating announcement:', error);
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
      console.error('Error deleting announcement:', error);
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
