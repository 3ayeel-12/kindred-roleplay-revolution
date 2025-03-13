
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gaming-dark text-white">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black/40 px-4">
        <div className="text-center glass-card p-12 max-w-lg mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-gaming-primary">404</h1>
          <p className="text-xl text-gray-300 mb-8">Oops! Page not found</p>
          <Button className="btn-primary" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
