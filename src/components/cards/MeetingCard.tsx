import { Meeting, getRelatedEmails } from '@/data/mockData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface MeetingCardProps {
  meeting: Meeting;
  compact?: boolean;
}

const MeetingCard = ({ meeting, compact = false }: MeetingCardProps) => {
  const navigate = useNavigate();
  const relatedEmails = getRelatedEmails(meeting.id);

  const handleViewContext = () => {
    if (relatedEmails.length > 0) {
      navigate(`/mailbox?email=${relatedEmails[0].id}`);
    }
  };

  return (
    <div className={`meeting-card animate-fade-in ${compact ? 'py-3' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-foreground">
          {format(meeting.time, 'h:mm a')} - {format(meeting.endTime, 'h:mm a')}
        </span>
      </div>
      
      <h4 className="font-medium text-foreground mb-1">{meeting.title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{meeting.purpose}</p>
      
      {relatedEmails.length > 0 && (
        <button 
          onClick={handleViewContext}
          className="action-btn-secondary"
        >
          View related email context
        </button>
      )}
    </div>
  );
};

export default MeetingCard;
