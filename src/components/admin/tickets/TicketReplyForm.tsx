
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface TicketReplyFormProps {
  onSendReply: (message: string) => Promise<void>;
  isSending: boolean;
}

export function TicketReplyForm({ onSendReply, isSending }: TicketReplyFormProps) {
  const [replyMessage, setReplyMessage] = useState('');
  
  const handleSend = async () => {
    if (!replyMessage.trim()) return;
    
    try {
      await onSendReply(replyMessage);
      setReplyMessage(''); // Clear the form after successful send
    } catch (error) {
      console.error('Error in reply form:', error);
    }
  };
  
  return (
    <div className="mt-4 space-y-3">
      <Textarea
        placeholder="Type your reply here..."
        value={replyMessage}
        onChange={(e) => setReplyMessage(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSend} 
          disabled={!replyMessage.trim() || isSending}
        >
          {isSending ? 'Sending...' : 'Send Reply'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
