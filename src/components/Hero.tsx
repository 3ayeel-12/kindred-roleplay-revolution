
import { Button } from "@/components/ui/button";
import { Play, ChevronDown } from "lucide-react";
import ServerStats from "./ServerStats";

export function Hero() {
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
        {/* We'll replace this with a real image later */}
        <div 
          className="w-full h-full bg-center bg-cover opacity-70"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80')",
            backgroundPosition: "center 20%"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        <div className="flex justify-center mb-8">
          <img 
            src="/kindred-logo.png" 
            alt="KindreD Logo" 
            className="h-32 w-auto animate-pulse-slow"
          />
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 animate-fade-in">
            <span className="text-kindred-accent glow-text">GTA SAMP</span> INTERNATIONAL
            <br />ROLE PLAY SERVERS
          </h1>
          <p className="text-xl md:text-2xl text-kindred-light mb-10 max-w-2xl mx-auto animate-fade-in opacity-90">
            WE HAVE BEEN MAKING MOMENTS IN GTA FOR YOU SINCE MORE THAN TEN YEARS
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
            <Button className="btn-accent group">
              START PLAYING
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            
            <Button variant="outline" className="bg-transparent border border-kindred-accent/30 text-white hover:bg-kindred-accent/10 hover:border-kindred-accent/50 flex items-center gap-2">
              <Play size={16} className="text-kindred-accent" />
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
