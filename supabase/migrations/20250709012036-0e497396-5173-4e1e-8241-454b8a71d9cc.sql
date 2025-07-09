-- Create social media stats table to cache real data
CREATE TABLE public.social_media_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  followers_count INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_media_stats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read stats
CREATE POLICY "Anyone can view social media stats" 
ON public.social_media_stats 
FOR SELECT 
USING (true);

-- Create policy to allow system updates (from edge functions)
CREATE POLICY "System can update social media stats" 
ON public.social_media_stats 
FOR ALL 
USING (true);

-- Insert initial data for the platforms
INSERT INTO public.social_media_stats (platform, followers_count) VALUES
('youtube', 7810),
('discord', 13300),
('tiktok', 36000)
ON CONFLICT (platform) DO NOTHING;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_social_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_social_stats_timestamp
BEFORE UPDATE ON public.social_media_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_social_stats_timestamp();