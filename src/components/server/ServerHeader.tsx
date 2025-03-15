
import { motion } from "framer-motion";
import { Sparkles, Gamepad, Map, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServerInfo } from "@/lib/samp-api";
import { useLanguage } from "@/contexts/LanguageContext";

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
          <Sparkles className="text-kindred-highlight" />
          <h2 className="text-xl font-display text-kindred-highlight font-bold">
            {serverInfo.hostname || "KindreD GTA SAMP Server"}
          </h2>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            ONLINE
          </Badge>
        </motion.div>
        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
          IP: 91.121.237.128:1958
          {lastUpdated && (
            <span className={`ml-2 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
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
        <Badge variant="outline" className={`${theme === 'light' ? 'bg-kindred-primary/10' : 'bg-kindred-primary/20'} border-kindred-primary/30 flex items-center gap-1`}>
          <Gamepad size={14} />
          {serverInfo.gamemode || "Roleplay"}
        </Badge>
        <Badge variant="outline" className={`${theme === 'light' ? 'bg-kindred-secondary/10' : 'bg-kindred-secondary/20'} border-kindred-secondary/30 flex items-center gap-1`}>
          <Map size={14} />
          {serverInfo.mapname || "San Andreas"}
        </Badge>
        <Badge variant="outline" className={`${theme === 'light' ? 'bg-kindred-accent/10' : 'bg-kindred-accent/20'} border-kindred-accent/30 flex items-center gap-1`}>
          <Clock size={14} />
          {serverInfo.worldtime || "10:00"}
        </Badge>
        {serverInfo.passworded && (
          <Badge variant="outline" className={`${theme === 'light' ? 'bg-kindred-orange/10' : 'bg-kindred-orange/20'} border-kindred-orange/30 flex items-center gap-1`}>
            <Shield size={14} />
            Password Protected
          </Badge>
        )}
      </motion.div>
    </div>
  );
}
