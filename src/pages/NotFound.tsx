
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft } from "lucide-react";

const NotFoundContent = () => {
  const location = useLocation();
  const { theme, t, direction } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-kindred-darkest text-white ${theme === 'light' ? 'light-mode' : ''}`}>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black/40 light-mode:bg-black/10 px-4">
        <div className="text-center glass-card p-12 max-w-lg mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-kindred-accent animate-pulse-glow glow-text">404</h1>
          <p className="text-xl text-gray-300 light-mode:text-gray-700 mb-8 animate-slide-down" style={{ animationDelay: '200ms' }}>
            {t('notFound')}
          </p>
          <Button className="btn-primary flex items-center gap-2 animate-slide-down mx-auto" style={{ animationDelay: '400ms' }} asChild>
            <Link to="/">
              {direction === 'ltr' ? <ChevronLeft className="h-4 w-4" /> : null}
              {t('backToHome')}
              {direction === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : null}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const NotFound = () => {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
};

export default NotFound;
