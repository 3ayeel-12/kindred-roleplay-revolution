
import { motion } from "framer-motion";
import { Sparkles, Gamepad, Map, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServerInfo } from "@/lib/samp-api";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ServerHeaderProps {
  serverInfo: ServerInfo;
  lastUpdated: Date | null;
}

export function ServerHeader({ serverInfo, lastUpdated }: ServerHeaderProps) {
  const { theme } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex-1">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className={theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'} />
          <h2 className={cn(
            "text-xl font-display font-bold",
            theme === 'light' ? 'text-kindred-primary glow-text' : 'text-kindred-highlight glow-text'
          )}>
            {serverInfo.hostname || "KindreD GTA SAMP Server"}
          </h2>
          <Badge variant="outline" className={cn(
            "font-medium",
            theme === 'light' 
              ? 'bg-green-500/10 text-green-700 border-green-600/30' 
              : 'bg-green-500/20 text-green-400 border-green-500/30'
          )}>
            ONLINE
          </Badge>
        </motion.div>
        <p className={cn(
          "text-sm mt-1",
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        )}>
          IP: 91.121.237.128:1958
          {lastUpdated && (
            <span className={cn(
              "ml-2 text-xs",
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            )}>
              (Last updated: {lastUpdated.toLocaleTimeString()})
            </span>
          )}
        </p>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-3"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Badge variant="outline" className={cn(
          "flex items-center gap-1",
          theme === 'light' 
            ? 'bg-kindred-primary/10 border-kindred-primary/30 text-kindred-primary' 
            : 'bg-kindred-primary/20 border-kindred-primary/30 text-kindred-accent'
        )}>
          <Gamepad size={14} />
          {serverInfo.gamemode || "Roleplay"}
        </Badge>
        
        <Badge variant="outline" className={cn(
          "flex items-center gap-1",
          theme === 'light' 
            ? 'bg-kindred-secondary/10 border-kindred-secondary/30 text-kindred-secondary' 
            : 'bg-kindred-secondary/20 border-kindred-secondary/30 text-kindred-secondary'
        )}>
          <Map size={14} />
          {serverInfo.mapname || "San Andreas"}
        </Badge>
        
        <Badge variant="outline" className={cn(
          "flex items-center gap-1",
          theme === 'light' 
            ? 'bg-kindred-accent/10 border-kindred-accent/30 text-kindred-dark' 
            : 'bg-kindred-accent/20 border-kindred-accent/30 text-kindred-accent'
        )}>
          <Clock size={14} />
          {serverInfo.worldtime || "10:00"}
        </Badge>
        
        {serverInfo.passworded && (
          <Badge variant="outline" className={cn(
            "flex items-center gap-1",
            theme === 'light' 
              ? 'bg-kindred-orange/10 border-kindred-orange/30 text-kindred-orange' 
              : 'bg-kindred-orange/20 border-kindred-orange/30 text-kindred-orange'
          )}>
            <Shield size={14} />
            Password Protected
          </Badge>
        )}
      </motion.div>
    </div>
  );
}
