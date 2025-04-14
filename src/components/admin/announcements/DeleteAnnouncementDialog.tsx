
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Announcement } from '@/services/announcementService';

interface DeleteAnnouncementDialogProps {
  announcement: Announcement | null;
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteAnnouncementDialog = ({
  announcement,
  onDelete,
  onCancel
}: DeleteAnnouncementDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete "{announcement?.title}"? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
