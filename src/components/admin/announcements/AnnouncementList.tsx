
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Announcement } from '@/services/announcementService';
import { AnnouncementCard } from './AnnouncementCard';

interface AnnouncementListProps {
  announcements: Announcement[];
  isLoading: boolean;
  onCreateNew: () => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
}

export const AnnouncementList = ({
  announcements,
  isLoading,
  onCreateNew,
  onEdit,
  onDelete
}: AnnouncementListProps) => {
  if (isLoading) {
    return <p className="text-center py-8">Loading announcements...</p>;
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border rounded-md bg-muted/30">
        <p className="text-muted-foreground mb-4">No announcements yet</p>
        <Button onClick={onCreateNew}>Create Your First Announcement</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {announcements.map(announcement => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
