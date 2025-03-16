
import { cn } from "@/lib/utils";
import { Youtube, MessageCircle, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CommunitySection() {
  const { t, language } = useLanguage();
  
  const socialPlatforms = [
    {
      name: "YouTube",
      subscribers: `7.81K ${t('followers')}`,
      color: "from-kindred-primary to-kindred-secondary",
      textColor: "text-white",
      icon: Youtube,
      url: "https://www.youtube.com/@splintaTV"
    },
    {
      name: "Discord",
      subscribers: `13.3K ${t('members')}`,
      color: "from-kindred-secondary to-kindred-accent",
      textColor: "text-kindred-darker",
      icon: MessageCircle,
      url: "https://discord.gg/dNUAA5sX9D"
    },
    {
      name: "TikTok",
      subscribers: `36K ${t('likes')}`,
      color: "from-kindred-accent to-kindred-light",
      textColor: "text-kindred-darker",
      icon: Video,
      url: "https://www.tiktok.com/@splintatv"
    }
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-kindred-dark to-kindred-darker light-mode:from-kindred-light/90 light-mode:to-white">
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-5xl font-display font-bold text-center mb-16 light-mode:text-kindred-primary",
          language === 'ar' ? "leading-relaxed" : ""
        )}>
          {t('joinOurCommunity').toUpperCase()} <span className="text-kindred-accent light-mode:text-kindred-secondary">{t('community').toUpperCase()}</span>
        </h2>
        
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
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('emailAddress')} 
                className={cn(
                  "flex-1 px-4 py-3 rounded-md bg-kindred-dark border border-kindred-primary/30 text-white focus:outline-none focus:border-kindred-accent/50 light-mode:bg-white light-mode:border-kindred-primary/30 light-mode:text-kindred-darker",
                  language === 'ar' ? "text-right" : ""
                )}
              />
              <button className="btn-accent light-mode:bg-kindred-primary light-mode:text-white">
                {t('subscribe').toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
