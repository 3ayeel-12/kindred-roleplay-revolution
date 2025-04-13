
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Announcements as AnnouncementsComponent } from '@/components/Announcements';
import { Footer } from '@/components/Footer';
import { getPublishedAnnouncements, Announcement } from '@/services/announcementService';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useLanguage();
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const data = await getPublishedAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);
  
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
          ) : announcements.length === 0 ? (
            <div className="text-center p-10 border border-kindred-primary/20 rounded-xl bg-kindred-primary/5">
              <p className="text-xl">No announcements available at this time.</p>
            </div>
          ) : (
            <div className="space-y-8 max-w-5xl mx-auto">
              {announcements.map((announcement) => (
                <AnnouncementsComponent key={announcement.id} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
