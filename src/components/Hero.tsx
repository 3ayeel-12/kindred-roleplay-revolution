
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import ServerStats from "./ServerStats";

export function Hero() {
  return (
    <section className="hero-container w-full min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-game"></div>
        {/* We'll replace this with a real image later */}
        <div 
          className="w-full h-full bg-center bg-cover opacity-70"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80')",
            backgroundPosition: "center 20%"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 animate-fade-in">
            <span className="text-gaming-primary glow-text">GTA SAMP</span> INTERNATIONAL
            <br />ROLE PLAY SERVERS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in opacity-90">
            WE HAVE BEEN MAKING MOMENTS IN GTA FOR YOU SINCE MORE THAN TEN YEARS
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
            <Button className="btn-primary group">
              START PLAYING
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            
            <Button variant="outline" className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 flex items-center gap-2">
              <Play size={16} className="text-gaming-primary" />
              WATCH TRAILER
            </Button>
          </div>
        </div>
        
        <ServerStats />
      </div>
    </section>
  );
}
