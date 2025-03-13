
import { Button } from "@/components/ui/button";
import { Download, User, ArrowRight } from "lucide-react";

export function HowToPlay() {
  return (
    <section id="how-to-play" className="py-20 bg-gradient-to-b from-kindred-darker to-kindred-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
          HOW TO START <span className="text-kindred-accent">PLAYING</span>
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          <Button variant="link" className="text-kindred-secondary hover:text-kindred-accent transition-colors">
            HOW TO SETUP FOR 5 MINUTES →
          </Button>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-accent text-kindred-darker text-xs font-bold px-2 py-1 rounded">
              STEP 01
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-4 text-kindred-accent">
                REGISTER AN ACCOUNT
              </h3>
              
              <p className="text-kindred-light mb-6">
                Social, Email, SMS & Extended GTA Samp access to our lively role play server. You'll need to register first.
              </p>
              
              <Button className="flex items-center gap-2 bg-kindred-primary hover:bg-kindred-primary/90 text-white border-0">
                <User size={16} />
                REGISTRATION
              </Button>
            </div>
          </div>
          
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-secondary text-white text-xs font-bold px-2 py-1 rounded">
              STEP 02
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-4 text-kindred-secondary">
                DOWNLOAD THE LAUNCHER
              </h3>
              
              <p className="text-kindred-light mb-6">
                Download our custom launcher to get the best possible gaming experience with GTA SAMP.
              </p>
              
              <Button className="flex items-center gap-2 bg-kindred-secondary hover:bg-kindred-secondary/90 text-white border-0">
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
        
        <div className="glass-card p-8 max-w-5xl mx-auto hover:shadow-xl transition-all duration-300">
          <h3 className="text-2xl font-display font-bold mb-8 text-center text-kindred-accent">
            CHOOSE YOUR CAR AFTER REGISTRATION
            <span className="block text-white text-lg mt-2">ON THE 3RD LEVEL</span>
          </h3>
          
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  {/* Replace with actual car images */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-kindred-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 text-xs font-bold bg-kindred-primary/70 backdrop-blur-sm px-2 py-1 rounded">
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
