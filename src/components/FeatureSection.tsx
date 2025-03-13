
import { Building, Briefcase, Bomb, Car } from "lucide-react";

const features = [
  {
    title: "CREATE YOUR AUTOPARK",
    description: "FIND YOUR OWN STYLE",
    icon: Car,
    color: "text-gaming-primary bg-gaming-primary/10"
  },
  {
    title: "GET AHEAD OF THE RESIDENTS",
    description: "IMPROVE SKILLS AND MORE THAN $10.000",
    icon: Bomb,
    color: "text-gaming-accent bg-gaming-accent/10"
  },
  {
    title: "BECOME A GANGSTER",
    description: "WORK HARD ON THE DARK SIDE OF SAMP",
    icon: Bomb,
    color: "text-gaming-secondary bg-gaming-secondary/10"
  },
  {
    title: "MANAGE A BUSINESS",
    description: "PRODUCE DIFFERENT SUPPLIES",
    icon: Briefcase,
    color: "text-green-500 bg-green-500/10"
  }
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card flex items-start gap-4">
                <div className={`p-3 rounded-lg ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center aspect-square md:aspect-auto md:min-h-[500px]"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80')" }}
            ></div>
          </div>
        </div>
        
        <div className="mt-16 glass-card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                PLAY RIGHT NOW <span className="text-gaming-primary">USING THE PROMO CODE</span>
              </h3>
              <div className="text-4xl font-display font-bold text-white mb-4">
                <span className="text-gaming-primary">GRANDNOW</span>
              </div>
              <h4 className="text-3xl font-display font-bold">
                GET <span className="text-gaming-primary">$25 000</span>
              </h4>
            </div>
            
            <div className="flex-shrink-0">
              <button className="btn-primary">
                START PLAYING
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
