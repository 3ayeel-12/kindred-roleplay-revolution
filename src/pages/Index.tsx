
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { HowToPlay } from "@/components/HowToPlay";
import { FeatureSection } from "@/components/FeatureSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const IndexContent = () => {
  const { theme } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-kindred-darkest text-white ${theme === 'light' ? 'light-mode' : ''} overflow-hidden`}>
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
