import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import { emails, Email, getMeetingById } from '@/data/mockData';
import { Mail, MailOpen } from 'lucide-react';

const Mailbox = () => {
  const [searchParams] = useSearchParams();
  const selectedEmailId = searchParams.get('email');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(
    selectedEmailId ? emails.find(e => e.id === selectedEmailId) || null : null
  );

  const categories = [
    { label: 'All', filter: () => true },
    { label: 'Work', filter: (e: Email) => e.category === 'work' },
    { label: 'Personal', filter: (e: Email) => e.category === 'personal' },
    { label: 'Newsletters', filter: (e: Email) => e.category === 'newsletter' },
    { label: 'Notifications', filter: (e: Email) => e.category === 'notification' },
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const filteredEmails = emails.filter(
    categories.find(c => c.label === activeCategory)?.filter || (() => true)
  );

  const relatedMeeting = selectedEmail?.relatedMeetingId 
    ? getMeetingById(selectedEmail.relatedMeetingId)
    : null;

  return (
    <PageLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Mailbox</h2>

        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`nav-tab ${activeCategory === cat.label ? 'nav-tab-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Email List */}
          <div className="col-span-1 space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedEmail?.id === email.id
                    ? 'bg-secondary border-primary'
                    : 'bg-card border-border hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {email.isRead ? (
                    <MailOpen className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Mail className="w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium text-sm text-foreground truncate">
                    {email.sender}
                  </span>
                </div>
                <p className="text-sm text-foreground truncate">{email.subject}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(email.timestamp, 'h:mm a')}
                </p>
              </button>
            ))}
          </div>

          {/* Email Detail */}
          <div className="col-span-2 bg-card border border-border rounded-2xl p-6">
            {selectedEmail ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {selectedEmail.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From: {selectedEmail.sender} &lt;{selectedEmail.senderEmail}&gt;
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(selectedEmail.timestamp, 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                {selectedEmail.isCarryover && (
                  <div className="mb-4 px-3 py-2 rounded-lg bg-[hsl(var(--carryover-bg))] border border-[hsl(var(--carryover-border))]">
                    <span className="text-sm font-medium text-accent">⚡ Carryover - Urgent</span>
                  </div>
                )}

                {relatedMeeting && (
                  <div className="mb-4 px-3 py-2 rounded-lg bg-secondary border border-border">
                    <span className="text-sm text-muted-foreground">
                      Related meeting: <span className="text-foreground font-medium">{relatedMeeting.title}</span> at {format(relatedMeeting.time, 'h:mm a')}
                    </span>
                  </div>
                )}

                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-foreground leading-relaxed">
                    {selectedEmail.summary}
                  </p>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => toast.success('Reply drafted')} className="action-btn-secondary">Reply</button>
                  <button onClick={() => toast.success('Email forwarded')} className="action-btn-secondary">Forward</button>
                  <button onClick={() => toast.success('Email scheduled')} className="action-btn-secondary">Schedule</button>
                  <button onClick={() => { toast.success('Marked as handled'); setSelectedEmail(null); }} className="action-btn-primary">Mark as Handled</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Select an email to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Mailbox;
