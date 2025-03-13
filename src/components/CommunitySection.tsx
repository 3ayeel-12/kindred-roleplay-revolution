
import { cn } from "@/lib/utils";

const socialPlatforms = [
  {
    name: "YouTube",
    subscribers: "20,000+",
    color: "from-kindred-primary to-kindred-secondary",
    textColor: "text-white",
    icon: "YouTube"
  },
  {
    name: "Discord",
    subscribers: "200,000+",
    color: "from-kindred-secondary to-kindred-accent",
    textColor: "text-kindred-darker",
    icon: "Discord"
  },
  {
    name: "TikTok",
    subscribers: "11,000+",
    color: "from-kindred-accent to-kindred-light",
    textColor: "text-kindred-darker",
    icon: "TikTok"
  },
  {
    name: "Instagram",
    subscribers: "4,000+",
    color: "from-kindred-dark to-kindred-primary",
    textColor: "text-white",
    icon: "Instagram"
  }
];

export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-kindred-dark to-kindred-darker">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">
          JOIN OUR <span className="text-kindred-accent">COMMUNITY</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <div 
              key={index} 
              className={cn(
                "social-card bg-gradient-to-r hover:shadow-lg",
                platform.color
              )}
            >
              <div className="flex flex-1 items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className={platform.textColor}>{platform.icon}</span>
                  </div>
                  <div>
                    <h3 className={cn("text-xl font-display font-bold", platform.textColor)}>
                      {platform.name}
                    </h3>
                    <p className="text-white/80 text-sm">{platform.subscribers} SUBSCRIBERS</p>
                  </div>
                </div>
                <div>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <span className={platform.textColor}>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass-card p-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-4 text-kindred-accent">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="text-kindred-light mb-6 max-w-2xl mx-auto">
              Stay updated with the latest events, updates, and community highlights from the KindreD Role Play servers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md bg-kindred-dark border border-kindred-primary/30 text-white focus:outline-none focus:border-kindred-accent/50"
              />
              <button className="btn-accent">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
