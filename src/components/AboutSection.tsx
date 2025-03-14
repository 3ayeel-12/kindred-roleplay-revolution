
import { Play } from "lucide-react";
import { useState } from "react";

export function AboutSection() {
  const [activeImage, setActiveImage] = useState(0);
  
  const gtaImages = [
    "/lovable-uploads/6245ce6f-3ebb-4fe1-9d2d-9e74569dc0cd.png",
    "/lovable-uploads/96e43fb8-bb29-428f-859e-1eb7be925dc7.png",
    "/lovable-uploads/0fcf2d2d-a0cd-459e-8a64-4dfcfc2a0d29.png",
    "/lovable-uploads/fad85541-f410-4c51-b858-d5c293c3a2b4.png"
  ];

  return (
    <section id="about" className="py-20 bg-kindred-darker/95 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url('${gtaImages[2]}')` }}
        ></div>
        <div className="absolute inset-0 bg-kindred-darker/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 drop-shadow-glow">
          <span className="text-kindred-accent">ABOUT</span> US
        </h2>
        
        <div className="relative rounded-xl overflow-hidden mx-auto max-w-4xl glass-card p-1">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${gtaImages[activeImage]}')` }}
            ></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-kindred-accent/90 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <Play size={32} className="text-kindred-darker ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {gtaImages.map((img, index) => (
            <div 
              key={index} 
              className="glass-card p-1 aspect-video relative overflow-hidden group cursor-pointer"
              onClick={() => setActiveImage(index)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${img}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-kindred-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {activeImage === index && (
                <div className="absolute inset-0 border-2 border-kindred-accent rounded-lg z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
