
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  titleKey: string;
  accentKey: string;
  descriptionKey: string;
}

export function SectionTitle({ titleKey, accentKey, descriptionKey }: SectionTitleProps) {
  const { t, language } = useLanguage();
  
  return (
    <>
      <h2 className={cn(
        "text-3xl md:text-5xl font-display font-bold text-center mb-4",
        language === 'ar' ? "leading-relaxed" : ""
      )}>
        {t(titleKey)} <span className="text-kindred-accent">{t(accentKey)}</span>
      </h2>
      
      <p className={cn(
        "text-center text-gray-400 max-w-2xl mx-auto mb-12",
        language === 'ar' ? "leading-relaxed" : ""
      )}>
        <span className="text-kindred-secondary font-medium">
          {t(descriptionKey)}
        </span>
      </p>
    </>
  );
}
