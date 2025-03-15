
import { Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ServerOffline() {
  const { theme } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Server className="text-red-500 mb-2" size={32} />
      <h3 className="text-lg font-bold text-red-500">Server Offline</h3>
      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} max-w-md mt-2`}>
        The server at 91.121.237.128:1958 is currently offline or not responding. Please check back later.
      </p>
    </div>
  );
}
