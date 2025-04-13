
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Announcement } from '@/services/announcementService';

interface AnnouncementPreviewProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementPreview = ({ 
  announcement, 
  isOpen, 
  onClose 
}: AnnouncementPreviewProps) => {
  if (!announcement) return null;

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center">Preview Announcement</h2>
            <p className="text-muted-foreground text-center text-sm">This is how your announcement will appear to users</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-card">
            <h1 className="text-xl font-bold mb-2">{announcement.title}</h1>
            
            {announcement.image_url && (
              <div className="mb-4 rounded-md overflow-hidden">
                <img
                  src={announcement.image_url}
                  alt={announcement.title}
                  className="w-full h-auto max-h-96 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
            
            <p className="whitespace-pre-wrap mb-4">{announcement.content}</p>
            
            {announcement.video_url && getYouTubeId(announcement.video_url) && (
              <div className="aspect-video w-full mb-4 rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(announcement.video_url)}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground text-right">
              {new Date(announcement.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
