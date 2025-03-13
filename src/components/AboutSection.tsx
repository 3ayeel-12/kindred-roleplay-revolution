
import { Play } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-kindred-darker/95">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">
          <span className="text-kindred-accent">ABOUT</span> US
        </h2>
        
        <div className="relative rounded-xl overflow-hidden mx-auto max-w-4xl glass-card p-1">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {/* Replace with actual video thumbnail */}
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=2000&q=80')" 
              }}
            ></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-kindred-accent/90 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <Play size={32} className="text-kindred-darker ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="glass-card p-1 aspect-video relative overflow-hidden group">
              {/* Replace with actual images */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=500&q=60')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-kindred-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[5, 6, 7, 8].map((item) => (
            <div key={item} className="glass-card p-1 aspect-video relative overflow-hidden group">
              {/* Replace with actual images */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=500&q=60')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-kindred-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
