
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { HowToPlay } from "@/components/HowToPlay";
import { FeatureSection } from "@/components/FeatureSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-kindred-darkest text-white overflow-hidden">
        <Navbar />
        <Hero />
        <AboutSection />
        <HowToPlay />
        <FeatureSection />
        <CommunitySection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
