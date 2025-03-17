
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LifeBuoy, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCreateSupportTicket } from '@/hooks/use-support';

export const TechSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t, theme, language } = useLanguage();
  const { createTicket, isLoading } = useCreateSupportTicket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTicket({ email, message });
      
      // Show success message
      toast.success(t('supportRequest'), {
        description: t('getBackToYou'),
      });
      
      // Reset form and close modal
      setEmail('');
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      toast.error(t('errorOccurred'), {
        description: t('tryAgainLater'),
      });
    }
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
          <h2 className={cn("text-xl font-bold text-kindred-accent", language === 'ar' ? "text-right" : "")}>{t('techSupport')}</h2>
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
            <Label htmlFor="email" className={cn("block mb-1", language === 'ar' ? "text-right w-full" : "")}>
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn("bg-kindred-darker/50 light-mode:bg-white/50 border border-kindred-primary/30", 
                language === 'ar' ? "text-right" : "")}
            />
          </div>
          
          <div>
            <Label htmlFor="message" className={cn("block mb-1", language === 'ar' ? "text-right w-full" : "")}>
              {t('message')}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className={cn("bg-kindred-darker/50 light-mode:bg-white/50 border border-kindred-primary/30", 
                language === 'ar' ? "text-right" : "")}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-kindred-accent hover:bg-kindred-accent/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? t('sending') : t('send')}
          </Button>
        </form>
      </div>
    </div>
  );
};
