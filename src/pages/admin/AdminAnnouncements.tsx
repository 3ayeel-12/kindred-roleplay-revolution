
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { Announcement } from '@/services/announcementService';
import { AnnouncementList } from '@/components/admin/announcements/AnnouncementList';
import { AnnouncementDialogManager } from '@/components/admin/announcements/AnnouncementDialogManager';
import { AnnouncementHeader } from '@/components/admin/announcements/AnnouncementHeader';
import { AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';
import { useAnnouncements } from '@/hooks/useAnnouncements';

export default function AdminAnnouncements() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
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
    handleDeleteAnnouncement
  } = useAnnouncements();
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    loadAnnouncements();
  }, [navigate]);
  
  const handleCreateNew = () => {
    setSelectedAnnouncement(null);
    setIsFormDialogOpen(true);
  };
  
  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormDialogOpen(true);
  };
  
  const handleDelete = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };

  const handlePreview = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsPreviewDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedAnnouncement) return;
    
    try {
      await handleDeleteAnnouncement(selectedAnnouncement.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      // Error handling is already done in the hook
    }
  };
  
  const handleSubmit = async (formData: AnnouncementFormData) => {
    try {
      if (selectedAnnouncement) {
        // Update existing announcement
        await handleUpdateAnnouncement(selectedAnnouncement.id, formData);
      } else {
        // Create new announcement
        await handleCreateAnnouncement(formData);
      }
      setIsFormDialogOpen(false);
    } catch (error) {
      // Error handling is already done in the hook
    }
  };
  
  return (
    <div className="space-y-6">
      <AnnouncementHeader onCreateNew={handleCreateNew} />
      
      <AnnouncementList
        announcements={paginatedAnnouncements}
        isLoading={isLoading}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPreview={handlePreview}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <AnnouncementDialogManager
        selectedAnnouncement={selectedAnnouncement}
        isFormOpen={isFormDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isPreviewDialogOpen={isPreviewDialogOpen}
        isSaving={isSaving}
        onCloseForm={() => setIsFormDialogOpen(false)}
        onCloseDelete={() => setIsDeleteDialogOpen(false)}
        onClosePreview={() => setIsPreviewDialogOpen(false)}
        onSubmit={handleSubmit}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}
