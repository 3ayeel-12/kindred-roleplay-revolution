
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ServerInfo } from "@/lib/samp-api";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlayerStatsProps {
  serverInfo: ServerInfo;
}

export function PlayerStats({ serverInfo }: PlayerStatsProps) {
  const { theme } = useLanguage();
  
  // Calculate player percentage
  const playerPercentage = serverInfo.isOnline && serverInfo.maxplayers 
    ? (serverInfo.players! / serverInfo.maxplayers) * 100 
    : 0;
    
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-kindred-accent" />
          <span className={`text-sm font-medium ${theme === 'light' ? 'text-kindred-dark' : 'text-white'}`}>
            Players Online
          </span>
        </div>
        <span className="text-kindred-highlight font-bold">
          {serverInfo.players} / {serverInfo.maxplayers}
        </span>
      </div>
      <Progress value={playerPercentage} className={`h-2 ${theme === 'light' ? 'bg-gray-200' : 'bg-kindred-darker/80'}`}>
        <div className="h-full bg-gradient-to-r from-kindred-accent to-kindred-highlight" style={{ width: `${playerPercentage}%` }} />
      </Progress>
    </motion.div>
  );
}
