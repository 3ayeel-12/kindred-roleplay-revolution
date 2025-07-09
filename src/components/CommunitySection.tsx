
import { cn } from "@/lib/utils";
import { Youtube, MessageCircle, Video, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { subscribeToNewsletter } from "@/services/newsletterService";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocialMediaStats } from "@/hooks/useSocialMediaStats";

export function CommunitySection() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get real social media stats
  const { stats, isLoading, formatCount, refreshStats, isRefreshing, getLastUpdated } = useSocialMediaStats();
  
  const socialPlatforms = [
    {
      name: "YouTube",
      platform: "youtube",
      subscribers: `${formatCount(stats.youtube)} ${t('followers')}`,
      color: "from-kindred-primary to-kindred-secondary",
      textColor: "text-white",
      icon: Youtube,
      url: "https://www.youtube.com/@splintaTV"
    },
    {
      name: "Discord",
      platform: "discord",
      subscribers: `${formatCount(stats.discord)} ${t('members')}`,
      color: "from-kindred-secondary to-kindred-accent",
      textColor: "text-kindred-darker",
      icon: MessageCircle,
      url: "https://discord.gg/dNUAA5sX9D"
    },
    {
      name: "TikTok",
      platform: "tiktok",
      subscribers: `${formatCount(stats.tiktok)} ${t('likes')}`,
      color: "from-kindred-accent to-kindred-light",
      textColor: "text-kindred-darker",
      icon: Video,
      url: "https://www.tiktok.com/@splintatv"
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(t('pleaseEnterValidEmail'));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await subscribeToNewsletter(email);
      toast.success(t('thanksForSubscribing'));
      setEmail(''); // Reset email field after successful subscription
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      if (error instanceof Error) {
        // Check if this is a duplicate email error
        if (error.message.includes('already subscribed')) {
          toast.error(t('emailAlreadySubscribed'));
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error(t('errorSubscribing'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-kindred-dark to-kindred-darker light-mode:from-kindred-light/90 light-mode:to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-5xl font-display font-bold text-center mb-4 light-mode:text-kindred-primary",
            language === 'ar' ? "leading-relaxed" : ""
          )}>
            {t('joinOurCommunity').toUpperCase()} <span className="text-kindred-accent light-mode:text-kindred-secondary">{t('community').toUpperCase()}</span>
          </h2>
          
          {/* Refresh Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshStats()}
              disabled={isRefreshing}
              className={cn(
                "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30",
                "light-mode:bg-kindred-primary/10 light-mode:border-kindred-primary/30 light-mode:text-kindred-primary light-mode:hover:bg-kindred-primary/20",
                isRefreshing && "opacity-50 cursor-not-allowed"
              )}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
              {isRefreshing ? 'Updating...' : 'Refresh Stats'}
            </Button>
            
            {!isLoading && (
              <span className="text-sm text-white/60 light-mode:text-kindred-darker/60">
                Last updated: {getLastUpdated('youtube')}
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <a 
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index} 
              className={cn(
                "social-card bg-gradient-to-r hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                platform.color
              )}
            >
              <div className="flex flex-1 items-center justify-between p-6">
                <div className={cn(
                  "flex items-center gap-4",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <platform.icon className={cn("w-6 h-6", platform.textColor)} />
                  </div>
                  <div className={language === 'ar' ? "text-right" : ""}>
                    <h3 className={cn("text-xl font-display font-bold", platform.textColor)}>
                      {platform.name}
                    </h3>
                    <p className="text-white/80 text-sm">{platform.subscribers}</p>
                  </div>
                </div>
                <div>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <span className={cn(
                      platform.textColor,
                      language === 'ar' ? "rotate-180 inline-block" : ""
                    )}>→</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-16 glass-card p-8 max-w-5xl mx-auto light-mode:bg-white/80 light-mode:border-kindred-primary/30 light-mode:shadow-md">
          <div className="text-center">
            <h3 className={cn(
              "text-2xl font-display font-bold mb-4 text-kindred-accent light-mode:text-kindred-primary",
              language === 'ar' ? "leading-relaxed" : ""
            )}>
              {t('subscribeNewsletter').toUpperCase()}
            </h3>
            <p className={cn(
              "text-kindred-light mb-6 max-w-2xl mx-auto light-mode:text-kindred-darker",
              language === 'ar' ? "leading-relaxed" : ""
            )}>
              {t('stayUpdated')}
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailAddress')} 
                className={cn(
                  "flex-1 px-4 py-3 rounded-md bg-kindred-dark border border-kindred-primary/30 text-white focus:outline-none focus:border-kindred-accent/50 light-mode:bg-white light-mode:border-kindred-primary/30 light-mode:text-kindred-darker",
                  language === 'ar' ? "text-right" : ""
                )}
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="btn-accent light-mode:bg-kindred-primary light-mode:text-white"
              >
                {isSubmitting ? t('subscribing') : t('subscribe').toUpperCase()}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
