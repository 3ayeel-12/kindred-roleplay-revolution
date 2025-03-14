
import { Building, Briefcase, Car, Users, Money, Gun } from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "CREATE YOUR AUTOPARK",
    description: "FIND YOUR OWN STYLE",
    icon: Car,
    color: "text-kindred-accent bg-kindred-accent/10"
  },
  {
    title: "GET AHEAD OF THE RESIDENTS",
    description: "IMPROVE SKILLS AND MORE THAN $10.000",
    icon: Money,
    color: "text-kindred-secondary bg-kindred-secondary/10"
  },
  {
    title: "BECOME A GANGSTER",
    description: "WORK HARD ON THE DARK SIDE OF SAMP",
    icon: Gun,
    color: "text-kindred-primary bg-kindred-primary/10"
  },
  {
    title: "MANAGE A BUSINESS",
    description: "PRODUCE DIFFERENT SUPPLIES",
    icon: Briefcase,
    color: "text-green-500 bg-green-500/10"
  }
];

export function FeatureSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  return (
    <section id="features" className="py-20 bg-kindred-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/lovable-uploads/31674479-6469-4909-a1c9-986643d69ef6.png')" }}
        ></div>
        <div className="absolute inset-0 bg-kindred-dark/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card flex items-start gap-4 hover:translate-y-[-3px] transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`p-3 rounded-lg ${feature.color} transition-all duration-300 ${hoveredFeature === index ? 'scale-110' : ''}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{feature.title}</h3>
                  <p className="text-kindred-light text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card overflow-hidden group relative">
            <div 
              className="w-full h-full bg-cover bg-center aspect-square md:aspect-auto md:min-h-[500px] transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/lovable-uploads/fad85541-f410-4c51-b858-d5c293c3a2b4.png')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-kindred-darkest via-transparent to-transparent opacity-40"></div>
          </div>
        </div>
        
        <div className="mt-16 glass-card p-8 hover:shadow-lg hover:border-kindred-accent/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div 
              className="w-full h-full bg-cover bg-center blur-sm"
              style={{ backgroundImage: "url('/lovable-uploads/3cb2cca7-a342-487a-bcf1-a14f8fa95aff.png')" }}
            ></div>
            <div className="absolute inset-0 bg-kindred-darker/80"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                PLAY RIGHT NOW <span className="text-kindred-accent">USING THE PROMO CODE</span>
              </h3>
              <div className="text-4xl font-display font-bold text-white mb-4">
                <span className="text-kindred-accent animate-pulse">KINDRED2023</span>
              </div>
              <h4 className="text-3xl font-display font-bold">
                GET <span className="text-kindred-accent">$25 000</span>
              </h4>
            </div>
            
            <div className="flex-shrink-0">
              <button className="btn-accent relative overflow-hidden group">
                <span className="relative z-10">START PLAYING</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
