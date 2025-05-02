
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getPublishedAnnouncements, Announcement } from '@/services/announcementService';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useLanguage();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPublishedAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError(err instanceof Error ? err : new Error('Failed to load announcements'));
        toast.error('Announcements failed to load. Please refresh or try later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnnouncements();
    
    // Setup real-time subscription to announcements
    const channel = supabase
      .channel('public:announcements:page')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'announcements', filter: 'is_published=eq.true' }, 
        (payload) => {
          console.log('New announcement received:', payload);
          fetchAnnouncements();
          toast.info('New announcement published!', {
            description: 'A new announcement has been added.',
          });
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    return match ? match[1] : null;
  };
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light-mode' : ''}`}>
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Announcements</h1>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse h-96 w-full max-w-3xl bg-kindred-primary/10 rounded-xl"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="max-w-3xl mx-auto border border-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Announcements failed to load. Please refresh or try later.
              </AlertDescription>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Refresh
              </Button>
            </Alert>
          ) : announcements.length === 0 ? (
            <div className="text-center p-10 border border-kindred-primary/20 rounded-xl bg-kindred-primary/5 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Server Opening Soon!</h2>
              <img 
                src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
                alt="Kindred Logo" 
                className="w-full max-w-md mx-auto my-6 rounded-lg"
              />
              <p className="text-xl mb-6">Wait for the server to open! For more updates, join our Discord.</p>
              <Button 
                className="bg-kindred-accent hover:bg-kindred-accent/90"
                onClick={() => window.open('https://discord.gg/kindred', '_blank')}
              >
                Join Our Discord
              </Button>
            </div>
          ) : (
            <AnimatePresence>
              <div className="space-y-8 max-w-5xl mx-auto">
                {announcements.map((announcement) => (
                  <motion.div 
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`w-full ${theme === 'light' ? 'bg-white/70 text-gray-800' : 'bg-black/40 text-white'} border-2 ${theme === 'light' ? 'border-kindred-primary/30' : 'border-kindred-orange/30'} rounded-xl overflow-hidden transition-all duration-300`}
                  >
                    <div className="p-4 bg-kindred-primary/10 flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-kindred-accent" />
                      <h3 className="font-bold text-kindred-accent">{announcement.title}</h3>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="p-4">
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};
