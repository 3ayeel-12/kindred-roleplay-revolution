import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { socialMediaService, SocialMediaStat } from "@/services/socialMediaService";
import { toast } from "sonner";

export function useSocialMediaStats() {
  const queryClient = useQueryClient();

  const {
    data: stats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['social-media-stats'],
    queryFn: socialMediaService.getStats,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    refetchInterval: 10 * 60 * 1000, // Auto-refetch every 10 minutes
  });

  const refreshMutation = useMutation({
    mutationFn: socialMediaService.refreshStats,
    onSuccess: (data) => {
      // Invalidate and refetch the stats
      queryClient.invalidateQueries({ queryKey: ['social-media-stats'] });
      
      if (data.success) {
        toast.success(`Updated ${data.updated} platform(s) successfully!`);
      } else {
        toast.error(data.error || 'Failed to refresh stats');
      }
    },
    onError: (error) => {
      console.error('Error refreshing stats:', error);
      toast.error('Failed to refresh social media stats');
    },
  });

  const getFormattedStats = () => {
    const statsMap: { [key: string]: number } = {};
    
    stats.forEach((stat: SocialMediaStat) => {
      statsMap[stat.platform] = stat.followers_count;
    });

    return {
      youtube: statsMap.youtube || 7810,
      discord: statsMap.discord || 13300,
      tiktok: statsMap.tiktok || 36000,
    };
  };

  const formatCount = (count: number): string => {
    return socialMediaService.formatFollowerCount(count);
  };

  const getLastUpdated = (platform: string): string => {
    const stat = stats.find((s: SocialMediaStat) => s.platform === platform);
    if (!stat) return 'Never';
    
    const lastUpdated = new Date(stat.last_updated);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return {
    stats: getFormattedStats(),
    rawStats: stats,
    isLoading,
    error,
    refreshStats: refreshMutation.mutate,
    isRefreshing: refreshMutation.isPending,
    formatCount,
    getLastUpdated,
  };
}