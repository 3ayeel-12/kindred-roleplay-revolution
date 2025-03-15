
import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

// Morocco regions with corresponding player counts (simulated)
const moroccoRegions = [
  { region: "CASABLANCA", players: 143, code: "MA-CAS" },
  { region: "RABAT", players: 89, code: "MA-RAB" },
  { region: "MARRAKECH", players: 76, code: "MA-MAR" },
  { region: "FEZ", players: 54, code: "MA-FEZ" },
  { region: "TANGIER", players: 48, code: "MA-TAN" },
];

export function MoroccoRegionStats() {
  const { theme } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="col-span-1 md:col-span-5"
    >
      <Card className={`${theme === 'light' 
        ? 'bg-gradient-to-r from-kindred-primary/10 to-kindred-highlight/5 border-kindred-primary/20' 
        : 'bg-gradient-to-r from-kindred-orange/20 to-kindred-highlight/10 border-kindred-orange/20'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flag className="text-kindred-highlight" />
              <CardTitle className="text-base">Morocco Player Distribution</CardTitle>
            </div>
            <Badge variant="outline" className={`${theme === 'light' 
              ? 'bg-kindred-highlight/5 text-kindred-primary border-kindred-highlight/10' 
              : 'bg-kindred-highlight/10 text-kindred-highlight border-kindred-highlight/20'}`}>
              Arabic/French
            </Badge>
          </div>
          <CardDescription className={theme === 'light' ? 'text-gray-600' : ''}>
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
                className={`flex flex-col items-center p-3 rounded-lg ${theme === 'light' 
                  ? 'bg-kindred-primary/5 border border-kindred-primary/10'
                  : 'bg-black/30 border border-kindred-highlight/10'}`}
              >
                <span className="text-xl font-bold text-kindred-highlight">
                  {region.players}
                </span>
                <span className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                  {region.region}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
