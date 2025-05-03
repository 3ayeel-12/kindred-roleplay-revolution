
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Footer() {
  const { t, language } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kindred-darkest py-12 border-t border-kindred-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
                alt="KindreD Logo" 
                className="h-10 w-auto mr-2"
              />
              <span className="font-display font-bold text-white text-xl">KindreD</span>
            </a>
            <p className={cn("text-kindred-light text-sm mb-4", language === 'ar' ? "text-right" : "")}>
              {t('contactUs')}:
            </p>
            <a href="mailto:support@kindredrp.com" className="text-kindred-accent hover:underline">
              support@kindredrp.com
            </a>
          </div>
          
          <div className={language === 'ar' ? "text-right" : ""}>
            <h4 className="text-white font-display font-bold mb-4">
              {t('techSupport')}
            </h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-kindred-light hover:text-kindred-accent transition-colors">{t('privacyPolicy')}</Link></li>
              <li><Link to="/faq" className="text-kindred-light hover:text-kindred-accent transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-kindred-light hover:text-kindred-accent transition-colors">{t('termsOfService')}</Link></li>
            </ul>
          </div>
          
          <div className={language === 'ar' ? "text-right" : ""}>
            <h4 className="text-white font-display font-bold mb-4">
              {t('helpReferences')}
            </h4>
            <p className="text-kindred-light text-sm">
              {t('languageNote')}
            </p>
            
            <div className={cn("mt-4 flex items-center", language === 'ar' ? "justify-end space-x-reverse space-x-2" : "space-x-2")}>
              <span className="text-xs text-kindred-light">{t('languages')}:</span>
              <button 
                onClick={() => language !== 'en' && document.dispatchEvent(new CustomEvent('change-language', { detail: 'en' }))} 
                className={cn("text-xs", language === 'en' ? "text-kindred-accent" : "text-kindred-light hover:text-kindred-accent")}
              >
                English
              </button>
              <span className="text-kindred-light">|</span>
              <button 
                onClick={() => language !== 'fr' && document.dispatchEvent(new CustomEvent('change-language', { detail: 'fr' }))} 
                className={cn("text-xs", language === 'fr' ? "text-kindred-accent" : "text-kindred-light hover:text-kindred-accent")}
              >
                Français
              </button>
              <span className="text-kindred-light">|</span>
              <button 
                onClick={() => language !== 'ar' && document.dispatchEvent(new CustomEvent('change-language', { detail: 'ar' }))} 
                className={cn("text-xs", language === 'ar' ? "text-kindred-accent" : "text-kindred-light hover:text-kindred-accent font-[Tajawal]")}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-kindred-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className={cn("text-kindred-light text-sm mb-4 md:mb-0", language === 'ar' ? "text-right" : "")}>
            © {currentYear} KindreD Role Play. {t('allRightsReserved')}.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-kindred-primary/10 rounded-full flex items-center justify-center text-kindred-accent hover:bg-kindred-primary/20 transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
