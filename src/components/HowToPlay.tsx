
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { MobileInstallationCard } from "./how-to-play/MobileInstallationCard";
import { PCInstallationCard } from "./how-to-play/PCInstallationCard";
import { SectionTitle } from "./how-to-play/SectionTitle";

export function HowToPlay() {
  const { t, language } = useLanguage();
  
  return (
    <section id="how-to-play" className="py-20 bg-gradient-to-b from-kindred-darker to-kindred-dark">
      <div className="container mx-auto px-4">
        <SectionTitle 
          titleKey="howToPlayTitle"
          accentKey="startPlaying"
          descriptionKey="howToPlayDesc"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mobile Installation */}
          <MobileInstallationCard />
          
          {/* PC Installation */}
          <PCInstallationCard />
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
