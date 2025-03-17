
import { useState, useEffect } from 'react';
import { useAdminAnnouncements } from '@/hooks/use-support';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function AdminAnnouncements() {
  const { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, isLoading } = useAdminAnnouncements();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    videoUrl: '',
    isPublished: true
  });
  
  useEffect(() => {
    loadAnnouncements();
  }, []);
  
  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      toast.error('Failed to load announcements');
    }
  };
  
  const handleCreateNew = () => {
    setSelectedAnnouncement(null);
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      videoUrl: '',
      isPublished: true
    });
    setIsDialogOpen(true);
  };
  
  const handleEdit = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      imageUrl: announcement.imageUrl || '',
      videoUrl: announcement.videoUrl || '',
      isPublished: announcement.isPublished
    });
    setIsDialogOpen(true);
  };
  
  const handleDelete = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedAnnouncement) return;
    
    try {
      await deleteAnnouncement(selectedAnnouncement.id);
      toast.success('Announcement deleted');
      loadAnnouncements();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete announcement');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement.id, formData);
        toast.success('Announcement updated');
      } else {
        await createAnnouncement(formData);
        toast.success('Announcement created');
      }
      
      loadAnnouncements();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to save announcement');
    }
  };
  
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>
      
      {isLoading ? (
        <p className="text-center py-8">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-md bg-muted/30">
          <p className="text-muted-foreground mb-4">No announcements yet</p>
          <Button onClick={handleCreateNew}>Create Your First Announcement</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {announcements.map(announcement => (
            <div key={announcement.id} className="border rounded-lg overflow-hidden bg-card">
              {announcement.imageUrl && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={announcement.imageUrl}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold">{announcement.title}</h2>
                  <div className="flex items-center gap-1">
                    {announcement.isPublished ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                
                {announcement.videoUrl && getYouTubeId(announcement.videoUrl) && (
                  <div className="mt-3 text-xs text-blue-500">
                    YouTube video embedded
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleString()}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(announcement)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAnnouncement ? 'Edit Announcement' : 'Create Announcement'}
            </DialogTitle>
            <DialogDescription>
              {selectedAnnouncement 
                ? 'Update the announcement details below.' 
                : 'Fill in the details to create a new announcement.'}
            </DialogDescription>
          </DialogHeader>
          
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
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedAnnouncement ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAnnouncement?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
