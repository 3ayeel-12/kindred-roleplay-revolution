
import { useState } from 'react';
import { toast } from 'sonner';
import {
  getAllAnnouncements,
  createAnnouncement as createAnnouncementService,
  updateAnnouncement as updateAnnouncementService,
  deleteAnnouncement as deleteAnnouncementService,
  Announcement,
  AnnouncementInput
} from '@/services/announcementService';

/**
 * Hook for managing admin announcements
 */
export const useAdminAnnouncements = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAnnouncements = async () => {
    setIsLoading(true);
    
    try {
      const announcements = await getAllAnnouncements();
      return announcements;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createAnnouncement = async (announcement: AnnouncementInput) => {
    setIsLoading(true);
    
    try {
      const newAnnouncement = await createAnnouncementService(announcement);
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnnouncement = async (id: string, updates: Partial<AnnouncementInput>) => {
    setIsLoading(true);
    
    try {
      const updatedAnnouncement = await updateAnnouncementService(id, updates);
      return updatedAnnouncement;
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
      await deleteAnnouncementService(id);
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
