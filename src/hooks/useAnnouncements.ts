
import { useState, useEffect, useCallback } from 'react';
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
  error: Error | null;
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
  const [error, setError] = useState<Error | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const updatePaginatedAnnouncements = useCallback(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedAnnouncements(allAnnouncements.slice(startIndex, endIndex));
  }, [allAnnouncements, currentPage]);

  useEffect(() => {
    // Update paginated announcements when all announcements change or page changes
    updatePaginatedAnnouncements();
  }, [allAnnouncements, currentPage, updatePaginatedAnnouncements]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const loadAnnouncements = async () => {
    // Removed authentication check
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllAnnouncements();
      setAllAnnouncements(data);
      
      // Calculate total pages
      setTotalPages(Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE)));
    } catch (err) {
      console.error('Error loading announcements:', err);
      setError(err instanceof Error ? err : new Error('Failed to load announcements'));
      toast.error('Failed to load announcements. Please refresh or try later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnnouncement = async (formData: AnnouncementInput) => {
    // Removed authentication check
    
    setIsSaving(true);
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      
      const newAnnouncement = await createAnnouncement(formData);
      
      // Update local state
      setAllAnnouncements(prev => [newAnnouncement, ...prev]);
      
      // Recalculate total pages
      setTotalPages(Math.max(1, Math.ceil((allAnnouncements.length + 1) / ITEMS_PER_PAGE)));
      
      // Go to first page to show the new announcement
      setCurrentPage(1);
      
      toast.success('Announcement created');
      return newAnnouncement;
    } catch (err) {
      console.error('Error creating announcement:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to create announcement');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAnnouncement = async (id: string, formData: AnnouncementInput) => {
    // Removed authentication check
    
    setIsSaving(true);
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      
      await updateAnnouncement(id, formData);
      
      // Update local state
      setAllAnnouncements(prev => 
        prev.map(a => a.id === id ? 
          { ...a, ...formData, updated_at: new Date().toISOString() } : a
        )
      );
      
      toast.success('Announcement updated');
    } catch (err) {
      console.error('Error updating announcement:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update announcement');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    // Removed authentication check
    
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
    } catch (err) {
      console.error('Error deleting announcement:', err);
      toast.error('Failed to delete announcement');
      throw err;
    }
  };

  return {
    allAnnouncements,
    paginatedAnnouncements,
    isLoading,
    error,
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
