
import { useState, useEffect } from 'react';
import { getPublishedAnnouncements, Announcement } from '@/services/announcementService';

export const useAnnouncementNotifications = () => {
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const LAST_VIEWED_KEY = 'lastViewedAnnouncement';
  
  // Check for new announcements
  useEffect(() => {
    const checkForNewAnnouncements = async () => {
      try {
        const announcements = await getPublishedAnnouncements();
        
        if (announcements.length === 0) {
          setHasNewAnnouncements(false);
          return;
        }
        
        // Get the timestamp of the most recent announcement
        const latestAnnouncementTime = new Date(announcements[0].created_at).getTime();
        
        // Get the last time the user viewed announcements
        const lastViewed = localStorage.getItem(LAST_VIEWED_KEY);
        const lastViewedTime = lastViewed ? parseInt(lastViewed, 10) : 0;
        
        // Count announcements newer than last viewed
        const newCount = announcements.filter(
          announcement => new Date(announcement.created_at).getTime() > lastViewedTime
        ).length;
        
        setAnnouncementCount(newCount);
        setHasNewAnnouncements(newCount > 0);
      } catch (error) {
        console.error('Error checking for new announcements:', error);
      }
    };
    
    // Check immediately and then every minute
    checkForNewAnnouncements();
    const interval = setInterval(checkForNewAnnouncements, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mark announcements as viewed
  const markAnnouncementsAsViewed = () => {
    const now = new Date().getTime();
    localStorage.setItem(LAST_VIEWED_KEY, now.toString());
    setHasNewAnnouncements(false);
    setAnnouncementCount(0);
  };
  
  return {
    hasNewAnnouncements,
    announcementCount,
    markAnnouncementsAsViewed
  };
};
