
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { HowToPlay } from "@/components/HowToPlay";
import { FeatureSection } from "@/components/FeatureSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white overflow-hidden">
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

export default Index;
