
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ServerStats from "@/components/ServerStats";
import { useLanguage } from "@/contexts/LanguageContext";

const ServerStatusPage = () => {
  const { theme, direction } = useLanguage();
  
  return (
    <div 
      className={`min-h-screen text-white transition-colors duration-300 ${theme === 'light' ? 'light-mode' : ''}`}
      dir={direction}
    >
      <Navbar />
      <div className="container mx-auto px-4 py-16 min-h-[80vh]">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
          Server Status
          <span className="block text-sm font-normal text-kindred-accent mt-2">
            Real-time information about our GTA SAMP server
          </span>
        </h1>
        <ServerStats />
      </div>
      <Footer />
    </div>
  );
};

export default ServerStatusPage;
