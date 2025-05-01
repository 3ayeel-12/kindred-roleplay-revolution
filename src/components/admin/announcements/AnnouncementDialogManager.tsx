
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
      
      // Validate required fields
      if (!formData.title.trim()) {
        toast.error('Title is required');
        return;
      }
      
      if (!formData.content.trim()) {
        toast.error('Content is required');
        return;
      }
      
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
      toast.error(error instanceof Error ? error.message : 'Failed to save announcement');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-black border-[#333333] text-white">
        <DialogTitle className="text-xl font-bold mb-4">
          {announcement ? 'Edit Announcement' : 'Create New Announcement'}
        </DialogTitle>
        <AnnouncementForm
          announcement={announcement || {
            id: '',
            title: '',
            content: 'Wait for the server to open! For more info join our Discord.',
            image_url: 'https://media.discordapp.net/attachments/1086646892135460916/1342948782597476423/For-Insta.png?ex=6800b4c4&is=67ff6344&hm=689fe285237851765d15c6ee37368fb481e76d7c4c4234607f776cdec913fb63&=&format=webp',
            video_url: '',
            is_published: true,
            created_at: '',
            updated_at: ''
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
};
