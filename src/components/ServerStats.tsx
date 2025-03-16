import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetchServerInfo, ServerInfo } from "@/lib/samp-api";
import { useLanguage } from "@/contexts/LanguageContext";
import { ServerHeader } from "./server/ServerHeader";
import { PlayerStats } from "./server/PlayerStats";
import { MoroccoRegionStats } from "./server/MoroccoRegionStats";
import { ServerOffline } from "./server/ServerOffline";
import { ServerLoading } from "./server/ServerLoading";
const ServerStats = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    isOnline: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const {
    theme
  } = useLanguage();
  useEffect(() => {
    const getServerInfo = async () => {
      try {
        setLoading(true);
        const info = await fetchServerInfo();
        setServerInfo(info);
        setLastUpdated(new Date());
        if (info.isOnline) {
          toast.success("Server data refreshed", {
            description: `${info.players} players online`
          });
        }
      } catch (err) {
        setError("Failed to connect to server");
        toast.error("Failed to refresh server data");
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
  return <div className="w-full animate-fade-in">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="">
        {loading && !serverInfo.isOnline ? <ServerLoading /> : serverInfo.isOnline ? <>
            <ServerHeader serverInfo={serverInfo} lastUpdated={lastUpdated} />
            <PlayerStats serverInfo={serverInfo} />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <MoroccoRegionStats />
            </div>
          </> : <ServerOffline />}
      </motion.div>
    </div>;
};
export default ServerStats;