
import { Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function ServerLoading() {
  const { theme } = useLanguage();
  
  return (
    <div className="flex items-center justify-center p-8">
      <Server className={cn(
        "animate-pulse mr-2",
        theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'
      )} />
      <span className={cn(
        "font-semibold",
        theme === 'light' ? 'text-kindred-primary' : 'text-kindred-highlight'
      )}>
        Loading server status...
      </span>
    </div>
  );
}
