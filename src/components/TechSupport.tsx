
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LifeBuoy, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { createSupportTicket } from '@/services/support';
import { supabase } from '@/integrations/supabase/client';
import { useCreateSupportTicket } from '@/hooks/use-create-ticket';

export const TechSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, theme, language } = useLanguage();
  const { createTicket } = useCreateSupportTicket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast.error(t('errorOccurred'), {
        description: "Please fill all required fields",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create subject from first few words of message
      const subject = message.split(' ').slice(0, 5).join(' ') + '...';
      
      // Try direct Supabase insert first for better reliability
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          user_email: email,
          user_name: name || '',
          subject,
          message,
          status: 'open'
        })
        .select()
        .single();
        
      if (error) {
        console.error('Direct insert failed, trying fallback:', error);
        await createTicket({ email, message, userName: name, subject });
      } else {
        console.log('Support ticket created successfully:', data);
      }
      
      // Show success message
      toast.success(t('supportRequest'), {
        description: t('getBackToYou'),
      });
      
      // Reset form and close modal
      setName('');
      setEmail('');
      setMessage('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      toast.error(t('errorOccurred'), {
        description: t('tryAgainLater'),
      });
    } finally {
      setIsLoading(false);
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
            <Label htmlFor="name" className={cn("block mb-1", language === 'ar' ? "text-right w-full" : "")}>
              Name (Optional)
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn("bg-kindred-darker/50 light-mode:bg-white/50 border border-kindred-primary/30", 
                language === 'ar' ? "text-right" : "")}
            />
          </div>
          
          <div>
            <Label htmlFor="email" className={cn("block mb-1", language === 'ar' ? "text-right w-full" : "")}>
              Email*
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
              {t('message')}*
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
