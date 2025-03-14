
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import ServerStats from "./ServerStats";
import { useEffect, useState } from "react";

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const backgrounds = [
    "/lovable-uploads/fad85541-f410-4c51-b858-d5c293c3a2b4.png",
    "/lovable-uploads/3cb2cca7-a342-487a-bcf1-a14f8fa95aff.png",
    "/lovable-uploads/31674479-6469-4909-a1c9-986643d69ef6.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-container w-full min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-game"></div>
        {backgrounds.map((bg, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ${activeSlide === index ? 'opacity-60' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${bg}')` }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/d5ced8f3-15d4-498c-ba38-4b75645c0bad.png" 
            alt="KindreD Logo" 
            className="h-32 w-auto animate-pulse-slow relative z-10 drop-shadow-glow"
          />
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 animate-fade-in drop-shadow-glow">
            <span className="text-kindred-accent glow-text">GTA SAMP</span> INTERNATIONAL
            <br />ROLE PLAY SERVERS
          </h1>
          <p className="text-xl md:text-2xl text-kindred-light mb-10 max-w-2xl mx-auto animate-fade-in opacity-90 drop-shadow-md">
            WE HAVE BEEN MAKING MOMENTS IN GTA FOR YOU SINCE MORE THAN TEN YEARS
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
            <Button className="btn-accent group relative overflow-hidden">
              <span className="relative z-10">START PLAYING</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform relative z-10">→</span>
            </Button>
            
            <Button variant="outline" className="bg-transparent border border-kindred-accent/30 text-white hover:bg-kindred-accent/10 hover:border-kindred-accent/50 flex items-center gap-2 group">
              <Play size={16} className="text-kindred-accent group-hover:animate-pulse" />
              WATCH TRAILER
            </Button>
          </div>
        </div>
        
        <ServerStats />
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToAbout}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-kindred-primary/20 hover:bg-kindred-primary/30 transition-colors"
          >
            <ChevronDown className="text-kindred-accent" />
          </button>
        </div>
      </div>
    </section>
  );
}
