
import { cn } from "@/lib/utils";

const socialPlatforms = [
  {
    name: "YouTube",
    subscribers: "20,000+",
    color: "from-red-600 to-red-700",
    textColor: "text-white",
    icon: "YouTube"
  },
  {
    name: "Discord",
    subscribers: "200,000+",
    color: "from-blue-600 to-blue-700",
    textColor: "text-white",
    icon: "Discord"
  },
  {
    name: "TikTok",
    subscribers: "11,000+",
    color: "from-gray-800 to-black",
    textColor: "text-white",
    icon: "TikTok"
  },
  {
    name: "Instagram",
    subscribers: "4,000+",
    color: "from-purple-600 to-pink-600",
    textColor: "text-white",
    icon: "Instagram"
  }
];

export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-black to-gaming-dark/90">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {socialPlatforms.map((platform, index) => (
            <div 
              key={index} 
              className={cn(
                "social-card bg-gradient-to-r",
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
      </div>
    </section>
  );
}
