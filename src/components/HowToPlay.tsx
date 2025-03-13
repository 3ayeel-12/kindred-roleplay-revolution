
import { Button } from "@/components/ui/button";
import { Download, User, ArrowRight } from "lucide-react";

export function HowToPlay() {
  return (
    <section id="how-to-play" className="py-20 bg-gradient-to-b from-black/95 to-gaming-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
          HOW TO START <span className="text-gaming-primary">PLAYING</span>
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          <Button variant="link" className="text-gaming-secondary">
            HOW TO SETUP FOR 5 MINUTES →
          </Button>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 relative overflow-hidden transition-all">
            <div className="absolute top-4 left-4 bg-gaming-primary text-gaming-dark text-xs font-bold px-2 py-1 rounded">
              STEP 01
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-4 text-gaming-primary">
                REGISTER AN ACCOUNT
              </h3>
              
              <p className="text-gray-300 mb-6">
                Social, Email, SMS & Extended GTA Samp access to our lively role play server. You'll need to register first.
              </p>
              
              <Button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-0">
                <User size={16} />
                REGISTRATION
              </Button>
            </div>
          </div>
          
          <div className="glass-card p-8 relative overflow-hidden transition-all">
            <div className="absolute top-4 left-4 bg-gaming-secondary text-white text-xs font-bold px-2 py-1 rounded">
              STEP 02
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-4 text-gaming-secondary">
                DOWNLOAD THE LAUNCHER
              </h3>
              
              <p className="text-gray-300 mb-6">
                Download our custom launcher to get the best possible gaming experience with GTA SAMP.
              </p>
              
              <Button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-0">
                <Download size={16} />
                DOWNLOAD
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 mb-20">
          <h3 className="text-2xl font-display font-bold mb-8 text-white">
            THAT'S ALL! ENJOY THE GAME!
          </h3>
        </div>
        
        <div className="glass-card p-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-display font-bold mb-8 text-center text-gaming-primary">
            CHOOSE YOUR CAR AFTER REGISTRATION
            <span className="block text-white text-lg mt-2">ON THE 3RD LEVEL</span>
          </h3>
          
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  {/* Replace with actual car images */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80')` }}
                  ></div>
                  <div className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                    $25K
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
