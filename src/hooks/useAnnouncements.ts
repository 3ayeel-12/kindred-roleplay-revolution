
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  Announcement,
  AnnouncementInput
} from '@/services/announcementService';

// Number of announcements per page
export const ITEMS_PER_PAGE = 6;

export interface UseAnnouncementsReturn {
  allAnnouncements: Announcement[];
  paginatedAnnouncements: Announcement[];
  isLoading: boolean;
  isSaving: boolean;
  currentPage: number;
  totalPages: number;
  selectedAnnouncement: Announcement | null;
  setSelectedAnnouncement: (announcement: Announcement | null) => void;
  handlePageChange: (page: number) => void;
  loadAnnouncements: () => Promise<void>;
  handleCreateAnnouncement: (formData: AnnouncementInput) => Promise<Announcement>;
  handleUpdateAnnouncement: (id: string, formData: AnnouncementInput) => Promise<void>;
  handleDeleteAnnouncement: (id: string) => Promise<void>;
}

export const useAnnouncements = (): UseAnnouncementsReturn => {
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [paginatedAnnouncements, setPaginatedAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    // Update paginated announcements when all announcements change or page changes
    updatePaginatedAnnouncements();
  }, [allAnnouncements, currentPage]);

  const updatePaginatedAnnouncements = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedAnnouncements(allAnnouncements.slice(startIndex, endIndex));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAnnouncements();
      setAllAnnouncements(data);
      
      // Calculate total pages
      setTotalPages(Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE)));
    } catch (error) {
      console.error('Error loading announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnnouncement = async (formData: AnnouncementInput) => {
    setIsSaving(true);
    try {
      const newAnnouncement = await createAnnouncement(formData);
      
      // Update local state
      setAllAnnouncements(prev => [newAnnouncement, ...prev]);
      
      // Recalculate total pages
      setTotalPages(Math.max(1, Math.ceil((allAnnouncements.length + 1) / ITEMS_PER_PAGE)));
      
      // Go to first page to show the new announcement
      setCurrentPage(1);
      
      toast.success('Announcement created');
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAnnouncement = async (id: string, formData: AnnouncementInput) => {
    setIsSaving(true);
    try {
      await updateAnnouncement(id, formData);
      
      // Update local state
      setAllAnnouncements(prev => 
        prev.map(a => a.id === id ? 
          { ...a, ...formData, updated_at: new Date().toISOString() } : a
        )
      );
      
      toast.success('Announcement updated');
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error('Failed to update announcement');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      
      // Update local state
      setAllAnnouncements(prev => prev.filter(a => a.id !== id));
      
      // Recalculate total pages
      setTotalPages(Math.max(1, Math.ceil((allAnnouncements.length - 1) / ITEMS_PER_PAGE)));
      
      // Adjust current page if needed
      if (currentPage > Math.ceil((allAnnouncements.length - 1) / ITEMS_PER_PAGE)) {
        setCurrentPage(Math.max(1, currentPage - 1));
      }
      
      toast.success('Announcement deleted');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement');
      throw error;
    }
  };

  return {
    allAnnouncements,
    paginatedAnnouncements,
    isLoading,
    isSaving,
    currentPage,
    totalPages,
    selectedAnnouncement,
    setSelectedAnnouncement,
    handlePageChange,
    loadAnnouncements,
    handleCreateAnnouncement,
    handleUpdateAnnouncement,
    handleDeleteAnnouncement,
  };
};
