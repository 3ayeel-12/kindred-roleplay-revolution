
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface PolicyLayoutProps {
  children: ReactNode;
  title: string;
}

export function PolicyLayout({ children, title }: PolicyLayoutProps) {
  const navigate = useNavigate();
  const { theme, direction, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className={`min-h-screen text-white transition-colors duration-300 ${theme === 'light' ? 'light-mode' : ''}`}
      dir={direction}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-kindred-accent hover:text-kindred-accent/80 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>{language === 'ar' ? 'العودة' : language === 'fr' ? 'Retour' : 'Back'}</span>
          </button>
        </div>

        <div className={cn(
          "glass-card p-6 md:p-10 max-w-4xl mx-auto",
          language === 'ar' ? "text-right" : ""
        )}>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-kindred-accent">{title}</h1>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
