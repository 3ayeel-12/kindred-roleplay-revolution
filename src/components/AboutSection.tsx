
import { Play } from "lucide-react";
import { useState } from "react";

export function AboutSection() {
  const [showVideo, setShowVideo] = useState(false);
  
  const featuredImage = "/lovable-uploads/6245ce6f-3ebb-4fe1-9d2d-9e74569dc0cd.png";

  return (
    <section id="about" className="py-20 bg-kindred-darker/95 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${featuredImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-kindred-darker/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 drop-shadow-glow">
          <span className="text-kindred-accent">ABOUT</span> US
        </h2>
        
        <div className="max-w-4xl mx-auto mb-12 text-center animate-on-scroll">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-kindred-highlight mb-6">
            Kindred Community <span className="text-kindred-accent">[Roleplay & Chill]</span> 🎭🔥
          </h3>
          
          <p className="text-lg mb-6 text-gray-300">
            Step into a world where <span className="text-kindred-accent font-semibold">roleplay meets ultimate relaxation</span>! 
            Whether you're on <span className="text-kindred-highlight font-semibold">PC or mobile (Tqasar Tele)</span>, 
            you're always part of an immersive <span className="text-kindred-accent font-semibold">SA-MP experience</span>—no stress, 
            just <span className="text-kindred-highlight font-semibold">pure fun and community vibes</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className="text-kindred-highlight text-xl font-display font-bold mb-4">🚀 Why Join Us?</h4>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">💎</span>
                  <span><span className="font-semibold">Fair Play, No Abuse</span> – Balanced & enjoyable gameplay</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">👑</span>
                  <span><span className="font-semibold">Elite Admins</span> – Supportive, active, and always here for you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">🎖</span>
                  <span><span className="font-semibold">Legendary Players</span> – A strong community of skilled roleplayers</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className="text-kindred-highlight text-xl font-display font-bold mb-4">🎭 Roleplay & Activities</h4>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">✅</span>
                  <span><span className="font-semibold">No "Play to Win"</span>—it's all about the experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">🎉</span>
                  <span><span className="font-semibold">Epic Weekly Events</span> to keep the fun rolling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kindred-accent mr-2">🏆</span>
                  <span><span className="font-semibold">One-of-a-Kind Arena Battles</span> every two days—no issues, just action</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h4 className="text-kindred-highlight text-xl font-display font-bold mb-4">🔥 Join Today!</h4>
              <p className="text-center mb-4">Experience SA-MP like never before with our vibrant community!</p>
              <div className="flex justify-center">
                <button className="sa-button transform transition hover:scale-105">
                  JOIN SERVER
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-xl font-semibold text-kindred-accent">
            🔥 Join Kindred Community today and experience SA-MP like never before! 🔥
          </p>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mx-auto max-w-3xl glass-card p-1 mb-12">
          {showVideo ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/itmQpfy5w_k?autoplay=1&start=66" 
                title="KindreD Community GTA SAMP Gameplay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${featuredImage}')` }}
              ></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="w-16 h-16 bg-kindred-accent/90 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Play size={32} className="text-kindred-darker ml-1" />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-4 text-xs text-white bg-black/60 px-3 py-1 rounded-full">
                Video by: KindreD Community
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
