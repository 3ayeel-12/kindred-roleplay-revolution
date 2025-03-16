
import { Play } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const [showVideo, setShowVideo] = useState(false);
  const { t, language } = useLanguage();
  
  const featuredImage = "/lovable-uploads/6245ce6f-3ebb-4fe1-9d2d-9e74569dc0cd.png";

  return (
    <section id="about" className="py-20 bg-kindred-darker/95 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${featuredImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-kindred-darker/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn(
          "text-3xl md:text-5xl font-display font-bold text-center mb-16 drop-shadow-glow",
          language === 'ar' ? "leading-relaxed" : ""
        )}>
          <span className="text-kindred-accent">{t('about')}</span> {t('aboutUs')}
        </h2>
        
        <div className="max-w-4xl mx-auto mb-12 text-center animate-on-scroll">
          <h3 className={cn(
            "text-2xl md:text-3xl font-display font-bold text-kindred-highlight mb-6",
            language === 'ar' ? "leading-relaxed" : ""
          )}>
            {t('kindredCommunity')} <span className="text-kindred-accent">[{t('roleplayAndChill')}]</span> 🎭🔥
          </h3>
          
          <p className={cn(
            "text-lg mb-6 text-gray-300",
            language === 'ar' ? "leading-relaxed" : ""
          )}>
            {t('stepIntoWorld')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className={cn(
                "text-kindred-highlight text-xl font-display font-bold mb-4",
                language === 'ar' ? "text-right" : ""
              )}>🚀 {t('whyJoinUs')}</h4>
              <ul className={cn(
                "text-left space-y-2",
                language === 'ar' ? "text-right" : ""
              )}>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>💎</span>
                  <span><span className="font-semibold">{t('fairPlay')}</span></span>
                </li>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>👑</span>
                  <span><span className="font-semibold">{t('eliteAdmins')}</span></span>
                </li>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>🎖</span>
                  <span><span className="font-semibold">{t('legendaryPlayers')}</span></span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className={cn(
                "text-kindred-highlight text-xl font-display font-bold mb-4",
                language === 'ar' ? "text-right" : ""
              )}>🎭 {t('roleplayActivities')}</h4>
              <ul className={cn(
                "text-left space-y-2",
                language === 'ar' ? "text-right" : ""
              )}>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>✅</span>
                  <span><span className="font-semibold">{t('noPlayToWin')}</span></span>
                </li>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>🎉</span>
                  <span><span className="font-semibold">{t('epicWeeklyEvents')}</span></span>
                </li>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "text-kindred-accent",
                    language === 'ar' ? "ml-2" : "mr-2"
                  )}>🏆</span>
                  <span><span className="font-semibold">{t('arenaSystem')}</span></span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className={cn(
                "text-kindred-highlight text-xl font-display font-bold mb-4",
                language === 'ar' ? "text-right" : ""
              )}>🔥 {t('joinToday')}</h4>
              <p className={cn(
                "text-center mb-4",
                language === 'ar' ? "text-right" : ""
              )}>{t('experienceSamp')}</p>
              <div className="flex justify-center">
                <button className="sa-button transform transition hover:scale-105">
                  {t('joinServer')}
                </button>
              </div>
            </div>
          </div>
          
          <p className={cn(
            "text-xl font-semibold text-kindred-accent",
            language === 'ar' ? "leading-relaxed" : ""
          )}>
            🔥 {t('joinCommunity')} 🔥
          </p>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mx-auto max-w-3xl glass-card p-1 mb-12">
          {showVideo ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/itmQpfy5w_k?autoplay=1&start=66" 
                title="KindreD Community GTA SAMP Gameplay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${featuredImage}')` }}
              ></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="w-16 h-16 bg-kindred-accent/90 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Play size={32} className="text-kindred-darker ml-1" />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-4 text-xs text-white bg-black/60 px-3 py-1 rounded-full">
                Video by: KindreD Community
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
