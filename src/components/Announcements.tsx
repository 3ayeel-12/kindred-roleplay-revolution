
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getPublishedAnnouncements, Announcement } from '@/services/announcementService';
import { supabase } from '@/integrations/supabase/client';

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, language } = useLanguage();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getPublishedAnnouncements();
        setAnnouncements(data);
        setCurrentIndex(0); // Reset to first announcement when list updates
      } catch (error) {
        console.error('Error fetching announcements', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnnouncements();
    
    // Setup real-time subscription to announcements
    const channel = supabase
      .channel('public:announcements')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'announcements', filter: 'is_published=eq.true' }, 
        (payload) => {
          console.log('New announcement published:', payload);
          fetchAnnouncements();
          toast.info('New announcement available!', {
            description: 'Check out the latest news.',
            action: {
              label: 'View',
              onClick: () => setCurrentIndex(0)
            }
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const nextAnnouncement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
  };
  
  const prevAnnouncement = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? announcements.length - 1 : prevIndex - 1));
  };
  
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };
  
  if (isLoading) {
    return null; // Don't show anything while loading
  }
  
  if (announcements.length === 0) {
    return null; // Don't show the component if there are no announcements
  }
  
  const currentAnnouncement = announcements[currentIndex];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentAnnouncement.id}
        className={`w-full mb-8 ${theme === 'light' ? 'bg-white/70 text-gray-800' : 'bg-black/40 text-white'} border-2 ${theme === 'light' ? 'border-kindred-primary/30' : 'border-kindred-orange/30'} rounded-xl overflow-hidden transition-all duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 bg-kindred-primary/10 flex items-center">
          <Bell className="mr-2 h-5 w-5 text-kindred-accent" />
          <h3 className={cn("font-bold text-kindred-accent", language === 'ar' ? "text-right" : "")}>Announcements</h3>
          
          {announcements.length > 1 && (
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={prevAnnouncement}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {currentIndex + 1}/{announcements.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={nextAnnouncement}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h2 className={cn("text-xl font-bold mb-2", language === 'ar' ? "text-right" : "")}>{currentAnnouncement.title}</h2>
          
          {currentAnnouncement.image_url && (
            <div className="mb-4 rounded-md overflow-hidden">
              <img
                src={currentAnnouncement.image_url}
                alt={currentAnnouncement.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}
          
          <p className={cn("whitespace-pre-wrap mb-4", language === 'ar' ? "text-right" : "")}>{currentAnnouncement.content}</p>
          
          {currentAnnouncement.video_url && getYouTubeId(currentAnnouncement.video_url) && (
            <div className="aspect-video w-full mb-4 rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(currentAnnouncement.video_url)}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-right">
            {new Date(currentAnnouncement.created_at).toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
