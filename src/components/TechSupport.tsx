
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LifeBuoy, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const TechSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t, theme } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the support request to your backend
    console.log('Support request submitted:', { email, message });
    
    // Show success message
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
      duration: 3000,
    });
    
    // Reset form and close modal
    setEmail('');
    setMessage('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 bg-kindred-primary hover:bg-kindred-secondary shadow-lg"
        size="icon"
        aria-label={t('techSupport')}
      >
        <LifeBuoy className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`glass-card max-w-md w-full mx-4 p-6 animate-scale-in ${theme === 'light' ? 'light-mode' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-kindred-accent">{t('techSupport')}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-kindred-darker/50 light-mode:bg-white/50 border border-kindred-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-kindred-accent"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              {t('message')}
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 bg-kindred-darker/50 light-mode:bg-white/50 border border-kindred-primary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-kindred-accent"
            />
          </div>
          
          <Button type="submit" className="btn-accent w-full">
            {t('send')}
          </Button>
        </form>
      </div>
    </div>
  );
};
