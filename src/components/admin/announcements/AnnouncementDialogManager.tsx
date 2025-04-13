
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Announcement } from '@/hooks/use-admin-announcements';
import { AnnouncementForm, AnnouncementFormData } from '@/components/admin/announcements/AnnouncementForm';
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: AnnouncementFormData) => {
    try {
      setIsSaving(true);
      
      if (announcement) {
        await onUpdate(announcement.id, formData);
        toast.success('Announcement updated successfully');
      } else {
        const newAnnouncement = await onCreate(formData as Omit<Announcement, 'id' | 'createdAt'>);
        toast.success('Announcement created successfully');
        
        if (formData.isPublished) {
          toast('New announcement published', {
            description: 'Users will be notified about this announcement.',
            action: {
              label: 'View',
              onClick: () => window.open('/announcements', '_blank')
            }
          });
        }
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
      <DialogContent className="max-w-xl">
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
