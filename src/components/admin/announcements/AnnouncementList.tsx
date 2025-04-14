
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Announcement } from '@/services/announcementService';
import { AnnouncementCard } from './AnnouncementCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface AnnouncementListProps {
  announcements: Announcement[];
  isLoading: boolean;
  onCreateNew: () => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
  onPreview: (announcement: Announcement) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const AnnouncementList = ({
  announcements,
  isLoading,
  onCreateNew,
  onEdit,
  onDelete,
  onPreview,
  currentPage,
  totalPages,
  onPageChange
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {announcements.map(announcement => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onEdit={onEdit}
            onDelete={onDelete}
            onPreview={onPreview}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)} 
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <Button
                  variant={currentPage === page ? "outline" : "ghost"}
                  size="icon"
                  onClick={() => onPageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)} 
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
