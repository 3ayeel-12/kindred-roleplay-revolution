
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Announcement } from '@/services/announcementService';
import { AnnouncementForm, AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';
import { DeleteAnnouncementDialog } from '@/components/admin/announcements/DeleteAnnouncementDialog';
import { AnnouncementPreview } from '@/components/admin/announcements/AnnouncementPreview';

interface AnnouncementDialogManagerProps {
  selectedAnnouncement: Announcement | null;
  isFormOpen: boolean;
  isDeleteDialogOpen: boolean;
  isPreviewDialogOpen: boolean;
  isSaving: boolean;
  onCloseForm: () => void;
  onCloseDelete: () => void;
  onClosePreview: () => void;
  onSubmit: (formData: AnnouncementFormData) => void;
  onConfirmDelete: () => void;
}

export const AnnouncementDialogManager = ({
  selectedAnnouncement,
  isFormOpen,
  isDeleteDialogOpen,
  isPreviewDialogOpen,
  isSaving,
  onCloseForm,
  onCloseDelete,
  onClosePreview,
  onSubmit,
  onConfirmDelete
}: AnnouncementDialogManagerProps) => {
  return (
    <>
      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={onCloseForm}>
        <DialogContent className="max-w-xl">
          <AnnouncementForm
            announcement={selectedAnnouncement}
            onSubmit={onSubmit}
            onCancel={onCloseForm}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={onCloseDelete}>
        <DialogContent>
          <DeleteAnnouncementDialog
            announcement={selectedAnnouncement}
            onDelete={onConfirmDelete}
            onCancel={onCloseDelete}
          />
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <AnnouncementPreview
        announcement={selectedAnnouncement}
        isOpen={isPreviewDialogOpen}
        onClose={onClosePreview}
      />
    </>
  );
};
