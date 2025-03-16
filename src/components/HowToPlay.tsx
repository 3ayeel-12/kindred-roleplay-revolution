
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Laptop, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function HowToPlay() {
  const { t, language } = useLanguage();
  
  return (
    <section id="how-to-play" className="py-20 bg-gradient-to-b from-kindred-darker to-kindred-dark">
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-3xl md:text-5xl font-display font-bold text-center mb-4",
          language === 'ar' ? "leading-relaxed" : ""
        )}>
          {t('howToPlayTitle')} <span className="text-kindred-accent">{t('startPlaying')}</span>
        </h2>
        
        <p className={cn(
          "text-center text-gray-400 max-w-2xl mx-auto mb-12",
          language === 'ar' ? "leading-relaxed" : ""
        )}>
          <span className="text-kindred-secondary font-medium">
            {t('howToPlayDesc')}
          </span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mobile Installation */}
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-secondary text-kindred-darker text-xs font-bold px-2 py-1 rounded">
              {t('mobile')}
            </div>
            
            <div className="pt-10">
              <h3 className={cn(
                "text-2xl font-display font-bold mb-6 text-kindred-secondary flex items-center gap-2",
                language === 'ar' ? "leading-relaxed justify-end" : ""
              )}>
                <Smartphone size={24} />
                {t('installOnAndroid')}
              </h3>
              
              <ol className={cn(
                "space-y-4 text-left",
                language === 'ar' ? "text-right" : ""
              )}>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>1</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('downloadLauncher')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('searchLauncher')}</p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>2</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('installGta')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('findLegalCopy')}</p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>3</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('openLauncher')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('enterServerIp')}</p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>4</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('connectPlay')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('customizeName')}</p>
                  </div>
                </li>
              </ol>
              
              <div className={cn("mt-6", language === 'ar' ? "text-right" : "")}>
                <Button className="flex items-center gap-2 bg-kindred-secondary hover:bg-kindred-secondary/90 text-white border-0">
                  <Download size={16} />
                  {t('downloadLauncherBtn')}
                </Button>
              </div>
            </div>
          </div>
          
          {/* PC Installation */}
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-accent text-kindred-darker text-xs font-bold px-2 py-1 rounded">
              {t('pc')}
            </div>
            
            <div className="pt-10">
              <h3 className={cn(
                "text-2xl font-display font-bold mb-6 text-kindred-accent flex items-center gap-2",
                language === 'ar' ? "leading-relaxed justify-end" : ""
              )}>
                <Laptop size={24} />
                {t('installOnPc')}
              </h3>
              
              <ol className={cn(
                "space-y-4 text-left",
                language === 'ar' ? "text-right" : ""
              )}>
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>1</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('downloadInstallGta')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('originalGame')}</p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>2</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('downloadSampClient')}</span>
                    <p className="text-sm text-gray-400 mt-1">
                      {t('getSampFrom').split('sa-mp.com')[0]}
                      <a href="https://www.sa-mp.com/download.php" target="_blank" rel="noopener noreferrer" className="text-kindred-accent hover:underline">sa-mp.com</a>
                    </p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>3</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('installSamp')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('installDirectory')}</p>
                  </div>
                </li>
                
                <li className={cn(
                  "flex items-start",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}>
                  <span className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mt-0.5",
                    language === 'ar' ? "ml-3" : "mr-3"
                  )}>4</span>
                  <div>
                    <span className="font-semibold text-kindred-light">{t('launchSamp')}</span>
                    <p className="text-sm text-gray-400 mt-1">{t('addServerIp')}</p>
                  </div>
                </li>
              </ol>
              
              <div className={cn("mt-6", language === 'ar' ? "text-right" : "")}>
                <Button className="flex items-center gap-2 bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darker border-0">
                  <Download size={16} />
                  {t('downloadSamp')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <h3 className={cn(
            "text-2xl font-display font-bold mb-4 text-white",
            language === 'ar' ? "leading-relaxed" : ""
          )}>
            🔥 {t('readyToPlay')} 🔥
          </h3>
        </div>
      </div>
    </section>
  );
}
