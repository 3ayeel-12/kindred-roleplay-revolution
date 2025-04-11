import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { AnnouncementHeader } from '@/components/admin/announcements/AnnouncementHeader';
import { AnnouncementList } from '@/components/admin/announcements/AnnouncementList';
import { AnnouncementDialogManager } from '@/components/admin/announcements/AnnouncementDialogManager';
import { Announcement, useAdminAnnouncements } from '@/hooks/use-admin-announcements';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
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
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements');
    }
  };

  const handleCreateAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    try {
      const newAnnouncement = await createAnnouncement(announcement);
      setAnnouncements(prev => [...prev, newAnnouncement]);
      toast.success('Announcement created successfully');
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement');
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleUpdateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    try {
      const updatedAnnouncement = await updateAnnouncement(id, updates);
      setAnnouncements(prev => 
        prev.map(announcement => announcement.id === id ? { ...announcement, ...updatedAnnouncement } : announcement)
      );
      toast.success('Announcement updated successfully');
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast.error('Failed to update announcement');
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
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

  return (
    <div className="space-y-6">
      <AnnouncementHeader onCreate={handleOpenDialog} onRefresh={fetchAnnouncements} isLoading={isLoading} />
      
      <AnnouncementList 
        announcements={announcements} 
        onEdit={handleOpenDialog} 
        onDelete={handleDeleteAnnouncement} 
        isLoading={isLoading} 
      />
      
      <AnnouncementDialogManager
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onCreate={handleCreateAnnouncement}
        onUpdate={handleUpdateAnnouncement}
        announcement={selectedAnnouncement}
      />
    </div>
  );
}
