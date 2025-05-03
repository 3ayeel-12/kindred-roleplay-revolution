
import { Button } from "@/components/ui/button";
import { Download, Laptop } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function PCInstallationCard() {
  const { t, language } = useLanguage();
  
  return (
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
          <Button 
            className="flex items-center gap-2 bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darker border-0"
            onClick={() => window.open('https://www.sa-mp.mp/downloads/', '_blank')}
          >
            <Download size={16} />
            {t('downloadSamp')}
          </Button>
        </div>
      </div>
    </div>
  );
}
