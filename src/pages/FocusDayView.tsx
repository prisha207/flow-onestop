import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import EmailCard from '@/components/cards/EmailCard';
import MeetingCard from '@/components/cards/MeetingCard';
import ScheduleDialog from '@/components/dialogs/ScheduleDialog';
import ReplyDraftDialog from '@/components/dialogs/ReplyDraftDialog';
import {
  getCarryoverEmails,
  getNeedsAttentionEmails,
  getCanWaitEmails,
  getTodaysMeetings,
  Email,
} from '@/data/mockData';

const FocusDayView = () => {
  const [canWaitExpanded, setCanWaitExpanded] = useState(false);
  const [handledIds, setHandledIds] = useState<Set<string>>(new Set());
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleSubject, setScheduleSubject] = useState('');
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyEmail, setReplyEmail] = useState<Email | null>(null);

  const carryoverEmails = getCarryoverEmails().filter(e => !handledIds.has(e.id));
  const needsAttentionEmails = getNeedsAttentionEmails().filter(e => !handledIds.has(e.id));
  const canWaitEmails = getCanWaitEmails().filter(e => !handledIds.has(e.id));
  const todaysMeetings = getTodaysMeetings();

  const handleMarkHandled = (id: string) => {
    setHandledIds(prev => new Set(prev).add(id));
    toast.success('Marked as handled');
  };

  const handleReply = (email: Email) => {
    setReplyEmail(email);
    setReplyOpen(true);
  };

  const handleSchedule = (subject: string) => {
    setScheduleSubject(subject);
    setScheduleOpen(true);
  };

  const renderEmailCard = (email: Email, variant: 'carryover' | 'attention' | 'default', showActions: boolean) => (
    <EmailCard
      key={email.id}
      email={email}
      variant={variant}
      showAllActions={showActions}
      onReply={() => handleReply(email)}
      onSchedule={() => handleSchedule(email.subject)}
      onSnooze={() => toast.success('Email snoozed')}
      onMarkHandled={() => handleMarkHandled(email.id)}
    />
  );

  return (
    <PageLayout>
      <div className="space-y-10">
        {/* Daily Header */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-2">Focus Day View</h2>
          <div className="flex items-center gap-3">
            <span className="date-display">Sunday, February 1</span>
            <span className="pill">{carryoverEmails.length} items need attention</span>
          </div>
        </section>

        {/* Carryover Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="section-header">Carryover</h3>
            <span className="section-subtext">Urgent from last 8 hours</span>
          </div>
          <div className="space-y-3">
            {carryoverEmails.length > 0 ? (
              carryoverEmails.map((email) => renderEmailCard(email, 'carryover', true))
            ) : (
              <p className="text-sm text-muted-foreground">All caught up! 🎉</p>
            )}
          </div>
        </section>

        {/* Today's Meetings Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="section-header mb-4">Today's Meetings</h3>
          <div className="space-y-3">
            {todaysMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </section>

        {/* Needs Attention Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="section-header mb-4">Needs Attention (Today)</h3>
          <div className="space-y-3">
            {needsAttentionEmails.length > 0 ? (
              needsAttentionEmails.map((email) => renderEmailCard(email, 'attention', true))
            ) : (
              <p className="text-sm text-muted-foreground">All caught up! 🎉</p>
            )}
          </div>
        </section>

        {/* Can Wait Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => setCanWaitExpanded(!canWaitExpanded)}
            className="collapsible-header"
          >
            {canWaitExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <h3 className="section-header m-0">Can Wait</h3>
            <span className="section-subtext">({canWaitEmails.length} items)</span>
          </button>
          
          {canWaitExpanded && (
            <div className="space-y-3 mt-4">
              {canWaitEmails.map((email) => renderEmailCard(email, 'default', true))}
            </div>
          )}
        </section>
      </div>

      <ScheduleDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        emailSubject={scheduleSubject}
      />
      <ReplyDraftDialog
        open={replyOpen}
        onOpenChange={setReplyOpen}
        email={replyEmail}
      />
    </PageLayout>
  );
};

export default FocusDayView;
