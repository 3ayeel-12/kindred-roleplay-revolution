import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SocialStats {
  platform: string;
  followers_count: number;
}

async function fetchYouTubeStats(): Promise<number | null> {
  const apiKey = Deno.env.get('YOUTUBE_API_KEY');
  if (!apiKey) {
    console.error('YOUTUBE_API_KEY not found');
    return null;
  }

  // Extract channel ID from the YouTube URL
  const channelHandle = 'splintaTV'; // From https://www.youtube.com/@splintaTV
  
  try {
    // First, get channel details using the handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelHandle}&key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      console.error('YouTube search failed:', await searchResponse.text());
      return null;
    }
    
    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      console.error('No YouTube channel found for handle:', channelHandle);
      return null;
    }
    
    const channelId = searchData.items[0].snippet.channelId;
    
    // Now get the subscriber count
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    
    if (!statsResponse.ok) {
      console.error('YouTube stats fetch failed:', await statsResponse.text());
      return null;
    }
    
    const statsData = await statsResponse.json();
    
    if (statsData.items && statsData.items[0] && statsData.items[0].statistics) {
      const subscriberCount = parseInt(statsData.items[0].statistics.subscriberCount);
      console.log('YouTube subscriber count:', subscriberCount);
      return subscriberCount;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return null;
  }
}

async function fetchDiscordStats(): Promise<number | null> {
  const botToken = Deno.env.get('DISCORD_BOT_TOKEN');
  if (!botToken) {
    console.error('DISCORD_BOT_TOKEN not found');
    return null;
  }

  // Extract server ID from Discord URL
  const serverId = 'dNUAA5sX9D'; // From https://discord.gg/dNUAA5sX9D
  
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${serverId}?with_counts=true`,
      {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      console.error('Discord API failed:', response.status, await response.text());
      return null;
    }
    
    const data = await response.json();
    
    if (data.approximate_member_count) {
      console.log('Discord member count:', data.approximate_member_count);
      return data.approximate_member_count;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Discord stats:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? 'https://iwnzqvojgdoxiaiycyiw.supabase.co';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseServiceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not found');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching social media stats...');
    
    // Fetch stats from all platforms
    const [youtubeCount, discordCount] = await Promise.all([
      fetchYouTubeStats(),
      fetchDiscordStats(),
    ]);

    const updates: SocialStats[] = [];
    
    // Update YouTube stats if successful
    if (youtubeCount !== null) {
      updates.push({ platform: 'youtube', followers_count: youtubeCount });
    }
    
    // Update Discord stats if successful
    if (discordCount !== null) {
      updates.push({ platform: 'discord', followers_count: discordCount });
    }

    // Update database with new stats
    const results = [];
    for (const update of updates) {
      const { data, error } = await supabase
        .from('social_media_stats')
        .upsert(update, { onConflict: 'platform' })
        .select();
        
      if (error) {
        console.error(`Error updating ${update.platform}:`, error);
      } else {
        results.push(data[0]);
        console.log(`Updated ${update.platform} with ${update.followers_count} followers`);
      }
    }

    // Get all current stats to return
    const { data: allStats, error: fetchError } = await supabase
      .from('social_media_stats')
      .select('*')
      .order('platform');

    if (fetchError) {
      throw fetchError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated: results.length,
        stats: allStats,
        message: `Successfully updated ${results.length} platform(s)`
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in fetch-social-stats function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});