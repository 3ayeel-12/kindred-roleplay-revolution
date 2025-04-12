
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  DialogFooter,
} from '@/components/ui/dialog';
import { Announcement } from '@/hooks/use-admin-announcements';

interface AnnouncementFormProps {
  announcement: Announcement | null;
  onSubmit: (formData: AnnouncementFormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isPublished: boolean;
}

export const AnnouncementForm = ({ 
  announcement, 
  onSubmit, 
  onCancel,
  isSaving 
}: AnnouncementFormProps) => {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: announcement?.title || '',
    content: announcement?.content || '',
    imageUrl: announcement?.imageUrl || '',
    videoUrl: announcement?.videoUrl || '',
    isPublished: announcement?.isPublished ?? true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Announcement title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your announcement here..."
          rows={5}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
        />
        {formData.imageUrl && (
          <div className="mt-2 aspect-video max-h-[150px] overflow-hidden rounded-md border">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="videoUrl">YouTube Video URL (optional)</Label>
        <Input
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleInputChange}
          placeholder="https://youtube.com/watch?v=..."
        />
        {formData.videoUrl && getYouTubeId(formData.videoUrl) && (
          <div className="mt-2 aspect-video max-h-[150px] overflow-hidden rounded-md border">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYouTubeId(formData.videoUrl)}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isPublished">Publish announcement</Label>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : announcement ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
};
