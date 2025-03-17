
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
import { AnnouncementPreview } from '@/components/admin/announcements/AnnouncementPreview';

// Number of announcements per page
const ITEMS_PER_PAGE = 6;

export default function AdminAnnouncements() {
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [paginatedAnnouncements, setPaginatedAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    
    loadAnnouncements();
  }, [navigate]);
  
  useEffect(() => {
    // Update paginated announcements when all announcements change or page changes
    updatePaginatedAnnouncements();
  }, [allAnnouncements, currentPage]);
  
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
  
  const updatePaginatedAnnouncements = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedAnnouncements(allAnnouncements.slice(startIndex, endIndex));
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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

  const handlePreview = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsPreviewDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedAnnouncement) return;
    
    try {
      await deleteAnnouncement(selectedAnnouncement.id);
      
      // Update local state
      setAllAnnouncements(prev => prev.filter(a => a.id !== selectedAnnouncement.id));
      
      // Recalculate total pages
      setTotalPages(Math.max(1, Math.ceil((allAnnouncements.length - 1) / ITEMS_PER_PAGE)));
      
      // Adjust current page if needed
      if (currentPage > Math.ceil((allAnnouncements.length - 1) / ITEMS_PER_PAGE)) {
        setCurrentPage(Math.max(1, currentPage - 1));
      }
      
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
        setAllAnnouncements(prev => 
          prev.map(a => a.id === selectedAnnouncement.id ? 
            { ...a, ...formData, updated_at: new Date().toISOString() } : a
          )
        );
        
        toast.success('Announcement updated');
      } else {
        // Create new announcement
        const newAnnouncement = await createAnnouncement(formData);
        
        // Update local state
        setAllAnnouncements(prev => [newAnnouncement, ...prev]);
        
        // Recalculate total pages
        setTotalPages(Math.max(1, Math.ceil((allAnnouncements.length + 1) / ITEMS_PER_PAGE)));
        
        // Go to first page to show the new announcement
        setCurrentPage(1);
        
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
        <DialogContent>
          <DeleteAnnouncementDialog
            announcement={selectedAnnouncement}
            onDelete={confirmDelete}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <AnnouncementPreview
        announcement={selectedAnnouncement}
        isOpen={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
      />
    </div>
  );
}
