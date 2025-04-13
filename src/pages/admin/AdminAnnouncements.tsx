
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { AnnouncementHeader } from '@/components/admin/announcements/AnnouncementHeader';
import { AnnouncementList } from '@/components/admin/announcements/AnnouncementList';
import { AnnouncementDialogManager } from '@/components/admin/announcements/AnnouncementDialogManager';
import { AnnouncementPreview } from '@/components/admin/announcements/AnnouncementPreview';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { Announcement } from '@/services/announcementService';

export default function AdminAnnouncements() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    paginatedAnnouncements: announcements,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
    loadAnnouncements,
    handleCreateAnnouncement,
    handleUpdateAnnouncement,
    handleDeleteAnnouncement
  } = useAnnouncements();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }

    loadAnnouncements();
  }, [navigate, loadAnnouncements]);

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

  const handleDelete = async (announcement: Announcement) => {
    try {
      await handleDeleteAnnouncement(announcement.id);
      toast.success('Announcement deleted successfully');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement');
    }
  };

  return (
    <div className="space-y-6">
      <AnnouncementHeader 
        onCreateNew={() => handleOpenDialog()} 
        onRefresh={loadAnnouncements} 
        isLoading={isLoading} 
      />
      
      <AnnouncementList 
        announcements={announcements}
        isLoading={isLoading}
        onCreateNew={() => handleOpenDialog()}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onPreview={handlePreview}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <AnnouncementDialogManager
        announcement={selectedAnnouncement}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onCreate={handleCreateAnnouncement}
        onUpdate={handleUpdateAnnouncement}
      />

      <AnnouncementPreview
        announcement={selectedAnnouncement}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
}
