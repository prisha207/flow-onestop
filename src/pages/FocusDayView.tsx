import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import EmailCard from '@/components/cards/EmailCard';
import MeetingCard from '@/components/cards/MeetingCard';
import {
  getCarryoverEmails,
  getNeedsAttentionEmails,
  getCanWaitEmails,
  getTodaysMeetings,
} from '@/data/mockData';

const FocusDayView = () => {
  const [canWaitExpanded, setCanWaitExpanded] = useState(false);
  
  const carryoverEmails = getCarryoverEmails();
  const needsAttentionEmails = getNeedsAttentionEmails();
  const canWaitEmails = getCanWaitEmails();
  const todaysMeetings = getTodaysMeetings();

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
            {carryoverEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                variant="carryover"
                showAllActions={true}
                onReply={() => toast.success('Reply drafted')}
                onSchedule={() => toast.success('Email scheduled')}
                onSnooze={() => toast.success('Email snoozed')}
                onMarkHandled={() => toast.success('Marked as handled')}
              />
            ))}
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
            {needsAttentionEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                variant="attention"
                showAllActions={false}
              />
            ))}
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
              {canWaitEmails.map((email) => (
                <EmailCard
                  key={email.id}
                  email={email}
                  variant="default"
                  showAllActions={false}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default FocusDayView;
