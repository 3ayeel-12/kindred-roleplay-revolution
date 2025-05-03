
import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function MobileInstallationCard() {
  const { t, language } = useLanguage();
  
  return (
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
          <Button 
            className="flex items-center gap-2 bg-kindred-secondary hover:bg-kindred-secondary/90 text-white border-0" 
            onClick={() => window.open('https://play.google.com/store/apps/details?id=ru.unisamp_mobile.launcher&pcampaignid=web_share', '_blank')}
          >
            <Download size={16} />
            {t('downloadLauncherBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
}
