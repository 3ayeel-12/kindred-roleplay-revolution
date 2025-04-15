
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NewTicketAlertProps {
  isVisible: boolean;
  onViewTickets: () => void;
}

export const NewTicketAlert = ({ isVisible, onViewTickets }: NewTicketAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="bg-[#111111] border-white mb-4">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-white" />
                <CardTitle className="text-base text-white">New Support Request</CardTitle>
              </div>
              <CardDescription className="text-[#999999]">
                A new support ticket has been submitted and needs attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-white text-black hover:bg-white/90"
                onClick={onViewTickets}
              >
                View Support Tickets
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
