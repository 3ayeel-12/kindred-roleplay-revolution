
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Edit, Trash2, Monitor } from 'lucide-react';
import { Announcement } from '@/services/announcementService';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
  onPreview: (announcement: Announcement) => void;
}

export const AnnouncementCard = ({ 
  announcement, 
  onEdit, 
  onDelete,
  onPreview 
}: AnnouncementCardProps) => {
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      {announcement.image_url && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={announcement.image_url}
            alt={announcement.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
            }}
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold">{announcement.title}</h2>
          <div className="flex items-center gap-1">
            {announcement.is_published ? (
              <Eye className="h-4 w-4 text-green-500" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
        
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
        
        {announcement.video_url && getYouTubeId(announcement.video_url) && (
          <div className="mt-3 text-xs text-blue-500">
            YouTube video embedded
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {new Date(announcement.created_at).toLocaleString()}
          </span>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onPreview(announcement)}
            >
              <Monitor className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(announcement)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(announcement)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
