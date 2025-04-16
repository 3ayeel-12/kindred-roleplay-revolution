
import { Building, Briefcase, Car, Users, DollarSign, Target } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function FeatureSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { t, language } = useLanguage();
  
  const features = [
    {
      title: t('createAutopark'),
      description: t('findStyle'),
      icon: Car,
      color: "text-kindred-accent bg-kindred-accent/10"
    },
    {
      title: t('getAhead'),
      description: t('improveSkills'),
      icon: DollarSign,
      color: "text-kindred-secondary bg-kindred-secondary/10"
    },
    {
      title: t('becomeGangster'),
      description: t('workHard'),
      icon: Target,
      color: "text-kindred-primary bg-kindred-primary/10"
    },
    {
      title: t('manageBusiness'),
      description: t('produceSupplies'),
      icon: Briefcase,
      color: "text-green-500 bg-green-500/10"
    }
  ];

  return (
    <section id="features" className="py-20 bg-kindred-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/lovable-uploads/31674479-6469-4909-a1c9-986643d69ef6.png')" }}
        ></div>
        <div className="absolute inset-0 bg-kindred-dark/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "feature-card flex items-start gap-4 hover:translate-y-[-3px] transition-all duration-300 cursor-pointer",
                  language === 'ar' ? "flex-row-reverse text-right" : ""
                )}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`p-3 rounded-lg ${feature.color} transition-all duration-300 ${hoveredFeature === index ? 'scale-110' : ''}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{feature.title}</h3>
                  <p className="text-kindred-light text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card overflow-hidden group relative">
            <div 
              className="w-full h-full bg-cover bg-center aspect-square md:aspect-auto md:min-h-[500px] transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://media.discordapp.net/attachments/1086646892135460916/1342948782597476423/For-Insta.png?ex=6800b4c4&is=67ff6344&hm=689fe285237851765d15c6ee37368fb481e76d7c4c4234607f776cdec913fb63&=&format=webp')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-kindred-darkest via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
        
        <div className="mt-16 glass-card p-8 hover:shadow-lg hover:border-kindred-accent/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div 
              className="w-full h-full bg-cover bg-center blur-sm"
              style={{ backgroundImage: "url('/lovable-uploads/3cb2cca7-a342-487a-bcf1-a14f8fa95aff.png')" }}
            ></div>
            <div className="absolute inset-0 bg-kindred-darker/80"></div>
          </div>
          
          <div className={cn(
            "flex flex-col md:flex-row items-center justify-between gap-8 relative z-10",
            language === 'ar' ? "md:flex-row-reverse" : ""
          )}>
            <div className={cn("flex-1", language === 'ar' ? "text-right" : "")}>
              <h3 className={cn(
                "text-2xl font-display font-bold text-white mb-2",
                language === 'ar' ? "leading-relaxed" : ""
              )}>
                {t('playNow')} <span className="text-kindred-accent">{t('promoCode')}</span>
              </h3>
              <div className="text-4xl font-display font-bold text-white mb-4">
                <span className="text-kindred-accent animate-pulse">KINDRED2023</span>
              </div>
              <h4 className="text-3xl font-display font-bold">
                {t('get')} <span className="text-kindred-accent">$25 000</span>
              </h4>
            </div>
            
            <div className="flex-shrink-0">
              <button className="btn-accent relative overflow-hidden group">
                <span className="relative z-10">{t('startPlaying')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
