
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
      <Card className={`backdrop-blur-md ${theme === 'light' 
        ? 'bg-white/80 border-kindred-primary/30 shadow-kindred-primary/10' 
        : 'bg-gradient-to-r from-kindred-darker/70 to-kindred-darkest/80 border-kindred-highlight/20 shadow-kindred-accent/10'}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flag className={theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'} />
              <CardTitle className={`text-base ${theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'}`}>
                Morocco Player Distribution
              </CardTitle>
            </div>
            <Badge variant="outline" className={`${theme === 'light' 
              ? 'bg-kindred-primary/10 text-kindred-primary border-kindred-primary/20' 
              : 'bg-kindred-highlight/10 text-kindred-highlight border-kindred-highlight/20'}`}>
              Arabic/French
            </Badge>
          </div>
          <CardDescription className={theme === 'light' ? 'text-kindred-dark/80' : 'text-gray-400'}>
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
                  ? 'bg-gradient-to-br from-white to-kindred-light/50 border border-kindred-primary/20 shadow-sm'
                  : 'bg-gradient-to-br from-kindred-darkest/90 to-black/70 border border-kindred-highlight/15 shadow-inner shadow-kindred-highlight/5'}`}
              >
                <span className={`text-xl font-bold ${theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'}`}>
                  {region.players}
                </span>
                <span className={`text-xs font-medium mt-1 ${theme === 'light' ? 'text-kindred-dark/70' : 'text-gray-400'}`}>
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
