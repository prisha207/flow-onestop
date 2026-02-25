import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Email } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

interface ReplyDraftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: Email | null;
}

const ReplyDraftDialog = ({ open, onOpenChange, email }: ReplyDraftDialogProps) => {
  const [body, setBody] = useState('');
  const { addDraft } = useAppContext();

  const handleSend = () => {
    if (!body.trim()) {
      toast.error('Please write a reply');
      return;
    }
    toast.success(`Reply sent to ${email?.sender}`);
    setBody('');
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    if (!email) return;
    addDraft({
      id: `draft-${email.id}`,
      to: email.sender,
      toEmail: email.senderEmail,
      subject: `Re: ${email.subject}`,
      body,
      savedAt: new Date(),
    });
    toast.success('Draft saved');
    setBody('');
    onOpenChange(false);
  };

  if (!email) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
          <DialogDescription>Replying to {email.sender}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">To</label>
            <Input value={email.senderEmail} readOnly className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Input value={`Re: ${email.subject}`} readOnly className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your reply..."
              className="min-h-[150px]"
            />
          </div>
          <div className="p-3 rounded-lg bg-secondary text-sm text-muted-foreground border border-border">
            <p className="font-medium text-foreground mb-1">Original message from {email.sender}:</p>
            <p>{email.summary}</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
          <Button onClick={handleSend}>Send Reply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDraftDialog;
