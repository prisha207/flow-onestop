import { format } from 'date-fns';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import { meetings, getRelatedEmails } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Meetings = () => {
  const navigate = useNavigate();

  const handleViewEmailContext = (meetingId: string) => {
    const relatedEmails = getRelatedEmails(meetingId);
    if (relatedEmails.length > 0) {
      navigate(`/mailbox?email=${relatedEmails[0].id}`);
    }
  };

  const upcomingMeetings = meetings.filter(m => m.time >= new Date(2025, 1, 1));
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Meetings</h2>

        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => {
            const relatedEmails = getRelatedEmails(meeting.id);
            
            return (
              <div
                key={meeting.id}
                className="bg-card border border-border rounded-2xl p-6 animate-fade-in"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold text-foreground">
                        {format(meeting.time, 'h:mm a')} - {format(meeting.endTime, 'h:mm a')}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                        {format(meeting.time, 'MMM d, yyyy')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-medium text-foreground mb-2">
                      {meeting.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">{meeting.purpose}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Attendees:</span>
                        <div className="flex -space-x-2">
                          {meeting.attendees.slice(0, 3).map((attendee, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center"
                            >
                              <span className="text-xs font-medium text-foreground">
                                {attendee.charAt(0)}
                              </span>
                            </div>
                          ))}
                          {meeting.attendees.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-foreground">
                                +{meeting.attendees.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {relatedEmails.length > 0 && (
                      <button
                        onClick={() => handleViewEmailContext(meeting.id)}
                        className="action-btn-secondary whitespace-nowrap"
                      >
                        View email context ({relatedEmails.length})
                      </button>
                    )}
                    <button onClick={() => toast.success(`Joining "${meeting.title}"...`)} className="action-btn-primary">
                      Join Meeting
                    </button>
                  </div>
                </div>

                {relatedEmails.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Related emails:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {relatedEmails.map(email => (
                        <span
                          key={email.id}
                          className="px-3 py-1 rounded-full bg-secondary text-sm text-foreground"
                        >
                          {email.subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default Meetings;
