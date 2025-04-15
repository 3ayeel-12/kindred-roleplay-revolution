
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminAnnouncements() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    paginatedAnnouncements: announcements,
    isLoading,
    error,
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

  const handleCreate = async (formData: any) => {
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        toast.error('Title is required');
        throw new Error('Title is required');
      }
      
      if (!formData.content.trim()) {
        toast.error('Content is required');
        throw new Error('Content is required');
      }
      
      const newAnnouncement = await handleCreateAnnouncement(formData);
      toast.success('Announcement created successfully');
      
      if (formData.is_published) {
        toast('New announcement published', {
          description: 'Users will be notified about this announcement.',
          action: {
            label: 'View',
            onClick: () => window.open('/announcements', '_blank')
          }
        });
      }
      
      return newAnnouncement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      if (!(error instanceof Error) || !error.message.includes('required')) {
        toast.error('Failed to create announcement');
      }
      throw error;
    }
  };

  return (
    <div className="space-y-6 bg-[#111111] p-6 rounded-xl backdrop-blur-sm border border-[#333333]">
      <AnnouncementHeader 
        onCreateNew={() => handleOpenDialog()} 
        onRefresh={loadAnnouncements} 
        isLoading={isLoading} 
      />
      
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load announcements. Please try again.
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadAnnouncements()}
            className="mt-2"
          >
            Retry
          </Button>
        </Alert>
      ) : (
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
      )}
      
      <AnnouncementDialogManager
        announcement={selectedAnnouncement}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onCreate={handleCreate}
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
