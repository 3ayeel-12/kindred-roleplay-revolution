
import { Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function ServerOffline() {
  const { theme, t, language } = useLanguage();
  
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      language === 'ar' ? "text-right" : ""
    )}>
      <Server className="text-red-500 mb-2" size={32} />
      <h3 className="text-lg font-bold text-red-500">{t('server')} {t('offline')}</h3>
      <p className={cn(
        `${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} max-w-md mt-2`,
        language === 'ar' ? "text-right" : ""
      )}>
        {t('server')} 91.121.237.128:1958 {t('offline')}.
      </p>
    </div>
  );
}
