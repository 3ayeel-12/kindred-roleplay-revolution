
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AnnouncementHeaderProps {
  onCreateNew: () => void;
}

export const AnnouncementHeader = ({ onCreateNew }: AnnouncementHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <Button onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        New Announcement
      </Button>
    </div>
  );
};
