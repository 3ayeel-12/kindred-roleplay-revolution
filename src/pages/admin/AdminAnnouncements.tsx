import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { 
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  Announcement 
} from '@/services/announcementService';
import { isAdminLoggedIn } from '@/services/adminAuthService';
import { useNavigate } from 'react-router-dom';
import { AnnouncementForm, AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';
import { AnnouncementList } from '@/components/admin/announcements/AnnouncementList';
import { DeleteAnnouncementDialog } from '@/components/admin/announcements/DeleteAnnouncementDialog';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    loadAnnouncements();
  }, [navigate]);
  
  const loadAnnouncements = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateNew = () => {
    setSelectedAnnouncement(null);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedAnnouncement) return;
    
    try {
      await deleteAnnouncement(selectedAnnouncement.id);
      
      // Update local state
      setAnnouncements(prev => prev.filter(a => a.id !== selectedAnnouncement.id));
      
      toast.success('Announcement deleted');
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement');
    }
  };
  
  const handleSubmit = async (formData: AnnouncementFormData) => {
    setIsSaving(true);
    
    try {
      if (selectedAnnouncement) {
        // Update existing announcement
        await updateAnnouncement(selectedAnnouncement.id, formData);
        
        // Update local state
        setAnnouncements(prev => 
          prev.map(a => a.id === selectedAnnouncement.id ? 
            { ...a, ...formData, updated_at: new Date().toISOString() } : a
          )
        );
        
        toast.success('Announcement updated');
      } else {
        // Create new announcement
        const newAnnouncement = await createAnnouncement(formData);
        
        // Update local state
        setAnnouncements(prev => [newAnnouncement, ...prev]);
        
        toast.success('Announcement created');
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error('Failed to save announcement');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>
      
      <AnnouncementList
        announcements={announcements}
        isLoading={isLoading}
        onCreateNew={handleCreateNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <AnnouncementForm
            announcement={selectedAnnouncement}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DeleteAnnouncementDialog
          announcement={selectedAnnouncement}
          onDelete={confirmDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
}
