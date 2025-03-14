
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { HowToPlay } from "@/components/HowToPlay";
import { FeatureSection } from "@/components/FeatureSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const IndexContent = () => {
  const { theme, direction } = useLanguage();
  
  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach(el => observer.observe(el));
    
    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div 
      className={`min-h-screen text-white transition-colors duration-300 ${theme === 'light' ? 'light-mode' : ''} overflow-hidden`}
      dir={direction}
    >
      <Navbar />
      <Hero />
      <AboutSection />
      <HowToPlay />
      <FeatureSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
