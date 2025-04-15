
import { supabase } from "@/integrations/supabase/client";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  video_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type AnnouncementInput = Omit<Announcement, 'id' | 'created_at' | 'updated_at'>;

export const getPublishedAnnouncements = async (): Promise<Announcement[]> => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
  
  return data || [];
};

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching all announcements:', error);
    throw error;
  }
  
  return data || [];
};

export const createAnnouncement = async (announcement: AnnouncementInput): Promise<Announcement> => {
  // Validate required fields
  if (!announcement.title.trim()) {
    throw new Error('Title is required');
  }
  
  if (!announcement.content.trim()) {
    throw new Error('Content is required');
  }
  
  const { data, error } = await supabase
    .from('announcements')
    .insert(announcement)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
  
  return data;
};

export const updateAnnouncement = async (
  id: string, 
  updates: Partial<AnnouncementInput>
): Promise<Announcement> => {
  // Validate required fields if they are being updated
  if (updates.title !== undefined && !updates.title.trim()) {
    throw new Error('Title is required');
  }
  
  if (updates.content !== undefined && !updates.content.trim()) {
    throw new Error('Content is required');
  }
  
  const { data, error } = await supabase
    .from('announcements')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
  
  return data;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};
