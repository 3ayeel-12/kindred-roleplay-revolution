
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Announcement } from '@/hooks/use-admin-announcements';
import { AnnouncementForm, AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';

interface AnnouncementDialogManagerProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: Omit<Announcement, 'id' | 'createdAt'>) => Promise<Announcement>;
  onUpdate: (id: string, updates: Partial<Announcement>) => Promise<void>;
}

export const AnnouncementDialogManager = ({
  announcement,
  isOpen,
  onClose,
  onCreate,
  onUpdate
}: AnnouncementDialogManagerProps) => {
  const handleSubmit = async (formData: AnnouncementFormData) => {
    try {
      if (announcement) {
        await onUpdate(announcement.id, formData);
      } else {
        await onCreate(formData as Omit<Announcement, 'id' | 'createdAt'>);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <AnnouncementForm
          announcement={announcement}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSaving={false}
        />
      </DialogContent>
    </Dialog>
  );
};
