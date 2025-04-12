
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

interface AnnouncementHeaderProps {
  onCreateNew: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const AnnouncementHeader = ({ onCreateNew, onRefresh, isLoading }: AnnouncementHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading} title="Refresh announcements">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>
    </div>
  );
};
