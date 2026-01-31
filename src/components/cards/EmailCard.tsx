import { Email } from '@/data/mockData';
import { format } from 'date-fns';

interface EmailCardProps {
  email: Email;
  variant?: 'carryover' | 'attention' | 'default';
  showAllActions?: boolean;
  onReply?: () => void;
  onSchedule?: () => void;
  onSnooze?: () => void;
  onMarkHandled?: () => void;
}

const EmailCard = ({
  email,
  variant = 'default',
  showAllActions = true,
  onReply,
  onSchedule,
  onSnooze,
  onMarkHandled,
}: EmailCardProps) => {
  const cardClass = variant === 'carryover' 
    ? 'email-card-carryover' 
    : variant === 'attention'
    ? 'email-card-attention'
    : 'email-card bg-card border border-border';

  return (
    <div className={`${cardClass} animate-fade-in`}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-foreground">{email.sender}</span>
        <span className="text-xs text-muted-foreground">
          {format(email.timestamp, 'h:mm a')}
        </span>
      </div>
      
      <h4 className="font-medium text-foreground mb-1">{email.subject}</h4>
      <p className="text-sm text-muted-foreground mb-4">{email.summary}</p>
      
      {showAllActions && (
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={onReply} className="action-btn-secondary">Reply</button>
          <button onClick={onSchedule} className="action-btn-secondary">Schedule</button>
          <button onClick={onSnooze} className="action-btn-secondary">Snooze</button>
          <button onClick={onMarkHandled} className="action-btn-primary">Mark as Handled</button>
        </div>
      )}
    </div>
  );
};

export default EmailCard;
