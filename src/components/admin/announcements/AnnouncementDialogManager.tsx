
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Announcement, AnnouncementInput } from '@/services/announcementService';
import { AnnouncementForm } from '@/components/admin/announcements/AnnouncementForm';
import { useState } from 'react';
import { toast } from 'sonner';

interface AnnouncementDialogManagerProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: AnnouncementInput) => Promise<Announcement>;
  onUpdate: (id: string, updates: Partial<AnnouncementInput>) => Promise<void>;
}

export const AnnouncementDialogManager = ({
  announcement,
  isOpen,
  onClose,
  onCreate,
  onUpdate
}: AnnouncementDialogManagerProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setIsSaving(true);
      
      if (announcement) {
        await onUpdate(announcement.id, formData);
        toast.success('Announcement updated successfully');
      } else {
        const newAnnouncement = await onCreate(formData);
        toast.success('Announcement created successfully');
      }
      
      onClose();
    } catch (error) {
      console.error('Error submitting announcement:', error);
      toast.error('Failed to save announcement');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-black border-[#333333] text-white">
        <AnnouncementForm
          announcement={announcement}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
};
