
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ServerInfo } from "@/lib/samp-api";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

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
          <Users size={18} className={theme === 'light' ? 'text-kindred-primary' : 'text-kindred-accent'} />
          <span className={cn(
            "text-sm font-medium",
            theme === 'light' ? 'text-kindred-dark' : 'text-white/90'
          )}>
            Players Online
          </span>
        </div>
        <span className={cn(
          "font-bold",
          theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'
        )}>
          {serverInfo.players} / {serverInfo.maxplayers}
        </span>
      </div>
      
      <div className={cn(
        "relative h-2 overflow-hidden rounded-full",
        theme === 'light' ? 'bg-gray-200' : 'bg-kindred-darker/80'
      )}>
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300",
            theme === 'light' 
              ? 'bg-gradient-to-r from-kindred-primary to-kindred-secondary' 
              : 'bg-gradient-to-r from-kindred-accent to-kindred-highlight'
          )} 
          style={{ width: `${playerPercentage}%` }} 
        />
      </div>
    </motion.div>
  );
}
