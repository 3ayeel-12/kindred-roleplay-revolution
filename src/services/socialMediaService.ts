import { supabase } from "@/integrations/supabase/client";

export interface SocialMediaStat {
  id: string;
  platform: string;
  followers_count: number;
  last_updated: string;
  created_at: string;
}

export interface SocialStatsResponse {
  success: boolean;
  updated?: number;
  stats?: SocialMediaStat[];
  message?: string;
  error?: string;
}

export const socialMediaService = {
  // Get current stats from database
  async getStats(): Promise<SocialMediaStat[]> {
    const { data, error } = await supabase
      .from('social_media_stats')
      .select('*')
      .order('platform');

    if (error) {
      console.error('Error fetching social media stats:', error);
      throw error;
    }

    return data || [];
  },

  // Refresh stats by calling the edge function
  async refreshStats(): Promise<SocialStatsResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-social-stats');

      if (error) {
        console.error('Error calling fetch-social-stats function:', error);
        throw error;
      }

      return data as SocialStatsResponse;
    } catch (error) {
      console.error('Error refreshing social media stats:', error);
      throw error;
    }
  },

  // Get formatted follower count for display
  formatFollowerCount(count: number): string {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  },

  // Get stats with fallback to default values
  async getStatsWithFallback(): Promise<{ [key: string]: number }> {
    try {
      const stats = await this.getStats();
      const statsMap: { [key: string]: number } = {};
      
      stats.forEach(stat => {
        statsMap[stat.platform] = stat.followers_count;
      });

      // Provide fallback values if platforms are missing
      return {
        youtube: statsMap.youtube || 7810,
        discord: statsMap.discord || 13300,
        tiktok: statsMap.tiktok || 36000, // TikTok stays static for now
      };
    } catch (error) {
      console.error('Error getting stats, using fallback values:', error);
      // Return default values if there's an error
      return {
        youtube: 7810,
        discord: 13300,
        tiktok: 36000,
      };
    }
  }
};