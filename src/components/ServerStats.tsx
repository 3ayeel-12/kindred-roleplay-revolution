
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { fetchServerInfo, ServerInfo } from "@/lib/samp-api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Users, Clock, Map, Gamepad, Morocco, Shield, Server } from "lucide-react";
import { motion } from "framer-motion";

// Morocco regions with corresponding player counts (simulated)
const moroccoRegions = [
  { region: "CASABLANCA", players: 143, code: "MA-CAS" },
  { region: "RABAT", players: 89, code: "MA-RAB" },
  { region: "MARRAKECH", players: 76, code: "MA-MAR" },
  { region: "FEZ", players: 54, code: "MA-FEZ" },
  { region: "TANGIER", players: 48, code: "MA-TAN" },
];

const ServerStats = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({ isOnline: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServerInfo = async () => {
      try {
        setLoading(true);
        const info = await fetchServerInfo();
        setServerInfo(info);
      } catch (err) {
        setError("Failed to connect to server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    getServerInfo();

    // Set up interval for real-time updates
    const interval = setInterval(getServerInfo, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Calculate player percentage
  const playerPercentage = serverInfo.isOnline && serverInfo.maxplayers 
    ? (serverInfo.players! / serverInfo.maxplayers) * 100 
    : 0;

  return (
    <div className="w-full animate-fade-in">
      <motion.div 
        className="sa-card p-6 mb-8 border-2 border-kindred-orange/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Server className="animate-pulse mr-2 text-kindred-highlight" />
            <span className="text-kindred-highlight font-semibold">Loading server status...</span>
          </div>
        ) : serverInfo.isOnline ? (
          <>
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
                <p className="text-sm text-gray-400 mt-1">
                  IP: 91.121.237.128:1958
                </p>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge variant="outline" className="bg-kindred-primary/20 border-kindred-primary/30 flex items-center gap-1">
                  <Gamepad size={14} />
                  {serverInfo.gamemode || "Roleplay"}
                </Badge>
                <Badge variant="outline" className="bg-kindred-secondary/20 border-kindred-secondary/30 flex items-center gap-1">
                  <Map size={14} />
                  {serverInfo.mapname || "San Andreas"}
                </Badge>
                <Badge variant="outline" className="bg-kindred-accent/20 border-kindred-accent/30 flex items-center gap-1">
                  <Clock size={14} />
                  {serverInfo.worldtime || "10:00"}
                </Badge>
                {serverInfo.passworded && (
                  <Badge variant="outline" className="bg-kindred-orange/20 border-kindred-orange/30 flex items-center gap-1">
                    <Shield size={14} />
                    Password Protected
                  </Badge>
                )}
              </motion.div>
            </div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-kindred-accent" />
                  <span className="text-sm font-medium">
                    Players Online
                  </span>
                </div>
                <span className="text-kindred-highlight font-bold">
                  {serverInfo.players} / {serverInfo.maxplayers}
                </span>
              </div>
              <Progress value={playerPercentage} className="h-2" />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="col-span-1 md:col-span-5"
              >
                <Card className="bg-gradient-to-r from-kindred-orange/20 to-kindred-highlight/10 border-kindred-orange/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Morocco className="text-kindred-highlight" />
                        <CardTitle className="text-base">Morocco Player Distribution</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-kindred-highlight/10 text-kindred-highlight border-kindred-highlight/20">
                        {serverInfo.language || "Arabic/French"}
                      </Badge>
                    </div>
                    <CardDescription>
                      Player distribution across different regions of Morocco
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {moroccoRegions.map((region, index) => (
                        <motion.div
                          key={region.region}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex flex-col items-center p-3 rounded-lg bg-black/30 border border-kindred-highlight/10"
                        >
                          <span className="text-xl font-bold text-kindred-highlight">
                            {region.players}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            {region.region}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Server className="text-red-500 mb-2" size={32} />
            <h3 className="text-lg font-bold text-red-500">Server Offline</h3>
            <p className="text-gray-400 max-w-md mt-2">
              The server at 91.121.237.128:1958 is currently offline or not responding. Please check back later.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ServerStats;
