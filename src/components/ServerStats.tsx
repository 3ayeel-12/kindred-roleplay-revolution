
import { cn } from "@/lib/utils";

const serverStats = [
  { region: "EUROPE", players: 789, flag: "🇪🇺" },
  { region: "NORTH AMERICA", players: 562, flag: "🇺🇸" },
  { region: "ASIA", players: 453, flag: "🇯🇵" },
  { region: "OCEANIA", players: 294, flag: "🇦🇺" },
  { region: "SOUTH AMERICA", players: 197, flag: "🇧🇷" },
];

const countryStats = [
  { country: "GERMANY", players: 209, code: "DE" },
  { country: "RUSSIA", players: 178, code: "RU" },
  { country: "USA", players: 154, code: "US" },
  { country: "BRAZIL", players: 87, code: "BR" },
  { country: "FRANCE", players: 67, code: "FR" },
];

const ServerStats = () => {
  return (
    <div className="w-full animate-fade-in">
      <div className="glass-card p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {serverStats.map((stat, index) => (
            <div key={stat.region} className={cn(
              "server-stat", 
              index < serverStats.length - 1 && "border-r border-white/10"
            )}>
              <span className="server-stat-value">{stat.players}</span>
              <span className="server-stat-label">{stat.region}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {countryStats.map((stat, index) => (
            <div 
              key={stat.country} 
              className="flex items-center gap-2 justify-center"
            >
              <span className="w-6 h-6 flex items-center justify-center text-sm font-medium bg-gray-800 rounded">
                {stat.players}
              </span>
              <span className="text-xs text-gray-400">{stat.country}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerStats;
