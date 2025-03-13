
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-footer-pattern py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gaming-primary rounded-md flex items-center justify-center mr-2">
                <span className="text-gaming-dark font-bold text-xl">K</span>
              </div>
              <span className="font-display font-bold text-white text-xl">KindreD</span>
            </a>
            <p className="text-gray-400 text-sm mb-4">
              If you have questions:
            </p>
            <a href="mailto:support@kindredrp.com" className="text-gaming-primary hover:underline">
              support@kindredrp.com
            </a>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-4">TECHNICAL SUPPORT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gaming-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold mb-4">HELP / REFERENCES</h4>
            <p className="text-gray-400 text-sm">
              EN-US AND ALL OTHER LANGUAGES ARE WELCOME IN-GAME, BUT ON THE SITES WE'LL STICK TO ENGLISH
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2023 KindreD Role Play. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-gaming-primary/10 rounded-full flex items-center justify-center text-gaming-primary hover:bg-gaming-primary/20 transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
