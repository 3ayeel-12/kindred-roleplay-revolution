
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { AnnouncementHeader } from '@/components/admin/announcements/AnnouncementHeader';
import { AnnouncementList } from '@/components/admin/announcements/AnnouncementList';
import { AnnouncementDialogManager } from '@/components/admin/announcements/AnnouncementDialogManager';
import { Announcement, useAdminAnnouncements } from '@/hooks/use-admin-announcements';
import { AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { 
    isLoading, 
    getAnnouncements, 
    createAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement 
  } = useAdminAnnouncements();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }

    fetchAnnouncements();
  }, [navigate]);

  const fetchAnnouncements = async () => {
    try {
      const fetchedAnnouncements = await getAnnouncements();
      setAnnouncements(fetchedAnnouncements);
      setTotalPages(Math.max(1, Math.ceil(fetchedAnnouncements.length / 6)));
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements');
    }
  };

  const handleCreateAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    try {
      const newAnnouncement = await createAnnouncement(announcement);
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast.success('Announcement created successfully');
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement');
      throw error;
    }
  };

  const handleUpdateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    try {
      await updateAnnouncement(id, updates);
      setAnnouncements(prev => 
        prev.map(announcement => announcement.id === id ? { ...announcement, ...updates } : announcement)
      );
      toast.success('Announcement updated successfully');
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error('Failed to update announcement');
      throw error;
    }
  };

  const handleDeleteAnnouncement = async (announcement: Announcement) => {
    try {
      await deleteAnnouncement(announcement.id);
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
      toast.success('Announcement deleted successfully');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement');
    }
  };

  const handleOpenDialog = (announcement: Announcement | null = null) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedAnnouncement(null);
    setIsDialogOpen(false);
  };

  const handlePreview = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter announcements for current page
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const paginatedAnnouncements = announcements.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <AnnouncementHeader 
        onCreateNew={() => handleOpenDialog()} 
        onRefresh={fetchAnnouncements} 
        isLoading={isLoading} 
      />
      
      <AnnouncementList 
        announcements={paginatedAnnouncements}
        isLoading={isLoading}
        onCreateNew={() => handleOpenDialog()}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteAnnouncement}
        onPreview={handlePreview}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <AnnouncementDialogManager
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onCreate={handleCreateAnnouncement}
        onUpdate={handleUpdateAnnouncement}
        announcement={selectedAnnouncement}
      />

      {/* Preview Dialog */}
      <AnnouncementPreview
        announcement={selectedAnnouncement}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
}
