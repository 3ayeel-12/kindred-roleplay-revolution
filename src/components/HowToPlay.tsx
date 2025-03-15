
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Laptop, ArrowRight } from "lucide-react";

export function HowToPlay() {
  return (
    <section id="how-to-play" className="py-20 bg-gradient-to-b from-kindred-darker to-kindred-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
          HOW TO START <span className="text-kindred-accent">PLAYING</span>
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          <span className="text-kindred-secondary font-medium">
            A simple 4-step guide to install SA-MP on both PC and Mobile
          </span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mobile Installation */}
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-secondary text-kindred-darker text-xs font-bold px-2 py-1 rounded">
              MOBILE
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-6 text-kindred-secondary flex items-center gap-2">
                <Smartphone size={24} />
                INSTALL ON ANDROID
              </h3>
              
              <ol className="space-y-4 text-left">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mr-3 mt-0.5">1</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Download SA-MP Mobile Launcher</span>
                    <p className="text-sm text-gray-400 mt-1">Search for "SA-MP Launcher" in Play Store</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mr-3 mt-0.5">2</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Install GTA: San Andreas APK + Data</span>
                    <p className="text-sm text-gray-400 mt-1">Find a legal copy or use your existing one</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mr-3 mt-0.5">3</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Open the SA-MP Launcher</span>
                    <p className="text-sm text-gray-400 mt-1">Enter server IP: <span className="text-kindred-accent">91.121.237.128:1958</span></p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-secondary/20 text-kindred-secondary font-bold text-xs mr-3 mt-0.5">4</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Connect & Play</span>
                    <p className="text-sm text-gray-400 mt-1">Customize your name, hit Join, and start roleplaying!</p>
                  </div>
                </li>
              </ol>
              
              <Button className="flex items-center gap-2 bg-kindred-secondary hover:bg-kindred-secondary/90 text-white border-0 mt-6">
                <Download size={16} />
                DOWNLOAD LAUNCHER
              </Button>
            </div>
          </div>
          
          {/* PC Installation */}
          <div className="glass-card p-8 relative overflow-hidden transition-all hover:translate-y-[-5px]">
            <div className="absolute top-4 left-4 bg-kindred-accent text-kindred-darker text-xs font-bold px-2 py-1 rounded">
              PC
            </div>
            
            <div className="pt-10">
              <h3 className="text-2xl font-display font-bold mb-6 text-kindred-accent flex items-center gap-2">
                <Laptop size={24} />
                INSTALL ON PC
              </h3>
              
              <ol className="space-y-4 text-left">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mr-3 mt-0.5">1</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Download & Install GTA: San Andreas</span>
                    <p className="text-sm text-gray-400 mt-1">Make sure you have the original game, not the Definitive Edition!</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mr-3 mt-0.5">2</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Download SA-MP Client</span>
                    <p className="text-sm text-gray-400 mt-1">Get it from <a href="https://www.sa-mp.com/download.php" target="_blank" rel="noopener noreferrer" className="text-kindred-accent hover:underline">sa-mp.com</a></p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mr-3 mt-0.5">3</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Install SA-MP</span>
                    <p className="text-sm text-gray-400 mt-1">Install in your GTA: San Andreas directory</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-kindred-accent/20 text-kindred-accent font-bold text-xs mr-3 mt-0.5">4</span>
                  <div>
                    <span className="font-semibold text-kindred-light">Launch SA-MP</span>
                    <p className="text-sm text-gray-400 mt-1">Add our server IP: <span className="text-kindred-accent">91.121.237.128:1958</span> and start playing!</p>
                  </div>
                </li>
              </ol>
              
              <Button className="flex items-center gap-2 bg-kindred-accent hover:bg-kindred-accent/90 text-kindred-darker border-0 mt-6">
                <Download size={16} />
                DOWNLOAD SA-MP
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <h3 className="text-2xl font-display font-bold mb-4 text-white">
            🔥 Now you're ready to dive into SA-MP and start your roleplay journey! 🔥
          </h3>
        </div>
      </div>
    </section>
  );
}
